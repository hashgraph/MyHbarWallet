import lightSoftware from "../assets/img_software_keystore.svg";
import darkSoftware from "../assets/dark/img_software_keystore.svg";
import lightHardware from "../assets/img_hardware.svg";
import darkHardware from "../assets/dark/img_hardware.svg";

import { HardwareOption } from "./HardwareOptions";
import { SoftwareOption } from "./SoftwareOptions";

export type CreateOption = HardwareOption | SoftwareOption;

export enum CreateOptionType {
    Software = "Software",
    Hardware = "Hardware",
}

export interface CreateAttributes {
    supported: boolean;
    title: string;
    description: string;
    value: CreateOptionType;
    imageLight: string;
    imageDark: string;
    route: string;
}

export const CreateOptions: Map<CreateOptionType, CreateAttributes> = new Map([
    [
        CreateOptionType.Software,
        {
            supported: true,
            title: "Software.title",
            description: "Software.description",
            value: CreateOptionType.Software,
            imageLight: lightSoftware,
            imageDark: darkSoftware,
            route: "create.software",
        },
    ],
    [
        CreateOptionType.Hardware,
        {
            supported: true,
            title: "Hardware.title",
            description: "Hardware.description",
            value: CreateOptionType.Hardware,
            imageLight: lightHardware,
            imageDark: darkHardware,
            route: "access.hardware", // same process as access
        },
    ],
]);