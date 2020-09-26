import React, { useState } from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate(props) {
    const [mounted, setMount] = useState(true)

    // SeriesFormへデータを渡す
    const seriesCreateForm = () => {
        return (
            <div className="seriesCreate">
                <SeriesForm {...props}
                    method="post"
                    mounted={mounted}
                    setMount={setMount}
                    url={`http://localhost:3001/api/v1/novel_series`}
                    currentUser={props.currentUser}
                    formType="create"
                    dataType="series"
                    button="作成する"
                />
            </div>
        )
    }

    const renderer = () => {
        if (props.loggedInStatus) {
            seriesCreateForm()
        } else {
            return <ErrorMessages {...props} errors={"アクセス権限がありません。"} />
        }
    }

    return (
        <div>
            {/* ユーザーがログインしているかどうかを確認*/}
            {renderer()}
        </div>
    )
}

export default SeriesCreate
