import React from 'react'
import { Link } from 'react-router-dom'
import FollowButton from '../../../Follow/FollowButton'
import OneTags from '../../../Tags/OneTags/OneTags'
import TagsWrapper from '../../../Tags/TagsWrapper/TagsWrapper'
import './UsersPageTop.css'

// ユーザーページの上部
function UsersPageTop({ users, userId, usersTags, errors, usersRelationships, handleFollow, handleUnFollow, }) {

    return (
        <div>
            <h1 className="Caption">╋{users.nickname}さんのページ</h1>
            <div className="UsersPage__Top">
                <div className="UsersPage__TopWrapper">
                    {/* ユーザー名 */}
                    <p className="UsersPage__UserName">{users.nickname}</p>
                    {/* フォローボタン */}
                    {userId !== users.user_id && <FollowButton
                        errors={errors}
                        userId={users.user_id}
                        usersRelationships={usersRelationships}
                        handleFollow={handleFollow}
                        handleUnFollow={handleUnFollow}
                    />}
                </div>
                {/* フォロー数 / フォロワー数 */}
                <div className="UsersPage__TopRelationships">
                    <Link to={`/users/${users.user_id}/followings`}>フォロー： {usersRelationships.followingsCount}</Link>
                    <span className="UsersPage__TopRelationshipsSpan"></span>
                    <Link to={`/users/${users.user_id}/followers`}>フォロワー： {usersRelationships.followersCount}</Link>
                </div>
                {/* プロフィール */}
                <div className="UsersPage__UserProfile">{users.profile}</div>
                {/* ユーザーが登録しているタグを表示 */}
                <div className="UsersPage__TagWrapper">
                    <p className="UsersPage__TagHobby">登録している趣味タグ</p>
                    <TagsWrapper tags={usersTags} dataType="user" />
                    {
                        userId=== users.user_id &&
                        <p className="messageToUsers">好みのジャンル・アニメなどをタグ登録して<br></br>同じ趣味を持つユーザーと繋がろう</p>
                    }
                </div>
                {/* 編集ボタン */}
                {
                    userId=== users.user_id &&
                    <div className="UsersPage__EditWrapper">
                            <Link to={`/users/${userId}/edit`} className="UsersPage__EditButton button">編集する</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default UsersPageTop
