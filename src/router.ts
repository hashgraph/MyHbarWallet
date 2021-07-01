import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

// Marketing
import MarketingLayout from "./components/marketing/Layout.vue";
import Marketing from "./pages/Marketing.vue";
import TermsConditions from "./pages/TermsConditions.vue";
import PrivacyPolicy from "./pages/PrivacyPolicy.vue";
import Error404 from "./pages/404.vue";

// Access
import Access from "./pages/access/Access.vue";
import AccessSoftware from "./pages/access/Software.vue";
import AccessHardware from "./pages/access/Hardware.vue";
import AccessKeystore from "./pages/access/Keystore.vue";
import AccessMnemonic from "./pages/access/Mnemonic.vue";
import AccessPrivateKey from "./pages/access/PrivateKey.vue";
import AccessLedger from "./pages/access/Ledger.vue";
import Account from "./pages/access/Account.vue";

// Create
import Create from "./pages/create/Create.vue";
import CreateKeystore from "./pages/create/Keystore.vue";
import CreateMnemonic from "./pages/create/Mnemonic.vue";
import MnemonicVerification from "./pages/create/MnemonicVerification.vue";
import CreatePrivateKey from "./pages/create/PrivateKey.vue";

// Interface
import InterfaceLayout from "./components/interface/Layout.vue";
import InterfaceMainView from "./components/interface/MainView.vue";
import InterfaceHome from "./pages/interface/Home.vue";
import InterfaceAssets from "./pages/interface/Assets.vue";
import InterfaceTokens from "./pages/interface/Tokens.vue";
import InterfaceTokenDetails from "./pages/interface/TokenDetails.vue";
import InterfacePeople from "./pages/interface/People.vue";
import InterfaceHistory from "./pages/interface/History.vue";
import InterfaceKeys from "./pages/interface/Keys.vue";
import InterfaceTools from "./pages/interface/Tools.vue";
import InterfaceTransactionDetails from "./pages/interface/TransactionDetails.vue";
import InterfaceSend from "./pages/interface/Send.vue";
import InterfaceAssociateToken from "./pages/interface/AssociateToken.vue";
import InterfaceConvertUnits from "./pages/interface/ConvertUnits.vue";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import InterfaceDownload from "./pages/interface/DownloadFile.vue";

>>>>>>> 54f2556a (feat: update deps to 12)



=======
import InterfaceDownload from "./pages/interface/DownloadFile.vue";

>>>>>>> 0e294e5e (Merging to next.)
const routes = [
  {
    path: "/",
    component: MarketingLayout,
    children: [
      { path: "", component: Marketing, name: "marketing" },
      {
        path: "/terms-and-conditions",
        component: TermsConditions,
        name: "terms",
      },
      { path: "/privacy-policy", component: PrivacyPolicy, name: "privacy" },
      {
        path: "/access",
        component: Access,
        name: "access",
      },
      {
        path: "/access/software",
        component: AccessSoftware,
        name: "access.software",
      },
      {
        path: "/access/hardware",
        component: AccessHardware,
        name: "access.hardware",
      },
      {
        path: "/access/hardware/ledger",
<<<<<<< HEAD
        component: AccessLedger,
        name: "access.hardware.ledger",
      },
=======
>>>>>>> 0e294e5e (Merging to next.)
      {
        component: AccessHardware,
        name: "access.hardware.trezor",
      },
      {
        path: "/access/software/keystore",
        component: AccessKeystore,
        name: "access.software.keystore",
      },
      {
        path: "/access/software/mnemonic",
        component: AccessMnemonic,
        name: "access.software.mnemonic",
      },
      {
        path: "/access/software/key",
        component: AccessPrivateKey,
        name: "access.software.key",
      },
      {
        path: "/access/account",
        component: Account,
        name: "access.account",
      },
      { path: "/create/", component: Create, name: "create" },
      {
        path: "/create/keystore",
        component: CreateKeystore,
        name: "create.keystore",
      },
      {
        path: "/create/mnemonic",
        component: CreateMnemonic,
        name: "create.mnemonic",
      },
      {
        path: "/create/mnemonic/verify",
        component: MnemonicVerification,
        name: "create.mnemonic.verify",
      },
      {
        path: "/create/key",
        component: CreatePrivateKey,
        name: "create.key",
      },
<<<<<<< HEAD
<<<<<<< HEAD
=======

      
>>>>>>> 54f2556a (feat: update deps to 12)
=======
>>>>>>> 0e294e5e (Merging to next.)
    ],
  },
  {
    path: "/wallet",
    component: InterfaceLayout,
    redirect: { name: "home" },
    children: [
      {
        path: "",
        component: InterfaceMainView,
        children: [
          {
            path: "",
            component: InterfaceHome,
            name: "home",
          },
          {
            path: "send",
            component: InterfaceSend,
            name: "send",
          },
        ],
      },
      {
        path: "assets",
        component: InterfaceMainView,
        children: [
          {
            component: InterfaceAssets,
            path: "",
            name: "assets",
          },
        ],
      },
      {
        component: InterfaceMainView,
        path: "tokens",
        children: [
          {
            component: InterfaceTokens,
            path: "",
            name: "tokens",
          },
          {
            component: InterfaceTokenDetails,
            path: "tokendetails",
            name: "tokendetails",
          },
        ],
      },
      {
        path: "people",
        component: InterfaceMainView,
        children: [
          {
            component: InterfacePeople,
            path: "",
            name: "people",
          },
        ],
      },
      {
        component: InterfaceMainView,
        path: "history",
        children: [
          {
            component: InterfaceHistory,
            path: "",
            name: "history",
          },
          {
            component: InterfaceTransactionDetails,
            path: "transaction",
            name: "transaction",
          },
        ],
      },
      {
        path: "keys",
        component: InterfaceMainView,
        children: [
          {
            component: InterfaceKeys,
            path: "",
            name: "keys",
          },
        ],
      },
      {
        path: "tools",
        component: InterfaceMainView,
        children: [
          {
            component: InterfaceTools,
            path: "",
            name: "tools",
          },
          {
            component: InterfaceAssociateToken,
            path: "associate-token",
            name: "tools.associate.token",
          },
          {
            component: InterfaceConvertUnits,
            path: "convert-units",
            name: "tools.convert.units"
<<<<<<< HEAD
<<<<<<< HEAD
=======
          },
          {
            component: InterfaceDownload,
            path: "download",
            name: "tools.download"
>>>>>>> 54f2556a (feat: update deps to 12)
=======
>>>>>>> 0e294e5e (Merging to next.)
          }
        ],
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: MarketingLayout,
    children: [
      {
        component: Error404,
        path: "",
      },
    ],
  },
];

const router = createRouter({
  // if running in electron, use hash history
  history: /electron/i.test(navigator.userAgent)
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    if (savedPosition != null) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

export default router;
