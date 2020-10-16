import React from 'react'
import { Link } from 'react-router-dom'
import './OneTags.css'

// 1つのタグを表示させる
function OneTags({tagName, link, count}) {
    return (
        <Link to={link} className="UsersPage__tagLink">
            <li className="UsersPage__tagLi" >
                {tagName} <span>（{count}）</span>
            </li>
        </Link>
    )
}

export default OneTags
