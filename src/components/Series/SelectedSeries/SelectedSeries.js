import React, { useState, useEffect } from 'react'
import useFetchItems from '../../../CustomHooks/NovelsHooks/useFetchItems'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'


function SelectedSeries({ history, selectedItem, selectedParams, pageNumber }) {
    const { items, count, isLoading, selectedValue } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/selected_series/${selectedParams}`
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
                selectHref={`/series/`}
                paginateHref={`/series/${selectedParams}/`}
            />
        </React.Fragment>
    )
}

export default SelectedSeries
