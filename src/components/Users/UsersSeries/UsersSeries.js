import React from 'react'
import { Link } from 'react-router-dom'
import './UsersSeries.css'

function UsersSeries(props) {

    return (
        <div className="UsersSeries">
            <li className="UsersSeris__Li">
                <Link to={`novel_series/${props.series.id}`} >{props.series.series_title}</Link>
            </li>
        </div>
    )
}

export default UsersSeries
