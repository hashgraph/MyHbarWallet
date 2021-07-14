//A modal for submitting customer support emails
<template>
  <teleport to="#modals">
    <Modal
      :is-visible="isVisible"
      :title="$t('ModalCustomerService.title')"
      @close="handleClose"
    >
      <form
        class="pt-4 space-y-2"
        @submit.prevent="handleSubmit"
      >
        <TextInput
          v-if="!hasBrowser"
          v-model="state.browser"
          class="issue-item"
          :max-length="50"
          :placeholder="$t('ModalCustomerService.browser')"
        />

        <TextInput
          v-if="!hasPlatform"
          :model-value="state.platform.toString()"
          class="issue-item"
          :max-length="50"
          :placeholder="$t('ModalCustomerService.operatingSystem')"
        />
        
        <TextInput
          v-if="!hasDevice"
          v-model="state.device"
          class="issue-item"
          :max-length="50"
          :placeholder="
            $t('ModalCustomerService.deviceOrWalletIfAny')
          "
        />
        
        <TextInput
          v-if="!hasAccountId"
          v-model="state.accountId"
          class="issue-item"
          :max-length="50"
          :placeholder="$t('ModalCustomerService.accountIdIfAny')"
        />
        
        <TextInput
          v-if="!hasUrl"
          v-model="state.url"
          class="issue-item"
          :max-length="50"
          :placeholder="$t('ModalCustomerService.url')"
        />
        
        <br>
        
        <TextInput
          ref="input"
          v-model="state.description"
          multiline
          :max-length="1000"
          char-counter
          class="issue-item"
          :placeholder="$t('ModalCustomerService.describeTheIssue')"
          resizable
        />
        
        <Button
          class="w-full p-2"
          color="green"
          :compact="true"
        >
          {{ $t('Common.send') }}
        </Button>
      </form>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import platform from "platform";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useStore } from "../../store";
import { formatBuild, formatSupportLink } from "../../utils/format";
import Button from "../base/Button.vue";
import TextInput from "../base/TextInput.vue";

import Modal from "./Modal.vue";
// from vite.config.js
declare const __APP_VERSION__: string;
declare const __APP_LAST_COMMIT_SHORT_HASH__: string;
export default defineComponent({
    name: "ModalCustomerService",
    components: {
        Button,
        Modal,
        TextInput
    },
    setup() {
        const store = useStore();
        const input = ref<HTMLInputElement | null>(null);
        const router = useRouter();
        const route = useRoute()
        const appVersion = __APP_VERSION__;
        const appLastCommitShortHash = __APP_LAST_COMMIT_SHORT_HASH__;
<<<<<<< HEAD
        
        const account = computed(() => store.accountId != null ?
            store.accountId :
            null);

        const accountId: any = computed(() => {
            if (account.value != null) {
                return accountId.toString()
            }
            return null;
        });

=======
        const account = computed(() => store.accountId != null ?
            store.accountId :
            null);
        const accountId = computed(() => {
            if (account.value != null) {
                return account.value.toString()
            }
            return null;
        });
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
        const browser = computed(() => {
            const name = platform.name;
            const version = platform.version;
            return formatBuild(name ?? "", version);
        });
<<<<<<< HEAD

=======
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
        const device = computed(() => {
            const type = platform.product;
            const model = platform.version;
            return formatBuild(type, model);
        });
<<<<<<< HEAD

=======
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
        const state = reactive({
            platform: platform.os || "",
            browser: browser.value || "",
            url: route.name?.toString() ?? "",
            description: "",
            device: device.value || "",
            version: appVersion + appLastCommitShortHash,
            accountId: accountId.value || ""
        });
<<<<<<< HEAD

=======
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
        const sendLink = computed(() => formatSupportLink(
            state.url,
            state.platform,
            state.browser,
            state.device,
            state.version,
            state.accountId,
            state.description
        ));
<<<<<<< HEAD

        function handleSubmit(): void {
            window.open(sendLink.value);
            store.setContactSupportOpen(false);
            clearForms();
        }

        function clearForms(): void {
=======
        function handleSubmit(): void {
            window.open(sendLink.value);
            store.setContactSupportOpen(false);
            clearForm();
        }
        function clearForm(): void {
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
            state.device = "";
            state.accountId = "";
            state.description = "";
        }
        // When the route is updated, reset the path value
        watch(
            () => router.currentRoute,
            () => {
                if (router.currentRoute === undefined) return "unkown";
                state.url = router.currentRoute?.toString() ?? ""
                return null;
            }
        );
<<<<<<< HEAD

        const isVisible = computed(() => {
            return store.contactSupport
        });

        function handleClose(): void {
            store.setContactSupportOpen(false);
            clearForms();
        }

=======
        const isVisible = computed(() => {
            return store.contactSupport
        });
        function handleClose(): void {
            store.setContactSupportOpen(false);
            clearForm();
        }
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
        return {
            hasAccountId: accountId.value != null,
            hasPlatform: platform.name!= null,
            hasBrowser: browser.value != null,
            hasUrl: state.url != null,
            hasDevice: device.value != null,
            state,
            sendLink,
            handleSubmit,
            handleClose,
            input,
            isVisible,
        };
    }
});
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> f2c10c4df5318585ac3f75f3b2d0fce33b66cc11
