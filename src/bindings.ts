/* eslint-disable no-undef, @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
module.exports = (x: any): any =>
    __non_webpack_require__(
        `${require("electron").remote.app.getAppPath()}/${x}`
    );
