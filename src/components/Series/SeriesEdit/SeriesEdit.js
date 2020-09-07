import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import SeriesForm from '../SeriesForm/SeriesForm'

function SeriesEdit(props) {
    const [isMounted, setIsMounted] = useState(false)
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")

    // シリーズのパラメータを含んだパス
    const path = props.location.pathname

    useEffect(() => {
        const seriesValue = () => {
            axios.get(`http://localhost:3001/api/v1/${path}`, { withCredentials: true }).then(response => {
                if (isMounted) {
                    setSeriesTitle(response.data.novel_series.series_title)
                    setSeriesDescription(response.data.novel_series.series_description)
                }
            })
            .catch(error => console.log('エラー: ', error))
            }
        seriesValue()
        setIsMounted(true)

      }, [path, isMounted])

    return (
        <div className='seriesEdit'>
            <h3>シリーズ編集</h3>

            {/* 小説一覧 */}
            <Link to="/novels">このシリーズの小説一覧</Link><br></br>
            
            <SeriesForm {...props}
                seriesTitle={seriesTitle}
                setSeriesTitle={setSeriesTitle}
                seriesDescription={seriesDescription}
                setSeriesDescription={setSeriesDescription}
                isMountd={isMounted}
                setIsMounted={setIsMounted}
                path={path}
                button="編集を完了する"
            />
        </div>
    )
}

export default SeriesEdit
