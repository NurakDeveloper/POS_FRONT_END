import { useEffect, useState } from "react";
import { getJournalByID } from "../../../api/JournalE";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { getAllAccount } from "../../../api/Account";
const JournalDetail = () => {

    const { id } = useParams();
    const [account, setAccount] = useState([]);
    const [journalData, setJournalData] = useState({
        "journal": '',
        "branchId": '',
        "partnerId": '',
        "date": '',
        "total": 0,
        "reference": '',
        "status": "Posted"
    });
    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const simpleFormatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "yyyy-mm-dd"); // 'dd' for day, 'MMMM' for full month, 'yy' for year
    };
    const [transactionss, setTransaction] = useState([]);
    useEffect(() => {
        if (id) {
            getJournalByID(id).then((reponse) => {
                setJournalData((prevData) => ({
                    ...prevData,
                    ["journal"]: reponse.data.journalEntries.journal,
                    ["branchId"]: reponse.data.journalEntries.branchId,
                    ["partnerId"]: reponse.data.journalEntries.partnerId,
                    ["date"]: reponse.data.journalEntries.date,
                    ["total"]: reponse.data.journalEntries.total,
                    ["reference"]: reponse.data.journalEntries.reference,
                    ["status"]: reponse.data.journalEntries.status,

                }));
                setTransaction(reponse.data.transactions)
            })
            getAllAccount().then((response) => {
                setAccount(response.data);
            }).catch(e => {
                console.error(e);
            })


        }
    }, [])

    function getAccountName(id) {
        const findAccount = account.find(f => f.id == id);
        return findAccount.code + '  ' + findAccount.accountName;
    }

    return (
        <>

            <div>
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-xl-9" style={{ height: '900px' }}>
                            <div class="btn-group my-2" role="group" aria-label="Basic example">

                                <button type="button" class="btn btn-outline-secondary px-4" ><i class="fa-solid fa-floppy-disk"></i></button>
                                <button type="button" class="btn btn-outline-secondary"><i class="fa-solid fa-circle-xmark"></i></button>
                            </div>
                            <div className="border bg-white w-100 rounded">
                                <div className="d-flex h-100" >
                                    <div className='start w-50 p-2'>
                                        <div className='w-100 px-4'>
                                            <div className="fs-2">
                                                <p></p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex">
                                    <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='references' className='w-25 text-start'>Reference  </label>
                                            <p className="w-75">{journalData.reference}</p>
                                        </div>

                                    </div>
                                    <div className='d-block text-start bg-white px-4 py-2 w-50 mt-1'>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='references' className='w-25 text-start'>Date  </label>
                                            <p className="w-75">{journalData.date}</p>
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='references' className='w-25 text-start'>Date  </label>
                                            <p className="w-75">{journalData.journal}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className='bg-white py-3'>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="text-dark nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Journal Item</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Note</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content border-0" id="myTabContent">
                                        <div class="border-0 tab-pane show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                            <div className="p-0">
                                                <table className="table table-striped table-hover w-100 p-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="py-3">Account</th>
                                                            <th className="py-3">Label</th>
                                                            <th className="py-3">Debit</th>
                                                            <th className="py-3">Credit</th>
                                                            <th className="py-3">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            transactionss.map(t =>
                                                                <tr className="pointer">
                                                                    <td className="py-3">{getAccountName(t.accountId)}</td>
                                                                    <td>{t.label}</td>
                                                                    <td>{formatCurrency.format(t.debit)}</td>
                                                                    <td>{formatCurrency.format(t.credit)}</td>
                                                                    <td>Remove</td>
                                                                </tr>
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                                            {/* <p className='w-100'>{productData.description}</p> */}

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-md-3" style={{ height: '900px' }}>
                            <div className="card border-0 rounded bg-white h-100 w-100 p-2">
                                <div className='d-flex p-2 border rounded start pointer' style={{ height: '90px' }}>
                                    <div className="admin-img center" style={{ height: '90%' }}>
                                        <img src="https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_640.jpg" alt="" className='h-100' />
                                    </div>
                                    <div className="text f-14 px-3">
                                        <div className='f-16'>Dara Chhun</div>
                                        <div className='text-secondary'>Seller / pos</div>
                                        <div className='f-16 hover-line pointer'>mobile : +885990340943</div>
                                    </div>
                                </div>
                                <div className='d-flex p-2 border rounded start pointer mt-2' style={{ height: '90px' }}>
                                    <div className="admin-img center" style={{ height: '90%' }}>
                                        <img src="https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_640.jpg" alt="" className='h-100' />
                                    </div>
                                    <div className="text f-14 px-3">
                                        <div className='f-16'>General</div>
                                        <div className='text-secondary'>membership : no</div>
                                        <div className='f-16 hover-line pointer'>Contact : +885990340943</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >

        </>
    )
}





export default JournalDetail
