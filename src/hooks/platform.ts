export const IOS = "iOS";
export const ANDROID = "Android";
const AndroidRegex = /android/i;
const LGRegex = /webos/i;
const AppleRegex = /iphone|ipad|ipod/i;
const GoogleRegex = /nexus|pixel/i;

export function useOperatingSystem(): string | null {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const platform = await import("platform")["default"];
  return platform.os?.family ?? null;
}

export async function isMobile(): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const platform = await import("platform")["default"];
  if (platform.product != null) {
    if (platform.product != null) {
      if (
        AppleRegex.exec(platform.product) != null ||
                AndroidRegex.exec(platform.product) != null ||
                LGRegex.exec(platform.product) != null ||
                GoogleRegex.exec(platform.product)
      ) {
        return true;
      }
    }
  }

  return false;
}
