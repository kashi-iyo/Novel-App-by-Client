import React from 'react'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'

function TagHasSelectedSeries({tagId, history, selectedItem, selectedParams, handleFlashMessages, pageNumber}) {
    const { items, isLoading } = useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_tags/${tagId}/${selectedParams}`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })
    const selectingValue = selectedItem ? selectedItem.value : items.selectedValue

    return (
        <React.Fragment>
            <DisplayMultipleItems
                items={items.series}
                caption={` ${items.tag.tag_name} を登録している作品 （${selectingValue}）`}
                record={`${items.tag.has_data_count} 件の作品が登録しています。`}
                pageNumber={pageNumber}
                isLoading={isLoading}
                selectingValue={selectingValue}
                selectingParams={selectedParams}
                history={history}
                selectHref={`/series/tag/${tagId}/`}  // セレクトによる絞り込みで遷移する先のパス
                paginateHref={`/series/tag/${tagId}/${selectedParams}/`}
            />
        </React.Fragment>
    )
}

export default TagHasSelectedSeries
