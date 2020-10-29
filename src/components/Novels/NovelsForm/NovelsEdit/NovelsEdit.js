import React from 'react'

import useFetchEditItems from '../../../../CustomHooks/NovelsHooks/useFetchEditItems'
import ErrorMessages from '../../../ErrorMessages/ErrorMessages'
import Spinner from '../../../Spinner/Spinner'
import NovelsForm from '../NovelsForm'


function NovelsEdit({ userId, seriesId, novelsId, history}) {
    const { items, errors, isLoading } = useFetchEditItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelsId}/edit`,
        history: history
    })

    // 編集フォームをレンダリングする
    const novelsEditForm = () => {
        return (
            <div className='seriesEdit'>

                {/* 小説一覧 */}
                {/* <Link to="/novels">このシリーズの小説一覧</Link><br></br> */}

                {
                    items
                    &&
                    <NovelsForm
                        method="patch"
                        url={`http://localhost:3001/api/v1//novel_series/${seriesId}/novels/${novelsId}`}
                        novels={items}
                        seriesId={seriesId}
                        novelsId={novelsId}
                        formType="edit"
                        dataType="novel"
                        history={history}
                        button="編集を完了する"
                    />
                }
            </div>
        )
    }

    // ログインユーザーと作者が一致しており尚且つエラーの存在しない場合に、編集フォームを表示
    const renderer = () => {
        if (userId !== items.user_id) {
            return <ErrorMessages errors={"アクセス権限がありません。"}/>
        } else if (!!errors) {
            return <ErrorMessages errors={errors} />
        } else if (userId === items.user_id) {
            return novelsEditForm()
        }
    }

    return (
        <div>
            {isLoading ? <Spinner /> : renderer()}
        </div>
    )
}

export default NovelsEdit
