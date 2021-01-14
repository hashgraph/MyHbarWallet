declare module "*.vue" {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    import Vue = require("vue");
    const value: Vue.ComponentOptions<Vue>;
    export const State: Record<string, object> | null;
    export default value;
}

