import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllProduct } from '../../../api/Product'
import Loading from '../loading/Loading'
import { DataGrid, Tbody, Td, Th, Thead, Tr } from '../../../components/table/DataGrid'
import { getAllCategory } from '../../../api/Category'
import { getAllBranch } from '../../../api/Branch'
import ListHeader from '../../../components/listheader/ListHeader'
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter, FaThList, FaThLarge } from "react-icons/fa";
import { hostName } from '../../../api/host'
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

const Item = () => {
    const [product, setProduct] = useState([]);
    const [itemView, setItemView] = useState();
    const [category, setCategories] = useState([]);
    const [branch, setBranch] = useState([]);
    const domainName = hostName();
    useEffect(() => {
        setView(2);
    }, [product])
    useEffect(() => {
        getAllProduct().then((respnse) => {
            setProduct(respnse.data);
            console.log(respnse.data);
        }).catch(error => {
            console.error(error);
        })
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
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedData = [...product].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setProduct(sortedData);
    };
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
                                            <img src={`http://${domainName}:8085/api/images/${o.image}`} alt="Image" className='w-100' />
                                        </div>
                                        <div className='f-14 p-2' style={{ overflow: 'hidden', width: '65%' }}>
                                            <div className='f-16 text-title' >
                                                {o.productName}
                                            </div>
                                            <div className='text-secondary f-14'>{findCategoryName(o.categoryId)}</div>
                                            <div className=''><span class="f-10 badge text-bg-danger">Price : ${o.price}</span></div>
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
            <>
                <DataGrid>
                    <table>
                        <Thead>
                            <Th
                                onSort={() => handleSort("id")}
                                sortDirection={sortConfig.key === "id" ? sortConfig.direction : ""}
                                resizable
                                columnWidth={50}
                            >
                                No
                            </Th>
                            <Th
                                onSort={() => handleSort("productName")}
                                sortDirection={
                                    sortConfig.key === "productName" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={150}
                            >
                                ProductName
                            </Th>
                            <Th
                                onSort={() => handleSort("price")}
                                sortDirection={
                                    sortConfig.key === "price" ? sortConfig.direction : ""
                                }
                                columnWidth={70}
                                resizable
                            >
                                Price
                            </Th>
                            <Th resizable columnWidth={200}>Description</Th>
                            <Th
                                onSort={() => handleSort("categoryId")}
                                sortDirection={
                                    sortConfig.key === "categoryId" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={120}
                            >
                                Category
                            </Th>

                            <Th
                                onSort={() => handleSort("branchId")}
                                sortDirection={
                                    sortConfig.key === "branchId" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={100}

                            >
                                BranchId
                            </Th>
                            <Th
                                onSort={() => handleSort("prepareTime")}
                                sortDirection={
                                    sortConfig.key === "prepareTime" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={70}
                            >
                                PrepareTime
                            </Th>
                            <Th
                                onSort={() => handleSort("calories")}
                                sortDirection={
                                    sortConfig.key === "calories" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={70}
                            >
                                Calories
                            </Th>
                            <Th
                                onSort={() => handleSort("status")}
                                sortDirection={
                                    sortConfig.key === "status" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={60}

                            >
                                Status
                            </Th>
                            <Th
                                onSort={() => handleSort("productOrigin")}
                                sortDirection={
                                    sortConfig.key === "productOrigin" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={100}
                            >
                                ProductOrigin
                            </Th>
                            <Th
                                onSort={() => handleSort("sugar")}
                                sortDirection={
                                    sortConfig.key === "sugar" ? sortConfig.direction : ""
                                }
                                resizable
                                columnWidth={70}
                            >
                                Sugar
                            </Th>
                            <Th resizable columnWidth={50}>Action</Th>
                        </Thead>
                        <Tbody>
                            {product.map((item) => (
                                <tr key={item.id}>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.id}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.productName}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{formatCurrency.format(item.price)}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.description}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{findCategoryName(item.categoryId)}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{findBranchName(item.branchId)}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.prepareTime} <span className='text-secondary'>Min</span></td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.calories} </td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.status}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.productOrigin}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.sugar} <span className='text-secondary'>G</span></td>
                                    <td><i class="fa-solid fa-trash-can pointer remove"></i></td>
                                </tr>
                            ))}
                        </Tbody>
                    </table>
                </DataGrid>
            </>
        )
    }
    const ExportExcel = (data, fileName) => {
        // 1. Convert data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // 2. Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 3. Write the workbook to an Excel file
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });


    function setView(index) {
        if (index == 1) {
            setItemView(() => listCard())
        } else {
            setItemView(() => listTable())
        }
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set a timeout to hide the loading screen after 0.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []);
    function menu() {
        return (
            <div className="list-header-container">
                {/* Left Section */}
                <div className="list-header-left">
                    {/* Add New Button */}
                    <button className="list-header-button add-new box-shadow" onClick={() => goto('/create-item')}>
                        <FaPlus className="list-header-icon" />
                        Add New
                    </button>
                    <button className="list-header-button print box-shadow">
                        <FaPrint className="list-header-icon" />
                        Print
                    </button>

                    {/* Export Button */}
                    <button className="list-header-button export box-shadow" onClick={() => ExportExcel(product, "product-data")}>
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
            <div className='w-100'>
                <div className="container-fluid p-0 ">
                    <div className='container-fluid p-0'>
                        {menu()}
                        {/* <ListHeader /> */}

                    </div>

                </div>
                <div>
                    {isLoading ? (
                        // Loading Screen
                        <Loading />
                    ) : (
                        // Main Content
                        <div className="center">
                            {itemView}
                            {/* {listTable()} */}
                        </div>
                    )}
                </div>




            </div>
        </>
    )
}

export default Item
