import BigNumber from "bignumber.js";

// Trim leading and trailing 0's from the input,
// and restrict significant digits past the decimal point.
// The captured group is the desired end result.
// todo [2020-01-01]: consider if this is actually unsafe
// eslint-disable-next-line unicorn/no-unsafe-regex
const hbarAmountRegex = /^0*(\d+(?:\.\d{1,9}?)?)0*$/u;
// todo [2020-01-01]: consider if this is actually unsafe
// eslint-disable-next-line unicorn/no-unsafe-regex
const splitHbarRegex = /^0*(\d+)(?:\.(\d{1,9}?))?0*$/u;
const markdownBoldRegex = /(?:\*{2}((?:\w| |\+|-)+)\*{2})/gu;

export function validateHbar(input: string): boolean {
    return hbarAmountRegex.test(input);
}

export function formatHbar(input: BigNumber): string {
    // allows greater precision without exponential notation
    BigNumber.config({ EXPONENTIAL_AT: 1e9 });
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
export function formatSplit(input: string): { int: string; fraction: string | null } | null {
    if (!splitHbarRegex.test(input)) {
        return null;
    }

    const res = splitHbarRegex.exec(input);

    if (res == null || res[ 1 ] == null) {
        return null;
    }

    return {
        int: res[ 1 ],
        fraction: res[ 2 ]
    };
}

export function formatRightPad(
    input: string | null,
    padChar: string,
    length: number
): string {
    let str = "";

    if (input != null) {
        str = input;
    }

    for (let i = str.length; i < length; i += 1) {
        str += padChar;
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

export function formatRich(
    input: string,
    elements:
    | {
        strongClass: string;
    }
    | null
    | undefined
): string {
    if (elements === null || typeof elements === "undefined") {
        return input.replace(markdownBoldRegex, "<strong>$1</strong>");
    }

    const replaceValue = `<span class='${elements.strongClass}'>$1</span>`;
    return input.replace(markdownBoldRegex, replaceValue);
}
