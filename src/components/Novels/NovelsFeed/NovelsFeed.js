import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsFeed.css'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import NovelsInNovelsFeed from '../NovelsInNovelsFeed/NovelsInNovelsFeed'
import Novels from '../Novels'
import { useSeriesAndNovelsItems }  from '../useSeriesAndNovelsItems/useSeriesAndNovelsItems'

function NovelsFeed(props) {
    const items = useSeriesAndNovelsItems(props)
    // シリーズデータ
    const seriesTitle = items.seriesTitle
    const seriesDescription = items.seriesDescription
    // 作者
    const author = items.author
    // 小説全件
    const novels = items.novels
    // ログイン状態の確認
    const loggedInStatus = items.loggedInStatus
    // パラメータ
    const params = items.params
    // マウント処理
    const setIsMounted = items.setIsMounted
    // ユーザーデータ
    const user = items.user
    // 公開or非公開
    const release = items.release
    // エラーメッセージ
    const releaseErrors = items.releaseErrors

    // シリーズデータを表示
    const handleNovelsFeed = () => {
        return (
            <div className="NovelsFeed">
                {/* シリーズタイトル・あらすじ */}
                <div className="Series">
                    <div className="Series__top">
                        <p className="Series__title">{seriesTitle}</p>
                        <p className="Series__writer">作者:
                            <Link className="Series__writerName">{author}</Link>
                        </p>
                    </div>
                    <div className="Series__center">
                        <p className="Series__description">{seriesDescription}</p>
                    </div>
                    <div className="Series__bottom">
                        <div className="Series__reviews">評価数:
                            <Link className="Series__Link">5</Link>
                        </div>
                        <div className="Series__favorites">お気に入り数:
                            <Link className="Series__Link">5</Link>
                        </div>
                        <div className="Series__comments">コメント数:
                            <Link className="Series__Link">5</Link>
                        </div>
                    </div>
                    <div className="Series__tagWrap">
                        <ul className="Series__tagUl">
                            <li className="Series__tagLi">
                                <Link className="Series__tagLink">タグ</Link>
                            </li>
                            <li className="Series__tagLi">
                                <Link className="Series__tagLink">タグ</Link>
                            </li>
                            <li className="Series__tagLi">
                                <Link className="Series__tagLink">タグ</Link>
                            </li>
                            <li className="Series__tagLi">
                                <Link className="Series__tagLink">タグ</Link>
                            </li>
                        </ul>
                    </div>
                    {/* ログイン中のユーザーと作者が異なるか、非ログインの場合は編集不可 */}
                    {author !== user || !loggedInStatus ? null :
                        <div className="Series__editLinkWrap">
                            <Link className="Series__editLink" to={`/novel_series/${params}/edit`}>編集する</Link>
                        </div>
                    }
                </div>

                {/* シリーズ内の小説一覧 */}
                <NovelsInNovelsFeed>
                    {
                        novels ?
                            novels.map(novel => (
                                <Novels {...props} key={novel.id}
                                    novel={novel} author={author} user={user}
                                    setIsMounted={setIsMounted}
                                />
                            )) :
                            null
                    }
                </NovelsInNovelsFeed>
            </div>
        )
    }

    return (
        <div>
            {/* Release（公開）されていない場合 or 作者とログインユーザーが異なる場合、エラーを表示 */}
            {release || author === user ?
                handleNovelsFeed() :
                <ErrorMessages {...props} releaseErrors={releaseErrors} />
            }
        </div>
    )
}

export default NovelsFeed
