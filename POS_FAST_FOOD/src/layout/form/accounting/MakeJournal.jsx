import { useEffect, useState } from "react";
import { createJournal, createTransaction } from "../../../api/JournalE";
import { getAllAccount } from "../../../api/Account";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IoSaveSharp } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Th } from "../../../components/table/DataGrid";
import { getBranchId } from "../../../api/Branch";
import { Key } from "@mui/icons-material";
import InputValidation from "../../../components/input/InputValidation";
const MakeJournal = () => {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [account, setAccount] = useState([]);
    const [acName, setAcName] = useState([])
    const branchId = getBranchId();
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
        "branchId": branchId,
        "partnerId": '',
        "date": '',
        "total": 0,
        "reference": '',
        "status": "Posted"
    });
    const [errors, setError] = useState([]);
    function validation() {
        const newError = {};
        // if (!journalData.branchId) {
        //     newError.branch = 'Branch is not found';
        // }
        if (!journalData.journal) {
            newError.journal = 'journal is require';
        }
        if (!journalData.reference) {
            newError.reference = 'reference is require';
        }


        setError(newError);
        return Object.keys(newError).length === 0;
    }

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
        // setJournalData({ ...journalData, ["total"]: findTotal() });
    }
    const saveJournal = (e) => {
        e.preventDefault();
        if (!validation()) {
            return
        }
        createJournal(journalData).then((response) => {
            for (let i = 0; i < rows.length; i++) {
                const updatedRows = [...rows];

                updatedRows[i]["journalEntriesId"] = response.data.id;
                setRows(updatedRows);
                createTransaction(rows[i]).then((responseT) => {
                    alert(JSON.stringify(responseT.data));

                    setJournalData({
                        "journal": '',
                        "branchId": '',
                        "partnerId": '',
                        "date": '',
                        "total": 0,
                        "reference": '',
                        "status": "Posted"
                    });
                    setRows([{
                        "journalEntriesId": '',
                        "accountId": '',
                        "label": '',
                        "debit": 0,
                        "credit": 0
                    }]);
                })

            }
        }).catch(e => {
            console.error(e);
        })

    }
    function preview(e) {
        e.preventDefault();
        alert(JSON.stringify(rows, null, 2));
    }
    const navigate = useNavigate();


    function formHeader() {
        return (
            <div className='form-header-content px-0 pt-2'>
                <button type="button" class="button cancel box-shadow " onClick={() => navigate('/journal')}><IoIosArrowRoundBack /><span className='px-2'>Cancel</span> </button>
                <div className='d-flex'>
                    <button type="button" class="button preview box-shadow " onClick={preview}><i class="fa-solid fa-circle-info px-2"></i>Preview </button>
                    <div className='px-3 pe-0'>
                        <button type="button" class="button add box-shadow px-4" onClick={saveJournal}><IoSaveSharp /><span className='px-2'>Save</span> </button>
                    </div>
                </div>


            </div>
        );
    }

    return (
        <>

            <div className="container">
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-12">
                            {formHeader()}
                            <div className="border bg-white w-100 rounded">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className='d-block text-start fs-6 bg-white px-4 py-2'>
                                            {/* <div className='group-input center w-100 pb-3' style={{ fontSize: 14 }}>
                                                <label htmlFor='references' className='w-25 text-start'>Reference <span className="text-danger">*</span>  </label>
                                                <input type="text" id='reference' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                    name='reference'
                                                    value={journalData.reference}
                                                    onChange={handleChanges}
                                                />
                                            </div> */}
                                            <InputValidation
                                                label="Reference"
                                                id="reference"
                                                type='text'
                                                name='reference'
                                                value={journalData.reference}
                                                require="true"
                                                onChange={handleChanges}
                                                error={errors.reference}
                                                fontSize={14}
                                            />


                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className='d-block text-start bg-white px-4 py-2'>


                                            <InputValidation
                                                label="Date Journal"
                                                id="data"
                                                type='date'
                                                name='date'
                                                value={journalData.date}
                                                require="true"
                                                onChange={handleChanges}
                                                error={errors.date}
                                            />
                                            <InputValidation
                                                label="Journal"
                                                id="journal"
                                                type='text'
                                                name='journal'
                                                value={journalData.journal}
                                                require="true"
                                                onChange={handleChanges}
                                                error={errors.journal}
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
                                                <table className="border-0 table w-100 f-14">
                                                    <thead>
                                                        <tr className="">
                                                            <Th className="py-3" resizable columnWidth={300}>Account</Th>
                                                            <Th className="py-3" resizable>Label</Th>
                                                            <Th className="py-3">Debit</Th>
                                                            <Th className="py-3">Credit</Th>
                                                            <Th className="py-3" columnWidth={50}>Action</Th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row, index) => (
                                                            <tr key={index}>
                                                                <td className="py-3" style={{ overflow: 'visible' }}>
                                                                    <div className="dropdown cursor-i p-0">
                                                                        <input type="text"
                                                                            className="p-0 w-100 d-flex text-secondary input-box rounded-0 cursor-i"
                                                                            data-bs-toggle="dropdown"
                                                                            // style={{ height: '25px' }}
                                                                            aria-expanded="false"
                                                                            value={acName[index] ? acName[index].name : "Select Account"}
                                                                        />
                                                                        <ul className="dropdown-menu w-100 box-shadow f-14" style={{ maxHeight: '200px', overflow: 'scroll' }}>
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
                                                                        placeholder="type yout label"
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
                                                                        <i class="fa-solid fa-trash-can remove"></i>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                                <button className="button add border-0 border-bottom" onClick={addRow}>Add Line</button>
                                            </div>
                                        </div>
                                        <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

                                            {/* <p className='w-100'>{productData.description}</p> */}

                                        </div>

                                    </div>
                                </div>

                            </div>
                            <h6 className="bg-white text-end p-3">Total : {journalData.total}</h6>
                        </div>

                    </div>

                </div>
            </div >

        </>
    )
}





export default MakeJournal
