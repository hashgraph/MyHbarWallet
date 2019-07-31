import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Interface from "./views/Interface.vue";
import InterfaceSendTransfer from "./views/InterfaceSendTransfer.vue";
import InterfaceDeployContract from "./views/InterfaceDeployContract.vue";
import InterfaceInteractWithContract from "./views/InterfaceInteractWithContract.vue";
import InterfaceSignMessage from "./views/InterfaceSignMessage.vue";
import InterfaceVerifyMessage from "./views/InterfaceVerifyMessage.vue";

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
