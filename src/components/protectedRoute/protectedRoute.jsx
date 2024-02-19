import React from 'react'
import { Navigate } from 'react-router-dom'

export default function protectedRoute(props) {
    if(!localStorage.getItem('token'))
    {
        console.log('yes')
        return <Navigate to ="/login" />
    }
    else
    {
        console.log('no')
        return props.children
    }
}