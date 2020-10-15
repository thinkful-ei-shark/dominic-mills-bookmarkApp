
//const { default: bookmark } = require("./bookmark")

const bookmarks = [];
let adding = false
let error = null
let filter = 0




function findById(id) {
    return this.bookmarks.find((currentItem) => currentItem.id === id);
}

const addBookmark = function(bookmark){
    this.bookmarks.push({...bookmark, expanded:false})
}

const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

  function getItemURL(id) {
    let item = this.findById(id);
    return item.url;
}

function updateFilter(num) {
    return this.filter = Number(num);
  } 

  const setError = function (error) {
    this.error = error;
  };

 export default{
    filter,
    adding,
    bookmarks,
    updateFilter,
    addBookmark,
    findAndDelete,
    setError,
    getItemURL,
    findById
 }