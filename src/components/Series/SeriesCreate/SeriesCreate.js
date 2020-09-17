import React, { useState } from 'react'

import './SeriesCreate.css'
import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import useLoggedIn from '../../CustomHooks/AuthHooks/useLoggedIn'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate(props) {
    const { loggedInStatus, user } = useLoggedIn()
    const [isMounted, setIsMounted] = useState(false)

    // SeriesFormへデータを渡す
    const seriesCreateForm = () => {
        return (
            <div className="seriesCreate">
                <SeriesForm {...props}
                    method="post"
                    setIsMounted={setIsMounted}
                    url={`http://localhost:3001/api/v1/novel_series`}
                    user={user}
                    button="作成する"
                />
            </div>
        )
    }

    return (
        <div>
            {/* ユーザーがログインしているかどうかを確認*/}
            {
                loggedInStatus ?
                    seriesCreateForm() :
                    <ErrorMessages {...props} accessErrors={"アクセス権限がありません。"} />
            }
        </div>
    )
}

export default SeriesCreate
