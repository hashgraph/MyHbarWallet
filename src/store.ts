import type { PrivateKey, AccountId, PublicKey } from "@hashgraph/sdk";
import BigNumber from "bignumber.js";
import { defineStore } from "pinia";
import { Wallet } from "./domain/wallet/abstract";
import { AccountBalance, SimpleHederaClient } from "./services/hedera";
import { useContainer } from "./hooks/container";

interface State {
  network: "mainnet" | "testnet" | "previewnet";
  // the wallet that has been unlocked
  wallet: Wallet | null;
  // the specific instantiation of a client
  // from the unlocked wallet that is being used
  client: SimpleHederaClient | null;
  // the balance of the account associated with the client
  balance: AccountBalance | null;
  // the current price of HBARS in USD
  hbarPriceUsd: BigNumber.Instance | null;
<<<<<<< HEAD
=======
  // a place to stuff extra information needed to process a transaction
  extraTxInfo: Record<string, string | number> | null;
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
}

export const useStore = defineStore({
  id: "main",

  state(): State {
    return {
      wallet: null,
      client: null,
      hbarPriceUsd: null,
      balance: null,
      network: "mainnet",
<<<<<<< HEAD
=======
      extraTxInfo: null
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    };
  },

  getters: {
    publicKey(): PublicKey | null {
      return this.client?.getPublicKey() ?? null;
    },

    privateKey(): PrivateKey | null {
      return this.client?.getPrivateKey() ?? null;
    },

    accountId(): AccountId | null {
      return this.client?.getAccountId() ?? null;
    },
<<<<<<< HEAD
    getClient(): SimpleHederaClient | null{
      return this.client ?? null;
=======
    
    getClient(): SimpleHederaClient | null {
      return this.client ?? null;
    },

    extraInfo(): Record<string, string | number> | null {
      return this.extraTxInfo;
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
    }
  },

  actions: {
    setNetwork(name: "mainnet" | "testnet" | "previewnet") {
      this.network = name;
    },

    setWallet(wallet: Wallet | null) {
      this.wallet = wallet;

      if (wallet == null) {
        this.setClient(null);
      }
    },

    setClient(client: SimpleHederaClient | null) {
      this.balance = null;
      this.client = client;
      if (client) void this.requestAccountBalance();
    },

    async requestHbarPrice() {
      this.hbarPriceUsd =
        await useContainer().cradle.hbarPrice.getHbarPriceInUsd();
    },

    async requestAccountBalance() {
      if (this.client == null) return;

      this.balance = await this.client.getAccountBalance();
    },
<<<<<<< HEAD
=======

    setExtraInfo(info: Record<string, string | number>): void {
      this.extraTxInfo = info;
    }
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
  },
});
