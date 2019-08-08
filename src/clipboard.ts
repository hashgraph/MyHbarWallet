// Type declarations for Clipboard API
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
interface Clipboard {
    writeText(text: string): Promise<void>;
}

interface NavigatorClipboard extends Navigator {
    // Only available in a secure context.
    readonly clipboard: Clipboard;
}

interface NavigatorExtended extends NavigatorClipboard {}

export async function writeToClipboard(value: string) {
    await (navigator as NavigatorExtended).clipboard!.writeText(value);
}
