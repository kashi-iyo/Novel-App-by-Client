import React from 'react'

import './SeriesRanking.css'
import Series from '../Series/Series'

function NovelRanking(props) {

    return (
        <div className="SeriesRanking">
            <ul className="SeriesRanking__ul">
                <li>{props.children}</li>
            </ul>
        </div>
    )
}

export default NovelRanking
