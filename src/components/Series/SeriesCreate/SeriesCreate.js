import React, { useState } from 'react'

// import './SeriesCreate.css'
import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import useLoggedIn from '../../CustomHooks/Auth/useLoggedIn'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate(props) {
    const { loggedInStatus, currentUser } = useLoggedIn()
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
                    currentUser={currentUser}
                    formType="create"
                    dataType="series"
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
