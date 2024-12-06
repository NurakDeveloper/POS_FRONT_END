import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../../../../api/EmployeeApi";
import { getAllBranch } from "../../../../api/Branch";
import { getAllEmployee } from "../../../../api/EmployeeApi";
import { el } from "date-fns/locale";
import { IoIosArrowRoundBack } from "react-icons/io";
import { hostName } from "../../../../api/host";
import Text from "../../../../components/text/Text";



const EmployeeDetail = () => {
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
    const { id } = useParams();
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
                                        <div className='center' style={{ width: '150px', overflow: 'hidden' }}>
                                            <img src={`${profilePath}${employeeData.image}`} alt="" className="w-100 rounded" />
                                        </div>
                                        <div className='w-100 ps-4'>
                                            <div className="fs-4">{employeeData.firstName} {employeeData.lastName}</div>
                                            <div className="f-14 text-secondary"> softwere engineer</div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className='d-block text-start fs-6 bg-white py-2'>
                                        <Text title='Compnay' value={getCompanyName(employeeData.companyID)} fontSize={14} />
                                        <Text title='Employee Address' value={employeeData.address} fontSize={14} />
                                        <Text classValue={'pointer'} title='Manager ? ' value={getManagerName(employeeData.managerID)} fontSize={14} click={() => navigate(`/employee-detail/${employeeData.managerID}`)} />
                                        <Text title='Work Email' value={employeeData.email} fontSize={14} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div>

                                    </div>
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
                                        <button class="text-dark nav-link f-14" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Setting</button>
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
                                        {/* <p className="mb-0">Create User</p>
                                    <p className="mb-0">Day Off / year : 18day</p>
                                    <p className="mb-0">Work Shift</p>
                                    <p className="mb-0">Attencden</p> */}
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
