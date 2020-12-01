import React from 'react'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'

function TagHasSelectedSeries({ tagId, history, selectedItem, selectedParams, handleFlashMessages, pageNumber }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    const { items, isLoading } = useFetchTags({
        method: "get",
        url: `${domain}/api/v1/novel_tags/${tagId}/${selectedParams}`,
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
                selectHref={`/TagHasSelectedSeries/${tagId}/`}  // パスの最後にselectのパラメータが付随する
                paginateHref={`/series/tag/${tagId}/select/${selectedParams}/page`} // パスの最後にページ番号が付随する
            />
        </React.Fragment>
    )
}

export default TagHasSelectedSeries
