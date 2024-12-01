
import { getOrderByID } from '../../../api/Order'
import { listOrderLineByOrderID } from '../../../api/Order'
import { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import { createProduct, updateProduct } from '../../../api/Product'
import { getProductById } from '../../../api/Product'
import { getAllBranch } from '../../../api/Branch'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from '../../../api/Category'
import axios from 'axios'
import './itemform.css'
import { uploadImage } from '../../../api/ImageApi'
import { IoSaveSharp } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
const InsertItem = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategory().then((response) => {
            setCategories(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    const [productData, setProductData] = useState({
        createdBy: '',
        updatedBy: '',
        categoryId: '',
        branchId: '',
        productCode: '',
        productName: '',
        price: '',
        prepareTime: '',
        description: '',
        calories: '',
        status: 1,
        productOrigin: '',
        sugar: '',
        image: '',
        maxOrderQty: '',
        minOrderQty: '',
        createdDate: new Date(),
        updatedDate: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('Choose Category');
    const [branchName, setBranchName] = useState();
    const [branch, setBranch] = useState([]);
    useEffect(() => {
        getAllBranch().then((response) => {
            setBranch(response.data);
            console.log("Branch" + response.data)
        }).catch(e => {
            console.error(e);
        })
    }, [])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    function submitProduct(e) {
        e.preventDefault();
        if (!file) {
            setMessage("No file to upload.");
            if (productData.image == ''.trim())
                setMessage(" Please select iamge file to upload.");
            return
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Use the `uploadImage` function to send the file
            // const response = await uploadImage(formData);
            uploadImage(formData).then((response) => {
                setMessage("Create Product Successfull");
                alert('knaskldnl')
            })
        } catch (error) {
            // Handle errors and display appropriate messages
            setMessage(
                error.response?.data || "Error uploading file. Please try again."
            );
        }

        if (id) {
            updateProduct(id, productData).then((respone) => {
                console.log(respone.data);
                setProductData({
                    createdBy: '',
                    updatedBy: '',
                    categoryId: '',
                    branchId: '',
                    productCode: '',
                    productName: '',
                    price: '',
                    prepareTime: '',
                    description: '',
                    calories: '',
                    status: 1,
                    productOrigin: '',
                    sugar: '',
                    image: '',
                    maxOrderQty: '',
                    minOrderQty: '',
                    createdDate: new Date(),
                    updatedDate: ''
                });
                navigate(`/item-detail/${id}`);
            }).catch(e => {
                console.error(e);
            })
            return
        }
        createProduct(productData).then((response) => {
            console.log(response.data);
            setProductData({
                createdBy: '',
                updatedBy: '',
                categoryId: '',
                branchId: '',
                productCode: '',
                productName: '',
                price: '',
                prepareTime: '',
                description: '',
                calories: '',
                status: 1,
                productOrigin: '',
                sugar: '',
                image: '',
                maxOrderQty: '',
                minOrderQty: '',
                createdDate: new Date(),
                updatedDate: ''
            });
        })

    }
    function preview(e) {
        e.preventDefault();
        const jsonString = JSON.stringify(productData, null, 2); // 'null, 2' formats the JSON for readability

        alert(jsonString)
    }
    useEffect(() => {
        if (id) {
            getProductById(id).then((reponse) => {
                setProductData((prevData) => ({
                    ...prevData,
                    ["productName"]: reponse.data.productName,
                    ["productCode"]: reponse.data.productCode,
                    ["price"]: reponse.data.price,
                    ["prepareTime"]: reponse.data.prepareTime,
                    ["description"]: reponse.data.description,
                    ["calories"]: reponse.data.calories,
                    ["status"]: reponse.data.status,
                    ["productOrigin"]: reponse.data.productOrigin,
                    ["sugar"]: reponse.data.sugar,
                    ["image"]: reponse.data.image,
                    ["maxOrderQty"]: reponse.data.maxOrderQty,
                    ["minOrderQty"]: reponse.data.minOrderQty,
                    ["createdDate"]: reponse.data.createdDate,
                    ["updatedDate"]: reponse.data.updatedDate,
                    ["updatedBy"]: reponse.data.updatedBy,
                    ["createdBy"]: reponse.data.createdBy,
                    ["categoryId"]: reponse.data.categoryId,
                    ["branchId"]: reponse.data.branchId,
                }));
            })
        }
    }, [id])

    const [file, setFile] = useState(null); // State to store the selected file
    const [message, setMessage] = useState(""); // State to display messages

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setProductData((prevData) => ({
            ...prevData,
            ["image"]: event.target.files[0].name
        }));
    };

    function formHeader() {
        return (
            <div className='form-header-content p-3 pt-2'>
                <button type="button" class="button cancel box-shadow " onClick={() => navigate('/list-item')}><IoIosArrowRoundBack /><span className='px-2'>Cancel</span> </button>
                <div className='d-flex'>
                    <button type="button" class="button preview box-shadow " onClick={preview}><i class="fa-solid fa-circle-info px-2"></i>Preview </button>
                    <div className='px-3 pe-0'>
                        <button type="button" class="button add box-shadow px-4" onClick={submitProduct}><IoSaveSharp /><span className='px-2'>Save</span> </button>
                    </div>
                </div>


            </div>
        );
    }
    return (
        <>

            <form action='' className=''>

                {formHeader()}
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-xl-12">
                            <div className="border bg-white w-100 rounded">
                                <div className='row p-4'>
                                    <div className='col-7 start pb-3'>
                                        <input type="text" className='input-box fs-3 w-100' placeholder='eng.product name'
                                            // name='productName'
                                            // value={productData.productName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='col-5 pb-3'>
                                        <div className='d-none'>
                                            <input type="file" name="" className='d-none w-100' id="fileImage"
                                                // onChange={(e) => {
                                                //     setProductData((prevData) => ({
                                                //         ...prevData,
                                                //         ["image"]: e.target.files[0].name
                                                //     }));
                                                // }}
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className='w-100 end'>
                                            <label htmlFor="fileImage" className=' rounded py-2 border pointer' style={{ height: '120px', width: '120px', overflow: 'hidden' }}>
                                                <img src={`/src/assets/image/${productData.image}`} alt="" className="h-100 " />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className='col-xl-6 col-lg-6 col-sm-12 col-12 '>
                                        <div className='px-4'>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='p-name' className='w-25 text-start'>Product name  </label>
                                                <input type="text" id='p-name' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='productName'
                                                    value={productData.productName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='p-code' className='w-25 text-start'>Product code  </label>
                                                <input type="text" id='p-code' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='productCode'
                                                    value={productData.productCode}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='price' className='w-25 text-start'>Selling price <span className='c-cyan'>{"($)"}</span> </label>
                                                <input type="number" id='p-price' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='price'
                                                    value={productData.price}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='maxOrderQty' className='w-25 text-start'>MaxOrderQty </label>
                                                <input type="number" id='maxOrderQty' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='maxOrderQty'
                                                    value={productData.maxOrderQty}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='minOrderQty' className='w-25 text-start'>MinOrderQty  </label>
                                                <input type="number" id='minOrderQty' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='minOrderQty'
                                                    value={productData.minOrderQty}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='minOrderQty' className='w-25 text-start'>CategoryId  </label>
                                                <input type="number" id='minOrderQty' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='categoryId'
                                                    value={productData.categoryId}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='branchId' className='w-25 text-start'>BranchId  </label>
                                                <input type="number" id='branchId' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='branchId'
                                                    value={productData.branchId}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='image' className='w-25 text-start'>Image  </label>
                                                <input type="text" id='image' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='image'
                                                    value={productData.image}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>


                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-sm-12 col-12'>
                                        <div className="px-4">
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <p className='w-25 text-start'>Category  </p>
                                                <div class=" cursor-i dropdown w-75">
                                                    <p className="w-100 d-flex text-secondary cursor-i input-box" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <input type="text" className='border-0 w-100' value={categoryName} />
                                                        <i class="w-25 text-end">&#10141;</i>
                                                    </p>


                                                    <ul className="cursor-i dropdown-menu w-100 box-shadow ">
                                                        {
                                                            categories.map(c =>
                                                                <li>
                                                                    <a className="dropdown-item pointer"
                                                                        onClick={() => {
                                                                            setCategoryName(c.name)
                                                                            setProductData((prevData) => ({
                                                                                ...prevData,
                                                                                ["categoryId"]: c.id
                                                                            }));
                                                                        }}
                                                                    >
                                                                        {c.name}
                                                                    </a>
                                                                </li>
                                                            )
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <p className='w-25 text-start'>Branch  </p>
                                                <div class="dropdown w-75">
                                                    <button className=" btn w-100 d-flex text-secondary input-box" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <input type="text" className='border-0 w-100' value={branchName} />
                                                        <i class="w-25 text-end">&#10141;</i>
                                                    </button>
                                                    <ul className="dropdown-menu w-100 box-shadow">
                                                        {
                                                            branch.map(c =>
                                                                <li>
                                                                    <a className="dropdown-item pointer"
                                                                        onClick={() => {
                                                                            setBranchName(c.branchName)
                                                                            setProductData((prevData) => ({
                                                                                ...prevData,
                                                                                ["branchId"]: c.id
                                                                            }));
                                                                        }}
                                                                    >
                                                                        {c.city} {" - "} {c.branchName}
                                                                    </a>
                                                                </li>
                                                            )
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                <label htmlFor='productOrigin' className='w-25 text-start'>Product origin </label>
                                                <input type="text" id='productOrigin' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='productOrigin'
                                                    value={productData.productOrigin}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className='bg-white py-3'>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="text-dark nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Cooking</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Note</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content border-0" id="myTabContent">
                                        <div class="border-0 tab-pane show active " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                            <div className="d-flex">
                                                <div className='d-block text-start fs-6 bg-white px-4 py-2 w-75'>
                                                    <div className='group-input center w-100 ' style={{ fontSize: 16 }}>
                                                        <label htmlFor='prepareTime' className='w-25 text-start'> Prepare time <span className='c-cyan'>{"(Minute)"}</span> </label>
                                                        <input type="number" id='prepareTime' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                            name='prepareTime'
                                                            value={productData.prepareTime}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className='group-input center w-100 ' style={{ fontSize: 16 }}>
                                                        <label htmlFor='calories' className='w-25 text-start'>Calories  </label>
                                                        <input type="number" id='calories' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                            name='calories'
                                                            value={productData.calories}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className='group-input center w-100' style={{ fontSize: 16 }}>
                                                        <label htmlFor='sugar' className='w-25 text-start'>Sugar <span className='c-cyan'>{"(G)"}</span> </label>
                                                        <input type="number" id='sugar' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                            name='sugar'
                                                            value={productData.sugar}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                            <textarea
                                                className='border-0 input-box w-100 p-2'
                                                placeholder='New Note'
                                                name='description'
                                                value={productData.description}
                                                onChange={handleInputChange}
                                            />

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form >

        </>
    )
}





export default InsertItem
