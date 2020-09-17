import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsFeed.css'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import NovelsInNovelsFeed from '../NovelsInNovelsFeed/NovelsInNovelsFeed'
import Novels from '../Novels'
import useLoggedIn from '../../CustomHooks/Auth/useLoggedIn'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'

function NovelsFeed(props) {
    const params = props.match.params.id
    const { items, errors } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${params}`
    })
    const { loggedInStatus, user } = useLoggedIn()
    const currentUser = user.nickname

    // シリーズデータ
    const author = items.author
    const seriesId = items.id
    const seriesTitle = items.series_title
    const seriesDescription = items.series_description

    const novels = items.novel_in_series      // 小説全件
    const release = items.release     // 公開or非公開
    const errorMessages = errors     // エラーメッセージ
    const editUrl = `/novel_series/${seriesId}/edit`    //シリーズ編集リンク
    const addUrl = `/novel_series/${seriesId}/add_novels`    //小説追加リンク

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
                    {author === user && loggedInStatus ?
                        <div className="Series__editLinkWrap">
                            <React.Fragment>
                                <Link to={editUrl} className="Series__editLink" >
                                    編集する
                                </Link>
                                <Link to={addUrl} className="Series__addLink">
                                    小説を追加する
                                </Link>
                            </React.Fragment>
                        </div> :
                        null
                    }
                </div>

                {/* シリーズ内の小説一覧 */}
                <NovelsInNovelsFeed>
                    {
                        novels ?
                            novels.map(novel => (
                                <Novels {...props}
                                    key={novel.id}
                                    novel={novel}
                                    author={author}
                                    user={user}
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
            {release || author === currentUser ?
                handleNovelsFeed() :
                <ErrorMessages {...props} releaseErrors={errorMessages} />
            }
        </div>
    )
}

export default NovelsFeed
