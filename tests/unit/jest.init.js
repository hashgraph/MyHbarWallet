import { config } from "@vue/test-utils";

import en from "../../src/lang/en";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
config.mocks.$t = (msg) => en[ msg ];
