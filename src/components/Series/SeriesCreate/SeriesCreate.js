import React, {useState} from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate(props) {

    // SeriesFormへデータを渡す
    const seriesCreateForm = () => {
        return (
            <div className="seriesCreate">
                <SeriesForm {...props}
                    method="post"
                    url={`http://localhost:3001/api/v1/novel_series`}
                    formType="create"
                    dataType="series"
                    button="作成する"
                />
            </div>
        )
    }

    const renderer = () => {
        // ユーザーがログインしているかどうかを確認
        if (props.loggedInStatus) {
            return seriesCreateForm()
        } else if (!props.loggedInStatus) {
            return <ErrorMessages errors={"アクセス権限がありません。"} />
        }
    }

    return (
        <div>
            {renderer()}
        </div>
    )
}

export default SeriesCreate
