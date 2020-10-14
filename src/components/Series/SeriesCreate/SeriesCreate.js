import React, {useState} from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import Spinner from '../../Spinner/Spinner'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate({ loggedInStatus, currentUser, history, isLoading }) {
    const [mount, setMount] = useState(true)

    // SeriesFormへデータを渡す
    const seriesCreateForm = () => {
        return (
            <React.Fragment>
                <div className="seriesCreate">
                    <SeriesForm
                        method="post"
                        url={`http://localhost:3001/api/v1/novel_series`}
                        formType="create"
                        dataType="series"
                        button="作成する"
                        history={history}
                        currentUser={currentUser}
                        setMount={setMount}
                    />
                </div>
            </React.Fragment>
        )
    }

    const renderer = () => {
        // ユーザーがログインしているかどうかを確認
        if (!!mount && loggedInStatus) {
            return seriesCreateForm()
        } else if (!!mount && !loggedInStatus) {
            return <ErrorMessages errors={"アクセス権限がありません。"} />
        }
    }

    return (
        <div>
            {isLoading ? <Spinner /> : renderer()}
        </div>
    )
}

export default SeriesCreate
