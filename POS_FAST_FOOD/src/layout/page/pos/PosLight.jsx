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
import { getAllCategory } from '../../../api/Category';
import { getAllCustomer } from '../../../api/Customer';
import { el } from 'date-fns/locale';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ComboBox from '../../../components/select/ComboBox';
import OptionButton from '../../../components/option/OptionButton';
import Modal from '../../../components/modal/Modal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getBranchId } from '../../../api/Branch';
import { Cookie } from '@mui/icons-material';
import { hostName } from '../../../api/host';
import { getDefualtUserId } from '../../../api/AppConfig';
import { MdFastfood } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { LiaSearchSolid } from 'react-icons/lia';
import { IoIosAdd } from 'react-icons/io';
import { LuMinus } from 'react-icons/lu';
import { BsPlus } from 'react-icons/bs';
import { CiShoppingCart } from 'react-icons/ci';
import { HiShoppingCart } from 'react-icons/hi2';
import Text from '../.././../components/text/Text'
import ProductCard from '../../../components/card/ProductCard';


const PosLight = () => {
    const { id } = useParams();
    const navigate = useNavigate('');
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [categoryId, setCategoryId] = useState();
    const [customer, setCustomer] = useState([]);
    const [customerName, setCustomerName] = useState('choose customer');
    const [bgChange, setBgChange] = useState('white');
    const [colorChange, setColorChange] = useState('dark')
    const domainName = hostName();
    const imageUrl = `http://${domainName}:8085/api/images/`

    useEffect(() => {
        getAllProduct().then((respnse) => {
            setProduct(respnse.data);
            console.log(respnse.data);
        }).catch(error => {
            console.error(error);
        })
        getAllCustomer().then((respnse) => {
            setCustomer(respnse.data);
            console.log(respnse.data);
        }).catch(error => {
            console.error(error);
        })

    }, [id])
    useEffect(() => {
        getAllCategory().then((respones) => {
            setCategories(respones.data);
        }).catch(error => {
            console.error(error);
        })
    }, [id])
    function findProductName(id) {
        const p = product.find(p => p.id == id);
        if (p) {
            return p.productName
        } else {
            return "Error"
        }
    }
    function setCId(id) {
        setCategoryId(id);
    }
    function addToCart(productId, qty, price, image) {
        if (id) {
            if (!id) {
                console.error("Table ID is required.");
                return;
            }

            try {
                // Parse existing `table-order` cookie, defaulting to an empty array
                const tableOrders = JSON.parse(Cookies.get("table-order") || '[]');

                // Ensure `tableOrders` is an array
                if (!Array.isArray(tableOrders)) {
                    console.error("Invalid table-order format, resetting to default array.");
                    throw new Error("Invalid table-order format.");
                }

                // Find the table order by `id`
                const tableOrderIndex = tableOrders.findIndex(order => order.id === id);

                if (tableOrderIndex !== -1) {
                    // Access the `data` array for the specific table order
                    const orderData = [...(tableOrders[tableOrderIndex].data || [])];

                    // Check if the item exists in `data`
                    const itemIndex = orderData.findIndex(item => item.productId === productId);

                    if (itemIndex !== -1) {
                        // Increment quantity and update amount if the item exists
                        orderData[itemIndex].qty += qty;
                        orderData[itemIndex].amounts = orderData[itemIndex].qty * price;
                    } else {
                        // Add a new item to the `data` array if it doesn't exist
                        orderData.push({
                            productId,
                            qty,
                            price,
                            amounts: price * qty,
                            image,
                        });
                    }

                    // Update the `data` field in the table order
                    tableOrders[tableOrderIndex] = { ...tableOrders[tableOrderIndex], data: orderData };
                } else {
                    // If table order doesn't exist, create a new one
                    tableOrders.push({
                        id,
                        date: new Date().toISOString(),
                        data: [
                            {
                                productId,
                                qty,
                                price,
                                amounts: price * qty,
                                image,
                            },
                        ],
                    });
                }

                // Save the updated `tableOrders` back to the cookie
                Cookies.set("table-order", JSON.stringify(tableOrders));

                // Refresh the items in the view
                refrestItem();
            } catch (error) {
                console.error("Error updating table order data:", error);
            }

        } else {
            try {

                // Try to parse existing cookie or create an empty array if it doesn't exist
                const defaultObj = JSON.parse(Cookies.get("order") || '[]');
                const item = defaultObj.find(i => i.productId == productId);

                // the same item
                if (item) {
                    // Increment quantity and update amount if item already exists
                    item.qty += qty;
                    item.amounts = item.qty * price;
                } else {
                    // Create a new item to add
                    const obj = { productId, qty, price, amounts: price * qty, image };
                    defaultObj.push(obj);
                    console.log(obj);
                }

                // Set the updated array back to the cookie
                Cookies.set("order", JSON.stringify(defaultObj));
                // Refresh item if function is defined
                refrestItem();

            } catch (error) {
                // If there was an error, initialize with a new array containing the new item
                const obj = { productId, qty, price, amounts: price * qty, image };

                Cookies.set("order", JSON.stringify([obj]));
                console.log(obj);
                // Refresh item if function is defined

            }
        }
        totalPayment();

    }
    function order() {
        const branchId = getBranchId();
        const user = getDefualtUserId();
        if (branchId == 0 || user == 0) {
            alert('User Denided Login Again')
            Cookies.remove("user-data");
            window.location.reload();
            return 0;
        }

        if (id) {
            try {
                const orderTables = JSON.parse(Cookies.get("table-order") || '[]'); // Default to empty array
                console.log(orderTables);

                // Check if `orderTables` is an array
                if (Array.isArray(orderTables)) {
                    const objOrderTable = orderTables.find(o => o.id == id);
                    const item = objOrderTable.data;
                    const totalAmount = totalPay;
                    if (input >= totalPay) {
                        // const orderObject = {
                        //     "orderType": 2,
                        //     "customerId": null,
                        //     "acceptedBy": 1,
                        //     "tableNumber": null,
                        //     "status": 1,
                        //     "numberOfPeople": 4,
                        //     "totalAmount": totalPay,
                        //     "cash": input,
                        //     "exchange": input - totalAmount,
                        //     "orderDate": new Date(),
                        //     "description": "Anniversary dinner with special seating request."
                        // }
                        const objOrder = {
                            "orderType": 1,
                            "customerId": 1,
                            "acceptedBy": 1,
                            "tableNumber": 5,
                            "status": 1,
                            "numberOfPeople": 4,
                            "totalAmount": totalPay,
                            "cash": input,
                            "exchange": input - totalAmount,
                            "orderDate": new Date(),
                            "description": "Order for table 5, including fast food items.",
                            "orderLines": item
                        }
                        createOrder(objOrder).then((response) => {
                            console.log(response.data);

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
                                removeTableOrderById(id);
                                Cookies.remove("order");
                                refrestItem();
                                navigate('/order-history');

                            }).catch(error => {
                                console.error(error);
                            })
                            refrestItem();
                        }).catch(error => {
                            console.error(error);
                        })
                    } else {
                        alert("Cash bigger than or equal total paid")
                    }
                } else {
                    console.error("table-order is not an array:", orderTables);
                }

            } catch (error) {
                alert("Order Fail")
            }
        } else {
            try {
                const item = JSON.parse(Cookies.get("order") || '[]');
                const totalAmount = totalPay;
                if (input >= totalPay) {
                    // const orderObject = {
                    //     "orderType": 2,
                    //     "customerId": null,
                    //     "acceptedBy": 1,
                    //     "tableNumber": null,
                    //     "status": 1,
                    //     "numberOfPeople": 4,
                    //     "totalAmount": totalPay,
                    //     "cash": input,
                    //     "exchange": input - totalAmount,
                    //     "orderDate": new Date(),
                    //     "description": "Anniversary dinner with special seating request."
                    // }
                    const objOrder = {
                        "branchId": branchId,
                        "orderType": 1,
                        "customerId": 1,
                        "acceptedBy": user,
                        "tableNumber": 5,
                        "status": 1,
                        "numberOfPeople": 4,
                        "totalAmount": totalPay,
                        "cash": input,
                        "exchange": input - totalAmount,
                        "orderDate": new Date(),
                        "description": "Order for table 5, including fast food items.",
                        "orderLines": item
                    }
                    createOrder(objOrder).then((response) => {
                        console.log(response.data);

                        const objJournal = {
                            "journalId": null,
                            "branchId": branchId,
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
                            Cookies.remove("order");
                            refrestItem();
                        }).catch(error => {
                            console.error(error);
                        })
                        refrestItem();
                    }).catch(error => {
                        console.error(error);
                    })
                } else {
                    alert("Cash bigger than or equal total paid or Check User branch Id")
                }


            } catch (error) {
                alert("Order Fail")
            }
        }
    }
    function saveTableOrder() {
        if (!id) {
            try {
                // Parse the 'order' cookie and initialize the 'table-order' array
                const orderData = JSON.parse(Cookies.get('order') || '[]'); // Get the current order
                let orderTables;

                // Safely parse the 'table-order' cookie or initialize it as an array
                try {
                    orderTables = JSON.parse(Cookies.get('table-order') || '[]');
                    if (!Array.isArray(orderTables)) {
                        console.warn("table-order is not an array. Reinitializing it as an array.");
                        orderTables = []; // Reset as an array if it's not one
                    }
                } catch (e) {
                    console.warn("Error parsing table-order cookie. Initializing as empty array.", e);
                    orderTables = []; // Reset as an array on error
                }

                // Ensure the input is valid
                if (input && input.trim() !== '') {
                    const obj = {
                        id: input.trim(), // Ensure clean input
                        date: new Date(),
                        data: orderData
                    };

                    // Add the new order to the array
                    orderTables.push(obj);

                    // Save the updated 'table-order' back to cookies
                    Cookies.set('table-order', JSON.stringify(orderTables));

                    // Cleanup after saving
                    Cookies.remove("order"); // Remove the 'order' cookie
                    setItemOrder([]); // Reset order state
                    setInput(''); // Clear the input field
                    totalPayment(); // Recalculate total payment
                } else {
                    alert("Please input your received data");
                }
            } catch (e) {
                console.error("Error in saveTableOrder:", e);
            }
        } else {
            alert('table is already save')
        }

    }

    function totalPayment() {
        if (id) {
            try {
                const orderTables = JSON.parse(Cookies.get("table-order") || '[]'); // Default to empty array
                console.log(orderTables);

                // Check if `orderTables` is an array
                if (Array.isArray(orderTables)) {
                    const objOrderTable = orderTables.find(o => o.id == id);
                    const item = objOrderTable.data;
                    let total = 0;
                    if (item) {
                        for (let i = 0; i < item.length; i++) {
                            total += item[i].price * item[i].qty; // Calculate item total
                        }
                    }
                    setTotalPay(total);
                } else {
                    console.error("table-order is not an array:", orderTables);
                }
            } catch (error) {
                console.error("Error parsing 'table-order' cookie:", error);
            }
        } else {
            try {
                const item = JSON.parse(Cookies.get("order") || '[]');
                setItemOrder(item);

                let total = 0;
                if (item) {
                    for (let i = 0; i < item.length; i++) {
                        total += item[i].price * item[i].qty; // Calculate item total
                    }
                }
                setTotalPay(total);
                console.log(total); // Print the total payment

            } catch (error) {
                console.error("Error calculating total payment:", error);
            }
        }
    }
    useEffect(() => {
        totalPayment();
    }, [id])

    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const [itemOrder, setItemOrder] = useState([])
    function refrestItem() {
        try {
            if (id) {
                try {
                    const orderTables = JSON.parse(Cookies.get("table-order") || '[]'); // Default to empty array
                    console.log(orderTables);

                    // Check if `orderTables` is an array
                    if (Array.isArray(orderTables)) {
                        const objOrderTable = orderTables.find(o => o.id == id);
                        setItemOrder(objOrderTable.data);
                        setInput(objOrderTable.id)
                    } else {
                        console.error("table-order is not an array:", orderTables);
                    }
                } catch (error) {
                    console.error("Error parsing 'table-order' cookie:", error);
                }
            } else {
                const item = JSON.parse(Cookies.get("order") || '[]');
                if (item) {
                    setItemOrder(item);
                    totalPayment();
                }
            }
        } catch (error) {
            setItemOrder([]);
            totalPayment();
            setInput('');
        }
    }
    useEffect(() => {
        refrestItem();
    }, [id])
    const [totalPay, setTotalPay] = useState(0);

    function updateQty(btn, pid) {
        if (id) {
            if (btn === 1) {
                try {
                    const tableOrders = JSON.parse(Cookies.get("table-order") || '[]'); // Parse as array
                    const tableOrderIndex = tableOrders.findIndex(order => order.id === input); // Find the specific table order
                    if (tableOrderIndex === -1) throw new Error("Table order not found");

                    const items = tableOrders[tableOrderIndex].data || []; // Access the `data` array safely
                    const updatedItems = items.map(item =>
                        item.productId === pid
                            ? { ...item, qty: item.qty + 1, amounts: (item.qty + 1) * item.price }
                            : item
                    );

                    // Update the specific table order in the array
                    tableOrders[tableOrderIndex] = { ...tableOrders[tableOrderIndex], data: updatedItems };

                    // Save back the updated `table-order` array
                    Cookies.set("table-order", JSON.stringify(tableOrders));

                    refrestItem(); // Refresh the view
                } catch (error) {
                    console.error("Error incrementing item quantity:", error);
                    refrestItem();
                }
            } else {
                try {
                    const tableOrders = JSON.parse(Cookies.get("table-order") || '[]'); // Parse as array
                    const tableOrderIndex = tableOrders.findIndex(order => order.id === input); // Find the specific table order
                    if (tableOrderIndex === -1) throw new Error("Table order not found");

                    const items = tableOrders[tableOrderIndex].data || []; // Access the `data` array safely
                    const updatedItems = items
                        .map(item =>
                            item.productId === pid
                                ? { ...item, qty: item.qty - 1, amounts: (item.qty - 1) * item.price }
                                : item
                        )
                        .filter(item => item.qty > 0); // Remove items with `qty` <= 0

                    // Update the specific table order in the array
                    tableOrders[tableOrderIndex] = { ...tableOrders[tableOrderIndex], data: updatedItems };

                    // Save back the updated `table-order` array
                    Cookies.set("table-order", JSON.stringify(tableOrders));

                    refrestItem(); // Refresh the view
                } catch (error) {
                    console.error("Error decrementing item quantity:", error);
                    refrestItem();
                }
            }
        } else {
            if (btn == 1) {
                try {
                    const item = JSON.parse(Cookies.get("order") || '[]');
                    const findItem = item.find(i => i.productId == pid);
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
                    const findItem = item.find(i => i.productId == pid);
                    if (findItem.qty == 1) {
                        const newItem = item.filter(i => i.productId != pid);
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
        totalPayment();
    }

    function listTable() {
        return (
            <div className="card border-0 bg-none">
                <div className="card-body p-0 border-0 bg-none ps-2" style={{
                    overflow: 'scroll', scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none',
                }}>
                    <table className="text-dark w-100" style={{ fontSize: '12px', minWidth: '450px' }}>
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
                                        <td>{findProductName(f.productId)}</td>
                                        <td>{formatCurrency.format(f.price)}</td>
                                        <td>{f.qty}</td>
                                        <td>{formatCurrency.format(f.amounts)}</td>
                                        <td>
                                            <div className='font-12'>
                                                <button className='btn font-12  small-i box-shadow' onClick={() => updateQty(2, f.productId)}>-</button>
                                                <span className='bg-none small-i mx-1 text-dark'>{f.qty}</span>
                                                <button className='btn font-12 small-i box-shadow' onClick={() => updateQty(1, f.productId)}>+</button>

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
    const secretkey = "kans983(*93849Jnjsbd@*^@knskldn&^@($*LLjbHHSDuBKJ_)93849uIHUSHD&#%#&^$(@80928()*&*#$&(*"
    const [input, setInput] = useState('');

    const [isPayment, setIsPayment] = useState(false);
    const handleClick = (value) => {
        if (id) {
            if (isPayment == true) {
                setInput((prevInput) => prevInput + value);
            } else {
                alert('Can not change table number');
            }

        } else {
            setInput((prevInput) => prevInput + value);
        }

    };

    const handleBackspace = () => {
        if (!id) {
            setInput((prevInput) => prevInput.slice(0, -1));
        } else {
            alert('Can not change table number')
        }

    };
    function calculator() {
        return (
            <div style={{ maxWidth: '100%', width: '100%', textAlign: 'center' }}>
                <div className='f-20 w-100' style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <button className='button calculator' onClick={() => handleClick('1')}>1</button>
                    <button className='button calculator' onClick={() => handleClick('2')}>2</button>
                    <button className='button calculator' onClick={() => handleClick('3')}>3</button>
                    <button className='button calculator' onClick={() => handleClick('4')}>4</button>
                    <button className='button calculator' onClick={() => handleClick('5')}>5</button>
                    <button className='button calculator' onClick={() => handleClick('6')}>6</button>
                    <button className='button calculator' onClick={() => handleClick('7')}>7</button>
                    <button className='button calculator' onClick={() => handleClick('8')}>8</button>
                    <button className='button calculator' onClick={() => handleClick('9')}>9</button>
                    <button className='button calculator' onClick={() => handleClick('0')}>0</button>
                    <button className='button calculator' onClick={() => handleClick('.')}>.</button>
                    <button className='bg-danger btn-calculator' onClick={handleBackspace}>&larr;</button>
                </div>
            </div>
        );
    }
    function removeTableOrderById(id) {
        try {
            // Parse existing `table-order` cookie, defaulting to an empty array
            const tableOrders = JSON.parse(Cookies.get("table-order") || '[]');

            // Filter out the table order with the given `id`
            const updatedTableOrders = tableOrders.filter(order => order.id !== id);

            // Save the updated array back to the cookie
            Cookies.set("table-order", JSON.stringify(updatedTableOrders));

            // Optionally, refresh items in the view
            refrestItem();
        } catch (error) {
            console.error("Error removing table order:", error);
        }
    }


    const options = [
        { id: 1, label: "Discount 30%" },
        { id: 2, label: "Discount 40%" },
        { id: 3, label: "Discount 50%" },
        { id: 4, label: "Discount 75%" },
    ];
    const orderType = [
        { label: "Pick Up", value: "pickup", icon: "fa-solid fa-box" },
        { label: "Delivery", value: "delivery", icon: "fa-solid fa-truck" },
    ];

    const getValuePayMethod = (value) => {
        console.log(`Option selected: ${value}`);
    };
    const handleSelect = (selected) => {
        console.log("Selected:", selected.id);
    };
    return (
        <>
            <div className="d-flex pos">
                <div className="pos-info w-100 d-flex rounded" style={{
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none',
                }}>
                    <div className='w-100 px-2'>
                        <div className='d-flex justify-content-between align-items-center my-2 px-2 py-3 box-shadow rounded bg-white'>
                            {/* <div className='w-100 d-flex justify-content-between align-items-center px-3 pe-1' style={{ maxWidth: '400px' }}>
                                <LiaSearchSolid className='f-20 pointer' /><input type="text" className='ms-2 w-100 border rounded p-2 px-3' placeholder='search' />
                            </div> */}
                            <div className='d-flex text-start'>
                                <p className="text-start d-block center" style={{ height: '40px' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" className='h-100' />
                                </p>
                                <p className='f-14 ps-2 d-block'>
                                    <p>Nurak Oerun</p>
                                    <p className='f-10 text-secondary'>Sale admin</p>
                                </p>

                            </div>
                            <div>
                                <button className="button pay" style={{ fontSize: '14px' }}><HiShoppingCart /><span className='ps-2'>View Order</span></button>
                            </div>


                        </div>

                        <div className='bg-white px-2 h-100 rounded box-shadow'>
                            <div className='d-flex justify-content-between align-items-center my-2 py-1 pt-2 '>
                                <p className="text-start d-block">
                                    <div className='ps-3 f-20 border-start'>Category</div>
                                    <div className='f-10 text-secondary border-start ps-3 '>select food categroy</div>

                                </p>

                                <div className='w-100 d-flex justify-content-between align-items-center px-3 pe-0' style={{ maxWidth: '400px' }}>
                                    <LiaSearchSolid className='f-20 pointer' /><input type="text" className='ms-2 w-100 border rounded p-2 px-3' placeholder='search' />
                                </div>
                            </div>
                            <div className="w-100 mt-1 d-flex py-1 pt-0" style={{
                                overflowX: 'scroll',
                                scrollbarWidth: 'none', // For Firefox
                                msOverflowStyle: 'none',
                            }}>
                                <div className="center">
                                    <button
                                        // style={{ color: `${colorChange}`, background: `${bgChange}` }}
                                        className={`button-pos-category category me-1 ${activeIndex === 0 ? "button-pos-category active-category" : ""
                                            }`}

                                        onClick={() => {
                                            setActiveIndex(0)
                                            setCId(null)
                                        }} // Update active index on click
                                    >
                                        <div className="" style={{ height: '40px', overflow: 'hidden' }}>
                                            <img src="https://cdn-icons-png.flaticon.com/512/737/737967.png " className='h-100' alt="" />
                                        </div>
                                        <div className="f-12 py-2 ps-3">{'All Category'}</div>
                                    </button>
                                </div>
                                {
                                    categories.map((c, index) =>
                                        <div className="center">
                                            <button
                                                key={c.id}
                                                // style={{ color: `${colorChange}`, background: `${bgChange}` }}
                                                className={`button-pos-category category me-1 ${activeIndex === index + 1 ? "button-pos-category active-category" : ""
                                                    }`}

                                                onClick={() => {
                                                    setActiveIndex(index + 1)
                                                    setCId(c.id)
                                                }} // Update active index on click
                                            >
                                                <div className='' style={{ height: '40px', overflow: 'hidden' }}>
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="" className='h-100' />
                                                </div>
                                                <div className='py-2 ps-3 d-block text-start'>
                                                    <div className="f-12">
                                                        {c.name}

                                                    </div>
                                                    <div className='f-10'>
                                                        16 Item
                                                    </div>
                                                </div>

                                            </button>
                                        </div>
                                    )
                                }


                            </div>
                            <div className='row py-2'>
                                {
                                    product.map(p => {
                                        if (p.categoryId == categoryId) {
                                            return (
                                                <>
                                                    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 pb-3">
                                                        <ProductCard
                                                            image={p.image}
                                                            price={p.price}
                                                            name={p.productName}
                                                            onClick={() => addToCart(p.id, 1, p.price, p.image)}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        } else if (categoryId == null) {
                                            return (
                                                <>
                                                    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 pb-3">
                                                        <ProductCard
                                                            image={p.image}
                                                            price={p.price}
                                                            name={p.productName}
                                                            onClick={() => addToCart(p.id, 1, p.price, p.image)}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }
                                    }
                                    )
                                }
                            </div>
                        </div>

                    </div >

                </div >
                <div className="d-block d-xl-none fixed-bottom border border-secondary rounded-0 bg-white">

                    <button class="btn-pay w-100 rounded-0 py-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">{formatCurrency.format(totalPay)}</button>
                </div>
                <div className='pos-view-order ps-2 p-0  d-none d-xl-block bg-light p-1 rounded'>
                    <div className="border-0 h-100 bg-white box-shadow" style={{
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        scrollbarWidth: 'none', // For Firefox
                        msOverflowStyle: 'none',
                        position: 'relative'
                    }}>

                        <div className='px-2' style={{
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            scrollbarWidth: 'none', // For Firefox
                            msOverflowStyle: 'none',
                        }}>
                            {
                                itemOrder.map((i, index) =>
                                    <>
                                        <div className="w-100 border-0 border-bottom border-secondary" style={{ height: '110px' }}>
                                            <div className="between border-0 w-100">
                                                <div className='rounded img-pos-order center p-2 pb-2 ' style={{ height: '100px' }}>
                                                    <img src={`${imageUrl}${i.image}`} alt="" className="h-100 srounded" />
                                                </div>
                                                <div className='d-block ps-2 w-100'>
                                                    <div className='between' style={{ height: '50px' }}>
                                                        <span className='font-12 w-100'>{findProductName(i.productId)}</span>
                                                        {/* <i class="fa-solid fa-trash pointer"></i> */}
                                                    </div>
                                                    <div className='fs-6 between' style={{ height: '50px' }}>
                                                        <div className='w-100'>
                                                            <span className=' fs-5 text-badges-red'>{formatCurrency.format(i.price)}</span>
                                                            <span className=' font-12 ps-2'> / unit</span>
                                                        </div>
                                                        <div className='font-12 text-danger d-flex'>
                                                            <span className='small-i text-badges-danger box-shadow' onClick={() => updateQty(2, i.productId)}><LuMinus /></span>
                                                            <span className='bg-none text-dark text-badges-danger'>{i.qty}</span>
                                                            <span className='small-i text-badges-green box-shadow' onClick={() => updateQty(1, i.productId)}><IoIosAdd /></span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className=''>
                            <div className='position-absolute bottom-0 w-100 px-3'>
                                <div className="between text-dark  py-3">
                                    <div className='w-100 start text-secondary'>Total Payment :</div>
                                    <div className='text-dark fw-bold'><span className='text-badges-green'>{formatCurrency.format(totalPay)}</span></div>
                                </div>
                                <div className="button-grid m-0">
                                    <button className='btn-grid'><i class="fa-solid fa-user-plus pe-2"></i> Customer </button>
                                    <button className='btn-grid'><i class="fa-solid fa-circle-info pe-2"></i> Enter Code</button>
                                </div>
                                <button className='bg-orange btn-grid w-100'>
                                    <input type="text" className='border-0 bg-none h-100 w-100' placeholder='Enter number of table' value={input} />
                                </button>

                                <div className='row mt-1 p-2 rounded px-0'>
                                    <div className='col-7 pe-0'>
                                        {calculator()}
                                    </div>
                                    <div className="col-5 pe-0">
                                        <div className="row h-100 w-100">
                                            <div className="col-12 pe-0">

                                                <div className="p-1 pt-0 h-100 w-100 px-0">
                                                    <button className="button hold-order h-100 w-100"
                                                        onClick={() => saveTableOrder()}
                                                    >
                                                        <i class="fa-solid fa-utensils"></i>
                                                        <span className='ps-2'>Hold Order</span>
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="col-12 pe-0 ">

                                                <div className='p-1 pb-0 h-100 w-100 px-0'>
                                                    <button className="button pay h-100 w-100"
                                                        data-bs-toggle="offcanvas" data-bs-target="#payment" aria-controls="payment"
                                                        onClick={() => {
                                                            setInput('')
                                                            setIsPayment(true);
                                                        }}
                                                    >
                                                        <i class="fa-solid fa-arrow-right pe-2"></i> Payment
                                                    </button>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div >





            {/* </div > */}
            {/* {shopingCard()} */}
            <div className="modal fade " id="printer" tabindex="-1" aria-labelledby="printer" aria-hidden="true" >
                <div class="modal-dialog bg-none">
                    <div class="modal-content bg-none">

                        <div class="modal-body bg-none">
                            <PrinInvoice />
                        </div>

                    </div>
                </div>
            </div>

            {/* </div > */}
            <div className="modal slideInLeft " id="numberOfTable" tabindex="-1" aria-labelledby="numberOfTable" aria-hidden="true">
                <div class="modal-dialog modal-dialog modal-lg bg-none">
                    <div class="modal-content bg-white">
                        <div class="modal-header between border-secondary">
                            <h1 class="modal-title fs-5 start text-des w-75" id="exampleModalLabel">
                                <label htmlFor="tableNum" className='f-16 txt-label' >Enter Table Number :</label> <br />
                            </h1>
                            <button type="button" class="text-des btn " data-bs-dismiss="modal" aria-label="Close">
                                <i class="fa-solid fa-xmark text-des fs-3"></i>
                            </button>
                        </div>
                        <div class="modal-body d-flex justify-content-center">
                            <div className='mb-1 w-100'>

                                <input type="text" id='tableNum' className='bg-none py-3 px-3 text-dark w-100 px-0 text-box' placeholder='enter cash received' value={input} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal slideInLeft " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

            <div className="offcanvas offcanvas-start w-100" tabindex="-1" id="payment" aria-labelledby="payment">
                <div className="offcanvas-body p-0">
                    <div className="">
                        <div className="row">
                            <div className="col-xl-8 col-lg-6 col-12 col-md-6 col-12 d-block">
                                <div className='container-fluid w-100 mt-5' style={{ maxWidth: '800px' }}>
                                    <div className='display-6'>CONTACT</div>
                                    <p className="f-16 txt-label">Customer :</p>
                                    <ComboBox
                                        options={customer}
                                        className=' mb-2'
                                        onSelect={handleSelect}
                                        labelKeys={["firstName", "lastName"]}
                                        inputClassName=' bg-none'
                                        optionClassName='hover-line'
                                    />
                                    <p className="f-16 txt-label">Discount :</p>
                                    <ComboBox
                                        className='mb-2'
                                        options={options}
                                        onSelect={handleSelect}
                                        labelKeys={["label"]}
                                        inputClassName=' bg-none'
                                        optionClassName='hover-line'
                                    />
                                    <div className='display-6'>PAYMENTS</div>
                                    <p className="f-16 py-2">PaymentMethod :</p>
                                    <OptionButton options={orderType} onClick={getValuePayMethod} customClass="custom-container-class mb-2" />
                                    <div className='mb-1'>
                                        <Box sx={{ minWidth: 120 }}>
                                            <label htmlFor="received" className='f-16 txt-label' >Received $ :</label> <br />
                                            <input type="text" id='received' className='bg-none py-3 px-3 text-dark w-100 px-0 text-box' placeholder='enter cash received' value={input} />
                                        </Box>
                                    </div>
                                    {/* <div className='mb-1'>
                                            <Box sx={{ minWidth: 120 }}>
                                                <label htmlFor="received" className='f-16 txt-label'>Received Kh :</label> <br />
                                                <input type="number" id='received' className='bg-none py-3 px-3 text-dark w-100 px-0 text-box' placeholder='enter cash received' value={input * 4100} />
                                            </Box>
                                        </div> */}
                                    <div className='mb-1'>
                                        <Box sx={{ minWidth: 120 }}>
                                            <label htmlFor="exchange" className='f-16 txt-label'>Exchange :</label> <br />
                                            <input type="number" id='exchange' className='bg-none  py-3 px-3 text-dark w-100 px-0  text-box' placeholder='enter cash received' value={input - totalPay} />
                                        </Box>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-12">
                                <div className='ps-0 bg-none border' style={{ height: '100vh' }}>
                                    <div className="bg-none rounded h-100" style={{ position: 'relative', overflow: 'scroll' }}>

                                        <div className="h-50 m-0 px-2">
                                            <button className='btn-silver w-100 py-3 my-2'>
                                                <i class="fa-regular fa-money-bill-1 pe-3"></i>CASH
                                            </button>
                                            <button className='btn-silver w-100 py-3 mb-3'>
                                                <i class="fa-solid fa-barcode pe-3"></i>KH QR
                                            </button>
                                        </div>

                                        <div className="h-50">
                                            <div className="position-absolute bottom-0 w-100">
                                                <div className='p-2'>
                                                    <div className="d-block px-3 border border-secondary py-3 rounded">
                                                        <div className="d-flex justify-content-between text-dark fs-5">
                                                            <div className='w-100 start fs-6'>Total Payment :</div>
                                                            <div className='text-dark'>{formatCurrency.format(totalPay)}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='py-1 pt-1 px-2'>
                                                    {calculator()}
                                                </div>
                                                <div className="d-flex">
                                                    <div className='pe-1 ps-1 w-25'>
                                                        <button className="btn bg-red text-white rounded-0 py-4  box-shadow w-100"
                                                            data-bs-dismiss="offcanvas" aria-label="Close"
                                                            onClick={() => {
                                                                setInput(id)
                                                                setIsPayment(false)
                                                            }}
                                                        ><i class="fa-solid fa-arrow-left pe-3"></i> Cancel</button>
                                                    </div>
                                                    <div className="w-75 pe-1 pb-1">
                                                        <button className="btn bg-green text-white rounded-0 py-4 box-shadow w-100"
                                                            onClick={() => {
                                                                order();
                                                            }}
                                                            data-bs-dismiss="offcanvas" aria-label="Close"
                                                        >DONE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start w-100" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">View order</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body w-100 px-1">
                    <div className="between text-dark  fs-4 py-3">
                        <div className='w-100 start fs-5'>Total Payment :</div>
                        <div className='text-dark fw-bold'>{formatCurrency.format(totalPay)}</div>
                    </div>
                    <div className="button-grid">
                        <button className='btn-grid'><i class="fa-solid fa-user-plus pe-2"></i> Customer </button>
                        <button className='btn-grid'><i class="fa-solid fa-cart-shopping pe-2"></i> Order Table</button>
                        <button className='bg-orange btn-grid'>
                            <input type="text" className='border-0 bg-none h-100 w-100' placeholder='Enter number of table' value={input} />
                        </button>
                        <button className='btn-grid'><i class="fa-solid fa-circle-info pe-2"></i> Enter Code</button>
                    </div>

                    <div className='d-flex mt-1'>
                        <div style={{ height: '100%' }}>
                            {calculator()}
                        </div>
                        <div className="d-block w-100">
                            <button className="btn-silver rounded-0 h-25 border box-shadow w-100 d-block fs-6"
                                data-bs-toggle="offcanvas" data-bs-target="#payment" aria-controls="payment"
                                onClick={() => {
                                    setInput('')
                                    setIsPayment(true);
                                }}
                            >
                                <i class="fa-solid fa-arrow-right pe-2"></i> Payment
                            </button>
                            <button className="btn-order rounded-0 h-75  text-white box-shadow w-100 d-block fs-6"
                                onClick={() => saveTableOrder()}
                            >
                                <i class="fa-solid fa-utensils px-3"></i>
                                Order
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PosLight
