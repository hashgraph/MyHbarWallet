/* eslint-env node */
module.exports = {
    presets: [[ "@vue/babel-preset-app", { modules: false }]],
    env: { test: { presets: [[ "@vue/babel-preset-app", { modules: false }]]}}
};
