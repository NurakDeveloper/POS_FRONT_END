import { useState } from "react";
import { getEmployee, newEmployee, updateEmployee } from "../../api/EmployeeApi";
import { getAllBranch } from "../../api/Branch";
import { useEffect } from "react";
import { getAllEmployee } from "../../api/EmployeeApi";
import { json, useNavigate, useParams } from "react-router-dom";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import InputValidation from "../../components/input/InputValidation";
import { uploadImage } from "../../api/ImageApi";
import { hostName } from "../../api/host";
import CustomCommoBox from "../../components/select/CustomCommoBox";

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
    const [branchName, setBranchName] = useState('select branch');
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
    const manager = employee.filter(e => e.managerID == null);
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
                    ["updatedDate"]: new Date(),
                    ["image"]: reponse.data.image,
                }));
                // alert(reponse.data.image)

            }).catch(e => {
                console.error(e);
            })
        }
    }, [id])

    const domainName = hostName();
    const profilePath = `http://${domainName}:8085/api/images/`
    function findBranchName(id) {
        try {
            return branch.find(b => b.id == id).branchName;
        } catch (e) {
            return "No Branch Selected"
        }
    }
    function findManager(id) {
        try {
            return employee.find(e => e.id == id).firstName + ' ' + employee.find(e => e.id == id).lastName;
        } catch (e) {
            return "No Manager Selected"
        }
    }

    const navigate = useNavigate();

    function selectBranch(branch) {
        setEmployeeData((prevData) => ({
            ...prevData,
            ['companyID']: branch.id
        }));
    }
    function selectManager(manager) {
        setEmployeeData((prevData) => ({
            ...prevData,
            ['managerID']: manager.id
        }));
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    // using error check if error lenth bigger than zero is error on another field
    const [errors, setErrors] = useState({});
    // validation field
    const validateEmployeeForm = () => {
        const newErrors = {};

        if (!employeeData.lastName) {
            newErrors.lastName = 'Last Name is required.';
        }

        if (!employeeData.firstName) {
            newErrors.firstName = 'First Name is required.';
        }

        if (!employeeData.schedule) {
            newErrors.schedule = 'Schedule is required.';
        }

        if (!employeeData.workShiftID) {
            newErrors.workShiftID = 'Work Shift ID is required.';
        }

        if (!id) {
            if (!employeeData.managerID) {
                newErrors.managerID = 'Manager ID is required.';
            }
        }

        if (!employeeData.cv) {
            newErrors.cv = 'CV is required.';
        }

        // if (!employeeData.positionID) {
        //     newErrors.positionID = 'Position ID is required.';
        // }

        if (!employeeData.companyID) {
            newErrors.companyID = 'Company ID is required.';
        }

        if (!employeeData.resume) {
            newErrors.resume = 'Resume is required.';
        }

        if (!employeeData.dayOff) {
            newErrors.dayOff = 'Day Off is required.';
        }

        if (!employeeData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(employeeData.email)) {
            newErrors.email = 'Invalid Email format.';
        }

        if (!employeeData.mobile) {
            newErrors.mobile = 'Mobile Number is required.';
        } else if (!/^\d{8,15}$/.test(employeeData.mobile)) {
            newErrors.mobile = 'Mobile Number must be between 8 and 15 digits.';
        }

        if (!employeeData.gender) {
            newErrors.gender = 'Gender is required.';
        }

        if (!employeeData.salary) {
            newErrors.salary = 'Salary is required.';
        } else if (isNaN(employeeData.salary) || employeeData.salary <= 0) {
            newErrors.salary = 'Salary must be a positive number.';
        }

        if (!employeeData.address) {
            newErrors.address = 'Address is required.';
        }

        if (!employeeData.bankAccount) {
            newErrors.bankAccount = 'Bank Account is required.';
        } else if (!/^\d{10,20}$/.test(employeeData.bankAccount)) {
            newErrors.bankAccount = 'Bank Account must be between 10 and 20 digits.';
        }

        if (!employeeData.contact) {
            newErrors.contact = 'Contact is required.';
        }

        if (!employeeData.startWorkingDate) {
            newErrors.startWorkingDate = 'Start Working Date is required.';
        } else if (isNaN(Date.parse(employeeData.startWorkingDate))) {
            newErrors.startWorkingDate = 'Invalid Start Working Date.';
        }

        if (!employeeData.image) {
            newErrors.image = 'Image is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };
    const [selectedImage, setSelectedImage] = useState();
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        // set file select from path
        setFile(event.target.files[0]);
        const f = event.target.files[0];
        if (!f) {
            return
        }
        if (f) {
            const imageURL = URL.createObjectURL(f);
            setSelectedImage(imageURL); // Create a URL for the selected file
        }
        // set image name to store in database
        setEmployeeData((prevData) => ({
            ...prevData,
            ["image"]: event.target.files[0].name
        }));
    };


    function saveEmployee(e) {
        e.preventDefault();
        // check validaiton form
        if (!validateEmployeeForm()) {
            return
        }
        // if file not selected
        if (!file) {
            // if no select file but user update get image name sure we dont validation on file
            if (!employeeData.image) {
                return
            }
        }

        // update employee
        if (id) {
            updateEmployee(id, employeeData).then((response) => {
                alert(JSON.stringify(response.data, null, 2));
                setEmployeeData(
                    {
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
                    }
                )
            }).catch(e => {
                return
            })
        }
        // add employee
        newEmployee(employeeData).then((response) => {
            console.log(response.data);
        }).catch(error => {
            return
        })
        // upload file to folder project backend
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                // Use the `uploadImage` function to send the file
                // const response = await uploadImage(formData);
                uploadImage(formData).then((response) => {
                    setMessage("Create Product Successfull");
                    alert('knaskldnl')
                })
            } catch (error) {
                return
            }
        }
    }

    // preveiew employee data JSON alert
    function preview(e) {
        e.preventDefault();
        const jsonString = JSON.stringify(employeeData, null, 2); // 'null, 2' formats the JSON for readability

        alert(jsonString)
    }
    function formHeader() {
        return (
            <div className='form-header-content'>
                <button type="button" class="button cancel box-shadow " onClick={() => navigate('/employees')}><IoIosArrowRoundBack /><span className='px-2'>Cancel</span> </button>
                <div className='d-flex'>
                    <button type="button" class="button preview box-shadow " onClick={preview}><i class="fa-solid fa-circle-info px-2"></i>Preview </button>
                    <div className='px-3 pe-0'>
                        <button type="button" class="button add box-shadow px-4" onClick={saveEmployee}><IoSaveSharp /><span className='px-2'>Save</span> </button>
                    </div>
                </div>


            </div>
        );
    }
    return (
        <>

            <form action="" className="p-3">

                <div className="container-fluid box-shadow rounded  d-block p-3">
                    {formHeader()}

                    <div className="row ">
                        <div className="col-12">
                            <div className="form-heder w-100 bg-white p-3 ps-1">
                                <div className="row" >
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                        <di className="d-flex">
                                            <div>
                                                <label htmlFor="fileImage" className=' rounded box-shadow pointer center' style={{ height: '200px', width: '150px', overflow: 'hidden' }}>
                                                    {/* <img src={`http://localhost:8085/api/images/profile.jpg}`} alt="no image" className="h-100" /> */}
                                                    <img src={selectedImage ? selectedImage : `${profilePath}${employeeData.image}`} alt="" className="h-100 " />
                                                    {/* <img src={} alt="" className="w-100 rounded" /> */}
                                                </label> <br />

                                                <span className='validation-error f-12'>{errors.image ? errors.image : ''}</span>
                                            </div>
                                            <div className='w-100 h-100 ps-3'>
                                                <InputValidation
                                                    label='First Name'
                                                    id='firstName'
                                                    type='text'
                                                    name='firstName'
                                                    value={employeeData.firstName}
                                                    onChange={handleInputChange}
                                                    error={errors.firstName}
                                                    fontSize={14}
                                                    require={'true'}
                                                />
                                                <InputValidation
                                                    label='Last Name'
                                                    type='text'
                                                    id='lastName'
                                                    name='lastName'
                                                    value={employeeData.lastName}
                                                    onChange={handleInputChange}
                                                    error={errors.lastName}
                                                    fontSize={14}
                                                    require={'true'}
                                                />

                                            </div>
                                        </di>
                                    </div>

                                    <div className='col-xl-6 col-md-6 col-12 end'>
                                        <div className='' style={{ height: '100%', width: '180px', overflow: 'hidden' }}>
                                            <div className='d-none text-center fs-6' style={{ width: '40px' }}>
                                                <input type="file" name="" className='d-none w-100' id="fileImage"
                                                    onChange={handleFileChange}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className='col-xl-6 col-12 d-block text-start bg-white'>
                                    <InputValidation
                                        label='Full Name'
                                        type='text'
                                        id='fullname'
                                        value={employeeData.firstName + ' ' + employeeData.lastName}
                                        onChange={handleInputChange}
                                        // error={errors.contact}
                                        fontSize={14}
                                    // require={'true'}
                                    />
                                    <CustomCommoBox
                                        fontSize={14}
                                        label='Select Manager'
                                        items={manager}
                                        searchKey='firstName'
                                        labelKeys={['firstName', 'lastName']}
                                        onItemSelected={selectManager}
                                        error={errors.manager}
                                    />
                                    <CustomCommoBox
                                        fontSize={14}
                                        label='Select Branch'
                                        items={branch}
                                        searchKey='branchName'
                                        labelKeys={['branchName']}
                                        onItemSelected={selectBranch}
                                        error={errors.branch}
                                    />

                                    <InputValidation
                                        label='Contact'
                                        type='text'
                                        id='contact'
                                        name='contact'
                                        value={employeeData.contact}
                                        onChange={handleInputChange}
                                        error={errors.contact}
                                        fontSize={14}
                                        require={'true'}
                                    />
                                </div>
                                <div className='col-xl-6 col-12  d-block text-start bg-white'>
                                    <InputValidation
                                        label='Start Working Date'
                                        type='date'
                                        id='startWorkingDate'
                                        name='startWorkingDate'
                                        value={employeeData.startWorkingDate}
                                        onChange={handleInputChange}
                                        error={errors.startWorkingDate}
                                        fontSize={14}
                                        require={'true'}
                                    />
                                    <InputValidation
                                        label='Work Email'
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={employeeData.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
                                        fontSize={14}
                                        require={'true'}
                                    />


                                </div>
                            </div>
                            {/* // tap */}
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

                                <div class="tab-content border-0 py-3" id="myTabContent">
                                    <div class="border-0 tab-pane show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                        <textarea id="" className='w-100 border-0 p-3'
                                            name="resume"
                                            value={employeeData.resume}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <InputValidation
                                            label='Schedule'
                                            type='text'
                                            id='schedule'
                                            name='schedule'
                                            value={employeeData.schedule}
                                            onChange={handleInputChange}
                                            error={errors.schedule}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                        <InputValidation
                                            label='workShift'
                                            type='number'
                                            id='workShiftID'
                                            name='workShiftID'
                                            value={employeeData.workShiftID}
                                            onChange={handleInputChange}
                                            error={errors.workShiftID}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                        {/* <InputValidation
                                            label='managerID'
                                            type='number'
                                            id='managerID'
                                            name='managerID'
                                            value={findManager(employeeData.managerID)}
                                            // onChange={handleInputChange}
                                            error={errors.workShiftID}
                                            fontSize={14}
                                            require={'true'}
                                        /> */}
                                        <InputValidation
                                            label='Cv Photo'
                                            type='text'
                                            id='cv'
                                            name='cv'
                                            value={employeeData.cv}
                                            onChange={handleInputChange}
                                            error={errors.cv}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                        <InputValidation
                                            label='positionID'
                                            type='number'
                                            id='positionID'
                                            name='positionID'
                                            value={employeeData.positionID}
                                            onChange={handleInputChange}
                                            error={errors.positionID}
                                            fontSize={14}
                                            require={'true'}
                                        />

                                    </div>
                                    <div class="border-0 tab-pane " id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                        <div className="p-3">
                                            <button className="btn btn-outline-secondary px-3">Create user</button>
                                        </div>

                                    </div>
                                    <div class="border-0 tab-pane p-2" id="private-tab-pane" role="tabpanel" aria-labelledby="private-tab" tabindex="0">
                                        <InputValidation
                                            label='mobile'
                                            type='text'
                                            id='mobile'
                                            name='mobile'
                                            value={employeeData.mobile}
                                            onChange={handleInputChange}
                                            error={errors.mobile}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                        <InputValidation
                                            label='Gender'
                                            type='text'
                                            id='gender'
                                            name='gender'
                                            value={employeeData.gender}
                                            onChange={handleInputChange}
                                            error={errors.gender}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                        <InputValidation
                                            label='Salary'
                                            type='number'
                                            id='salary'
                                            name='salary'
                                            value={employeeData.salary}
                                            onChange={handleInputChange}
                                            error={errors.salary}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                        <InputValidation
                                            label='Address'
                                            type='text'
                                            id='address'
                                            name='address'
                                            value={employeeData.address}
                                            onChange={handleInputChange}
                                            error={errors.address}
                                            fontSize={14}
                                            require={'true'}
                                        />

                                        <InputValidation
                                            label='Bank Account'
                                            type='text'
                                            id='bankAccount'
                                            name='bankAccount'
                                            value={employeeData.bankAccount}
                                            onChange={handleInputChange}
                                            error={errors.bankAccount}
                                            fontSize={14}
                                            require={'true'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}





export default CreateEmployee
