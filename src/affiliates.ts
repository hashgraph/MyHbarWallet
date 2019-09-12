import ledgerImage from "./assets/logo-ledger.png";
import finneyImage from "./assets/logo-finney.png";
import bitboxImage from "./assets/logo-bitbox.png";
import trezorImage from "./assets/logo-trezor.png";
import secalotImage from "./assets/logo-secalot.png";
import keepkeyImage from "./assets/logo-keepkey.png";

interface Affiliate {
    name: string;
    address: string;
    supported: boolean;
    currency: string;
    cost: string;
    image: string;
    description: string;
}

// If you add or enable any affiliate, ensure that the affiliate/offer link is correct
// and all other properties are correct as well

const affiliates: { [key: string]: Affiliate } = {
    ledger: {
        name: "Ledger",
        supported: true,
        currency: "$",
        cost: "59.00",
        image: ledgerImage,
        address: "https://shop.ledger.com/pages/ledger-nano-x?r=0d2e5ed943aa",
        description:
            "A light, yet solid multicurrency hardware wallet for cryptocurrencies. It is easy to carry everywhere thanks to its USB format."
    },
    trezor: {
        name: "Trezor",
        supported: true,
        currency: "€",
        cost: "83.49",
        image: trezorImage,
        address: "https://shop.trezor.io/?offer_id=10&aff_id=3302",
        description:
            "The most trusted hardware wallet in the world. Get yours today!"
    },
    finney: {
        name: "Finney",
        supported: false,
        currency: "$",
        cost: "999.00",
        image: finneyImage,
        address:
            "http://shop.sirinlabs.com/?rfsn=2397639.54fdf&utm_source=refersion&utm_medium=affiliate&utm_campaign=2397639.54fdf",
        description: "Uncompromised Security In a Blockchain Smartphone"
    },
    bitbox: {
        name: "Bitbox",
        supported: false,
        currency: "€",
        cost: "44.00",
        image: bitboxImage,
        address: "https://shiftcrypto.ch/?ref=mew",
        description:
            "Our aim is to equip you for independence, with ease, in the digital world."
    },
    secalot: {
        name: "Secalot",
        supported: false,
        currency: "$",
        cost: "50.00",
        image: secalotImage,
        address: "https://www.secalot.com",
        description:
            "Your all-in-one digital security companion. it is a small USB dongle that packs a wide range of features."
    },
    keepkey: {
        name: "Keepkey",
        supported: false,
        currency: "€",
        cost: "79.00",
        image: keepkeyImage,
        address: "http://lddy.no/a4im",
        description:
            "Protect your cryptocurrencies, store your private keys offline, and safeguard your assets from hackers."
    },
    billfodl: {
        name: "Billfodl",
        supported: false,
        currency: "",
        cost: "",
        image: "",
        address: "https://billfodl.com/",
        description: ""
    },
    bity: {
        name: "Bity",
        supported: false,
        currency: "",
        cost: "",
        image: "",
        address: "https://bity.com/",
        description: ""
    },
    ethercard: {
        name: "Ether Card",
        supported: false,
        currency: "",
        cost: "",
        image: "",
        address: "https://ether.cards/",
        description: ""
    }
};

export default affiliates;
