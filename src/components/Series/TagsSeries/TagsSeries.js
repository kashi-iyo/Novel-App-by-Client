import React from 'react'

import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import Series from '../Series'
import SeriesRanking from '../../Home/SeriesRanking/SeriesRanking'
import './TagsSeries.css'

// タグに関連付けられたシリーズの表示
function TagsSeries(props) {
    let id = String(props.match.params.id)
    const { items, count, tags  } = useFetchItems({method: "get", url: `http://localhost:3001/api/v1/series_in_tag/${id}`})

    return (
        <div className="TagsSeries">
            <p className="Caption TagsSeries__caption">╋ {tags.novel_tag_name} の作品一覧（全 {count} 件）</p>
            <div className="home__ranking">
                <SeriesRanking>
                {
                    Object.keys(items).map(key => (
                        < Series
                            key={key}
                            items={items[key]}
                        />))
                }
                </SeriesRanking>
            </div>
        </div>
    )
}

export default TagsSeries
