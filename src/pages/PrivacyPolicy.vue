<template>
  <div
    class="
      my-20
      max-w-2xl
      text-sm
      mx-auto
      text-midnight-express
      dark:text-white
    "
  >
    <div class="text-center text-3xl font-semibold">Privacy Policy</div>

    <div class="mt-4 text-center">{{ $t("PrivacyPolicy.lastUpdated") }}</div>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section1.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section1.paragraph1") }}
    </p>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section1.paragraph2") }}
    </p>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section1.paragraph3") }}
    </p>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section1.paragraph4") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">HEDERA™ HASHGRAPH</div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section2.paragraph1") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section3.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section3.paragraph1") }}
    </p>

    <div class="mt-4 font-bold">
      {{ $t("PrivacyPolicy.section4.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section4.paragraph1") }}
    </p>

    <div class="mt-4 font-bold">{{ $t("PrivacyPolicy.section5.header") }}</div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section5.paragraph1") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section6.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section6.paragraph1") }}
    </p>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section6.paragraph2") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section7.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section7.paragraph1") }}
    </p>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section7.paragraph2") }}
    </p>

    <div class="mt-4 font-bold">{{ $t("PrivacyPolicy.section8.header") }}</div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section8.paragraph1") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section9.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section9.paragraph1") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section10.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section10.paragraph1") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section11.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section11.paragraph1") }}
    </p>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section11.paragraph2.header") }}
    </p>

    <ol>
      <li class="mt-4 mx-6">
        1. {{ $t("PrivacyPolicy.section11.paragraph2.subsection1") }}
      </li>

      <li class="mt-4 mx-6">
        2. {{ $t("PrivacyPolicy.section11.paragraph2.subsection2") }}
      </li>

      <li class="mt-4 mx-6">
        3. {{ $t("PrivacyPolicy.section11.paragraph2.subsection3") }}
      </li>

      <li class="mt-4 mx-6">
        4. {{ $t("PrivacyPolicy.section11.paragraph2.subsection4") }}
      </li>

      <li class="mt-4 mx-6">
        5. {{ $t("PrivacyPolicy.section11.paragraph2.subsection5") }}
      </li>

      <li class="mt-4 mx-6">
        6. {{ $t("PrivacyPolicy.section11.paragraph2.subsection6") }}
        <br />
        <a
          class="underline text-andrea-blue"
          href="mailto:support@myhbarwallet.com"
        >
          support@myhbarwallet.com
        </a>
      </li>
    </ol>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section12.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section12.paragraph1.header") }}
    </p>

    <ol>
      <li class="mt-4 mx-6">
        1. {{ $t("PrivacyPolicy.section12.paragraph1.subsection1") }}
      </li>

      <li class="mt-4 mx-6">
        2. {{ $t("PrivacyPolicy.section12.paragraph1.subsection2") }}
      </li>
    </ol>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section13.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section13.paragraph1") }}
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.section14.header") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section14.paragraph1") }}
      <a
        class="underline text-andrea-blue"
        href="mailto:support@myhbarwallet.com"
      >
        support@myhbarwallet.com
      </a>
    </p>

    <div class="mt-14 text-lg font-bold text-center">
      {{ $t("PrivacyPolicy.changesToPrivacyPolicy") }}
    </div>

    <p class="mt-4">
      {{ $t("PrivacyPolicy.section15.paragraph1") }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Privacy",
});
</script>
