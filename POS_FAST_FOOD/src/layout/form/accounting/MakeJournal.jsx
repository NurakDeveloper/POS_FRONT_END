import { useEffect, useState } from "react";
import { createJournal, createTransaction } from "../../../api/JournalE";
import { getAllAccount } from "../../../api/Account";
import { set } from "date-fns";

const MakeJournal = () => {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [account, setAccount] = useState([]);
    const [acName, setAcName] = useState([])

    useEffect(() => {
        getAllAccount().then((reponse) => {
            setAccount(reponse.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    function findTotal() {
        let sum = 0;
        for (let i = 0; i < rows.length; i++) {
            sum = sum + parseFloat(rows[i].debit); // Convert to float and handle NaN with || 0
        }
        return sum;// Set total with two decimal places
    }
    const [journalData, setJournalData] = useState({
        "journal": '',
        "branchId": '',
        "partnerId": '',
        "date": '',
        "total": 0,
        "reference": '',
        "status": "Posted"
    });

    // Function to add a new row
    const addRow = () => {
        setRows([...rows, {
            "journalEntriesId": '',
            "accountId": '',
            "label": '',
            "debit": 0,
            "credit": 0
        }]);
        setAcName([...acName, {
            name: ''
        }])

    };

    // Function to handle input changes
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);

    };
    useEffect(() => {
        setJournalData({ ...journalData, ["total"]: findTotal() });
    }, [rows])


    function handleChanges(e) {
        const { name, value } = e.target;
        setJournalData({ ...journalData, [name]: value });

    }
    const saveJournal = (e) => {
        e.preventDefault();
        createJournal(journalData).then((response) => {
            for (let i = 0; i < rows.length; i++) {
                const updatedRows = [...rows];

                updatedRows[i]["journalEntriesId"] = response.data.id;
                setRows(updatedRows);
                createTransaction(rows[i]).then((responseT) => {
                    console.log(responseT.data);
                    setJournalData({
                        "journal": '',
                        "branchId": '',
                        "partnerId": '',
                        "date": '',
                        "total": 0,
                        "reference": '',
                        "status": "Posted"
                    });
                })

            }
        })

    }

    return (
        <>

            <div>
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-xl-9" style={{ height: '900px' }}>
                            <div class="btn-group my-2" role="group" aria-label="Basic example">

                                <button type="button" class="btn btn-outline-secondary px-4" onClick={saveJournal}><i class="fa-solid fa-floppy-disk"></i></button>
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
                                            <input type="text" id='reference' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                name='reference'
                                                value={journalData.reference}
                                                onChange={handleChanges}
                                            />
                                        </div>

                                    </div>
                                    <div className='d-block text-start bg-white px-4 py-2 w-50 mt-1'>

                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='j-date' className='w-25 text-start'>Date  </label>
                                            <input type="date" id='j-date' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                name='date'
                                                value={journalData.date}
                                                onChange={handleChanges}
                                            />
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='j-date' className='w-25 text-start'>Journal  </label>
                                            <input type="text" id='j-date' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                name='journal'
                                                value={journalData.journal}
                                                onChange={handleChanges}
                                            />
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
                                        <div class="border-0 tab-pane show active " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                            <div className="p-3">
                                                <table className="table-striped table-hover w-100">
                                                    <thead>
                                                        <tr className="border">
                                                            <th className="py-3 ps-2">Account</th>
                                                            <th className="py-3">Label</th>
                                                            <th className="py-3">Debit</th>
                                                            <th className="py-3">Credit</th>
                                                            <th className="py-3">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row, index) => (
                                                            <tr key={index}>
                                                                <td className="py-3" style={{ width: '400px' }}>
                                                                    <div className="dropdown">
                                                                        <button
                                                                            className="btn p-1 w-100 d-flex text-secondary input-box rounded-0"
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <p className="w-75 text-start text-title">
                                                                                {acName[index] ? acName[index].name : "Select Account"}
                                                                            </p>
                                                                            <i className="w-25 text-end">&#10141;</i>
                                                                        </button>
                                                                        <ul className="dropdown-menu w-100 box-shadow">
                                                                            {account.map(a => (
                                                                                <li key={a.id}>
                                                                                    <a
                                                                                        className="dropdown-item pointer"
                                                                                        onClick={() => {
                                                                                            const updatedRows = [...rows];
                                                                                            updatedRows[index]["accountId"] = a.id;

                                                                                            // Set the selected account name for the specific row
                                                                                            const updatedAcName = [...acName];
                                                                                            updatedAcName[index] = { name: a.code + " " + a.accountName };

                                                                                            setRows(updatedRows);
                                                                                            setAcName(updatedAcName);
                                                                                        }}
                                                                                    >
                                                                                        <span className="text-secondary">{a.code}</span> {" "}{a.accountName}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        name="label"
                                                                        value={row.label || ""}
                                                                        onChange={(e) => handleChange(index, e)}
                                                                        className="input-box w-100"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        name="debit"
                                                                        value={row.debit}
                                                                        onChange={(e) => handleChange(index, e)}
                                                                        className="input-box w-100"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="number"
                                                                        name="credit"
                                                                        value={row.credit}
                                                                        onChange={(e) => handleChange(index, e)}
                                                                        className="input-box w-100"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <span className="pointer" onClick={() => removeRow(index)}>
                                                                        Remove
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                                <button className="btn border-0 border-bottom w-100" onClick={addRow}>Add Row</button>
                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                                            {/* <p className='w-100'>{productData.description}</p> */}

                                        </div>

                                    </div>
                                </div>

                            </div>
                            <h6 className="bg-white text-end p-3">Total : {total}</h6>
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





export default MakeJournal
