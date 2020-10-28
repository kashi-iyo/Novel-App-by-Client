import {useState} from 'react'

function usePagination({pageNo, items, items2}) {
    const [currentPage, setCurrentPage] = useState(pageNo)
    const [postsPerPage] = useState(5)

    // ページネーション用の投稿データ
    // 1つのページに表示させたい記事の最後の記事のインデックス
    const indexOfLastPost = currentPage * postsPerPage
    // 1つのページに表示させたい記事の最初の記事のインデックス
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    // ユーザーのページでは同時にページネーションしたいデータを取得するので2つの変数を用意
    const currentItems = items && items.slice(indexOfFirstPost, indexOfLastPost)
    const currentItems2 = items2 && items2.slice(indexOfFirstPost, indexOfLastPost)

    return {
        postsPerPage, setCurrentPage, currentPage, currentItems, currentItems2, indexOfLastPost, indexOfFirstPost
    }
}

export default usePagination
