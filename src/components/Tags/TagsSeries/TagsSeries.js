import React from 'react'

import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import Series from '../../Series/Series'
import SeriesRanking from '../../Series/SeriesWrapper/SeriesWrapper'
import './TagsSeries.css'

// タグに関連付けられたシリーズの表示
function TagsSeries(props) {
    let id = String(props.match.params.id)
    const { items, count, tags } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/series_in_tag/${id}`
    })

    return (
        <div className="TagsSeries">
            <p className="Caption TagsSeries__caption">╋ {tags.novel_tag_name} の作品一覧（全 {count} 件）</p>
            <div className="home__ranking">
                <SeriesRanking>
                    {
                        Object.keys(items).map(key => {
                            let id = items[key].id
                            let title = items[key].series_title
                            let description = items[key].series_description
                            let author = items[key].author
                            let release = items[key].release
                            let count = items[key].count
                            let userId = items[key].user_id
                            return (
                                <Series
                                    key={key} userId={userId}
                                    id={id} title={title} description={description}
                                    author={author} release={release} count={count}
                                />)
                        })
                    }
                </SeriesRanking>
            </div>
        </div>
    )
}

export default TagsSeries
