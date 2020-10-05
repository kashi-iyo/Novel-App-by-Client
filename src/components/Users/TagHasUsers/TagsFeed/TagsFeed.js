import React from 'react'
import OneTags from '../../../CustomHooks/Tags/OneTags/OneTags'
import useFetchUserItems from '../../../CustomHooks/UsersHooks/useFetchUserItems'
import './TagsFeed.css'

// 趣味タグフィード
function TagsFeed(props) {
    const { usersTags } = useFetchUserItems({
        method: "get",
        url: 'http://localhost:3001/tags_feed',
        props
    })

    return (
        <div className="TagsFeed">
            <p className="Caption UsersCaption">╋趣味タグクラウド</p>
            <ul className="TagsFeed__Ul">
                {
                    Object.keys(usersTags).map(key => {
                        let id = usersTags[key].id
                        let tag = usersTags[key].user_tag_name
                        return (
                            <OneTags key={key} tag={tag} link={`/tag_has_users/${id}`} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TagsFeed
