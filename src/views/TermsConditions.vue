<template>
    <div>
        <div class="privacy-policy">
            <div class="wrap">
                <div class="title-text-contents">
                    <div class="title-block">
                        <div class="title">
                            <h1>{{ options.title }}</h1>
                        </div>
                    </div>
                    <h5 class="bold-sub-title">{{ options.boldSubTitle }}</h5>
                </div>

                <div class="text-content">
                    <p>
                        Be safe &amp; secure: We highly recommend that you read
                        our guide on How to Prevent Loss &amp; Theft for some
                        recommendations on how to be proactive about your
                        security.
                    </p>
                    <p>
                        Always backup your keys: MyEtherWallet.com &amp;
                        MyEtherWallet CX are not "web wallets". You do not
                        create an account or give us your funds to hold onto. No
                        data leaves your computer / your browser. We make it
                        easy for you to create, save, and access your
                        information and interact with the blockchain.
                    </p>
                    <p>
                        We are not responsible for any loss: Ethereum,
                        MyEtherWallet.com &amp; MyEtherWallet CX, and some of
                        the underlying Javascript libraries we use are under
                        active development. While we have thoroughly tested
                        &amp; tens of thousands of wallets have been
                        successfully created by people all over the globe, there
                        is always the possibility something unexpected happens
                        that causes your funds to be lost. Please do not invest
                        more than you are willing to lose, and please be
                        careful.
                    </p>
                    <p>
                        Translations of MyEtherWallet: The community has done an
                        amazing job translating MyEtherWallet into a variety of
                        languages. However, MyEtherWallet can only verify the
                        validity and accuracy of the information provided in
                        English and, because of this, the English version of our
                        website is the official text.
                    </p>
                    <p>
                        MIT License Copyright © 2015-2019 MyEtherWallet INC
                    </p>
                    <p>
                        Permission is hereby granted, free of charge, to any
                        person obtaining a copy of this software and associated
                        documentation files (the "Software"), to deal in the
                        Software without restriction, including without
                        limitation the rights to use, copy, modify, merge,
                        publish, distribute, sublicense, and/or sell copies of
                        the Software, and to permit persons to whom the Software
                        is furnished to do so, subject to the following
                        conditions:
                    </p>
                    <p>
                        The above copyright notice and this permission notice
                        shall be included in all copies or substantial portions
                        of the Software.
                    </p>
                    <p>
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
                        ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
                        TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                        PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
                        SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
                        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
                        OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
                        IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
                        DEALINGS IN THE SOFTWARE.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "TermsConditions",
    data() {
        return {
            options: {
                title: "TERMS OF CONDITIONS",
                boldSubTitle: "Last Updated: May 10, 2018"
            }
        };
    }
});
</script>

<style lang="postcss" scoped>
.privacy-policy {
    background-color: #f2f4fa;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    padding: 0 30% 60px;
    text-align: center;
}

.wrap {
    padding-block-start: 60px;
}

.title-text-contents {
    display: flex;
    flex-direction: column;
}

p {
    color: #506175;
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
