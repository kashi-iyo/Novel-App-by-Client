import React from 'react'

import './NovelsInFeed.css'

function NovelsInNovelsFeed(props) {
    return (
        <div className="NovelsInFeed">
            {props.children}
        </div>
    )
}

export default NovelsInNovelsFeed
