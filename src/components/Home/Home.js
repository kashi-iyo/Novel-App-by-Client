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
    const { postsPerPage, currentPage, currentItems } = usePagination({
        pageNo: seriesNo,
        items: items
    })
    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="home">
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={items.length} // 記事数
                        currentPage={currentPage}
                        paginateHref={`/Series/`}
                    />
                    <p className="Caption">╋作品一覧（全 {count} 件）</p>
                    <div className="homeWrapper">
                        {currentItems &&
                            currentItems.map(post => (
                            <SeriesWrapper key={post.id} items={post} />
                            ))
                        }
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
