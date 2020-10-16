import {useState} from 'react'

function usePagination({pageNo, items}) {
    const [currentPage] = useState(pageNo)
    const [postsPerPage] = useState(5)

    // ページネーション用の投稿データ
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost)

    return {
        postsPerPage, currentPage, currentItems
    }
}

export default usePagination
