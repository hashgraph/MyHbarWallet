import Contract from "web3-eth-contract";

import { TokenABI } from "../abis";
import { InfuraProviderService } from "../../provider/infura-provider";

export interface PermitData {
    name: string;
    controller: string;
    nonces: number;
}

// TokenService wraps a contract instance of the WrappedToken contract
export class TokenService extends InfuraProviderService {
    public constructor() {
        super();
        Contract.setProvider(this.getProvider());
    }
    // Read operations

    public balanceOf(contractAddress: string, address: string): Promise<string> {
        const tokenContract = new this.web3.eth.Contract(TokenABI, contractAddress);

        return tokenContract.methods.balanceOf(address).call();
    }

    public async getPermitData(contractAddress: string, ownerAddress: string): Promise<PermitData> {
        const contract = new Contract(TokenABI, contractAddress);

        let promises = [];

        promises.push(contract.methods.name().call());
        promises.push(contract.methods.controller().call());
        promises.push(contract.methods.nonces(ownerAddress).call());

        promises = await Promise.all(promises);

        return {
            name: promises[ 0 ],
            controller: promises[ 1 ],
            nonce: promises[ 2 ]
        };
    }
}
