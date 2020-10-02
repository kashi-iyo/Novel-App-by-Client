import React from 'react'
import { Link } from 'react-router-dom'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import './SeriesTags.css'

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
                    let tagName = seriesTags[key].novel_tag_name
                    let tagId = String(seriesTags[key].id)
                    return (
                        <Link key={key} to={`/search_series_by_tag/${tagId}`} className="SeriesTags__Link">
                            <li  className="SeriesTags__Li">{tagName}</li>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default SeriesTags
