import {jsPDF} from "jspdf"
import autoTable from 'jspdf-autotable';
import dayjs from "dayjs";

const formatToRupiah = (price: number) => {
    return  price? new Intl.NumberFormat('ID', {style: 'currency', currency: 'IDR'}).format(
        price,
    ) : "Gratis"
}

const generateInvoice = async (data: {[key: string]: any}, participation:  {[key: string]: any}) => {
    const doc = new jsPDF();

    const formatDate = (date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format('DD MMMM YYYY')

    doc.setFontSize(8);
    doc.text(`Dicetak secara otomatis pada: ${formatDate(new Date())}`, 80, 2, {baseline: 'top'});

    // COMPANY LOGO
    doc.addImage("/tumwuh-logo.png", "JPEG", 15, 12, 40, 15);

    // INVOICE DETAIL
    doc.setFontSize(30);
    doc.setFont('Times-Roman', 'normal');
    doc.text("INVOICE", 150, 30);
    doc.setFontSize(10);
    doc.text(`No Invoice ${data.invoiceNumber}`, 150, 38);

    // BILLED TO DETAIL
    doc.setFontSize(15);
    doc.text("DITAGIHKAN KE:", 15, 55);
    doc.setFontSize(10);
    doc.text(data.contact, 15, 60);
    doc.text(`Keperluan pendaftaran kompetisi ${data.expand.tournament.name}`, 15, 65);
    doc.setFontSize(15);
    doc.text("DIBAYARKAN KE:", 15, 75);
    doc.setFontSize(10);
    doc.text("Bank Mandiri", 15, 80);
    doc.text("Nomor Rekening: 8384748400504", 15, 85);
    doc.text("Atas Nama Yunus Mardana", 15, 90);


    autoTable(doc, {
        startY: 95,
        headStyles: {halign: "center", lineWidth: {bottom: 0.5, top: 0.5}, lineColor: [130, 130, 130], cellPadding: 5},
        bodyStyles: {lineWidth: {bottom: 0.5}, lineColor: [130, 130, 130], cellPadding: 5},
        columnStyles: {registrationFee: {halign: 'right'}},
        theme: "plain",
        body: [...participation.map((e: any) => ({
            teamName: e.expand.team.name,
            categoryName: e.expand.category.name,
            teamMember: e.expand.athletes.map((f: any) => "- " + f.name).join("\n"),
            registrationFee: formatToRupiah(e.expand.category.registrationFee)
        })), [{
            content: `Total: ${formatToRupiah(data.totalFee)}`, colSpan: 4,
            styles: {fontStyle: "bold", halign: "right", fontSize: 14}
        }]],
        columns: [
            {header: 'Nama Tim', dataKey: 'teamName'},
            {header: 'Kategori', dataKey: 'categoryName'},
            {header: 'Anggota Team', dataKey: 'teamMember'},
            {header: 'Biaya Pendaftaran', dataKey: 'registrationFee'},
        ]
    })

    return doc.output('bloburl')
}

export default generateInvoice