interface NetworkSettings {
    proxy: string;
    address: string;
    node: string;
    name: string;
}

const availableNetworks: { [key: string]: NetworkSettings } = {
    testnet: {
        proxy: "192.168.7.22:11205",
        address: "0.testnet.hedera.com:50211",
        node: "0.0.3",
        name: "testnet"
    },
    mainnet: {
        proxy: "https://mainnet.grpc-web.myhederawallet.com",
        address: "35.237.200.180:50211",
        node: "0.0.3",
        name: "mainnet"
    }
};

// HEDERA_NETWORK is defined in vue.config.js
// Populated from the HEDERA_NETWORK env variable
// Defaults to "testnet"
declare const HEDERA_NETWORK: string;

export default {
    network: availableNetworks[HEDERA_NETWORK]!
};
