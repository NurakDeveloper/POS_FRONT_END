import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../../../../api/EmployeeApi";
import { getAllBranch } from "../../../../api/Branch";
import { getAllEmployee } from "../../../../api/EmployeeApi";
import { el } from "date-fns/locale";
import { IoIosArrowRoundBack } from "react-icons/io";
import { hostName } from "../../../../api/host";
import Text from "../../../../components/text/Text";
import { createUser, getUserByEmployeeId } from "../../../../api/UserApi";
import InputValidation from "../../../../components/input/InputValidation";
import CustomCommoBox from "../../../../components/select/CustomCommoBox";
import { userObject } from "../../../../api/AppConfig";



const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const domainName = hostName();
    const profilePath = `http://${domainName}:8085/api/images/`
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
    const [employeeUser, setEmployeeUser] = useState([]);
    useEffect(() => {
        if (id) {
            getUser();
        }
    }, [id])
    function getUser() {
        getUserByEmployeeId(id).then((response) => {
            setEmployeeUser(response.data);
            console.log(response.data);
        }).catch(e => {

        })
    }

    useEffect(() => {
        if (id) {
            getEmployee(id).then((reponse) => {
                setEmployeeData((prevData) => ({
                    ...prevData,
                    ["lastName"]: reponse.data.lastName,
                    ["firstName"]: reponse.data.firstName,
                    ["schedule"]: reponse.data.schedule,
                    ["workShiftID"]: reponse.data.workShiftID,
                    ["managerID"]: reponse.data.managerID,
                    ["cv"]: reponse.data.cv,
                    ["positionID"]: reponse.data.positionID,
                    ["companyID"]: reponse.data.companyID,
                    ["resume"]: reponse.data.resume,
                    ["dayOff"]: reponse.data.dayOff,
                    ["email"]: reponse.data.email,
                    ["mobile"]: reponse.data.mobile,
                    ["gender"]: reponse.data.gender,
                    ["salary"]: reponse.data.salary,
                    ["address"]: reponse.data.address,
                    ["bankAccount"]: reponse.data.bankAccount,
                    ["contact"]: reponse.data.contact,
                    ["startWorkingDate"]: reponse.data.startWorkingDate,
                    ["createdDate"]: reponse.data.createdDate,
                    ["updatedDate"]: reponse.data.updatedDate,
                    ["image"]: reponse.data.image,
                }));
            })
        }
    }, [id])
    const [employee, setEmployee] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        getAllBranch().then((response) => {
            setCompany(response.data);
        })
        getAllEmployee().then((response) => {
            setEmployee(response.data);
        })
    }, []);
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en', {
                weekday: 'long',   // Full day of the week (e.g., "Monday")
                day: '2-digit',    // Two-digit day (e.g., "07")
                month: 'numeric',     // Full month name (e.g., "November")
                year: 'numeric'    // Full year (e.g., "2024")
            }).format(date); // 'dd' for day, 'MMMM' for full month, 'yy' for year
        } catch (e) {
            return (
                <>
                    No data update more ...
                </>
            )
        }
    };
    function getManagerName(id) {
        const findEmployee = employee.find(f => f.id == id);
        if (findEmployee) {
            return (
                <>
                    {findEmployee.firstName} {findEmployee.lastName}

                </>
            )
        } else {
            return (
                <>
                    No Manager
                </>
            )
        }
    }
    function getCompanyName(id) {
        const findCompanyName = company.find(f => f.id == id);
        if (findCompanyName) {
            return findCompanyName.branchName
        } else {
            return (
                <>
                    No Branch Please update data
                </>
            )
        }
    }
    const navi = useNavigate();

    const userRole = [
        {
            "value": 'SELLER',
        },
        {
            "value": 'ADMIN',
        },
    ]

    const [user, setUser] = useState(
        {
            "employeeId": id,
            "username": '',
            "password": '',
            "role": '',
        }
    )
    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    function saveUser(e) {
        e.preventDefault();
        createUser(user).then((response) => {
            setIsFormOpen(false);
            getUser();
        })
    }
    function selectRole(role) {
        setUser((prevData) => ({
            ...prevData,
            ['role']: role.value
        }));
    }
    const [isFormOpen, setIsFormOpen] = useState(false)
    function formCreateUser() {
        return (
            <>
                <form>
                    <InputValidation
                        label='Email'
                        fontSize={14}
                        id='username'
                        type='email'
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                    />
                    <InputValidation
                        label='Password'
                        id='password'
                        fontSize={14}
                        type='password'
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                    />
                    <CustomCommoBox
                        label='Select role'
                        items={userRole}
                        labelKeys={["value"]}
                        fontSize={14}
                        onItemSelected={selectRole}
                    />
                    <div className="d-flex">
                        <button className="button cancel px-5 " onClick={() => setIsFormOpen(false)}>Cancel</button>
                        <button className="button add px-5 ms-3" onClick={saveUser}>Save</button>

                    </div>
                </form>
            </>
        )
    }

    return (
        <>

            <div className="container center">

                <div className="row w-100 ">
                    <div className="col-12 p-0">
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex">
                                <p>
                                    <span className="f-14 text-secondary">Employee / profile / </span>{employeeData.firstName} {employeeData.lastName}
                                </p>
                                {/* <p></p> */}
                            </div>
                            <div className="d-flex">
                                <div className="pe-3">
                                    <button className="button cancel box-shadow" onClick={() => navi(`/employees`)}><IoIosArrowRoundBack /> Back</button>
                                </div>
                                <button className="button add box-shadow" onClick={() => navi(`/update-employee/${id}`)}><i class="fa-solid fa-pen"></i><span className='px-2'>Edit</span></button>
                            </div>
                        </div>
                        <div className="rounded p-4 box-shadow w-100">
                            <div className="form-heder w-100 bg-white" style={{ maxHeight: '100%' }}>
                                <form className="d-flex h-100" >
                                    <div className='start'>
                                        <div className='center rounded box-shadow' style={{ height: '150px', width: '200px', overflow: 'hidden' }}>
                                            <img src={`${profilePath}${employeeData.image}`} alt="" className="h-100 rounded" />
                                        </div>
                                        <div className='w-100 ps-4'>
                                            <div className="fs-4">{employeeData.firstName} {employeeData.lastName}</div>
                                            <div className="f-14 text-secondary">position / softwere engineer</div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <Text title='Compnay' value={getCompanyName(employeeData.companyID)} fontSize={14} />
                                    <Text title='Employee Address' value={employeeData.address} fontSize={14} />
                                    <Text classValue={'pointer'} title='Manager ? ' value={getManagerName(employeeData.managerID)} fontSize={14} click={() => navigate(`/employee-detail/${employeeData.managerID}`)} />
                                    <Text title='Work Email' value={employeeData.email} fontSize={14} />
                                </div>
                                <div className="col-md-6 col-12">
                                    <Text title='Stat Working' value={formatDate(employeeData.startWorkingDate)} fontSize={14} />
                                    <Text title='Contac phone ' value={employeeData.contact} fontSize={14} />

                                </div>
                            </div>
                            <div className='bg-white py-3'>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="text-dark nav-link active f-14" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Resume</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button class="text-dark nav-link f-14" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Work Information</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button class="text-dark nav-link f-14" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">User Management</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button class="text-dark nav-link f-14" id="private-tab" data-bs-toggle="tab" data-bs-target="#private-tab-pane" type="button" role="tab" aria-controls="private-tab-pane" aria-selected="false">Private Information</button>
                                    </li>
                                </ul>

                                <div class="tab-content border-0" id="myTabContent">
                                    <div class="border-0 tab-pane show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">

                                    </div>
                                    <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <Text title='Schedule work ' value={employeeData.schedule} fontSize={14} />
                                        <Text title='Work Shift ' value={employeeData.workShiftID} fontSize={14} />
                                        <Text title='Cv ' value={employeeData.cv} fontSize={14} />
                                    </div>
                                    <div class="border-0 tab-pane " id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                        <div className="py-3">
                                            {userObject().role == 'ADMIN' ? <button className='button add px-5 my-3 mt-2' onClick={() => setIsFormOpen(true)}>New User</button> : <><span className="text-seondary">Access denied</span></>}
                                            {employeeUser.length > 0 && isFormOpen == false ? (
                                                <>
                                                    {employeeUser.map(user =>
                                                        <>
                                                            <h1 className="f-20 ps-3 border-start">User {user.username}</h1>
                                                            <InputValidation
                                                                label='User email'
                                                                fontSize={14}
                                                                name='user'
                                                                value={user.username}
                                                            />
                                                            <InputValidation
                                                                label='Password'
                                                                fontSize={14}
                                                                name='pass'
                                                                value={user.password}
                                                            />
                                                            <InputValidation
                                                                label='ROLE'
                                                                fontSize={14}
                                                                name='role'
                                                                value={user.role}
                                                            />
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>

                                                    <div className={isFormOpen ? 'd-block' : 'd-none'}>
                                                        {formCreateUser()}
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                    <div class="border-0 tab-pane p-2" id="private-tab-pane" role="tabpanel" aria-labelledby="private-tab" tabindex="0">

                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <Text title='Employee Email' value={employeeData.email} fontSize={14} />
                                                <Text title='Phone Number' value={employeeData.mobile} fontSize={14} />
                                                <Text title='Gender' value={employeeData.gender} fontSize={14} />
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <Text title='Salary' value={' $ ' + employeeData.salary} fontSize={14} />
                                                <Text title='Address' value={employeeData.address} fontSize={14} />
                                                <Text title='Day Off' value={employeeData.dayOff + ' day '} fontSize={14} />
                                                <Text title='Bank' value={employeeData.bankAccount} fontSize={14} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}





export default EmployeeDetail
