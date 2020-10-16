import React from 'react'
import './Pagination.css'

function Pagination({ postsPerPage, totalPosts, currentPage, paginateHref }) {
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
                startIndex = pages - 4
                endIndex = pages
            } else {
                startIndex = activePage - 2
                endIndex = activePage + 2
            }
        }

        if (startIndex > 1) {
            pageNumbers.push(
                <a href={paginateHref + (activePage - 1)}
                    key="1"
                >
                    <span>&lt;前へ</span>
                </a>
            )
        }

        for (let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(
                <a key={i}
                    href={paginateHref + i}
                    className={activePage === i ? "active" : ""}
                >
                    <span>{i}</span>
                </a>
            )
        }

        if (endIndex < pages) {
            pageNumbers.push(
                <a key={pages}
                    href={paginateHref + (activePage + 1)}
                >
                    <span>次へ&gt;</span>
                </a>
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

export default Pagination
