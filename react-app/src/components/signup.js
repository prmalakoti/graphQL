import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SIGNUP_USER } from '../gqlOperations/mutation';
const Signup = () => {

    const [formData, setFormData] = useState({});

    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

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
        signupUser({
            variables: {
                userNew: formData
            }
        });
    }
    return (
        <div className=" m-2 p-2 w-6/12 container mx-auto">
            {
                error &&
                <div className='red'>
                    {error.message}
                </div>
            }

            {
                data && data.user && <div className='green'> You can login now {data.user.firstName} </div>
            }
            <div className=' font-bold mb-2'>Signup!!</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder='Enter first name'
                    value={formData.firstName}
                    name="firstName"
                    onChange={(e) => handelChange(e)}
                    required
                />
                <input
                    type="text"
                    placeholder='Enter last name'
                    value={formData.lastName}
                    name="lastName"
                    onChange={(e) => handelChange(e)}
                    required
                />
                <input
                    type="email"
                    placeholder='Enter Email'
                    value={formData.email}
                    name="email"
                    onChange={(e) => handelChange(e)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    name="password"
                    onChange={(e) => handelChange(e)}
                    required
                />
                <Link to="/login"> <p className=' text-blue-500'> Already have an account?</p> </Link>
                <button type="submit" className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>Submit</button>
            </form>
        </div>
    )

}

export default Signup