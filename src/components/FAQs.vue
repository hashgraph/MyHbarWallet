<template>
    <div id="faqs" class="faqs">
        <div class="wrap">
            <div class="page-container">
                <div class="head">
                    <div class="title">
                        <div class="title-text">FAQs</div>
                        <div class="subtitle-text">
                            Answers to most frequently asked questions.
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
                            MyHederaWallet (MHW) offers three ways to create a
                            new H wallet. These are via Keystore file,
                            Passphrase, or Private Key. Pair the keys with an
                            account ID to start transacting hbar.
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            Can MHW work with other wallets?
                        </template>
                        <template v-slot:content>
                            MHW supports many different wallet types with plans
                            to include support for hardware wallets in the near
                            future. We are also open for anyone to use their H
                            wallets with the appropriate information.
                        </template>
                    </Accordion>
                    <Accordion>
                        <template v-slot:title>
                            What does it cost to use MyHbarWallet?
                        </template>
                        <template v-slot:content>
                            MHW does not charge any fees for interacting with
                            the Hedera™ API. Hedera™ Hashgraph requires a
                            transaction fee when interacting with the Hedera™
                            API. That fee paid in Hbar.
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
import { createComponent } from "@vue/composition-api";
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
