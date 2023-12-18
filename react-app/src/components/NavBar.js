import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useMutation } from "@apollo/client";



export default function NavBar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const client = useApolloClient();

    const Logout = () => {
        localStorage.removeItem("token")
        // client.cache.reset()
        // useMutation({
        //     refetchQueries: [
        //         'getAllQuotes',
        //         'getMyProfile'
        //     ]
        // })
        navigate('/login')
    }

    return (
        <div className="flex justify-between shadow-md sm:bg-blue-300 rounded-md">
            <div>
                <Link to="/">
                    <h1 className="ml-5 mt-5 mb-5 text-3xl font-bold cursor-pointer italic decoration-double"> Quote App</h1>
                </Link>
            </div>
            <div className="nav-item">
                <ul className="flex p-15, mt-5 mb-5">
                    <li className="px-4 font-medium">
                        <Link to="/"> Home </Link> </li>
                    {
                        !token ?
                            <>
                                <li className="px-4 font-medium">
                                    <Link to="/login"> Login </Link>
                                </li>
                                <li className=' px-4 font-medium'>
                                    <Link to="/signup"> Signup </Link>
                                </li>
                            </> :
                            <>
                                <li className='px-4 font-medium'>
                                    <Link to="/profile"> Profile </Link>
                                </li>
                                <li className='px-4 font-medium'>
                                    <Link to="/create"> Create </Link>
                                </li>
                                <li className='px-4 font-medium'>
                                    <button className='red btn' onClick={Logout}> Logout </button>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </div>
    )

}