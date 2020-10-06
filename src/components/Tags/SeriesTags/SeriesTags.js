import React from 'react'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import Spinner from '../../CustomHooks/Spinner/Spinner'
import OneTags from '../OneTags/OneTags'
import './SeriesTags.css'

// シリーズが所有するタグ
function SeriesTags(props) {
    const id = String(props.seriesId)
    const { seriesTags, tagsId, isLoading } = useFetchItems({
        method: 'get',
        url: `http://localhost:3001/api/v1/series_tags/${id}`
    })

    return (
        <React.Fragment>
            <div className="SeriesTags">
                {
                    tagsId === id &&
                    Object.keys(seriesTags).map(key => {
                        let tag = seriesTags[key].novel_tag_name
                        let id = String(seriesTags[key].id)
                        return (
                            <OneTags key={key} tag={tag} link={`/search_series_by_tag/${id}`} />
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default SeriesTags
