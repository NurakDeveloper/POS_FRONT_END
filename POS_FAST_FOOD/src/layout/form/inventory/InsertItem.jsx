
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
import InputValidation from '../../../components/input/InputValidation'
import SelectBox from '../../../components/select/SelectBox'
import { getDefualtUserId } from '../../../api/AppConfig'
const InsertItem = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategory().then((response) => {
            setCategories(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    const user = getDefualtUserId();
    const [productData, setProductData] = useState({
        createdBy: user,
        updatedBy: user,
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
    const [branchName, setBranchName] = useState('Choose Branch');
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
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};

        if (!productData.productName) {
            newErrors.productName = 'Product Name is required.';
        }

        if (!productData.price) {
            newErrors.price = 'Price is required.';
        } else if (isNaN(productData.price) || productData.price <= 0) {
            newErrors.price = 'Price must be a valid positive number.';
        }

        if (!productData.prepareTime) {
            newErrors.prepareTime = 'Prepare Time is required.';
        } else if (isNaN(productData.prepareTime) || productData.prepareTime <= 0) {
            newErrors.prepareTime = 'Prepare Time must be a valid positive number.';
        }

        if (!productData.maxOrderQty || isNaN(productData.maxOrderQty)) {
            newErrors.maxOrderQty = 'Maximum Order Quantity must be a valid number.';
        }

        if (!productData.minOrderQty || isNaN(productData.minOrderQty)) {
            newErrors.minOrderQty = 'Minimum Order Quantity must be a valid number.';
        } else if (parseInt(productData.minOrderQty) > parseInt(productData.maxOrderQty)) {
            newErrors.minOrderQty = 'Minimum Order Quantity cannot exceed Maximum Order Quantity.';
        }
        if (!file) {
            if (!productData.image) {
                newErrors.image = 'No Image Please select Image first.'
            }
        }
        if (!productData.categoryId) {
            newErrors.category = 'Please Celect Category ! Category is null.'
        }
        if (!productData.branchId) {
            newErrors.branch = 'Please Select Branch ! Branch is null.'
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    function submitProduct(e) {
        e.preventDefault();

        if (!validateForm()) {
            return
        }
        if (!user) {
            return
        }
        if (!file) {
            if (!productData.image) {
                return
            }
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
        if (!user) {
            return
        }
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
                                        <div className='w-100'>
                                            <InputValidation
                                                label="Product Name"
                                                id="p-name"
                                                onChange={handleInputChange}
                                                name={'productName'}
                                                value={productData.productName}
                                                error={errors.productName}
                                                fontSize={24}
                                                require={'true'}
                                            />
                                        </div>
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
                                            <div>
                                                <label htmlFor="fileImage" className=' rounded py-2 border pointer' style={{ height: '120px', width: '120px', overflow: 'hidden' }}>
                                                    <img src={`/src/assets/image/${productData.image}`} alt="" className="h-100 " />
                                                </label> <br />
                                                <span className='validation-error f-12'>{errors.image ? errors.image : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className='col-xl-6 col-lg-6 col-sm-12 col-12 '>
                                        <div className='px-4'>
                                            <InputValidation
                                                label="Product Name"
                                                id="p-name"
                                                onChange={handleInputChange}
                                                name={'productName'}
                                                value={productData.productName}
                                                error={errors.productName}
                                                fontSize={14}
                                                require={'true'}
                                            />
                                            <InputValidation
                                                label="Product Code"
                                                id="p-code"
                                                onChange={handleInputChange}
                                                name={'productCode'}
                                                value={productData.productCode}
                                                require={'true'}
                                                fontSize={14}
                                            />
                                            <InputValidation
                                                label="Selling Price"
                                                id="price"
                                                onChange={handleInputChange}
                                                name={'price'}
                                                type={'number'}
                                                value={productData.price}
                                                fontSize={14}
                                            />
                                            <InputValidation
                                                label="MaxOrderQty"
                                                type={'number'}
                                                id="maxQty"
                                                onChange={handleInputChange}
                                                name={'maxOrderQty'}
                                                value={productData.maxOrderQty}
                                                fontSize={14}
                                                error={errors.maxOrderQty}
                                                require={'true'}
                                            />
                                            <InputValidation
                                                label="MinOrderQty"
                                                type={'number'}
                                                id="minQty"
                                                onChange={handleInputChange}
                                                name={'minOrderQty'}
                                                value={productData.minOrderQty}
                                                fontSize={14}
                                                error={errors.minOrderQty}
                                                require={'true'}
                                            />
                                            <InputValidation
                                                label="ProductOrigin"
                                                type={'text'}
                                                id="productOrigin"
                                                onChange={handleInputChange}
                                                name={'productOrigin'}
                                                value={productData.productOrigin}
                                                fontSize={14}

                                            />
                                            {/* <div className='group-input center w-100 pb-3' style={{ fontSize: 14 }}>
                                                <label htmlFor='minOrderQty' className='w-25 text-start'>CategoryId  </label>
                                                <input type="number" id='minOrderQty' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='categoryId'
                                                    value={productData.categoryId}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100 pb-3' style={{ fontSize: 14 }}>
                                                <label htmlFor='branchId' className='w-25 text-start'>BranchId  </label>
                                                <input type="number" id='branchId' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='branchId'
                                                    value={productData.branchId}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className='group-input center w-100 pb-3' style={{ fontSize: 14 }}>
                                                <label htmlFor='image' className='w-25 text-start'>Image  </label>
                                                <input type="text" id='image' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='image'
                                                    value={productData.image}
                                                    onChange={handleInputChange}
                                                />
                                            </div> */}
                                        </div>


                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-sm-12 col-12 p-0'>
                                        <div className="px-4">
                                            {/* <SelectBox categories={categories} setProductData={productData} /> */}
                                            <div className='input-wrapper' style={{ fontSize: 14 }}>
                                                <p className='input-label'>Category  <span className='text-danger ps-3'>*</span></p>
                                                <div class=" cursor-i dropdown w-100">
                                                    <p className="w-100 d-flex text-secondary cursor-i input-box" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <input type="text" className='border-0 w-100' value={categoryName} />
                                                        <i class="w-25 text-end">&#10141;</i>
                                                    </p>
                                                    <ul className="cursor-i dropdown-menu w-100 box-shadow f-14 border-0">
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
                                                    <span className='validation-error f-12'>{errors.category ? errors.category : ''}</span>
                                                </div>
                                            </div>

                                            <div className='input-wrapper' style={{ fontSize: 14 }}>
                                                <label className='input-label'>Branch <span className='text-danger ps-3'>*</span> </label>
                                                <div class="dropdown w-100">
                                                    {/* <b className="button input-box rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <input type="text" className='border-0 w-100' value={branchName} />
                                                        <i class="w-25 text-end">&#10141;</i>
                                                    </b> */}
                                                    <p className="w-100 d-flex text-secondary cursor-i input-box" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <input type="text" className='border-0 w-100' value={branchName} />
                                                        <i class="w-25 text-end">&#10141;</i>
                                                    </p>
                                                    <ul className="dropdown-menu w-100 box-shadow f-14 border-0">
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
                                                    <span className='validation-error f-12'>{errors.branch ? errors.branch : ''}</span>
                                                </div>
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
                                                    <InputValidation
                                                        label="prepareTime"
                                                        id="prepareTime"
                                                        type={"number"}
                                                        onChange={handleInputChange}
                                                        name={'prepareTime'}
                                                        value={productData.prepareTime}
                                                        error={errors.prepareTime}
                                                        fontSize={14}
                                                    />
                                                    <InputValidation
                                                        label="Calories"
                                                        id="calories"
                                                        type={"number"}
                                                        onChange={handleInputChange}
                                                        name={'calories'}
                                                        value={productData.calories}
                                                        error={errors.calories}
                                                        fontSize={14}
                                                    />
                                                    <InputValidation
                                                        label="Sugar"
                                                        id="sugar"
                                                        type={"number"}
                                                        onChange={handleInputChange}
                                                        name={'sugar'}
                                                        value={productData.sugar}
                                                        error={errors.sugar}
                                                        fontSize={14}
                                                    />


                                                </div>

                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                            <textarea
                                                className='border-0 input-box w-100 p-2 f-14'
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
