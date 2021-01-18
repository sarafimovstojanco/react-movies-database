import React, {useState, useEffect} from 'react'
import axios from 'axios'


const FilterSelector = (props) => {
    let [newData, setNewData] = useState(props.movies)
    const [filterState, setFilterState] = useState(null)
  
  const load = _ => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
      setNewData(response.data)
    })
  }
  useEffect(() => {
    load();
  }, [])
    const onFilterHandler = (event) => {
        
        setFilterState(event)
        if(event === 'Not Completed') {
            return (props.setMovies(newData.filter(entry => Object.values(entry).includes(false))))
        }
        else if(event === 'Completed') {
            return (props.setMovies(newData.filter(entry => Object.values(entry).includes(true))))
        }
        else {
            return props.setMovies(newData)
        }
    }
    return(
<th  onChange={event => onFilterHandler(event.target.value)}>
            <select  >
            <option >
                Clear Filter
           </option>
           <option>
                Completed
           </option>
           <option>
                Not Completed
           </option>
            </select>
        </th>
    )
        
}

export default FilterSelector