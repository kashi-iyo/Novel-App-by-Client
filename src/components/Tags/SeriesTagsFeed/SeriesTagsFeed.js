import React from 'react'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import TagsFeed from '../TagsFeed/TagsFeed'

// 小説タグクラウド
function SeriesTagsFeed() {
    const { items } = useFetchTags({
        method: "get",
        url: 'http://localhost:3001/api/v1/novel_tags'
    })
    return (
        <React.Fragment>
            <TagsFeed
                items={items}
                link="/search_series_by_tag/"
                caption="小説タグクラウド"
            />
        </React.Fragment>
    )
}

export default SeriesTagsFeed
