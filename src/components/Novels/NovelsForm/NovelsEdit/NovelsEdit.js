import React from 'react'

import useFetchEditItems from '../../../../CustomHooks/NovelsHooks/useFetchEditItems'
import Spinner from '../../../Spinner/Spinner'
import NovelsForm from '../NovelsForm'


function NovelsEdit({ seriesId, novelsId, history, handleFlashMessages}) {
    const { items, isLoading } = useFetchEditItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelsId}/edit`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                items &&
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
                    handleFlashMessages={handleFlashMessages}
                />
            }
        </React.Fragment>
    )
}

export default NovelsEdit
