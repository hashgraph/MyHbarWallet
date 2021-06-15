import platform from "platform";

export const IOS = "iOS";
export const ANDROID = "Android";

export function useOperatingSystem(): string | null {
  return platform.os?.family ?? null;
}
