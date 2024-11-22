import './postest.css'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
const PosMenu = () => {
    const goto = useNavigate();
    return (
        <>
            <div className='pos-menu'>

                <nav className='text-center'>
                    <div className='pb-4'>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "pos-active" : "pos-item"
                            }
                        >
                            <i class="fa-solid fa-tablet-screen-button w-100"></i>

                        </NavLink>
                    </div>
                    <div className='pb-4'>
                        <NavLink
                            to="/notification"
                            className={({ isActive }) =>
                                isActive ? "pos-active" : "pos-item"
                            }
                        >
                            <i class="fa-solid fa-bell w-100"></i>

                        </NavLink>
                    </div>
                    <div className='pb-4'>
                        <NavLink
                            to="/setting"
                            className={({ isActive }) =>
                                isActive ? "pos-active" : "pos-item"
                            }
                        >
                            <i class="fa-solid fa-gear w-100"></i>
                        </NavLink>
                    </div>
                    <div className='pb-4'>
                        <NavLink

                            className={({ isActive }) =>
                                isActive ? "pos-active" : "pos-item"
                            }
                            onClick={() => {
                                Cookies.set("admin_viewer", 1);
                                window.location.href = '/'
                                location.reload();
                            }}
                        >
                            <i class="fa-solid fa-arrow-right-from-bracket w-100"></i>
                        </NavLink>
                    </div>


                </nav>






            </div>

        </>

    )
}

export default PosMenu
