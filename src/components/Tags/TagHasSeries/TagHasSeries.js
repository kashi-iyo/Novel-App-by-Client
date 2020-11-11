import React from 'react'

import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'
import './TagHasSeries.css'

// タグに関連付けられたシリーズの表示
function TagHasSeries({ tagId, pageNumber, history, handleFlashMessages }) {
    // タグに関連づけされたデータを取得
    const { items, isLoading } = useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_tags/${tagId}`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })
console.log(tagId)
    return (
        <React.Fragment>
            <DisplayMultipleItems
                items={items.series}
                caption={` ${items.tag.tag_name} を登録している作品 `}
                record={`${items.tag.has_data_count} 件の作品が登録しています。`}
                pageNumber={pageNumber}
                isLoading={isLoading}
                history={history}
                selectHref={`/TagHasSelectedSeries/${tagId}/`}  // セレクトによる絞り込みで遷移する先のパス
                paginateHref={`/series/tag/${tagId}/page/`}
            />
        </React.Fragment>
    )
}

export default TagHasSeries
