import React from 'react'
import './SeriesEdit'
import SeriesForm from '../SeriesForm/SeriesForm'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import useFetchEditItems from '../../../CustomHooks/NovelsHooks/useFetchEditItems'

// useEditItemsで取得したデータを、SeriesFormへを渡す
function SeriesEdit({seriesId, history, currentUser, userId}) {
    const { items, tags, errors } = useFetchEditItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/edit`,
        history: history
    })

    // 編集フォームをレンダリングする
    const seriesEditForm = () => {
        return (
            <div className='seriesEdit'>

                {/* 小説一覧 */}
                {/* <Link to="/novels">このシリーズの小説一覧</Link><br></br> */}
                {
                    items && tags ?
                        <SeriesForm
                            editSeries={items}
                            editTags={tags}
                            method="patch"
                            url={`http://localhost:3001/api/v1/novel_series/${seriesId}`}
                            seriesId={seriesId}
                            formType="edit"
                            dataType="series"
                            button="編集を完了する"
                            history={history}
                            currentUser={currentUser}
                        /> :
                        null
                }
            </div>
        )
    }

    const renderer = () => {
        if (userId === items.user_id) {
            return seriesEditForm()
        } else if (errors) {
            return <ErrorMessages errors={errors} />
        }
    }

    return (
        <div>
            {/* ログインし、尚且つエラーの存在しない場合に、編集フォームを表示 */}
            {renderer()}
        </div>
    )
}

export default SeriesEdit
