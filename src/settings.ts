interface NetworkSettings {
    proxy: string;
    address: string;
    node: string;
    name: string;
}

const availableNetworks: { [key: string]: NetworkSettings } = {
    testnet: {
        proxy: "https://grpc-web.myhederawallet.com",
        address: "0.testnet.hedera.com:50211",
        node: "0.0.3",
        name: "testnet"
    },
    mainnet: {
        proxy: "https://mainnet.grpc-web.myhederawallet.com",
        address: "35.237.200.180:50211",
        node: "0.0.3",
        name: "mainnet",
    }
}

const selectedNetwork = process.env.HEDERA_NETWORK || "testnet";

export default {
    network: availableNetworks[selectedNetwork]!,
};
