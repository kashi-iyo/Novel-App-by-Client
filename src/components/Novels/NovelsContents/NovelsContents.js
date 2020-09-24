import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsContents.css'
import useLoggedIn from '../../CustomHooks/Auth/useLoggedIn'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import RemoveFeatures from '../../CustomHooks/Remove/RemoveFeatures'
import useRemoveItems from '../../CustomHooks/NovelsHooks/useRemoveItems'
import Flash from '../../CustomHooks/Flash/Flash'

// 小説1話分の内容を表示
function NovelsContents(props) {
    const url = props.match.url
    const { currentUser } = useLoggedIn()
    const { series, novels, errors } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1${url}`
    })
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${series.seriesId}/novels/${novels.novelId}`,
        keyword: "novel",
        history: props.history
    })
    const editUrl = `/novel_series/${series.seriesId}/novels/${novels.novelId}/edit`
    const seriesUrl = `/novel_series/${series.seriesId}`

    const rendererNovelsContents = () => {
        return (
            <React.Fragment>
                <Flash Errors={removeErrors} Success={removeSuccess} />
                <div>
                    <div className="NovelsContents">
                        {/* シリーズタイトルと作者 */}
                        <div className="NovelsContens__Series">
                            <div className="NovelsContents__SeriesTitle">
                                <p className="seriesTitle">
                                    <Link to={seriesUrl}>
                                        {series.seriesTitle}
                                    </Link>
                                </p>
                            </div>
                            <div className="NovelContents__WriterEditWrapper">
                                <div className="NovelsContents__SeriesWriter">
                                    <span className="writerWrapper">作者名: </span>
                                    <span className="writerName">
                                        <Link>{novels.author}</Link>
                                    </span>
                                </div>
                                {
                                currentUser === novels.author ?
                                    <Link to={editUrl} className="NovelsContents__Edit" >
                                        編集する
                                    </Link> :
                                    null
                                }
                            </div>
                        </div>
                        {/* 小説の内容 */}
                        <div className="NovelsContents__Novels">
                            <div className="NovelsContents__NovelsTitle">
                                {novels.novel_title}
                            </div>
                            <div className="NovelsContents__NovelsDescription">
                                {novels.novel_description}
                            </div>
                            <div className="NovelsContents__NovelsContent">
                                {novels.novel_content}
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
                <div className="NovelsFeed__BarSpan"></div>
                {/* 削除ボタン */}
                <RemoveFeatures
                    theme="話"
                    author={novels.author}
                    currentUser={currentUser}
                    handleClick={handleClick}
                    confirmation={confirmation}
                    handleOkRemove={handleOkRemove}
                    handleNoRemove={handleNoRemove}
                />
            </React.Fragment>
        )
    }

    const renderer = () => {
        if (!novels.release && novels.author === currentUser) {
            return rendererNovelsContents()
        } else if (!novels.release && novels.author !== currentUser) {
            return <ErrorMessages errors={errors} />
        } else if (novels.release) {
            return rendererNovelsContents()
        }
    }

    return (
        <div>
            {renderer()}
        </div>
    )
}

export default NovelsContents
