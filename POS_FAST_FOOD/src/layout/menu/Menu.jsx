import './menu.css'
import { useNavigate } from 'react-router-dom'
const Menu = () => {
    const goto = useNavigate();
    return (
        <>
            <div className=' rounded h-100 bg-white menu' style={{ overflow: 'scroll' }}>
                <div className="app-logo p-2" onClick={() => goto('/')}>
                    <img src="src/assets/image/logo.png" alt="" className='h-100' /> <br />
                    <div className='px-4 fw-bold fs-6'>FAST FOOD KH.</div>
                </div>
                <hr />
                <div className="menu-item" onClick={() => goto('/')}>
                    <span className='w-25'><i class="fa-solid fa-globe"></i></span>
                    <span className='w-75 text-start'>Dashboard</span>
                </div>
                <div className="menu-title">
                    Inventory
                </div>
                <div className="menu-item" onClick={() => goto('/list-item')}>
                    <span className='w-25'><i class="fa-solid fa-bowl-food"></i></span>
                    <span className='w-75 text-start'>Product</span>
                </div>
                <div className="menu-item" onClick={() => goto('/list-category')}>
                    <span className='w-25'><i class="fa-solid fa-bolt"></i></span>
                    <span className='w-75 text-start'>Category</span>
                </div>
                <div className="menu-item" onClick={() => goto('/list-category')}>
                    <span className='w-25'><i class="fa-solid fa-layer-group"></i></span>
                    <span className='w-75 text-start'>Purchase</span>
                </div>
                <div className="menu-title ">
                    Order reporting
                </div>
                <div className="menu-item" onClick={() => goto('/pos-order')}>
                    <span className='w-25'><i class="fa-solid fa-file-lines"></i></span>
                    <span className='w-75 text-start'>Pos order</span>
                </div>

                <div className="menu-item" onClick={() => goto('/pos-order')}>
                    <span className='w-25'><i class="fa-brands fa-wikipedia-w"></i></span>
                    <span className='w-75 text-start'>Website order</span>
                </div>
                <div className="menu-item" onClick={() => goto('/pos-order')}>
                    <span className='w-25'><i class="fa-solid fa-circle-info"></i></span>
                    <span className='w-75 text-start'>Order details</span>
                </div>
                <div className="menu-title">
                    User Management
                </div>
                <div className="menu-item" onClick={() => goto('/employees')}>
                    <span className='w-25'><i class="fa-solid fa-users"></i></span>
                    <span className='w-75 text-start'>Employees</span>
                </div>

                <div className="menu-item" onClick={() => goto('/list-customer')}>
                    <span className='w-25'><i class="fa-solid fa-circle-user"></i></span>
                    <span className='w-75 text-start'>Customer</span>
                </div>
                <div className="menu-item" onClick={() => goto('/list-vendor')}>
                    <span className='w-25'><i class="fa-solid fa-user-tie"></i></span>
                    <span className='w-75 text-start'>Vendor</span>
                </div>
                <div className="menu-title">
                    Accounting
                </div>
                <div className="menu-item" onClick={() => goto('/journal')}>
                    <span className='w-25'><i class="fa-solid fa-book"></i></span>
                    <span className='w-75 text-start'>Journal entries</span>
                </div>
                <div className="menu-item" onClick={() => goto('/chart-of-account')}>
                    <span className='w-25'><i class="fa-solid fa-asterisk"></i></span>
                    <span className='w-75 text-start'>Chart of accounts</span>
                </div>
                {/* <div className="menu-title fs-6">
                    ATTRIBUTE
                </div> */}
                <div className="menu-item" onClick={() => goto('/setting')}>
                    <span className='w-25'><i class="fa-solid fa-gear"></i></span>
                    <span className='w-75 text-start'>Setting</span>
                </div>




            </div>
            {/* <div className='box-shadow menu h-100 bg-white' style={{ overflow: 'scroll' }}>
                <div className="app-logo p-2 " onClick={() => goto('/')}>
                    <img src="https://cdn-icons-png.freepik.com/512/11801/11801058.png" alt="" className='h-100 ' />
                </div>
                <div className="menu-item px-2" onClick={() => goto('/')}>
                    <span className='menu-icon '><i class="fa-solid fa-globe"></i></span>
                </div>
                <div className="menu-item" onClick={() => goto('/inventory')}>
                    <span className='menu-icon'><i class="fa-solid fa-layer-group"></i></span>
                </div>
                <div className="menu-item" onClick={() => goto('/pos-order')}>
                    <span className='menu-icon'><i class="fa-solid fa-eye"></i></span>
                </div>
                <div className="menu-item" onClick={() => goto('/desk')}>
                    <span className='menu-icon'><i class="fa-solid fa-burger"></i></span>                </div>
                <div className="menu-item" onClick={() => goto('/administrator')}>
                    <span className='menu-icon'><i class="fa-solid fa-user"></i></span>

                </div>
                <div className="menu-item" onClick={() => goto('/employees')}>
                    <span className='menu-icon'><i class="fa-solid fa-users"></i></span>
                </div>
                <div className="menu-item" onClick={() => goto('/list-customer')}>
                    <span className='menu-icon'><i class="fa-solid fa-circle-user"></i></span>

                </div>
                <div className="menu-item" onClick={() => goto('/accountant')}>
                    <span className='menu-icon'><i class="fa-solid fa-business-time"></i></span>

                </div>
                <div className="menu-item" onClick={() => goto('/setting')}>
                    <span className='menu-icon'><i class="fa-solid fa-gear"></i></span>

                </div>




            </div> */}
        </>

    )
}

export default Menu
