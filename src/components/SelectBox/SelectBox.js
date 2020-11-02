import React, { useState } from 'react'
import './SelectBox.css'

function SelectBox({ menuItems, history, selectingParams, selectingValue }) {
    // ドロップダウンボックスに表示する配列
    const [items] = useState(menuItems || [])
    // ドロップダウンボックス開閉
    const [showItems, setShowItems] = useState(false)
    // ドロップダウンボックスで選択中になっているデータ
    const [selectingItem, setSelectingItem] = useState({
        params: selectingParams ? selectingParams : menuItems[0].select_params,
        value: selectingValue ? selectingValue :menuItems[0].value
    })

    const dropDown = () => {
        setShowItems(!showItems)
    }

    const selectItem = (item) => {
        history.push(`/selectedSeries/${item.select_params}`, item)
        setSelectingItem(item)
        setShowItems(false)
    }

    return (
        <div className="select-box--box">
            <div className="SelectBox">
                <div
                    className="select-box--selected-wrapper"
                    onClick={dropDown}
                >
                    {/* 選択された項目 */}
                    <div className="select-box--selected-item">
                        {selectingItem.value}
                    </div>
                    {/* 矢印 */}
                    <div className="select-box--arrow" >
                        <span className={`${showItems ? "select-box--arrow-up" : "select-box--arrow-down"} `}></span>
                    </div>
                </div>
                {/* ドロップダウンメニュー */}
                <div
                    style={{ display: showItems ? "block" : "none" }}
                    className="select-box--items"
                >
                    {
                        items.map(item =>
                            <div
                                key={item.id}
                                onClick={() => selectItem(item)}
                                className={selectingItem.params === item.select_params ? "selected" : ""}
                            >
                                {item.value}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectBox
