import React from 'react'
import Series from '../Series'

import './SeriesWrapper.css'

// 1つのシリーズのラッパー
function NovelWrapper(props) {

    return (
        <React.Fragment>
            <ul>
                {/* <li>{props.children}</li> */}
                <Series
                    id={props.items.id}
                    title={props.items.series_title}
                    description={props.items.series_description}
                    author={props.items.author}
                    release={props.items.release}
                    count = {props.items.count}
                    userId={props.items.user_id}
                />
            </ul>
        </React.Fragment>
    )
}

export default NovelWrapper
