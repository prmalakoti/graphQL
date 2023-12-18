import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SIGNUP_LOGIN_USER } from '../gqlOperations/mutation';

const Login = () => {
    const navigate = useNavigate();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({});

    const [signinUser, { error, loading }] = useMutation(SIGNUP_LOGIN_USER, {
        onCompleted(data) {
            localStorage.setItem("token", data.user.token);
            navigate("/");
        }
    });

    if (loading) return <h1>Lodaing</h1>

    const handelChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        signinUser({
            variables: {
                userSignin: formData
            }
        });
    }
    return (
        <div className="m-2 p-2 w-6/12 container mx-auto">
            {
                error &&
                <div className='red'>
                    {error.message}
                </div>
            }
            <div className=' font-bold mb-2'>Login!</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="email"
                    placeholder='Enter Email'
                    value={formData.email}
                    name="email"
                    //onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handelChange(e)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    name="password"
                    //onChange={(e) => setPassword(e.target.value)}
                    onChange={(e) => handelChange(e)}
                />
                <Link to="/signup"> <p className='text-blue-500'> Don't have an account?</p> </Link>
                <button type="submit" className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Login</button>
            </form>
        </div>
    )

}

export default Login