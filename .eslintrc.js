module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/recommended", "@vue/prettier", "@vue/typescript"],
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    rules: {
        indent: ["error", 4],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
};
