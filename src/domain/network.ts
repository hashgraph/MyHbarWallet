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
}

// Likewise, cannot use computed keys, so duplicate them here
export const availableNetworks: { [key: string]: NetworkSettings } = {
    "network.testnet": {
        proxy: "https://grpc-web.testnet.myhbarwallet.com",
        address: "0.testnet.hedera.com:50211",
        node: { shard: 0, realm: 0, node: 3 },
        name: NetworkName.TESTNET
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
