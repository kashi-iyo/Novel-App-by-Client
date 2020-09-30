import React from 'react'

import './Home.css'
import SeriesRanking from './SeriesRanking/SeriesRanking'
import Series from '../Series/Series'
import useFetchItems from '../CustomHooks/NovelsHooks/useFetchItems'
import Tags from './Tags/Tags'

function Home() {
    const { items, count, tags, isLoading } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001'
    })

    return (
        <div className="home">
            {!isLoading &&
                <React.Fragment>
                    <p className="Caption homeCaption">╋タグクラウド</p>
                    <div className="TagFeed">
                        {
                            tags && Object.keys(tags).map(key => (
                                <Tags key={key} tags={tags[key]} />
                            ))
                        }
                    </div>
                    <p className="Caption homeCaption">╋作品一覧（全 {count} 件）</p>
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
                </React.Fragment>
            }
        </div>
    )
}

export default Home
