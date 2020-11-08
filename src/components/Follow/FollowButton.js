import React from 'react'
import useHandleFollow from '../../CustomHooks/FollowHooks/useHandleFollow'
import './FollowButton.css'

function FollowButton({ userId, usersRelationships, setUsersRelationships, handleFlashMessages
}) {
    const { handleFollow, handleUnFollow, errors } = useHandleFollow({
        usersRelationships: usersRelationships,
        setUsersRelationships: setUsersRelationships,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            <div className="follow-button">
                {errors && <p className="follow-button--errors">{errors}</p>}
                {/* フォローOFF/ON */}
                    {
                        usersRelationships.isOn ?
                            <button className="follow-button--now" type="submit" onClick={() => handleUnFollow(userId)}>
                                <span>フォロー中</span>
                            </button>
                            :
                            <button className="follow-button--yet" type="submit" onClick={() => handleFollow(userId)}>
                                <span>フォロー</span>
                            </button>
                    }
            </div>
        </React.Fragment>
    )
}

export default FollowButton
