import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import SeriesForm from '../SeriesForm/SeriesForm'

function SeriesEdit(props) {
    const [isMounted, setIsMounted] = useState(false)
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")
    const [accessErrors, setAccessErrors] = useState("")
    const loggedInStatus = props.loggedInStatus

    // シリーズのパラメータを含んだパス
    const path = props.location.pathname

    useEffect(() => {
        const redirect = () => {
            props.history.push("/login")
        }
        const seriesValue = () => {
            axios.get(`http://localhost:3001/api/v1/${path}`, { withCredentials: true }).then(response => {
                console.log(response)
                if (isMounted && response.data.status === 200) {
                    setSeriesTitle(response.data.novel_series.series_title)
                    setSeriesDescription(response.data.novel_series.series_description)
                } else if (isMounted && response.data.status === 401) {
                    setTimeout(() => { redirect() }, 3000)
                    setAccessErrors(response.data.messages)
                }
            })
            .catch(error => console.log('エラー: ', error))
            }
        seriesValue()
        setIsMounted(true)

    }, [path, isMounted])
    
    const handleValidateSeriesEdit = () => {
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

    return (
        <div>
            {loggedInStatus ?
                handleValidateSeriesEdit() :
                <ErrorMessages {...props} accessErrors={accessErrors} />
            }
        </div>
    )
}

export default SeriesEdit
