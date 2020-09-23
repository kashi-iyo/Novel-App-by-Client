import React from 'react'

import './Home.css'
import SeriesRanking from './SeriesRanking/SeriesRanking'
import Series from '../Series/Series'
import useFetchItems from '../CustomHooks/NovelsHooks/useFetchItems'

function Home(props) {
    const { items, isLoading } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001'
    })

    return (
        <div className="home">
            {!isLoading &&
                <div className="home__ranking">
                    <SeriesRanking>
                        {Object.keys(items).map(key => (
                            <Series key={key} items={items[key]} />
                        ))}
                    </SeriesRanking>
                </div>
            }
        </div>
    )
}

export default Home
