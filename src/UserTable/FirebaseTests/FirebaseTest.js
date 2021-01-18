import React, {useState} from 'react'
import axios from 'axios'
import firebase from 'firebase';


const FirebaseTest = () => {
  const [loadData, setLoadData] = useState()
//   Set the configuration for your app
//   TODO: Replace with your project's config object
  var config = {
    apiKey: "apiKey",
    authDomain: "react-movies-database.firebaseapp.com",
    databaseURL: "https://react-movies-database-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
//   firebase.initializeApp(config);
//   const newArray=[...movies, {userId: localStorage.userId}]
//   console.log(newArray)
//   axios.post('https://react-movies-database-default-rtdb.firebaseio.com/.json?auth=' + localStorage.token, newArray)
  
//   Get a reference to the database service
console.log(localStorage.userId)

  const loadTable = () => {
    const queryParams = '?auth=' + localStorage.token 
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' +'Table'+ '.json')
          .then(response => {
            const fetchedData = [];
            for (let key in response.data) {
                fetchedData.push({
                    ...response.data[key],
                    id: key
                })
          }
          setLoadData(fetchedData)
        })
          .catch(error => console.log(error))
          }
    console.log(loadData)
  function writeUserData(userId, name, email, imageUrl) {
      let path = localStorage.userId
    firebase.database().ref(path + "/").set(loadData);
  }
    return(
        <div>
            <button 
            onClick={writeUserData}
            >Save Table
            </button>
            <button 
            onClick={loadTable}
            >Load Table
            </button>
        </div>
    )
}

export default FirebaseTest;