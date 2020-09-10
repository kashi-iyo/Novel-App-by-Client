import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './NovelsFeed.css'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import NovelsInNovelsFeed from '../NovelsInNovelsFeed/NovelsInNovelsFeed'
import Novels from '../Novels'

function NovelsFeed(props) {
    // シリーズデータ
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")
   // 小説データ
    const [novels, setNovels] = useState("")
    const [author, setAuthor] = useState("")
    const [release, setRelease] = useState(false)
    const [releaseErrors, setReleaseErrors] = useState("")
    // ログインしているかどうか
    const loggedInStatus = props.loggedInStatus
    // ログインユーザー取得
    const user = props.user.nickname
    // マウント前後処理
    const [isMounted, setIsMounted] = useState(false)

    // シリーズのパラメータを持つURL
    const params = props.match.params.id

    // シリーズデータを取得
    useEffect(() => {
        // リダイレクト
        const redirect = () => {
            props.history.push("/")
        }
        const seriesValue = () => {
            axios.get(`http://localhost:3001/api/v1/novel_series/${params}`, { withCredentials: true })
                .then(response => {
                    if (isMounted && response.data.status === 200) {
                        setSeriesTitle(response.data.novel_series.series_title)
                        setSeriesDescription(response.data.novel_series.series_description)
                        setAuthor(response.data.novel_series.author)
                        setRelease(response.data.novel_series.release)
                    } else if (isMounted && response.data.status === 400) {
                        setReleaseErrors(response.data.messages)
                        setTimeout(() => {redirect()}, 2000)
                    }
                })
                    .catch(error => console.log('エラー: ', error))
        }
        setIsMounted(true)
        seriesValue()
    }, [params, props.history, releaseErrors, isMounted])

    // シリーズが所有する小説をRailsから取得
    useEffect(() => {
        const novelsValue = () => {
            axios.get(`http://localhost:3001/api/v1/novel_series/${params}/novels`, { withCredentials: true })
                .then(response => {
                    if (isMounted && response.data.status === 200) {
                        setNovels(response.data.novels_in_series)
                    }
                })
                .catch(error => console.log("エラー: ", error))
        }
        setIsMounted(true)
        novelsValue()
    }, [params, isMounted])

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
