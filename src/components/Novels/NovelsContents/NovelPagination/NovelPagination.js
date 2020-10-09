import React from 'react'

function NovelPagination({seriesId, novelId}) {
    return (
        <React.Fragment>
            <a href={`/novel_series/${seriesId}/novels/` + (novelId - 1)}>前話</a>
            <a href={`/novel_series/${seriesId}`}>目次</a>
            <a href={`/novel_series/${seriesId}/novels/` + (novelId + 1)}>次話</a>
        </React.Fragment>
    )
}

export default NovelPagination
