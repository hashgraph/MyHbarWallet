import lightSoftware from "../assets/img_software_keystore.svg";
import darkSoftware from "../assets/dark/img_software_keystore.svg";
import lightHardware from "../assets/img_hardware.svg";
import darkHardware from "../assets/dark/img_hardware.svg";

import { HardwareOption } from "./HardwareOptions";
import { SoftwareOption } from "./SoftwareOptions";

export type AccessOption = HardwareOption | SoftwareOption;

export enum AccessOptionType {
    Software = "Software",
    Hardware = "Hardware",
}

export interface AccessAttributes {
    supported: boolean;
    title: string;
    description: string;
    value: AccessOptionType;
    imageLight: string;
    imageDark: string;
    route: string;
}

export const AccessOptions: Map<AccessOptionType, AccessAttributes> = new Map([
  [
    AccessOptionType.Software,
    {
      supported: true,
      title: "Software.title",
      description: "Software.description",
      value: AccessOptionType.Software,
      imageLight: lightSoftware,
      imageDark: darkSoftware,
      route: "access.software",
    },
  ],
  [
    AccessOptionType.Hardware,
    {
      supported: true,
      title: "Hardware.title",
      description: "Hardware.description",
      value: AccessOptionType.Hardware,
      imageLight: lightHardware,
      imageDark: darkHardware,
      route: "access.hardware",
    },
  ],
]);
