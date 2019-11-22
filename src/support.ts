// formats a build string given the name and version
export function build(
    name: string | undefined | null,
    version: string | undefined | null
): string | null {
    if (name !== null || version !== null) {
        if (name !== null && version !== null) {
            return `${name} ${version}`;
        } else if (name !== null) {
            return name as string;
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


${description}`;

    return `mailto:support@myhbarwallet.com?subject=${encodeURIComponent(subjectTemplate)}&body=${encodeURIComponent(bodyTemplate)}`;
}
