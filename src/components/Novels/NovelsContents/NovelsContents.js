import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsContents.css'
import { useNovelItems } from '../../CustomHooks/useNovelItems/useNovelItems'

function NovelsContents(props) {
    const items = useNovelItems(props)  // 小説1話分のカスタムフック
    const seriesTitle = items.seriesTitle
    const author = items.author
    const novelTitle = items.novelTitle
    const novelDescription = items.novelDescription
    const novelContent = items.novelContent

    return (
        <div>
            <div className="NovelsContents">
                {/* シリーズタイトルと作者 */}
                <div className="NovelsContens__Series">
                    <div className="NovelsContents__SeriesTitle">
                        <p className="seriesTitle">{seriesTitle}</p>
                    </div>
                    <div className="NovelsContents__SeriesWriter">
                        <span className="writerWrapper">作者名: </span>
                        <span className="writerName"><Link>{author}</Link></span>
                    </div>
                </div>
                {/* 小説の内容 */}
                <div className="NovelsContents__Novels">
                    <div className="NovelsContents__NovelsTitle">
                        {novelTitle}
                    </div>
                    <div className="NovelsContents__NovelsDescription">
                        {novelDescription}
                    </div>
                    <div className="NovelsContents__NovelsContent">
                        {novelContent}
                    </div>
                </div>
                {/* 小説への評価 */}
                <div className="NovelsContents__Options">
                    <div className="NovelsContents__OptionsFavorites"></div>
                    <div className="NovelsContents__OptionsReviews"></div>
                    <div className="NovelsContents__OptionsComments"></div>
                </div>
                {/* 小説のページネーション */}
            </div>
            {/* シリーズ内の小説全話を一覧する */}
            <div className="SeriesContents"></div>
        </div>
    )
}

export default NovelsContents
