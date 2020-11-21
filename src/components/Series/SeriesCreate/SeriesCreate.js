import React from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'
import Spinner from '../../Spinner/Spinner'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate({ currentUser, history, isLoading, handleFlashMessages }) {

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="seriesCreate">
                    <SeriesForm
                        method="post"
                        url={`http://54.65.39.121/api/v1/novel_series`}
                        formType="create"
                        dataType="series"
                        button="作成する"
                        history={history}
                        currentUser={currentUser}
                        handleFlashMessages={handleFlashMessages}
                    />
                </div>}
        </React.Fragment>
    )
}

export default SeriesCreate
