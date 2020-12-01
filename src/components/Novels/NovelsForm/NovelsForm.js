import React from 'react'
import {Link} from 'react-router-dom'

import '../../Series/Series.css'
import './NovelsForm.css'
import useItemsInput from '../../../CustomHooks/NovelsHooks/useItemsInput'
import ValidateWordsCounts from '../../ValidateWordsCounts/ValidateWordsCounts'
import Button from '../../Button/Button'

// 小説作成フォームを作成
function NovelsForm({ url, method, formType, dataType, novels, history, button, seriesId, novelsId, handleFlashMessages }) {
    const domain = process.env.REACT_APP_BACKEND_URL

    const { values, release,  handleChange, handleSubmit, handleStatusChange, } =
        useItemsInput({
            url: url,   //Railsへのルーティング
            method: method, // HTTPリクエスト
            formType: formType, // create or edit
            dataType: dataType, // series or novel
            sendItems: novels, // 編集用の小説データ
            history: history,  // リダイレクトに使用
            handleFlashMessages: handleFlashMessages  // フラッシュメッセージの表示
        })

    const title = values.novel_title
    const description = values.novel_description
    const content = values.novel_content


    return (
        <React.Fragment>
            <div className="series-form">
                {/* ボタンの文字列によって表示を切り替える */}
                <div className="series-form--header">
                    {button === "追加する" ?
                        <h3 className="caption">小説追加</h3> :
                        <h3 className="caption">小説編集</h3>}
                    <div className="series-form--back-to-series-page">
                        <Link to={`/novel_series/${seriesId}`}>シリーズ管理画面へ戻る</Link>
                    </div>
                    {formType === "edit" &&
                        <div className="series-form--back-to-novels-page">
                            <Link to={`/novel_series/${seriesId}/novels/${novelsId}`}>小説管理画面へ戻る</Link>
                        </div>}
                </div>
                {/* ボタンの文字列によってイベントを切り替える */}
                <form>
                    {/*タイトル */}
                    <div className="series-form--title-wrapper">
                        {!title && <span className="error">【入力必須】</span>}
                        <label htmlFor="novels_title" className="series-form--title-label">タイトル</label>
                        <ValidateWordsCounts
                            wordsLength={title.length}
                            upperLimit={50}
                            isRequire={true}
                        />
                        <input
                            type="text"
                            placeholder="タイトル"
                            id="novels_title"
                            name="novel_title"
                            className="series-form--title-input"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    {/* ========== */}

                    {/* 前書き */}
                    <div className="series-form--description-wrapper">
                        <label
                            htmlFor="novels_description" className="series-form--description-label">
                            前書き
                        </label>
                        <ValidateWordsCounts
                            wordsLength={description.length}
                            upperLimit={300}
                            isRequire={false}
                        />
                        <textarea
                            placeholder="前書き"
                            id="novels_description"
                            name="novel_description"
                            className="series-form--description-input"
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                    {/* ========== */}

                    {/* 内容 */}
                    <div className="series-form--content-wrapper">
                        {!content && <span className="error">【入力必須】</span>}
                        <label htmlFor="novels_content" className="series-form--content-label">
                            本文
                        </label>
                        <ValidateWordsCounts
                            wordsLength={content.length}
                            isRequire={true}
                        />
                        <textarea
                            placeholder="本文"
                            id="novels_content"
                            name="novel_content"
                            className="series-form--content-input"
                            value={content}
                            onChange={handleChange}
                        />
                    </div>

                    {/* 公開チェックボックス */}
                    <div className="release-wrapper">
                        <input
                            type="checkbox"
                            name="release"
                            id="release"
                            className="release-input"
                            checked={release}
                            onChange={handleStatusChange}
                        />
                        <label htmlFor="release" className="release-label">公開する</label>
                    </div>
                    {/* ========== */}

                    <Button
                        handleSubmit={handleSubmit}
                        badCase={
                            title.length === 0 ||
                            title.length > 50 ||
                            description.length > 300 ||
                            content.length === 0 ?
                            true :
                            false
                        }
                        buttonValue={button}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

export default NovelsForm