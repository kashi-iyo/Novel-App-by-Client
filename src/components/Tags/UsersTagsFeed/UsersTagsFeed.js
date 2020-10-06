import React from 'react'
import TagsFeed from '../TagsFeed/TagsFeed'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import './UsersTagsFeed.css'

// 趣味タグフィード
function UsersTagsFeed(props) {
    const { usersTags } = useFetchUserItems({
        method: "get",
        url: 'http://localhost:3001/tags_feed',
        props
    })

    return (
        <React.Fragment>
            <TagsFeed usersTags={usersTags} caption="趣味タグクラウド" />
        </React.Fragment>
    )
}

export default UsersTagsFeed
