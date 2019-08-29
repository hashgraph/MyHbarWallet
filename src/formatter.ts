// Use capturing groups with regex to remove trailing and leading 0's
const regex = /^0*(\d+\.?(\d{1,9}?)?)0*$/;

// Handrolling a number formatter that takes in a string because
// the JS number formatter requires the input to be of type `Number` while
// MyHbarWallet inputs could be potentially greater than Number.max()
export default function format(input: string): string {
    if (regex.test(input) == null) {
        return "";
    }

    const res = regex.exec(input);

    // Return first group or empty string
    return res == null ? "" : res[1];
}
