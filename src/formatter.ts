import BigNumber from "bignumber.js";

// Trim leading and trailing 0's from the input,
// and restrict significant digits past the decimal point.
// The captured group is the desired end result.
const hbarAmountRegex = /^0*(\d+(?:\.\d{1,9}?)?)0*$/;
const splitHbarRegex = /^0*(\d+)(?:\.(\d{1,9}?))?0*$/;

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

// Splits string into the int and fraction parts
export function formatSplit(
    input: string
): { int: string; fraction: string | null } | null {
    if (!splitHbarRegex.test(input)) {
        return null;
    }

    const res = splitHbarRegex.exec(input);

    if (res == null || res[1] == null) {
        return null;
    }

    return {
        int: res[1],
        fraction: res[2]
    };
}

export function formatRightPad(input: string | null, length: number): string {
    let str = "";

    if (input != null) {
        str = input;
    }

    for (let i = str.length; i < length; i++) {
        str = str + "0";
    }

    return str;
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
