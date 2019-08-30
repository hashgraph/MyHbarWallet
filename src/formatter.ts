// Trim leading and trailing 0's from the input,
// and restrict significant digits past the decimal point.
// The captured group is the desired end result.
export const hbarAmountRegex = /^0*(\d+(?:\.\d{1,9}?)?)0*$/;

// Handrolling a number formatter that takes in a string because
// the JS number formatter requires the input to be of type `Number` while
// MyHbarWallet inputs could be potentially greater than Number.max()
export default function format(input: string): string {
    if (hbarAmountRegex.test(input) == null) {
        return "";
    }

    const res = hbarAmountRegex.exec(input);

    // Return first group or empty string
    return res == null ? "" : res[1];
}
