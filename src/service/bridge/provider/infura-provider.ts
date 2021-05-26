import Web3 from "web3";
import { TransactionReceipt, WebsocketProvider } from "web3-core";

import { getters } from "../../../ui/store";

export class InfuraProviderService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected web3: any;

    private provider: WebsocketProvider;

    public constructor() {
        this.provider = new Web3.providers.WebsocketProvider(getters.currentNetwork().bridge?.infuraApiUrl!);
        this.web3 = new Web3(this.provider);
    }

    public getProvider(): WebsocketProvider {
        return this.provider;
    }

    public async getLatestBlockTimestamp(): Promise<number> {
        const blockNumber = await this.web3.eth.getBlockNumber();
        const block = await this.web3.eth.getBlock(blockNumber);

        return block.timestamp;
    }

    public async getLatestBlock(): Promise<number> {
        return this.web3.eth.getBlockNumber();
    }

    public async getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
        return this.web3.eth.getTransactionReceipt(transactionHash);
    }
}
