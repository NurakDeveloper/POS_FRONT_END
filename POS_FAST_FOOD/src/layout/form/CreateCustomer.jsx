
const CreateCustomer = () => {
    return (
        <>

            <div>
                <div className="row">
                    <div className="col-xl-9 col-md-7 col-12">
                        <div className="form-heder w-100 bg-white" style={{ maxHeight: '130px' }}>
                            <form className="d-flex h-100" >
                                <div className='start w-50 p-2'>
                                    <div className='w-100 px-4'>
                                        <div className="fs-2">
                                            <input type="text" className='w-75 text-start text-secondary input-box' placeholder="eng. Employee name" />
                                        </div>
                                        <div className="fs-6 text-secondary">
                                            <input type="text" className='w-75 text-start text-secondary input-box' placeholder="Position" />
                                        </div>
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
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Address  </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" Street . . ." />
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start opacity-0'>AddressLine2  </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" City . . . " />
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start opacity-0'>Email ? </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" Country . . ." />
                                </div>

                            </div>
                            <div className='d-block text-start fs-6 bg-white px-4 py-2 w-50'>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>RegisterDate ? </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Mobile  </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Email  </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                </div>
                                <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                    <p className='w-25 text-start'>Zip </p>
                                    <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                </div>

                            </div>
                        </div>
                        <div className='bg-white py-3'>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="text-dark nav-link  border-bottom active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Contact & Address</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="text-dark nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Membership</button>
                                </li>

                            </ul>

                            <div class="tab-content border-0" id="myTabContent">
                                <div class="border-0 tab-pane show active p-2" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    <button className="btn bg-green box-shadow rounded px-4 text-white">New</button>
                                </div>
                                <div class="border-0 tab-pane p-2" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Member Level ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>Discount ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                    </div>
                                    <div className='group-input center w-100 py-1' style={{ fontSize: 16 }}>
                                        <p className='w-25 text-start'>PhoneNumber ? </p>
                                        <input type="text" className='w-75 text-start text-secondary input-box' placeholder=" . . ." />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-5 col-12">
                        <div className="d-block m-auto px-2 py-3 bg-white sticky rounded">
                            <div className="menu-item border-bottom">
                                <span className='menu-icon fs-6'><i class="fa-solid fa-floppy-disk"></i></span>
                                <span className='btn-menu-link'>Save</span>
                            </div>

                            <div className="menu-item border-bottom">
                                <span className='menu-icon fs-6'><i class="fa-solid fa-xmark"></i></span>
                                <span className='btn-menu-link '>Cancel</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}





export default CreateCustomer
