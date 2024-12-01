
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../api/Product';
import { useNavigate } from 'react-router-dom';
import { hostName } from '../../../api/host';
import { getAllBranch } from '../../../api/Branch';
import { getAllCategory } from '../../../api/Category';
import { IoIosArrowRoundBack } from 'react-icons/io';

const ItemDetail = () => {
    const [category, setCategories] = useState([]);
    const [branch, setBranch] = useState([]);
    const navi = useNavigate();
    const domainName = hostName();
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
        createdDate: '',
        updatedDate: ''
    });
    const { id } = useParams();
    useEffect(() => {
        getAllBranch().then((respnse) => {
            setBranch(respnse.data);
            console.log(respnse.data);
        }).catch(error => {
            console.error(error);
        })
        getAllCategory().then((respnse) => {
            setCategories(respnse.data);
            console.log(respnse.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    useEffect(() => {
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
    }, [id])
    function findBranchName(id) {
        try {
            return branch.find(b => b.id == id).branchName;
        } catch (e) {
            return "Error";
        }

    }
    function findCategoryName(id) {
        try {
            return category.find(c => c.id == id).name;;
        } catch (e) {
            return "Error";
        }

    }
    return (
        <>

            <form action=''>
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-12">
                            <div className="d-flex py-3">
                                <div className="pe-3">
                                    <button className="button cancel box-shadow" onClick={() => navi(`/list-item`)}><IoIosArrowRoundBack /> Back</button>
                                </div>
                                <button className="button add box-shadow" onClick={() => navi(`/update-item/${id}`)}><i class="fa-solid fa-pen"></i><span className='px-2'>Edit</span></button>
                            </div>

                            <div className="border bg-white w-100 rounded">
                                <div className="d-flex h-100" >
                                    <div className='start w-50 p-2'>
                                        <div className='w-100 px-4'>
                                            <div className="fs-2">
                                                <p>{productData.productName}</p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='end p-2 w-50'>
                                        <div className='d-flex end' style={{ height: '120px', width: '100%', overflow: 'hidden' }}>
                                            <div className='center border border-3 rounded' style={{ height: '120px', overflow: 'hidden' }}>
                                                <img src={`http://${domainName}:8085/api/images/${productData.image}`} alt="" className="h-100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='p-name' className='w-25 text-start'>Product name  </label>
                                            <p className='w-75'>{productData.productName}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='p-code' className='w-25 text-start'>Product code  </label>
                                            <p className='w-75'>{productData.productCode}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='price' className='w-25 text-start'>Selling price <span className='c-cyan'>{"($)"}</span> </label>
                                            <p className='w-75'>{productData.price}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='maxOrderQty' className='w-25 text-start'>MaxOrderQty </label>
                                            <p className='w-75'>{productData.maxOrderQty}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='minOrderQty' className='w-25 text-start'>MinOrderQty  </label>
                                            <p className='w-75'>{productData.minOrderQty}</p>
                                        </div>


                                    </div>
                                    <div className='d-block text-start bg-white px-4 py-2 w-50 mt-1'>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='minOrderQty' className='w-25 text-start'>Category  </label>
                                            <p className='w-75'>{findCategoryName(productData.categoryId)}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='minOrderQty' className='w-25 text-start'>Branch  </label>
                                            <p className='w-75'>{findBranchName(productData.branchId)}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='minOrderQty' className='w-25 text-start'>Product origin  </label>
                                            <p className='w-75'>{productData.productOrigin}</p>
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
                                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                                        <label htmlFor='prepareTime' className='w-25 text-start'> Prepare time <span className='c-cyan'>{"(Minute)"}</span> </label>
                                                        <p className='w-75'>{productData.prepareTime}</p>
                                                    </div>
                                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                                        <label htmlFor='calories' className='w-25 text-start'>Calories  </label>
                                                        <p className='w-75'>{productData.calories}</p>
                                                    </div>
                                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                                        <label htmlFor='sugar' className='w-25 text-start'>Sugar <span className='c-cyan'>{"(G)"}</span> </label>
                                                        <p className='w-75'>{productData.sugar}</p>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                                            <p className='w-100'>{productData.description}</p>

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





export default ItemDetail
