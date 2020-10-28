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
import Spinner from '../../Spinner/Spinner'


// 小説1話分の内容を表示
function NovelsContents({currentUser, userId, seriesId, novelId, history}) {
    const { items, errors, isLoading } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelId}`
    })
console.log("NovelsContent")
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelId}`,
        keyword: "novel",
        history: history
    })

    const rendererNovelsContents = ({series, novel, favorites, comments}) => {
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
                                        {series.series_title}
                                    </Link>
                                </p>
                            </div>
                            <div className="NovelContents__WriterEditWrapper">
                                <div className="NovelsContents__SeriesWriter">
                                    <span className="writerWrapper">作者名: </span>
                                    <span className="writerName">
                                        <Link>{series.author}</Link>
                                    </span>
                                </div>
                                {/* 編集リンク */}
                                {
                                userId === novel.user_id &&
                                    <Link to={`/novel_series/${seriesId}/novels/${novelId}/edit`} className="NovelsContents__Edit" >
                                        編集する
                                    </Link>
                                }
                            </div>
                        </div>
                        {/* 小説の内容 */}
                        <div className="NovelsContents__Novels">
                            <div className="NovelsContents__NovelsTitle">
                                {novel.novel_title}
                            </div>
                            <div className="NovelsContents__NovelsDescription">
                                {novel.novel_description}
                            </div>
                            <div className="NovelsContents__NovelsContent">
                                {novel.novel_content}
                            </div>
                        </div>
                    </div>
                    {/* 小説への評価 */}
                    <div className="NovelsContents__Options">
                        <React.Fragment>
                            {/* お気に入りボタン */}
                            <FavoritesButtonWrapper
                                favoritesData={favorites.favorites}
                                favoritesCount={favorites.favorites_count}
                                userId={userId}
                                novelId={novelId}
                                currentUser={currentUser}
                            />
                            {/* コメント機能 */}
                            <CommentWrapper
                                novelId={novelId}
                                commentsObject={comments}
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
                    authorId={novel.user_id}
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
        if (!!errors) {
            return <ErrorMessages errors={errors} />
        } else if (items.length !== 0) {
            return rendererNovelsContents({
                series: items.series,
                novel: items.novel,
                favorites: items.favorites_obj,
                comments: items.comments_obj
            })
        }
    }

    return (
        <div>
            {isLoading ? <Spinner /> : renderer()}
        </div>
    )
}

export default NovelsContents
