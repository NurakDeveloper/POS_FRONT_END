import { useEffect, useState } from 'react';
import './postest.css'
import PrinInvoice from './PrintIvoice';
import Cookies from 'js-cookie';
import { decryptData } from '../../../cryptoJs/Crypto';
import { encryptData } from '../../../cryptoJs/Crypto';
import { createOrder } from '../../../api/Order';
import { createOrderLine } from '../../../api/Order';
import { getAllProduct } from '../../../api/Product';
import { format } from 'date-fns';
import { createJournal, createTransaction } from '../../../api/JournalE';
const PosLight = () => {

    const [product, setProduct] = useState([]);
    useEffect(() => {
        getAllProduct().then((respnse) => {
            setProduct(respnse.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addToCart(id, qty, price, image) {
        try {
            // Try to parse existing cookie or create an empty array if it doesn't exist
            const defaultObj = JSON.parse(Cookies.get("order") || '[]');
            const item = defaultObj.find(i => i.id === id);

            if (item) {
                // Increment quantity and update amount if item already exists
                item.qty += qty;
                item.amounts = item.qty * price;
            } else {
                // Create a new item to add
                const obj = { id, qty, price, amounts: price * qty, image };
                defaultObj.push(obj);
            }

            // Set the updated array back to the cookie
            Cookies.set("order", JSON.stringify(defaultObj));
            console.log(defaultObj);

            // Refresh item if function is defined
            refrestItem();

        } catch (error) {
            // If there was an error, initialize with a new array containing the new item
            const obj = { id, qty, price, amounts: price * qty, image };
            Cookies.set("order", JSON.stringify([obj]));
            console.log(obj);

            // Refresh item if function is defined
            if (typeof refreshItem === 'function') {
                refreshItem();
            }
        }
    }
    function order() {
        try {
            const item = JSON.parse(Cookies.get("order") || '[]');
            const totalAmount = totalPay;
            const orderObject = {
                "orderType": 2,
                "customerId": null,
                "acceptedBy": 1,
                "tableNumber": null,
                "status": 1,
                "numberOfPeople": 4,
                "totalAmount": totalPay,
                "cash": input,
                "exchange": input - totalAmount,
                "orderDate": new Date(),
                "description": "Anniversary dinner with special seating request."
            }
            createOrder(orderObject).then((response) => {
                console.log(response.data);
                for (let i = 0; i < item.length; i++) {
                    const orderLineObject = {
                        "orderId": response.data.id,
                        "productId": item[i].id,
                        "price": item[i].price,
                        "qty": item[i].qty,
                        "amount": item[i].amounts
                    }
                    createOrderLine(orderLineObject).then((respones) => {
                        console.log(respones.data);
                    })
                }
                const objJournal = {
                    "journalId": null,
                    "branchId": 1,
                    "partnerId": null,
                    "date": new Date(),
                    "total": totalPay,
                    "reference": "POS SALE INV-00" + response.data.id,
                    "status": "1"
                }
                createJournal(objJournal).then((reponseJ) => {
                    console.log(reponseJ.data);
                    const objTransaction = {
                        "journalEntriesId": reponseJ.data.id,
                        "accountId": 21,
                        "label": "POS Sale Revenues",
                        "debit": totalPay,
                        "credit": null,
                    }

                    createTransaction(objTransaction).then((responseT) => {
                        console.log(responseT.data);
                    }).catch(error => {
                        console.error(error);
                    })
                    const objTransaction2 = {
                        "journalEntriesId": reponseJ.data.id,
                        "accountId": 12,
                        "label": "POS Sale Revenues",
                        "debit": null,
                        "credit": totalPay
                    }
                    createTransaction(objTransaction2).then((responseT) => {
                        console.log(responseT.data);
                    }).catch(error => {
                        console.error(error);
                    })
                }).catch(error => {
                    console.error(error);
                })
                refrestItem();
            }).catch(error => {
                console.error(error);
            })

        } catch (error) {

        }
    }

    function totalPayment() {
        try {
            const item = JSON.parse(Cookies.get("order") || '[]');
            setItemOrder(item);

            let total = 0;
            for (let i = 0; i < item.length; i++) {
                total += item[i].price * item[i].qty; // Calculate item total
            }
            setTotalPay(total);
            console.log(total); // Print the total payment

        } catch (error) {
            console.error("Error calculating total payment:", error);
        }
    }

    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const [itemOrder, setItemOrder] = useState([])
    function refrestItem() {
        try {
            const item = JSON.parse(Cookies.get("order") || '[]');
            if (item) {
                setItemOrder(item);
                totalPayment();
            }


        } catch (error) {
            setItemOrder([]);
            totalPayment();
            setInput('');
        }
    }
    useEffect(() => {
        refrestItem();
    }, [])
    const [totalPay, setTotalPay] = useState(0);

    function updateQty(btn, id) {
        if (btn == 1) {
            try {
                const item = JSON.parse(Cookies.get("order") || '[]');
                const findItem = item.find(i => i.id == id);
                findItem.qty += 1;
                findItem.amounts = findItem.qty * findItem.price;
                Cookies.set("order", JSON.stringify(item));
                refrestItem();

            } catch (error) {
                refrestItem();
            }
        } else {
            try {
                const item = JSON.parse(Cookies.get("order") || '[]');
                const findItem = item.find(i => i.id == id);
                if (findItem.qty == 1) {
                    const newItem = item.filter(i => i.id != id);
                    Cookies.set("order", JSON.stringify(newItem));
                } else {
                    findItem.qty -= 1;
                    findItem.amounts = findItem.qty * findItem.price;
                    Cookies.set("order", JSON.stringify(item));

                }
                refrestItem();


            } catch (error) {
                refrestItem();
            }
        }
    }

    function listTable() {
        return (
            <div className="card border-0 bg-none">
                <div className="card-body p-0 border-0 bg-none ps-2">
                    <table className="text-dark w-100" style={{ fontSize: '16px' }}>
                        <thead valign='middle '>
                            <tr className='border-secondary border-bottom'>

                                <td className='py-3'>No</td>
                                <td>Item</td>
                                <td>Price</td>
                                <td>Qty</td>
                                <td>Amount</td>
                                <td>Action</td>



                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemOrder.map((f, i) =>
                                    <tr className="pointer" onClick={() => goto(`/item-detail`)}>

                                        <td className='py-3'>{i + 1}</td>
                                        <td>example item product</td>
                                        <td>{formatCurrency.format(f.price)}</td>
                                        <td>{f.qty}</td>
                                        <td>{formatCurrency.format(f.amounts)}</td>
                                        <td>
                                            <div className='font-12'>
                                                <span className='font-12  small-i box-shadow' onClick={() => updateQty(2, f.id)}>-</span>
                                                <span className='bg-none small-i mx-1 text-dark'>{f.qty}</span>
                                                <span className=' font-12 small-i box-shadow' onClick={() => updateQty(1, f.id)}>+</span>

                                            </div>
                                        </td>



                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }

    function btnActionUserView() {
        return (
            <>
                <div className="pos-header">
                    <div className='d-flex'>
                        <div className="d-flex w-50">
                            <div className='w-25 pe-3'>
                                <button className="btn btn-danger box-shadow h-100 w-100"
                                    onClick={() => {
                                        Cookies.remove("user-data");
                                        location.reload();
                                    }}>Exit</button>
                            </div>
                            <div className="w-75 ">
                                <input type="text" name="" className='border rounded h-100 w-100 px-3' id="" placeholder='search product' />
                            </div>
                        </div>
                        <div className="d-flex w-50">
                            <div className='w-auto d-flex'>
                                <div className='px-3'>
                                    <button className="btn-silver h-100 px-3">Search</button>
                                </div>
                                <div className=''>
                                    <button className="btn-silver h-100 px-3">Notifiacation</button>
                                </div>
                            </div>
                            <div className="w-75 px-4">
                                <div className="d-flex w-100">
                                    <div className="user-pos center border-start ps-1" style={{ width: '25%', height: '50px', overflow: 'hidden' }}>
                                        <img src="https://photosbulk.com/wp-content/uploads/aesthetic-instagram-profile-picture-for-boys_7.webp" alt="" className="h-100 rounded" />
                                    </div>
                                    <div className="w-50">
                                        <div className='f-16'>Nurak Oerun</div>
                                        <div className='f-10 text-seondary'>User/Administrator</div>
                                    </div>
                                    <div className="w-25">
                                        <button className='btn-silver h-100 w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Setting</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )

    }
    function btnActionAdminView() {
        return (
            <>
                <div className="pos-header">
                    <div className='d-flex'>
                        <div className="d-flex w-50">
                            <div className='w-25 pe-3'>
                                <button className="btn btn-danger box-shadow h-100 w-100"
                                    onClick={() => {
                                        Cookies.set("admin_viewer", 1);
                                        location.reload();
                                    }}>Exit</button>
                            </div>
                            <div className="w-75 ">
                                <input type="text" name="" className='border rounded h-100 w-100 px-3' id="" placeholder='search product' />
                            </div>
                        </div>
                        <div className="d-flex w-50">
                            <div className='w-auto d-flex'>
                                <div className='px-3'>
                                    <button className="btn-silver h-100 px-3">Search</button>
                                </div>
                                <div className=''>
                                    <button className="btn-silver h-100 px-3">Notifiacation</button>
                                </div>
                            </div>
                            <div className="w-75 px-4">
                                <div className="d-flex w-100">
                                    <div className="user-pos center border-start ps-1" style={{ width: '25%', height: '50px', overflow: 'hidden' }}>
                                        <img src="https://photosbulk.com/wp-content/uploads/aesthetic-instagram-profile-picture-for-boys_7.webp" alt="" className="h-100 rounded" />
                                    </div>
                                    <div className="w-50">
                                        <div className='f-16'>Nurak Oerun</div>
                                        <div className='f-10 text-seondary'>User/Administrator</div>
                                    </div>
                                    <div className="w-25">
                                        <button className='btn-silver h-100 w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Setting</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )

    }
    const secretkey = "kans983(*93849Jnjsbd@*^@knskldn&^@($*LLjbHHSDuBKJ_)93849uIHUSHD&#%#&^$(@80928()*&*#$&(*"
    function headerViewer() {
        try {
            const dataEncrypt = Cookies.get("user-data");
            if (dataEncrypt) {
                const userData = decryptData(dataEncrypt, secretkey);
                if (userData.role == "USER") {
                    return (
                        <>
                            {btnActionUserView()}
                        </>
                    )
                } else if (userData.role == "ADMIN") {
                    return (
                        <>
                            {btnActionAdminView()}
                        </>
                    )

                } else {
                    return (
                        <>
                            {btnActionUserView()}

                        </>
                    )
                }
            } else {
                return (
                    <>
                        {btnActionUserView()}
                    </>
                )
            }
        } catch (error) {
            return (
                <>
                    {btnActionUserView()}
                </>
            )
        }
    }
    const [input, setInput] = useState('');

    const handleClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const clearInput = () => {
        setInput('');
    };

    const handleBackspace = () => {
        setInput((prevInput) => prevInput.slice(0, -1));
    };
    function calculator() {
        return (
            <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', marginTop: '10px' }}>
                    <button className='btn-silver py-4' onClick={() => handleClick('1')}>1</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('2')}>2</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('3')}>3</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('4')}>4</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('5')}>5</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('6')}>6</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('7')}>7</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('8')}>8</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('9')}>9</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('0')}>0</button>
                    <button className='btn-silver py-4' onClick={() => handleClick('.')}>.</button>
                    <button className='btn-silver py-4' onClick={handleBackspace}>&larr;</button>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="d-flex pos">

                <div className="pos-info w-100">
                    <div className='p-0 ps-0'>
                        <div className="ps-3 pe-3  py-2 my-2">
                            {headerViewer()}
                        </div>
                        <div className="pos-cateogry mt-3 d-flex ps-3 pe-3">
                            <button className='btn-category d-block me-3'>
                                <img src="https://demo.foodscan.xyz/images/default/all-category.png" alt="" className='img-btn' />
                                <div className='font-12 fw-bold mt-2'>All Category</div>
                            </button>
                            <button className='btn-category d-block me-3'>
                                <img src="https://demo.foodscan.xyz/storage/27/conversions/appetizers-thumb.png" alt="" className='img-btn' />
                                <div className='font-12 fw-bold mt-2'>All Category</div>
                            </button>
                            <button className='btn-category d-block me-3'>
                                <img src="https://demo.foodscan.xyz/storage/30/conversions/sandwich_from_the_grill-thumb.png" alt="" className='img-btn' />
                                <div className='font-12 fw-bold mt-2'>All Category</div>
                            </button>
                        </div>
                        <div className="pos-product mt-3 p-0 center">
                            <div className="row p-0 w-100">
                                {
                                    product.map((i, index) =>
                                        <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6" key={i.id}>
                                            <div className='p-2 pe-3'>
                                                <div className="card border-1 rounded card-product-light mb-3" style={{ height: '100%', overflow: 'hidden' }} onClick={() => { addToCart(i.id, 1, i.price, i.image, index) }}>
                                                    <div className="card-body p-1">
                                                        <div className="center box-shadow" style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                                                            <img src={`src/assets/image/${i.image}`} alt='img' className="h-100" />
                                                        </div>
                                                        <div className="card-header bg-none border-0 rounded px-2 pe-1" style={{ width: '100%', height: '90px', overflow: 'hidden' }}>
                                                            <div className="f-20 text-dark hover-line text-title">{i.productName}</div>
                                                            {/* <hr /> */}
                                                            <div className="between">
                                                                <textarea name="" className='border-0 w-100 f-14 text-secondary' readOnly id="" value={i.description}></textarea>
                                                            </div>




                                                        </div>
                                                    </div>
                                                    <div className="card-footer p-0" style={{ height: '70px' }}>
                                                        <div className='center w-100 btn-orange h-100'>
                                                            <button className='btn text-light center rounded-pill'><i class="fa-solid fa-basket-shopping px-2"></i><span className='fs-5'>{formatCurrency.format(i.price)}</span></button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className='pos-view-order p-2 ps-0 bg-none  d-none d-xl-block'>
                    <div className="border-0 order bg-white rounded box-shadow h-100 rounded p-2" style={{ overflow: 'scroll' }}>

                        {
                            itemOrder.map((i, index) =>
                                <>
                                    <div className="w-100 border-2 border-bottom border-secondary " style={{ height: '110px' }}>
                                        <div className="d-flex px-1 border-0">
                                            <div className='rounded img-pos-order center p-2 pb-2 '>
                                                <img src={`src/assets/image/${i.image}`} alt="" className="h-100 rounded w-100" />
                                            </div>
                                            <div className='d-block ps-2'>
                                                <div className='d-flex' style={{ height: '50px' }}>
                                                    <span className='text-dark font-12 pe-3'>Smoke Tenderlion Smoke Tenderlion Smoke</span>
                                                    <i class="fa-solid fa-trash text-secondary pointer"></i>
                                                </div>
                                                <div className='fs-6 d-flex start' style={{ height: '50px' }}>
                                                    <div className='start w-50'>
                                                        <span className='text-dark fs-5'>{formatCurrency.format(i.price)}</span>
                                                        <span className='text-product font-12 ps-2'> / unit</span>
                                                    </div>
                                                    <div className='font-12 text-danger end w-50'>
                                                        <span className='font-12  small-i box-shadow' onClick={() => updateQty(2, i.id)}>-</span>
                                                        <span className='bg-none small-i mx-1 text-dark'>{i.qty}</span>
                                                        <span className='font-12 small-i box-shadow' onClick={() => updateQty(1, i.id)}>+</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }




                        <div className="d-block bg-white px-3 order border border-secondary py-3 rounded mt-1">
                            <div className="between text-dark  fs-5">
                                <div className='w-100 start fs-6'>Total Payment :</div>
                                <div className='text-ligth'>{formatCurrency.format(totalPay)}</div>
                            </div>
                        </div>
                        <div className='mt-3 d-flex'>
                            <button className="btn bg-red text-white rounded py-3 box-shadow w-25 me-1">Clear</button>
                            <button className="btn bg-green text-white rounded py-3 box-shadow w-75" data-bs-toggle="modal" data-bs-target="#processOrder"
                            // onClick={() => {
                            //     Cookies.remove("order")
                            //     orderItem();
                            // }
                            // }
                            >Payment</button>
                        </div>

                    </div>
                </div>
            </div>
            {/* {shopingCard()} */}
            <div class="modal fade " id="printer" tabindex="-1" aria-labelledby="printer" aria-hidden="true">
                <div class="modal-dialog bg-none">
                    <div class="modal-content bg-none">

                        <div class="modal-body bg-none">
                            <PrinInvoice />
                        </div>

                    </div>
                </div>
            </div>





            <div class="modal slideInLeft " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen bg-none">
                    <div class="modal-content bg-blur-light">
                        <div class="modal-header between border-secondary">
                            <h1 class="modal-title fs-5 start text-des w-75" id="exampleModalLabel">Setting</h1>
                            <button type="button" class="text-des btn " data-bs-dismiss="modal" aria-label="Close">
                                <i class="fa-solid fa-xmark text-des fs-3"></i>
                            </button>
                        </div>
                        <div class="modal-body d-flex justify-content-center mt-5">
                            <div className="d-block text-light">
                                <form action="" className='' style={{ width: '500px', maxWidth: '700px' }}>
                                    <div className='fs-4 border-secondary input-box w-100 pointer' onClick={() => {
                                        Cookies.set("mode", 1);
                                        location.reload();
                                    }}>
                                        <input type="radio" name="mode" className='pointer' id="dark" value="light" style={{ width: '20px', height: '20px' }} />
                                        <label htmlFor="dark" className='px-3  text-dark   w-75 pointer'>Dark Mode</label>
                                    </div>
                                    <div className='fs-4 border-secondary input-box w-100 mt-2 pointer'
                                        onClick={() => {
                                            Cookies.set("mode", 2);
                                            location.reload();
                                        }}>
                                        <input type="radio" className='pointer' name="mode" id="light" value="light" style={{ width: '20px', height: '20px' }} />
                                        <label htmlFor="light" className='px-3 w-75 text-dark pointer'>Light Mode</label>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="modal slideInRight " id="processOrder" tabindex="-1" aria-labelledby="processOrderModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen bg-none">
                    <div class="modal-content bg-blur-light">

                        <div class="modal-body d-flex justify-content-center p-0">
                            <div className="d-block text-light w-75">
                                {listTable()}
                            </div>
                            <div className="w-25">
                                <div className='p-2 ps-0 bg-none  d-none d-xl-block'>
                                    <div className="bg-none border border-secondary rounded h-100 rounded p-2" style={{ overflow: 'scroll' }}>
                                        <div className="d-block px-3 border border-secondary py-3 rounded mt-1">

                                            <div className="between text-dark fs-5">
                                                <div className='w-100 start fs-6'>Customer :</div>
                                                <div className='text-dark'>
                                                    <input type="comobox" className='bg-none border-secondary border-0 border-bottom text-dark text-end' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block px-3 border border-secondary py-3 rounded mt-1">

                                            <div className="between text-dark fs-5">
                                                <div className='w-100 start fs-6'>Discount :</div>
                                                <div className='text-dark'>
                                                    <input type="comobox" className='bg-none border-secondary border-0 border-bottom text-dark text-end' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block px-3 border border-secondary py-3 rounded mt-1">

                                            <div className="between text-dark fs-5">
                                                <div className='w-100 start fs-6'>Cash :</div>
                                                <div className='text-dark'>
                                                    <input type="" className='bg-none border-secondary border-0 border-bottom text-dark text-end' value={input} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block px-3 border border-secondary py-3 rounded mt-1">

                                            <div className="between text-dark fs-5">
                                                <div className='w-100 start fs-6'>Exchange :</div>
                                                <div className='text-ligth'>
                                                    <input type="" className='bg-none border-secondary border-0 border-bottom text-dark text-end' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block px-3 border border-secondary py-3 rounded mt-1">

                                            <div className="between text-dark fs-5">
                                                <div className='w-100 start fs-6'>Total Payment :</div>
                                                <div className='text-ligth'>{formatCurrency.format(totalPay)}</div>
                                            </div>
                                        </div>
                                        {calculator()}
                                        <div className='mt-3 d-flex'>
                                            <button className="btn bg-red text-white rounded py-3 box-shadow w-25 me-1" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                            <button className="btn bg-green text-white rounded py-3 box-shadow w-75"
                                                onClick={() => {
                                                    order();
                                                    Cookies.remove("order")
                                                }
                                                }
                                            >Order</button>
                                        </div>

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

export default PosLight
