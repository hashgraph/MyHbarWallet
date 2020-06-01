import { convert, Unit } from "../../src/service/units";

describe("Units Service", (): void => {
    it("converts tinybar to hbar", (): void => {
        expect(convert("10", Unit.Tinybar, Unit.Hbar)).toBe("0.0000001");
        expect(convert("1000000", Unit.Tinybar, Unit.Hbar)).toBe("0.01");
        expect(convert("100000000000", Unit.Tinybar, Unit.Hbar)).toBe("1000");
    });

    it("converts hbar to tinybar", (): void => {
        expect(convert("0.0000001", Unit.Hbar, Unit.Tinybar)).toBe("10");
        expect(convert("0.01", Unit.Hbar, Unit.Tinybar)).toBe("1000000");
        expect(convert("1000", Unit.Hbar, Unit.Tinybar)).toBe("100000000000");
    });

    it("converts hbar with pathological decimals to tinybar with no decimals", (): void => {
        // truncation (intended for user input)
        expect(
            convert(
                "1.99999999999999999999999999999",
                Unit.Hbar,
                Unit.Tinybar,
                false
            )
        ).toBe("199999999");
        expect(convert("199999999", Unit.Tinybar, Unit.Hbar, false)).toBe(
            "1.99999999"
        );

        // rounding (intended for conversions)
        expect(
            convert(
                "1.99999999999999999999999999999",
                Unit.Hbar,
                Unit.Tinybar,
                true
            )
        ).toBe("200000000");
        expect(convert("200000000", Unit.Tinybar, Unit.Hbar, true)).toBe("2");
    });
});
