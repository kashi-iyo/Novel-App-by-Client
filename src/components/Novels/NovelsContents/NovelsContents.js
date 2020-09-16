import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsContents.css'
import useLoggedIn from '../../CustomHooks/Auth/useLoggedIn'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'

// 小説1話分の内容を表示
function NovelsContents(props) {
    const url = props.match.url
    const { user } = useLoggedIn()
    const { items } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1${url}`
    })
    const author = items.author
    const seriesId = items.seriesId
    const seriesTitle = items.seriesTitle
    const novelTitle = items.novel_title
    const novelDescription = items.novel_description
    const novelContent = items.novel_content
    const editUrl = `/novel_series/${seriesId}/novels/${items.id}/edit`
    const seriesUrl = `/novel_series/${items.seriesId}`

    return (
        <div>
            <div className="NovelsContents">
                {/* シリーズタイトルと作者 */}
                <div className="NovelsContens__Series">
                    {
                        user === author ?
                            <Link to={editUrl} className="NovelsContents__Edit" >編集する</Link> :
                            null
                    }
                    <div className="NovelsContents__SeriesTitle">
                        <p className="seriesTitle">
                            <Link to={seriesUrl}>
                                {seriesTitle}
                            </Link>
                        </p>
                    </div>
                    <div className="NovelsContents__SeriesWriter">
                        <span className="writerWrapper">作者名: </span>
                        <span className="writerName">
                            <Link>{author}</Link>
                        </span>
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
