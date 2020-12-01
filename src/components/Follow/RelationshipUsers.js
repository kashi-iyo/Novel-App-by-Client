import React from 'react'
import useFollow from '../../CustomHooks/FollowHooks/useFollow'
import DisplayMultipleUsers from '../DisplayMultipleItems/DisplayMultipleUsers'

// フォローユーザー一覧/フォロワー一覧の表示
function RelationshipUsers({ userId, relationshipsParams, pageNumber, history, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    const {items, isLoading} =  useFollow({
        method: "get",
        url: `${domain}/api/v1/relationships/${userId}/${relationshipsParams}`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            <DisplayMultipleUsers
                isLoading={isLoading}
                users={items.relationshipsUsers}
                caption={`${items.usersNickname}さんの${relationshipsParams === "followings" ? "フォローユーザー" : "フォロワー"}`}
                recordCaption={`${items.usersCount} 人のユーザー`}
                usersCount={items.usersCount}
                perPage={30}
                pageNumber={pageNumber}
                paginateHref={`/users/${userId}/${relationshipsParams}/`}
                relationshipsParams={relationshipsParams}
            />
        </React.Fragment>
    )
}

export default RelationshipUsers
