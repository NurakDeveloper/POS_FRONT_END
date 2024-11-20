import React, { useState } from 'react'
import './form.css'
import { loginAccount } from '../../api/UserApi';
import { encryptData } from '../../cryptoJs/Crypto';
import Cookies from 'js-cookie';
const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    function getValueUserName(e) {
        setUserName(e.target.value);
    }
    function getValuePassword(e) {
        setPassword(e.target.value);
    }
    function LoginForm() {
        return (
            <div class="container-fluid fixed-top h-100  w-100 bg-white p-0 login center ">
                <div className='h-100 w-100 fixed-top form-back'></div>
                <div className="center fixed-top h-75 w-100">
                    <form class="form-login d-block" action="">
                        <h1 class="my-3 text-center text-white">Login your account</h1>

                        <div class="input-field mt-4">
                            <input
                                required="not null"
                                autocomplete="off"
                                type="text"
                                name="username"
                                id="password"
                                className='txt-bottom w-100 text-white py-2'
                                placeholder='username'
                                onChange={getValueUserName}
                                value={userName}

                            />

                        </div>
                        <div class="input-field mt-4">
                            <input
                                required="not null"
                                autocomplete="off"
                                type="text"
                                name="username"
                                id="password"
                                className='txt-bottom w-100 text-white py-2'
                                placeholder='password'
                                onChange={getValuePassword}
                                value={password}

                            />

                        </div>
                        <div class="btn-container mt-4">
                            <button class="btn bg-green text-white w-100 py-3 b-shadow rounded-10" onClick={isLogin}>Login</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
    const secretkey = "kans983(*93849Jnjsbd@*^@knskldn&^@($*LLjbHHSDuBKJ_)93849uIHUSHD&#%#&^$(@80928()*&*#$&(*"

    function isLogin(e) {
        e.preventDefault();
        const obj = { userName, password };
        loginAccount(obj).then((reponse) => {
            const encryptUser = encryptData(reponse.data, secretkey);
            Cookies.set("user-data", encryptUser, { expires: 1 });
            Cookies.set("user_id", reponse.data.userId, { expires: 1 });
            location.reload();
        }).catch(error => {
            alert(error);
        })
    }

    return (
        <>
            <div className='login center'>
                {LoginForm()}
            </div>
        </>
    )
}

export default Login
