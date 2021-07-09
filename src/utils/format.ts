// generates a link for emailing support
export function formatSupportLink(
    url: string | null,
    platform: string | any,
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