import React, { useEffect, useState } from 'react';

function TableData(props) {
    let [moviesData, setMoviesData]=useState([])
    useEffect(() => {
        setMoviesData(props.movies)
    }, [props.movies])
    return moviesData.slice(props.indexOfFirstPost, props.indexOfLastPost).map((st, index) => {
        const { releaseDate, imdbRating, originalTitle, year, completed } = st
        return (
            <tr key={releaseDate}>
                <td>{index + 1}</td>
                <td>{imdbRating}</td>
                <td>{originalTitle}</td>
                <td>{year}</td>
                <td>{completed ? "✔️" : "❌"}</td>
            </tr>)
    })
}



export default TableData 