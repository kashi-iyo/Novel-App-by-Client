import React from 'react'
import OneTags from '../OneTags/OneTags'
import './SeriesTags.css'

// シリーズが所有するタグ
// →Series.jsで使用
function SeriesTags({ tags }) {

    return (
        <React.Fragment>
            <div className="SeriesTags">
                {tags &&
                    tags.map(tag => (
                        <OneTags
                            key={tag.tag_id}
                            tagName={tag.tag_name}
                            link={`/search_series_by_tag/${tag.tag_id}`}
                            count={tag.has_data_count}
                        />
                    ))
                }
            </div>
        </React.Fragment>
    )
}

export default SeriesTags
