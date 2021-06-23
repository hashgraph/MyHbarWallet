import type { PrivateKey, AccountId, PublicKey } from "@hashgraph/sdk";
import { BigNumber } from "bignumber.js";
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
    // a place to stuff extra information needed to process a transaction
    extraTxInfo: Record<string, string | number> | null;
    // is there an open prompt for the user on their hardware wallet
    prompt: boolean;
    // are you sure you want to logout? open state
    logoutConfirm: boolean;
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
      extraTxInfo: null,
      prompt: false,
      logoutConfirm: false
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

    getClient(): SimpleHederaClient | null {
      return this.client ?? null;
    },

    extraInfo(): Record<string, string | number> | null {
      return this.extraTxInfo;
    },
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

      if (this.wallet?.hasPrivateKey()) {
        void this.requestAccountBalance();
      }
    },

    async requestHbarPrice() {
      this.hbarPriceUsd =
                await useContainer().cradle.hbarPrice.getHbarPriceInUsd();
    },

    async requestAccountBalance() {
      if (this.client == null) return;

      this.balance = await this.client.getAccountBalance();
    },

    setExtraInfo(info: Record<string, string | number>): void {
      this.extraTxInfo = info;
    },

    setPromptOpen(open: boolean): void {
      this.prompt = open;
    },

    setConfirmLogoutOpen(open: boolean): void {
      this.logoutConfirm = open;
    }
  },
});
