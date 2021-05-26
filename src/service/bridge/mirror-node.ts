import { externalRequest } from "../request";
import { getters } from "../../ui/store";

import { MirrorNodeToken } from "src/domain/token";

export async function getToken(tokenId: string): Promise<MirrorNodeToken> {
    return externalRequest(`${getters.currentNetwork().bridge?.mirrorNodeUrl!}tokens/${tokenId}`);
}
