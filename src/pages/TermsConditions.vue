<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="max-w-2xl mx-auto my-20 text-sm  text-midnight-express dark:text-white"
  >
    <div class="text-3xl font-semibold text-center">
      {{ $t("TermsAndConditions.title") }}
    </div>
    <div class="mt-6 text-center">
      {{ $t("TermsAndConditions.lastUpdated") }}
    </div>

    <div class="mt-14">
      <p class="mt-6">
        {{ $t("TermsAndConditions.safeAndSecure") }}
      </p>
      <p class="mt-6">
        {{ $t("TermsAndConditions.paragraph1") }}
      </p>
      <p class="mt-6">
        {{ $t("TermsAndConditions.paragraph2") }}
      </p>
      <p class="mt-6">
        {{ $t("TermsAndConditions.paragraph3") }}
      </p>

      <div class="mt-6 font-bold">
        Apache License
        <br>Version 2.0, January 2004
        <br>
        <a
          class="underline text-andrea-blue"
          href="http://www.apache.org/licenses/"
        >http://www.apache.org/licenses/</a>
      </div>

      <p class="mt-6 font-bold">
        {{ $t("TermsAndConditions.termsAndConditionsForUse") }}
      </p>

      <div>
        <p
          class="mt-6"
          v-html="
            formatRich($t('TermsAndConditions.license').toString())
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich($t('TermsAndConditions.licensor').toString())
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich(
              $t('TermsAndConditions.legalEntity').toString()
            )
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich($t('TermsAndConditions.youYour').toString())
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich($t('TermsAndConditions.source').toString())
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich($t('TermsAndConditions.object').toString())
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich($t('TermsAndConditions.work').toString())
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich(
              $t('TermsAndConditions.derivativeWorks').toString()
            )
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich(
              $t('TermsAndConditions.contribution').toString()
            )
          "
        />

        <p
          class="mt-6"
          v-html="
            formatRich(
              $t('TermsAndConditions.contributor').toString()
            )
          "
        />
      </div>

      <p class="mt-6">
        <strong><a name="copyright">{{
          $t("TermsAndConditions.grantOfCopyrightLicense")
        }}</a></strong>
        {{ $t("TermsAndConditions.grantOfCopyrightLicenseContent") }}
      </p>

      <p class="mt-6">
        <strong><a name="patent">{{
          $t("TermsAndConditions.grantOfPatentLicense")
        }}</a></strong>
        {{ $t("TermsAndConditions.grantOfPatentLicenseContent") }}
      </p>

      <p class="mt-6">
        <strong><a name="redistribution">{{
          $t("TermsAndConditions.redistribution")
        }}</a></strong>
        {{ $t("TermsAndConditions.redistribution.header") }}
      </p>

      <ol class="mt-6 leading-5">
        <li class="mx-6">
          1. {{ $t("TermsAndConditions.redistribution.paragraph1") }}
        </li>

        <li class="mx-6 mt-1">
          2. {{ $t("TermsAndConditions.redistribution.paragraph2") }}
        </li>

        <li class="mx-6 mt-1">
          3. {{ $t("TermsAndConditions.redistribution.paragraph3") }}
        </li>

        <li class="mx-6 mt-1">
          4. {{ $t("TermsAndConditions.redistribution.paragraph4") }}
          <br>
          <br>
          {{ $t("TermsAndConditions.redistribution.paragraph5") }}
        </li>
      </ol>

      <p class="mt-6">
        <strong><a name="contributions">{{
          $t("TermsAndConditions.submission")
        }}</a></strong>
        {{ $t("TermsAndConditions.submissionContent") }}
      </p>

      <p class="mt-6">
        <strong><a name="Trademarks">{{
          $t("TermsAndConditions.trademarks")
        }}</a></strong>
        {{ $t("TermsAndConditions.trademarksContent") }}
      </p>

      <p class="mt-6">
        <strong><a name="no-warranty">{{
          $t("TermsAndConditions.disclaimerOfWarranty")
        }}</a></strong>
        {{ $t("TermsAndConditions.disclaimerOfWarrantyContent") }}
      </p>

      <p class="mt-6">
        <strong><a name="no-liability">{{
          $t("TermsAndConditions.limitationOfLiability")
        }}</a></strong>
        {{ $t("TermsAndConditions.limitationOfLiabilityContent") }}
      </p>

      <p class="mt-6">
        <strong><a name="additional">{{
          $t(
            "TermsAndConditions.acceptingWarrantyOrAdditionalLiability"
          )
        }}</a></strong>
        {{
          $t(
            "TermsAndConditions.acceptingWarrantyOrAdditionalLiabilityContent"
          )
        }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { formatRich } from "../utils/format-rich";

export default defineComponent({
  name: "Terms",
  setup() {
    return { formatRich };
  },
});
</script>
