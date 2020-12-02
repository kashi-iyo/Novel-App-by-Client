import React from 'react'

import useFetchEditItems from '../../../../CustomHooks/NovelsHooks/useFetchEditItems'
import Spinner from '../../../Spinner/Spinner'
import NovelsForm from '../NovelsForm'


function NovelsEdit({ seriesId, novelsId, history, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    const { items, isLoading } = useFetchEditItems({
        method: "get",
        url: `${domain}/api/v1/novel_series/${seriesId}/novels/${novelsId}/edit`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                items &&
                <NovelsForm
                    method="put"
                    url={`${domain}/api/v1//novel_series/${seriesId}/novels/${novelsId}`}
                    novels={items}
                    seriesId={seriesId}
                    novelsId={novelsId}
                    formType="edit"
                    dataType="novel"
                    history={history}
                    button="編集を完了する"
                    handleFlashMessages={handleFlashMessages}
                />
            }
        </React.Fragment>
    )
}

export default NovelsEdit
