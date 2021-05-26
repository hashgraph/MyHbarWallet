// If NodeId is ever exported from the SDK, replace this
export interface NodeId {
    shard: number;
    realm: number;
    node: number;
}

// Cannot use computed members in string enum
// So cannot translate these with i18n here
// Instead, use their keys, then translate for display later
export enum NetworkName {
    MAINNET = "network.mainnet",
    TESTNET = "network.testnet",
    PREVIEW = "network.previewnet",
    CUSTOM = "network.custom"
}

export interface NetworkSettings {
    proxy: string | null;
    address: string;
    node: NodeId;
    name: NetworkName;
    bridge?: BridgeSettings;
}

export interface BridgeSettings {
    routerContractAddress: string; // address of router contract address
    bridgeAccount: string; // Hedera account id of bridge
    serviceFee: number;
    validator: string;
    explorerTxUrl: string;
    infuraApiUrl: string;
    evmChainId: string;
    evmNetwork: string;
    mirrorNodeUrl: string;
    blockConfirmations: number;
}

// Likewise, cannot use computed keys, so duplicate them here
export const availableNetworks: { [key: string]: NetworkSettings } = {
    "network.testnet": {
        proxy: "https://grpc-web.testnet.myhbarwallet.com",
        address: "0.testnet.hedera.com:50211",
        node: { shard: 0, realm: 0, node: 3 },
        name: NetworkName.TESTNET,
        bridge: {
            routerContractAddress: "0x4f5e837e6f103A9d53d9E4251695083232AA8b39",
            bridgeAccount: "0.0.1547520",
            serviceFee: 10000,
            validator: "http://35.225.100.55/api/v1/",
            explorerTxUrl: "https://explorer-mumbai.maticvigil.com/tx/",
            infuraApiUrl: "wss://ws-matic-mumbai.chainstacklabs.com",
            evmChainId: "80001",
            evmNetwork: "Polygon Mumbai Testnet",
            mirrorNodeUrl: "http://testnet.mirrornode.hedera.com/api/v1/",
            blockConfirmations: 5
        }
    },
    "network.previewnet": {
        proxy: "https://grpc-web.previewnet.myhbarwallet.com",
        address: "0.previewnet.hedera.com:50211",
        node: { shard: 0, realm: 0, node: 3 },
        name: NetworkName.PREVIEW
    },
    "network.mainnet": {
        proxy: "https://grpc-web.myhbarwallet.com",
        address: "35.237.200.180:50211",
        node: { shard: 0, realm: 0, node: 3 },
        name: NetworkName.MAINNET
    }
};
