
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <React.Fragment>
            <div className='m-2 p-2 w-6/12 container mx-auto'>
                <h1>Page Not Found!!! </h1> <Link to="/"> Got to Home </Link>
                <img src='' alt='' className=' h-60 w-56'></img>
            </div>
        </React.Fragment>
    )
}

export default NotFound