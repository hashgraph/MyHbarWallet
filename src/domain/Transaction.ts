import { BigNumber } from "bignumber.js";

export interface Transfer {
  account: string;
  amount: number;
  is_approval: boolean;
}

// {"bytes":null,"
// charged_tx_fee":56188543,
// "consensus_timestamp":"1670631932.414117627",
// "entity_id":null,
// "max_fee":"100000000",
// "memo_base64":"",
// "name":"CRYPTOCREATEACCOUNT",
// "node":"0.0.6",
// "nonce":0,
// "parent_consensus_timestamp":null,
// "result":"INSUFFICIENT_TX_FEE",
// "scheduled":false,
// "transaction_hash":"ESyZjBSVJwG5N5r8RlTY2bP3lwoAJXRkBVNbAymGyEs1QWnwY//0pENelH/P7uUr",
// "transaction_id":"0.0.3386-1670631920-445697990",
// "transfers":[
//{"account":"0.0.6","amount":2676048,"is_approval":false},
//{"account":"0.0.98","amount":53512495,"is_approval":false},
//{"account":"0.0.3386","amount":-56188543,"is_approval":false}],
//"valid_duration_seconds":"120",
//"valid_start_timestamp":"1670631920.445697990"}

export type Transaction = {
  bytes: string | null;
  charged_tx_fee: number;
  consensus_timestamp: string | null; // Timestamp
  entity_id: string | null;
  max_fee: number;
  memo_base64: string;
  name: string;
  node: string;
  nonce: number;
  parent_consensus_timestamp: string | null; // Timestamp
  result: string;
  scheduled: boolean;
  transaction_hash: string;
  transaction_id: string;
  transfers: Transfer[];
  valid_duration_seconds: number;
  valid_start_timestamp: string | null; // Timestamp
}

export function formatType(type: string): string | undefined {
  if (!type) return undefined;

  const words = type.split("_");

  let formatted = "";

  for (const i in words) {
    formatted += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase() + " ";
  }

  return formatted.trim();
}

export function formatAmount(value: number): string | undefined {
  if (!value) return undefined;

  return `${parseFloat((value / Math.pow(10, 8)).toFixed(8))}ℏ`;
}

export function sumTransfers(transfers: Transfer[]): string | undefined {
  if (!transfers) return undefined;

  let sum = new BigNumber(0);

  for (const transfer of transfers) {
    const amount = new BigNumber(transfer?.amount ?? 0);
    if (amount?.isGreaterThan(0)) sum = sum.plus(amount);
  }

  return formatAmount(sum.toNumber());
}