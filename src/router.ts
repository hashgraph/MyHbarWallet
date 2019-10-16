import Router, { Route } from "vue-router";
import Home from "./views/Home.vue";
import AccessMyAccount from "./views/AccessMyAccount.vue";
import CreateAccount from "./views/CreateAccount.vue";
import HardwareWalletAffiliates from "./views/HardwareWalletAffiliates.vue";
import InterfaceCreateAccount from "./views/InterfaceCreateAccount.vue";
import TermsConditions from "./views/TermsConditions.vue";
import Error404 from "./views/Error404.vue";
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
import { PositionResult } from "vue-router/types/router";
import store from "./store";

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
        "./views/InterfaceSendTransfer.vue"
    );
}

function InterfaceDeployContract(): Promise<
    typeof import("./views/InterfaceDeployContract.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceDeployContract.vue"
    );
}

function InterfaceInteractWithContract(): Promise<
    typeof import("./views/InterfaceInteractWithContract.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceInteractWithContract.vue"
    );
}

function InterfaceSignMessage(): Promise<
    typeof import("./views/InterfaceSignMessage.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceSignMessage.vue"
    );
}

function InterfaceVerifyMessage(): Promise<
    typeof import("./views/InterfaceVerifyMessage.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceVerifyMessage.vue"
    );
}

function InterfaceUploadFile(): Promise<
    typeof import("./views/InterfaceUploadFile.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceUploadFile.vue"
    );
}

function InterfaceDownloadFile(): Promise<
    typeof import("./views/InterfaceDownloadFile.vue")
> {
    return import(
        /* webpackChunkName: "interface" */
        "./views/InterfaceDownloadFile.vue"
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
    if (store.state.wallet.session == null) {
        return next("/");
    }

    return next();
}

export default new Router({
    mode: process.env.IS_ELECTRON ? "hash" : "history",
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
            redirect: {
                name: "send-transfer"
            },
            children: [
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
                    path: "create-account",
                    name: "create-account-transaction",
                    component: InterfaceCreateAccount
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
