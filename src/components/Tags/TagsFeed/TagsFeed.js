import React from 'react'
import TagsWrapper from '../TagsWrapper/TagsWrapper'
import './TagsFeed.css'

// タグクラウド
// UsersTagsFeed, SeriesTagsFeedからデータが渡ってくる
function TagsFeed({ items, dataType, caption }) {

    return (
        <React.Fragment>
            <p className="caption">{caption} （{items.tags_count}）</p>
            <div className="tags-feed">
                <TagsWrapper tags={items.tags} dataType={dataType} />
            </div>
        </React.Fragment>
    )
}

export default TagsFeed
