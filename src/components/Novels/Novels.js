import React from 'react'
import { Link } from 'react-router-dom'
import './Novels.css'

// NovelsFeedに表示する小説全件
function Novels({novelId, novelTitle, release, seriesId, novelUserId, userId}) {

    // 公開されているかどうか、また作者かどうかで小説の表示を切り替える
    const handleChangeNovelsRenderer = () => {
        const oneNovelUrl = `/novel_series/${seriesId}/novels/${novelId}` // 小説1話分へのURL
        // 公開&ログインユーザーと作者が等しい場合
        if (release && novelUserId === userId) {
            return (
                <div className="Novels__Link">
                    <Link to={oneNovelUrl}>
                        {`【公開中】${novelTitle}`}
                    </Link>
                </div>
            )
        // 非公開だがログインユーザーと作者が等しい場合
        } else if (!release && novelUserId === userId) {
            return (
                <div className="Novels__Link">
                    <Link to={oneNovelUrl}>
                        {`【非公開中】${novelTitle}`}
                    </Link>
                </div>
            )
        // 公開されている場合
        } else if (release) {
            return (
                <div className="Novels__Link">
                    <Link to={oneNovelUrl}>
                        {`${novelTitle}`}
                    </Link>
                </div>
            )
        // 非公開になっている場合
        } else if (!release) {
            return (
                <div>
                    <span className="Novels__Unrelease">この話は現在非公開になっています。</span>
                </div>
            )
        }
    }


    // 小説1話分をのタイトルリンクをレンダリングする
    const handleNovelsRenderer = () => {
        return (
            <div>
                <div className="Novels">
                    <ul className="Novels__Ul">
                        <li className="Novels__Li">
                            {handleChangeNovelsRenderer()}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* 小説1話分のタイトルを表示 */}
            {handleNovelsRenderer()}
        </div>
    )
}

export default Novels
