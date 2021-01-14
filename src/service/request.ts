import axios, { CancelToken, CancelTokenSource } from "axios";

export function apiBase(testnet: boolean): string {
    return testnet ? "https://api.testnet.kabuto.sh/" : "https://api.kabuto.sh/";
    // return "http://192.168.7.91:8080/";
}

export function sanitize(s: string): string {
    return s.replace(/(%|\*|\+|\?|\{|\}|\(|\)|\[|\])/u, "\\$1");
}

export function cancelTokenSource(): CancelTokenSource {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.CancelToken.source();
}

export function getCancelToken(): CancelToken {
    return cancelTokenSource().token;
}

export async function kabutoRequest<T>(
    endpoint: string,
    testnet = false,
    token: CancelToken|null = null
): Promise<T> {
    const url = `${apiBase(testnet)}${endpoint}`;
    if (token == null) {
        return axios.get(url, {
            paramsSerializer(params) {
                return "";
            }
        }).then((resp) => resp.data as T);
    }
    return axios.get(url, {
        cancelToken: token, paramsSerializer(params) {
            return "";
        }
    }).then((resp) => resp.data as T);
}

export async function externalRequest<T>(
    endpoint: string,
    token: CancelToken|null = null
): Promise<T> {
    const url = `${endpoint}`;
    if (token == null) return axios.get(url).then((resp) => resp.data as T);
    return axios.get(url, { cancelToken: token }).then((resp) => resp.data as T);
}
