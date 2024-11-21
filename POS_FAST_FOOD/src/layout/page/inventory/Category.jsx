import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllCategory } from '../../../api/Category'
const Category = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategory().then((response) => {
            setCategories(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])

    const goto = useNavigate();
    function listCard() {
        return (
            <div className="row w-100">
                {
                    categories.map(o =>
                        <div className="col-xl-4 col-sm-12">
                            <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                                onClick={() => goto(`/customer-detail`)}
                                style={{ height: '150px' }}
                            >
                                <div className="card-body p-0 inv-card rounded ">
                                    <div className="d-flex">
                                        <div className="w-25 start ">
                                            <div className="center rounded box-shadow" style={{ height: '150px', overflow: 'hidden' }}>
                                                <img src={o.image} alt="" className='h-100 rounded' />
                                            </div>
                                        </div>
                                        <div className='font-12 w-75 ps-4 py-3'>
                                            <div className='fs-5'>{o.name}</div>
                                            <div className='font-12 text-secondary'>{o.description} min</div>
                                            <div className='text-start'>12 Product</div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    function listTable() {
        return (
            <div className="card border-0">
                <div className="card-body p-0 border">
                    <table className="table table-striped table-hover">
                        <thead valign='middle'>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </td>
                                <td className='py-3'>No</td>
                                <td>Name</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((f, i) =>
                                    <tr className="pointer" onClick={() => goto(`/item-detail`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{f.name}</td>
                                        <td>{f.description}</td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
    const [itemView, setItemView] = useState();
    useEffect(() => {
        setView(1);
    }, [])
    function setView(index) {
        if (index == 1) {
            setItemView(() => listCard())
        } else {
            setItemView(() => listTable())
        }
    }
    return (
        <>
            <div>
                <div className="row">
                    <div className=" col-12">
                        {listTable()}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Category
