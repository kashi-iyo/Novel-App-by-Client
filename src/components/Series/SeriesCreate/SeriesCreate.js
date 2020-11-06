import React from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'
import Spinner from '../../Spinner/Spinner'

// シリーズ作成フォームをレンダリングする。
// SeriesFormへデータを渡す。
function SeriesCreate({ currentUser, history, isLoading }) {

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="seriesCreate">
                    <SeriesForm
                        method="post"
                        url={`http://localhost:3001/api/v1/novel_series`}
                        formType="create"
                        dataType="series"
                        button="作成する"
                        history={history}
                        currentUser={currentUser}
                    />
                </div>}
        </React.Fragment>
    )
}

export default SeriesCreate
