declare module "html2pdf.js" {
    type Html2PdfImageOptions = {
        type: string;
        quality: number;
    };

    type jsPDFOptions = {
        unit: string;
    };

    type Html2PdfOptions = {
        filename: string;
        margin?: number | number[];
        pageSize: string;
        image: Html2PdfImageOptions;
        jsPDF: jsPDFOptions;
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
