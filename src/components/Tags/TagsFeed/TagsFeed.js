import React from 'react'
import OneTags from '../OneTags/OneTags'
import './TagsFeed.css'

// タグクラウド
// UsersTagsFeed, SeriesTagsFeedからデータが渡ってくる
function TagsFeed({novelTags, usersTags, caption}) {
    return (
        <React.Fragment>
            <p className="Caption">╋{caption}</p>
            <div className="TagsFeed">
                {
                    novelTags && Object.keys(novelTags).map(key => {
                        let id = novelTags[key].id
                        let tag = novelTags[key].novel_tag_name
                        let count = novelTags[key].count
                        return (
                            <OneTags key={key} link={`/search_series_by_tag/${id}`} tag={tag} count={count} />
                        )
                    })
                }
                {
                    usersTags && Object.keys(usersTags).map(key => {
                        let id = usersTags[key].id
                        let tag = usersTags[key].user_tag_name
                        let count = usersTags[key].count
                        return (
                            <OneTags key={key} tag={tag} link={`/tag_has_users/${id}`} count={count} />
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default TagsFeed
