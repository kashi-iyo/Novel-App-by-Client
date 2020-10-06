import React from 'react'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import TagsFeed from '../TagsFeed/TagsFeed'

function SeriesTagsFeed() {
    const { tags } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001/api/v1/series_tags_feed'
    })
    return (
        <React.Fragment>
            <TagsFeed novelTags={tags} caption="小説タグクラウド" />
        </React.Fragment>
    )
}

export default SeriesTagsFeed
