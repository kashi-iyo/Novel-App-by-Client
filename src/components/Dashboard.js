import React from 'react'

export default function Dashboard(props) {
    

    return (
        <div>
            <h2>Dashboard</h2>
            <h2>Status: {props.loggedInStatus}</h2>
        </div>
    )
}
