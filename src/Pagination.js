import React, { useState } from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState(1)

    const onPageClick = number => {
        paginate(number)
        setActivePage(number)
    }

    const isActive = number => {
        if (number === activePage) {
            return 'active'
        }
    }

    for (let i=1; i<= Math.ceil(totalPosts / postsPerPage); i++ ) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={'page-item ' + isActive(number)}>
                        <a onClick={() =>onPageClick(number)} href='1#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;