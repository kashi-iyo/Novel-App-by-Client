import React from 'react'

import NovelsForm from '../NovelsForm'
import ErrorMessages from '../../../ErrorMessages/ErrorMessages'

// 小説作成フォーム
function NovelsCreate({ seriesId, history, loggedInStatus }) {

    const novelsCreateForm = () => {
        return (
            <div className="novelsCreate">
                <NovelsForm
                    method="post"
                    url={`http://localhost:3001/api/v1/novel_series/${seriesId}/novels`}
                    seriesId={seriesId}
                    formType="create"
                    dataType="novel"
                    history={history}
                    button="追加する"
                />
            </div>
        )
    }

    // ログインしている場合にフォームをレンダリング
    const renderer = () => {
        if (!loggedInStatus) {
            return <ErrorMessages errors={"アクセス権限がありません。"} />
        } else if (loggedInStatus) {
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
