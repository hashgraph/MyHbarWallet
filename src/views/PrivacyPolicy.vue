<template>
  <CirclePage>
    <div class="wrap">
      <PageTitle title="Privacy Policy">
        {{ $t("privacyPolicy.lastUpdated") }}
      </PageTitle>

      <div class="heading">
        {{ $t("privacyPolicy.section1.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section1.paragraph1") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section1.paragraph2") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section1.paragraph3") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section1.paragraph4") }}
      </div>
      <div class="heading">
        HEDERA™ HASHGRAPH
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section2.paragraph1") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section3.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section3.paragraph1") }}
      </div>
      <div class="sub-heading">
        {{ $t("privacyPolicy.section4.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section4.paragraph1") }}
      </div>
      <h4>{{ $t("privacyPolicy.section5.header") }}</h4>
      <div class="paragraph">
        {{ $t("privacyPolicy.section5.paragraph1") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section6.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section6.paragraph1") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section6.paragraph2") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section7.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section7.paragraph1") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section7.paragraph2") }}
      </div>
      <h4>{{ $t("privacyPolicy.section8.header") }}</h4>
      <div class="paragraph">
        {{ $t("privacyPolicy.section8.paragraph1") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section9.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section9.paragraph1") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section10.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section10.paragraph1") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section11.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section11.paragraph1") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section11.paragraph2.header") }}
      </div>
      <ol>
        <li class="item">
          {{ $t("privacyPolicy.section11.paragraph2.subsection1") }}
        </li>
        <li class="item">
          {{ $t("privacyPolicy.section11.paragraph2.subsection2") }}
        </li>
        <li class="item">
          {{ $t("privacyPolicy.section11.paragraph2.subsection3") }}
        </li>
        <li class="item">
          {{ $t("privacyPolicy.section11.paragraph2.subsection4") }}
        </li>
        <li class="item">
          {{ $t("privacyPolicy.section11.paragraph2.subsection5") }}
        </li>
        <li class="item">
          <i18n path="privacyPolicy.section11.paragraph2.subsection6">
            <br>
            <a href="mailto:support@myhbarwallet.com">
              support@myhbarwallet.com
            </a>
          </i18n>
        </li>
      </ol>
      <div class="heading">
        {{ $t("privacyPolicy.section12.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section12.paragraph1.header") }}
      </div>
      <ol>
        <li class="item">
          {{ $t("privacyPolicy.section12.paragraph1.subsection1") }}
        </li>
        <li class="item">
          {{ $t("privacyPolicy.section12.paragraph1.subsection2") }}
        </li>
      </ol>
      <div class="heading">
        {{ $t("privacyPolicy.section13.header") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section13.paragraph1") }}
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.section14.header") }}
      </div>
      <div class="paragraph">
        <i18n path="privacyPolicy.section14.paragraph1">
          <a href="mailto:support@myhbarwallet.com">
            support@myhbarwallet.com
          </a>
        </i18n>
      </div>
      <div class="heading">
        {{ $t("privacyPolicy.changesToPrivacyPolicy") }}
      </div>
      <div class="paragraph">
        {{ $t("privacyPolicy.section15.paragraph1") }}
      </div>
    </div>
  </CirclePage>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

import CirclePage from "../components/CirclePage.vue";
import PageTitle from "../components/PageTitle.vue";

export default createComponent({
    props: {}, // ts hack
    components: {
        CirclePage,
        PageTitle
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    color: var(--color-china-blue);
    margin: 0 auto;
    max-width: 620px;
    padding: 60px 0;
}

.paragraph {
    font-size: 14px;
    margin-block: 14px;
}

.heading {
    font-size: 16px;
    font-weight: 700;
    margin-block: 16px;
    padding-block-start: 30px;
    text-align: center;
}

.sub-heading {
    font-weight: 700;
    margin-block: 18px;
}

.item {
    margin-block-end: 14px;
}
</style>
