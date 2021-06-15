export enum SoftwareOption {
  Keystore = "Keystore",
  Mnemonic = "Mnemonic",
  Key = "PrivateKey",
}

export interface SoftwareAttributes {
  supported: boolean;
  title: string;
  description: string;
  value: SoftwareOption;
  imageLight: string;
  imageDark: string;
  route: string;
}

import lightKeystoreFile from "../assets/img_software_keystore.svg";
import darkKeystoreFile from "../assets/dark/img_software_keystore.svg";
import lightMnemonicPhrase from "../assets/img_mnemonic_phrase.svg";
import darkMnemonicPhrase from "../assets/dark/img_mnemonic_phrase.svg";
import lightPrivateKey from "../assets/img_private_key.svg";
import darkPrivateKey from "../assets/dark/img_private_key.svg";

// Note: use translation keys for title, description
export const SoftwareOptions: Map<SoftwareOption, SoftwareAttributes> = new Map(
  [
    [
      SoftwareOption.Keystore,
      {
        supported: true,
        title: "Keystore.title",
        description: "Keystore.description",
        value: SoftwareOption.Keystore,
        imageLight: lightKeystoreFile,
        imageDark: darkKeystoreFile,
        route: "access.software.keystore",
      },
    ],
    [
      SoftwareOption.Mnemonic,
      {
        supported: true,
        title: "Mnemonic.title",
        description: "Mnemonic.description",
        value: SoftwareOption.Mnemonic,
        imageLight: lightMnemonicPhrase,
        imageDark: darkMnemonicPhrase,
        route: "access.software.mnemonic",
      },
    ],
    [
      SoftwareOption.Key,
      {
        supported: true,
        title: "Key.title",
        description: "Key.description",
        value: SoftwareOption.Key,
        imageLight: lightPrivateKey,
        imageDark: darkPrivateKey,
        route: "access.software.key",
      },
    ],
  ]
);
