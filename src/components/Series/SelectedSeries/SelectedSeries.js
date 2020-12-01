import React from 'react'
import useFetchItems from '../../../CustomHooks/NovelsHooks/useFetchItems'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'


function SelectedSeries({ history, selectedItem, selectedParams, pageNumber }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    const { items, count, isLoading, selectedValue } = useFetchItems({
        method: "get",
        url: `${domain}/api/v1/selected_series/${selectedParams}`
    })

    const selectingValue = selectedItem ? selectedItem.value : selectedValue

    return (
        <React.Fragment>
            <DisplayMultipleItems
                items={items}
                dataType={"series"}
                caption={`作品一覧 （${selectingValue}） `}
                record={`全 ${count} 件`}
                pageNumber={pageNumber}
                selectingValue={selectingValue}
                selectingParams={selectedParams}
                history={history}
                isLoading={isLoading}
                selectHref={`/SelectedSeries/`}  // パスの最後にselectのパラメータが付随する
                paginateHref={`/series/select/${selectedParams}/page/`} // パスの最後にページ数が付随する
            />
        </React.Fragment>
    )
}

export default SelectedSeries
