import React from 'react'
import './UsersPaginate.css'

function UsersPagination({ postsPerPage, totalPosts, currentPage, setCurrentPage }) {
    const activePage = parseInt(currentPage)
    const makePaginationHref = () => {
        const totalPages = []

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            totalPages.push(i)
        }

        const pageNumbers = []
        var startIndex, endIndex
        let pages = totalPages.length

        if (pages <= 5) {
            startIndex = 1
            endIndex = pages
        } else {
            if (activePage <= 3) {
                startIndex = 1
                endIndex = 5
            } else if (activePage + 1 >= pages) {
                startIndex = pages - 3
                endIndex = pages
            } else {
                startIndex = activePage - 2
                endIndex = activePage + 2
            }
        }

        if (startIndex > 1) {
            pageNumbers.push(
                <button type="submit"
                    onClick={() =>  setCurrentPage(activePage - 1) }
                    key="1"
                >
                    <span>&lt;前へ</span>
                </button>
            )
        }

        for (let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(
                <button key={i}
                    type="submit"
                    onClick={() => setCurrentPage(i)}
                    className={activePage === i ? "active" : ""}
                >
                    <span>{i}</span>
                </button>
            )
        }

        if (endIndex < pages) {
            pageNumbers.push(
                <button key={pages}
                    type="submit"
                    onClick={() => setCurrentPage(activePage + 1)}
                >
                    <span>次へ&gt;</span>
                </button>
            )
        }
        return pageNumbers
    }


    return (
        <nav>
            <h3 className="paginationWrapper">{makePaginationHref()}</h3>
        </nav>
    )
}

export default UsersPagination
