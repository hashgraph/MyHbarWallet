export function hasAsyncClipboard(): boolean {
    return typeof navigator.clipboard !== "undefined";
}

export async function writeToClipboardAsync(target: HTMLElement | Vue): Promise<void> {
    try {
        let _target = target;
        // eslint-disable-next-line no-prototype-builtins
        if (target.hasOwnProperty("_isVue")) {
            _target = (target as Vue).$el as HTMLElement;
        }

        const value = (_target as HTMLElement).textContent?.trim() || ""; // :^)
        await navigator.clipboard.writeText(value);
    } catch (error) {
        console.warn("Failed to Copy");
        console.warn(error);
    }
}

export function writeToClipboardSync(target: HTMLElement): void {
    try {
        if (document.createRange != null) {
            const range = document.createRange();
            range.selectNode(target);

            const selection = window.getSelection();
            selection!.removeAllRanges();
            selection!.addRange(range);

            document.execCommand("copy");
            selection!.removeAllRanges();
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const range = document.body.createTextRange(); // sure hope this exists
            range.moveToElementText(target);
            range.select();
            document.execCommand("copy");
        }
    } catch (error) {
        console.warn("Failed to Copy");
        console.warn(error);
    }
}

export function writeToClipboard(target: HTMLElement): void {
    if (hasAsyncClipboard()) {
        void writeToClipboardAsync(target); // :^)
    } else {
        writeToClipboardSync(target);
    }
}
