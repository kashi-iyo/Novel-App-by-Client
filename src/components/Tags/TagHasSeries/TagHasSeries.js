import React from 'react'

import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'
import './TagHasSeries.css'

// タグに関連付けられたシリーズの表示
function TagHasSeries({ tagId, pageNumber }) {
    // タグに関連づけされたデータを取得
    const { items, tags, isLoading } = useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_tags/${tagId}`
    })

    return (
        <React.Fragment>
            <DisplayMultipleItems
                items={items}
                caption={`╋ ${tags.tag_name} を登録している作品 `}
                record={`${tags.has_data_count} 件の作品が登録しています。`}
                pageNumber={pageNumber}
                isLoading={isLoading}
                paginateHref={`/series/tag/${tagId}/page/`}
            />
        </React.Fragment>
    )
}

export default TagHasSeries
