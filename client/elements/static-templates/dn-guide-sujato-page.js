import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles.js';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCDNGuide extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <div id="page-wrap">
        <main>
          <section>
            <article>
              <h1>${_`The Long Discourses: Dhamma as literature and compilation`}</h1>
              <p class="byline">${_`Bhikkhu Sujato, 2019`}</p>
              <nav class="contents">
                <ol>
                  <li>${_`<a href="#item1">How the Dīgha is Organized</a>`}</li>
                  <li>${_`<a href="#item2">The Gradual Training</a>`}</li>
                  <li>${_`<a href="#item3">How to Build a Long Discourse</a>`}</li>
                  <li>${_`<a href="#item4">The Mahāparinibbāna Cycle</a>`}</li>
                  <li>${_`<a href="#item5">A Brief Textual History</a>`}</li>
                </ol>
              </nav>
              <p>
                ${_`The Dīgha Nikāya is the first of the four main divisions in the Sutta Piṭaka of the Pali Canon (<i lang="pi">tipiṭaka</i>). It is translated here as <cite class="text-translated">Long Discourses</cite>. As the title suggests, its discourses are somewhat longer than those of other <i lang="pi">nikāyas</i>. There are, however, only 34 discourses in the collection, so despite the length of the individual discourses, the collection as a whole is the shortest of the <i lang="pi">nikāyas</i>.`}
              </p>
              <p>
                ${_`It is distinguished from the other <i lang="pi">nikāyas</i> by its more developed and elaborate literary forms. Outgrowing the bare and direct style of most of the early texts, here the extra length offers space for narratives and doctrinal expositions to find a fuller expression. This is an early hint at how the literary form of Buddhist texts was to develop in later years, moving towards expansiveness and abundance.`}
              </p>
              <p>
                ${_`It is no coincidence that these elaborate texts are often addressed to the brahmins, who were the self-proclaimed spiritual leaders of the time. The brahmins were the custodians of the most sophisticated texts in ancient India up to this time, the Vedic literature. It seems that one aim of the Dīgha was to impress such learned men. These discourses offer a wide range of examples of how the Buddha related to those of other religious paths.`}
              </p>
              <p>
                ${_`Another overriding theme of the Dīgha is the passing away of the Buddha. The centerpiece of the collection is <a class="ref" href="/dn16">DN 16</a>, <cite class="text-translated">The Great Discourse on the Buddha’s Extinguishment</cite> (<cite class="text-root">Mahāparinibbānasutta</cite>), a discourse of unrivaled importance. This presents the last journey of the Buddha, wandering in unhurried stages from town to town, each step bringing him closer to his passing. In the very length of the text, recording so many details of the journey, we can sense a longing to draw out those last precious days as far as possible.`}
              </p>
              <h2 id="item1">${_`How the Dīgha is Organized`}</h2>
              <p>
                ${_`The 34 discourses are grouped in three <i lang="pi">vaggas</i>. The first <i lang="pi">vagga</i> consists of thirteen discourses, each of which includes a lengthy passage on the spiritual practice of a monastic, known as the Gradual Training (<i lang="pi">anupubbasikkhā</i>).`}
              </p>
              <p>
                ${_`In the second <i lang="pi">vagga</i> we find a number of discourses of a more biographical nature. <a class="ref" href="/dn14">DN 14</a> <cite class="text-translated">The Great Discourse on the Harvest of Deeds</cite> (<cite class="text-root">Mahāpadānasutta</cite>) tells of past Buddhas, while <a class="ref" href="/dn16">DN 16</a> <cite class="text-root">Mahāparinibbāna</cite> tells of Gotama’s last days. In addition, a number of other discourses in this section are closely related to the <cite class="text-root">Mahāparinibbāna</cite>. I will discuss this cycle further below.`}
              </p>
              <p>
                ${_`The final <i lang="pi">vagga</i> is more miscellaneous. It includes long poetic sections, doctrinal compilations—some of which are precursors to the Abhidhamma—and narratives that are often humorous and occasionally border on farce.`}
              </p>
              <p>
                ${_`As usual in the <i lang="pi">nikāyas</i>, there is no overall sequence of the teaching and many details of organization appear quite arbitrary. Still, we can discern a purpose in the arrangement of a few of the major discourses. These details are unique to the Theravadin tradition, so should be seen as reflecting their concerns, rather than the fundamental principles of the Dīgha.`}
              </p>
              <p>
                ${_`The first discourse, <a class="ref" href="/dn1">DN 1</a> <cite class="text-translated">The Prime Net</cite> (<cite class="text-root">Brahmajalasutta</cite>), sets out a scheme of wrong views, and thus acts as a filter for the Dhamma, screening out possible misinterpretations. It seems that this arrangement was connected with the events of the so-called “Third Council” under King Ashoka, at a time when the Saṅgha was overrun with imposters who were not genuine Buddhists. The second discourse, <a class="ref" href="/dn2">DN 2</a> <cite class="text-translated">The Fruits of the Ascetic Life</cite> (<cite class="text-root">Sāmaññaphalasutta</cite>), addresses a fundamental question: why do people follow a life of renunciation? In answering this, it sets forth the Gradual Training, a distinctively Buddhist path to peace.`}
              </p>
              <p>
                ${_`The middle of the collection is dominated by discourses that deal in one way or another with the cosmic significance of the Buddha (<a class="ref" href="/dn14">DN 14</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn17">DN 17</a>, <a class="ref" href="/dn18">DN 18</a>, <a class="ref" href="/dn19">DN 19</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn21">DN 21</a>; to these may be added <a class="ref" href="/dn26">DN 26</a>, <a class="ref" href="/dn27">DN 27</a>, <a class="ref" href="/dn30">DN 30</a>, and <a class="ref" href="/dn32">DN 32</a>). Where the biographical texts of the Majjhima emphasize the practical and the personal, the specifics of how <em>our</em> Buddha lived, these discourses exist in an arena of mythic grandeur. Time and space are expanded as the poignant and personal details of the <cite class="text-root">Mahāparinibbāna</cite> are set among a series of mythological texts that show the potency of the Buddha and his teachings in the deep past, in the apocalyptic future, and in the present among the orders of gods.`}
              </p>
              <p>
                ${_`The central event in all this is the death of the Buddha. Historically this was a traumatic crisis for the Buddhist community, and many feared that the Dhamma would not survive. By lifting attention from the present trauma and pointing to a longer meaning, these suttas show that the Dhamma need not die with the Buddha. The events of the <cite class="text-root">Mahāparinibbāna</cite> spurred the Saṅgha to hold the First Council, where the discourses were collected and organized to ensure their preservation. And these are, of course, the very scriptures that we are reading. In this way, these narratives tell the story of their own origin.`}
              </p>
              <p>
                ${_`The Dīgha finishes with mostly doctrinal compilations (<a class="ref" href="/dn28">DN 28</a>, <a class="ref" href="/dn29">DN 29</a>, <a class="ref" href="/dn33">DN 33</a>, <a class="ref" href="/dn34">DN 34</a>). If the beginning of the Dīgha tells us <em>why</em> the teachings matter and the middle tells us <em>how</em> they came to be, the ending tells us <em>what</em> they are. It is a rather curious thing that in the Dīgha, many of the doctrines that we think of as fundamental to the Buddha’s teachings occur only rarely. These discourses rectify this situation, ensuring that the students of the Dīgha had access to a wide range of teachings. The last two discourses, in particular, are clearly compiled as handy mnemonics for memorizing sets of doctrinal teachings.`}
              </p>
              <h2 id="item2">${_`The Gradual Training`}</h2>
              <p>
                ${_`The Gradual Training sets out the steps taken by a Buddhist renunciate on their path. It begins with the arising of a Buddha in the world. Hearing the Buddha’s teaching, a person reflects on how best it can be applied to their own life. Realizing that “the household life is cramped and dirty, but the life of one gone forth is wide open”, they give up their worldly possessions and attachments, don the ochre robe of a Buddhist mendicant, and undertake a life of morality, simplicity, and meditation. Proceeding step by step to ever more advanced practices, they eventually enter into deep meditative absorption (<i lang="pi">jhāna</i>) before realizing the four noble truths and finding true freedom.`}
              </p>
              <p>
                ${_`The Gradual Training is an expansion of the threefold training (<i lang="pi">tisso sikkhā</i>): ethics (<i lang="pi">sīla</i>), meditative immersion (<i lang="pi">samādhi</i>), and wisdom (<i lang="pi">paññā</i>). At <a class="ref" href="/an3.89">AN 3.89</a> the three trainings are defined:`}
              </p>
              <ul>
                <li>${_`ethics (in a monastic context) requires keeping the monastic rules;`}</li>
                <li>${_`meditative immersion is the four absorptions;`}</li>
                <li>${_`wisdom is the understanding of the four noble truths.`}</li>
              </ul>
              <p>
                ${_`This teaching is distributed widely throughout the early Buddhist texts. In the Dīgha, for example, it’s found in the <cite class="text-root">Mahāparinibbāna</cite> as a standard teaching repeated by the Buddha at many of the stops on his journey. A series of shorter discourses on this subject may be found in the Samaṇa Vagga of the Aṅguttara (<a class="ref" href="/an3-samanavagga">AN 3.81–91</a>).`}
              </p>
              <p>
                ${_`This brief overview of the path is explained more fully in the Gradual Training, which explains each of the three trainings in considerable detail. This longer exposition appears to have been the original teaching on the overall lifestyle, practices, and aims of the Buddha’s mendicant followers. It seems that the Buddha preferred to encourage his monastics by exhorting them to follow the highest ideals of conduct and meditation. Only reluctantly did he set up the legal system of the Vinaya texts, with its procedures and punishments.`}
              </p>
              <p>
                ${_`The Gradual Training is found, in somewhat varying forms, in the Majjhima (<a class="ref" href="/mn27">MN 27</a>, <a class="ref" href="/mn51">MN 51</a>, <a class="ref" href="/mn38">MN 38</a>, <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/mn53">MN 53</a>, <a class="ref" href="/mn107">MN 107</a>, <a class="ref" href="/mn125">MN 125</a>), the Aṅguttara (<a class="ref" href="/an4.198">AN 4.198</a>, <a class="ref" href="/an10.99">AN 10.99</a>), and even the Abhidhamma (<a class="ref" href="/vb12">Vb 12</a>, <a class="ref" href="/pp2.4#114">Pp 2.4:114</a>). Curiously enough, however, it is not found among the collected discourses on the path found in the last book of the Saṁyutta. While virtually all of the practices of the Gradual Training are found in the Saṁyutta, the overall framework is not found.`}
              </p>
              <p>
                ${_`The Dīgha makes up for this lack by placing a <i lang="pi">vagga</i> of thirteen discourses right at the start featuring the Gradual Training. This is called the Sīlakkhandhavagga, the “Chapter on the Aggregate of Ethics”. Despite the title, however, these texts treat the full training on ethics, meditative immersion, and wisdom.`}
              </p>
              <p>
                ${_`While the content is similar in each place that the Gradual Training appears, the Dīgha versions feature a pronounced emphasis on beauty and pleasure. The stages of the path are illustrated by similes that are as lovely as they are apt, while each step of the path is said to be accompanied by a deepening sense of pleasure and happiness. The Gradual Training is not a path of suffering, but one of grace and joy and freedom.`}
              </p>
              <p>
                ${_`Due to the repetition, the texts invariably abbreviate all the expositions except for the first two discourses. It should be remembered, however, that this is merely a consequence of how the Pali tradition arranged these texts. In the Sanskrit and Chinese Dīrghāgamas, the texts in this section are arranged differently, and different suttas are either expanded or abbreviated accordingly.`}
              </p>
              <p>
                ${_`While the focus is firmly on monastic life, the general principles hold good for everyone, and indeed at <a class="ref" href="/mn53">MN 53</a> <cite class="text-translated">A Trainee</cite> (<cite class="text-root">Sekhasutta</cite>), Ānanda teaches essentially the same path to a lay audience. In the Sīlakkhandhavagga, many discourses are in fact addressed to lay people, most of whom are brahmins.`}
              </p>
              <p>
                ${_`The question of King Ajātasattu in <a class="ref" href="/dn2">DN 2</a> provides the key to understanding why this is so. He points out that in worldly life, each trade can be seen to have its own benefit. But what is the benefit of the renunciate life? While other ascetics falter before this question, the Buddha presents the Gradual Training. He shows how the life gone forth is not one of pain and distress, nor one of delayed gratification, but one that shows real benefits in this life. It is about the power and transformative potential of inner development and meditation. In contrast, the household path offers only limited happiness, with much uncertainty and stress, while the paths of other ascetics are unclear, ineffective, or painful, and the brahmins can only offer rituals and prayers of dubious efficacy. Thus the Gradual Training explains why there is a need for the Saṅgha at all.`}
              </p>
              <p>
                ${_`Just as the Gradual Training is built from the kernel of the threefold training, the code of monastic ethics is built from the core principles of basic precepts. It is divided into three sections. The first section begins with the most fundamental precept for everyone in Buddhism: non-violence, to refrain from killing any creature, however small. It continues with items found in such common teachings as the five precepts and the ten paths of skillful action. But it adds items that specially pertain to monastic life, such as avoiding luxuries and ownership of property. The second section on ethics expands these specifically monastic and renunciate precepts in much greater detail, while the final section deals with right livelihood. A Buddhist monastic, who relies on alms food given in faith, should not make a living by other means, especially through superstitious and magical practices.`}
              </p>
              <p>
                ${_`The Gradual Training builds on these ethical foundations as the mendicant undertakes a series of practices designed to quell the busyness and activity of the mind. They rein in their senses, avoiding things that are overly stimulating. They focus on remaining mindful and aware throughout all their activities. They aim at contentment, being satisfied with a few simple possessions.`}
              </p>
              <p>
                ${_`Only when all these have been developed does the mendicant resort to seclusion for meditation. Going to the forest, they undertake mindfulness meditation and give up the five hindrances that prevent peace of mind. These hindrances are one of the core meditation teachings in the suttas, regarded as the key obstacle to absorption. They are:`}
              </p>
              <dl>
                <dt>${_`Sensual desire`}</dt>
                <dd>
                  ${_`Includes any kind of craving, greed, or desire for sensual experience. It includes powerful forms such as sexual desire as well as more subtle kinds of attachment.`}
                </dd>
                <dt>${_`Ill will`}</dt>
                <dd>
                  ${_`Anything from outright hatred to subtle forms of annoyance and aversion come under this hindrance.`}
                </dd>
                <dt>${_`Dullness and drowsiness`}</dt>
                <dd>
                  ${_`When the mind begins to settle down in meditation, it commonly becomes sleepy or dull.`}
                </dd>
                <dt>${_`Restlessness and remorse`}</dt>
                <dd>
                  ${_`Restlessness is always looking for some future experience, while remorse keeps digging up the past, especially moments of regret.`}
                </dd>
                <dt>${_`Doubt`}</dt>
                <dd>
                  ${_`It is normal and healthy to doubt when it comes to things that we do not know. But if we do not understand the elements of what is right and what is wrong, doubt will subtly undermine our meditation.`}
                </dd>
              </dl>
              <p>
                ${_`Experiencing an ever-deepening peace and bliss, they ultimately enter a series of profoundly still states of meditative immersion known as the four absorptions (<i lang="pi">jhānas</i>).`}
              </p>
              <p>
                ${_`The absorptions are the fundamental meditation practice in early Buddhism and are essential to all stages of Awakening. They occur in many contexts, but it is here, in the Gradual Training, that they emerge most naturally from the life and practice undertaken by the mendicants. This context was so central to early Buddhists that when they compiled the early Abhidhamma text, the Vibhaṅga, the chapter on Absorption begins with the Gradual Training. It is true, there are lay followers in the early texts who were said to have practiced absorption. But it is equally true that when the Buddha taught how to attain such profound peace, he emphasized the power of deep renunciation.`}
              </p>
              <p>
                ${_`It has become common in certain modern forms of Buddhism to assert that absorptions are not an essential part of the path. Others say that, while important, the absorptions are relatively shallow states of concentration that may be easily attained on a short retreat. Suffice to say, neither of these views finds support in the early texts. The absorptions are essential, profound, and difficult to attain. Even with the full strength of renunciation, many mendicants in the Buddha’s day struggled to realize them. Nevertheless, it is a special quality of the Dhamma that each step along the path is accompanied by deepening peace and joy, and letting go gets easier the further one travels. This is what makes the realization of even such profound and subtle states possible.`}
              </p>
              <p>
                ${_`Emerging from the absorptions, the mendicant harnesses the power of a deeply purified mind to realize a series of special forms of knowledge or insight. These culminate in the realization of the four noble truths:`}
              </p>
              <ol>
                <li>${_`Suffering (<i lang="pi">dukkha</i>).`}</li>
                <li>${_`The origin of suffering, i.e. craving (<i lang="pi">samudaya</i>).`}</li>
                <li>${_`The cessation of suffering, i.e. Nibbāna (<i lang="pi">nirodha</i>).`}</li>
                <li>
                  ${_`The practice that leads to the end of suffering (<i lang="pi">magga</i>).`}
                </li>
              </ol>
              <p>
                ${_`Suffering is the spur that drives us to undertake spiritual practice. Only when we have some experience of suffering will we look for an escape. And when encountering the Buddha’s teaching, a seeker recognizes that the Dhamma speaks to that which matters in their own life, offering a powerful and pragmatic solution. But wallowing in suffering gets you nowhere. When you understand that this suffering is real, but has causes and conditions that you can do something about, it sparks faith and the resolve to act. The path itself is one of unfolding happiness and receding pain; the truth of the ending of suffering is experienced at every step. This culminates in the experience of profound meditative stillness, called absorption (<i lang="pi">jhāna</i>) or immersion (<i lang="pi">samādhi</i>). In such states, having let go of sensual desire, the five external senses cease (<i lang="pi">vivicc’eva kāmehi</i>) and the mind feels a peace and happiness unlike anything it has known before. Empowered by the clarity and brilliance of absorption, the reality of suffering and its cause becomes apparent. This signifies that one has realized the first stage of awakening, that of the stream-enterer (<i lang="pi">sotāpanna</i>).`}
              </p>
              <p>
                ${_`Stream-entry occurs when all the factors of the path—from the arousing of faith to the practice of absorption and deep insight—have been developed to a sufficient degree. At this point one has a profound insight into the nature of reality, letting go three of the ten fetters that bind a person to rebirth. In the Gradual Training the understanding of the four noble truths is usually followed by the understanding of the end of the defilements (<i lang="pi">āsava</i>), which signifies the attainment of full perfection (<i lang="pi">arahattā</i>). The remaining fetters are given up at this point, which is the final stage of the path: full awakening and freedom.`}
              </p>
              <h2 id="item3">${_`How to Build a Long Discourse`}</h2>
              <p>
                ${_`There are over a thousand discourses recorded in each of the Aṅguttara and the Saṁyutta Nikāyas, but only 34 long texts recorded in the Dīgha. The relatively short texts of the Aṅguttara and Saṁyutta are reminiscent of the pre-Buddhist Upaniṣads, especially the Bṛhadāraṇyaka and Chandogya. These consist of a series of mostly independent passages, each episode covering no more than a few pages, and assembled into a much larger text. They are recollections of concise and focused teachings at certain times and places by certain people. It would seem, then, from the overwhelming majority of contemporary texts both Buddhist and Brahmanical, that the short discourse or dialogue was the standard format.`}
              </p>
              <p>
                ${_`How, then, were these long texts constructed? Why? And for whom? Let us approach these questions by briefly considering a few different forms employed in the Dīgha.`}
              </p>
              <h3>${_`Inherently Complex Subjects`}</h3>
              <p>
                ${_`Some discourses are long because the subject matter is inherently complex and demands a lengthy explanation. Of course, the Buddha was a master of presenting subjects in both pithy and detailed forms. Nevertheless, there are a few discourses whose subject matter requires an extensive treatment.`}
              </p>
              <p>
                ${_`The most prominent example of this is the Gradual Training. In some cases—for example <a class="ref" href="/dn6">DN 6</a> <cite class="text-translated">With Mahāli</cite> and <a class="ref" href="/dn7">DN 7</a> <cite class="text-translated">With Jāliya</cite>—the discourse consists of little more than this passage, with a simple narrative background and some short extra teachings. So it seems that the presence of the long Gradual Training section was itself enough to qualify a discourse as “long”. Since this passage aims to provide a detailed guide to the whole of the renunciate spiritual life, from hearing the teaching to full awakening, the length is inherent in the subject matter. True, it is taught more briefly elsewhere, but even in those cases it tends to be somewhat long, and there was clearly a tendency to make it more inclusive.`}
              </p>
              <p>
                ${_`In other cases the Gradual Training is taught in the middle of a discourse that is already quite extensive. Such is the case with <a class="ref" href="/dn1">DN 1</a> <cite class="text-root">Brahmajala</cite>, although here, uniquely, it is only the first section on Ethics that is taught. But the bulk of the text sets forth a network of 62 kinds of wrong view. Here, the nature of the subject matter is so extensive and complex that a shorter exposition would not do it justice. Indeed, when this teaching is mentioned in shorter discourses (<a class="ref" href="/sn41.3">SN 41.3</a>), it is not summarized, but the reader is referred rather to the full text.`}
              </p>
              <h3>${_`Compilations`}</h3>
              <p>
                ${_`Far more common than inherently lengthy teachings are the compilations. In such cases, a long text provides an occasion or background framework within which a series of short passages are collected. Such passages usually occur in identical or near-identical form in the Aṅguttara or the Saṁyutta, and occasionally the Majjhima. Compiling them here enables the reciters of the Dīgha to learn a wide range of doctrines, and provides an essential backup, preserving the texts in case the shorter discourses are lost.`}
              </p>
              <p>
                ${_`In a few instances, such short passages are not found elsewhere in exactly the same form. Whether that is because they were unique to the Dīgha, or because the parallel passages have become lost, is hard to say.`}
              </p>
              <p>${_`How do we end up with parallel passages in so many different places?`}</p>
              <p>
                ${_`Clearly the Buddha taught very often and, like all teachers, repeated his message many times. Such repeated teachings would have been collected in various places. This would be the case with important and generic teachings found throughout the Buddhist literature, like the four noble truths or the four absorptions.`}
              </p>
              <p>
                ${_`In some cases, though, this is unlikely or impossible. For example, we sometimes find the exact same event on the same occasion—with the same teaching, the same location, and the same people—occurring in more than one text. In such instances it is clear that there is, in fact, just one passage, and it has been copied into two or more places.`}
              </p>
              <p>
                ${_`Generally speaking, it is prudent to assume that such passages existed as short discourses before being collected into the larger forms. This is because, as noted above, the short discourse is the dominant form, and rests closest to the oral tradition. It is a principle observed everywhere through early Buddhist texts that the redactors preferred to add rather than subtract. Thus texts commonly become longer over time, and rarely shorter.`}
              </p>
              <p>
                ${_`Examples of compilation are very common, and almost every discourse in the Dīgha does this to some extent. Here are just a few examples.`}
              </p>
              <p>
                ${_`<a class="ref" href="/dn16">DN 16</a> <cite class="text-root">Mahāparinibbāna</cite> includes a wide range of collected passages. In some cases events pertinent to the narrative may have occurred there originally and been extracted later, while in other cases the included passages seem strangely extraneous to the context and were no doubt added in at some point.`}
              </p>
              <p>
                ${_`Venerable Sāriputta is said to be the main author of several such long compilations. He is the teacher in <a class="ref" href="/dn33">DN 33</a> <cite class="text-translated">Reciting in Concert</cite> (<cite class="text-root">Saṅgītisutta</cite>) and <a class="ref" href="/dn34">DN 34</a> <cite class="text-translated">Up to Ten</cite> (<cite class="text-root">Dasuttarasutta</cite>), which consist almost entirely of short passages collected from elsewhere in the suttas and arranged by number. In <a class="ref" href="/dn28">DN 28</a> <cite class="text-translated">Inspiring Confidence</cite> (<cite class="text-root">Sampasādanīyasutta</cite>) he expresses his great faith in the Buddha, and cites a long series of passages to display the Buddha’s glory.`}
              </p>
              <p>
                ${_`A more sophisticated form of compilation is found in <a class="ref" href="/dn22">DN 22</a> <cite class="text-translated">The Longer Discourse on Mindfulness Meditation</cite> (<cite class="text-root">Mahāsatipaṭṭhānasutta</cite>), the most important meditation discourse in 20th century Theravāda. It gives a detailed account of the four kinds of mindfulness meditation. These are taught in brief in many places, but the details are found only here and at the mostly identical <a class="ref" href="/mn10">MN 10</a> <cite class="text-translated">Mindfulness Meditation</cite> (<cite class="text-root">Satipaṭṭhānasutta</cite>). Whereas many compilations simply list a series of different teachings, here the text is very systematic, organizing the compiled passages under the four heads. These meditation passages are mostly not found elsewhere in the Dīgha, and were no doubt added to ensure the Dīgha reciters preserved the full range of meditation teachings.`}
              </p>
              <p>
                ${_`To the already lengthy discourse at <a class="ref" href="/mn10">MN 10</a> is added a full exposition on the four noble truths, sourced from <a class="ref" href="/mn141">MN 141</a> <cite class="text-translated">The Analysis of the Truths</cite> (<cite class="text-root">Saccavibhaṅgasutta</cite>). In Burmese editions, this extended section later made its way back into the text of <a class="ref" href="/mn10">MN 10</a>. Since SuttaCentral’s text is a Burmese one, we include this in our Pali, but mark it as an addition.`}
              </p>
              <h3>${_`Narratives: backgrounds, parables, and myths`}</h3>
              <p>
                ${_`Unusually for early Buddhist texts, the Dīgha includes several lengthy narratives. Most obviously this includes <a class="ref" href="/dn16">DN 16</a> <cite class="text-root">Mahāparinibbāna</cite>. But it also includes a number of other narratives.`}
              </p>
              <p>
                ${_`In common with the discourses of other collections, we often find a simple narrative background that gives context to the teaching. However, in some cases this is developed in much greater detail as the narratives come to play a more sophisticated literary role than mere setting.`}
              </p>
              <p>
                ${_`<a class="ref" href="/dn2">DN 2</a> <cite class="text-root">Sāmaññaphala</cite> opens with King Ajātasattu of Magadha exclaiming over the beauty of the moonlit night and asking his ministers for advice as to which ascetic teacher he should visit. From the <cite class="text-root">Mahāparinibbāna</cite> and discourses elsewhere we know that Ajātasattu was a warlike king, so this setting immediately establishes a sense of wonder. The narrative unfolds gracefully, avoiding the excess of ornament so typical of later Indian narratives, and holding the key to its mystery close to its chest. Only at the end of the text do we learn the dreadful secret that plagues the king’s heart. Thus the narrative portions imbue the teachings—on the doctrines of other teachers as contrasted with the Buddha’s Gradual Training—with a tragic pathos.`}
              </p>
              <p>
                ${_`In addition to backgrounds, we also find narratives that are told as stories in the discourses themselves. These include short parables like the tale of the monk who mistakenly sought among the gods for an answer to his question (<a class="ref" href="/dn11">DN 11</a>). In <a class="ref" href="/dn23">DN 23</a> the monk Kumāra Kassapa debates with the skeptic Pāyāsi, illustrating his arguments with a series of tales alternatively humorous and gruesome. Such parables are found not infrequently elsewhere in the suttas, but in the Dīgha certain stories expand beyond this and approach the stature of myth. This includes some of the texts in the <cite class="text-root">Mahāparinibbāna</cite> cycle, such as <a class="ref" href="/dn17">DN 17</a> <cite class="text-root">Mahāsudassanasutta</cite> and <a class="ref" href="/dn14">DN 14</a> <cite class="text-root">Mahāpadānasutta</cite>.`}
              </p>
              <p>
                ${_`To forestall a common misunderstanding, in the study of religion, “myth” does not mean “something believed to be true that is actually false”, as it does in popular culture. Rather, a myth is a sacred story. Some sacred stories are true, some are inventions. But this is a matter for historians and is irrelevant to the mythology itself. The purpose of myth is to tell a story that creates meaning for those who participate in it, so they can understand their own lives in the context of the story being expressed.`}
              </p>
              <p>
                ${_`The Dīgha contains truly mythic texts in <a class="ref" href="/dn26">DN 26</a> <cite class="text-translated">The Wheel-Turning Monarch</cite> (<cite class="text-root">Cakkavattisīhanādasutta</cite>) and <a class="ref" href="/dn27">DN 27</a> <cite class="text-translated">The Origin of the World</cite> (<cite class="text-root">Aggaññasutta</cite>). These set forth a myth of origins, replacing conventional creation mythology with an evolutionary account of how the world came to be the way it is. In these stories, human choices play a critical role in how the environment evolves, and in how it will all fall apart. The <cite class="text-root">Aggañña</cite> depicts climate change quite explicitly, showing how human activity affects the plants, the weather, and the natural ecosystem of which we are a part (see also <a class="ref" href="/an3.56">AN 3.56</a>).`}
              </p>
              <p>
                ${_`The mythology is essentially cyclic. There is no absolute beginning, just another turning of the wheel. Thus even when the world falls apart and civilization collapses, there will be a new renaissance, far in the future, and ultimately another Buddha will arise. He is named as Metteyya (Sanskrit: <i lang="san">Maitreya</i>), who in the early texts appears only in <a class="ref" href="/dn26">DN 26</a> <cite class="text-root">Cakkavattisīhanāda</cite>. He went on to become one of the most important figures in Mahāyāna Buddhism, and many Buddhists even today still await his coming with hope. Yet <a class="ref" href="/dn26">DN 26</a> is not taught in order to encourage devotees to dedicate themselves to Metteyya, but to illustrate the impermanence and uncertainty of our lives. The Buddha always taught that we should practice as best we can to understand the Dhamma in this life.`}
              </p>
              <h2 id="item4">${_`The Mahāparinibbāna Cycle`}</h2>
              <p>
                ${_`In several instances, episodes mentioned in brief in the <cite class="text-root">Mahāparinibbāna</cite> have been spun off and expanded to become individual discourses in their own right. Thus the <cite class="text-root">Mahāparinibbāna</cite> dominates much of the Dīgha, not just through its own length and thematic weight, but through its influence and connections with other discourses.`}
              </p>
              <p>
                ${_`In my view, this cycle of suttas was likely composed by Ānanda and his students, beginning this great literary work with the <cite class="text-root">Mahāparinibbānasutta</cite> itself, and gradually branching off into related works. The cycle as a whole shows not only Ānanda’s characteristic personal love and devotion for the Buddha, but also reveals a concern for what is to come, for the fate of the Dhamma in the years after the Buddha’s passing. One distinctive unifying detail of these discourses is that they do not end with the standard phrase saying that the listeners rejoiced in the teachings, but instead finish directly with a teaching or a verse on the subject of impermanence or the long-lasting of the dispensation. Ānanda survived the Buddha for several decades, and his legacy was the establishment of the texts, thus preserving the memory of his beloved Teacher for future generations.`}
              </p>
              <dl>
                <dt>
                  ${_`<a class="ref" href="/dn16">DN 16</a> <cite class="text-translated">The Great Discourse on the Buddha’s Extinguishment</cite> (<cite class="text-root">Mahāparinibbānasutta</cite>)`}
                </dt>
                <dd>
                  ${_`Beginning with King Ajātasattu of Magadha declaring his intent to invade the Vajjis, and ending with the peaceful distribution of the Buddha’s relics to the potentially warring nations and clans, the story of the Buddha’s last journeys is as politically revealing as it is spiritually moving. Throughout, the theme of impermanence unifies the diverse events and teachings. The weight of constructing such an epic shows, however, in the considerable differences between extant versions of the text. Many of the extra repetitious sections—such as the apparently superfluous sets of eight that follow the eight causes of earthquakes—are not found in all parallels. It seems that over time, more and more material was added, and at certain points portions of the text were split off to form other discourses in the cycle.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn17">DN 17</a> <cite class="text-translated">King Mahāsudassana</cite>`}
                </dt>
                <dd>
                  ${_`In a small scene of the <cite class="text-root">Mahāparinibbāna</cite>, Ānanda encourages the Buddha to pass away in a well-known city, not in the obscure village of Kusinārā. The Buddha rebukes him, saying that in the past it had been a great city. The Sanskrit (Sarvāstivāda) versions of the <cite class="text-root">Mahāparinibbāna</cite> include a shorter account of the story of King Mahāsudassana in their <cite class="text-root">Mahāparinibbāna</cite> itself, but in the Pali it has become greatly extended and formed into its own long discourse. The discourse itself is fabulous, full of extended passages on the crystal balustrades and other wonders of Mahāsudassana’s palace. But at its heart is a very human story: the love of the queen for her king, and the pain of letting go. The struggle that the queen undergoes to fully understand that her king must pass mirrors the struggles of Ānanda in the <cite class="text-root">Mahāparinibbāna</cite> as he comes to terms with the passing of his beloved Teacher.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn18">DN 18</a> <cite class="text-translated">With Janavasabha</cite>`}
                </dt>
                <dd>
                  ${_`Like <a class="ref" href="/dn17">DN 17</a>, this begins with a short passage extracted from the <cite class="text-root">Mahāparinibbāna</cite>, to which has been added an extended narrative. During the journey in the <cite class="text-root">Mahāparinibbāna</cite>, Ānanda asks the Buddha to reveal the fate after death of devotees in the town of Nādika. Characteristically, it ends with the Buddha showing how people may know for themselves their own spiritual progress. This short passage is preserved as an independent discourse also in <a class="ref" href="/sn55.10">SN 55.10</a>. In <a class="ref" href="/dn18">DN 18</a>, however, the discourse continues with a long story of the doings of the gods, as told by the spirit Janavasabha. It culminates by saying that this discourses was learned by the Buddha from Janavasabha, and from there was taught to Ānanda, and he informed the assemblies of monks, nuns, laymen, and lay women, resulting in the Buddha’s dispensation being famous and successful among gods and men. This corroborates the idea that these discourses, shaped by Ānanda, were aimed at ensuring the long-lasting of Buddhism.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn28">DN 28</a> <cite class="text-translated">Inspiring Confidence</cite> (<cite class="text-root">Sampasādanīyasuttasutta</cite>)`}
                </dt>
                <dd>
                  ${_`The <cite class="text-root">Mahāparinibbāna</cite> records an incident where Sāriputta, the Buddha’s foremost disciple, comes to him and makes a “lion’s roar” of his faith in the Buddha, based on his understanding of Dhamma. This is recorded as an independent discourse at <a class="ref" href="/sn47.12">SN 47.12</a>. We also have a short discourse at <a class="ref" href="/sn47.13">SN 47.13</a> that tells of Sāriputta’s death. This echoes the themes of the <cite class="text-root">Mahāparinibbāna</cite>, even including the famous saying that one should be one’s own refuge. Clearly this must have happened during the journey recorded in the <cite class="text-root">Mahāparinibbāna</cite>. Oddly, however, it is not included in <a class="ref" href="/dn16">DN 16</a>, and in addition, it situates the Buddha in Sāvatthī, far from the track of his journey. Regardless, the passage on the lion’s roar was expanded into its own extensive discourse, with Sāriputta expounding at length on various inspiring qualities of the Buddha. This gives an opportunity to list many standard doctrinal teachings. Like <a class="ref" href="/dn18">DN 18</a>, the sutta ends with an exhortation to share the teaching.`}
                </dd>
              </dl>
              <p>
                ${_`In addition to texts that have a direct literary and narrative connection with the <cite class="text-root">Mahāparinibbāna</cite>, there is a further series of discourses that share a more indirect or thematic connection.`}
              </p>
              <dl>
                <dt>
                  ${_`<a class="ref" href="/dn14">DN 14</a> <cite class="text-translated">The Great Discourse on the Harvest of Deeds</cite> (<cite class="text-root">Mahāpadānasuttasutta</cite>)`}
                </dt>
                <dd>
                  ${_`The Buddha gives biographical details of six past Buddhas, as well as a lengthy account of the life of one of them, Vipassī. This discourse establishes the historical Buddha Gotama as one of a series of world teachers that stretches back into the deep past, and whose dispensations all follow similar patterns.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn29">DN 29</a> <cite class="text-translated">An Impressive Discourse</cite> (<cite class="text-root">Pāsādikasutta</cite>)`}
                </dt>
                <dd>
                  ${_`This begins with the story of the passing away of the Jain leader Mahāvīra (Nigaṇṭha Nātaputta). In the Buddhist texts, this is depicted as a disaster for the Jains, as they fell apart in conflict right away. Whether this is historically accurate or not, the text shows the Buddha taking the opportunity to teach the qualities that make a religious movement last long after the passing of the founder. Discourses in response to this are found at <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn29">DN 29</a>, <a class="ref" href="/dn33">DN 33</a>, and <a class="ref" href="/mn104">MN 104</a>. In the current sutta, contrasting his own dispensation with what he claims was the inadequacy of Jain techings, the Buddha declares that the faith and practice of his followers is well-grounded, since it is based on genuine Awakening.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn30">DN 30</a> <cite class="text-translated">The Marks of a Great Man</cite> (<cite class="text-root">Lakkhaṇasutta</cite>)`}
                </dt>
                <dd>
                  ${_`The early texts refer several times to a mysterious set of bodily characteristics known as the “marks of a great man”. These are said to fulfill a brahmanical prophecy that one who possesses such marks will either become a universal emperor or a fully awakened Buddha. Normally when the suttas present something as a brahmanical teaching, it is in fact found in brahmanical texts. But in this case no trace of such a doctrine has been found, so the origins of this mythological idea are obscure. The story of the two paths is a classic mythological theme, found in the oldest known myth, the story of Gilgamesh. The marks of a great man exist as a curious counterpoint to the rational teachings found in most of the suttas. In this particular sutta, the Buddha is said to have explained each mark as a consequence of a specific kind of kammic deed. The literary and verse styles betray this as a late composition, and it has no real parallel in other collections. Nevertheless, it remains as a testament to the evolution of the idea of the Buddha, relating his spiritual qualities to his physical presence.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn33">DN 33</a> <cite class="text-translated">Reciting in Concert</cite> (<cite class="text-root">Saṅgītisutta</cite>)`}
                </dt>
                <dd>
                  ${_`Like <a class="ref" href="/dn29">DN 29</a>, this discourse is set after the death of Mahāvīra. Speaking to the Mallians of Pāvā—who appear also in the <cite class="text-root">Mahāparinibbāna</cite>—the Buddha asks Sāriputta to speak on his behalf. This echoes the theme of <a class="ref" href="/dn28">DN 28</a> and <a class="ref" href="/dn29">DN 29</a>, that it is the disciples who will be responsible for the continuation of the teachings. Sāriputta gives an extensive systematic presentation of doctrines, using the Aṅguttara principle of organizing teachings by number. Indeed, a study of this discourse can serve as an introduction to the teachings found in the Aṅguttara Nikāya. The monastics are encouraged to recite these teachings in concert, so that they may be preserved and the dispensation continued for a long time. This discourse anticipates the systematic tendencies of the Abhidhamma, and indeed one of the Sarvāstivādin Abhidhamma texts (<cite class="text-root">Saṅgītiparyāya</cite>) consists of an expansion and commentary on this discourse.`}
                </dd>
                <dt>
                  ${_`<a class="ref" href="/dn34">DN 34</a> <cite class="text-translated">Up to Ten</cite> (<cite class="text-root">Dasuttarasutta</cite>)`}
                </dt>
                <dd>
                  ${_`This is similar to the <cite class="text-root">Saṅgīti</cite>, but with a briefer narrative context and even more systematic style. Here the Buddha no longer appears, and the discourse is simply spoken by Sāriputta.`}
                </dd>
              </dl>
              <p>
                ${_`This does not exhaust the scope of the <cite class="text-root">Mahāparinibbāna</cite> cycle, for it is not confined to the Dīgha. We have already mentioned that several shorter suttas contain episodes either found in the <cite class="text-root">Mahāparinibbāna</cite> or related to it. And the story does not end with the Buddha’s death. The <cite class="text-root">Mahāparinibbāna</cite> tells of the funeral arrangements and events following the Buddha’s passing. In several versions apart from the Pali, this story continues directly into the account of the First Council. This narrative is the 21st chapter of the Vinaya Khandhakas, and indeed the <cite class="text-root">Mahāparinibbāna</cite> is found in the Vinaya of several schools. It is, in fact, one continuous narrative, and one of the many purposes of the <cite class="text-root">Mahāparinibbāna</cite> is to authorize the actions of the Saṅgha at the First Council, establishing the fundamental Buddhist scriptures in an organized and definitive manner. The First Council narrative was then extended to the Second Council, which echoes many of the same themes and ideas.`}
              </p>
              <p>
                ${_`These stories of the end of the Buddha’s life and teaching are also echoed in the first chapter of the Vinaya Khandhakas, which tells the story of the Buddha’s awakening, first teaching, and establishing of his community of followers. These are not just separate episodes in the Buddha’s life. The texts as we have them frequently echo ideas, turns of phrase, events, and people, all of which show that they were edited and composed as a coherent whole. Taken together, they make up a framework of a magnificent mythology: the life and death of the greatest spiritual teacher that the world has ever known.`}
              </p>
              <h2 id="item5">${_`A Brief Textual History`}</h2>
              <p>
                ${_`The Dīgha Nikāya was edited by T.W. Rhys Davids and J.E. Carpenter on the basis of manuscripts in Sinhalese, Burmese, and Thai scripts, and published in three volumes in Latin script by the Pali Text Society from 1890 to 1910.`}
              </p>
              <p>
                ${_`The first translation followed in 1899–1921 by T.W. and C.A.F. Rhys Davids, and was published under the “Sacred Books of the Buddhists” series under the title <cite class="book">Dialogues of the Buddha</cite>. This was a milestone in the publication of Buddhist texts, and marked the first occasion a full <i lang="pi">nikāya</i> was available in English. The translation endeavored to retain something of the literary flavor of the texts, and is accompanied by introductory essays and notes that are often useful and sometimes brilliant. But it is far from perfect, and contains many errors of both reading and interpretation. Today the insights of Rhys Davids remain valuable especially in the area of history and society.`}
              </p>
              <p>
                ${_`An updated translation by Maurice Walshe was published by Wisdom Publications in 1987 under the title <cite class="book">Thus Have I Heard: The Long Discourses of the Buddha</cite>, a title that in later editions was changed to <cite class="book">The Long Discourses of the Buddha</cite>. The Walshe edition benefited from many decades of study and practice of Dhamma in the west. Avoiding the archaic stylings of the older translations, it remains a clear and approachable translation, with a far more accurate handling of doctrinal terms and passages. But it too is far from perfect. It relies heavily on the Rhys Davids translation, and while it corrects many errors, it sometimes repeats errors found in the older translation. Worse, it not infrequently introduces new errors.`}
              </p>
              <p>
                ${_`In addition, there have been many translations of individual discourses and passages. Of these, the following were specially useful for my work:`}
              </p>
              <ul>
                <li>
                  ${_`For <a class="ref" href="/dn1">DN 1</a>, <a class="ref" href="/dn2">DN 2</a>, and <a class="ref" href="/dn15">DN 15</a>, the translations of text and commentary by Bhikkhu Bodhi.`}
                </li>
                <li>
                  ${_`For <a class="ref" href="/dn16">DN 16</a>, the translation by Bhikkhu Ānandajoti.`}
                </li>
                <li>
                  ${_`For the verses of <a class="ref" href="/dn30">DN 30</a>, the translations and studies by K.R. Norman.`}
                </li>
                <li>
                  ${_`For <a class="ref" href="/dn31">DN 31</a>, the translation by John Kelly, Sue Sawyer, and Victoria Yareham.`}
                </li>
              </ul>
            </article>
          </section>
        </main>
      </div>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_dn-guide-sujato-page';
  }
}

customElements.define('sc-dn-guide', SCDNGuide);
