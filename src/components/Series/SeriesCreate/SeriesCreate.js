import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import SeriesForm from '../SeriesForm/SeriesForm'

function SeriesCreate(props) {
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")
    const loggedInStatus = props.loggedInStatus

    // シリーズ作成フォーム
    const handleValidateSeriesCreate = () => {
        return (
            <div className="seriesCreate">
                <h3>シリーズを作成する</h3>
                <SeriesForm {...props}
                    seriesTitle={seriesTitle}
                    setSeriesTitle={setSeriesTitle}
                    seriesDescription={seriesDescription}
                    setSeriesDescription={setSeriesDescription}
                    button="作成する"
                />
            </div>
        )
    }

    // ログイン画面への誘導メッセージ
    const handleLeadingToLogin = () => {
        return (
            <div className="leadingToLogin">
                <div>この機能を利用するには<Link to="/login">ログイン</Link>が必要です。</div>
            </div>
        )
    }

    return (
        <div>
            {loggedInStatus ?
                handleValidateSeriesCreate() :
                handleLeadingToLogin()
            }
        </div>
    )
}

export default SeriesCreate
