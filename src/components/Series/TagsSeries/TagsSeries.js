import React from 'react'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'

// タグに関連付けられたシリーズの表示
function TagsSeries(props) {
    let id = String(props.match.params.id)
    useFetchItems({method: "get", url: `http://localhost:3001/api/v1/series_in_tag/${id}`})

    return (
        <div>
            
        </div>
    )
}

export default TagsSeries
