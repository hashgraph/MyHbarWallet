/* eslint-disable no-process-env */
import Router, { Route } from "vue-router";
import { PositionResult } from "vue-router/types/router";

import { getters } from "./store";
import Error404 from "./views/Error404.vue";
import Home from "./views/Home.vue";

declare const IS_ELECTRON: boolean;

function HardwareWalletAffiliates(): Promise<
typeof import("./views/HardwareWalletAffiliates.vue")
> {
    return import(
        /* webpackChunkName: "affiliates" */ "./views/HardwareWalletAffiliates.vue");
}

function InterfaceCreateAccount(): Promise<
typeof import("./views/InterfaceCreateAccount.vue")
> {
    return import(
        /* webpackChunkName: "interface" */ "./views/InterfaceCreateAccount.vue");
}

function TermsConditions(): Promise<
typeof import("./views/TermsConditions.vue")
> {
    return import(
        /* webpackChunkName: "terms" */ "./views/TermsConditions.vue");
}

function PrivacyPolicy(): Promise<typeof import("./views/PrivacyPolicy.vue")> {
    return import(
        /* webpackChunkName: "privacy" */ "./views/PrivacyPolicy.vue");
}

function ConvertUnits(): Promise<typeof import("./views/ConvertUnits.vue")> {
    return import(/* webpackChunkName: "units" */ "./views/ConvertUnits.vue");
}

function Interface(): Promise<typeof import("./views/Interface.vue")> {
    return import(/* webpackChunkName: "interface" */ "./views/Interface.vue");
}

function InterfaceSendTransfer(): Promise<
typeof import("./views/InterfaceSendTransfer.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceSendTransfer.vue");
}

function InterfaceDeployContract(): Promise<
typeof import("./views/InterfaceDeployContract.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceDeployContract.vue");
}

function InterfaceUploadFile(): Promise<
typeof import("./views/InterfaceUploadFile.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceUploadFile.vue");
}

function InterfaceDownloadFile(): Promise<
typeof import("./views/InterfaceDownloadFile.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceDownloadFile.vue");
}

function InterfaceTokenBalances(): Promise<
typeof import(".views/InterfaceTokenBalances.vue")> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceTokenBalances.vue"
    );
}

function InterfaceSendToken(): Promise<
typeof import("./views/InterfaceSendToken.vue")> {
    return import(
    /* webpackChunkName: "interface" */
        "./views/InterfaceSendToken.vue"
    );
}

function InterfaceAssociateToken(): Promise<
typeof import("./views/InterfaceSendToken.vue")> {
    return import(
    /* webpackChunkName: "interface" */
        "./views/InterfaceAssociateToken.vue"
    );
}

function CreateAccount(): Promise<typeof import("./views/CreateAccount.vue")> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/CreateAccount.vue");
}

function AccessMyAccount(): Promise<
typeof import("./views/AccessMyAccount.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/AccessMyAccount.vue");
}

function InterfaceSendAsset(): Promise<
typeof import("./views/InterfaceSendAsset.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceSendAsset.vue"
    );
}

// auth function that redirects visitors who have not logged in back to the home route
function RequireWallet(
    _to: Route,
    _from: Route,
    next: {
        (arg0: string): void;
        (): void;
    }
): void {
    if (!getters.isLoggedIn()) {
        return next("/");
    }

    return next();
}

export default new Router({
    // eslint-disable-next-line no-undef
    mode: IS_ELECTRON ? "hash" : "history",
    // eslint-disable-next-line no-undef
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
            path: "/hardware-wallet-affiliates",
            name: "hardware-wallet-affiliates",
            component: HardwareWalletAffiliates
        },
        {
            path: "/convert-units",
            name: "convert-units",
            component: ConvertUnits
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
            beforeEnter: RequireWallet,
            component: Interface,
            name: "interface",
            redirect: { name: "send-transfer" },
            children: [
                {
                    path: "send-transfer",
                    name: "send-transfer",
                    component: InterfaceSendTransfer
                },
                {
                    path: "send-asset",
                    name: "send-asset",
                    component: InterfaceSendAsset
                },
                {
                    path: "deploy-contract",
                    name: "deploy-contract",
                    component: InterfaceDeployContract
                },
                {
                    path: "create-account",
                    name: "create-account-transaction",
                    component: InterfaceCreateAccount
                },
                {
                    path: "upload-file",
                    name: "upload-file",
                    component: InterfaceUploadFile
                },
                {
                    path: "download-file",
                    name: "download-file",
                    component: InterfaceDownloadFile
                },
                {
                    path: "token-balances",
                    name: "token-balances",
                    component: InterfaceTokenBalances
                },
                {
                    path: "send-token",
                    name: "send-token",
                    component: InterfaceSendToken
                },
                {
                    path: "associate-token",
                    name: "associate-token",
                    component: InterfaceAssociateToken
                }
            ]
        },
        {
            path: "*",
            name: "404",
            component: Error404
        }
    ],

    scrollBehavior(to, from, savedPosition): PositionResult {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            // hash results were not quite right for mobile, this gives
            // a 25 pixel buffer
            return {
                selector: to.hash,
                offset: { x: 0, y: 25 }
            };
        }

        return {
            x: 0,
            y: 0
        };
    }
});
