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
import Tabs from "../../components/tabs/Tabs";

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
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEmployeeData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };
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
    const handleInputChange = (field, value) => {
        setEmployeeData((prev) => ({ ...prev, [field]: value }));
    };
    const steps = [
        {
            label: "Personal Information",
            content: (errors) => (
                <>
                    <InputValidation
                        fontSize={15}
                        label="Last Name"
                        id="lastName"
                        type="text"
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        value={employeeData.lastName}
                        error={errors.lastName}
                    />
                    <InputValidation
                        fontSize={15}
                        label="First Name"
                        id="firstName"
                        type="text"
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        value={employeeData.firstName}
                        error={errors.firstName}
                    />
                    <InputValidation
                        fontSize={15}
                        label="Email"
                        id="email"
                        type="email"
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        value={employeeData.email}
                        error={errors.email}
                    />
                    <InputValidation
                        fontSize={15}
                        label="Mobile"
                        id="mobile"
                        type="text"
                        onChange={(e) => handleInputChange("mobile", e.target.value)}
                        value={employeeData.mobile}
                        error={errors.mobile}
                    />
                    <InputValidation
                        fontSize={15}
                        label="Gender"
                        id="gender"
                        type="text"
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        value={employeeData.gender}
                        error={errors.gender}
                    />
                </>
            ),
            validate: () => {
                const errors = {};
                if (!employeeData.lastName) {
                    errors.lastName = "Last Name is required.";
                }
                if (!employeeData.firstName) {
                    errors.firstName = "First Name is required.";
                }
                if (!employeeData.email) {
                    errors.email = "Email is required.";
                }
                if (!employeeData.mobile) {
                    errors.mobile = "Mobile is required.";
                }
                if (!employeeData.gender) {
                    errors.gender = "Gender is required.";
                }
                return errors;
            },
        },
        {
            label: "Employment Details",
            content: (errors) => (
                <>
                    {/* <CustomCommoBox
                        fontSize={15}
                        label="Work Shift"
                        items={workShifts} // Assuming you have a list of work shifts
                        searchKey={['name']}
                        labelKeys={['name']}
                        onItemSelected={(value) => handleInputChange("workShiftID", value.id)}
                        error={errors.workShiftID}
                    /> */}
                    <CustomCommoBox
                        fontSize={15}
                        label="Manager"
                        items={manager} // Assuming you have a list of managers
                        searchKey='firstName'
                        labelKeys={['firstName', 'lastName']}
                        onItemSelected={(value) => handleInputChange("managerID", value.id)}
                        error={errors.managerID}
                    />
                    <CustomCommoBox
                        fontSize={14}
                        label='Select Branch'
                        items={branch}
                        searchKey='branchName'
                        labelKeys={['branchName']}
                        onItemSelected={(value) => handleInputChange("companyID", value.id)}
                        error={errors.companyID}
                    />

                    {/* <CustomCommoBox
                        fontSize={15}
                        label="Position"
                        items={positions} // Assuming you have a list of positions
                        searchKey={['name']}
                        labelKeys={['name']}
                        onItemSelected={(value) => handleInputChange("positionID", value.id)}
                        error={errors.positionID}
                    /> */}
                    <InputValidation
                        fontSize={15}
                        label="Salary"
                        id="salary"
                        type="number"
                        onChange={(e) => handleInputChange("salary", e.target.value)}
                        value={employeeData.salary}
                        error={errors.salary}
                    />
                    <InputValidation
                        fontSize={15}
                        label="Start Working Date"
                        id="startWorkingDate"
                        type="date"
                        onChange={(e) => handleInputChange("startWorkingDate", e.target.value)}
                        value={employeeData.startWorkingDate}
                        error={errors.startWorkingDate}
                    />
                </>
            ),
            validate: () => {
                const errors = {};
                if (!employeeData.companyID) {
                    errors.companyID = "Branch is required.";
                }
                // if (!employeeData.positionID) {
                //     errors.positionID = "Position is required.";
                // }
                if (!employeeData.salary) {
                    errors.salary = "Salary is required.";
                }
                if (!employeeData.startWorkingDate) {
                    errors.startWorkingDate = "Start Working Date is required.";
                }
                return errors;
            },
        },
        {
            label: "Bank & Contact Information",
            content: (errors) => (
                <>
                    <InputValidation
                        fontSize={15}
                        label="Bank Account"
                        id="bankAccount"
                        type="text"
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                        value={employeeData.bankAccount}
                        error={errors.bankAccount}
                    />
                    <InputValidation
                        fontSize={15}
                        label="Contact"
                        id="contact"
                        type="text"
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                        value={employeeData.contact}
                        error={errors.contact}
                    />
                    <InputValidation
                        fontSize={15}
                        label="Address"
                        id="address"
                        type="text"
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        value={employeeData.address}
                        error={errors.address}
                    />
                </>
            ),
            validate: () => {
                const errors = {};
                if (!employeeData.bankAccount) {
                    errors.bankAccount = "Bank Account is required.";
                }
                if (!employeeData.contact) {
                    errors.contact = "Contact is required.";
                }
                if (!employeeData.address) {
                    errors.address = "Address is required.";
                }
                return errors;
            },
        },
        {
            label: "Upload Resume & Image",
            content: (errors) => (
                <>
                    <div className="w-100">
                        <label
                            htmlFor="fileImage"
                            className="rounded py-2 box-shadow center pointer"
                            style={{ height: "200px", width: "300px", overflow: "hidden" }}
                        >
                            <img
                                src={selectedImage || "default_image_path"}
                                alt="Profile"
                                className="h-100"
                            />
                        </label>
                        <span className="validation-error f-12">{errors.image ? errors.image : ""}</span>
                    </div>
                    <input
                        type="file"
                        id="fileImage"
                        className="d-none"
                        onChange={handleFileChange}
                    />

                    <InputValidation
                        fontSize={15}
                        label="Resume URL"
                        id="resume"
                        type="text"
                        onChange={(e) => handleInputChange("resume", e.target.value)}
                        value={employeeData.resume}
                        error={errors.resume}
                    />
                </>
            ),
            validate: () => {
                const errors = {};
                if (!employeeData.image) {
                    errors.image = "Profile Image is required.";
                }
                if (!employeeData.resume) {
                    errors.resume = "Resume is required.";
                }
                return errors;
            },
        },
        {
            label: "Review & Submit",
            content: () => (
                <div>
                    <h3>Review Employee Information</h3>
                    <pre>{JSON.stringify(employeeData, null, 2)}</pre>
                </div>
            ),
            validate: () => ({}), // No validation needed for this step
        },
    ];

    return (
        <>

            <form action="" className="p-3">

                <div className="container box-shadow rounded  d-block p-3">
                    {/* {formHeader()} */}
                    <Tabs steps={steps} onSave={() => saveEmployee()} />

                </div>
            </form>

        </>
    )
}





export default CreateEmployee
