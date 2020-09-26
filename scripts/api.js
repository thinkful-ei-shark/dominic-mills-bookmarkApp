import $ from 'jquery';

const BASE_URL = `https://thinkful-list-api.herokuapp.com/dominic/bookmarks`

const getBookmarks = function(){
    return fetch(`${BASE_URL}`)
}

const createBookmark = function(bookmark){
  const newBookmark = JSON.stringify(bookmark)
  return fetch(`${BASE_URL}`, {method:'POST', headers:{'Content-Type':'application/json'}, body:newBookmark})
}

let deleteBookmark = function(id){
  return fetch(`${BASE_URL}/${id}`, {method:'DELETE'})
}
/*
const apiCall = (options = {method: 'GET'}) => {
  RETURN fetch(`${BASE_URL}`, options)
    .then((response) => {
      if(response.status >= 400 && response.status < 600){
        throw new Error("Bad response from server")
      }
      return response
    })
    .catch((error) =>{
      throw new TypeError('Error', error)

    })
}
*/


export default{
  getBookmarks,
  createBookmark,
  deleteBookmark
  }