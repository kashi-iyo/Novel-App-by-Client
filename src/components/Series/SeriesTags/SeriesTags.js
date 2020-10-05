import React from 'react'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import OneTags from '../../CustomHooks/Tags/OneTags/OneTags'
import './SeriesTags.css'

// シリーズが所有するタグ
function SeriesTags(props) {
    const id = String(props.seriesId)
    const { seriesTags, tagsId } = useFetchItems({
        method: 'get',
        url: `http://localhost:3001/api/v1/series_tags/${id}`
    })

    return (
        <div className="SeriesTags">
            {
                tagsId === id &&
                Object.keys(seriesTags).map(key => {
                    let tag = seriesTags[key].novel_tag_name
                    let id = String(seriesTags[key].id)
                    return (
                        <OneTags key={key} tag={tag} link={`/search_series_by_tag/${id}`}  />
                    )
                })
            }
        </div>
    )
}

export default SeriesTags
