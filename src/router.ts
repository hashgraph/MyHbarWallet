import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AccessMyAccount from "./views/AccessMyAccount.vue";
import CreateAccount from "./views/CreateAccount.vue";
import Interface from "./views/Interface.vue";
import InterfaceSendTransfer from "./views/InterfaceSendTransfer.vue";
import InterfaceDeployContract from "./views/InterfaceDeployContract.vue";
import InterfaceInteractWithContract from "./views/InterfaceInteractWithContract.vue";
import InterfaceSignMessage from "./views/InterfaceSignMessage.vue";
import InterfaceVerifyMessage from "./views/InterfaceVerifyMessage.vue";
import UnitConvert from "./views/UnitConvert.vue";
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
import TermsConditions from "./views/TermsConditions.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/create-account",
            name: "create-account",
            component: CreateAccount
        },
        {
            path: "/access-my-account",
            name: "access-my-account",
            component: AccessMyAccount
        },
        {
            path: "/unit-convert",
            name: "unit-convert",
            component: UnitConvert
        },
        {
            path: "/privacy-policy",
            name: "privacy-policy",
            component: PrivacyPolicy
        },
        {
            path: "/terms-and-conditions",
            name: "terms-and-conditions",
            component: TermsConditions
        },
        {
            path: "/interface",
            component: Interface,
            children: [
                {
                    path: "",
                    redirect: { name: "send-transfer" }
                },
                {
                    path: "send-transfer",
                    name: "send-transfer",
                    component: InterfaceSendTransfer
                },
                {
                    path: "deploy-contract",
                    name: "deploy-contract",
                    component: InterfaceDeployContract
                },
                {
                    path: "interact-with-contract",
                    name: "interact-with-contract",
                    component: InterfaceInteractWithContract
                },
                {
                    path: "sign-message",
                    name: "sign-message",
                    component: InterfaceSignMessage
                },
                {
                    path: "verify-message",
                    name: "verify-message",
                    component: InterfaceVerifyMessage
                }
            ]
        }
    ]
});
