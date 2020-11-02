import {useState} from 'react'

function usePagination({pageNumber, perPage, items }) {
    const [currentPage, setCurrentPage] = useState(pageNumber)
    const [postsPerPage] = useState(perPage ? perPage : 7)

    // ページネーション用の投稿データ
    // 1つのページに表示させたい記事の最後の記事のインデックス
    const indexOfLastPost = currentPage * postsPerPage
    // 1つのページに表示させたい記事の最初の記事のインデックス
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost)

    return {
        postsPerPage, setCurrentPage, currentPage, currentItems, indexOfLastPost, indexOfFirstPost
    }
}

export default usePagination
