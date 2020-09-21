import React from 'react'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'

function SeriesCount(props) {
    const { items } = useFetchItems({ method: 'get', url: `http://localhost:3001/api/v1/novel_count/${props.seriesId} ` })

    return (
        <div>
            （全 {items} 話）
        </div>
    )
}

export default SeriesCount
