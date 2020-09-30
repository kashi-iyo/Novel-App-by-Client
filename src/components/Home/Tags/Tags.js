import React from 'react'
import { Link } from 'react-router-dom'

import './Tags.css'

function Tags(props) {
    return (
        <div className="Tag">
            <Link className="TagLink">{props.tags.novel_tag_name}</Link>
        </div>
    )
}

export default Tags
