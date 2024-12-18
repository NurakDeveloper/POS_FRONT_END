import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteCategoryById, getAllCategory } from '../../../api/Category'
import { DataGrid, Tbody, Td, Th, Thead, Tr } from '../../../components/table/DataGrid'
import { FaPlus, FaSearch, FaPrint, FaFileExport, FaFilter, FaThList, FaThLarge } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { RiEditFill } from 'react-icons/ri'
import RemoveMessage from '../../../components/alert/RemoveMessage'
import { hostName } from '../../../api/host'
const Category = () => {

    const [categories, setCategories] = useState([]);
    const domainName = hostName();
    const categoryPathImage = `http://${domainName}:8085/api/images/`;
    useEffect(() => {
        getCategory();
    }, [])
    function getCategory() {
        getAllCategory().then((response) => {
            setCategories(response.data);
        }).catch(e => {
            console.error(e);
        })
    }
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
    const rowsPerPage = 15; // Define how many rows to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last item on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the categories array to display only the current page's rows
    const currentData = categories.slice(startIndex, endIndex);

    // Total number of pages
    const totalPages = Math.ceil(categories.length / rowsPerPage);

    // Handle Next and Previous button clicks
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
    const [isRemoveCategories, setIsRemoveCategories] = useState(false);
    const [categoryId, setCategoryId] = useState();
    function removeCategroy(id) {
        deleteCategoryById(id).then((reponse) => {
            getCategory()
        }).catch(e => {
            alert(e);
        })
    }
    function listTable() {


        return (
            <>
                <DataGrid>
                    <table>
                        <Thead>
                            <Th columnWidth={20}>
                                <input type="checkbox" name="" className="rounded-0 border px-3" id="" />
                            </Th>
                            <Th
                                onSort={() => handleSort("id")}
                                sortDirection={sortConfig.key === "id" ? sortConfig.direction : ""}
                                columnWidth={20}
                            >
                                No
                            </Th>
                            <Th
                                onSort={() => handleSort("name")}
                                sortDirection={
                                    sortConfig.key === "name" ? sortConfig.direction : ""
                                }
                                resizable
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
                            <Th columnWidth={30}>
                                Action
                            </Th>
                        </Thead>
                        <Tbody>
                            {currentData.map((f, i) => (
                                <Tr
                                    key={f.id}
                                    className="pointer"
                                    onClick={() => goto(`/item-detail`)}
                                >
                                    <Td>
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="rounded-0 border px-3"
                                            id=""
                                        />
                                    </Td>
                                    <Td className="py-3">{startIndex + i + 1}</Td>
                                    <Td>
                                        <div className="d-flex start">
                                            <div className="" style={{ height: '40px' }}>
                                                <img src={`${categoryPathImage}${f.image}`} alt="" className="h-100" />
                                            </div>
                                            <div className='ps-3'>
                                                {f.name}
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>{f.description}</Td>
                                    <td>
                                        <div className="between">
                                            <span className='pointer text-badges-danger' onClick={() => {
                                                setCategoryId(f.id);
                                                setIsRemoveCategories(true);
                                            }}>
                                                <i class="fa-solid fa-trash-can " ></i>
                                            </span>
                                            <span className='pointer text-badges-green' onClick={() => navigate(`/update-category/${f.id}`)}>
                                                <RiEditFill />
                                            </span>

                                        </div>
                                    </td>
                                </Tr>
                            ))}
                        </Tbody>
                    </table>
                </DataGrid>
                {/* Pagination Controls */}

            </>
        );
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
    const navigate = useNavigate();
    function menu() {
        return (
            <div className="list-header-container">
                {/* Left Section */}
                <div className="list-header-left">
                    {/* Add New Button */}
                    <button className="list-header-button add-new box-shadow" onClick={() => navigate('/create-category')}>
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
    return (
        <>
            <div className='container-fluid p-0 center'>
                <div className="row">
                    <div className=''>
                        {menu()}
                    </div>
                    <div className=" col-12">
                        {listTable()}
                    </div>

                </div>
            </div>
            <RemoveMessage
                isOpen={isRemoveCategories}
                message='Are you sure ?'
                description='A confirmation message is intended to prompt users before proceeding with a delete action. It clearly informs them of the irreversible nature of the deletion to prevent accidental loss of data or content.'
                cancelClcik={() => setIsRemoveCategories(false)}
                acceptedClick={() => {
                    removeCategroy(categoryId)
                    setIsRemoveCategories(false)
                }}
            />
        </>
    )
}

export default Category
