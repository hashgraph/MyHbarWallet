<template>
    <div id="faqs" class="faqs">
        <div class="wrap">
            <div class="page-container">
                <div class="head">
                    <div class="title">
                        <div class="title-text">FAQs</div>
                        <div class="subtitle-text">
                            Bacon ipsum dolor amet jerky venison short ribs
                            tri-tip porchetta
                        </div>
                    </div>
                    <CustomerSupportLink class="customer-support-link" />
                </div>
                <div class="cards">
                    <Accordion>
                        <template v-slot:title>
                            How do I create a new account?
                        </template>
                        <template v-slot:content>
                            MyHbarWallet (MHW) offers three ways to create a new
                            H wallet. These are via Keystore file, Passphrase,
                            or Private Key.
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            Can MHW work with other wallets?
                        </template>
                        <template v-slot:content>
                            MHW supports many different wallet types including
                            hardware wallets, such as the Ledger Nano S or
                            Trezor. We are also open for anyone to use their H
                            wallets with the appropriate information.
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            How can I send a transaction?
                        </template>
                        <template v-slot:content>
                            MHW lets anyone with a balance of Hbar send a
                            transaction without additional charges. Using the
                            Hedera Hashgraph requires a transaction fee paid in
                            Hbar, so we recommend having at least 1 Hbar to
                            cover around 2 - 3 transactions.
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            I forgot my passphrase / private key! What can I do?
                        </template>
                        <template v-slot:content>
                            MHW does not offer support for recovery or reset of
                            passwords / private keys. We always suggest writing
                            down private keys and passwords on physical media
                            for safekeeping. Maybe you saved it on your
                            computer!
                        </template>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import Accordion from "../components/Accordion.vue";
import CustomerSupportLink from "../components/CustomerSupportLink.vue";

export default createComponent({
    components: {
        Accordion,
        CustomerSupportLink
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    text-decoration: none;
}

.faqs {
    background-color: var(--color-white);
}

.wrap {
    padding: 80px 0;

    @media (max-width: 1024px) {
        padding: 50px 0;
    }
}

.page-container {
    align-self: center;
    margin: 0 auto;
    max-width: 1024px;
    padding: 0 20px;

    @media (max-width: 1024px) {
        padding: 0 25px;
    }
}

.head {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @media (max-width: 1024px) {
        align-items: flex-start;
        flex-direction: column;
    }
}

.title {
    margin-block-end: 30px;
}

.title-text {
    color: var(--color-black);
    font-size: 30px;
    font-weight: 500;
    margin-block-end: 15px;
}

.subtitle-text {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}

.cards {
    align-content: center;
    border-top: 1px solid var(--color-jupiter);
    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1024px) {
        margin-block-start: 30px;
    }
}

.customer-support-link {
    align-self: initial;
}
</style>
