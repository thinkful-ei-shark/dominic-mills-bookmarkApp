import $ from 'jquery';
import api from './api';
import store from './store';

/**********************************************TEMPLATES**********************************************/

const bookmarkStartTemplate = function () {
    const filteredBookmarks = store.bookmarks.filter(x => {return x.rating >= store.filter})
    let html = `<div class="container">
                <h1>My Bookmarks</h1>
                <section>
                    <button class="button" id="new-bookmark">New</button>
                    <select class="button" id="filter-bookmark" placeholder="Filter">
                        <option value="" disabled="" selected="" hidden="">Filter By</option>
                        <option value="1">1</option>
                        <option value="2">2 </option>
                        <option value="3">3 </option>
                        <option value="4">4 </option>
                        <option value="5">5 </option>
                    </select>
                </section>
                <div>
                ${generateBookmarkElementString(filteredBookmarks)}
                </div>
            </div>
            `
            
    return html
}
//${generateBookmarkElementString(store.bookmarks)}
const generateBookmarkElements = (bookmark) => {

    return   `<div class='bookmarks' data-item-id="${bookmark.id}">
                <div id="expand">

                    ${bookmark.title}      |     Rating: ${bookmark.rating}
                </div>
                <section class="biggysmalls hidden">
                <div>
                    <button class="smallbutton" id="visit-bookmark">Visit</button>
                </div>
                <div>
                    ${bookmark.desc}
                </div>
                <div>
                    <button class="smallbutton" id="delete-bookmark">Delete</button>
                </div>
                </section>
            </div>`;


           
            
  };
 
  const generateBookmarkElementString = (bookmarkList) => {
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElements(bookmark));
    return bookmarks.join('');
  };

const addBookmarkTemplate = function () {
    let html = `<div class="container">
    <h1>My Bookmarks</h1>
    <form class="form" id="create-new-bookmark" action="text" required>Add Your Bookmark
        <section><input type="text" class="text-box" id="bookmark-url" value="https://www.google.com/"></section>
        <div>
        <select class="button" id="bookmark-rating" required>
            <option value="" disabled="" selected="" hidden="">Rating</option>
            <option value="1">1 </option>
            <option value="2">2 </option>
            <option value="3">3 </option>
            <option value="4">4 </option>
            <option value="5">5 </option>
        </div>
        <section><input type="text" class="text-box" id="bookmark-title" placeholder="Bookmark Title" required></section>
        <section><textarea type="text" class="text-box" id="bookmark-description" placeholder="Description " required></textarea>
        </section>
        <button class="button" id="cancel-bookmark">Cancel</button>
        <button class="button" id="enter-bookmark">Enter</button>
    </form>
</div>`
return html
}




/**********************************************EVENT LISTENERS**********************************************/





const handleNewBookmarkClicked = function () {
    $('main').on('click', '#new-bookmark', e => {
        e.preventDefault;
        store.adding = true

        render()
    })

}

const handleCancelButtonClicked = function () {
    $('main').on('click', '#cancel-bookmark', e => {
        e.preventDefault;
        store.adding = false
        render()
    })
}

const getBookmarkIdFromElement = function (item) {
    return $(item)
      .closest('.bookmarks')
      .data('item-id');
  };

const handleBookmarkDeleteClicked = function(){
    $('main').on('click', '#delete-bookmark', e => {
        e.preventDefault
        const id = getBookmarkIdFromElement(e.currentTarget);
        api.deleteBookmark(id)
        .then(res => res.json())
        .then(() => {
            store.findAndDelete(id);
            render();
        })
    })
}

function handleVisitSiteClicked() {
    $('main').on('click', '#visit-bookmark', e => {
      e.preventDefault();
      const id = getBookmarkIdFromElement(e.currentTarget);
      const url = store.getItemURL(id);
      window.open(`${url}`);
    });
  }

const handleNewSubmit = function () {
    $('main').on('submit', '#create-new-bookmark', e => {
        e.preventDefault();
        let formTitle = $(e.currentTarget).find('#bookmark-title').val();
        let formRating = $(e.currentTarget).find('#bookmark-rating').val();
        let formUrl = $(e.currentTarget).find('#bookmark-url').val();
        let formDescription = $(e.currentTarget).find('#bookmark-description').val();
        let bookmark = { title: formTitle, rating: formRating, url: formUrl, desc: formDescription}
        api.createBookmark(bookmark)
            .then(res => res.json())
            .then((bookmark) => {
                store.addBookmark(bookmark)
                store.adding = false
                render()
            })
    })
}

const handleExpandClicked = function(){
    $('main').on('click', "#expand", function() {
        $(this).parent().find('.biggysmalls').toggleClass('hidden')
      });
}

function filterBookmarks() {
    $("main").on("change", "#filter-bookmark", function () {
        const value = $(this).val();
      store.updateFilter(value);
      render();
    });
  }

/**********************************************RENDER FUNCTION**********************************************/



const render = function () {



    let html = bookmarkStartTemplate()
    if (store.adding === true) {
        html = addBookmarkTemplate()
    }

    $('#main').html(html)
}


/**********************************************EXPORT**********************************************/



const bindEventHandlers = function () {
    handleNewBookmarkClicked()
    handleCancelButtonClicked()
    handleNewSubmit()
    handleBookmarkDeleteClicked()
    handleVisitSiteClicked()
    handleExpandClicked()
    filterBookmarks()
}

export default {
    bookmarkStartTemplate,
    bindEventHandlers,
    render
}