import BigNumber from "bignumber.js";

// Trim leading and trailing 0's from the input,
// and restrict significant digits past the decimal point.
// The captured group is the desired end result.
const hbarAmountRegex = /^0*(\d+(?:\.\d{1,9}?)?)0*$/;

export function validateHbar(input: string): boolean {
    return hbarAmountRegex.test(input);
}

export function formatHbar(input: BigNumber): string {
    const fmt = {
        decimalSeparator: ".",
        groupSeparator: ",",
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: " ",
        fractionGroupSize: 0
    };

    return input.toFormat(fmt);
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
