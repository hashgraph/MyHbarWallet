declare module "html2pdf.js" {
    interface Html2PdfImageOptions {
        type: string;
        quality: number;
    }

    // eslint-disable-next-line @typescript-eslint/class-name-casing
    interface jsPDFOptions {
        unit: string;
    }

    interface Html2PdfOptions {
        filename: string;
        margin?: number | number[];
        pageSize: string;
        image: Html2PdfImageOptions;
        jsPDF: jsPDFOptions;
    }

    interface Html2Pdf {
        set(options: Html2PdfOptions): this;

        from(element: HTMLElement): this;

        toPdf(): this;

        get(arg0: string): this;

        save(): void;

        then(arg0: Function): void;
    }

    export default function html2pdf(): Html2Pdf;
}
