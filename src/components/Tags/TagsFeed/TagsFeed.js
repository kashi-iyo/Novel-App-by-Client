import React from 'react'
import OneTags from '../OneTags/OneTags'
import './TagsFeed.css'

// タグクラウド
// UsersTagsFeed, SeriesTagsFeedからデータが渡ってくる
function TagsFeed({ items, link, caption }) {
    const tags = items.tags
    const tags_count = items.tags_count

    return (
        <React.Fragment>
            <p className="Caption">╋{caption} （{tags_count}）</p>
            <div className="TagsFeed">
                {
                    tags && Object.keys(tags).map(key => {
                        let tagId = tags[key].tag_id
                        return (
                            <OneTags
                                key={key}
                                link={link + tagId}
                                tagName={tags[key].tag_name}
                                count={tags[key].has_data_count}
                            />
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default TagsFeed
