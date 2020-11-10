import React from 'react'
import './TagsWrapper.css'
import OneTags from '../OneTags/OneTags'

// タグの配列をループ処理
// OneUser.js/Series.jsにて呼び出し
function TagsWrapper({ tags, dataType }) {
    console.log(tags)
    return (
        <React.Fragment>
            <ul className="tags-wrapper">
                {/* タグ */}
                {tags &&
                    Object.keys(tags).map(key => {
                        let id = tags[key].tag_id
                        let tag = tags[key].tag_name
                        let count = tags[key].has_data_count
                        let link = dataType === "user" ?
                            `/user_tags/${id}` :
                            `/series/tag/${id}`
                        return (
                            <OneTags
                                key={key}
                                link={link}
                                tagName={tag}
                                count={count}
                            />
                        )
                    })
                }
            </ul>
        </React.Fragment>
    )
}

export default TagsWrapper
