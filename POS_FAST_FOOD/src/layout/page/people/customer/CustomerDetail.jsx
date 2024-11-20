

const CustomerDetail = () => {
    return (
        <>

            <div>
                <div className="row">
                    <div className="col-xl-9 col-md-7 col-12">
                        <div className="form-heder w-100 bg-white" style={{ maxHeight: '130px' }}>
                            <form className="d-flex h-100" >
                                <div className='start w-50 p-2'>
                                    <div className='w-100 px-4'>
                                        <div className="fs-2">Dara Chhun</div>
                                        <div className="fs-6 text-secondary">Seller Manger</div>
                                    </div>
                                </div>

                                <div className='end p-2 w-50 d-flex'>
                                    <div className='d-flex' style={{ height: '120px', width: '170px', overflow: 'hidden' }}>
                                        <div className='d-block text-center fs-6' style={{ width: '40px' }}>
                                            <div className=' pointer'>
                                                <i class="fa-solid fa-pen font-12"></i>
                                            </div>
                                            <div className=' pointer mt-2'>
                                                <i class="fa-solid fa-trash font-12 text-danger"></i>
                                            </div>

                                        </div>
                                        <div className='center box-shadow rounded' style={{ height: '120px', width: '130px', overflow: 'hidden' }}>
                                            <img src="https://thumbs.dreamstime.com/b/woman-sit-sofa-laptop-laughing-look-camera-happy-indian-feel-overjoyed-leisure-internet-enjoy-modern-wireless-330121579.jpg" alt="" className="h-100" />
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="d-flex">
                            <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                <p className='hover-line pointer'> <span className='text-secondary'>Customer ? </span>Dara Chuun</p>
                                <p className='hover-line pointer'><span className='text-secondary'>Branch ? </span> Toul Kok</p>
                                <p className=''> mobile : 03999025982</p>

                            </div>
                            <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                <p className=''> join Date : 2024/10/10</p>
                                <p className=''> address : Cash</p>
                                <p className=''> contact : USD</p>


                            </div>
                        </div>
                        <div className='bg-white py-3'>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="text-dark nav-link  border-bottom active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Contact & Address</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Internal note</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="text-dark nav-link " id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Membership</button>
                                </li>

                            </ul>

                            <div class="tab-content border-0" id="myTabContent">
                                <div class="border-0 tab-pane show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    <div className="center">
                                        <div className='w-100'>
                                            <form action="" className='w-100'>
                                                <div className='group-box w-100 d-flex bg-white rounded'>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                    <textarea name="" id="" className='w-100 border'></textarea>
                                </div>
                                <div class="border-0 tab-pane " id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <div className="d-block m-auto px-2 py-3 bg-white sticky rounded">
                            <div className="menu-item border-bottom">
                                <span className='menu-icon fs-6'><i class="fa-solid fa-pen "></i></span>
                                <span className='btn-menu-link'>Edit</span>
                            </div>

                            <div className="menu-item border-bottom">
                                <span className='menu-icon fs-6'><i class="fa-solid fa-trash"></i></span>
                                <span className='btn-menu-link '>Remove</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}





export default CustomerDetail
