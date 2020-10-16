import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsContents.css'
import useFetchItems from '../../../CustomHooks/NovelsHooks/useFetchItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import RemoveFeatures from '../../Remove/RemoveFeatures'
import useRemoveItems from '../../../CustomHooks/NovelsHooks/useRemoveItems'
import Flash from '../../Flash/Flash'
import NovelPagination from './NovelPagination/NovelPagination'
import CommentWrapper from '../../Comment/CommentWrapper'
import FavoritesButtonWrapper from '../../Favorites/FavoritesButtonWrapper'


// 小説1話分の内容を表示
function NovelsContents({currentUser, loggedInStatus, userId, seriesId, novelId, history}) {
    const { items, errors } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelId}`
    })
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelId}`,
        keyword: "novel",
        history: history
    })

    const rendererNovelsContents = () => {
        return (
            <React.Fragment>
                <Flash Errors={removeErrors} Success={removeSuccess} />
                <div>
                    {/* 小説のページネーション */}
                    <div className="PaginationTop">
                        <NovelPagination seriesId={seriesId} novelId={novelId} />
                    </div>
                    <div className="NovelsContents">
                        {/* シリーズタイトルと作者 */}
                        <div className="NovelsContens__Series">
                            <div className="NovelsContents__SeriesTitle">
                                <p className="seriesTitle">
                                    <Link to={`/novel_series/${seriesId}`}>
                                        {items.series_title}
                                    </Link>
                                </p>
                            </div>
                            <div className="NovelContents__WriterEditWrapper">
                                <div className="NovelsContents__SeriesWriter">
                                    <span className="writerWrapper">作者名: </span>
                                    <span className="writerName">
                                        <Link>{items.author}</Link>
                                    </span>
                                </div>
                                {/* 編集リンク */}
                                {
                                userId === items.user_id &&
                                    <Link to={`/novel_series/${seriesId}/novels/${novelId}/edit`} className="NovelsContents__Edit" >
                                        編集する
                                    </Link>
                                }
                            </div>
                        </div>
                        {/* 小説の内容 */}
                        <div className="NovelsContents__Novels">
                            <div className="NovelsContents__NovelsTitle">
                                {items.novel_title}
                            </div>
                            <div className="NovelsContents__NovelsDescription">
                                {items.novel_description}
                            </div>
                            <div className="NovelsContents__NovelsContent">
                                {items.novel_content}
                            </div>
                        </div>
                    </div>
                    {/* 小説への評価 */}
                    <div className="NovelsContents__Options">
                        <React.Fragment>
                            {/* お気に入りボタン */}
                            <FavoritesButtonWrapper
                                favoritesData={items.favorites_data}
                                favoritesCount={items.favorites_count}
                                userId={userId}
                                novelId={novelId}
                                currentUser={currentUser}
                            />
                            {/* コメント機能 */}
                            <CommentWrapper
                                novelId={novelId}
                                commentsCount={items.comments_count}
                                commentsData={items.comments_data}
                                userId={userId}
                                currentUser={currentUser}
                            />
                        </React.Fragment>
                    </div>
                    {/* 小説のページネーション */}
                    <div className="Pagination">
                        <NovelPagination seriesId={seriesId} novelId={novelId} />
                    </div>
                    {/* シリーズ内の小説全話を一覧する */}
                    <div className="SeriesContents"></div>
                </div>
                <div className="NovelsFeed__BarSpan"></div>
                {/* 削除ボタン */}
                <RemoveFeatures
                    theme="話"
                    authorId={items.user_id}
                    currentUserId={userId}
                    handleClick={handleClick}
                    confirmation={confirmation}
                    handleOkRemove={handleOkRemove}
                    handleNoRemove={handleNoRemove}
                />
            </React.Fragment>
        )
    }

    const renderer = () => {
        if (!items.release && items.user_id === userId) {
            return rendererNovelsContents()
        } else if (!items.release && items.user_id !== userId) {
            return <ErrorMessages errors={errors} />
        } else if (items.release) {
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
