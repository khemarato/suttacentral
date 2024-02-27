import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';
import { reduxActions } from '../addons/sc-redux-actions';
import { getURLParam } from '../addons/sc-functions-miscellaneous';
import { SCTextCommon } from './sc-text-common';
import '../lookups/sc-lookup-pli';
import '../lookups/sc-lookup-lzh2en';
import '../addons/sc-bottom-sheet';

import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyBilaraStyles } from '../styles/sc-typography-bilara-styles';
import {
  commonStyles,
  plainStyles,
  plainPaliStyles,
  plainPlusStyles,
  sideBySideStyles,
  sideBySidePlusStyles,
  lineByLineStyles,
  lineByLinePlusStyles,
  hideReferenceStyles,
  hideAsterisk,
  showAsterisk,
  rootPlainPlusStyles,
} from '../styles/sc-layout-bilara-styles';

import { scriptIdentifiers, paliScriptsStyles } from '../addons/sc-aksharamukha-converter';
import { setNavigation } from '../navigation/sc-navigation-common';
import { paliReferenceEditions } from './sc-text-functions';
import { dispatchCustomEvent } from '../../utils/customEvent';


export class SCTextBilara extends SCTextCommon {
  static properties = {
    rootSutta: { type: Object },
    bilaraRootSutta: { type: Object },
    translatedSutta: { type: Object },
    bilaraTranslatedSutta: { type: Object },
    suttaId: { type: String },
    suttaReference: { type: Object },
    suttaComment: { type: Object },
    suttaVariant: { type: Object },
    chosenTextView: { type: String },
    displayedReferences: { type: Array },
    chosenNoteDisplayType: { type: String },
    paliScript: { type: String },
    markup: { type: String },
    isPaliLookupEnabled: { type: Boolean },
    spansForWordsGenerated: { type: Boolean },
    spansForGraphsGenerated: { type: Boolean },
    isChineseLookupEnabled: { type: Boolean },
    hasScriptBeenChanged: { type: Boolean },
    localizedStringsPath: { type: String },
    currentStyles: { type: Object },
    referencesDisplayStyles: { type: Object },
    notesDisplayStyles: { type: Object },
    showHighlighting: { type: Boolean },
    rootEdition: { type: Array },
    isRangeSutta: { type: Boolean },
    transformedSuttaId: { type: String },
    isTextOptionsMismatchSavedSettings: { type: Boolean },
    shouldRestoreUserSettings: { type: Boolean },
  };

  constructor() {
    super();
    const { textOptions } = store.getState();
    this.isPaliLookupEnabled = textOptions.paliLookupActivated;
    this.spansForWordsGenerated = false;
    this.spansForGraphsGenerated = false;
    this.isChineseLookupEnabled = textOptions.chineseLookupActivated;
    this.hasScriptBeenChanged = false;
    this.localizedStringsPath = '/localization/elements/interface';
    this.commentSpanRectInfo = new Map();
    this.rootEdition = [];
    this._setTextViewState();

    this._hashChangeHandler = () => {
      setTimeout(() => {
        this._scrollToSection(window.location.hash.slice(1));
      }, 0);
    };

    this._onClickHandler = () => {
      this.actions.changeDisplaySettingMenuState(false);
    };

    // Return the corresponding style sheet according to different combinations of text viewing options.
    this.mapStyles = new Map([
      ['sidenotes_plain', plainPlusStyles],
      ['sidenotes_sidebyside', sideBySidePlusStyles],
      ['sidenotes_linebyline', lineByLinePlusStyles],
      ['none_plain', plainStyles],
      ['asterisk_plain', plainStyles],
      ['none_sidebyside', sideBySideStyles],
      ['asterisk_sidebyside', sideBySideStyles],
      ['none_linebyline', lineByLineStyles],
      ['asterisk_linebyline', lineByLineStyles],
      ['pali', plainPaliStyles],
      ['sidenotes_root', rootPlainPlusStyles],
    ]);
    this.mapNoteDisplayStyles = new Map([
      ['none', hideAsterisk],
      ['asterisk', showAsterisk],
    ]);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${commonStyles}
        ${typographyCommonStyles}
        ${typographyBilaraStyles}
        ${paliScriptsStyles}
      </style>
      ${this.currentStyles} ${this.referencesDisplayStyles} ${this.notesDisplayStyles}

      <main>
        <div id="segmented_text_content" class="html-text-content">
          ${unsafeHTML(this.markup || ' ')}
        </div>
      </main>

      <sc-pali-lookup id="pali_lookup"></sc-pali-lookup>
      <sc-chinese-lookup id="chinese_lookup"></sc-chinese-lookup>
      <slot></slot>
      <sc-bottom-sheet></sc-bottom-sheet>
    `;
  }

  firstUpdated() {
    this.scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    window.addEventListener('hashchange', this._hashChangeHandler);
    this.addEventListener('click', this._onClickHandler);
    this._updateView();
    this._updateURLSearchParams();
    this.scActionItems?.showSpeakerButton();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this._hashChangeHandler);
    window.removeEventListener('click', this._onClickHandler);
  }

  _updateView() {
    reduxActions.changeLinearProgressActiveState(true);
    setTimeout(() => {
      this._addTranslationText();
      if (this.paliScript === 'latin' || this.rootSutta.lang !== 'pli') {
        this._addRootText();
      } else {
        this._setScript();
      }
      if (this.displayedReferences?.length > 0 && this.displayedReferences?.[0] !== 'none') {
        this._deleteReference();
        this._addSCReference();
        this._addReferenceText();
      }
      if (window.location.href.includes('#')) {
        this._deleteSCReference();
        this._addSCReference();
      }
      this._addVariantText();
      this._addCommentText();
      this._paliLookupStateChanged();
      this._chineseLookupStateChanged();
      this._showHighlightingChanged();
      this._hashChangeHandler();
    }, 100);
    this._prepareNavigation();

    setTimeout(() => {
      this._updateTextViewStylesBasedOnState();
      this._recalculateCommentSpanHeight();
    }, 0);
    this.actions.changeSuttaMetaText('');
    if (!this.isRangeSutta) {
      this.actions.changeSuttaPublicationInfo({
        uid: this.suttaId,
        lang: this.translatedSutta?.lang || 'en',
        authorUid: this.translatedSutta.author_uid,
      });
    }
    this._serveRangeSuttasPerSutta();
    reduxActions.changeLinearProgressActiveState(false);
  }

  _serveRangeSuttasPerSutta() {
    if (this.isRangeSutta) {
      const UIDS = [];
      const allArticle = this.querySelectorAll('article');
      if (this.suttaId.indexOf('dhp') < 0) {
        allArticle.forEach(item => {
          UIDS.push(item.id);
          item.style.display = 'none';
        });
      }

      if (this.suttaId.indexOf('dhp') !== -1) {
        const dhpVerses = this.querySelectorAll('article span.segment');
        for (const verse of dhpVerses) {
          if (verse.id.split(':')[0].toLowerCase() !== this.suttaId.toLowerCase()) {
            const blockquote = this.querySelector(`#${CSS.escape(verse.id)} + blockquote`);
            if (blockquote) {
              blockquote.style.display = 'none';
            }
            this.querySelector(`#${CSS.escape(verse.id)}`).style.display = 'none';
          }
        }
        const titles = this.querySelectorAll('header h1 span.segment');
        for (const dhp of titles) {
          dhp.style.display = '';
        }
      }

      let sutta = this.querySelector(`#${CSS.escape(this.suttaId)}`);
      if (sutta) {
        sutta.style.display = 'block';
      } else {
        for (const uid of UIDS) {
          if (this.rootSutta.uid.indexOf('.') > -1 && uid.indexOf('-') > -1) {
            const suttaNo = this.suttaId.split('.')[1];
            const suttaRange = uid.split('.')[1];
            const rangeBegin = suttaRange.split('-')[0];
            const rangeEnd = suttaRange.split('-')[1];
            if (
              parseInt(suttaNo, 10) <= parseInt(rangeEnd, 10) &&
              parseInt(suttaNo, 10) >= parseInt(rangeBegin, 10) &&
              this.rootSutta.uid.indexOf('-') > -1
            ) {
              sutta = this.querySelector(`#${CSS.escape(uid)}`);
              if (sutta) {
                sutta.style.display = 'block';
              }
              break;
            }
          }
        }
      }

      setTimeout(() => {
        if (this.suttaId.indexOf('dhp') === -1) {
          const suttaTitle = this.suttaId.split('.')[1];
          this._updateSuttaTitle('.range-title .root .text', suttaTitle);
          this._updateSuttaTitle('.range-title .translation .text', suttaTitle);
          this._updateSuttaTitle('.sutta-title .root .text', suttaTitle);
          this._updateSuttaTitle('.sutta-title .translation .text', suttaTitle);
          this._updateSuttaTitle(`#${CSS.escape(this.suttaId)} h2 .root .text`, '');
          this._updateSuttaTitle(`#${CSS.escape(this.suttaId)} h2 .translation .text`, '');
        }

        const currentNav = store.getState().navigationArray;
        const lastNavItem = currentNav[currentNav.length - 1];
        if (lastNavItem.uid !== 'home') {
          lastNavItem.title = this.transformedSuttaId;
          setNavigation(currentNav);
        }
      }, 100);

      this.actions.changeSuttaPublicationInfo({
        uid: this.range_uid,
        lang: this.translatedSutta?.lang || 'en',
        authorUid: this.translatedSutta.author_uid,
      });

      this.actions.showToc([]);

      this.scActionItems.range_uid = this.range_uid;
    } else {
      this.scActionItems.range_uid = '';
    }
  }

  _updateSuttaTitle(selector, suttaTitle) {
    const span = this.querySelector(selector);
    if (span) {
      span.textContent = suttaTitle;
    }
  }

  _segmentedTextContentElement() {
    return this.querySelector('#segmented_text_content');
  }

  _articleElement() {
    return this.querySelectorAll('article');
  }

  // Scrolls to the chosen section
  _scrollToSection(sectionId, margin = 120) {
    if (!sectionId) {
      return;
    }
    try {
      const targetElement = this.querySelector(`#${CSS.escape(sectionId)}`);
      if (targetElement) {
        targetElement.scrollIntoView();
        window.scrollTo(0, window.scrollY - margin);
        this._removeRefFocusedClass();
        targetElement.classList.add('refFocused');
      }
    } catch (e) {
      console.error(e);
    }
  }

  _removeRefFocusedClass() {
    this.querySelectorAll('.refFocused').forEach(element => {
      element.classList.remove('refFocused');
    });
  }

  _addCommentText() {
    if (!this.suttaComment || this._articleElement().length === 0) {
      return;
    }
    Object.entries(this.suttaComment).forEach(([key, value]) => {
      const translationSpan = this.querySelector(`#${CSS.escape(key)} .translation`);
      translationSpan?.appendChild(this._addCommentSpan(value));
    });
  }

  _addCommentSpan(value) {
    const span = document.createElement('span');
    span.className = 'comment';
    span.dataset.tooltip = this._stripHTML(value);
    span.innerHTML = value;
    return span;
  }

  _stripHTML(htmlText) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = htmlText;
    return tmp.textContent || tmp.innerText || '';
  }

  _recalculateCommentSpanHeight() {
    const gutterWidth = 5;
    this.commentSpanRectInfo.clear();
    const Comments = this.querySelectorAll('.comment');
    Comments.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementNoId = element.id.slice(8); // id:comment_1 => get: 1
      const nextComment = this.querySelector(`#comment_${parseInt(elementNoId, 10) + 1}`);
      if (nextComment) {
        const nextCommentTop = nextComment.getBoundingClientRect().top;
        if (rect.top + rect.height > nextCommentTop) {
          element.style.height = `${nextCommentTop - rect.top - gutterWidth}px`;
          element.style.overflow = 'scroll';
        }
      } else if (rect.top + rect.height > this.parentNode.clientHeight) {
        element.style.height = `${this.parentNode.clientHeight - rect.top}px`;
        element.style.overflow = 'scroll';
      }
      this.commentSpanRectInfo.set(element.id, element.style.height);
    });
    this._addCommentSpanMouseEvent();
  }

  _resetCommentSpan() {
    const Comments = this.querySelectorAll('.comment');
    Comments.forEach(element => {
      element.removeAttribute('style');
      element.onmouseover = null;
      element.onmouseleave = null;
    });
  }

  _addCommentSpanId() {
    let wordIdSeed = 0;
    this.querySelectorAll('span.comment').forEach(word => {
      word.id = `comment_${wordIdSeed}`;
      wordIdSeed++;
    });
  }

  _addCommentSpanMouseEvent() {
    const Comments = this.querySelectorAll('.comment');
    Comments.forEach(element => {
      element.onmouseover = e => {
        e.currentTarget.style.overflow = 'auto';
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.zIndex = '1100';
      };
      element.onmouseleave = e => {
        e.currentTarget.style.overflow = 'auto';
        e.currentTarget.style.height = this.commentSpanRectInfo.get(e.currentTarget.id);
        e.currentTarget.style.zIndex = '1';
      };
    });
  }

  updated(changedProps) {
    let shouldChangeTextView = false;
    if (changedProps.has('chosenTextView')) {
      shouldChangeTextView = true;
    }
    if (changedProps.has('paliScript')) {
      this._changeScript();
      this._updateURLSearchParams();
    }
    if (changedProps.has('isPaliLookupEnabled')) {
      this._paliLookupStateChanged();
    }
    if (changedProps.has('isChineseLookupEnabled')) {
      this._chineseLookupStateChanged();
    }
    if (changedProps.has('markup')) {
      this._updateView();
    }
    if (changedProps.has('displayedReferences')) {
      shouldChangeTextView = true;
      if (this.displayedReferences?.length > 0 && this.displayedReferences?.[0] !== 'none') {
        this._deleteReference();
        this._addSCReference();
        this._addReferenceText();
      } else {
        this._deleteReference();
      }
    }
    if (changedProps.has('chosenNoteDisplayType')) {
      shouldChangeTextView = true;
    }
    if (changedProps.has('showHighlighting')) {
      this._showHighlightingChanged();
      this._updateURLSearchParams();
    }
    if (changedProps.has('currentStyles')) {
      if (this._isPlusStyle()) {
        this._recalculateCommentSpanHeight();
      } else {
        this._resetCommentSpan();
      }
    }

    if (shouldChangeTextView) {
      this._updateTextViewStylesBasedOnState();
      this._updateURLSearchParams();
    }
  }

  _showHighlightingChanged() {
    this._articleElement().forEach(article => {
      this.showHighlighting ? article.classList.add('highlight') : article.classList.remove('highlight');
    });
  }

  _isPlusStyle() {
    return (
      this.currentStyles === plainPlusStyles ||
      this.currentStyles === sideBySidePlusStyles ||
      this.currentStyles === lineByLinePlusStyles
    );
  }

  _paliLookupStateChanged() {
    if (this.isPaliLookupEnabled && this.rootSutta.lang === 'pli') {
      this._enablePaliLookup();
    } else {
      this._disableLookup();
    }
  }

  _chineseLookupStateChanged() {
    if (
      this.isChineseLookupEnabled &&
      (this.rootSutta.lang === 'lzh' || this.translatedSutta.lang === 'lzh')
    ) {
      this._enableChineseLookup();
    } else {
      this._disableLookup();
    }
  }

  _disableLookup() {
    this.querySelector('sc-bottom-sheet')?.hide?.();
    this._removeDefineFocusedClass();
    this._removeLookupEvent('.root .text .word');
  }

  _conditionallyPutIntoSpans(lang) {
    if (this.rootSutta.lang === lang && this.querySelector('.root')) {
      this._putIntoSpans('.root', lang);
    }
  }

  _putIntoSpans(selector, lang) {
    if (lang === 'pli') {
      this._putWordsIntoSpans(selector, 'word');
    } else if (lang === 'lzh') {
      this._putGraphsIntoSpans(selector, 'graph');
    }
  }

  _putGraphsIntoSpans(selector, lang) {
    this._startGeneratingSpans(selector, 'graph', lang);
  }

  _updateURLSearchParams() {
    const textBilara = this?.parentNode?.querySelector('sc-text-bilara');
    if (!textBilara) {
      return;
    }
    const { siteLanguage, textOptions } = store.getState();
    const chosenNoteDisplayType = textOptions.noteDisplayType;
    const chosenTextView = textOptions.segmentedSuttaTextView;
    const {showHighlighting} = textOptions;
    const paliScript = textOptions.script;
    const {displayedReferences} = textOptions;
    const params = ['notes', 'layout', 'script', 'highlight', 'reference'];
    let [notes, layout, script, highlight, reference] = params.map(getURLParam);

    if (notes && layout && script && highlight && reference) {
      this.isTextOptionsMismatchSavedSettings = (
        chosenNoteDisplayType !== notes?.toLowerCase() ||
        chosenTextView !== layout?.toLowerCase() ||
        showHighlighting !== (highlight === 'true') ||
        paliScript !== script ||
        displayedReferences !== reference?.split('/')
      );

      if (this.shouldRestoreUserSettings) {
        this.isTextOptionsMismatchSavedSettings = false;
      }

      if (notes && !['none', 'asterisk', 'sidenotes'].includes(notes.toLowerCase())) {
        notes = chosenNoteDisplayType;
      }

      if (layout && !['plain', 'sidebyside', 'linebyline'].includes(layout.toLowerCase())) {
        layout = chosenTextView;
      }

      if (highlight && !['true', 'false'].includes(highlight.toLowerCase())) {
        highlight = showHighlighting;
      }

      if (script && !scriptIdentifiers.find(x => x.script === script)) {
        script = paliScript;
      }

      if (reference) {
        const paramReference = reference
          .split('/')
          .filter(ref =>
            ['main', 'none'].includes(ref.toLowerCase()) ||
            paliReferenceEditions.some(x => x.edition_set === ref)
          );
        if (paramReference.length === 0) {
          reference = displayedReferences;
        }
      }
    } else {
      this.isTextOptionsMismatchSavedSettings = false;
    }

    const urlParams = new URLSearchParams({
      lang: siteLanguage,
      layout: this.isTextOptionsMismatchSavedSettings ? layout : chosenTextView,
      reference: this.isTextOptionsMismatchSavedSettings ? reference : displayedReferences,
      notes: this.isTextOptionsMismatchSavedSettings ? notes : chosenNoteDisplayType,
      highlight: this.isTextOptionsMismatchSavedSettings ? highlight : showHighlighting,
      script: this.isTextOptionsMismatchSavedSettings ? script : paliScript
    }).toString();
    const finalUrl = `?${urlParams}${window.location.hash}`;
    window.history.replaceState(null, null, finalUrl);
  }

  _setTextViewState() {
    const { textOptions } = store.getState();
    this.chosenNoteDisplayType = textOptions.noteDisplayType;
    this.chosenTextView = textOptions.segmentedSuttaTextView;
    this.showHighlighting = textOptions.showHighlighting;
    this.paliScript = textOptions.script;
    this.displayedReferences = textOptions.displayedReferences;

    const params = ['notes', 'layout', 'script', 'highlight', 'reference'];
    const [notes, layout, script, highlight, reference] = params.map(getURLParam);

    if (!notes && !layout && !script && !highlight && !reference) {
      this.isTextOptionsMismatchSavedSettings = false;
      return;
    }

    this.isTextOptionsMismatchSavedSettings = (
      this.chosenNoteDisplayType !== notes?.toLowerCase() ||
      this.chosenTextView !== layout?.toLowerCase() ||
      this.showHighlighting !== (highlight === 'true') ||
      this.paliScript !== script ||
      this.displayedReferences !== reference?.split('/')
    );

    if (!this.isTextOptionsMismatchSavedSettings) {
      return;
    }

    if (notes && ['none', 'asterisk', 'sidenotes'].includes(notes.toLowerCase())) {
      this.chosenNoteDisplayType = notes.toLowerCase();
    }

    if (layout && ['plain', 'sidebyside', 'linebyline'].includes(layout.toLowerCase())) {
      this.chosenTextView = layout.toLowerCase()
    }

    if (highlight && ['true', 'false'].includes(highlight.toLowerCase())) {
      this.showHighlighting = highlight === 'true';
    }

    if (script && scriptIdentifiers.find(x => x.script === script)) {
      this.paliScript = script;
    }

    if (reference) {
      const paramReference = reference
        .split('/')
        .filter(ref =>
          ['main', 'none'].includes(ref.toLowerCase()) ||
          paliReferenceEditions.some(x => x.edition_set === ref)
        );
      if (paramReference.length > 0) {
        this.displayedReferences = paramReference;
      }
    }
  }

  _updateTextViewStylesBasedOnState() {
    let viewCompose = `${this.chosenNoteDisplayType}_${this.chosenTextView}`;
    if (!this.bilaraTranslatedSutta && this.bilaraRootSutta) {
      if (this.chosenNoteDisplayType === 'sidenotes') {
        viewCompose = 'sidenotes_root';
      } else {
        viewCompose = 'pali';
      }
    }
    this.currentStyles = this.mapStyles.get(viewCompose) || plainStyles;

    if (this.displayedReferences) {
      const isNone =
        this.displayedReferences.includes('none') && !window.location.href.includes('#');
      if (isNone) {
        this.referencesDisplayStyles = hideReferenceStyles;
      } else {
        const isMain =
          this.displayedReferences.includes('main') || window.location.href.includes('#');
        this.referencesDisplayStyles = html`
          <style>
            .reference {
              display: inline;
            }

            .reference a {
              display: none;
            }

            ${isMain
              ? `
              .reference a.sc,
              .reference a.vns {
                display: inline;
              }
            `
              : ''}

            ${this.displayedReferences.map(
              referenceSet => html` ${` .reference a.${referenceSet}`} { display: inline; } `
            )}

            ${this.displayedReferences.includes('pts')
              ? html`.reference a.vnp { display: inline; }`
              : ''}
          </style>
        `;
      }
    }

    this.notesDisplayStyles = this.mapNoteDisplayStyles.get(this.chosenNoteDisplayType);
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.chosenTextView !== state.textOptions.segmentedSuttaTextView && this.shouldRestoreUserSettings) {
      this.chosenTextView = state.textOptions.segmentedSuttaTextView;
    }
    if (this.paliScript !== state.textOptions.script && this.shouldRestoreUserSettings) {
      this.paliScript = state.textOptions.script;
      this.hasScriptBeenChanged = true;
    }
    if (this.isPaliLookupEnabled !== state.textOptions.paliLookupActivated) {
      this.isPaliLookupEnabled = state.textOptions.paliLookupActivated;
    }
    if (this.isChineseLookupEnabled !== state.textOptions.chineseLookupActivated) {
      this.isChineseLookupEnabled = state.textOptions.chineseLookupActivated;
    }
    const currentReferences = this.buildReferences(this.displayedReferences);
    const incomingReferences = this.buildReferences(state.textOptions.displayedReferences);
    if (currentReferences !== incomingReferences && this.shouldRestoreUserSettings) {
      this.displayedReferences = Array.from(state.textOptions.displayedReferences);
    }
    if (this.chosenNoteDisplayType !== state.textOptions.noteDisplayType && this.shouldRestoreUserSettings) {
      this.chosenNoteDisplayType = state.textOptions.noteDisplayType;
    }
    if (this.showHighlighting !== state.textOptions.showHighlighting && this.shouldRestoreUserSettings) {
      this.showHighlighting = state.textOptions.showHighlighting;
    }
  }

  buildReferences(referenceDisplayTypeArray) {
    return Array.isArray(referenceDisplayTypeArray)
      ? referenceDisplayTypeArray.reduce((acc, edition_set) => acc + edition_set, '')
      : '';
  }

  _prepareNavigation() {
    const sutta = this.bilaraTranslatedSutta || this.bilaraRootSutta;
    if (!sutta) {
      this.actions.showToc([]);
      return;
    }
    const dummyElement = document.createElement('template');
    dummyElement.innerHTML = this.markup?.trim();
    let arrayTOC = Array.from(dummyElement.content.querySelectorAll('h2')).map(elem => {
      const id = elem.firstElementChild ? elem.firstElementChild.id : null;
      if (sutta[id]) {
        return { link: id, name: this._stripLeadingOrdering(sutta[id]) };
      }
    });
    arrayTOC = arrayTOC.filter(Boolean);

    this.actions.showToc(arrayTOC);
  }

  _stripLeadingOrdering(name) {
    return name.replace(/^\d+\./, '').trim();
  }

  get actions() {
    return {
      changeSuttaMetaText(metaText) {
        store.dispatch({
          type: 'CHANGE_SUTTA_META_TEXT',
          metaText,
        });
      },
      changeSuttaPublicationInfo(publicationInfo) {
        store.dispatch({
          type: 'CHANGE_SUTTA_PUBLICATION_INFO',
          suttaPublicationInfo: publicationInfo,
        });
      },
      chooseSegmentedSuttaTextView(viewNumber) {
        store.dispatch({
          type: 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW',
          view: viewNumber,
        });
      },
      showToc(tableOfContents) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_TOC_BUTTON_STATE',
          payload: {
            tableOfContents,
            disableToCListStyle: false,
          },
        });
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display,
        });
      },
    };
  }

  _addRootText() {
    if (!this.bilaraRootSutta || this._articleElement().length === 0) {
      return;
    }

    this._deleteRootSuttaMarkup();
    this._addRootSuttaMarkup();
    Object.entries(this.bilaraRootSutta).forEach(([key, value]) => {
      this._addRootTextToSpan(CSS.escape(key), value);
    });
  }

  _addTransliteratedRootText() {
    if (!this.transliteratedRootSutta || this._articleElement().length === 0) {
      return;
    }

    this._deleteRootSuttaMarkup();
    this._addRootSuttaMarkup();
    Object.entries(this.transliteratedRootSutta).forEach(([key, value]) => {
      this._addTransliteratedRootTextToSpan(CSS.escape(key), value);
    });
  }

  _addTransliteratedRootTextToSpan(key, value) {
    const spanElement = this.querySelector(`#${key} .root .text`);
    if (spanElement) {
      spanElement.classList.add(`${this.paliScript.toLowerCase()}-script`);
      spanElement.innerHTML = value;
    }
  }

  _addRootTextToSpan(key, value) {
    const spanElement = this.querySelector(`#${key} .root .text`);
    if (spanElement) {
      spanElement.innerHTML = value;
    }
  }

  _deleteRootSuttaMarkup() {
    this._articleElement().forEach(article => {
      const rootMarkup = article.querySelectorAll('.root');
      if (rootMarkup) {
        rootMarkup.forEach(element => {
          element.parentNode.removeChild(element);
        });
      }
    });
  }

  _deleteTranslatedSuttaMarkup() {
    this._articleElement().forEach(article => {
      const translatedSuttaMarkup = article.querySelectorAll('.translation');
      if (translatedSuttaMarkup) {
        translatedSuttaMarkup.forEach(element => {
          element.parentNode.removeChild(element);
        });
      }
    });
  }

  _addRootSuttaMarkup() {
    if (!this.bilaraRootSutta || this._articleElement().length === 0) {
      return;
    }

    Object.keys(this.bilaraRootSutta).forEach(key => {
      this._addRootSuttaMarkupToSpan(CSS.escape(key));
    });
  }

  _addRootSuttaMarkupToSpan(key) {
    const segmentElement = this.querySelector(`#${key}`);
    if (segmentElement) {
      segmentElement.appendChild(this._addRootSuttaSpan());
    }
  }

  _addTranslationSuttaMarkup() {
    if (!this.bilaraTranslatedSutta || this._articleElement().length === 0) {
      return;
    }

    Object.keys(this.bilaraTranslatedSutta).forEach(key => {
      this._addTranslationSuttaMarkupToSpan(CSS.escape(key));
    });
  }

  _addTranslationSuttaMarkupToSpan(key) {
    const segmentElement = this.querySelector(`#${key}`);
    if (segmentElement) {
      segmentElement.appendChild(this._addTranslationSuttaSpan());
    }
  }

  _addTranslationSuttaSpan() {
    const spanElement = document.createElement('span');
    spanElement.className = 'translation';
    spanElement.lang = this.translatedSutta.lang;
    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    spanElement.appendChild(textSpan);
    return spanElement;
  }

  _addSCReference() {
    if (!this.bilaraRootSutta || this._articleElement().length === 0) {
      return;
    }

    Object.keys(this.bilaraRootSutta).forEach(key => {
      const segmentElement = this.querySelector(`#${CSS.escape(key)}`);
      if (segmentElement) {
        const refSpan = this._addReferenceSpan();
        refSpan.appendChild(this._addSCReferenceAnchor(key));
        this._prependChild(segmentElement, refSpan);
      }
    });
  }

  _deleteReference() {
    this._articleElement().forEach(article => {
      article.querySelectorAll('.reference').forEach(element => {
        element.parentNode.removeChild(element);
      });
    });
  }

  _deleteSCReference() {
    this._articleElement().forEach(article => {
      article.querySelectorAll('.reference .sc').forEach(element => {
        element.parentNode.removeChild(element);
      });
    });
  }

  _prependChild(parent, newChild) {
    if (parent.firstChild) {
      parent.insertBefore(newChild, parent.firstChild);
    } else {
      parent.appendChild(newChild);
    }
    return parent;
  }

  _addSCReferenceAnchor(key) {
    const subKey = key.substring(key.indexOf(':') + 1, key.length);
    const anchor = document.createElement('a');
    anchor.className = 'sc';
    anchor.id = subKey;
    anchor.href = `#${subKey}`;
    anchor.title = this.localize('text:segmentNumber');
    const text = document.createTextNode(subKey);
    anchor.appendChild(text);
    return anchor;
  }

  _addVariantText() {
    if (!this.suttaVariant || this._articleElement().length === 0) {
      return;
    }
    Object.entries(this.suttaVariant).forEach(([key, value]) => {
      const rootSpan = this.querySelector(`#${CSS.escape(key)} .root`);
      if (rootSpan) {
        rootSpan.appendChild(this._addVariantSpan(value));
      }
    });
  }

  _addVariantSpan(value) {
    const variantText = `Variant: ${value}`;
    const span = document.createElement('span');
    span.className = 'variant';
    span.dataset.tooltip = variantText;
    const text = document.createTextNode(variantText);
    span.appendChild(text);
    return span;
  }

  _addRootSuttaSpan() {
    const spanElement = document.createElement('span');
    spanElement.className = 'root';
    spanElement.lang = this.rootSutta.lang;
    spanElement.setAttribute('translate', 'no');
    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    spanElement.appendChild(textSpan);
    return spanElement;
  }

  _addReferenceSpan() {
    const spanElement = document.createElement('span');
    spanElement.className = 'reference';
    return spanElement;
  }

  async _addReferenceText() {
    if (!this.suttaReference || this._articleElement().length === 0) {
      return;
    }
    await this._fetchRootEdition();
    Object.entries(this.suttaReference).forEach(([key, value]) => {
      const refElement = this.querySelector(`#${CSS.escape(key)} .reference`);
      if (refElement) {
        this._addReferenceAnchor(value, refElement);
      }
    });

    this._hashChangeHandler();
  }

  _addReferenceAnchor(ref, refElement) {
    const refs = ref.replace(/\s*/g, '').split(',');
    if (refs.length === 0) {
      return;
    }
    refs.forEach(item => {
      if (!this.querySelector(`#${CSS.escape(item)}`)) {
        let className = item;
        const anchor = document.createElement('a');
        const editionInfo = this._getReferenceInfo(item);
        if (editionInfo?.uid?.length >= 3 && editionInfo?.uid?.substring(0, 3) === 'pts') {
          className = 'pts';
        } else if (editionInfo?.uid?.length >= 3 && editionInfo?.uid?.substring(0, 3) === 'sya') {
          className = 'sya';
        } else if (editionInfo?.uid?.length >= 3 && editionInfo?.uid?.substring(0, 3) === 'csp') {
          className = 'csp';
        } else if (item.length >= 2 && item.substring(0, 2) === 'sc') {
          className = 'sc';
        } else {
          className = editionInfo?.uid;
        }
        anchor.className = className || item;
        anchor.title = editionInfo?.long_name || item;
        this._initPtsReferenceAnchor(anchor, item);
        refElement.appendChild(anchor);
      }
    });
  }

  _initPtsReferenceAnchor(anchor, refStr) {
    anchor.id = refStr;
    anchor.href = `#${refStr}`;
    const text = document.createTextNode(refStr);
    anchor.appendChild(text);
  }

  _getReferenceInfo(ref) {
    for (let i = ref.length; i >= 0; i--) {
      const refUid = ref.substring(0, i);
      if (refUid === 'sya') {
        return this.rootEdition.find(x => x.uid === 'sya-all');
      }
      if (refUid) {
        const edition = this.rootEdition.find(x => x.uid === refUid);
        if (edition) {
          return edition;
        }
      }
    }
    return {};
  }

  _addTranslationText() {
    if (!this.bilaraTranslatedSutta || this._articleElement().length === 0) {
      return;
    }
    this._deleteTranslatedSuttaMarkup();
    this._addTranslationSuttaMarkup();
    Object.entries(this.bilaraTranslatedSutta).forEach(([key, value]) => {
      this._addTranslationTextToSpan(CSS.escape(key), value);
    });
  }

  _addTranslationTextToSpan(key, value) {
    const spanElement = this.querySelector(`#${key} .translation .text`);
    if (spanElement) {
      spanElement.innerHTML = value;
    }
  }

  _putWordsIntoSpans(selector, unit) {
    this._startGeneratingSpans(selector, unit);
  }

  _startGeneratingSpans(selector, unit) {
    let segments = this.querySelectorAll(selector);
    segments = Array.from(segments);
    let empty = true;
    while (segments.length > 0) {
      const segment = segments.shift();
      if (!segment) {
        return;
      }
      empty = false;
      this._putSegmentIntoSpans(segment, unit);
    }
    if (empty) {
      return;
    }
    if (unit === 'word') {
      this.spansForWordsGenerated = true;
    } else if (unit === 'graph') {
      this.spansForGraphsGenerated = true;
    }
  }

  _putSegmentIntoSpans(segment, unit) {
    const text = segment.innerHTML;
    const div = document.createElement('div');
    div.innerHTML = text;
    this._recurseDomChildren(div, true, unit);
    segment.innerHTML = div.innerHTML
      .replace(/%spfrnt%/g, `<span class="word">`)
      .replace(/%spback%/g, '</span>')
      .replace(/—/g, '</span>—<span class="word">');
  }

  _recurseDomChildren(start, output, unit) {
    let nodes;
    if (start.childNodes) {
      nodes = start.childNodes;
      this._loopNodeChildren(nodes, output, unit);
    }
  }

  _loopNodeChildren(nodes, output, unit) {
    let node;
    for (let i = 0; i < nodes.length; i++) {
      node = nodes[i];
      this._addSpanToNode(node, unit);
      if (node.childNodes) {
        this._recurseDomChildren(node, output, unit);
      }
    }
  }

  _addSpanToNode(node, unit) {
    const NODE_TYPE_TEXT = 3;
    if (node.nodeType !== NODE_TYPE_TEXT) {
      return;
    }
    const tt = node.data;
    const strArr = tt.split(/\s+/g);
    let str = '';
    for (let i = 0; i < strArr.length; i++)
      if (strArr[i]) {
        if (unit === 'word') {
          str += `%spfrnt%${strArr[i]}%spback% `;
        } else if (unit === 'graph') {
          for (const graph of strArr[i]) {
            str += `%spfrnt%${graph}%spback%`;
          }
          str += ' ';
        }
      }
    node.data = str;
  }

  _addWordSpanId(selector) {
    let wordIdSeed = 0;
    this.querySelectorAll(selector).forEach(word => {
      word.id = `word_${wordIdSeed}`;
      wordIdSeed++;
    });
  }

  _addPaliLookupEvent(selector) {
    const allWordSpans = this.querySelectorAll(selector);
    const spans = Array.from(allWordSpans);
    for (const word of spans) {
      word.addEventListener('click', this.onPaliWordClick);
    }
  }

  _byPassLookupClick() {
    return (
      store.getState().displaySettingMenu ||
      store.getState().displaySuttaParallels ||
      store.getState().displaySuttaToC ||
      store.getState().displaySuttaInfo
    );
  }

  onPaliWordClick(e) {
    if (e.currentTarget.getRootNode().querySelector('sc-text-bilara')._byPassLookupClick()) {
      return;
    }
    const scBilaraText = e.currentTarget.getRootNode().querySelector('sc-text-bilara');
    const lookup = scBilaraText.querySelector('#pali_lookup');
    scBilaraText._removeDefineFocusedClass();
    scBilaraText._addDefineFocusedClass(e.currentTarget);
    scBilaraText._setSCBottomSheet(e.currentTarget, lookup);
  }

  _addChineseLookupEvent(selector) {
    const allWordSpans = this.querySelectorAll(selector);
    const spans = Array.from(allWordSpans);
    for (const word of spans) {
      word.addEventListener('click', this.onChineseWordClick);
    }
  }

  onChineseWordClick(e) {
    if (e.currentTarget.getRootNode().querySelector('sc-text-bilara')._byPassLookupClick()) {
      return;
    }
    const scBilaraText = e.currentTarget.getRootNode().querySelector('sc-text-bilara');
    const lookup = scBilaraText.querySelector('#chinese_lookup');
    scBilaraText._removeDefineFocusedClass();
    scBilaraText._addDefineFocusedClass(e.currentTarget);
    scBilaraText._setSCBottomSheet(e.currentTarget, lookup);
  }

  // eslint-disable-next-line class-methods-use-this
  _addDefineFocusedClass(currentTarget) {
    currentTarget.classList.add('spanFocused');
  }

  _removeDefineFocusedClass() {
    this.querySelectorAll('.spanFocused').forEach(dfElement => {
      dfElement.classList.remove('spanFocused');
    });
  }

  _removeLookupEvent(selector) {
    const allWordSpans = this.querySelectorAll(selector);
    const spans = Array.from(allWordSpans);
    spans.forEach(word => {
      word.removeEventListener('click', this.onPaliWordClick);
      word.removeEventListener('click', this.onChineseWordClick);
    });
  }

  _setSCBottomSheet(word, lookup) {
    const scBottomSheet = this.querySelector('sc-bottom-sheet');
    scBottomSheet.currentTarget = word;
    let keyword = '';
    if (lookup.id === 'chinese_lookup') {
      keyword = scBottomSheet.getSentenceText() || word.dataset.latin_text || word.textContent;
    } else {
      keyword = word.dataset.latin_text || word.textContent;
    }
    scBottomSheet.currentDefine = keyword;
    const lookupResult = lookup.lookupWord(keyword);
    scBottomSheet.currentDefineDetail = lookupResult.html;
    scBottomSheet.lookup = lookup;
    scBottomSheet.show();
  }

  _enablePaliLookup() {
    if (!this.spansForWordsGenerated) {
      this._putWordsIntoSpans('.root .text', 'word');
    }
    this._addWordSpanId('span.word');
    setTimeout(() => {
      this._addPaliLookupEvent('.root .text .word');
    }, 0);
  }

  _enableChineseLookup() {
    if (!this.spansForGraphsGenerated) {
      this._conditionallyPutIntoSpans('lzh');
    }
    this._addWordSpanId('.root .text .word');
    setTimeout(() => {
      this._addChineseLookupEvent('.root .text .word');
    }, 0);
  }

  _changeScript() {
    if (!this.rootSutta || this.rootSutta.lang !== 'pli') {
      return;
    }
    const segments = this.querySelectorAll('.root');
    if (this.hasScriptBeenChanged) {
      this._resetScript();
    }
    if (this.paliScript === 'latin') {
      this._segmentedTextContentElement().classList.add('latin-script');
      // set the latin text segment iso codes, if not set already
      if (!this._segmentedTextContentElement().querySelector(`.original-text[lang='pli-Latn']`)) {
        segments.forEach(item => this._setScriptISOCode(item, this.rootSutta.lang));
      }
      this.hasScriptBeenChanged = false;
    } else if (this._checkSelectedScriptValid()) {
      // if the script name is valid:
      this._setScript();
      this.hasScriptBeenChanged = true;
    }
    if (!this.translatedSutta) {
      // if we're in a segmented root text, set the top text div lang attribute:
      this._setScriptISOCode(this._segmentedTextContentElement(), this.rootSutta.lang);
    } else {
      this._segmentedTextContentElement().removeAttribute('lang');
    }
  }

  _checkSelectedScriptValid() {
    return scriptIdentifiers.find(x => x.script === this.paliScript);
  }

  _setScriptISOCode(targetNode, langAttr) {
    if (langAttr === 'pli' && this.paliScript) {
      langAttr += `-${this.paliScript}`;
    }
    targetNode.setAttribute('lang', langAttr);
  }

  _resetScript() {
    this._addRootText();
    this.spansForWordsGenerated = false;
    this._paliLookupStateChanged();
  }

  async _scriptTransliterate(uid, target) {
    if (!uid || !target) {
      return;
    }
    const converterApi = `${API_ROOT}/transliterated_sutta/${uid}/${target}`;
    try {
      this.transliteratedRootSutta = await (await fetch(converterApi)).json();
    } catch (error) {
      this.lastError = error;
    }
  }

  async _fetchRootEdition() {
    if (this.rootEdition.length === 0) {
      try {
        const rootEditionApi = `${API_ROOT}/root_edition`;
        this.rootEdition = await (await fetch(rootEditionApi)).json();
      } catch (error) {
        this.lastError = error;
      }
    }
  }

  _setScript() {
    if (this.rootSutta.lang === 'pli') {
      this._setScriptOfSegments();
    }
  }

  async _setScriptOfSegments() {
    await this._scriptTransliterate(this.suttaId, this._scriptFunctionName());
    this._addTransliteratedRootText();
    if (this.querySelectorAll('.variant').length === 0) {
      this._addVariantText();
    }
  }

  _scriptFunctionName() {
    if (!this.paliScript) {
      return 'latin';
    }
    return this.paliScript.charAt(0).toUpperCase() + this.paliScript.slice(1);
  }

  listenThisSutta() {
    if (!this.suttaId || !this.language) {
      return;
    }
    const authorUid = this.translatedSutta?.author_uid || 'sujato';
    const url = `https://www.api.sc-voice.net/scv/ebt-site/${this.suttaId}/${this.language}/${authorUid}`;
    window.open(url, '_blank');
  }
}

customElements.define('sc-text-bilara', SCTextBilara);
