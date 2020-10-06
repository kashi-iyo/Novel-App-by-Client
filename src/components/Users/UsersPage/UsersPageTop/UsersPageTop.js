import React from 'react'
import { Link } from 'react-router-dom'
import OneTags from '../../../Tags/OneTags/OneTags'
import './UsersPageTop.css'

// ユーザーページの上部
function UsersPageTop({ users, userId, usersTags, currentUser}) {

    return (
        <div>
            <h1 className="Caption">╋{users.nickname}さんのページ</h1>
            <div className="UsersPage__Top">
                <div className="UsersPage__TopWrapper">
                    {/* ユーザー名 */}
                    <p className="UsersPage__UserName">{users.nickname}</p>
                </div>
                {/* プロフィール */}
                <div className="UsersPage__UserProfile">{users.profile}</div>
                {/* ユーザーが登録しているタグを表示 */}
                <div className="UsersPage__TagWrapper">
                    <p className="UsersPage__TagHobby">登録している趣味タグ</p>
                    <ul className="UsersPage__TagUl">
                        {/* タグ達 */}
                        {
                            Object.keys(usersTags).map(key => {
                                let id = usersTags[key].id
                                let tag = usersTags[key].user_tag_name
                                return (
                                    <OneTags key={key} link={`/tag_has_users/${id}`} tag={tag} />
                                )
                            })
                        }
                    </ul>
                    {
                        currentUser === users.nickname &&
                        <p className="messageToUsers">好みのジャンル・アニメなどをタグ登録して<br></br>同じ趣味を持つユーザーと繋がろう</p>
                    }
                </div>
                {/* 編集ボタン */}
                {
                    currentUser === users.nickname &&
                    <div className="UsersPage__EditWrapper">
                            <Link to={`/users/${userId}/edit`} className="UsersPage__EditButton button">編集する</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default UsersPageTop
