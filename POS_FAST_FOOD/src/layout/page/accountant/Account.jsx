import { useEffect, useState } from "react"
import { getAllAccount } from "../../../api/Account";
import { getAllAccountType } from "../../../api/AccountType";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
const Account = () => {
    const [account, setAccount] = useState([]);
    const [accountType, setAccountType] = useState([]);
    useEffect(() => {
        getAllAccount().then((response) => {
            setAccount(response.data);
        })
        getAllAccountType().then((response) => {
            setAccountType(response.data);
        })
    }, [])
    function getAccountTypeName(id) {
        const objAccountType = accountType.find(a => a.id == id);
        return objAccountType.accountType;
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
                            <Link className="btn btn-success box-shadow px-3" to='/make-account'>
                                <span className='pe-2'><i class="fa-solid fa-circle-plus"></i></span>
                                <span className=''>New</span>
                            </Link>
                            <div class="btn-group ms-3" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-outline-secondary"><span className='pe-2'><i class="fa-solid fa-print"></i></span>Print</button>
                                <button type="button" class="btn btn-outline-secondary" onClick={() => ExportExcel(account, "account_data")}><span className='pe-2'><i class="fa-solid fa-file-export"></i></span>Export</button>
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
                        <div className="card border-0">

                            <div className="card-body p-0">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr >
                                            <td className="py-3">No</td>
                                            <td>Code</td>
                                            <td>AccountName</td>
                                            <td>Account Type</td>
                                            <td>Currency</td>
                                            <td>Branch</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            account.map((a, i) =>
                                                <tr key={i} className="py-3 pointer">
                                                    <td className="py-3">{i + 1}</td>
                                                    <td>{a.code}</td>
                                                    <td>{a.accountName}</td>
                                                    <td>{getAccountTypeName(a.accountTypeId)}</td>
                                                    <td>{a.currency}</td>
                                                    <td>Nurak Company's</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
