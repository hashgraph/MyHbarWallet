// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
export async function writeToClipboard(value: string): Promise<void> {
    await navigator.clipboard.writeText(value);
}
