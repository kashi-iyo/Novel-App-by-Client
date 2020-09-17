import React from 'react'
import classNames from 'classnames'

import './SeriesForm.css'
import useNovelsInput from '../../CustomHooks/NovelsHooks/useNovelsInput'
// import validateSeriesForm from '../../CustomHooks/ValidateHooks/validateNovels/validateSeriesForm'
// import useLoggedIn from '../../CustomHooks/AuthHooks/useLoggedIn'

// シリーズ作成フォームを作成
function SeriesForm(props) {
    // method: HTTPリクエスト, url: Railsのルーティング, mount: マウント処理, sendItems: EditItemsから渡されるデータ
    // props: historyなどの取得のため
    const { values, release, handleStatusChange, successful, errors, existingErrors, handleSubmit, handleChange } =
        useNovelsInput({
            method: props.method, url: props.url, mount: props.setIsMounted,
            sendItems: props.novelSeries, props: props
        })
    const title = values.series_title
    const description = values.series_description
    const nowRelease = values.release ? values.release : release
    const tLength = title.length
    const dLength = description.length

    // フィールドに入力された字数によりクラス名を変更する
    const titleClass = classNames("ok", { "over": tLength > 50, "no": tLength === 0 })
    const descriptionClass = classNames("ok", { "over": dLength > 300 })
    const buttonClass = classNames("button", { "noButton": tLength > 50 || tLength === 0 || dLength > 300 })

    return (
        <div className="SeriesForm">
            {/* ボタンの文字列によって表示を切り替える */}
            {
                props.button === "作成する" ?
                    <h3>─シリーズ作成フォーム─</h3> :
                    <h3>─シリーズ編集フォーム─</h3>
            }

            {/* ボタンの文字列によってイベントを切り替える */}
            <form onSubmit={handleSubmit}>
                {errors ? <p className="error">{errors}</p> : null}

                {/* シリーズタイトル */}
                <div className="TitleWrapper">
                    {title ? null : <span className={titleClass}>【入力必須】</span>}
                    <label htmlFor="series_title" className="Title">シリーズタイトル</label>
                    <span className={titleClass}>
                        {tLength}／50文字
                        {tLength > 50 ?
                            <span className={titleClass}>【50文字以内で入力してください】</span> :
                            null
                        }
                    </span>
                    <input
                        type="text"
                        placeholder="タイトル"
                        id="series_title"
                        name="series_title"
                        className="series_title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                {/* ========== */}

                {/* シリーズあらすじ */}
                <div className="DescriptionWrapper">
                    <label htmlFor="series_description" className="Description">あらすじ</label>
                    <textarea
                        placeholder="あらすじ"
                        name="series_description"
                        id="series_description"
                        className="series_description"
                        value={description}
                        onChange={handleChange}
                    />
                    <span className={descriptionClass}>
                        {dLength}／300文字
                        {dLength > 300 ?
                            <span className={descriptionClass}>
                                【300文字以内で入力してください】
                            </span> :
                            null
                        }
                    </span>
                </div>
                {/* ========== */}

                {/* 公開チェックボックス */}
                <div className="releaseWrapper">
                    <input
                        type="checkbox"
                        name="release"
                        id="release"
                        className="release"
                        checked={nowRelease}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="release" className="releaseLabel">公開する</label>
                </div>
                {/* ========== */}
                {successful ? <p className="successful">── {successful} ──</p>: null}
                <button type="submit" className={buttonClass}>{props.button}</button>
            </form>
        </div>
    )
}

export default SeriesForm
