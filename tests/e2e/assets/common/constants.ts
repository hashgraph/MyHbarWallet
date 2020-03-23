export default {
    // Common
    truncatePrivate(key: string): string {
        const privatePrefix = "302e020100300506032b657004220420";
        return key.replace(privatePrefix, "");
    },
    truncatePublic(key: string): string {
        const publicPrefix = "302a300506032b6570032100";
        return key.replace(publicPrefix, "");
    },

    // Access by Keystore
    keystoreAccountId: "0.0.60118",
    keystoreIncorrectAccountId: "0.0.666",
    // eslint-disable-next-line no-undef
    keystorePath: `${__dirname}/../../assets/keystore_file`,
    keystorePassword: "ThisIsARandomPassword",
    keystoreIncorrectPassword: "$^$^$^$^$^$^$^$^",
    keystorePublicKey:
        "302a300506032b6570032100389ac2dd5574527b37513463822bbee3869664b46421f0627a82d0c305728d4b",
    keystorePrivateKey:
        "302e020100300506032b6570042204205047bdeebeb4f2de436ad8b5c9824a472e68aeaa1a51af4f835f3960310c49b8",

    // Access with Mnemonic
    mnemonicPhrase:
        "neither\ttheory\tnature\tsad\taim\tthree\tstaff\tinsane\torchard\tuse\tvote\tcherry\tmiss\tpalace\tpitch\televator\tfloat\tbuyer\tcitizen\tgossip\tscissors\ttobacco\tglue\tdigital\n",
    mnemonicPhraseAccountId: "0.0.62519",
    mnemonicPhrasePublicKey:
        "302a300506032b657003210052a5df220ff49beeaf86704193afefa08cffb4212a6d0937e55e2e4f5bc4488e",
    mnemonicPhrasePrivateKey:
        "302e020100300506032b657004220420862cb46e47553fe28a8392cc23193942869eea51679d9302bee203b5258d52fb",

    // Access With Private Key
    keyPublicKey:
        "302a300506032b65700321000399267b48ccbac3f03278f6fd96fce1c71a00db692d75f8f82814f85a8cf74e",
    keyPrivateKey:
        "302e020100300506032b657004220420b47720552ad89bafe97676da89cef818d8d888fe4eeba62135facfbd35e60e88",
    keyAccountId: "0.0.45507",

    // Regex
    // eslint-disable-next-line unicorn/no-unsafe-regex
    regexUSD: /^≈ \$([1-9]\d{0,2}(,\d{3})*(\.\d{2})?|[1-9]\d*(\.\d{2})?|0?\.(?!00)\d{2})$/,
    // eslint-disable-next-line unicorn/no-unsafe-regex
    regexHBar: /^([1-9]\d{0,2}(?:,\d{3})*(\.\d{1,9})?|0?\.(?=.*[1-9])\d{1,9}) ℏ$/
};
