import { useState } from "react";
import { newEmployee } from "../../api/EmployeeApi";
import { getAllBranch } from "../../api/Branch";
import { useEffect } from "react";
import { getAllEmployee } from "../../api/EmployeeApi";

const CreateEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        lastName: '',
        firstName: '',
        schedule: '',
        workShiftID: '',
        managerID: '',
        cv: '',
        positionID: '',
        companyID: '',
        resume: '',
        dayOff: '',
        email: '',
        mobile: '',
        gender: '',
        salary: '',
        address: '',
        bankAccount: '',
        contact: '',
        startWorkingDate: '',
        createdDate: new Date(),
        updatedDate: '',
        image: ''
    });
    const [employee, setEmployee] = useState([]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    function submitProduct(e) {
        e.preventDefault();
        newEmployee(employeeData).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const [branchName, setBranchName] = useState();
    const [branch, setBranch] = useState([]);
    useEffect(() => {
        getAllBranch().then((response) => {
            setBranch(response.data);
            console.log("Branch" + response.data)
        }).catch(e => {
            console.error(e);
        })
        getAllEmployee().then((response) => {
            setEmployee(response.data);
        }).catch(e => {
            console.error(e);
        })
    }, [])
    return (
        <>

            <form action="">
                <div className="row">
                    <div className="col-xl-9 col-md-7 col-12">
                        <div class="btn-group my-2" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-secondary px-4" onClick={submitProduct}><i class="fa-solid fa-cloud-arrow-down"></i></button>
                            <button type="button" class="btn btn-outline-secondary"><i class="fa-solid fa-circle-xmark"></i></button>
                        </div>
                        <div className="form-heder w-100 bg-white" style={{ maxHeight: '130px' }}>
                            <div className="d-flex h-100" >
                                <div className='start w-50 p-2'>
                                    <div className='w-100 px-4'>
                                        <div className="fs-2">
                                            <input className='w-75 text-start text-secondary input-box' placeholder="eng. first name"
                                                type="text"
                                                name="firstName"
                                                value={employeeData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="fs-2">
                                            <input type="text" className='w-75 text-start text-secondary input-box' placeholder="eng. lastname"
                                                name="lastName"
                                                value={employeeData.lastName}
                                                onChange={handleInputChange}
                                                required />
                                        </div>

                                    </div>
                                </div>

                                <div className='end p-2 w-50 d-flex'>
                                    <div className='d-flex' style={{ height: '120px', width: '170px', overflow: 'hidden' }}>
                                        <div className='d-block text-center fs-6' style={{ width: '40px' }}>
                                            <input type="file" name="" className='d-none' id="fileImage"
                                                onChange={(e) => {
                                                    setEmployeeData((prevData) => ({
                                                        ...prevData,
                                                        ["image"]: e.target.files[0].name
                                                    }));
                                                }}
                                            />
                                            <div className=' mt-2'>
                                                <label htmlFor="fileImage" className='pointer'><i class="fa-solid fa-pen font-12 c-cyan f-16"></i></label>
                                            </div>
                                            <div className=' py-3'>
                                                <i class="fa-solid fa-trash font-12 text-danger f-16 pointer"></i>
                                            </div>


                                        </div>
                                        <div className='center box-shadow rounded' style={{ height: '120px', width: '130px', overflow: 'hidden' }}>
                                            <img src={`/src/assets/image/${employeeData.image}`} alt="" className="h-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex">
                            <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Branch  </p>
                                    <div class="dropdown w-75">
                                        <button className=" btn w-100 d-flex text-secondary input-box" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <p className="w-75 text-start">{branchName}</p>
                                            <i class="w-25 text-end">&#10141;</i>
                                        </button>
                                        <ul className="dropdown-menu w-100 box-shadow">
                                            {
                                                branch.map(c =>
                                                    <li>
                                                        <a className="dropdown-item pointer"
                                                            onClick={() => {
                                                                setBranchName(c.branchName)
                                                                setEmployeeData((prevData) => ({
                                                                    ...prevData,
                                                                    ["companyID"]: c.id
                                                                }));
                                                            }}
                                                        >
                                                            {c.city} {" - "} {c.branchName}
                                                        </a>
                                                    </li>
                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start mt-3'>Position  </p>
                                    <div class="dropdown w-75">
                                        <button className=" btn w-100 d-flex text-secondary input-box rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <p className="w-75 text-start"></p>
                                            <i class=" w-25 text-end">&#10141;</i>
                                        </button>
                                        <ul className="dropdown-menu w-100 box-shadow">
                                            <li><a className="dropdown-item" onClick={() => {
                                                setEmployeeData((prevData) => ({
                                                    ...prevData,
                                                    ["positionID"]: 1
                                                }));
                                            }}>Software Developer</a></li>
                                            <li><a className="dropdown-item" onClick={() => {
                                                setEmployeeData((prevData) => ({
                                                    ...prevData,
                                                    ["positionID"]: 2
                                                }));
                                            }}>HR_Aadmin</a></li>
                                            <li><a className="dropdown-item" onClick={() => {
                                                setEmployeeData((prevData) => ({
                                                    ...prevData,
                                                    ["positionID"]: 3
                                                }));
                                            }}>Seller</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start mt-3'>Manger  </p>
                                    <div class="dropdown w-75">
                                        <button className=" btn w-100 d-flex text-secondary input-box rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <p className="w-75 text-start"></p>
                                            <i class=" w-25 text-end">&#10141;</i>
                                        </button>
                                        <ul className="dropdown-menu w-100 box-shadow">
                                            {
                                                employee.map(e => {
                                                    if (e.managerID == null) {
                                                        return (
                                                            <li><a className="dropdown-item" onClick={() => {
                                                                setEmployeeData((prevData) => ({
                                                                    ...prevData,
                                                                    ["managerID"]: e.id
                                                                }));
                                                            }}>{e.firstName} {" "} {e.lastName}</a></li>
                                                        )
                                                    }

                                                })
                                            }


                                        </ul>
                                    </div>
                                </div>

                                <div className='group-input center w-100 mt-0' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start mt-3'>Contact ? </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""

                                        name="contact"
                                        value={employeeData.contact}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Stat Working ? </p>
                                    <input type="date" className='w-75 text-start text-secondary input-box' placeholder=""
                                        name="startWorkingDate"
                                        value={employeeData.startWorkingDate}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Work Email ? </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" "
                                        name="email"
                                        value={employeeData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                            </div>
                        </div>
                        <div className='bg-white py-3'>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="text-dark nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Resume</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Work Information</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="text-dark nav-link " id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Setting</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="text-dark nav-link " id="private-tab" data-bs-toggle="tab" data-bs-target="#private-tab-pane" type="button" role="tab" aria-controls="private-tab-pane" aria-selected="false">Private Information</button>
                                </li>
                            </ul>

                            <div class="tab-content border-0" id="myTabContent">
                                <div class="border-0 tab-pane show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    <textarea id="" className='w-100 border-0 p-3'
                                        name="resume"
                                        value={employeeData.resume}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Schedule ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="schedule"
                                            value={employeeData.schedule}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Work Shift ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="workShiftID"
                                            value={employeeData.workShiftID}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Manager ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="managerID"
                                            value={employeeData.managerID}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Cv ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" "
                                            name="cv"
                                            value={employeeData.cv}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Position </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" "
                                            name="positionID"
                                            value={employeeData.positionID}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Branch ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="companyID"
                                            value={employeeData.companyID}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                </div>
                                <div class="border-0 tab-pane " id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <div className="p-3">
                                        <button className="btn btn-outline-secondary px-3">Create user</button>
                                    </div>

                                </div>
                                <div class="border-0 tab-pane p-2" id="private-tab-pane" role="tabpanel" aria-labelledby="private-tab" tabindex="0">
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>mobile ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="mobile"
                                            value={employeeData.mobile}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Gender ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="gender"
                                            value={employeeData.gender}
                                            onChange={handleInputChange}
                                            required />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Salary ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="salary"
                                            value={employeeData.salary}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Address ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="address"
                                            value={employeeData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Bank Account ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=""
                                            name="bankAccount"
                                            value={employeeData.bankAccount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" style={{ height: '900px' }}>
                        <div className="card border-0 rounded bg-white w-100 p-2">
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
                        <p className="f-14 text-secondary">
                            In the employee management application, certain fields require unique values to ensure accurate and reliable data:

                            <br /><span className="text-primary">Mobile Number :</span> Each employee's mobile number must be unique. This prevents duplicate contacts and ensures each employee can be individually reached.

                            <br /><span className="text-primary">Bank Account :</span> Each bank account number should also be unique to avoid conflicts in payroll processing and to secure individual financial records.
                        </p>
                        <hr />
                        <p className="f-14 text-secondary">
                            In the employee management application, some fields are required and cannot be left blank:
                            <br /><span className="text-primary">First name and Last name :</span> These are essential for identifying each employee.

                            <br /><span className="text-primary">Mobile number :</span> This is mandatory for contact purposes. Ensure each entry is unique.
                        </p>
                    </div>
                </div>
            </form>

        </>
    )
}





export default CreateEmployee
