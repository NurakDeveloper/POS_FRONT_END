
import './App.css'
import Menu from './layout/menu/Menu'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './layout/page/dashboard/Dashboard'
import Desk from './layout/page/desk/Desk'
import Account from './layout/page/accountant/Account'
import Item from './layout/page/inventory/Item'
import InsertItem from './layout/form/inventory/InsertItem'
import ItemDetail from './layout/page/inventory/ItemDestail'
import ViewOrder from './layout/page/report/order/ViewOrder'
import OrderDetail from './layout/page/report/order/OrderDetail'
import Customer from './layout/page/people/customer/Customer'
import CustomerDetail from './layout/page/people/customer/CustomerDetail'
import Employee from './layout/page/people/employee/Employee'
import EmployeeDetail from './layout/page/people/employee/EmployeeDetail'
import CreateEmployee from './layout/form/CreateEmployee'
import CreateCustomer from './layout/form/CreateCustomer'
import Category from './layout/page/inventory/Category'
import Inventory from './layout/page/inventory/Inventory'
import Accountant from './layout/page/accountant/Accountant'
import Report from './layout/page/accountant/Report'
import Setting from './layout/page/setting/Setting'
import User from './layout/page/admin/User'
import Journal from './layout/page/accountant/Journal'
import JournalDetail from './layout/page/accountant/JournalDetail'
import Login from './layout/form/Login'
import Cookies from 'js-cookie'
import { decryptData } from './cryptoJs/Crypto'
import { useEffect, useState } from 'react'
import PosDark from './layout/page/pos/PosDark'
import PosLight from './layout/page/pos/PosLight'
import Loading from './layout/page/loading/Loading'
import MakeJournal from './layout/form/accounting/MakeJournal'
import MakeChartOfAccount from './layout/form/accounting/MakeChartOfAccount'
import JouranlReport from './layout/page/report/accounting/JouranlReport'
import MakeBill from './layout/form/accounting/MakeBill'
import CustomTable from './layout/page/pos/Custom/CustomTable'
import MobileMenu from './layout/menu/MobileMenu'
import PosMenu from './layout/page/pos/PosMenu'
import OrderTable from './layout/page/pos/OrderTable'
import RExpense from './layout/page/report/accounting/RExpense'
import NetIncomeChart from './layout/page/report/netincome/NetIncomeChart'
import PaymentMethod from './layout/page/report/paymentmethod/PaymentMethod'
import MonthSaleReport from './layout/page/report/monthlysalereport/MonthSale'
import BestSellingMenuItemsChart from './layout/page/report/bestsellingproduct/BestSellingMenuItemsChart'
import { IoChatbubble, IoChatbubbleEllipsesOutline, IoExitOutline, IoSettingsOutline, IoTimerOutline, IoTimeSharp } from 'react-icons/io5'
import { checkingTypeOfUser } from './api/AppConfig'
import { userObject } from './api/AppConfig'
import CategoriesForm from './layout/form/inventory/CategoriesForm'
import { hostName } from './api/host'
import SaleReporting from './layout/page/report/SaleReporting/SaleReporting'
import ExpenseChart from './layout/page/report/accounting/ExpenseChart'
import Revenues from './layout/page/report/revenues/Revenues'
import Expense from './layout/page/report/expense/Expense'
import VendorForm from './layout/form/VendorForm'
import ViewVendor from './layout/page/people/vendor/ViewVendor'
import { RiSettings5Fill, RiVerifiedBadgeFill } from 'react-icons/ri'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import OpenSalary from './layout/form/accounting/OpenSalary'
import Company from './layout/page/company/Company'
import BranchForm from './layout/form/BranchForm'
import { findCompanyName } from './api/FindData'
import { getAllBranch } from './api/Branch'
import CompanyDetail from './layout/page/company/companyDetail/CompanyDetail'
import { Paper } from '@mui/material'
import VendorDetail from './layout/page/people/vendor/VendorDetail'
import { id } from 'date-fns/locale'
function App() {
  const domainName = hostName();
  const profilePath = `http://${domainName}:8085/api/images/`
  const [userName, setUserName] = useState();
  const [role, setRole] = useState();
  const [profile, setProfile] = useState();
  useEffect(() => {
    try {
      setUserName(userObject().userName ? userObject().userName : 'No User Please login');
      setRole(userObject().role);
      setProfile(userObject().image);
    } catch (e) {

    }
  }, [])
  useEffect(() => {
    applicationViewer();
  }, [userName])
  const mobileMenu = () => {
    return (
      <>
        <div class="offcanvas offcanvas-start w-100" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <Menu />
          </div>
        </div>
      </>
    )
  }
  const [pageViewer, setPageViewer] = useState();

  const posApplication = () => {
    try {

      const isDarkMode = Cookies.get("mode");
      if (isDarkMode == 1) {
        return (
          <>
            <PosDark />
          </>
        )
      } else {
        return (
          <>
            <div className="app">
              <div className="d-flex">
                <div className="">
                  <PosMenu />
                </div>
                <div className="content d-block">
                  <div className="app-page">
                    <Routes>
                      <Route path='' element={<PosLight />} />
                      <Route path='/order-history/:id' element={<PosLight />} />
                      <Route path='/order-history' element={<OrderTable />} />
                      <Route path='*' element={<PosLight />} />
                    </Routes>
                  </div>




                </div>
              </div>

            </div>


          </>
        )
      }
    } catch (error) {
      return (
        <>
          <PosLight />
        </>
      )
    }

  }
  const userLoging = () => {
    return (
      <>
        <Login />
      </>
    )
  }

  function applicationViewer() {
    const userType = checkingTypeOfUser();
    // alert(userType);
    if (userType == 1) setPageViewer(() => administrator());
    if (userType == 2) setPageViewer(() => posApplication());
    if (userType == 3) setPageViewer(() => userLoging());
  }
  const navigate = useNavigate();
  const header = () => {
    return (
      <>
        <Paper>

          <div className='d-flex justify-content-between align-items-center w-100 py-2 bg-white d-none d-md-none d-lg-flex  px-2 ps-0 rounded'>
            <div className="start">
              <span className='f-16 text-secondary ps-3'>CAMBODIA</span>
              <div className="f-16  text-start ps-3 border-start border-3 ms-2">
                <p className='pointer hover-line' onClick={() => navigate(`/company-detail/${userObject().branch}`)}>{userObject().branchName ? userObject().branchName : ''}</p>
              </div>
            </div>
            <div className=' end '>
              <div className='fs-4 d-flex'>
                <div className='pointer' onClick={() => {
                  Cookies.set('admin_viewer', 2)
                  window.location.href = '/';
                }}>
                  <HiOutlineComputerDesktop />
                </div>
                <div className="position-relative fs-4 mx-3">
                  <IoChatbubbleEllipsesOutline />
                  <span className="position-absolute top-0 start-100 translate-middle f-14 text-danger">
                    99+
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </div>
                <div className="">
                  <IoTimerOutline />
                </div>

              </div>
              <div className="app-defualt-user d-flex start px-4 py-1 ">
                <img src={`${profilePath}${profile}`} alt="" className="user-img mx-2 rounded-circle p-1 border border-success" />
                <div className="center">
                  <div>
                    <div className='start' style={{ fontSize: 15 }}> <span className='pe-2'>{userName}</span> {role == 'ADMIN' ? <RiVerifiedBadgeFill className='f-20 text-primary' /> : ''}</div>
                    <div className='text-secondary' style={{ fontSize: 10 }}>ROLE|{role}</div>
                  </div>
                </div>
              </div>
              <div className='fs-4 p-2 pointer text-danger' onClick={() => {
                Cookies.remove('user-data')
                location.reload();
              }}>
                <IoExitOutline />
              </div>
            </div>

          </div>
        </Paper>
        <div className='between w-100 box-shadow py-2 rounded mt-2 bg-white d-md-flex d-lg-none d-sm-flex'>
          <div className="menu-btn fs-5 pointer w-100 ms-3">
            <i class="fa-solid fa-bars pointer" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
          </div>
          <button className="btn"
            onClick={() => {
              Cookies.set('admin_viewer', 2);
              location.reload();
              window.location.href = '/';
            }}
          >

            <i class="fa-solid fa-desktop btn-silver p-3 rounded-circle"></i>
          </button>

        </div>
      </>
    )
  }
  const administrator = () => {
    return (
      <>
        <div className="app">
          <div className="d-flex">
            <div className="app-menu  d-none d-xxl-flex">
              <Menu />
            </div>
            <div className="content d-block">
              <div className="app-header mb-2 px-2 mt-2 ps-1">
                {header()}
              </div>
              <div className="app-page">
                <Routes>
                  <Route path='/' element={<Dashboard UserName={userName} />} />
                  <Route path='*' element={<><h1 className="display-1 text-center">Page Not Found</h1></>} />
                  {/* // Categories */}
                  <Route path='/create-category' element={<CategoriesForm />} />
                  <Route path='update-category/:id' element={<CategoriesForm />} />

                  <Route path='/create-vendor' element={<VendorForm />} />
                  <Route path='/update-vendor/:id' element={<VendorForm />} />
                  <Route path='/list-vendor' element={<ViewVendor />} />
                  <Route path='/vendor-detail/:id' element={<VendorDetail />} />

                  <Route path='/list-branch' element={<Company />} />
                  <Route path='/company-detail/:id' element={<CompanyDetail />} />
                  <Route path='/create-branch' element={<BranchForm />} />
                  <Route path='/update-branch/:id' element={<BranchForm />} />


                  <Route path='/desk' element={<Desk />} />
                  <Route path='/list-item' element={<Item />} />
                  <Route path='/create-item' element={<InsertItem />} />
                  <Route path='/update-item/:id' element={<InsertItem />} />
                  <Route path='/item-detail/:id' element={<ItemDetail />} />
                  <Route path='/pos-order' element={<ViewOrder />} />
                  <Route path='/order-detail/:id' element={<OrderDetail />} />
                  <Route path='/list-customer' element={<Customer />} />
                  <Route path='/customer-detail/:id' element={<CustomerDetail />} />
                  <Route path='/chart-of-account' element={<Account />} />
                  <Route path='/employees' element={<Employee />} />
                  <Route path='/employee-detail/:id' element={<EmployeeDetail />} />
                  <Route path='/create-employee' element={<CreateEmployee />} />
                  <Route path='/update-employee/:id' element={<CreateEmployee />} />
                  <Route path='/create-customer' element={<CreateCustomer />} />
                  <Route path='/list-category' element={<Category />} />
                  <Route path='/inventory' element={<Inventory />} />
                  <Route path='/accountant' element={<Accountant />} />
                  <Route path='/reporting' element={<Report />}>
                    <Route path='' element={<NetIncomeChart />} />
                    <Route path='net-income' element={<NetIncomeChart />} />
                    <Route path='expense' element={<Expense />} />
                    <Route path='revenues' element={<Revenues />} />
                    <Route path='payment-method' element={<PaymentMethod />} />
                    <Route path='monthly-sale-report' element={<MonthSaleReport />} />
                    <Route path='best-selling-product' element={<BestSellingMenuItemsChart />} />
                    <Route path='sale-report' element={<SaleReporting />} />
                  </Route>
                  <Route path='/setting' element={<Setting />} />
                  <Route path='/journal' element={<Journal />} />
                  <Route path='/journal-detail/:id' element={<JournalDetail />} />
                  <Route path='/make-journal' element={<MakeJournal />} />
                  <Route path='/make-bill' element={<MakeBill />} />
                  <Route path='/make-payroll' element={<OpenSalary />} />
                  <Route path='/make-account' element={<MakeChartOfAccount />} />
                  <Route path='/report-journal' element={<JouranlReport />} />

                </Routes>

              </div>




            </div>
          </div>

        </div>
      </>
    )
  }


  return (
    <>
      <div className='animation'>
        {pageViewer}
      </div>
      {mobileMenu()}
      {/* <CustomTable /> */}






      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
