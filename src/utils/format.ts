import BigNumber from "bignumber.js";

// generates a link for emailing support
export function formatSupportLink(
    url: string,
    platform: string,
    browser: string,
    device: string,
    version: string,
    accountId: string,
    description: string
): string {
    const subjectTemplate = `${url.length > 0 ? '' : 'General '} Issue ${url.length > 0 ? ' on ' + url : ''}`;
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

// Assumes the amount is in hbars
export function formatHbar(amount: BigNumber): string {
    return amount.toFormat();
}
