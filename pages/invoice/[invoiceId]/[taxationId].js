import React from "react";
import Image from 'next/image';
import InvoiceImage from "../../../assets/Images/invoicesvg.svg";

const Invoice = (props) => {
    const invoice = props.invoice;
    const invoiceData = props.invoice_data


    const downloadDetails = () => {
        let printContents, popupWin;
        printContents = invoice;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write(`
            <html>
                <head>
                <title>Print tab</title>
                <style>
                //........Customized style.......
                </style>
                </head>
            <body onload="window.print();window.close()">${printContents}</body>
            </html>`);
        popupWin.document.close();
    };


    return (
        <>
            
            {invoiceData && invoiceData.length > 0 && <div className="booking__successful__wrapper">
                <div className="booking__successful__padding">
                    <div className="header__wrapper">
                        <div className="transaction__id">Txn ID - {invoiceData[0].booking_id}</div>
                        <div className="amount">Amount : <i className="fa fa-inr" /> {invoiceData[0].total_amount}</div>
                    </div>
                </div>

                <div className="align__center__div">
                    <div className="logo__wrapper">
                        <img src={process.env.NEXT_PUBLIC_HOST_BE_IMAGE + invoiceData[0].image_name.replace(' ', '+')} alt="Hotel Logo" />
                    </div>
                </div>

                <div className="align__center__div booking__successful__padding">
                    <div className="booking__successful">
                        <div className="success__circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-check" viewBox="0 0 16 16">
                                <path
                                    d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                        </div>
                        <div className="success__text">Booking successful</div>
                    </div>

                    <div className="thank__you__text">Thank you for choosing {invoiceData[0].hotel_name}.</div>

                    <div className="button__wrapper">
                        <div className="btn__print__pdf" onClick={() => downloadDetails()}>Print PDF</div>
                        {/* <div className="btn__booking__engine" onClick={() => { window.location.assign(beUrl) }}>Go to Booking Engine</div> */}
                        <div className="btn__go__home" onClick={() => { window.location.assign(invoiceData[0].romt_home_url) }}>Go to Home</div>
                    </div>

                    <div className="bottom__image__placeholder">
                        <Image src={InvoiceImage} alt="Hotel reception image" />
                    </div>
                </div>
            </div>}
        </>
    );
};


export async function getServerSideProps(context) {

	let url_param = context.params;

    const res_invoice = await fetch(
		process.env.NEXT_PUBLIC_HOST_BE +'/bookingEngine/invoice-details/' +url_param.invoiceId
	);

    const res_invoice_data = await fetch(
		process.env.NEXT_PUBLIC_HOST_BE + '/bookingEngine/invoice-data/' + url_param.invoiceId
	);


	const response_invoice = await res_invoice.json();
	const response_invoice_data = await res_invoice_data.json();


	return { props: { invoice:response_invoice.data.replace(/\*/g,' '),invoice_data: response_invoice_data.data} };
}

//Export the component
export default Invoice;
