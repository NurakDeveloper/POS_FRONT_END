
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
function App() {
  const [userName, setUserName] = useState();
  const [role, setRole] = useState();
  const [profile, setProfile] = useState();
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
            <Routes>
              <Route path='/' element={<PosLight />} />
              <Route path='/custome-table' element={<CustomTable />} />
            </Routes>

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
  const secretkey = "kans983(*93849Jnjsbd@*^@knskldn&^@($*LLjbHHSDuBKJ_)93849uIHUSHD&#%#&^$(@80928()*&*#$&(*"
  function applicationViewer() {
    try {
      const dataEncrypt = Cookies.get("user-data");
      if (dataEncrypt) {
        const userData = decryptData(dataEncrypt, secretkey);
        if (userData) {
          setRole(userData.role);
          setUserName(userData.data.firstName + " " + userData.data.lastName);
          setProfile(userData.data.image);
          if (userData.role == "USER") {
            setPageViewer(() => posApplication());
          } else if (userData.role == "ADMIN") {
            try {
              const admin_viewer = Cookies.get('admin_viewer');
              if (admin_viewer) {
                if (admin_viewer == 1) {
                  setPageViewer(() => administrator());
                } else {
                  setPageViewer(() => posApplication());
                }
              } else {
                setPageViewer(() => administrator());
              }

            } catch (error) {
              setPageViewer(() => administrator());
            }

          } else {
            setPageViewer(() => userLoging());
          }

        }
      } else {
        setPageViewer(() => userLoging());
      }

    } catch (error) {
      setPageViewer(() => userLoging());
    }
  }

  const header = () => {
    return (
      <>
        <div className='between w-100 py-2 rounded bg-none d-none d-md-none d-lg-flex px-3'>
          <div className="fs-5 text-secondary border-start text-start w-25 ps-3">
            <i class="fa-solid fa-bars pointer"></i>
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
            <div className="app-defualt-user d-flex start px-4 border-end  rounded py-1 border-start border-2">
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
              <i class="fa-solid fa-gear p-3 rounded btn-sliver"></i>

            </button>
          </div>

        </div>
        {/* <div className='between w-100 box-shadow py-2 rounded mt-2 bg-white d-md-flex d-lg-none d-sm-flex'>
          <div className="menu-btn fs-5 pointer">
            <i class="fa-solid fa-bars pointer" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
          </div>
          <button className="btn border border-success px-3"
            onClick={() => {
              Cookies.set('admin_viewer', 2);
              location.reload();
            }}
          >
            <i class="fa-solid fa-desktop px-3"></i>
            POS
          </button>
          <div className="app-defualt-user d-flex w-50 end">
            <img src="https://i.pinimg.com/736x/55/33/5c/55335c708ac05d8f469894d08e2671fa.jpg" alt="" className="h-100 mx-2 rounded-circle box-shadow" />
          </div>

        </div> */}
      </>
    )
  }
  const administrator = () => {
    return (
      <>
        <div className="app">
          <div className="d-flex">
            <div className=" p-0 app-menu  d-none d-xxl-flex">
              <Menu />
            </div>
            <div className="content d-block">
              <div className="app-header mb-3">
                {header()}
              </div>
              <div className="app-page">
                <Routes>
                  <Route path='/' element={<Dashboard UserName={userName} />} />
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
                  <Route path='/create-customer' element={<CreateCustomer />} />
                  <Route path='/list-category' element={<Category />} />
                  <Route path='/inventory' element={<Inventory />} />
                  <Route path='/accountant' element={<Accountant />} />
                  <Route path='/reporting' element={<Report />} />
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


    </>
  )
}

export default App
