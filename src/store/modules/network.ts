import {
    NetworkSettings,
    NetworkName,
    availableNetworks
} from "../../settings";

export interface State {
    network: NetworkSettings;
}

// If NodeId is ever exported from the SDK, replace this
export interface NodeId {
    shard: number;
    realm: number;
    node: number;
}
