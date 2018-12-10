import { html } from '@polymer/lit-element';


export const suttaplexCss = html`
<style>
  :host {
    --paper-card-background-color: var(--sc-secondary-background-color);
  }

  .menu-listbox {
      --paper-input-container-focus-color: var(--sc-primary-accent-color);
      --paper-input-container-color: var(--sc-secondary-text-color);
      --paper-input-container-input-color: var(--sc-secondary-text-color);
      --paper-dropdown-menu-icon_-_color: var(--sc-disabled-text-color);
      background-color: var(--sc-secondary-background-color);
  }

  h1 {
    @apply --paper-font-headline;
    @apply --sc-serif-font;
    @apply --sc-skolar-font-size-xl;
    margin: 0;
  }

  h2 {
    @apply --paper-font-headline;
    @apply --sc-sans-font;
    color: var(--sc-secondary-text-color);
  }

  .hide-element {
    display: none;
  }

  .suttaplex {
    display: block;
    padding: var(--sc-size-md);
    margin-bottom: var(--sc-size-md);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    --iron-icon-height: 20px;
    --iron-icon-width: 20px;
  }

  .tx-level-icon {
    --iron-icon-height: 24px;
    --iron-icon-width: 24px;
    margin: 0 var(--sc-size-sm);
  }

  .top-menu-button {
    padding: 0;
    --paper-menu-button-dropdown: {
      @apply --shadow-elevation-8dp;
    };
  }

  .top-menu-button .btn-share, .top-menu-button .btn-speaker {
    align-self: flex-end;
    width: var(--sc-size-lg);
    height: var(--sc-size-lg);
  }
  
  summary {
    cursor: pointer;
    outline: none;
  }

  paper-icon-button {
    color: var(--sc-disabled-text-color);
  }

  .btn-speaker {
    padding: 5px;
  }

  .btn-share {
    padding: 7px;
  }
 
  .suttaplex-nerdy-row {
    @apply --paper-font-body2;
    color: var(--sc-secondary-text-color);
    font-weight: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-top: -4px;
  }

  .popuptext {
    overflow: visible;
    display: none;
  }

  .popuptext.show {
     display: unset;
  }
  
  .nerdy-row-element {
    margin-right: var(--sc-size-md-larger);
  }

  .nerdy-vol-page:before {
    content: "📕";
    margin-right: 4px;
  }

  .volpage-biblio-info, .suttaplex-nerdy-row .popuptext {
    @apply --paper-font-body1;
    position: absolute;
    z-index: 200;
    background-color: var(--sc-tertiary-background-color);
    padding: 12px;
    border-top: var(--sc-border);
    margin: 0 var(--sc-size-xl) 0 0;
    box-shadow: var(--paper-material-elevation-2_-_box-shadow);
    white-space: normal;
  }

  .suttaplex-details {
    display: inline-block;
  }

  .blurb {
    margin: var(--sc-size-sm) 0;
  }

  .primary-accent-icon {
    color: var(--sc-primary-accent-color);
    stroke: var(--sc-primary-accent-color);
  }

  .section-details h3 {
    height: 23px;
    margin: var(--sc-size-sm) 0;
    @apply --sc-skolar-font-size-md;
    font-weight: normal;
    color: var(--sc-secondary-text-color);
    display: inline-block;
  }
  
  .top-row-icons {
    align-items: center;
    display: flex;
  }

  #more_par_menu {
    outline: none;
  }

  ::-webkit-details-marker {
    color: var(--sc-disabled-text-color);
  }
  
  
  sc-suttaplex-tx {
    display: block;
    margin: var(--sc-size-sm) 0;
  }
  
  sc-suttaplex-tx:first-of-type {
    margin-top: 0;
  }

  sc-suttaplex-tx:last-of-type {
    margin-bottom: 0;
  }
</style>`;


export const suttaplexTxCss = html`
<style>
  a {
    color: inherit;
    text-decoration: inherit;
    position: relative;
    overflow: hidden;
  }

  .sc-primary-color:hover {
    background-color: var(--sc-primary-color-light);
  }

  .sc-primary-color paper-ripple {
    color: var(--sc-primary-color-medium);
  }

  .sc-primary-accent-color:hover {
    background-color: var(--sc-tertiary-color-light);
  }

  .sc-primary-accent-color paper-ripple  {
    color: var(--sc-tertiary-color-medium);
  }

  .tx {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    padding: 0 var(--sc-size-sm);
    border-radius: var(--sc-size-sm);
  }

  .tx:after {
    content: "➔";
    font-size: 32px;
    color: white;
    margin-left: auto
  }

  .tx,
  .tx:hover,
  .tx:active {
    transition: all 0.2s ease;
  }

  .tx-icon {
    height: 28px;
    min-width: 28px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    --iron-icon-width: 18px;
    --iron-icon-height: 18px;
  }

  .sc-primary-color .tx-icon {
    --iron-icon-fill-color: var(--sc-primary-color);
    border: 2px solid var(--sc-primary-color);
  }

  .sc-primary-accent-color .tx-icon {
    --iron-icon-fill-color: var(--sc-tertiary-color-dark);
    border: 2px solid var(--sc-tertiary-color-dark);
  }

  .tx-details {
    padding: var(--sc-size-sm) var(--sc-size-md);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline
  }

  .tx-creator {
    @apply --sc-serif-font;
    margin-right: var(--sc-size-md);
  }

  .tx-publication {
    color: var(--sc-secondary-text-color);
    @apply --sc-skolar-font-size-s;
  }
</style>`;

export const parallelsListCss = html`
<style>
  a {
    position: relative;
  }

  .parallels-table {
    border-collapse: separate;
    border-spacing: 0 var(--sc-size-sm);
    margin: 0 auto;
    width: 95%;
  }

  .parallels-root-cell,
  .parallels-parallel-cell {
    border-radius: var(--sc-size-sm);
    background: var(--sc-tertiary-background-color);
  }

  .parallels-parallel-cell {
    width: 100%;
    padding: 0;
  }

  @media screen and (max-width: 600px) {
    .parallels-parallel-cell {
      max-width: 200px;
    }
  }

  .parallels-root-cell {
    text-align: center;
    min-width: 90px;
    padding: 0;
    position: relative; /* Hack for anchor height. */
  }

  .parallels-root-cell a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  paper-ripple {
    color: var(--sc-tertiary-color-medium);
  }
  
  .parallels-root-id {
    @apply --sc-skolar-font-size-sm;
    @apply --sc-serif-font;
  }

  .paper-spinner {
    --paper-spinner-color: var(--sc-primary-color);
    margin: var(--sc-size-md) 0;
    left: 50%;
  }

  .parallels-table-body {
    display: block;
    margin-bottom: var(--sc-size-sm);
  }

  .grey-icon {
    color: var(--sc-disabled-text-color);
  }

  .root-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    letter-spacing: var(--sc-all-caps_-_letter-spacing);
    text-transform: var(--sc-all-caps_-_text-transform);
    color: inherit;
  }
</style>`;

export const parallelItemCss = html`
<style>
  a {
    color: inherit;
    text-decoration: inherit;
    position: relative;
    display: block;
  }

  .parallel-item-main-info-container {
    width: 100%;
    padding: var(--sc-size-xs) var(--sc-size-sm);
  }

  .parallel-item-title {
    @apply --sc-skolar-font-size-sm;
    @apply --sc-serif-font;
    word-wrap: normal;
  }

  .parallel-item-biblio-info {
    @apply --paper-font-body1;
    @apply --shadow-elevation-3dp;
    border-top: var(--sc-border);
    position: absolute;
    z-index: 200;
    background-color: var(--sc-secondary-background-color);
    padding: 12px;
    margin: 0 var(--sc-size-xl) 0 0;
    white-space: normal;
  }

  ::-webkit-details-marker {
    color: var(--sc-disabled-text-color);
  }

  .parallel-item-details {
    @apply --paper-font-body2;
    color: var(--sc-secondary-text-color);
    overflow: hidden;
  }

  .d-block {
    display: inline-block;
  }

  .scrollable-dialog {
    margin: 0;
  }

  .vertical-margin-xs {
    margin-top: var(--sc-size-xs);
    margin-bottom: var(--sc-size-xs);
  }

  .d-flex {
    display: flex;
  }

  .justify-content-space-between {
    justify-content: space-between;
  }

  .align-items-center {
    align-items: center;
  }

  .parallel-item-volpages-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
  }
  
  .parallel-item-volpages-container > div:not(:last-of-type) {
    margin-right: var(--sc-size-md);
  }

  .parallel-item {
    flex-wrap: wrap;
  }

  .nerdy-row-summary {
      overflow: hidden;
  }
  
  paper-ripple {
      color: var(--sc-primary-color-medium);
  }
  
  [hidden] {
    display: none;
  }

  iron-icon {
    color: var(--sc-disabled-text-color);
    --iron-icon-height: var(--sc-size-md);
    --iron-icon-width: var(--sc-size-md);
  }
</style>
`;
