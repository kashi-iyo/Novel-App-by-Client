import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function NovelsFeed(props) {
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")
    const [author, setAuthor] = useState("")

    // シリーズのパラメータを持つURL
    const url = props.match.url

    useEffect(() => {
        const seriesValue = () => {
            axios.get(`http://localhost:3001/api/v1${url}`, { withCredentials: true })
                .then(response => {
                    setSeriesTitle(response.data.novel_series.series_title)
                    setSeriesDescription(response.data.novel_series.series_description)
                    setAuthor(response.data.novel_series.author)
                })
                    .catch(error => console.log('エラー: ', error))
                }
        seriesValue()
    }, [url])

    return (
        <div>
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
                <div className="Series__editLinkWrap">
                    <Link className="Series__editLink" to={`${url}/edit`}>編集する</Link>
                </div>
            </div>

            {/* シリーズ内の小説一覧 */}
            <div className="Novels">
                <ul className="Novels__Ul">
                    <li className="Novels__Li"><Link to="/novels_series/:id/novels/:id" className="Novels__Link">お話</Link></li>
                    <li className="Novels__Li"><Link className="Novels__Link">お話</Link></li>
                    <li className="Novels__Li"><Link className="Novels__Link">お話</Link></li>
                    <li className="Novels__Li"><Link className="Novels__Link">お話</Link></li>
                    ...
                </ul>
            </div>
        </div>
    )
}

export default NovelsFeed