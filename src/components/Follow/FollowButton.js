import React from 'react'
import './FollowButton.css'

function FollowButton({ errors, userId, usersRelationships, handleFollow, handleUnFollow }) {

    return (
        <React.Fragment>
            {errors && <p className="error">{errors}</p>}
            <div className="FollowButton">
                {/* フォローOFF/ON */}
                    {
                        usersRelationships.isOn ?
                            <button className="NowFollowButton" type="submit" onClick={() => handleUnFollow(userId)}>
                                <span className="NowFollow">フォロー中</span>
                            </button>
                            :
                            <button className="UnFollowButton" type="submit" onClick={() => handleFollow(userId)}>
                                <span className="UnFollow">フォロー</span>
                            </button>
                    }
            </div>
        </React.Fragment>
    )
}

export default FollowButton
