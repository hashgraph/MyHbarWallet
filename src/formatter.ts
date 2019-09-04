import BigNumber from "bignumber.js";

// Trim leading and trailing 0's from the input,
// and restrict significant digits past the decimal point.
// The captured group is the desired end result.
export const hbarAmountRegex = /^0*(\d+(?:\.\d{1,9}?)?)0*$/;

// Handrolling a number formatter that takes in a string because
// the JS number formatter requires the input to be of type `Number` while
// MyHbarWallet inputs could be potentially greater than Number.max()
export function formatHbar(input: string): string {
    if (hbarAmountRegex.test(input) == null) {
        return "";
    }

    const res = hbarAmountRegex.exec(input);

    // Return first group or empty string
    return res == null ? "" : res[1];
}

export function formatUSD(input: BigNumber): string {
    const fmt = {
        prefix: "$",
        decimalSeparator: ".",
        groupSeparator: ",",
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: " ",
        fractionGroupSize: 0
    };

    return input.toFormat(2, BigNumber.ROUND_HALF_CEIL, fmt);
}
