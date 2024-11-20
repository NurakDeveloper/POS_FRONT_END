import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllJournal } from '../../../api/JournalE';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
const Journal = () => {

    const [journal, setJounal] = useState([])
    useEffect(() => {
        getAllJournal().then((response) => {
            setJounal(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en', {
            weekday: 'long',   // Full day of the week (e.g., "Monday")
            day: '2-digit',    // Two-digit day (e.g., "07")
            month: 'numeric',     // Full month name (e.g., "November")
            year: 'numeric'    // Full year (e.g., "2024")
        }).format(date); // 'dd' for day, 'MMMM' for full month, 'yy' for year
    };

    const goto = useNavigate();

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
                                <td>Date</td>
                                <td>Reference</td>
                                <td>Journal</td>
                                <td>Total</td>
                                <td>Status</td>
                                <td>Company</td>



                            </tr>
                        </thead>
                        <tbody>
                            {
                                journal.map((j, i) =>
                                    <tr className="pointer" onClick={() => goto(`/journal-detail/${j.id}`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{formatDate(j.date)}</td>
                                        <td>{j.reference}</td>
                                        <td>POS</td>
                                        <td>{formatCurrency.format(j.total)}</td>
                                        <td>{j.status}</td>
                                        <td>Nurak Company's</td>


                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
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

    function menu() {
        return (
            <>
                <div className="w-100 ">
                    <div className="d-flex px-2 py-3 rounded">
                        <div className='d-flex start w-50'>
                            <Link className="btn btn-success box-shadow px-3" to='/make-journal'>
                                <span className='pe-2'><i class="fa-solid fa-circle-plus"></i></span>
                                <span className=''>New</span>
                            </Link>
                            <div class="btn-group ms-3" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary"><span className='pe-2'><i class="fa-solid fa-print"></i></span>Print</button>
                                <button type="button" class="btn btn-outline-secondary" onClick={() => ExportExcel(journal, "journal_data")}><span className='pe-2'><i class="fa-solid fa-file-export"></i></span>Export</button>
                            </div>

                        </div>
                        <div className='d-flex end w-50'>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary" ><span className='pe-2'><i class="fa-solid fa-list"></i></span> List</button>
                                <button type="button" class="btn btn-outline-secondary" > <span className='pe-2'><i class="fa-brands fa-microsoft"></i></span>Card</button>
                            </div>
                        </div>


                    </div>
                </div>
            </>
        )
    }

    return (
        <>

            <div>
                {menu()}
                <div className="row">
                    <div className="col-12">
                        {listTable()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Journal
