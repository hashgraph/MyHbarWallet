export enum HardwareOption {
    Ledger = "ledger",
    Finney = "finney",
    Bitbox = "bitbox",
    Trezor = "trezor",
    Secalot = "secalot",
    Keepkey = "keepkey",
}

export interface HardwareAttributes {
    supported: boolean;
    title: string;
    description: string;
    value: HardwareOption;
    image: string;
    route: string;
}

import imageFinney from "../assets/finney.png";
import imageBitbox from "../assets/bitbox.svg";
import imageSecalot from "../assets/secalot.svg";
import imageKeepKey from "../assets/keepkey.svg";
import imageLedger from "../assets/button_ledger.svg";
import imageTrezor from "../assets/button_trezor.svg";

// Note: use translation keys for title, description
export const HardwareOptions: Map<HardwareOption, HardwareAttributes> = new Map(
  [
    [
      HardwareOption.Ledger,
      {
        supported: true,
        title: "Ledger.title",
        description: "Ledger.description",
        value: HardwareOption.Ledger,
        image: imageLedger,
        route: "access.hardware.ledger",
      },
    ],
    [
      HardwareOption.Finney,
      {
        supported: false,
        title: "Finney.title",
        description: "Finney.description",
        value: HardwareOption.Finney,
        image: imageFinney,
        route: "access.hardware.finney",
      },
    ],
    [
      HardwareOption.Bitbox,
      {
        supported: false,
        title: "Bitbox.title",
        description: "Bitbox.description",
        value: HardwareOption.Bitbox,
        image: imageBitbox,
        route: "access.hardware.bitbox",
      },
    ],
    [
      HardwareOption.Trezor,
      {
        supported: false,
        title: "Trezor.title",
        description: "Trezor.description",
        value: HardwareOption.Trezor,
        image: imageTrezor,
        route: "access.hardware.trezor",
      },
    ],
    [
      HardwareOption.Secalot,
      {
        supported: false,
        title: "Secalot.title",
        description: "Secalot.description",
        value: HardwareOption.Secalot,
        image: imageSecalot,
        route: "access.hardware.secalot",
      },
    ],
    [
      HardwareOption.Keepkey,
      {
        supported: false,
        title: "KeepKey.title",
        description: "KeepKey.description",
        value: HardwareOption.Keepkey,
        image: imageKeepKey,
        route: "access.hardware.keepkey",
      },
    ],
  ]
);
