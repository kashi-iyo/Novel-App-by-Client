import React from 'react'

import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import Series from '../../Series/Series'
import SeriesRanking from '../../Series/SeriesWrapper/SeriesWrapper'
import './TagHasSeries.css'

// タグに関連付けられたシリーズの表示
function TagHasSeries(props) {
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
                            return (
                                <Series
                                    key={items[key].id}
                                    id={items[key].id}
                                    count={items[key].count}
                                    author={items[key].author}
                                    release={items[key].release}
                                    userId={items[key].user_id}
                                    title={items[key].series_title}
                                    description={items[key].series_description}
                                />)
                        })
                    }
                </SeriesRanking>
            </div>
        </div>
    )
}

export default TagHasSeries
