import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadExactPage } from '../redux/actions'

const Pagination = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    const totalPages = useSelector(state => state.totalPages)
    const searching = useSelector(state => state.searching)
    const pageNumbers = [];

    const isActive = number => {
        if (number === currentPage) {
            return 'active'
        }
    }

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }
    return (
        !searching ? <nav>
            <ul className='pagination is-small'>
                {pageNumbers.map((number, index) => (
                    <li key={number} className={'page-item ' + isActive(number)}>
                        <button
                            className={`button pagination-link ${currentPage === index + 1
                                    ? "is-current"
                                    : ""
                                }`}
                            aria-label="Page 1"
                            onClick={() => dispatch(loadExactPage(index + 1))}
                            aria-current="page"
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </nav> : null
    )
}

export default Pagination
