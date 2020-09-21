import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import '../../Series/Series.css'
import './NovelsForm.css'
import useItemsInput from '../../CustomHooks/NovelsHooks/useItemsInput'
// import validateSeriesForm from '../../CustomHooks/ValidateHooks/validateNovels/validateSeriesForm'
// import useLoggedIn from '../../CustomHooks/AuthHooks/useLoggedIn'

// シリーズ作成フォームを作成
function SeriesForm(props) {
    // method: HTTPリクエスト, url: Railsのルーティング, mount: マウント処理, sendItems: EditItemsから渡されるデータ
    // props: historyなどの取得のため
    const {
        values, release, successful, errors,
        existingErrors, handleChange,
        handleSubmit, handleStatusChange,
        } =
        useItemsInput({
            props: props,
            url: props.url,
            method: props.method,
            mounted: props.mounted,
            setMount: props.setMount,
            formType: props.formType,
            dataType: props.dataType,
            sendItems: props.novels,
        })
    const title = values.novel_title
    const description = values.novel_description
    const content = values.novel_content
    const tLength = title ? title.length : 0
    const dLength = description ? description.length : 0
    const cLength = content ? content.length : 0
    const seriesId = props.paramId.seriesId
    const novelsId = props.paramId.novelsId

    // フィールドに入力された字数によりクラス名を変更する
    const titleClass = classNames("ok", { "over": tLength > 50, "no": tLength === 0 })
    const descriptionClass = classNames("ok", { "over": dLength > 300 })
    const contentClass = classNames("ok", { "no": cLength === 0 })
    const buttonClass = classNames("button", { "noButton": tLength > 50 || tLength === 0 || dLength > 300 })

    return (
        <div className="SeriesForm">
            {/* ボタンの文字列によって表示を切り替える */}
            <div className="FormHeader">
                {
                    props.button === "追加する" ?
                        <h3>╋小説追加</h3> :
                        <h3>╋小説編集</h3>
                }
                <div className="SeriesForm__SeriesPage">
                    <Link to={`/novel_series/${seriesId}`}>シリーズ管理画面へ戻る</Link>
                </div>
                <div className="SeriesForm__NovelsPage">
                    <Link to={`/novel_series/${seriesId}/novels/${novelsId}`}>小説管理画面へ戻る</Link>
                </div>
            </div>

            {/* ボタンの文字列によってイベントを切り替える */}
            <form onSubmit={handleSubmit}>
                {errors && <p className="error">{errors}</p>}

                {/*タイトル */}
                <div className="TitleWrapper">
                    {tLength === 0 && <span className={titleClass}>【入力必須】</span>}
                    <label htmlFor="novels_title" className="Title">タイトル</label>
                    <span className={titleClass}>
                        {tLength}／50文字
                        {tLength > 50 && <span className={titleClass}>【50文字以内で入力してください】</span> }
                    </span>
                    <input
                        type="text"
                        placeholder="タイトル"
                        id="novels_title"
                        name="novel_title"
                        className="SeriesForm_title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                {/* ========== */}

                {/* シリーズ前書き */}
                <div className="DescriptionWrapper">
                    <label htmlFor="novels_description" className="Description">前書き</label>
                    <span className={descriptionClass}>
                        {dLength}／300文字
                        { dLength > 300 && <span className={descriptionClass}>【300文字以内で入力してください】</span> }
                    </span>
                    <textarea
                        placeholder="前書き"
                        id="novels_description"
                        name="novel_description"
                        className="SeriesForm_description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                {/* ========== */}

                <div className="ContentWrapper">
                    {!cLength && <span className={contentClass}>【入力必須】</span>}
                    <label htmlFor="novels_content" className="Content">
                        本文
                    </label>
                    <span className={contentClass}>
                        {cLength}文字
                    </span>
                    <textarea
                        placeholder="本文"
                        id="novels_content"
                        name="novel_content"
                        className="content"
                        value={content}
                        onChange={handleChange}
                    />
                </div>

                {/* 公開チェックボックス */}
                <div className="releaseWrapper">
                    <input
                        type="checkbox"
                        name="release"
                        id="release"
                        className="release"
                        checked={release}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="release" className="releaseLabel">公開する</label>
                </div>
                {/* ========== */}
                {successful && <p className="successful">{successful}</p>}
                <button type="submit" className={buttonClass}>{props.button}</button>
            </form>
        </div>
    )
}

export default SeriesForm



// import React, { useState } from 'react'
// import axios from 'axios'
// import classNames from 'classnames'

// import './NovelsForm.css'

// function NovelsForm(props) {
//     const novelTitle = props.novelTitle
//     const novelDescription = props.novelDescription
//     const novelContent = props.novelContent
//     const isMounted = props.isMounted

//     const setNovelTitle = props.setNovelTitle
//     const setNovelDescription = props.setNovelDescription
//     const setNovelContent = props.setNovelContent
//     const setIsMounted = props.setIsMounted

//     const [release, setRelease] = useState(false)
//     const [errors, setErrors] = useState("")
//     const id = props.match.params.id    // シリーズのパラメータ
//     const url = props.match.url


//     // Railに渡すデータ
//     const novels = {
//         novel: {
//             novel_title: novelTitle,
//             novel_description: novelDescription,
//             novel_content: novelContent,
//             release: release
//         }
//     }

//     // 小説編集
//     const handleNovelsEdit = (e) => {
//         e.preventDefault()
//         const redirect = (seriesId, novelsId) => {
//             props.history.push(`/novel_series/${seriesId}/novels/${novelsId}`)
//         }
//         axios.patch(`http://localhost:3001/api/v1${url}`,
//             novels,
//             { withCredentials: true }
//         )
//             .then(response => {
//                 if (response.data.status === 'ok') {
//                     redirect(id)
//                     setErrors("")
//                 } else if (response.data.status === 'unprocessable_entity') {
//                     setErrors(response.data.errors)
//                 }
//             }).catch(error => console.log(error))
//         setIsMounted(false)
//     }

//     // 小説追加
//     const handleNovelsCreate = (e) => {
//         e.preventDefault()
//         // リダイレクト
//         const redirect = (seriesId, novelsId) => {
//             props.history.push(`/novel_series/${seriesId}/novels/${novelsId}`)
//         }
//         axios.post(`http://localhost:3001/api/v1/novel_series/${id}/novels`,
//             novels,
//             { withCredentials: true }
//         )
//             .then(response => {
//                 const novels = response.data.novel_in_series
//                 const seriesId = response.data.series_id
//                 const novelsId = response.data.novels_id
//                 if (isMounted && response.data.status === 'created') {
//                     setNovelTitle(novels.novel_title)
//                     setNovelDescription(novels.novel_description)
//                     setNovelContent(novels.novel_content)
//                     redirect(seriesId, novelsId)
//                     setErrors("")
//                 } else {
//                     setErrors(response.data.errors)
//                 }
//             }).catch(error => console.log(error))
//             setIsMounted(false)
//     }

//     // 公開 or 非公開
//     const handleStatusChange = () => {
//         if (release === false) {
//             setRelease(true)
//         } else if (release === true) {
//             setRelease(false)
//         }
//     }

//     // 字数によりクラス名を変更する
//     const titleClass = classNames("ok", {
//         "over": novelTitle.length > 50,
//         "no": novelTitle.length === 0
//     })
//     const descriptionClass = classNames("ok", {
//         "over": novelDescription.length > 300
//     })
//     const contentClass = classNames("ok", {
//         "no": novelContent.length === 0
//     })
//     const buttonClass = classNames("button", {
//         "noButton": novelTitle.length > 50 ||
//             novelTitle.length === 0 ||
//             novelDescription.length > 300
//     })

//     return (
//         <div className="NovelsForm">
//             {/* ボタンの文字列によってイベントを切り替え */}
//             {
//                 props.button === "追加する" ?
//                     <h3>─小説追加用フォーム─</h3> :
//                     <h3>─小説編集用フォーム─</h3>
//             }
//             {/* イベントハンドラ */}
//             <form onSubmit={props.button === "追加する" ? handleNovelsCreate : handleNovelsEdit}>
//                 { errors ?
//                     <p className="error">{errors}</p> :
//                     null
//                 }
//                 {/* タイトル */}
//                 <div className="TitleWrapper">
//                     {novelTitle.length === 0 ?
//                         <span className={titleClass}>【入力必須】</span> :
//                         null
//                     }
//                     <label htmlFor="novel_title" className="Title">タイトル</label>
//                     <span className={titleClass}>
//                         {novelTitle.length}／50文字
//                         {novelTitle.length > 50 ?
//                             <span className={titleClass}>【50文字以内で入力してください。】</span> :
//                             null
//                         }
//                     </span>
//                 </div>
//                 <input
//                     type="text"
//                     placeholder="タイトル"
//                     id="novels_title"
//                     name="novels_title"
//                     className="novels_title"
//                     value={novelTitle}
//                     onChange={e => setNovelTitle(e.target.value)}
//                 /> <br></br>
//                 {/* ======== */}

//                 {/* 前書き */}
//                 <div className="DescriptionWrapper">
//                     <label htmlFor="novels_description" className="Description">
//                         前書き
//                     </label>
//                     <span className={descriptionClass}>
//                         {novelDescription.length}／300文字
//                         {descriptionClass === "over" ?
//                             <span className={descriptionClass}>【300文字以内で入力してください。】</span> :
//                             null
//                         }
//                     </span>
//                 </div>
//                 <textarea
//                         placeholder="前書き"
//                         name="novels_description"
//                         id="novels_description"
//                         className="novels_description"
//                         value={novelDescription}
//                         onChange={e => setNovelDescription(e.target.value)}
//                 />
//                 {/* ======== */}

//                 {/* 内容 */}
//                 <div className="ContentWrapper">
//                     {novelContent.length === 0 ?
//                         <span className={contentClass}>【入力必須】</span> :
//                         null
//                     }
//                     <label htmlFor="novels_content" className="Content">
//                         本文
//                     </label>
//                     <span className={contentClass}>
//                         {novelContent.length}文字
//                     </span>
//                 </div>
//                 <textarea
//                         placeholder="本文"
//                         name="novels_content"
//                         id="novels_content"
//                         className="novels_content"
//                         value={novelContent}
//                         onChange={e => setNovelContent(e.target.value)}
//                 />
//                 {/* ======== */}

//                 {/* 公開用チェックボックス */}
//                 <div className="releaseWrapper">
//                     <input
//                         type="checkbox"
//                         name="release"
//                         id="release"
//                         className="release"
//                         checked={release}
//                         onChange={handleStatusChange}
//                     />
//                     <label htmlFor="release" className="releaseLabel">公開する</label>
//                 </div>
//                 {/* ======== */}

//                 {/* ボタン */}
//                 <button type="submit" className={buttonClass}>{props.button}</button>
//             </form>
//         </div>
//     )
// }

// export default NovelsForm
