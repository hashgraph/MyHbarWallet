const EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" }
];

const Permit = [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
];

export interface Permit {
    owner: string;
    spender: string;
    value: number;
    nonce: number;
    deadline: number;
}

export interface Domain {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
}

export function permitData(domain: Domain, message: Permit): string {
    return JSON.stringify({
        types: {
            EIP712Domain,
            Permit
        },
        domain,
        primaryType: "Permit",
        message
    });
}
