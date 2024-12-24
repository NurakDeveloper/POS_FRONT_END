
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../api/Product';
import { useNavigate } from 'react-router-dom';
import { hostName } from '../../../api/host';
import { getAllBranch } from '../../../api/Branch';
import { getAllCategory } from '../../../api/Category';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Loading from '../loading/Loading';
import Text from '../../../components/text/Text';

const ItemDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
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
    useEffect(() => {
        // Set a timeout to hide the loading screen after 0.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 200);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, [isLoading]);
    return (
        <>

            {isLoading ? (
                <>
                    <Loading />
                </>
            ) : (
                <div className='animation-opacity '>
                    <div className="container p-0 center ">
                        <div className="row w-100">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center p-4">
                                    <div>
                                        <span>Product / {productData.productName}</span>
                                    </div>
                                    <div className="d-flex">
                                        <div className="pe-3">
                                            <button className="button cancel box-shadow" onClick={() => navi(`/list-item`)}><IoIosArrowRoundBack /> Back</button >
                                        </div >
                                        <button className="button add box-shadow" onClick={() => navi(`/update-item/${id}`)}><i class="fa-solid fa-pen"></i><span className='px-2'>Edit</span></button>
                                    </div>
                                </div >
                            </div>
                            <div className="col-12">

                                <div className=" bg-white w-100 rounded p-4 box-shadow" box-shadow>

                                    <div className="d-flex" style={{ height: '200px' }}>
                                        <div className='center rounded box-shadow' style={{ height: '190px', width: '300px', overflow: 'hidden' }}>
                                            <img src={`http://${domainName}:8085/api/images/${productData.image}`} alt="" className="h-100" />
                                        </div>
                                        <div className='ps-4'>
                                            <div className="fs-2">
                                                <p>{productData.productName}</p>
                                                {/* <p className='fs-4 text-secondary'>{findCategoryName(productData.categoryId)}</p> */}
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className='d-block text-start bg-white py-2'>
                                                <Text title='Product Name' value={productData.productName} fontSize={14} />
                                                <Text title='Food Code' value={productData.productCode ? productData.productCode : 'No Food Code update data...'} fontSize={14} />
                                                <Text title='Selling Price' value={productData.price} fontSize={14} />
                                                <Text title='MaxQuantity' value={productData.maxOrderQty} fontSize={14} />
                                                <Text title='MinQuantity' value={productData.minOrderQty} fontSize={14} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className='d-block text-start bg-white py-2'>
                                                <Text title='Categories' value={findCategoryName(productData.categoryId)} fontSize={14} />
                                                <Text title='Branch' value={findBranchName(productData.branchId)} fontSize={14} />
                                                <Text title='Food Country' value={productData.productOrigin} fontSize={14} />


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
                                                    <div className='d-block text-start fs-6 bg-white py-2 w-75'>
                                                        <Text title='Cooking Time' value={productData.prepareTime} fontSize={14} />
                                                        <Text title='Number Of Calories' value={productData.calories} fontSize={14} />
                                                        <Text title='Number Of Sugar' value={productData.sugar + ' G '} fontSize={14} />


                                                    </div>

                                                </div>
                                            </div>
                                            <div class="border-0 tab-pane py-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                                                <p className='w-100 f-14'>{productData.description}</p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div >

                        </div >

                    </div >
                </div >
            )

            }

        </>
    )
}





export default ItemDetail
