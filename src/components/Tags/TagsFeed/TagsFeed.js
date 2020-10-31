import React from 'react'
import TagsWrapper from '../TagsWrapper/TagsWrapper'
import './TagsFeed.css'

// タグクラウド
// UsersTagsFeed, SeriesTagsFeedからデータが渡ってくる
function TagsFeed({ items, dataType, caption }) {
    const tags = items.tags
    const tags_count = items.tags_count

    return (
        <React.Fragment>
            <p className="Caption">╋{caption} （{tags_count}）</p>
            <div className="TagsFeed">
                <TagsWrapper tags={tags} dataType={dataType} />
            </div>
        </React.Fragment>
    )
}

export default TagsFeed
