import BigNumber from "bignumber.js";

export enum Unit {
    Tinybar = "tinybar",
    Microbar = "microbar",
    Millibar = "millibar",
    Hbar = "hbar",
    Kilobar = "kilobar",
    Megabar = "megabar",
    Gigabar = "gigabar"
}

const unitMap: Map<Unit, number> = new Map([
    [ Unit.Tinybar, 1 ],
    [ Unit.Microbar, 100 ],
    [ Unit.Millibar, 100000 ],
    [ Unit.Hbar, 100000000 ],
    [ Unit.Kilobar, 100000000000 ],
    [ Unit.Megabar, 100000000000000 ],
    [ Unit.Gigabar, 100000000000000000 ]
]);

export function getValueOfUnit(unit: Unit): BigNumber {
    const factor = unitMap.get(unit);

    if (typeof factor === "undefined") {
        return new BigNumber(0);
    }

    return new BigNumber(factor);
}

export function convert(
    amount: string,
    from: Unit,
    to: Unit,
    rounding = true
): string {
    const result = new BigNumber(amount)
        // Convert incoming amount to Tinybar
        .multipliedBy(getValueOfUnit(from))
        // Drop the fractional part
        .integerValue(rounding ? BigNumber.ROUND_HALF_CEIL : BigNumber.ROUND_FLOOR)
        // Convert to requested unit
        .dividedBy(getValueOfUnit(to));

    // If the result is NaN, return an empty string
    if (result.isNaN()) {
        return "";
    }

    return result.toFixed();
}
