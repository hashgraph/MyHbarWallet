import { Ed25519PrivateKey } from "@hashgraph/sdk";

import { prefixPrivate, prefixPublic } from "../../src/service/hedera";

const PRIVATE_KEY = "302e020100300506032b6570042204207f7ac6c8025a15ff1e07ef57c7295601379a4e9a526560790ae85252393868f0";
const PRIVATE_KEY_UNPREFIXED = "7f7ac6c8025a15ff1e07ef57c7295601379a4e9a526560790ae85252393868f0";
const PUBLIC_KEY = "302a300506032b6570032100480474335c38c27bfde1f0c2010d3db95eeb74a1f8ac65212f7824ce1ab84eca";
const PUBLIC_KEY_UNPREFIXED = "5c38c27bfde1f0c2010d3db95eeb74a1f8ac65212f7824ce1ab84eca";

describe("Hedera Service", () => {
    it.todo("can construct a Client");
    it.todo("can test a Client");
    it.todo("can construct a Session");

    it("can prefix a private key (with existing prefix)", () => {
        const key = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        expect(key.toString()).toStrictEqual(prefixPrivate(PRIVATE_KEY));
    });

    it("can prefix a private key (without existing prefix)", () => {
        const key = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        expect(key.toString()).toStrictEqual(prefixPrivate(PRIVATE_KEY_UNPREFIXED));
    });

    it("can prefix a public key (with existing prefix)", () => {
        const key = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        const publicKey = key.publicKey;
        expect(publicKey.toString()).toStrictEqual(prefixPublic(PUBLIC_KEY));
    });

    it("can prefix a public key (without existing prefix)", () => {
        const key = Ed25519PrivateKey.fromString(PRIVATE_KEY);
        const publicKey = key.publicKey;
        expect(publicKey.toString()).toStrictEqual(prefixPublic(PUBLIC_KEY_UNPREFIXED));
    });
});
