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

function NovelsFeed(props) {
    // シリーズ詳細画面のパラメータ
    const params = props.match.params.id
    // 投稿データを取得
    const { items, errors, isLoading } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${params}`
    })
    // 削除機能
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${params}`,
        keyword: "series",
        history: props.history
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
                            <p className="SeriesFeed__title">{items.series_title}</p>
                            <p className="SeriesFeed__writer">作者:
                                <Link to={`/users/${items.user_id}`} className="SeriesFeed__writerName">{items.author}</Link>
                            </p>
                        </div>
                        <div className="SeriesFeed__center">
                            <p className="SeriesFeed__description">{items.series_description}</p>
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
                        {items.user_id === props.userId && props.loggedInStatus &&
                            <div className="SeriesFeed__editLinkWrap">
                                <React.Fragment>
                                    <Link to={`/novel_series/${items.id}/edit`} className="SeriesFeed__editLink" >
                                        編集する
                                    </Link>
                                    <Link to={`/novel_series/${items.id}/add_novels`} className="SeriesFeed__addLink">
                                        小説を追加する
                                    </Link>
                                </React.Fragment>
                            </div>
                        }
                    </div>
                    {/* シリーズ内の小説一覧 */}
                    <NovelsInNovelsFeed novel={items.novels} userId={props.userId} />
                    <div className="NovelsFeed__BarSpan"></div>
                </div>
                {/* 削除ボタン */}
                <RemoveFeatures
                        theme="シリーズ"
                        author={items.author}
                        currentUser={props.currentUser}
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
        if (!items) {
            return <ErrorMessages errors={errors} />
            // 非公開&ログインユーザーが作者でない場合
        } else if (!items.release && items.user_id === props.userId) {
            return handleNovelsFeed()
        } else if (!items.release && items.user_id !== props.userId) {
            return <ErrorMessages errors={errors} />
        // 公開の場合
        } else if (items.release) {
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
