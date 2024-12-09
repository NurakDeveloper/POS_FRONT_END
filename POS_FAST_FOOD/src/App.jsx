
import './App.css'
import Menu from './layout/menu/Menu'
import { Routes, Route } from 'react-router-dom'
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
import MonthSaleReport from './layout/page/report/monthlysalereport/MonthSaleReport'
import BestSellingMenuItemsChart from './layout/page/report/bestsellingproduct/BestSellingMenuItemsChart'
import { IoSettingsOutline } from 'react-icons/io5'
import { checkingTypeOfUser } from './api/AppConfig'
import { userObject } from './api/AppConfig'
import CategoriesForm from './layout/form/inventory/CategoriesForm'
function App() {
  const [userName, setUserName] = useState();
  const [role, setRole] = useState();
  const [profile, setProfile] = useState();
  useEffect(() => {
    // setUserName(userObject().userName ? userObject().userName : 'No User Please login');
    // setRole(userObject().role);
    // setProfile(userObject().image);
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

  const header = () => {
    return (
      <>
        <div className='between w-100 py-2 bg-none d-none d-md-none d-lg-flex border-bottom'>
          <div className="fs-5 text-secondary border-start text-start w-25 ps-3">
            <i class="fa-solid fa-bars pointer" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
          </div>
          <div className='d-flex w-75 end '>
            <div className=''>

              <button className="btn"
                onClick={() => {
                  Cookies.set('admin_viewer', 2);
                  location.reload();
                }}
              >

                <i class="fa-solid fa-message btn-silver p-3 rounded-circle"></i>
              </button>
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
            <div className="app-defualt-user d-flex start px-4 py-1 border-start border-1">
              <img src={`/src/assets/image/${profile}`} alt="" className="user-img mx-2 rounded-circle " />
              <div className="center">
                <div>
                  <div className='' style={{ fontSize: 15 }}>{userName}</div>
                  <div className='text-secondary' style={{ fontSize: 10 }}>ROLE|{role}</div>
                </div>
              </div>
            </div>
            <button className="btn"
              onClick={() => {
                Cookies.set('admin_viewer', 2);
                location.reload();
              }}
            >
              <IoSettingsOutline />
              {/* <i class="fa-solid fa-gear p-3 rounded btn-sliver"></i> */}

            </button>
          </div>

        </div>
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
            <div className=" px-1 app-menu  d-none d-xxl-flex">
              <Menu />
            </div>
            <div className="content d-block">
              <div className="app-header mb-3">
                {header()}
              </div>
              <div className="app-page">
                <Routes>
                  <Route path='/' element={<Dashboard UserName={userName} />} />
                  {/* // Categories */}
                  <Route path='/create-category' element={<CategoriesForm />} />
                  <Route path='update-category/:id' element={<CategoriesForm />} />
                  <Route path='/desk' element={<Desk />} />
                  <Route path='/list-item' element={<Item />} />
                  <Route path='/create-item' element={<InsertItem />} />
                  <Route path='/update-item/:id' element={<InsertItem />} />
                  <Route path='/item-detail/:id' element={<ItemDetail />} />
                  <Route path='/pos-order' element={<ViewOrder />} />
                  <Route path='/order-detail/:id' element={<OrderDetail />} />
                  <Route path='/list-customer' element={<Customer />} />
                  <Route path='/customer-detail' element={<CustomerDetail />} />
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
                    <Route path='payment-method' element={<PaymentMethod />} />
                    <Route path='monthly-sale-report' element={<MonthSaleReport />} />
                    <Route path='best-selling-product' element={<BestSellingMenuItemsChart />} />
                  </Route>
                  <Route path='/setting' element={<Setting />} />
                  <Route path='/journal' element={<Journal />} />
                  <Route path='/journal-detail/:id' element={<JournalDetail />} />
                  <Route path='/make-journal' element={<MakeJournal />} />
                  <Route path='/make-bill' element={<MakeBill />} />
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
