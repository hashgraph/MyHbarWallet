/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// formats a build string given the name and version
export function build(
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
export function createLink(
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
    // eslint-disable-next-line no-secrets/no-secrets
    return `mailto:support@myhbarwallet.com?subject=${encodeURIComponent(subjectTemplate)}&body=${encodeURIComponent(bodyTemplate)}`;
}
