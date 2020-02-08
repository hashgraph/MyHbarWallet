import { NetworkSettings } from "../../settings";

export interface State {
    network: NetworkSettings;
}

export interface NodeId {
    shard: number;
    realm: number;
    node: number;
}
