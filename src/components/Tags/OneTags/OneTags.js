import React from 'react'
import { Link } from 'react-router-dom'
import './OneTags.css'

// 1つのタグを表示させる
function OneTags({tagName, link, count}) {
    return (
        <Link to={link} className="one-tag--link">
            <li className="one-tag--tag-li" >
                {tagName} <span>（{count}）</span>
            </li>
        </Link>
    )
}

export default OneTags
