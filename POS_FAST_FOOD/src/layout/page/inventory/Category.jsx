import { Link } from 'react-router-dom'
import './item.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Category = () => {
    const foodItems = [
        {
            id: 1,
            name: "Cheese Pizza",
            defualPrice: 8.99,
            PriceOut: 9.99,
            description: "Classic cheese pizza with a crispy crust and mozzarella.",
            category_id: 1,
            calories: 250,
            isAvailable: true,
            recommentDrink: "Coke",
            IsSpecial: false,
            BranchID: 101,
            preparation_time: 15,
            Image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"
        },
        {
            id: 2,
            name: "Burger Combo",
            defualPrice: 7.99,
            PriceOut: 8.99,
            description: "Juicy beef burger with fries and a drink.",
            category_id: 1,
            calories: 700,
            isAvailable: true,
            recommentDrink: "Pepsi",
            IsSpecial: true,
            BranchID: 102,
            preparation_time: 10,
            Image: "https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg"
        },
        {
            id: 3,
            name: "Chicken Nuggets",
            defualPrice: 4.99,
            PriceOut: 5.99,
            description: "Crispy golden chicken nuggets served with dipping sauce.",
            category_id: 2,
            calories: 350,
            isAvailable: true,
            recommentDrink: "Sprite",
            IsSpecial: false,
            BranchID: 101,
            preparation_time: 8,
            Image: "https://images.pexels.com/photos/2274329/pexels-photo-2274329.jpeg"
        },
        {
            id: 4,
            name: "Loaded Fries",
            defualPrice: 3.99,
            PriceOut: 4.49,
            description: "Fries topped with cheese, bacon, and sour cream.",
            category_id: 3,
            calories: 500,
            isAvailable: true,
            recommentDrink: "Lemonade",
            IsSpecial: true,
            BranchID: 102,
            preparation_time: 7,
            Image: "https://images.pexels.com/photos/1580468/pexels-photo-1580468.jpeg"
        },
        {
            id: 5,
            name: "Pepperoni Pizza",
            defualPrice: 9.99,
            PriceOut: 10.99,
            description: "Spicy pepperoni slices on a cheese pizza base.",
            category_id: 1,
            calories: 270,
            isAvailable: true,
            recommentDrink: "Root Beer",
            IsSpecial: false,
            BranchID: 103,
            preparation_time: 15,
            Image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"
        },
        {
            id: 6,
            name: "BBQ Wings",
            defualPrice: 6.99,
            PriceOut: 7.49,
            description: "Grilled chicken wings glazed in BBQ sauce.",
            category_id: 2,
            calories: 400,
            isAvailable: true,
            recommentDrink: "Beer",
            IsSpecial: true,
            BranchID: 101,
            preparation_time: 12,
            Image: "https://images.pexels.com/photos/853006/pexels-photo-853006.jpeg"
        },
        {
            id: 7,
            name: "Hot Dog",
            defualPrice: 3.99,
            PriceOut: 4.49,
            description: "Classic hot dog topped with mustard and onions.",
            category_id: 4,
            calories: 250,
            isAvailable: true,
            recommentDrink: "Iced Tea",
            IsSpecial: false,
            BranchID: 104,
            preparation_time: 5,
            Image: "https://images.pexels.com/photos/2233726/pexels-photo-2233726.jpeg"
        },
        {
            id: 8,
            name: "Veggie Pizza",
            defualPrice: 8.99,
            PriceOut: 9.99,
            description: "A pizza loaded with bell peppers, onions, and olives.",
            category_id: 1,
            calories: 230,
            isAvailable: true,
            recommentDrink: "Lemonade",
            IsSpecial: false,
            BranchID: 105,
            preparation_time: 15,
            Image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"
        },
        {
            id: 9,
            name: "Fish and Chips",
            defualPrice: 5.99,
            PriceOut: 6.99,
            description: "Crispy fried fish served with golden fries.",
            category_id: 5,
            calories: 600,
            isAvailable: true,
            recommentDrink: "Beer",
            IsSpecial: true,
            BranchID: 106,
            preparation_time: 12,
            Image: "https://images.pexels.com/photos/461354/pexels-photo-461354.jpeg"
        },
        {
            id: 10,
            name: "Taco Platter",
            defualPrice: 6.99,
            PriceOut: 7.49,
            description: "Three tacos with a variety of fillings and toppings.",
            category_id: 6,
            calories: 500,
            isAvailable: true,
            recommentDrink: "Margarita",
            IsSpecial: true,
            BranchID: 107,
            preparation_time: 10,
            Image: "https://images.pexels.com/photos/461354/pexels-photo-461354.jpeg"
        },
        {
            id: 11,
            name: "Fried Chicken Sandwich",
            defualPrice: 6.49,
            PriceOut: 7.49,
            description: "Crispy fried chicken breast on a toasted bun with lettuce and mayo.",
            category_id: 1,
            calories: 550,
            isAvailable: true,
            recommentDrink: "Coke",
            IsSpecial: true,
            BranchID: 108,
            preparation_time: 10,
            Image: "https://images.pexels.com/photos/2233726/pexels-photo-2233726.jpeg"
        },
        {
            id: 12,
            name: "BBQ Pulled Pork Sandwich",
            defualPrice: 7.99,
            PriceOut: 8.99,
            description: "Slow-cooked BBQ pork in a sandwich with coleslaw.",
            category_id: 2,
            calories: 600,
            isAvailable: true,
            recommentDrink: "Iced Tea",
            IsSpecial: false,
            BranchID: 109,
            preparation_time: 12,
            Image: "https://images.pexels.com/photos/2274329/pexels-photo-2274329.jpeg"
        },
        {
            id: 13,
            name: "Mozzarella Sticks",
            defualPrice: 4.99,
            PriceOut: 5.49,
            description: "Fried mozzarella sticks served with marinara sauce.",
            category_id: 3,
            calories: 300,
            isAvailable: true,
            recommentDrink: "Sprite",
            IsSpecial: false,
            BranchID: 101,
            preparation_time: 5,
            Image: "https://images.pexels.com/photos/6277980/pexels-photo-6277980.jpeg"
        },
        {
            id: 14,
            name: "Philly Cheesesteak",
            defualPrice: 8.49,
            PriceOut: 9.49,
            description: "Grilled steak with melted cheese, onions, and peppers in a sub.",
            category_id: 4,
            calories: 800,
            isAvailable: true,
            recommentDrink: "Root Beer",
            IsSpecial: true,
            BranchID: 102,
            preparation_time: 15,
            Image: "https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg"
        },
        {
            id: 15,
            name: "Caesar Salad",
            defualPrice: 5.99,
            PriceOut: 6.99,
            description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan.",
            category_id: 7,
            calories: 200,
            isAvailable: true,
            recommentDrink: "Water",
            IsSpecial: false,
            BranchID: 103,
            preparation_time: 5,
            Image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
        },
        {
            id: 16,
            name: "Buffalo Chicken Wrap",
            defualPrice: 6.49,
            PriceOut: 7.49,
            description: "Spicy buffalo chicken wrapped with lettuce and ranch dressing.",
            category_id: 2,
            calories: 400,
            isAvailable: true,
            recommentDrink: "Lemonade",
            IsSpecial: true,
            BranchID: 104,
            preparation_time: 8,
            Image: "https://images.pexels.com/photos/774467/pexels-photo-774467.jpeg"
        }]

    const categories = [
        {
            id: 1, // Unique identifier for the category
            name: 'Fast Food', // Name of the category
            parentId: null, // If it's a parent category, set to null or ID of the parent if it's a subcategory
            level: 1, // Level can define hierarchy, e.g., 1 for main category, 2 for subcategory
            description: 'A category for fast food items', // Description of the category
            image: 'https://i.pinimg.com/736x/18/b2/df/18b2dfd0c1c7d996b02ddf5b425f9f33.jpg'
        },
        {
            id: 2,
            name: 'Burgers',
            parentId: 1, // Refers to the parent category ID (Fast Food)
            level: 2,
            description: 'A variety of delicious burgers',
            image: 'https://i.pinimg.com/736x/95/24/3f/95243f7068b90b213d532d9d2f22552a.jpg'
        },
        {
            id: 3,
            name: 'Pizzas',
            parentId: 1, // Refers to the parent category ID (Fast Food)
            level: 2,
            description: 'Delicious pizzas with various toppings',
            image: 'https://i.pinimg.com/736x/1b/48/cf/1b48cf09b8844ea06b47980351796c82.jpg'
        }
    ];

    const goto = useNavigate();
    function listCard() {
        return (
            <div className="row w-100">
                {
                    categories.map(o =>
                        <div className="col-xl-4 col-sm-12">
                            <div className="card border-0 bg-white p-0 border-3 pointer mb-2 box-shadow inv-card"
                                onClick={() => goto(`/customer-detail`)}
                                style={{ height: '150px' }}
                            >
                                <div className="card-body p-0 inv-card rounded ">
                                    <div className="d-flex">
                                        <div className="w-25 start ">
                                            <div className="center rounded box-shadow" style={{ height: '150px', overflow: 'hidden' }}>
                                                <img src={o.image} alt="" className='h-100 rounded' />
                                            </div>
                                        </div>
                                        <div className='font-12 w-75 ps-4 py-3'>
                                            <div className='fs-5'>{o.name}</div>
                                            <div className='font-12 text-secondary'>{o.description} min</div>
                                            <div className='text-start'>12 Product</div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    function listTable() {
        return (
            <div className="card border-0">
                <div className="card-body p-0 border">
                    <table className="table table-striped table-hover">
                        <thead valign='middle'>
                            <tr>
                                <td>
                                    <input type="checkbox" name="" className='rounded-0 border pointer px-3' id="" />
                                </td>
                                <td className='py-3'>No</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Parent</td>
                                <td>Level</td>



                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((f, i) =>
                                    <tr className="pointer" onClick={() => goto(`/item-detail`)}>
                                        <td>
                                            <input type="checkbox" name="" className='rounded-0 border px-3' id="" />
                                        </td>
                                        <td className='py-3'>{i + 1}</td>
                                        <td>{f.name}</td>
                                        <td>{f.description}</td>
                                        <td>{f.parentId}</td>
                                        <td>{f.level}</td>



                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
    const [itemView, setItemView] = useState();
    useEffect(() => {
        setView(1);
    }, [])
    function setView(index) {
        if (index == 1) {
            setItemView(() => listCard())
        } else {
            setItemView(() => listTable())
        }
    }
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-xl-10 col-md-9 col-12">
                        {itemView}
                    </div>
                    <div className="col-xl-2 col-md-3 col-12">
                        <div className="d-block px-2 py-3 bg-white sticky rounded">
                            <Link className="menu-item border-bottom nav-link" to='/create-item'>
                                <span className='menu-icon'><i class="fa-solid fa-circle-plus"></i></span>
                                <span className='btn-menu-link'>New</span>
                            </Link>

                            <div className="menu-item border-bottom">
                                <span className='menu-icon'><i class="fa-solid fa-print"></i></span>
                                <span className='btn-menu-link'>Print</span>
                            </div>

                            <div className="menu-item border-bottom">
                                <span className='menu-icon'><i class="fa-solid fa-file-export"></i></span>
                                <span className='btn-menu-link'>Export</span>
                            </div>
                            <div className="menu-item border-bottom" onClick={() => setView(2)}>
                                <span className='menu-icon'><i class="fa-solid fa-list"></i></span>
                                <span className='btn-menu-link'>List</span>
                            </div>
                            <div className="menu-item border-bottom" onClick={() => setView(1)}>
                                <span className='menu-icon'><i class="fa-brands fa-microsoft"></i></span>
                                <span className='btn-menu-link'>Card</span>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category
