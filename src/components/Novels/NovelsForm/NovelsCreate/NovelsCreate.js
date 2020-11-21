import React from 'react'

import NovelsForm from '../NovelsForm'

// 小説作成フォーム
function NovelsCreate({ seriesId, history, handleFlashMessages }) {

    return (
        <React.Fragment>
            <NovelsForm
                method="post"
                url={`http://54.65.39.121/api/v1/novel_series/${seriesId}/novels`}
                seriesId={seriesId}
                formType="create"
                dataType="novel"
                history={history}
                button="追加する"
                handleFlashMessages={handleFlashMessages}
            />
        </React.Fragment>
    )
}

export default NovelsCreate
