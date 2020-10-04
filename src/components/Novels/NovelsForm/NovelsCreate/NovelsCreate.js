import React, {useState} from 'react'

import NovelsForm from '../NovelsForm'
import ErrorMessages from '../../../ErrorMessages/ErrorMessages'

// 小説作成フォーム
function NovelsCreate(props) {
    const seriesId = props.match.params.id

    const novelsCreateForm = () => {
        return (
            <div className="novelsCreate">
                <NovelsForm
                    {...props}
                    method="post"
                    url={`http://localhost:3001/api/v1/novel_series/${seriesId}/novels`}
                    seriesId={seriesId}
                    formType="create"
                    dataType="novel"
                    button="追加する"
                />
            </div>
        )
    }

    // ログインしている場合にフォームをレンダリング
    const renderer = () => {
        if (!props.loggedInStatus) {
            return <ErrorMessages {...props} errors={"アクセス権限がありません。"} />
        } else if (props.loggedInStatus) {
            return novelsCreateForm()
        }
    }

    return (
        <div>
            {renderer()}
        </div>
    )
}

export default NovelsCreate
