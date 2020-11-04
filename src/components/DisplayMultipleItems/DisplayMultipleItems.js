import React from 'react'
import './DisplayMultipleItems.css'
import usePagination from '../../CustomHooks/Pagination/usePagination'
import Pagination from '../Pagination/Pagination'
import SelectBox from '../SelectBox/SelectBox'
import SeriesWrapper from '../Series/SeriesWrapper/SeriesWrapper'
import Spinner from '../Spinner/Spinner'
import UsersPagination from '../Pagination/UsersPagination'

// 複数のオブジェクトを取得して表示
// Home.js/にて呼び出し
function DisplayMultipleItems({ items, pageNumber, caption, record, isLoading, paginateHref, userSeries, dataType, history, selectingValue, selectingParams, userId }) {

    // ページネーション用のデータ
    const { postsPerPage, currentPage, setCurrentPage, currentItems, indexOfLastPost, indexOfFirstPost } = usePagination({
        pageNumber: pageNumber,
        items: items,
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                < div className="display-multiple-items">
                    {caption && <h2 className="display-multiple-items--caption">{caption}</h2>}
                    <div className="display-multiple-items--record-wrapper">
                        <p className="display-multiple-items--record-numbers">{record}（ {indexOfFirstPost + 1} - {items.length < postsPerPage ? items.length : indexOfLastPost}件 ）</p>
                        {/* ドロップダウンBOXユーザーページでは表示しない */}
                        {!userSeries && <SelectBox
                            dataType={dataType}
                            history={history}
                            selectingValue={selectingValue}
                            selectingParams={selectingParams}
                            menuItems={[
                                { id: 1, value: "新着順", select_params: "new" },
                                { id: 2, value: "投稿が古い順", select_params: "old" },
                                { id: 3, value: "お気に入りが多い順", select_params: "more_favo" },
                                { id: 4, value: "お気に入りが少ない順", select_params: "less_favo" },
                                { id: 5, value: "コメントが多い順", select_params: "more_comment" },
                                { id: 6, value: "コメントが少ない順", select_params: "less_comment" },
                            ]}
                        />}
                    </div>
                    {userSeries ?
                        <UsersPagination
                            postsPerPage={postsPerPage}
                            totalPosts={items.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        /> :
                        <Pagination
                            postsPerPage={postsPerPage}  //1Pに表示する記事の数
                            totalPosts={items.length} // 記事数
                            currentPage={currentPage}
                            paginateHref={paginateHref}
                        />
                    }
                    <div className="display-multiple-items--items-wrapper">
                        <SeriesWrapper items={currentItems} userId={userId} />
                    </div>
                    {userSeries ?
                        <UsersPagination
                            postsPerPage={postsPerPage}
                            totalPosts={items.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        /> :
                        <Pagination
                            postsPerPage={postsPerPage}  //1Pに表示する記事の数
                            totalPosts={items.length} // 記事数
                            currentPage={currentPage}
                            paginateHref={paginateHref}
                        />
                    }
                </div>
            }
        </React.Fragment>
    )
}

export default DisplayMultipleItems
