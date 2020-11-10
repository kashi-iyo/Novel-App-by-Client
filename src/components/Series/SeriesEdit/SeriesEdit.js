import React from 'react'
import './SeriesEdit'
import SeriesForm from '../SeriesForm/SeriesForm'
import useFetchEditItems from '../../../CustomHooks/NovelsHooks/useFetchEditItems'
import Spinner from '../../Spinner/Spinner'

// useEditItemsで取得したデータを、SeriesFormへを渡す
function SeriesEdit({seriesId, history, currentUser, handleFlashMessages}) {
    const { items, isLoading } = useFetchEditItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/edit`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                items &&
                <SeriesForm
                    editSeries={items}
                    editTags={items.series_tags}
                    method="patch"
                    url={`http://localhost:3001/api/v1/novel_series/${seriesId}`}
                    seriesId={seriesId}
                    formType="edit"
                    dataType="series"
                    button="編集を完了する"
                    history={history}
                    currentUser={currentUser}
                    handleFlashMessages={handleFlashMessages}
                />
            }
        </React.Fragment>
    )
}

export default SeriesEdit
