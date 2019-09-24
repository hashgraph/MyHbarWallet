import { ESTIMATED_FEE_HBAR, MAX_FEE_HBAR } from "../getters";

export interface State {
    estimatedFeeHbar: import("@hashgraph/sdk/src/Hbar").Hbar;
    maxFeeHbar: import("@hashgraph/sdk/src/Hbar").Hbar;
}

export default {
    constructor: async (): Promise<State> => {
        const { Hbar } = await (import("@hashgraph/sdk/src/Hbar") as Promise<
            typeof import("@hashgraph/sdk/src/Hbar")
        >);

        return {
            estimatedFeeHbar: Hbar.from(0.200_000_000, "hbar"),
            maxFeeHbar: Hbar.from(1, "hbar")
        } as State;
    },
    getters: {
        [ESTIMATED_FEE_HBAR]: (
            state: State
        ): import("@hashgraph/sdk/src/Hbar").Hbar => {
            return state.estimatedFeeHbar;
        },
        [MAX_FEE_HBAR]: (state: State) => (
            remainingBalanceHBar: import("@hashgraph/sdk/src/Hbar").Hbar
        ): import("@hashgraph/sdk/src/Hbar").Hbar => {
            return state.maxFeeHbar.comparedTo(remainingBalanceHBar) <= 0
                ? state.maxFeeHbar
                : remainingBalanceHBar;
        }
    }
};
