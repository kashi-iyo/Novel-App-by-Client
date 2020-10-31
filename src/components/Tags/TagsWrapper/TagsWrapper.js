import React from 'react'
import OneTags from '../OneTags/OneTags'

function TagsWrapper({tags, dataType}) {
    return (
        <React.Fragment>
            <ul className="UsersPage__TagUl">
                {/* タグ */}
                {tags &&
                    Object.keys(tags).map(key => {
                        let id = tags[key].tag_id
                        let tag = tags[key].tag_name
                        let count = tags[key].has_data_count
                        let link = dataType === "user" ?
                            `/user_tags/${id}` :
                            `/search_series_by_tag/${id}`
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
