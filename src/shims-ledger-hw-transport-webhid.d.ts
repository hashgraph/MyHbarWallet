declare module "@ledgerhq/hw-transport-webhid" {
    import Transport, {
        DescriptorEvent,
        Observer,
        Subscription
    } from "@ledgerhq/hw-transport";

    class TransportWebHID extends Transport {
        public constructor(device: string);
        public static listen(
            observer: Observer<DescriptorEvent<string>>
        ): Subscription;
        public static request(): Promise<TransportWebHID>;
        public static openConnection(): Promise<TransportWebHID>;
        public static open(device: string): Promise<TransportWebHID>;
    }

    export default TransportWebHID;
}
