import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsFeed.css'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import NovelsInNovelsFeed from '../NovelsInNovelsFeed/NovelsInNovelsFeed'
import useFetchItems from '../../../CustomHooks/NovelsHooks/useFetchItems'
import useRemoveItems from '../../../CustomHooks/NovelsHooks/useRemoveItems'
import RemoveFeatures from '../../Remove/RemoveFeatures'
import Flash from '../../Flash/Flash'
import SeriesTags from '../../Tags/SeriesTags/SeriesTags'
import Spinner from '../../Spinner/Spinner'

function NovelsFeed({seriesId, userId, loggedInStatus, currentUser, history}) {
    // 投稿データを取得
    const { items, errors, isLoading } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}`
    })
    // 削除機能
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${seriesId}`,
        keyword: "series",
        history: history
    })

    // シリーズデータを表示
    const handleNovelsFeed = () => {
        return (
            <React.Fragment>
                <Flash Success={removeSuccess} Errors={removeErrors} />
                <div className="NovelsFeed">
                    {/* シリーズタイトル・あらすじ */}
                    <div className="SeriesFeed">
                        <div className="SeriesFeed__top">
                            <p className="SeriesFeed__title">{items.series.series_title}</p>
                            <p className="SeriesFeed__writer">作者:
                                <Link to={`/users/${items.series.user_id}`} className="SeriesFeed__writerName">{items.series.author}</Link>
                            </p>
                        </div>
                        <div className="SeriesFeed__center">
                            <p className="SeriesFeed__description">{items.series.series_description}</p>
                        </div>
                        <div className="SeriesFeed__bottom">
                            <div className="SeriesFeed__favorites">お気に入り総数:
                                <span>{items.favorites_count}</span>
                            </div>
                            <div className="SeriesFeed__comments">コメント総数:
                                <span>{items.comments_count}</span>
                            </div>
                        </div>
                        <div className="SeriesFeed__tagWrap">
                            <ul className="SeriesFeed__tagUl">
                                <SeriesTags tags={items.tags} />
                            </ul>
                        </div>
                        {/* ログイン中のユーザーと作者が異なるか、非ログインの場合は編集不可 */}
                        {items.series.user_id === userId && loggedInStatus &&
                            <div className="SeriesFeed__editLinkWrap">
                                <React.Fragment>
                                    <Link to={`/novel_series/${items.series.id}/edit`} className="SeriesFeed__editLink" >
                                        編集する
                                    </Link>
                                    <Link to={`/novel_series/${items.series.id}/add_novels`} className="SeriesFeed__addLink">
                                        小説を追加する
                                    </Link>
                                </React.Fragment>
                            </div>
                        }
                    </div>
                    {/* シリーズ内の小説一覧 */}
                    <p className="NovelsFeed__NovelsCount">（全 {items.novels_count} 話）</p>
                    <NovelsInNovelsFeed novel={items.novels} userId={userId} />
                    <div className="NovelsFeed__BarSpan"></div>
                </div>
                {/* 削除ボタン */}
                <RemoveFeatures
                        theme="シリーズ"
                        author={items.series.author}
                        currentUser={currentUser}
                        handleClick={handleClick}
                        confirmation={confirmation}
                        handleOkRemove={handleOkRemove}
                        handleNoRemove={handleNoRemove}
                />
            </React.Fragment>
        )
    }

    // レンダリングする要素
    // エラー／投稿データ
    const handleRenderer = () => {
        // 投稿データが存在しない場合
        if (removeErrors) {
            return <ErrorMessages errors={errors} />
        // ある場合
        } else if (items) {
            return handleNovelsFeed()
        }
    }

    return (
        <div>
            {isLoading ? <Spinner /> : handleRenderer()}
        </div>
    )
}

export default NovelsFeed
