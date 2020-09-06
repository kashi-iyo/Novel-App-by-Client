import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import './Home.css'
import SeriesRanking from './SeriesRanking/SeriesRanking'
import Series from '../Series/Series'

function Home(props) {
    const [novelSeries, setNovelSeries] = useState([])

    useEffect(() => {
        getNovelSeries()
    }, [])

    const getNovelSeries = () => {
        axios.get('http://localhost:3001', { withCredentials: true })
            .then(response => {
                setNovelSeries(response.data.novel_series)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="home">
            <div className="home__ranking">
                <SeriesRanking>
                    {novelSeries.map(series => (
                        <Series key={series.id} series={series} />
                    ))}
                </SeriesRanking>
            </div>
        </div>
    )
}

export default Home
