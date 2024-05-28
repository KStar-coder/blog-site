import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


function LogoutBtn() {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            className='inline-block px-6 py-2 duration-200 bg-sky-500 hover:bg-sky-300 shadow-md rounded-full'
        >Logout</button>
    )
}

export default LogoutBtn