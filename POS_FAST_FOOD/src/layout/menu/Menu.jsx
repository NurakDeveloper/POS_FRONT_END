import './menu.css';
import { useNavigate } from 'react-router-dom';
import { FaGlobe, FaBolt, FaFileAlt, FaWikipediaW, FaInfoCircle, FaUsers, FaUserCircle, FaUserTie, FaBook, FaAsterisk, FaCog, FaRegistered, FaChevronUp, FaChevronDown, FaAmazonPay } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosAlarm, IoIosArrowRoundForward } from 'react-icons/io';
import { HiOutlineBuildingLibrary, HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { CiMoneyBill } from 'react-icons/ci';
import { RiBillFill } from 'react-icons/ri';
import { TbDashboard } from 'react-icons/tb';
import Cookies from 'js-cookie'


// MenuItem Component
const MenuItem = ({ to, Icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => (isActive ? "active-link" : "menu-item")}
        >
            {({ isActive }) => (isActive ? "active-link" : "menu-item")}
            <span className='w-25'><Icon /></span>
            <span className='w-75 text-start'>{label}</span>
        </NavLink>
    );
};



const MenuTitle = ({ title, children, expanded, onToggle }) => {

    return (
        <div className="menu-title-container">
            <div className="menu-title" onClick={onToggle}>
                <span>{title}</span>
                <span className={`menu-toggle-icon ${expanded ? "expanded" : ""}`}>
                    {expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
                </span>
            </div>
            <div className={`submenu ${expanded ? "expanded" : "collapsed"}`}>
                {children}
            </div>
        </div>
    );
};




// Main Menu Component
const Menu = () => {
    const goto = useNavigate();
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (title) => {
        setExpandedSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    // Configuration for menu items
    const menuConfig = [
        {
            title: 'Application', items: [
                { to: '/', Icon: TbDashboard, label: 'Dashboard' },
                { to: '/list-branch', Icon: HiOutlineBuildingLibrary, label: 'Company' },
            ]
        },
        {
            title: 'Inventory & Management',
            items: [
                { to: '/list-item', Icon: IoIosAlarm, label: 'Product' },
                { to: '/list-category', Icon: FaBolt, label: 'Category' },
            ],
        },
        {
            title: 'Order Reporting',
            items: [
                { to: '/pos-order', Icon: FaFileAlt, label: 'POS Order' },
                // { to: '/web-order', Icon: FaWikipediaW, label: 'Website Order' },
                // { to: '/order-detail', Icon: FaInfoCircle, label: 'Order Details' },
            ],
        },
        {
            title: 'User & Management',
            items: [
                { to: '/employees', Icon: FaUsers, label: 'Employees' },
                { to: '/list-customer', Icon: FaUserCircle, label: 'Customer' },
                { to: '/list-vendor', Icon: FaUserTie, label: 'Vendor' },
            ],
        },
        {
            title: 'Accounting',
            items: [
                { to: '/make-bill', Icon: RiBillFill, label: 'Make Bill' },
                { to: '/make-payroll', Icon: FaAmazonPay, label: 'Payroll' },
                { to: '/journal', Icon: FaBook, label: 'Journal Entries' },
                { to: '/chart-of-account', Icon: FaAsterisk, label: 'Chart of Accounts' },

            ],
        },
        {
            title: 'Reporting',
            items: [
                { to: 'reporting/net-income', Icon: IoIosArrowRoundForward, label: 'Net Income' },
                { to: 'reporting/expense', Icon: IoIosArrowRoundForward, label: 'Expense report' },
                { to: 'reporting/revenues', Icon: IoIosArrowRoundForward, label: 'Revenues report' },
                { to: 'reporting/best-selling-product', Icon: IoIosArrowRoundForward, label: 'Product Renvenues report' },
                { to: 'reporting/monthly-sale-report', Icon: IoIosArrowRoundForward, label: 'Monthly sale report' },
                { to: 'reporting/sale-report', Icon: IoIosArrowRoundForward, label: 'Sale report' },


            ],
        },
    ];
    const rowVariants = {
        hidden: { opacity: 0, X: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // Stagger animation by 0.1 seconds per row
            },
        }),
    };
    const [bgColor, setBgColor] = useState(); // Default color if cookie is missing

    useEffect(() => {
        try {
            const cookieValue = Cookies.get("bg-color");
            console.log("Cookie Value:", cookieValue); // Debugging
            if (cookieValue) {
                setBgColor(cookieValue.startsWith("{") ? JSON.parse(cookieValue) : cookieValue);
            }
        } catch (error) {
            console.error("Error parsing bg-color cookie:", error);
        }
    }, []);
    return (
        <div
            className='h-100 menu box-shadow'
            style={{
                background: bgColor ? bgColor : '#5E6C58',
                overflow: 'scroll',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // For Internet Explorer
            }}
        >
            {/* <div className="app-logo center" onClick={() => goto('/')}>
                <img src="https://t3.ftcdn.net/jpg/04/27/95/84/360_F_427958467_sZPM6PU5YRFAUHGvvqDGbqgtAez26rwo.jpg" alt="Logo" className='h-100' />
                
            </div> */}
            {/* <hr style={{ width: '50%' }} /> */}
            <nav>
                {menuConfig.map((section, index) => (
                    <motion.div
                        key={index}
                        className='animation-opacity'
                        custom={index} // Pass index for staggered delay
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {section.title ? (
                            <MenuTitle

                                title={section.title}
                                expanded={expandedSections[section.title]}
                                onToggle={() => toggleSection(section.title)}
                            >
                                {section.items.map((item, idx) => (
                                    <MenuItem key={idx} to={item.to} Icon={item.Icon} label={item.label} />
                                ))}
                            </MenuTitle>
                        ) : (
                            section.items.map((item, idx) => (
                                <MenuItem key={idx} to={item.to} Icon={item.Icon} label={item.label} />
                            ))
                        )}
                    </motion.div>
                ))}
            </nav>
        </div>
    );
};

export default Menu;
