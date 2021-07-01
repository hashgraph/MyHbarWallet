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

import lightSoftware from "../assets/img_software_keystore.svg";
import darkSoftware from "../assets/dark/img_software_keystore.svg";

import lightHardware from "../assets/img_hardware.svg";
import darkHardware from "../assets/dark/img_hardware.svg";

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
<<<<<<< HEAD
  // TODO
  // [
  //   AccessOptionType.Hardware,
  //   {
  //     supported: true,
  //     title: "Hardware.title",
  //     description: "Hardware.description",
  //     value: AccessOptionType.Hardware,
  //     imageLight: lightHardware,
  //     imageDark: darkHardware,
  //     route: "access.hardware",
  //   },
  // ],
=======
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
>>>>>>> 1071461646dafa61a6e27f9d6450406957b0577a
]);
