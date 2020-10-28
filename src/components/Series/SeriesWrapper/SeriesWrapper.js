import React from 'react'
import Series from '../Series'

import './SeriesWrapper.css'

// 1つのシリーズのラッパー
function SeriesWrapper({items}) {

    return (
        <React.Fragment>
            <ul>
                <Series
                    seriesId={items.series.id}
                    seriesUserId={items.series.user_id}
                    author={items.series.author}
                    release={items.series.release}
                    description={items.series.series_description}
                    title={items.series.series_title}
                    commentsCount={items.comments_count}
                    favoritesCount={items.favorites_count}
                    novelsCount={items.novels_count}
                    tags={items.tags}
                />
            </ul>
        </React.Fragment>
    )
}

export default SeriesWrapper
