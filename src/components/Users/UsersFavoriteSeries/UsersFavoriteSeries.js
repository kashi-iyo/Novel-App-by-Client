import React from 'react'
import UsersOneSeries from '../UsersOneSeries/UsersOneSeries'
import './UsersFavoriteSeries.css'

function UsersFavoriteSeries(props) {
    return (
        <div className="UsersFavoritesSeries">
            <UsersOneSeries
                seriesId={String(props.favoriteSeries.id)}
                author={props.favoriteSeries.author}
                seriesTitle={props.favoriteSeries.series_title}
                count={props.favoriteSeries.count}
                release={props.favoriteSeries.release}
            />
        </div>
    )
}

export default UsersFavoriteSeries
