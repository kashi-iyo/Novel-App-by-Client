import React from 'react'

import './Home.css'
import SeriesRanking from './SeriesRanking/SeriesRanking'
import Series from '../Series/Series'
import useFetchItems from '../CustomHooks/NovelsHooks/useFetchItems'
import Spinner from '../CustomHooks/Spinner/Spinner'


function Home() {
    const { items, count, isLoading } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001'
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="home">
                    <p className="Caption">╋作品一覧（全 {count} 件）</p>
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
            }
        </React.Fragment>
    )
}

export default Home
