import React from 'react'
import TagsFeed from '../TagsFeed/TagsFeed'
import './UsersTagsFeed.css'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'

// 趣味タグフィード
function UsersTagsFeed() {
    const { items } = useFetchTags({
        method: "get",
        url: 'http://54.65.39.121/api/v1/user_tags',
    })

    return (
        <React.Fragment>
            <TagsFeed
                items={items.tag}
                dataType="user"
                caption="趣味タグクラウド"
            />
        </React.Fragment>
    )
}

export default UsersTagsFeed
