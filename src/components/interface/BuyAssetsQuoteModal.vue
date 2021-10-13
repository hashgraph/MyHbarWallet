<template>
  <Modal
    title="Get Quote"
    :is-visible="isVisible"
    @close="$emit('close')"
  >
    <div
      id="simplex-form"
      :ref="simplexFormRef"
    />
    <form
      class="text-center justify-center md:p-4 pt-8"
      @submit.prevent="getQuote"
    >
      <!-- <form id="simplex-form">
        <div id="checkout-element" />
      </form>
   
      <script>
        window.simplex.createForm();
      </script> -->

      <!-- <form id="simplex-form">
        <div id="checkout-element" />
      </form> -->
      <!-- <script
        src="https://iframe.sandbox.test-simplexcc.com/form-sdk.js"
        type="text/javascript"
      />
      <script>
        window.simplex.createForm();
      </script> -->
      <Select
        v-model="state.denomination"
        :options="state.denominations"
        :placeholder="state.denominations[0].name"
        class="z-10"
      />
      <div class="text-left mb-4 mt-4">
        {{ $t("InterfaceHome.quote.modal.amount") }}
      </div>

      <AssetInput
        asset="HBAR"
        @update:model-value="updateAmount"
      />

      <Button 
        color="green"
        class="w-3/4 px-12 p-2 m-8 md:mb-0"
        type="submit"
      >
        {{ $t("InterfaceHome.quote.modal.get.quote") }}
      </Button>

      <Button
        color="white"
        class="p-2 px-12 md:m-4 mb-4"
        type="button"
        @click="$emit('close')"
      >
        {{ $t("BaseButton.cancel") }}
      </Button>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, Ref } from "vue";

import { useStore } from "../../store";
import Button from "../base/Button.vue";
import Select, { Option } from "../base/Select.vue";

import Modal from "./Modal.vue";
import AssetInput from "./AssetInput.vue";

export default defineComponent({
    name: "BuyAssetsModal",
    components: {
        Modal,
        Button,
        AssetInput,
        Select
    },
    props: {
        isVisible: { type: Boolean, required: true }
    },
    emits: [
        "close",
        "quote"
    ],
    setup(){
      const store = useStore();
      const simplexFormRef = ref();

      const state = reactive({
        amount: 0,
        denomination: "USD",
        denominations: [
          {
            name: "USD",
            iconLight: null,
            iconDark: null
          },
          {
            name: "EUR",
            iconLight: null,
            iconDark: null
          }
        ] as unknown as Option[]
      });

      function updateAmount(e: Event): void {
        const amount = e as unknown as number;
        if(!isNaN(amount)) state.amount = amount ?? 0;
      }

      function getQuote(): void {
        console.log("from quote");
        console.log(state.denomination);
        console.log(state.amount);
        const paymentOptions = ["simplex_account", "credit_card"] as string[];
        store.client?.simplexGetQuote({ denomination: state.denomination, amount: state.amount, paymentMethod: paymentOptions });
      }

      onMounted(async ()=> {
        //Probably don't want to do this, I was trying this to see if it would work
        if(document.getElementById("simplexScript")) return;
        const scriptTag = document.createElement("script");
        scriptTag.src = "https://iframe.sandbox.test-simplexcc.com/form-sdk.js";
        scriptTag.id = "simplexScript";
        //document.appendChild(scriptTag);
      });

      return {
        state,
        updateAmount,
        getQuote,
        simplexFormRef
      };
    }
});
</script>