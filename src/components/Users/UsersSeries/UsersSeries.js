import React from 'react'
import Series from '../../Series/Series'
import './UsersSeries.css'

// ユーザーが投稿したシリーズ
function UsersSeries(props) {

    return (
        <div className="UsersSeries" >
            <Series
                id={String(props.series.id)}
                title={props.series.series_title}
                release={props.series.release}
                author={props.series.author}
                count={props.series.count}
            />
        </div>
    )
}

export default UsersSeries
