import { BigNumber } from "bignumber.js";

// Trim leading and trailing 0's from the input,
// and restrict significant digits past the decimal point.
// The captured group is the desired end result.
// eslint-disable-next-line unicorn/no-unsafe-regex
const hbarAmountRegex = /^0*(\d+(?:\.\d{1,9}?)?)0*$/;
// eslint-disable-next-line unicorn/no-unsafe-regex
const splitHbarRegex = /^0*(\d+)(?:\.(\d{1,9}?))?0*$/;
const markdownBoldRegex = /(?:\*{2}([\w +-]+)\*{2})/g;

export function validateHbar(input: string): boolean {
    return hbarAmountRegex.test(input);
}

export function formatHbar(input: Readonly<BigNumber>): string {
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

    for (let i = str.length; i < length; i++) {
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
    if (elements != null) {
        const replaceValue =
            `<span class='${elements.strongClass}'>$1</span>`;
        input = input.replace(markdownBoldRegex, replaceValue);
    } else {
        input = input.replace(markdownBoldRegex, "<strong>$1</strong>");
    }
    return input;
}

// formats a build string given the name and version
export function formatBuild(
    name: string | undefined | null,
    version: string | undefined | null
): string | null {
    if (name || version) {
        if (name && version) {
            return `${name} ${version}`;
        } else if (name) {
            return name;
        }
    }

    return null;
}

// generates a link for emailing support
export function formatSupportLink(
    url: string | null,
    platform: string,
    browser: string,
    device: string,
    version: string,
    accountId: string,
    description: string
): string {
    const subjectTemplate = `Issue on ${url}`;
    const bodyTemplate = `Browser: ${browser}
OS: ${platform}
Device: ${device}
Version: ${version}
AccountID: ${accountId}
URL: ${url}


${description}
`;
    return `mailto:support@myhbarwallet.com?subject=${encodeURIComponent(subjectTemplate)}&body=${encodeURIComponent(bodyTemplate)}`;
}
