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
                <div className="menu-item" onClick={() => goto('/')}>
                    <span className='w-25'><i class="fa-solid fa-globe"></i></span>
                    <span className='w-75 text-start'>Dashboard</span>
                </div>
                <div className="menu-item" onClick={() => goto('/inventory')}>
                    <span className='w-25'><i class="fa-solid fa-layer-group"></i></span>
                    <span className='w-75 text-start'>inventory</span>
                </div>
                {/* <div className="menu-title fs-6">
                    POS & ORDER
                </div> */}
                <div className="menu-item" onClick={() => goto('/pos-order')}>
                    <span className='w-25'><i class="fa-solid fa-eye"></i></span>
                    <span className='w-75 text-start'>Pos Order</span>
                </div>
                {/* <div className="menu-title fs-6">
                    USER
                </div> */}
                <div className="menu-item" onClick={() => goto('/employees')}>
                    <span className='w-25'><i class="fa-solid fa-users"></i></span>
                    <span className='w-75 text-start'>Employees</span>
                </div>
                <div className="menu-item" onClick={() => goto('/list-customer')}>
                    <span className='w-25'><i class="fa-solid fa-circle-user"></i></span>
                    <span className='w-75 text-start'>Customer</span>
                </div>
                {/* <div className="menu-title fs-6">
                    ACCOUNTANT
                </div> */}
                <div className="menu-item" onClick={() => goto('/accountant')}>
                    <span className='w-25'><i class="fa-solid fa-business-time"></i></span>
                    <span className='w-75 text-start'>Accountant</span>
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
