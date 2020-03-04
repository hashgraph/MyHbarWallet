// eslint-disable-next-line no-undef
module.exports = (x: any): any =>
    __non_webpack_require__(
        `${require("electron").remote.app.getAppPath()}/${x}`
    );
