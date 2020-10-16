import React from 'react'
import usePagination from '../../../CustomHooks/Pagination/usePagination'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import Pagination from '../../Pagination/Pagination'
import SeriesWrapper from '../../Series/SeriesWrapper/SeriesWrapper'
import './TagHasSeries.css'

// タグに関連付けられたシリーズの表示
function TagHasSeries({ tagId, pageNo }) {
    // タグに関連づけされたデータを取得
    const { items, count, tags } = useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_tags/${tagId}`
    })

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems } = usePagination({
        pageNo: pageNo,
        items: items
    })

    return (
        <div className="TagsSeries">
            <Pagination
                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                totalPosts={items.length} // 記事数
                currentPage={currentPage}
                paginateHref={`/search_series_by_tag/${tagId}/page/`}
            />
            <p className="Caption TagsSeries__caption">╋ {tags.novel_tag_name} の作品一覧（全 {count} 件）</p>
            <div className="homeWrapper">
                {
                    Object.keys(currentItems).map(key => (
                    <SeriesWrapper key={key} items={currentItems[key]} />
                    ))
                }
            </div>
            <Pagination
                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                totalPosts={items.length} // 記事数
                currentPage={currentPage}
                paginateHref={`/search_series_by_tag/${tagId}/page/`}
            />
        </div>
    )
}

export default TagHasSeries
