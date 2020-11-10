import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsContents.css'
import useFetchItems from '../../../CustomHooks/NovelsHooks/useFetchItems'
import RemoveFeatures from '../../Remove/RemoveFeatures'
import useRemoveItems from '../../../CustomHooks/NovelsHooks/useRemoveItems'
import NovelPagination from './NovelPagination/NovelPagination'
import CommentWrapper from '../../Comment/CommentWrapper'
import FavoritesButtonWrapper from '../../Favorites/FavoritesButtonWrapper'
import Spinner from '../../Spinner/Spinner'


// 小説1話分の内容を表示
function NovelsContents({currentUser, userId, seriesId, novelId, history, handleFlashMessages}) {
    const { novelItems, isLoading } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelId}`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    const { confirmation, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}/novels/${novelId}`,
        keyword: "novel",
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    const series = novelItems && novelItems.series
    const novel = novelItems && novelItems.novel
    const novelIds = novelItems && novelItems.novelIds
    const favorites = novelItems && novelItems.favorites
    const comments = novelItems && novelItems.comments

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <React.Fragment>
                    <div className="novels-contents--top">
                        {/* 小説のページネーション */}
                        <NovelPagination seriesId={seriesId} novelId={novelId} ids={novelIds} />
                        <div className="novels-contents">
                            {/* シリーズタイトルと作者 */}
                            <div className="novels-contens--series">
                                <div className="novels-contents--series-title-wrapper">
                                    <p className="novels-contents-series-title">
                                        <Link to={`/novel_series/${seriesId}`}>
                                            {series.series_title}
                                        </Link>
                                    </p>
                                </div>
                                <div className="novels-contents--series-writer-edit-wrapper">
                                    <div className="novels-contents--series-writer-wrapper">
                                        <span className="novels-contents--series-writer">作者名: </span>
                                        <span className="novels-contents--series-writer-name">
                                            <Link>{series.author}</Link>
                                        </span>
                                    </div>
                                    {/* 編集リンク */}
                                    {userId === novel.user_id &&
                                        <Link to={`/novel_series/${seriesId}/novels/${novelId}/edit`} className="novels-contents--edit" >
                                            編集する
                                        </Link>}
                                </div>
                            </div>
                            {/* 小説の内容 */}
                            <div className="novels-contents--novels">
                                <div className="novels-contents--novels-title">
                                    {novel.novel_title}
                                </div>
                                <div className="novels-contents--novels-description">
                                    {novel.novel_description}
                                </div>
                                <div className="novels-contents-novels-content">
                                    {novel.novel_content}
                                </div>
                            </div>
                        </div>
                        {/* 小説への評価 */}
                        <div className="novels-contents--options">
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
                        <NovelPagination seriesId={seriesId} novelId={novelId} ids={novelIds} />
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
            }
        </React.Fragment>
    )
}

export default NovelsContents
