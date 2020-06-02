import { BigNumber } from "bignumber.js";

import {
    formatHbar,
    formatSplit,
    formatRightPad,
    formatRich,
    formatUSD,
    formatBuild,
    formatSupportLink
} from "../../src/service/format";

describe("Format Service", () => {
    it("can format hbar", () => {
        expect(
            formatHbar(new BigNumber(12323456.123234233332))
        ).toMatchInlineSnapshot('"12,323,456.123234233"');
    });

    it("can format split", () => {
        expect(formatSplit("12342345654.32345")).toMatchInlineSnapshot(`
            Object {
              "fraction": "32345",
              "int": "12342345654",
            }
        `);
    });

    it("can format right pad", () => {
        expect(formatRightPad("123423.234", "x", 20)).toMatchInlineSnapshot(
            '"123423.234xxxxxxxxxx"'
        );
    });

    it("can format rich", () => {
        expect(formatRich("123423.3234", null)).toMatchInlineSnapshot(
            '"123423.3234"'
        );
        expect(formatRich("**bold**", null)).toMatchInlineSnapshot(
            "<strong>bold</strong>"
        );
    });

    it("can format USD", () => {
        expect(formatUSD(new BigNumber(11234234.2332))).toMatchInlineSnapshot(
            '"$11,234,234.23"'
        );
    });

    it("can format build string", () => {
        expect(formatBuild("mhw", "version")).toMatchInlineSnapshot(
            '"mhw version"'
        );
    });

    it("can format support email link", () => {
        expect(
            formatSupportLink(null, "", "", "", "", "", "")
        ).toMatchInlineSnapshot(
            '"mailto:support@myhbarwallet.com?subject=Issue%20on%20null&body=Browser%3A%20%0AOS%3A%20%0ADevice%3A%20%0AVersion%3A%20%0AAccountID%3A%20%0AURL%3A%20null%0A%0A%0A%0A"'
        );
        expect(
            formatSupportLink(
                null,
                "AAAA",
                "BBBB",
                "CCCC",
                "DDDD",
                "EEEE",
                "FFFF"
            )
        ).toMatchInlineSnapshot(
            '"mailto:support@myhbarwallet.com?subject=Issue%20on%20null&body=Browser%3A%20BBBB%0AOS%3A%20AAAA%0ADevice%3A%20CCCC%0AVersion%3A%20DDDD%0AAccountID%3A%20EEEE%0AURL%3A%20null%0A%0A%0AFFFF%0A"'
        );
    });
});
