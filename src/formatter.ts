// Handrolling a number formatter that takes in a string because
// the JS number formatter requires the input to be of type `Number` while
// MyHbarWallet inputs could be potentially greater than Number.max()
export default function format(input: string): string {
    // The extra `.toString()` is necessary because otherwise
    // ```input.split isnot a function``` error pops up in console
    const parts: string[] = input.toString().split(".");
    let integer: string | null;
    let fraction: string | null;

    if (parts[0].length > 0) {
        integer = parts[0];
        fraction = parts[1];
    } else {
        integer = input.toString();
        fraction = null;
    }

    for (let i = integer.length - 3; i > 0; i -= 3) {
        integer = integer.substring(0, i) + "," + integer.substring(i);
    }

    if (fraction != null) {
        let trailingCnt = 0;
        for (
            let i = fraction.length - 1;
            i >= 0 && fraction.charAt(i) == "0";
            i--
        ) {
            trailingCnt++;
        }
        fraction = fraction.substring(0, fraction.length - trailingCnt);
    }

    if (fraction != null && fraction.length > 0) {
        return integer + "." + fraction;
    } else {
        return integer;
    }
}
