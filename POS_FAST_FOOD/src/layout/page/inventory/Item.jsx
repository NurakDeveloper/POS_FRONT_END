import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllProduct, removeProductById } from '../../../api/Product'
import Loading from '../loading/Loading'
import { DataGrid, Tbody, Td, Th, Thead, Tr } from '../../../components/table/DataGrid'
import { getAllCategory } from '../../../api/Category'
import { getAllBranch } from '../../../api/Branch'
import ListHeader from '../../../components/listheader/ListHeader'
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter, FaThList, FaThLarge, FaUserEdit } from "react-icons/fa";
import { hostName } from '../../../api/host'
import { format, set } from 'date-fns';
import * as XLSX from 'xlsx';
import RemoveLoading from '../loading/RemoveLoading'
import { RiEditFill } from 'react-icons/ri'
import { id } from 'date-fns/locale'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
const Item = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);
    const [product, setProduct] = useState([]);
    const [itemView, setItemView] = useState();
    const [category, setCategories] = useState([]);
    const [branch, setBranch] = useState([]);
    const domainName = hostName();
    const [productId, setProductId] = useState();
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
    function findStatus(value) {
        if (value == 1) {
            return (
                <>
                    <span class="text-badges-green"><i class="fa-solid fa-check"></i> Active</span>

                </>
            )
        } else if (value == 2) {
            return (
                <>
                    <span class="text-badges-danger"><i class="fa-solid fa-check"></i>None Active</span>
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
            <div className="row w-100 p-0 animation-opacity">
                {
                    currentData.map(o =>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-1">
                            <div className="card bg-white p-0 pointer mb-1"
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
                                            <div className='py-2'><span class="f-14 text-badges-red">Price : ${o.price}</span></div>
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
    const rowsPerPage = 15; // Define how many rows to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the categories array to display only the current page's rows
    const currentData = product.slice(startIndex, endIndex);

    // Total number of pages
    const totalPages = Math.ceil(product.length / rowsPerPage);
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    function listTable() {
        return (
            <div className='animation-opacity pe-1 '>
                <DataGrid>
                    <table >
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
                                columnWidth={100}
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
                                columnWidth={150}

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
                                columnWidth={100}

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
                            <Th columnWidth={100}>Action</Th>
                        </Thead>
                        <Tbody>
                            {currentData.map((item) => (
                                <tr key={item.id}>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.id}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.productName}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}> <span className='text-badges-red bold'>{formatCurrency.format(item.price)}</span></td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.description}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{findCategoryName(item.categoryId)}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}> <span className='text-badges-warning'>{findBranchName(item.branchId)}</span></td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.prepareTime} <span className='text-secondary'>Min</span></td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.calories} </td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{findStatus(item.status)}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.productOrigin}</td>
                                    <td onClick={() => goto(`/item-detail/${item.id}`)}>{item.sugar} <span className='text-secondary'>G</span></td>
                                    <td>
                                        <div className="between">
                                            <span className='pointer text-badges-danger' onClick={() => {
                                                setProductId(item.id);
                                                setIsLoadingRemove(true);
                                            }}>
                                                <i class="fa-solid fa-trash-can " ></i>
                                            </span>
                                            <span className='pointer text-badges-green' onClick={() => goto(`/update-item/${id}`)}>
                                                <RiEditFill />
                                            </span>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </Tbody>
                    </table>
                </DataGrid>
            </div>
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
            setIsLoading(true);
            setItemView(() => listCard())
        } else {
            setIsLoading(true)
            setItemView(() => listTable())
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
    useEffect(() => {
        // Set a timeout to hide the loading screen after 0.5 seconds
        const timer = setTimeout(() => {
            setIsLoadingRemove(false);
        }, 8000);
        // Cleanup the timer
        return () => {
            clearTimeout(timer)

        };

    }, [isLoadingRemove]);

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
                    <span className="page-info f-14 text-secondary">
                        {currentPage} / {totalPages}
                    </span>
                    <div className="pagination">
                        <div className='pe-2'>
                            <button
                                className="button previous"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                <SlArrowLeft />
                            </button>
                        </div>

                        <button
                            className="button next"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            <SlArrowRight />
                        </button>
                    </div>
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

    function removeProduct(id) {
        if (id) {
            // removeProductById(id).then((respnse) => {
            //     console.log(respnse.data);
            // }).catch(e => {
            //     console.error(e);
            // })
            alert('product' + id + 'has been removed')
        }
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
                        <>
                            <Loading />
                        </>
                    ) : (
                        // Main Content
                        <div className="center">
                            {itemView}
                            {/* {listTable()} */}
                        </div>
                    )}
                </div>

                {isLoadingRemove ? (
                    // Loading Screen
                    <>
                        <div className="fixed-top">
                            <div className='center'>
                                <div className='p-3 box-shadow bg-white mt-4'>
                                    <RemoveLoading />
                                    <div className="" style={{
                                        width: '340px',
                                        // width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <button className='button add px-5' onClick={() => setIsLoadingRemove(false)}><i class="fa-solid fa-xmark pe-2"></i>No</button>
                                        <button className='button preview px-5' onClick={() => {
                                            setIsLoadingRemove(false);
                                            removeProduct(productId);
                                            setProductId();
                                        }}><i class="fa-solid fa-check pe-2"></i>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                ) : (
                    // Main Content
                    <>
                        {/* {alert("successfull ")} */}
                    </>
                )}




            </div>
        </>
    )
}

export default Item
