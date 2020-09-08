import React, { useState } from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'

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

    // ログインしていない場合はログインページへリダイレクトさせる。
    useEffect(() => {
        const redirect = () => {
            props.history.push("/login")
        }
        if (!loggedInStatus) {
            setTimeout(() => { redirect() }, 2000)
        }
    }, [loggedInStatus, props.history])

    return (
        <div>
            {/* ユーザーがログインしているかどうかを確認*/}
            {loggedInStatus ?
                handleValidateSeriesCreate() :
                <ErrorMessages {...props} accessErrors={"アクセス権限がありません。"} />
            }
        </div>
    )
}

export default SeriesCreate
