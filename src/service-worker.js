workbox.routing.precacheAndRoute(self.__WB_MANIFEST);

workbox.core.setCacheNameDetails({ prefix: "mhw" });
workbox.routing.registerRoute(
    /https/,
    new workbox.strategies.NetworkFirst()
);
