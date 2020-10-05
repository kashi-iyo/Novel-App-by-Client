import React from 'react'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import OneUser from './OneUser/OneUser'
import './TagHasUsers.css'
import TagsFeed from './TagsFeed/TagsFeed'

// クリックしたタグを所有するユーザーを一覧で表示
function TagHasUsers(props) {
    const {users, usersTags} =  useFetchUserItems({
        method: "get",
        url: `http://localhost:3001/tag_has_users/${props.match.params.id}`,
        props
    })

    return (
        <div className="TagHasUsers">
            <TagsFeed />
            <h2 className="Caption UsersCaption">╋{usersTags.user_tag_name} を登録しているユーザー</h2>
            <ul className="TagHasUsers__Ul">
                {users &&
                    Object.keys(users).map(key => {
                        let id = users[key].id
                        let name = users[key].nickname
                        let profile = users[key].profile
                        return (
                            <OneUser
                                key={key}
                                link={`/users/${id}`}
                                name={name}
                                profile={profile}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TagHasUsers
