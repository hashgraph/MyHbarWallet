<template>
  <Layout
    :title="$t('Software.title')"
    :back="{ name: 'access' }"
    class="max-w-3xl"
  >
    <div class="grid gap-5 auto-rows-min">
      <OptionCard
        v-for="option in options"
        :key="option.value"
        :data-cy-option="option.title"
        :light-icon="option.imageLight"
        :dark-icon="option.imageDark"
        :title="$t(option.title)"
        :desc="$t(option.description)"
        :recommended="option.value === SoftwareOption.Keystore"
        @click="onClickOption(option)"
      />
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="onChangeFile"
      />
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  SoftwareAttributes,
  SoftwareOption,
  SoftwareOptions,
} from "../../domain/SoftwareOptions";
import OptionCard from "../../components/base/OptionCard.vue";
import Layout from "../../components/access/Layout.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AccessSoftware",
  components: {
    OptionCard,
    Layout,
  },
  setup() {
    const router = useRouter();
    const fileInput = ref<HTMLInputElement>();

    const options = Array.from(SoftwareOptions.values()).filter(
      (option) => option.supported
    );

    function onClickOption(option: SoftwareAttributes) {
      if (option.value === SoftwareOption.Keystore) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fileInput.value!.click();
      } else {
        router.push({ name: option.route });
      }
    }

    async function onChangeFile(event: Event) {
      let files = (event.target as HTMLInputElement).files;

      if (files != null && files.length === 1) {
        let fileData = await files[0].text();

        router.push({
          name: "access.software.keystore",
          state: {
            fileData,
            fileName: files[0].name,
          },
        });
      }
    }

    return {
      options,
      SoftwareOption,
      fileInput,
      onClickOption,
      onChangeFile,
    };
  },
});
</script>
