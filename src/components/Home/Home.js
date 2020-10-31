import React from 'react'

import './Home.css'
import SeriesWrapper from '../Series/SeriesWrapper/SeriesWrapper'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import Spinner from '../Spinner/Spinner'
import Pagination from '../Pagination/Pagination'
import usePagination from '../../CustomHooks/Pagination/usePagination'

// ホームページ
function Home({ seriesNo }) {
    const { items, count, isLoading } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001',
    })

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems, indexOfLastPost, indexOfFirstPost } = usePagination({
        pageNo: seriesNo,
        items: items
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="home">
                    <p className="TagHasUsers__Count">全 {count} 件（ {indexOfFirstPost + 1} - {items.length < 5 ? items.length : indexOfLastPost}件 ）</p>
                    <h2 className="Caption">╋ 作品一覧 </h2>
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={items.length} // 記事数
                        currentPage={currentPage}
                        paginateHref={`/Series/`}
                    />
                    <div className="homeWrapper">
                        <SeriesWrapper items={currentItems} />
                    </div>
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={items.length} // 記事数
                        currentPage={currentPage}
                        paginateHref={`/Series/`}
                    />
                </div>
            }
        </React.Fragment>
    )
}

export default Home
