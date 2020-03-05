<template>
    <CirclePage>
        <div class="wrap">
            <PageTitle :title="$t('termsAndConditions.title')">
                {{ $t("termsAndConditions.lastUpdated") }}
            </PageTitle>

            <div class="text-content">
                <p>
                    {{ $t("termsAndConditions.safeAndSecure") }}
                </p>
                <p>
                    {{ $t("termsAndConditions.paragraph1") }}
                </p>
                <p>
                    {{ $t("termsAndConditions.paragraph2") }}
                </p>
                <p>
                    {{ $t("termsAndConditions.paragraph3") }}
                </p>

                <p>
                    <strong>Apache License<br>Version 2.0, January 2004<br></strong>
                    <strong><a
                        href="http://www.apache.org/licenses/"
                    >http://www.apache.org/licenses/</a></strong>
                </p>

                <p>
                    {{ $t("termsAndConditions.termsAndConditionsForUse") }}
                </p>

                <p>
                    <strong><a name="definitions">{{
                        $t("termsAndConditions.termsAndConditionsForUse")
                    }}</a></strong>.
                </p>

                <div>
                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.license').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.licensor').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.legalEntity').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.youYour').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.source').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.object').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich($t('termsAndConditions.work').toString())
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t(
                                    'termsAndConditions.derivativeWorks'
                                ).toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.contribution').toString()
                            )
                        "
                    />

                    <p
                        v-html="
                            formatRich(
                                $t('termsAndConditions.contributor').toString()
                            )
                        "
                    />
                </div>

                <p>
                    <strong><a name="copyright">{{
                        $t("termsAndConditions.grantOfCopyrightLicense")
                    }}</a></strong>
                    {{
                        $t("termsAndConditions.grantOfCopyrightLicenseContent")
                    }}
                </p>

                <p>
                    <strong><a name="patent">{{
                        $t("termsAndConditions.grantOfPatentLicense")
                    }}</a></strong>
                    {{ $t("termsAndConditions.grantOfPatentLicenseContent") }}
                </p>

                <p>
                    <strong><a name="redistribution">{{
                        $t("termsAndConditions.redistribution")
                    }}</a></strong>
                    {{ $t("termsAndConditions.redistribution.header") }}
                </p>

                <ol>
                    <li>
                        {{ $t("termsAndConditions.redistribution.paragraph1") }}
                    </li>

                    <li>
                        {{ $t("termsAndConditions.redistribution.paragraph2") }}
                    </li>

                    <li>
                        {{ $t("termsAndConditions.redistribution.paragraph3") }}
                    </li>

                    <li>
                        {{ $t("termsAndConditions.redistribution.paragraph4") }}
                        <br>
                        <br>
                        {{ $t("termsAndConditions.redistribution.paragraph5") }}
                    </li>
                </ol>

                <p>
                    <strong><a name="contributions">{{
                        $t("termsAndConditions.submission")
                    }}</a></strong>
                    {{ $t("termsAndConditions.submissionContent") }}
                </p>

                <p>
                    <strong><a name="trademarks">{{
                        $t("termsAndConditions.trademarks")
                    }}</a></strong>
                    {{ $t("termsAndConditions.trademarksContent") }}
                </p>

                <p>
                    <strong><a name="no-warranty">{{
                        $t("termsAndConditions.disclaimerOfWarranty")
                    }}</a></strong>
                    {{ $t("termsAndConditions.disclaimerOfWarrantyContent") }}
                </p>

                <p>
                    <strong><a name="no-liability">{{
                        $t("termsAndConditions.limitationOfLiability")
                    }}</a></strong>
                    {{ $t("termsAndConditions.limitationOfLiabilityContent") }}
                </p>

                <p>
                    <strong><a name="additional">{{
                        $t(
                            "termsAndConditions.acceptingWarrantyOrAdditionalLiability"
                        )
                    }}</a></strong>
                    {{
                        $t(
                            "termsAndConditions.acceptingWarrantyOrAdditionalLiabilityContent"
                        )
                    }}
                </p>
            </div>
        </div>
    </CirclePage>
</template>

<script lang="ts">
import CirclePage from "../components/CirclePage.vue";
import PageTitle from "../components/PageTitle.vue";
import { defineComponent } from "@vue/composition-api";
import { formatRich } from "../formatter";

export default defineComponent({
    components: {
        CirclePage,
        PageTitle
    },
    props: {},
    setup() {
        return { formatRich };
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    margin: 0 auto;
    max-width: 620px;
    padding: 60px 0;
}

.text-content {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
}

p {
    margin-block-end: 30px;
}
</style>
