import React, { useState } from 'react'
import axios from 'axios'
import classNames from 'classnames'

import './SeriesForm.css'

function SeriesForm(props) {
    const [errors, setErrors] = useState("")
    const [releaseStatus, setReleaseStatus] = useState(false)
    const seriesTitle = props.seriesTitle
    const seriesDescription = props.seriesDescription
    const setIsMounted = props.setIsMounted
    

    // Railに渡すデータ
    const series = {
        novel_series: {
            series_title: props.seriesTitle,
            series_description: props.seriesDescription,
            author: props.user.nickname,
            release: releaseStatus
        }
    }

    // リダイレクト
    const redirect = (id) => {
        props.history.push(`/novel_series/${id}`)
    }

    // シリーズ作成

    const handleSeriesCreate = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/api/v1/novel_series',
            series,
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.status === 'created') {
                    redirect(response.data.series_id)
                    setErrors("")
                } else {
                    setErrors(response.data.errors)
                }
            }).catch(error => console.log(error))
        
        setIsMounted(false)
    }


    // シリーズのパラメータ
    const id = props.match.params.id

    // シリーズ編集
    const handleSeriesEdit = (e) => {
        e.preventDefault()

        axios.patch(`http://localhost:3001/api/v1/novel_series/${id}`,
            series,
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.status === 'ok') {
                    redirect(id)
                    setErrors("")
                } else if (response.data.status === 'unprocessable_entity') {
                    setErrors(response.data.errors)
                    redirect(response.data.location)
                }
            }).catch(error => console.log(error))
        
        setIsMounted(false)
    }

    // 公開 or 非公開
    const handleStatusChange = () => {
        if (releaseStatus === false) {
            setReleaseStatus(true)
        } else if (releaseStatus === true) {
            setReleaseStatus(false)
        }
    }

    // 字数によりクラス名を変更する
    const titleClass = classNames("ok", {
        "over": seriesTitle.length > 50,
        "no": seriesTitle.length === 0
    })
    const descriptionClass = classNames("ok", {
        "over": seriesDescription.length > 300
    })
    const buttonClass = classNames("button", {
        "noButton": seriesTitle.length > 50 ||
            seriesTitle.length === 0 ||
            seriesDescription.length > 300
    })

    return (
        <div>
            <form onSubmit={props.button === "作成する" ? handleSeriesCreate : handleSeriesEdit}>
                { errors ?
                    <p className="error">{errors}</p> :
                    null
                }
                <div className="TitleWrapper">
                    <label htmlFor="series_title" className="Title">シリーズタイトル</label>
                    <span className={titleClass}>
                        {seriesTitle.length}／50文字
                        {seriesTitle.length > 50 ?
                            <p className="over">50文字以内で入力してください。</p> :
                            null
                        }
                        {seriesTitle.length === 0 ?
                            <p className="over">タイトルを入力してください。</p> :
                            null
                        }
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="シリーズタイトル"
                    id="series_title"
                    name="series_title"
                    className="series_title"
                    value={seriesTitle}
                    onChange={e => props.setSeriesTitle(e.target.value)}
                /> <br></br>

                <div className="DescriptionWrapper">
                    <label htmlFor="series_description" className="Description">あらすじ</label>
                    <span className={descriptionClass}>
                        {seriesDescription.length}／300文字
                        {descriptionClass === "over" ?
                            <p className="over">300文字以内で入力してください。</p> :
                            null
                        }
                    </span>
                    
                </div>
                <textarea
                        placeholder="あらすじ"
                        name="series_description"
                        id="series_description"
                        className="series_description"
                        value={seriesDescription}
                        onChange={e => props.setSeriesDescription(e.target.value)}
                />
                <div className="releaseWrapper">
                    <input
                        type="checkbox"
                        name="release"
                        id="release"
                        className="release"
                        checked={releaseStatus}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="release" className="releaseLabel">公開する</label>
                </div>
                
                <button type="submit" className={buttonClass}>{props.button}</button>
            </form>
        </div>
    )
}

export default SeriesForm
