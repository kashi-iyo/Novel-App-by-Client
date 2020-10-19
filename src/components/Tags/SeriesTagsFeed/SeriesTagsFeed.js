import React from 'react'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import TagsFeed from '../TagsFeed/TagsFeed'

// 小説タグクラウド
function SeriesTagsFeed() {
    const { tags } = useFetchTags({
        method: "get",
        url: 'http://localhost:3001/api/v1/novel_tags'
    })
    return (
        <React.Fragment>
            <TagsFeed
                tags={tags}
                link="/search_series_by_tag/"
                caption="小説タグクラウド"
            />
        </React.Fragment>
    )
}

export default SeriesTagsFeed
