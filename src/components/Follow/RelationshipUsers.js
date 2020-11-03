import React from 'react'
import useFollow from '../../CustomHooks/FollowHooks/useFollow'
import DisplayMultipleUsers from '../DisplayMultipleItems/DisplayMultipleUsers'

// フォローユーザー一覧/フォロワー一覧の表示
function RelationshipUsers({ userId, relationshipsParams, pageNumber }) {
    const {items, isLoading} =  useFollow({
        method: "get",
        url: `http://localhost:3001/api/v1/relationships/${userId}/${relationshipsParams}`,
    })
    const users = items.users
    const usersCount = items.users_count

    return (
        <React.Fragment>
            <DisplayMultipleUsers
                isLoading={isLoading}
                users={users}
                caption={`${items.user}さんの${relationshipsParams === "followings" ? "フォローユーザー" : "フォロワー"}`}
                recordCaption={`${usersCount} 人のユーザー`}
                usersCount={usersCount}
                perPage={30}
                pageNumber={pageNumber}
                paginateHref={`/users/${userId}/${relationshipsParams}/`}
                relationshipsParams={relationshipsParams}
            />
        </React.Fragment>
    )
}

export default RelationshipUsers
