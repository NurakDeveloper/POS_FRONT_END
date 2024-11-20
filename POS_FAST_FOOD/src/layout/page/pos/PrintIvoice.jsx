import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = ({ data }) => {
    return (
        <div
            className="invoice rounded"
            id="invoice"
            style={{
                background: 'white',
                width: '85mm',
                height: '100%',
                padding: '10mm',
                fontFamily: 'Arial, sans-serif',
                border: '1px solid #eee',
                fontSize: '7px'
            }}
        >
            <header className='between'>
                <div className='fs-1'>
                    <div className="center p-2" style={{ height: '50px' }}>
                        <img src="https://cdn-icons-png.freepik.com/512/11801/11801058.png" alt="" className='h-100' />
                    </div>
                </div>

                <div className='text-end w-100'>
                    <div>Invoice No: <strong>000001</strong></div>
                    <div>Date: <strong>{data.date}</strong></div>
                </div>
            </header>

            <div style={{ margin: '0px 0', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <p><span className='text-secondary'>Staff :</span> Dara Chhun</p>
                    <p>Address : Prey Chhor , kam pong cham ,cambodia</p>
                    <p>nurak001@pos.com</p>
                </div>
                <div>

                    <p>email : nurak@pos.com</p>
                    <p>phone : 0889058825</p>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px', fontSize: '7px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #000' }}>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
                        <th style={{ textAlign: 'right', padding: '8px' }}>Quantity</th>
                        <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
                        <th style={{ textAlign: 'right', padding: '8px' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index} className='border-bottom'>
                            <td style={{ padding: '8px' }}>{item.name}</td>
                            <td style={{ textAlign: 'right', padding: '8px' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'right', padding: '8px' }}>${item.price}</td>
                            <td style={{ textAlign: 'right', padding: '8px' }}>${item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <div className='fw-bold'>Total: ${data.totalAmount}</div>
                <div className='fw-bold'>Discount : $ 10.00</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div>
                    <p><strong>Payment method:</strong> {data.paymentMethod}</p>
                </div>
                <div>
                    <p><strong>Note:</strong> {data.note}</p>
                </div>
            </div>
        </div>
    );
};

const PrinInvoice = () => {
    const invoiceRef = useRef();

    const invoiceData = {
        customerName: 'Studio Shodwe',
        customerAddress: '123 Anywhere St., Any City',
        customerEmail: 'hello@reallygreatsite.com',
        businessName: 'Olivia Wilson',
        businessAddress: '123 Anywhere St., Any City',
        businessEmail: 'hello@reallygreatsite.com',
        date: '02 June, 2030',
        items: [
            { name: 'Logo', quantity: 1, price: 500 },
            { name: 'Banner (2x6m)', quantity: 2, price: 45 },
            { name: 'Poster (1x2m)', quantity: 3, price: 55 },
        ],
        totalAmount: 755,
        paymentMethod: 'Cash',
        note: 'Thank you for choosing us!',
    };

    const generatePdf = () => {
        const invoiceElement = invoiceRef.current;

        html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 85; // Width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate proportional height

            const pdf = new jsPDF('p', 'mm', [85, imgHeight]); // Dynamic height based on content

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('invoice.pdf'); // Automatically save the file as 'invoice.pdf'
        });
    };

    return (
        <div>

            <button className='btn bg-green box-shadow border-0 text-white my-2' onClick={generatePdf}>Download Invoice PDF</button>          <div ref={invoiceRef}>
                <Invoice data={invoiceData} />
            </div>

        </div>
    );
};

export default PrinInvoice;
