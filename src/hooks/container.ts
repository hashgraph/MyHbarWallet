import {
  AwilixContainer,
  createContainer,
  InjectionMode,
  asClass,
} from "awilix";
import { App, inject, InjectionKey } from "vue";

import { HbarPriceService } from "../services/hbar-price";
import { HederaService } from "../services/hedera";
import { CoingeckoHbarPriceServiceImpl } from "../services/impl/hbar-price-coingecko";
import { HederaServiceImpl } from "../services/impl/hedera";

interface Cradle {
    hedera: HederaService;
    hbarPrice: HbarPriceService;
}

const container = createContainer<Cradle>({
  injectionMode: InjectionMode.PROXY,
});

const containerKey: InjectionKey<AwilixContainer<Cradle>> = Symbol();

export function useContainer(): AwilixContainer<Cradle> {
  return inject(containerKey) ?? container;
}

export default function installContainer(app: App): void {
  app.provide(containerKey, container);
}

container.register(
  "hbarPrice",
  asClass<HbarPriceService>(CoingeckoHbarPriceServiceImpl)
);

container.register("hedera", asClass<HederaService>(HederaServiceImpl));
