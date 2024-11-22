import './menu.css'
import { NavLink } from 'react-router-dom'
const MobileMenu = () => {
    return (
        <>


            <div className="container-fluid p-0">
                <nav>
                    <div className="row">
                        <div className="col-md-4 col-6">
                            <div className="card">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "  m-link" : "m-item"
                                    }
                                >
                                    <i className="fa-solid fa-globe"></i>
                                    <div className="">Dashboard</div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <div className="card">
                                <NavLink
                                    to="/list-item"
                                    className={({ isActive }) =>
                                        isActive ? "  m-link" : "m-item"
                                    }
                                >
                                    <i className="fa-solid fa-globe"></i>
                                    <div className="">Product</div>
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </nav>

            </div>


        </>
    )
}

export default MobileMenu
