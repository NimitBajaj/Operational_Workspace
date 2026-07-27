import PDFDocument from "pdfkit";

export class QuotationPdfService {

    generate(quotation: any, company: any) {

        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
        });

        this.drawHeader(doc, company);

        this.drawCustomerDetails(
            doc,
            quotation
        );

        this.drawQuotationDetails(
            doc,
            quotation
        );

        this.drawItems(
            doc,
            quotation
        );

        this.drawTotals(
            doc,
            quotation
        );

        this.drawFooter(
            doc,
            company
        );

        return doc;
    }

    private drawHeader(
    doc: PDFKit.PDFDocument,
    company: any
) {

    const pageWidth = doc.page.width;

    // Company Name
    doc
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(
            company.companyName,
            50,
            40,
            {
                align: "center"
            }
        );

    doc
        .font("Helvetica")
        .fontSize(10)
        .text(
            company.address,
            {
                align: "center"
            }
        );

    if (company.phone)
        doc.text(
            `Phone : ${company.phone}`,
            {
                align: "center"
            }
        );

    if (company.email)
        doc.text(
            company.email,
            {
                align: "center"
            }
        );

    doc.moveDown();

    doc
        .lineWidth(1)
        .moveTo(50, 135)
        .lineTo(pageWidth - 50, 135)
        .stroke();

    doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .text(
            "QUOTATION",
            50,
            145,
            {
                align: "center"
            }
        );

    doc.moveDown(3);
}

   private drawCustomerDetails(
    doc: PDFKit.PDFDocument,
    quotation: any
) {
    const startY = doc.y;

    const boxHeight = 120;
    const leftX = 40;
    const rightX = 315;
    const boxWidth = 240;

    // =========================
    // Customer Box
    // =========================

    doc
        .rect(leftX, startY, boxWidth, boxHeight)
        .stroke();

    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(
            "Customer Details",
            leftX + 10,
            startY + 10
        );

    doc
        .font("Helvetica")
        .fontSize(10);

    let y = startY + 35;

    doc.text(
        `Name : ${
            quotation.proposalRequest?.customerName ??
            quotation.project?.customer?.name ??
            "-"
        }`,
        leftX + 10,
        y
    );

    y += 18;

    doc.text(
        `Company : ${
            quotation.proposalRequest?.companyName ??
            "-"
        }`,
        leftX + 10,
        y
    );

    y += 18;

    doc.text(
        `Email : ${
            quotation.proposalRequest?.customerEmail ??
            "-"
        }`,
        leftX + 10,
        y
    );

    y += 18;

    doc.text(
        `Phone : ${
            quotation.proposalRequest?.customerPhone ??
            "-"
        }`,
        leftX + 10,
        y
    );

    // =========================
    // Quotation Box
    // =========================

    doc
        .rect(rightX, startY, boxWidth, boxHeight)
        .stroke();

    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(
            "Quotation Details",
            rightX + 10,
            startY + 10
        );

    doc
        .font("Helvetica")
        .fontSize(10);

    y = startY + 35;

    doc.text(
        `Quotation No : ${quotation.quotationNumber}`,
        rightX + 10,
        y
    );

    y += 18;

    doc.text(
        `Version : ${quotation.version}`,
        rightX + 10,
        y
    );

    y += 18;

    doc.text(
        `Date : ${new Date(
            quotation.createdAt
        ).toLocaleDateString("en-IN")}`,
        rightX + 10,
        y
    );

    y += 18;

    doc.text(
        `Valid Until : ${
            quotation.validUntil
                ? new Date(
                      quotation.validUntil
                  ).toLocaleDateString("en-IN")
                : "-"
        }`,
        rightX + 10,
        y
    );

    y += 18;

    doc.text(
        `Status : ${quotation.status}`,
        rightX + 10,
        y
    );

    // Move cursor below both boxes
    doc.y = startY + boxHeight + 20;
}

    private drawQuotationDetails(
    doc: PDFKit.PDFDocument,
    quotation: any
) {
    doc
        .fontSize(14)
        .text("Quotation Details", {
            underline: true,
        });

    doc.moveDown(0.5);

    doc.fontSize(11);

    doc.text(
        `Quotation No : ${quotation.quotationNumber}`
    );

    doc.text(
        `Version : ${quotation.version}`
    );

    doc.text(
        `Status : ${quotation.status}`
    );

    doc.text(
        `Created : ${new Date(
            quotation.createdAt
        ).toLocaleDateString()}`
    );

    if (quotation.validUntil) {
        doc.text(
            `Valid Until : ${new Date(
                quotation.validUntil
            ).toLocaleDateString()}`
        );
    }

    doc.moveDown();
}

   private drawItems(
    doc: PDFKit.PDFDocument,
    quotation: any
) {

    let y = doc.y;

    this.drawTableHeader(doc, y);

    y += 22;


    quotation.items.forEach(
        (item: any, index: number) => {

            y = this.checkPageBreak(
    doc,
    y,
    this.getRowHeight(doc, item)
);

            const rowHeight =
    this.drawTableRow(
        doc,
        y,
        index,
        item
    );

y += rowHeight;
        }
    );

    doc.y = y + 15;
}

   private drawTotals(
    doc: PDFKit.PDFDocument,
    quotation: any
) {
    const x = 340;
    const y = doc.y;

    doc.rect(x, y, 220, 110).stroke();

    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Summary", x + 10, y + 10);

    doc.font("Helvetica").fontSize(10);

    doc.text("Subtotal", x + 10, y + 35);

    doc.text(
        this.formatCurrency(quotation.subtotal),
        x + 120,
        y + 35,
        {
            width: 80,
            align: "right",
        }
    );

    doc.text("Discount", x + 10, y + 55);

    doc.text(
        this.formatCurrency(quotation.discount ?? 0),
        x + 120,
        y + 55,
        {
            width: 80,
            align: "right",
        }
    );

    doc.text("GST", x + 10, y + 75);

    doc.text(
        this.formatCurrency(quotation.gst ?? 0),
        x + 120,
        y + 75,
        {
            width: 80,
            align: "right",
        }
    );

    doc.font("Helvetica-Bold");

    doc.text("Grand Total", x + 10, y + 95);

    doc.text(
        this.formatCurrency(quotation.total),
        x + 120,
        y + 95,
        {
            width: 80,
            align: "right",
        }
    );

    // Move cursor below the summary box
    doc.y = y + 130;
}

   private drawFooter(
    doc: PDFKit.PDFDocument,
    company: any
) {
    doc.moveDown(2);

    doc
        .fontSize(14)
        .text("Terms & Conditions", {
            underline: true,
        });

    doc.moveDown(0.5);

    doc.fontSize(10);

    doc.text(
        company.termsAndConditions ??
        ""
    );

    doc.moveDown();

    doc.text(
        `Bank : ${company.bankName ?? "-"}`
    );

    doc.text(
        `A/C : ${company.accountNumber ?? "-"}`
    );

    doc.text(
        `IFSC : ${company.ifscCode ?? "-"}`
    );

    doc.moveDown(2);

    doc.text(
        "Authorised Signatory",
        {
            align: "right",
        }
    );
}

private drawTableHeader(
    doc: PDFKit.PDFDocument,
    y: number
) {
    doc
        .font("Helvetica-Bold")
        .fontSize(10);

    doc.rect(40, y, 520, 22)
        .fillAndStroke("#EAEAEA", "#000000");

    doc.fillColor("black");

    doc.text("No", 45, y + 6);

    doc.text("Image", 70, y + 6);

    doc.text("Product", 130, y + 6);

    doc.text("Qty", 330, y + 6, {
        width: 30,
        align: "center",
    });

    doc.text("Rate", 360, y + 6, {
        width: 60,
        align: "right",
    });

    doc.text("GST", 430, y + 6, {
        width: 50,
        align: "right",
    });

    doc.text("Total", 490, y + 6, {
        width: 60,
        align: "right",
    });
}


private drawTableRow(
    doc: PDFKit.PDFDocument,
    y: number,
    index: number,
    item: any
) {

    const image = 
        item.productVariant
            ?.product
            ?.images?.[0];
    if (image?.url) {
    try {

        doc.image(
            image.url,
            70,
            y + 2,
            {
                width:40,
                height:40,
                fit:[40,40]
            }
        );

    } catch {

    }
}
    const rowHeight =
    this.getRowHeight(doc, item);

    if(index % 2 === 0) {
        doc 
            .rect(40, y, 520, rowHeight)
            .fillAndStroke("#F8F8F8", "#DDDDDD");
    } else {
        doc 
            .rect(40, y, 520, rowHeight)
            .fillAndStroke("#FFFFFF", "#DDDDDD");
    }

    doc.fillColor("black");

doc.rect(
    40,
    y,
    520,
    rowHeight
).stroke();

    doc
        .font("Helvetica")
        .fontSize(10);

    doc.text(
        String(index + 1),
        45,
        y + 5
    );

    doc.text(
        item.displayName,
        120,
        y + 5,
        {
            width: 220,
        }
    );

    doc.text(
        String(item.quantity),
        315,
        y + 5,
        {
            width: 30,
            align: "center",
        }
    );

    doc.text(
        `₹${this.formatCurrency(item.unitPrice)}`,
        355,
        y + 5,
        {
            width: 60,
            align: "right",
        }
    );

    doc.text(
        `₹${item.gst}`,
        425,
        y + 5,
        {
            width: 50,
            align: "right",
        }
    );

    doc.text(
        `₹${item.lineTotal}`,
        485,
        y + 5,
        {
            width: 65,
            align: "right",
        }
    );

    return rowHeight;
}

private getRowHeight(
    doc: PDFKit.PDFDocument,
    item: any
) {
    const textHeight = doc.heightOfString(
        item.displayName,
        {
            width: 220,
        }
    );

    return Math.max(50, textHeight + 10);
}

private checkPageBreak(
    doc: PDFKit.PDFDocument,
    currentY: number,
    rowHeight: number
) {

    if (
        currentY + rowHeight >
        doc.page.height - 80
    ) {

        doc.addPage();

        this.drawTableHeader(
    doc,
    40
);

return 62;
    }

    return currentY;
}

private drawInfoBox(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string
) {
    doc
        .rect(x, y, width, height)
        .stroke();

    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(title, x + 10, y + 8);

    return y + 30;
}

private formatCurrency(value: any) {
    return Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
}