import React from 'react'
import './NovelPagination.css'

function NovelPagination({ seriesId, novelId, ids }) {
    var novelIntId = parseInt(novelId)
    var i = ids.indexOf(novelIntId)
    // 前話
    const prev = ids[i - 1] ? ids[i - 1] : ""
    // 次話
    const next = ids[i + 1] ? ids[i + 1] : ""

    return (
        <React.Fragment>
            <div className="novel-pagination--top">
                {prev ? <a href={`/novel_series/${seriesId}/novels/` + (prev)}>前話</a> : <span></span>}
                <a href={`/novel_series/${seriesId}`}>目次</a>
                {next ? <a href={`/novel_series/${seriesId}/novels/` + (next)}>次話</a> : <span></span>}
            </div>
            <p className="novel-pagination--page-number">（ <span>{i + 1} 話</span> / 全 {ids.length} 話 ）</p>
        </React.Fragment>
    )
}

export default NovelPagination
