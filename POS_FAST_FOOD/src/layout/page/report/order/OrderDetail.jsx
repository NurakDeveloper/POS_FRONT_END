import '../report.css'
import { getOrderByID, listOrderLineByOrderID } from '../../../../api/Order'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
    const [invoiceNumber, setInvoiceNumber] = useState(0);
    const [orderType, setOrderType] = useState();
    const [customerId, setCustomerId] = useState();
    const [acceptedBy, setAcceptedBy] = useState();
    const [tableNumber, setTableNumber] = useState();
    const [status, setStatus] = useState();
    const [numberOfPeople, setNumberOfPeople] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [cash, setCash] = useState();
    const [exchange, setExchange] = useState();
    const [orderDate, setOrderDate] = useState("");
    const [description, setDescription] = useState("");
    const [orderLine, setOrderLine] = useState([]);

    // const [orderID, setOrderID] = useState();
    const { id } = useParams();
    useEffect(() => {
        listOrderLineByOrderID(id).then((response) => {
            setOrderLine(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    useEffect(() => {
        getOrderByID(id).then((reponse) => {
            setAcceptedBy(reponse.data.acceptedBy);
            setCash(reponse.data.cash);
            setCustomerId(reponse.data.customerId);
            setExchange(reponse.data.exchange);
            setInvoiceNumber(reponse.data.id);
            setDescription(reponse.data.description);
            setOrderDate(reponse.data.orderDate);
            setTotalAmount(reponse.data.totalAmount);
            setOrderType(reponse.data.orderType)
        }).catch(error => {
            console.error(error);
        })
    }, [])
    return (
        <>

            <div>
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-xl-9" style={{ height: '900px' }}>
                            <div className="border bg-white w-100 rounded">
                                <div className="form-heder w-100 px-4 pt-2" style={{ maxHeight: '130px' }}>
                                    <h1>IV#{invoiceNumber.toString().padStart(5, '0')}</h1>
                                </div>
                                <div className="d-flex">
                                    <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>OrderType ? </p>
                                            <p className='w-75 text-start text-secondary'>POS</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>Customer ? </p>
                                            <p className='w-75 text-start text-secondary'>{customerId}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>AcceptedBy</p>
                                            <p className='w-75 text-start text-secondary'>{acceptedBy}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>Description </p>
                                            <p className='w-75 text-start text-secondary'>{description}</p>
                                        </div>

                                    </div>
                                    <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>OrderDate ? </p>
                                            <p className='w-75 text-start text-secondary'>{orderDate}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>Total Amount ?</p>
                                            <p className='w-75 text-start text-secondary'>{formatCurrency.format(totalAmount)}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>Cash ? </p>
                                            <p className='w-75 text-start text-secondary'>{formatCurrency.format(cash)}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>Exchange ? </p>
                                            <p className='w-75 text-start text-secondary'>{formatCurrency.format(exchange)}</p>
                                        </div>

                                    </div>
                                </div>


                                <div className='bg-white py-3'>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="text-dark nav-link  border-bottom active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Order Item</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Note</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content border-0" id="myTabContent">
                                        <div class="border-0 tab-pane show active " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                            <div className="center w-100">
                                                <div className="card border-0 w-100">
                                                    <div className="card-body p-0 border">
                                                        <table className="table table-striped table-hover f-14">
                                                            <thead valign='middle'>
                                                                <tr>
                                                                    <td>
                                                                        <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                                                    </td>
                                                                    <td className='py-3'>No</td>
                                                                    <td>Product</td>
                                                                    <td>Qty</td>
                                                                    <td>Price</td>
                                                                    <td>Amount</td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {

                                                                    orderLine.map((u, i) =>
                                                                        <tr className="pointer" onClick={() => goto(`/order-detail/${u.id}`)}>
                                                                            <td>
                                                                                <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                                                            </td>
                                                                            <td className='py-3'>{i + 1}</td>
                                                                            <td>{u.productId.toString().padStart(5, '0')}</td>
                                                                            <td>{u.qty}</td>
                                                                            <td>{formatCurrency.format(u.price)}</td>
                                                                            <td>{formatCurrency.format(u.amount)}</td>



                                                                        </tr>
                                                                    )
                                                                }
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                            <p className="text-secondary">New Note</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{ height: '900px' }}>
                            <div className="card border-0 rounded bg-white h-100 w-100 p-2">
                                <div className='d-flex p-2 border rounded start pointer' style={{ height: '90px' }}>
                                    <div className="admin-img center" style={{ height: '90%' }}>
                                        <img src="https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_640.jpg" alt="" className='h-100' />
                                    </div>
                                    <div className="text f-14 px-3">
                                        <div className='f-16'>Dara Chhun</div>
                                        <div className='text-secondary'>Seller / pos</div>
                                        <div className='f-16 hover-line pointer'>mobile : +885990340943</div>
                                    </div>
                                </div>
                                <div className='d-flex p-2 border rounded start pointer mt-2' style={{ height: '90px' }}>
                                    <div className="admin-img center" style={{ height: '90%' }}>
                                        <img src="https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_640.jpg" alt="" className='h-100' />
                                    </div>
                                    <div className="text f-14 px-3">
                                        <div className='f-16'>General</div>
                                        <div className='text-secondary'>membership : no</div>
                                        <div className='f-16 hover-line pointer'>Contact : +885990340943</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}





export default OrderDetail
