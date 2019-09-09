declare module "html2pdf.js" {
    type Html2PdfOptions = {
        filename: string;
        margin?: number;
    };

    interface Html2Pdf {
        set(options: Html2PdfOptions): this;
        from(element: HTMLElement): this;
        save(): void;
    }

    export default function html2pdf(): Html2Pdf;
}
