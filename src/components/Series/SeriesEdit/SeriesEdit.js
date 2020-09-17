import React from 'react'
// import { Link } from 'react-router-dom'

import './SeriesEdit'
import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import useFetchEditItems from '../../CustomHooks/NovelsHooks/useFetchEditItems'
import useLoggedIn from '../../CustomHooks/AuthHooks/useLoggedIn'

// useEditItemsで取得したデータを、SeriesFormへを渡す
function SeriesEdit(props) {
    const url = props.match.url     // Railsから編集データを取得するのに必要なurl
    const id = props.match.params.id    // SeriesFormへ渡すURLに必要なパラメータ
    const { loggedInStatus } = useLoggedIn()
    const { items, errors, setIsMounted } = useFetchEditItems({
        method: "get",
        url: `http://localhost:3001/api/v1${url}`,
        props: props
    })


    // 編集フォームをレンダリングする
    const seriesEditForm = () => {
        return (
            <div className='seriesEdit'>

                {/* 小説一覧 */}
                {/* <Link to="/novels">このシリーズの小説一覧</Link><br></br> */}
                {
                    items ?
                        <SeriesForm {...props}
                            novelSeries={items}
                            setIsMounted={setIsMounted}
                            method="patch"
                            url={`http://localhost:3001/api/v1/novel_series/${id}`}
                            button="編集を完了する"
                        /> :
                        null
                }
            </div>
        )
    }

    return (
        <div>
            {/* ログインし、尚且つエラーの存在しない場合に、編集フォームを表示 */}
            {loggedInStatus && !errors ?
                seriesEditForm() :
                <ErrorMessages {...props}
                    accessErrors={errors}
                />
            }
        </div>
    )
}

export default SeriesEdit
