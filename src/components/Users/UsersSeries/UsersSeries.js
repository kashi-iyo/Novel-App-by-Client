import React from 'react'
import UsersOneSeries from '../UsersOneSeries/UsersOneSeries'
import './UsersSeries.css'

// ユーザーが投稿したシリーズ
function UsersSeries(props) {

    return (
        <div className="UsersSeries">
            <UsersOneSeries
                seriesId={String(props.series.id)}
                author={props.series.author}
                seriesTitle={props.series.series_title}
                count={props.series.count}
                release={props.series.release}
            />
        </div>
    )
}

export default UsersSeries
