import React from 'react'
import Series from '../Series'

import './SeriesWrapper.css'

// 1つのシリーズのラッパー
function SeriesWrapper(props) {

    return (
        <React.Fragment>
            <ul>
                <Series
                    id={props.items.id}
                    author={props.items.author}
                    commentsCount={props.items.comments_count}
                    favoritesCount={props.items.favorites_count}
                    release={props.items.release}
                    description={props.items.series_description}
                    title={props.items.series_title}
                    novelsCount={props.items.novels_count}
                    tags={props.items.tags}
                    userId={props.items.user_id}
                />
            </ul>
        </React.Fragment>
    )
}

export default SeriesWrapper
