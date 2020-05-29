/* eslint-env node */

// Pro Hacker Move
process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
    moduleFileExtensions: [ "js", "jsx", "json", "vue", "ts", "tsx" ],
    moduleNameMapper: { "\\.(css|less|scss|sass)$": "jest-transform-css" },
    transform: {
        "^.*\\.(vue)$": "vue-jest",
        ".+\\.(svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: [ "<rootDir>/node_modules/" ],
    setupFiles: [ "jest-canvas-mock", "<rootDir>/tests/unit/jest.init.js" ],
    snapshotSerializers: [ "jest-serializer-vue" ],
    testMatch: [ "<rootDir>/tests/unit/**/*.spec.ts" ],
    testURL: "http://localhost/",
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ],
    globals: {
        "ts-jest": { babelConfig: true },
        "VERSION": "1.1.1",
        "COMMIT_HASH": "placeholderhash",
        "HEDERA_NETWORK": "testnet",
        "MHW_ENV": "sandbox",
        "MOONPAY_API_KEY": "pk_test_ypQ0mhShRarhXwAbGvdLfxAL89AtfQ",
        "IS_ELECTRON": false
    }
};
