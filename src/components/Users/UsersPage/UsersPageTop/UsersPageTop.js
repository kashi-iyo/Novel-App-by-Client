import React from 'react'
import { Link } from 'react-router-dom'
import './UsersPageTop.css'

function UsersPageTop({ users, userId, currentUser}) {

    return (
        <div>
            <h2 className="Caption">╋{users.nickname}さんのページ</h2>
            <div className="UsersPage__Top">
                <div className="UsersPage__TopWrapper">
                    {/* ユーザー名 */}
                    <p className="UsersPage__UserName">{users.nickname}</p>
                </div>
                {/* プロフィール */}
                <div className="UsersPage__UserProfile">{users.profile}</div>
                {/* 貰った評価数 */}
                <div className="UsersPage__Reviews">
                    <div>獲得評価数： <span>5</span></div>
                </div>
                {/* ユーザーが登録しているタグを表示 */}
                <div className="UsersPage__TagWrapper">
                    <p className="UsersPage__TagHobby">登録している趣味タグ</p>
                    <ul className="UsersPage__TagUl">
                        {/* タグ達 */}
                        <li className="UsersPage__tagLi"><Link className="UsersPage__tagLink">タグ</Link></li>
                        <li className="UsersPage__tagLi"><Link className="UsersPage__tagLink">タグ</Link></li>
                        <li className="UsersPage__tagLi"><Link className="UsersPage__tagLink">タグ</Link></li>
                    </ul>
                    {
                        currentUser === users.nickname &&
                        <p className="messageToUsers">趣味タグを登録して、同じ趣味を持つユーザーと繋がろう</p>
                    }
                </div>
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
