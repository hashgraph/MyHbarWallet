<template>
    <CirclePage>
        <div class="wrap">
            <div class="title-container">
                <div class="title">Terms of Conditions</div>
                <div class="sub-title">Last updated: May 10, 2018</div>
            </div>

            <div class="text-content">
                <p>
                    Be safe &amp; secure: We highly recommend that you read our
                    guide on How to Prevent Loss &amp; Theft for some
                    recommendations on how to be proactive about your security.
                </p>
                <p>
                    Always backup your keys: MyEtherWallet.com &amp;
                    MyEtherWallet CX are not "web wallets". You do not create an
                    account or give us your funds to hold onto. No data leaves
                    your computer / your browser. We make it easy for you to
                    create, save, and access your information and interact with
                    the blockchain.
                </p>
                <p>
                    We are not responsible for any loss: Ethereum,
                    MyEtherWallet.com &amp; MyEtherWallet CX, and some of the
                    underlying Javascript libraries we use are under active
                    development. While we have thoroughly tested &amp; tens of
                    thousands of wallets have been successfully created by
                    people all over the globe, there is always the possibility
                    something unexpected happens that causes your funds to be
                    lost. Please do not invest more than you are willing to
                    lose, and please be careful.
                </p>
                <p>
                    Translations of MyEtherWallet: The community has done an
                    amazing job translating MyEtherWallet into a variety of
                    languages. However, MyEtherWallet can only verify the
                    validity and accuracy of the information provided in English
                    and, because of this, the English version of our website is
                    the official text.
                </p>
                <p>
                    MIT License Copyright © 2015-2019 MyEtherWallet INC
                </p>
                <p>
                    Permission is hereby granted, free of charge, to any person
                    obtaining a copy of this software and associated
                    documentation files (the "Software"), to deal in the
                    Software without restriction, including without limitation
                    the rights to use, copy, modify, merge, publish, distribute,
                    sublicense, and/or sell copies of the Software, and to
                    permit persons to whom the Software is furnished to do so,
                    subject to the following conditions:
                </p>
                <p>
                    The above copyright notice and this permission notice shall
                    be included in all copies or substantial portions of the
                    Software.
                </p>
                <p>
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                    KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                    WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
                    OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
            </div>
        </div>
    </CirclePage>
</template>

<script lang="ts">
import CirclePage from "../components/CirclePage.vue";
import { createComponent } from "vue-function-api";

export default createComponent({
    components: {
        CirclePage
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    margin: 0 auto;
    max-width: 620px;
    padding: 60px 0;
}

.title-container {
    color: var(--color-washed-black);
    margin-block-end: 70px;
}

.title {
    font-size: 42px;
    font-weight: 700;
    margin-block-end: 20px;
    text-align: center;

    @media (max-width: 290px) {
        font-size: 30px;
    }
}

.sub-title {
    font-size: 13px;
    font-weight: 600;
    text-align: center;
}

p {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
    margin-block-end: 30px;
}

h1 {
    font-size: 42px;
    font-weight: 700;
    margin-block-end: 20px;
}

h5 {
    font-size: 13px;
    font-weight: 600;
    margin-block-start: 0;
    padding-block-start: 0;
}
</style>
