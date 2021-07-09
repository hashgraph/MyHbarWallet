<template>
    <Headline title="Download" parent="tools" />

    <div container class="h-screen flex flex-col max-w-lg m-auto mt-10">
        <label
            class="font-medium text-squant dark:text-white mb-4"
        >{{ $t("InterfaceDownload.fileId") }}</label>
        <EntityIdInput
            type="file"
            v-model="state.downloadId"
            :placeholder="$t('AccessAccount.section2.input.placeholder')"
        />

        <Button
            color="green"
            class="py-3 mt-6 w-full mt-10"
            :busy="state.sendBusyText != null"
            @click="openModal"
        >{{ $t("InterfaceToolTile.download.title") }}</Button>

        <Modal :isVisible="state.showFeeModal" title="Download" @close="closeModal">
            <div class="table-auto mt-8 p-4">
                <tr>
                    <td class="w-full">{{ $t('InterfaceTransactionDetails.operator') }}</td>
                    <td class="">{{ state.accountId.toString() }}</td>
                </tr>
                <tr>
                    <td class=" ">{{ $t('InterfaceTransactionDetails.estimate') }}</td>
                    <td class="">{{ state.maxFee }}</td>
                </tr>
            </div>

            <div class="mt-4 w-full text-center">
                <Button
                    color="white"
                    class="p-3 w-5/12 m-2"
                    @click="closeModal"
                >{{ $t('BaseButton.dismiss') }}</Button>
                <Button
                    color="green"
                    class="p-3 w-5/12 m-2"
                    @click="download"
                >{{ $t('BaseButton.continue') }}</Button>
            </div>
        </Modal>
    </div>
</template>


<script lang = "ts">
import { defineComponent, reactive, nextTick } from "vue";
import Headline from "../../components/interface/Headline.vue";
import Button from "../../components/base/Button.vue";
import Modal from "../../components/interface/Modal.vue";
import EntityIdInput from "../../components/base/EntityIdInput.vue";
import { useStore } from "../../store";
import { Hbar, HbarUnit } from "@hashgraph/sdk";

export default defineComponent({
    name: "DownloadFile",
    components: {
        Headline,
        Button,
        Modal,
        EntityIdInput,
    },
    setup() {

        const store = useStore();
        let state = reactive({
            sendBusyText: null,
            showFeeModal: false,
            downloadId: null,
            transactionType: "downloadFile",
            accountId: store.accountId,
            maxFee: "2ℏ"
        });

        function download(): void {
            let client = store.client;
            console.log(client);
            client.setMaxQueryPayment(new Hbar(2, Hbar));
        }

        async function openModal(): void {
            nextTick((state.showFeeModal = true));
        }

        function closeModal(): void {
            nextTick((state.showFeeModal = false));
        }
        return { state, download, openModal, closeModal };
    },
});
</script>