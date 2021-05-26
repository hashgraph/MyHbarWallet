import Web3 from "web3";
import { TransactionReceipt } from "web3-core";
import { splitSignature, Signature } from "@ethersproject/bytes";
import { hexToNumber } from "web3-utils";

import { RouterABI } from "../contracts/abis";
import { getters } from "../../../ui/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

function reloadWindow(): void {
    window.location.reload();
}

export class MetamaskService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private metamaskProvider: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private web3: Web3;

    public async initWeb3(): Promise<void> {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            this.metamaskProvider = window.ethereum;
            this.web3 = new Web3(this.metamaskProvider);
            this.web3.currentProvider.on("chainChanged", reloadWindow);
            this.web3.currentProvider.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length === 0) {
                    reloadWindow();
                }
            });
        } else {
            throw new Error("Metamask not found");
        }

        if (hexToNumber(this.metamaskProvider.chainId).toString() !== getters.currentNetwork().bridge?.evmChainId) {
            throw new Error(`Invalid network selected. It should be ${getters.currentNetwork().bridge?.evmNetwork}`);
        }
    }

    public chainId(): number {
        return hexToNumber(this.metamaskProvider.chainId);
    }

    public async signTypedV4Data(msgParams: string): Promise<Signature> {
        const method = "eth_signTypedData_v4";
        const from = this.selectedAddress();

        const params = [ from, msgParams ];

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.metamaskProvider.sendAsync({ method, params, from }, (err: any, result: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.error) {
                    reject(result.error);
                    return;
                }

                resolve(splitSignature(result.result));
            });
        });
    }

    public selectedAddress(): string {
        return this.metamaskProvider.selectedAddress;
    }

    public croppedSelectedAddress(): string {
        return `${this.metamaskProvider.selectedAddress?.substr(0, 6)}...${this.metamaskProvider.selectedAddress?.substr(this.metamaskProvider.selectedAddress.length - 6)}`;
    }

    public async mint(transactionId: string, wrappedToken: string, receiver: string, amount: string, signatures: string[], handleTransactionHash: (txHash: string) => void, handleReceipt: (txReceipt: TransactionReceipt) => void, handleError: (error: string) => void): Promise<TransactionReceipt> {
        const options = { from: this.selectedAddress() };

        const contract = new this.web3.eth.Contract(RouterABI, getters.currentNetwork().bridge?.routerContractAddress);
        return contract.methods
            .mint(transactionId, wrappedToken, receiver, amount, signatures)
            .send(options)
            .on("transactionHash", handleTransactionHash)
            .on("receipt", handleReceipt)
            .on("error", handleError);
    }

    public async burnWithPermit(contractAddress: string, account: Uint8Array, amount: string, deadline: number, v: number, r: string, s: string,
        handleTransactionHash: (txHash: string) => void,
        handleReceipt: (txReceipt: TransactionReceipt) => void,
        handleError: (error: string) => void): Promise<TransactionReceipt> {
        const options = { from: this.selectedAddress() };

        const contract = new this.web3.eth.Contract(RouterABI, getters.currentNetwork().bridge?.routerContractAddress);

        return contract.methods
            .burnWithPermit(contractAddress, account, amount, deadline, v, r, s)
            .send(options)
            .on("transactionHash", handleTransactionHash)
            .on("receipt", handleReceipt)
            .on("error", handleError);
    }
}
