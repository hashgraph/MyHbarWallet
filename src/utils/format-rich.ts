const markdownBoldRegex = /(?:\*{2}([\w +-]+)\*{2})/g;

export function formatRich(
  input: string,
  elements?:
    | {
        strongClass: string;
      }
    | null
    | undefined
): string {
  if (elements != null) {
    const replaceValue = `<span class='${elements.strongClass}'>$1</span>`;
    input = input.replace(markdownBoldRegex, replaceValue);
  } else {
    input = input.replace(markdownBoldRegex, "<strong>$1</strong>");
  }
  return input;
}
