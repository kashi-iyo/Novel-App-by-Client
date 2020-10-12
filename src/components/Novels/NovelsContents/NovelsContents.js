import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsContents.css'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import RemoveFeatures from '../../Remove/RemoveFeatures'
import useRemoveItems from '../../CustomHooks/NovelsHooks/useRemoveItems'
import Flash from '../../Flash/Flash'
import FavoritesButton from './Favorites/FavoritesButton'
import NovelPagination from './NovelPagination/NovelPagination'
import CommentWrapper from '../../Comment/RenderComment/CommentWrapper'


// 小説1話分の内容を表示
function NovelsContents(props) {
    const url = props.match.url
    const novelId = parseInt(props.match.params.novel_id)
    const seriesId = parseInt(props.match.params.id)
    const { series, novels, commentsCount, errors } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1${url}`
    })
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${series.seriesId}/novels/${novels.novelId}`,
        keyword: "novel",
        history: props.history
    })
    const editUrl = `/novel_series/${seriesId}/novels/${novelId}/edit`
    const seriesUrl = `/novel_series/${seriesId}`

    const rendererNovelsContents = () => {
        return (
            <React.Fragment>
                <Flash Errors={removeErrors} Success={removeSuccess} />
                <div>
                    {/* 小説のページネーション */}
                    <div className="PaginationTop">
                        <NovelPagination seriesId={series.seriesId} novelId={novelId} />
                    </div>
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
                                {/* 編集リンク */}
                                {
                                props.currentUser === novels.author ?
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
                    </div>
                    {/* 小説への評価 */}
                    <div className="NovelsContents__Options">
                        <React.Fragment>
                            {/* お気に入りボタン */}
                            <FavoritesButton
                                userId={parseInt(props.userId)}
                                novelId={novelId}
                                currentUser={props.currentUser}
                            />
                            {/* コメント機能 */}
                            <CommentWrapper
                                novelId={novelId}
                                commentsCount={commentsCount}
                                userId={parseInt(props.userId)}
                                currentUser={props.currentUser}
                            />
                        </React.Fragment>
                    </div>
                    {/* 小説のページネーション */}
                    <div className="Pagination">
                        <NovelPagination seriesId={series.seriesId} novelId={novelId} />
                    </div>
                    {/* シリーズ内の小説全話を一覧する */}
                    <div className="SeriesContents"></div>
                </div>
                <div className="NovelsFeed__BarSpan"></div>
                {/* 削除ボタン */}
                <RemoveFeatures
                    theme="話"
                    author={novels.author}
                    currentUser={props.currentUser}
                    handleClick={handleClick}
                    confirmation={confirmation}
                    handleOkRemove={handleOkRemove}
                    handleNoRemove={handleNoRemove}
                />
            </React.Fragment>
        )
    }

    const renderer = () => {
        if (!novels.release && novels.author === props.currentUser) {
            return rendererNovelsContents()
        } else if (!novels.release && novels.author !== props.currentUser) {
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
