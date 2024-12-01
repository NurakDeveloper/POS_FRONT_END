import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllCategory } from '../../../api/Category'
import { DataGrid, Tbody, Td, Th, Thead, Tr } from '../../../components/table/DataGrid'
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter, FaThList, FaThLarge } from "react-icons/fa";
const Category = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategory().then((response) => {
            setCategories(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedData = [...categories].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setCategories(sortedData);
    };
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
            <>
                <DataGrid>
                    <table>
                        <Thead>
                            <Th resizable columnWidth={50}>
                                <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                            </Th>
                            <Th
                                onSort={() => handleSort("id")}
                                sortDirection={sortConfig.key === "id" ? sortConfig.direction : ""}
                                resizable
                                columnWidth={50}
                            >
                                No
                            </Th>
                            <Th
                                onSort={() => handleSort("name")}
                                sortDirection={
                                    sortConfig.key === "name" ? sortConfig.direction : ""
                                }
                                resizable
                            // columnWidth={150}

                            >
                                Category
                            </Th>
                            <Th
                                onSort={() => handleSort("description")}
                                sortDirection={
                                    sortConfig.key === "description" ? sortConfig.direction : ""
                                }
                                resizable
                            >
                                Description
                            </Th>


                        </Thead>
                        <Tbody>
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
                        </Tbody>
                    </table>
                </DataGrid>
            </>
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
    function menu() {
        return (
            <div className="list-header-container">
                {/* Left Section */}
                <div className="list-header-left">
                    {/* Add New Button */}
                    <button className="list-header-button add-new box-shadow" >
                        <FaPlus className="list-header-icon" />
                        Add New
                    </button>
                    <button className="list-header-button print box-shadow">
                        <FaPrint className="list-header-icon" />
                        Print
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button export box-shadow">
                        <FaFileExport className="list-header-icon" />
                        Export
                    </button>

                    {/* Search Input */}

                </div>
                <div className="list-header-right">
                    <div className="list-header-search">
                        <FaSearch className="list-header-icon search-icon" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="list-header-input"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="list-header-right">
                    {/* Print Button */}

                    <button className="list-header-button list box-shadow" onClick={() => setView(2)}>
                        <FaThList className="list-header-icon" />
                        List
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button list box-shadow" onClick={() => setView(1)}>
                        <FaThLarge className="list-header-icon" />
                        Card
                    </button>
                    {/* Filter Button */}
                    <button className="list-header-button filter box-shadow">
                        <FaFilter className="list-header-icon" />
                        Filter
                    </button>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className='container-fluid'>
                <div className="row">
                    <div className=''>
                        {menu()}
                    </div>
                    <div className=" col-12">
                        {listTable()}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Category
