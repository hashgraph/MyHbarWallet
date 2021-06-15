/** Returns true if the current device has a functioning clipboard */
export function hasClipboard(): boolean {
  return navigator.clipboard != null;
}

/**
 * Copy the given text to clipboard.
 * Returns `false` if the data could not be copied.
 */
export async function copyText(text: string): Promise<boolean> {
  if (hasClipboard()) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  return false;
}
