import { useEffect, useState } from "react";
import { createAccount } from "../../../api/Account";
import { getAllAccountType } from "../../../api/AccountType";

const MakeChartOfAccount = () => {
    const [acType, setAcType] = useState([]);
    const [acTypeName, setAcTypeName] = useState([]);


    useEffect(() => {
        getAllAccountType().then((response) => {
            setAcType(response.data);
        })
    }, [])
    const [accountData, setAccountData] = useState({
        accountTypeId: '',
        branchId: '',
        code: '',
        accountName: '',
        currency: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({ ...accountData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(accountData).then((reponse) => {

        }).catch(error => {
            console.error(error);
        })
        // Add your form submission logic here, such as an API call
    };

    return (
        <>

            <form action="">
                <div className="container-fluid p-0 center">
                    <div className="row w-100">
                        <div className="col-xl-9" style={{ height: '900px' }}>
                            <div class="btn-group my-2" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-outline-secondary px-4" onClick={handleSubmit}><i class="fa-solid fa-floppy-disk"></i></button>
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
                                            <label htmlFor='p-name' className='w-25 text-start'>Code  </label>
                                            <input type="text" id='p-name' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                name='code'
                                                value={accountData.code}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start '>Branch   </p>
                                            <div class="dropdown w-75">
                                                <button className=" btn w-100 d-flex text-secondary input-box rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <p className="w-75 text-start"></p>
                                                    <i class=" w-25 text-end">&#10141;</i>
                                                </button>
                                                <ul className="dropdown-menu w-100 box-shadow">
                                                    {/* <li><a className="dropdown-item"
                                                onClick={() => {
                                                    setEmployeeData((prevData) => ({
                                                        ...prevData,
                                                        ["companyID"]: 1
                                                    }));
                                                }}>Phnom Penh</a></li> */}
                                                    <li><a className="dropdown-item pointer" onClick={() => {
                                                        setAccountData({ ...accountData, ["branchId"]: 1 });
                                                    }}>Phnom Penh</a></li>
                                                    <li><a className="dropdown-item pointer"
                                                        onClick={() => {
                                                            setAccountData({ ...accountData, ["branchId"]: 2 });
                                                        }}>Bathambong</a></li>

                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='d-block text-start bg-white px-4 py-2 w-50 mt-1'>

                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <label htmlFor='j-date' className='w-25 text-start'>Account name  </label>
                                            <input type="text" id='j-date' className='w-75 text-start text-secondary input-box rounded-0' placeholder=""
                                                name='accountName'
                                                value={accountData.accountName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                            <p className='w-25 text-start'>Account type  </p>
                                            <div class="dropdown w-75">
                                                <button className=" btn w-100 d-flex text-secondary input-box rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <p className="w-75 text-start">{acTypeName}</p>
                                                    <i class=" w-25 text-end">&#10141;</i>
                                                </button>
                                                <ul className="dropdown-menu w-100 box-shadow">
                                                    {
                                                        acType.map(at =>
                                                            <li><a className="dropdown-item pointer"
                                                                onClick={() => {
                                                                    setAccountData({ ...accountData, ["accountTypeId"]: at.id });
                                                                    setAcTypeName(at.accountType)
                                                                }} ><span className="f-14 text-seondary"></span> {" "} {at.accountType}</a></li>
                                                        )
                                                    }


                                                </ul>
                                            </div>
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
            </ form>

        </>
    )
}





export default MakeChartOfAccount
