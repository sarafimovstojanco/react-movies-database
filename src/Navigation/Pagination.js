import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadExactPage, getMovies } from '../redux/actions'
import "bulma/css/bulma.min.css"

const Pagination = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    const countPerPage = useSelector(state => state.countPerPage)
    const totalPages = useSelector(state => state.totalPages)
    const searching = useSelector(state =>state.searching)
    const themeColor = useSelector(state => state.themeColor)
    const pageNumbers = [];


    const isActive = number => {
        if (number === currentPage) {
            return 'active'
        }
    }


    for (let i=1; i<= totalPages; i++ ) {
        pageNumbers.push(i)
    }
    return (
        !searching ? <nav>
            <ul className='pagination is-small'>
                {pageNumbers.map((number, index) => (
                    <li key={number} className={'page-item ' + isActive(number, countPerPage)}>
                        <button 
                        className={`button pagination-link ${
                            currentPage === index + 1
                              ? themeColor==="red" ? "is-danger" :  themeColor==="green" ? "is-success" : "is-current"
                              : ""
                          }`}
                          aria-label="Page 1"
                          onClick={() => dispatch(getMovies(number, countPerPage))}
                          aria-current="stole"
                        >
                          {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav> : null
    )
}

export default Pagination
