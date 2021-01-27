import React, { useState } from 'react'
import {connect} from 'react-redux'
import "bulma/css/bulma.min.css"

const Pagination = (props) => {
    const pageNumbers = [];
    const [activePage, setActivePage] = useState(1)

    // const onPageClick = number => {
    //     props.paginate(number)
    //     setActivePage(number)
    // }

    const isActive = number => {
        if (number === activePage) {
            return 'active'
        }
    }

    for (let i=1; i<= props.totalPages; i++ ) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map((number, index) => (
                    <li key={number} className={'page-item ' + isActive(number)}>
                        <button 
                        className={`button pagination-link ${
                            props.currentPage === index + 1
                              ? "is-current"
                              : ""
                          }`}
                          aria-label="Page 1"
                          onClick={() => props.loadExactPage(index + 1)}
                          aria-current="page"
                        >
                          {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        countPerPage: state.countPerPage,
        currentCount: state.currentCount,
        currentPage: state.currentPage,
        filteredPages: state.filteredPages,
        totalCount: state.totalCount,
        totalPages: state.totalPages,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        loadExactPage: (index) => 
        {console.log(index)
            dispatch({
                type: "LOAD_EXACT_PAGE",
                payload: index
            })    
    }}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
