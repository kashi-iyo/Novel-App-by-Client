import React from 'react'
import Series from '../Series'

import './SeriesWrapper.css'

// 1つのシリーズのラッパー
function SeriesWrapper({items}) {

    return (
        <React.Fragment>
            <ul>
                {
                    items && Object.keys(items).map(key => (
                        <Series
                            key={key}
                            seriesId={items[key].series.id}
                            seriesUserId={items[key].series.user_id}
                            author={items[key].series.author}
                            release={items[key].series.release}
                            description={items[key].series.series_description}
                            title={items[key].series.series_title}
                            commentsCount={items[key].comments_count}
                            favoritesCount={items[key].favorites_count}
                            novelsCount={items[key].novels_count}
                            tags={items[key].tags}
                        />
                    ))
                }
            </ul>
        </React.Fragment>
    )
}

export default SeriesWrapper
