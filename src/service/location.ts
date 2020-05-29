import { externalRequest } from "./request";

const ipifyEndpoint = "https://api.ipify.org?format=json";
const ipApiCoEndpoint = (IP: string): string => `https://ipapi.co/${IP}/country`;

async function getIPAddress(): Promise<string> {
    const response: { ip: string } = await externalRequest(ipifyEndpoint);
    return response.ip;
}

export async function inUnitedStates(): Promise<boolean|null> {
    try {
        const userAddress = await getIPAddress();
        const response = await externalRequest(ipApiCoEndpoint(userAddress));
        if (response === "US") return true;
        return false;
    } catch (error) {
        return null;
    }
}
