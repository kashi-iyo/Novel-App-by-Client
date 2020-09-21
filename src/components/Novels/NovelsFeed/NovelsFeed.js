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
    const { novels, series, errors } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${params}`
    })
    const { loggedInStatus, currentUser } = useLoggedIn()
    const seriesId = series.id
    const editUrl = `/novel_series/${seriesId}/edit`    //シリーズ編集リンク
    const addUrl = `/novel_series/${seriesId}/add_novels`    //小説追加リンク

    // シリーズデータを表示
    const handleNovelsFeed = () => {
        return (
            <div className="NovelsFeed">
                {/* シリーズタイトル・あらすじ */}
                <div className="SeriesFeed">
                    <div className="SeriesFeed__top">
                        <p className="SeriesFeed__title">{series.series_title}</p>
                        <p className="SeriesFeed__writer">作者:
                            <Link className="SeriesFeed__writerName">{series.author}</Link>
                        </p>
                    </div>
                    <div className="SeriesFeed__center">
                        <p className="SeriesFeed__description">{series.series_description}</p>
                    </div>
                    <div className="SeriesFeed__bottom">
                        <div className="SeriesFeed__reviews">評価数:
                            <Link className="SeriesFeed__Link">5</Link>
                        </div>
                        <div className="SeriesFeed__favorites">お気に入り数:
                            <Link className="SeriesFeed__Link">5</Link>
                        </div>
                        <div className="SeriesFeed__comments">コメント数:
                            <Link className="SeriesFeed__Link">5</Link>
                        </div>
                    </div>
                    <div className="SeriesFeed__tagWrap">
                        <ul className="SeriesFeed__tagUl">
                            <li className="SeriesFeed__tagLi">
                                <Link className="SeriesFeed__tagLink">タグ</Link>
                            </li>
                            <li className="SeriesFeed__tagLi">
                                <Link className="SeriesFeed__tagLink">タグ</Link>
                            </li>
                            <li className="SeriesFeed__tagLi">
                                <Link className="SeriesFeed__tagLink">タグ</Link>
                            </li>
                            <li className="SeriesFeed__tagLi">
                                <Link className="SeriesFeed__tagLink">タグ</Link>
                            </li>
                        </ul>
                    </div>
                    {/* ログイン中のユーザーと作者が異なるか、非ログインの場合は編集不可 */}
                    {series.author === currentUser && loggedInStatus ?
                        <div className="SeriesFeed__editLinkWrap">
                            <React.Fragment>
                                <Link to={editUrl} className="SeriesFeed__editLink" >
                                    編集する
                                </Link>
                                <Link to={addUrl} className="SeriesFeed__addLink">
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
                                    currentUser={currentUser}
                                />
                            )) : null
                    }
                </NovelsInNovelsFeed>
            </div>
        )
    }

    const handleRenderer = () => {
        // 非公開&ログインユーザーが作者でない場合
        if (!series.release && series.author !== currentUser) {
            return <ErrorMessages {...props} releaseErrors={errors} />
        // 非公開の場合
        } else if (!series.release) {
            return <ErrorMessages {...props} releaseErrors={errors} />
        // 公開されている場合
        } else if (series.release) {
            return handleNovelsFeed()
        }
    }

    return (
        <div>
            {handleRenderer()}
        </div>
    )
}

export default NovelsFeed
