import { ESTIMATED_FEE_HBAR, MAX_FEE_HBAR } from "../getters";

export interface State {
    estimatedFeeHbar: import("@hashgraph/sdk").Hbar;
    maxFeeHbar: import("@hashgraph/sdk").Hbar;
}

export default {
    constructor: async (): Promise<State> => {
        const { Hbar } = await (import("@hashgraph/sdk") as Promise<
            typeof import("@hashgraph/sdk")
        >);

        return {
            estimatedFeeHbar: Hbar.from(0.200_000_000, "hbar"),
            maxFeeHbar: Hbar.from(1, "hbar")
        } as State;
    },
    getters: {
        [ESTIMATED_FEE_HBAR]: (
            state: State
        ): import("@hashgraph/sdk").Hbar => {
            return state.estimatedFeeHbar;
        },
        [MAX_FEE_HBAR]: (state: State) => (
            remainingBalanceHBar: import("@hashgraph/sdk").Hbar
        ): import("@hashgraph/sdk").Hbar => {
            return state.maxFeeHbar.comparedTo(remainingBalanceHBar) <= 0
                ? state.maxFeeHbar
                : remainingBalanceHBar;
        }
    }
};
