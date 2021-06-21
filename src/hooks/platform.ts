import platform from "platform";

export const IOS = "iOS";
export const ANDROID = "Android";
const AndroidRegex = /android/i;
const LGRegex = /webos/i;
const AppleRegex = /iphone|ipad|ipod/i;
const GoogleRegex = /nexus|pixel/i;

export function useOperatingSystem(): string | null {
  return platform.os?.family ?? null;
}

export async function isMobile(): Promise<boolean> {
    if (platform.product != null) {
        if (platform.product != null) {
            if (AppleRegex.exec(platform.product) != null ||
                    AndroidRegex.exec(platform.product) != null ||
                    LGRegex.exec(platform.product) != null ||
                    GoogleRegex.exec(platform.product)) {
                return true;
            }
        }
    }

    return false;
}