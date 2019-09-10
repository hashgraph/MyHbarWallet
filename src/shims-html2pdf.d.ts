declare module "html2pdf.js" {
    import jsPDF from "jspdf";

    type Html2PdfOptions = {
        filename: string;
        margin?: number;
    };

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
