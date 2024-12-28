import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../../../../api/EmployeeApi";
import { getAllBranch } from "../../../../api/Branch";
import { getAllEmployee } from "../../../../api/EmployeeApi";
import { el } from "date-fns/locale";
import { IoIosArrowRoundBack, IoIosPersonAdd } from "react-icons/io";
import { hostName } from "../../../../api/host";
import Text from "../../../../components/text/Text";
import { createUser, getUserByEmployeeId } from "../../../../api/UserApi";
import InputValidation from "../../../../components/input/InputValidation";
import CustomCommoBox from "../../../../components/select/CustomCommoBox";
import { userObject } from "../../../../api/AppConfig";
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import List from "../../../../components/list/List";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import DetailED from "../../../../components/editRemoveAction/DetailED";




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
    }, [id]);
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
            ['role']: role ? value.value : ''
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

            <div className="container-fluid center">

                <div className="row w-100 ">
                    <div className="col-9 p-0">
                        <Paper className="rounded p-4 w-100">
                            <div className="form-heder w-100 bg-white" style={{ maxHeight: '100%' }}>
                                <div className='d-flex justify-content-between align-items-center py-3 border-bottom border-2'>
                                    <div>
                                        <Paper elevation={0} className=''>
                                            <div className="display-4 display-name">{employeeData.firstName} {employeeData.lastName}</div>
                                            <div className="f-14 text-secondary">{employeeData.address} , {employeeData.mobile}</div>
                                            <div className="f-14 text-secondary text-success">Email : {employeeData.email}</div>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper elevation={5} className='center rounded box-shadow' sx={{ height: '200px', width: '150px', overflow: 'hidden' }}>
                                            <img src={`${profilePath}${employeeData.image}`} alt="" className="h-100 rounded" />
                                        </Paper>
                                        <div className="pt-3">
                                            <DetailED updateClick={() => navigate(`/update-employee/${id}`)} />
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                {/* resume  */}
                                <Accordion
                                    sx={{
                                        boxShadow: "none", // Remove box-shadow
                                        border: "none",
                                        borderBottom: '1px solid silver',    // Remove border
                                        "&:before": {
                                            display: "none", // Remove the default divider line
                                        },
                                    }}
                                >

                                    <AccordionSummary
                                        expandIcon={<MdOutlineKeyboardArrowUp />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <p className="f-20 py-2 display-name">Resume</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p className="f-16">
                                            {employeeData.resume}
                                        </p>
                                    </AccordionDetails>
                                </Accordion>
                                {/* general information  */}
                                <Accordion
                                    sx={{
                                        boxShadow: "none", // Remove box-shadow
                                        border: "none",
                                        borderBottom: '1px solid silver',    // Remove border
                                        "&:before": {
                                            display: "none", // Remove the default divider line
                                        },
                                    }}
                                >

                                    <AccordionSummary
                                        expandIcon={<MdOutlineKeyboardArrowUp />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <p className="f-20 py-2 display-name">General Information</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
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
                                                <Text title='Schedule work ' value={employeeData.schedule} fontSize={14} />
                                                <Text title='Work Shift ' value={employeeData.workShiftID} fontSize={14} />
                                                <Text title='Cv ' value={employeeData.cv} fontSize={14} />
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                {/* private information  */}
                                <Accordion
                                    sx={{
                                        boxShadow: "none", // Remove box-shadow
                                        border: "none",
                                        borderBottom: '1px solid silver',    // Remove border
                                        "&:before": {
                                            display: "none", // Remove the default divider line
                                        },
                                    }}
                                >

                                    <AccordionSummary
                                        expandIcon={<MdOutlineKeyboardArrowUp />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <p className="f-20 py-2 display-name">Private Information</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
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
                                    </AccordionDetails>
                                </Accordion>
                                {/* user  */}
                                <Accordion
                                    sx={{
                                        boxShadow: "none", // Remove box-shadow
                                        border: "none",
                                        borderBottom: '1px solid silver',    // Remove border
                                        "&:before": {
                                            display: "none", // Remove the default divider line
                                        },
                                    }}
                                >

                                    <AccordionSummary
                                        expandIcon={<MdOutlineKeyboardArrowUp />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <p className="f-20 py-2 display-name">User </p>
                                    </AccordionSummary>
                                    <AccordionDetails>
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
                                                            {/* <InputValidation
                                                                label='Password'
                                                                fontSize={14}
                                                                name='pass'
                                                                value={user.password}
                                                            /> */}
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
                                    </AccordionDetails>
                                </Accordion>

                            </div>

                        </Paper>
                    </div>
                    <div className="col-3">

                        <Paper
                            sx={{
                                position: 'sticky',
                                top: 0
                            }}>
                            <h1 className="fs-5 text-center py-3">More Employee</h1>
                            {

                                employee.map(e =>
                                    <div className="d-block px-2" style={{ background: e.id == id ? `rgb(241, 241, 241)` : 'white' }} key={e.id} onClick={() => navigate(`/employee-detail/${e.id}`)}>
                                        <List title={e.firstName + ' ' + e.lastName} subTitle={e.email} imgUrl={e.image} />
                                    </div>
                                )
                            }


                        </Paper>
                    </div>

                </div>
            </div>

        </>
    )
}





export default EmployeeDetail
