import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsFeed.css'
import NovelsInNovelsFeed from '../NovelsInNovelsFeed/NovelsInNovelsFeed'
import useFetchItems from '../../../CustomHooks/NovelsHooks/useFetchItems'
import useRemoveItems from '../../../CustomHooks/NovelsHooks/useRemoveItems'
import RemoveFeatures from '../../Remove/RemoveFeatures'
import Spinner from '../../Spinner/Spinner'
import TagsWrapper from '../../Tags/TagsWrapper/TagsWrapper'

function NovelsFeed({ seriesId, userId, loggedInStatus, history, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL
    // 投稿データを取得
    const { items, isLoading } = useFetchItems({
        method: "get",
        url: `${domain}/api/v1/novel_series/${seriesId}`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })
    // 削除機能
    const { confirmation, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `${domain}/api/v1/novel_series/${seriesId}`,
        target: "シリーズ",
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <React.Fragment>
                    <div className="novels-feed">
                        {/* シリーズタイトル・あらすじ */}
                        <div className="novels-feed--series">
                            <div className="novels-feed--series-top">
                                <p className="novels-feed--series-title">{items.series.series_title}</p>
                                <p className="novels-feed--series-writer">作者:
                                    <Link to={`/users/${items.series.user_id}`} className="novels-feed--series-writer-name">{items.series.author}</Link>
                                </p>
                            </div>
                            <div className="novels-feed--series-center">
                                <p className="novels-feed--series-description">{items.series.series_description}</p>
                            </div>
                            <div className="novels-feed--series-bottom">
                                <div className="novels-feed--series-favorites">お気に入り総数:
                                    <span>{items.favorites_count}</span>
                                </div>
                                <div className="novels-feed--series-comments">コメント総数:
                                    <span>{items.comments_count}</span>
                                </div>
                            </div>
                            <div className="novels-feed--series-tag-wrapper">
                                <TagsWrapper tags={items.tags} />
                            </div>
                            {/* ログイン中のユーザーと作者が異なるか、非ログインの場合は編集不可 */}
                            {items.series.user_id === userId && loggedInStatus &&
                                <div className="novels-feed--series-edit-link-wrapper">
                                    <React.Fragment>
                                        <Link to={`/novel_series/${items.series.id}/edit`} className="novels-feed--series-edit-link" >
                                            編集する
                                        </Link>
                                        <Link to={`/novel_series/${items.series.id}/add_novels`} className="novels-feed--series-add-link">
                                            小説を追加する
                                        </Link>
                                    </React.Fragment>
                                </div>
                            }
                        </div>
                        {/* シリーズ内の小説一覧 */}
                        {items.novels.length !== 0 &&
                            <React.Fragment>
                                <div className="novels-feed--novels-wrapper">
                                    <p className="novels-feed--novels-count">
                                        （全 {items.novels_count} 話）
                                    </p>
                                    <NovelsInNovelsFeed novel={items.novels} userId={userId} />
                                </div>
                                <div className="novels-feed--novels-bar-span"></div>
                            </React.Fragment>
                        }
                    </div>
                    {/* 削除ボタン */}
                    {items.series.user_id === userId &&
                        <RemoveFeatures
                            theme="シリーズ"
                            authorId={items.series.user_id}
                            currentUserId={userId}
                            handleClick={handleClick}
                            confirmation={confirmation}
                            handleOkRemove={handleOkRemove}
                            handleNoRemove={handleNoRemove}
                        />
                    }
                </React.Fragment>}
        </React.Fragment>
    )
}

export default NovelsFeed
