import React from 'react'

import NovelsForm from '../NovelsForm'

// 小説作成フォーム
function NovelsCreate({ seriesId, history, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL

    return (
        <React.Fragment>
            <NovelsForm
                method="post"
                url={`${domain}/api/v1/novel_series/${seriesId}/novels`}
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
