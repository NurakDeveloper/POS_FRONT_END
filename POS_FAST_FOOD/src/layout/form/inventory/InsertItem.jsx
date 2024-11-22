
import { getOrderByID } from '../../../api/Order'
import { listOrderLineByOrderID } from '../../../api/Order'
import { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import { createProduct, updateProduct } from '../../../api/Product'
import { getProductById } from '../../../api/Product'
import { getAllBranch } from '../../../api/Branch'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from '../../../api/Category'
import './itemform.css'
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

    const category = [
        {
            "id": 1,
            "name": "Drink"
        },
        {
            "id": 2,
            "name": "Food"
        },
    ]
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
    return (
        <>

            <form action=''>
                <div className="container-fluid p-0 center">

                    <div className="row w-100">
                        <div className="col-xl-12">
                            <div className="between">
                                <div className='w-50 d-flex mt-2'>
                                    <div class="pb-2 px-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-outline-dark px-4 w-100 box-shadow rounded" onClick={preview}><i class="fa-solid fa-circle-info px-2"></i>Preview </button>
                                    </div>


                                </div>
                                <div className='w-50 d-flex end mt-2'>
                                    <div class="pb-2  px-2" role="group" aria-label="Basic example">
                                        <button type="button" class="btn-red px-4 w-100 box-shadow rounded"><i class="fa-solid fa-xmark px-2"></i>Cancel </button>
                                    </div>
                                    <div class="pb-2 " role="group" aria-label="Basic example">
                                        <button type="button" class="btn-green px-4 w-100 box-shadow rounded" onClick={submitProduct}><i class="fa-solid fa-floppy-disk px-2"></i>Save </button>
                                    </div>

                                </div>

                            </div>
                            <div className="border bg-white w-100 rounded">
                                <div className="d-flex h-100" >
                                    <div className='start w-50 p-2'>
                                        <div className='w-100 px-4'>
                                            <div className="fs-2">
                                                <input type="text" className='w-75 text-start text-secondary input-box' placeholder="eng. Product name"
                                                    name='productName'
                                                    value={productData.productName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='end p-2 w-50 d-flex'>
                                        <div className='d-flex' style={{ height: '140px', width: '170px', overflow: 'hidden' }}>
                                            <div className='d-block text-center fs-6' style={{ width: '40px' }}>
                                                <input type="file" name="" className='d-none' id="fileImage"
                                                    onChange={(e) => {
                                                        setProductData((prevData) => ({
                                                            ...prevData,
                                                            ["image"]: e.target.files[0].name
                                                        }));
                                                    }}
                                                />



                                            </div>
                                            <label htmlFor="fileImage" className='center rounded-circle py-2 border pointer' style={{ height: '120px', width: '120px', overflow: 'hidden' }}>
                                                <img src={`/src/assets/image/${productData.image}`} alt="" className="h-100 " />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
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
                                    <div className='d-block text-start bg-white px-4 py-2 w-50 mt-1'>
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


                                <div className='bg-white py-3'>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="text-dark nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Cooking</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Note</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content border-0 py-4" id="myTabContent">
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
                                                className='border input-box w-100'
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
