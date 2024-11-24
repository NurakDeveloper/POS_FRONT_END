import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllProduct } from '../../../api/Product'

const Item = () => {
    const [product, setProduct] = useState([]);
    const [itemView, setItemView] = useState();
    useEffect(() => {
        setView(1);
    }, [product])
    useEffect(() => {
        getAllProduct().then((respnse) => {
            setProduct(respnse.data);
            console.log(respnse.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])
    const goto = useNavigate();
    function funtionBoolean(check) {
        if (check) {
            return (
                <>
                    <span class="badge text-bg-success">True</span>

                </>
            )
        } else {
            return (
                <>
                    <span class="badge text-bg-danger">false</span>
                </>
            )
        }

    }
    function listCard() {
        return (
            <div className="row w-100 p-0">
                {
                    product.map(o =>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="card bg-white p-0 pointer mb-3"
                                onClick={() => goto(`/item-detail/${o.id}`)}
                                style={{ height: '180px', overflow: 'hidden' }}
                            >
                                <div className="card-body p-0 border-1 h-100">
                                    <div className="d-flex text-start h-100">
                                        <div className=" p-0 start" style={{ height: '180px', overflow: 'hidden', width: '45%' }}>
                                            <img src={`src/assets/image/${o.image}`} alt="" className='w-100' />
                                        </div>
                                        <div className='f-14 p-2' style={{ overflow: 'hidden', width: '65%' }}>
                                            <div className='f-16 text-title' >
                                                {o.productName}
                                            </div>
                                            <div className=''> <span className=''>prepare : </span>{o.prepareTime} min</div>
                                            <div className='' style={{ maxHeight: '70px', overflow: 'hidden' }}>Sugar : {o.sugar} G</div>
                                            <div className=''><span className=''>Price : </span> <span className=''>${o.price}</span></div>
                                            <textarea name="" className='border-0 text-secondary w-100 py-2 h-100 f-10' id="" value={o.description} readOnly></textarea>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        )
    }
    function listTable() {
        return (
            <div className="card border-0 w-100">
                <div className="card-body p-0 border rounded" style={{ overflowX: 'scroll' }}>
                    <table className="table table-hover">
                        <thead valign='middle'>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </td>
                                <td className='py-3'>No</td>
                                <td>ProductName</td>
                                <td>Price</td>
                                <td>Calories</td>




                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((f, i) =>
                                    <tr className="pointer" onClick={() => goto(`/item-detail`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{f.productName}</td>
                                        <td>{f.price}</td>
                                        <td>{f.calories}</td>


                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }


    function setView(index) {
        if (index == 1) {
            setItemView(() => listCard())
        } else {
            setItemView(() => listTable())
        }
    }
    function menu() {
        return (
            <>
                <div className="w-100 ">
                    <div className="d-flex px-2 py-3 rounded">
                        <div className='d-flex start w-50'>
                            <Link className="btn btn-success box-shadow px-3" to='/create-item'>
                                <span className='pe-2'><i class="fa-solid fa-circle-plus"></i></span>
                                <span className=''>New</span>
                            </Link>
                            <div class="btn-group ms-3" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary"><span className='pe-2'><i class="fa-solid fa-print"></i></span>Print</button>
                                <button type="button" class="btn btn-outline-secondary"><span className='pe-2'><i class="fa-solid fa-file-export"></i></span>Export</button>
                            </div>

                        </div>
                        <div className='d-flex end w-50'>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary" onClick={() => setView(2)}><span className='pe-2'><i class="fa-solid fa-list"></i></span> List</button>
                                <button type="button" class="btn btn-outline-secondary" onClick={() => setView(1)}> <span className='pe-2'><i class="fa-brands fa-microsoft"></i></span>Card</button>
                            </div>
                        </div>


                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='w-100'>
                <div className="container-fluid p-0 ">
                    <div className='container-fluid'>
                        {menu()}
                    </div>

                </div>
                <div className="center">
                    {itemView}
                </div>

            </div>
        </>
    )
}

export default Item
