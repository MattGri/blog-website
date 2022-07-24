import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/createpost">Create Post</Link>
        </>
    )
}

export default Navigation