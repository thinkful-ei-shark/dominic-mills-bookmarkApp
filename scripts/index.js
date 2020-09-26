import '../style.css';
import $ from 'jquery';
import bookmark from './bookmark.js';
import store from './store';
import api from './api';

const main = function(){
    
    api.getBookmarks()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmark.render();
    });

    bookmark.bindEventHandlers()

}
$(main)