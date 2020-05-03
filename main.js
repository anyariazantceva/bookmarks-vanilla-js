const form = document.querySelector('.form');
let bookmarks = [];
let id = 0;
const clearFields = () => {
    document.querySelector('.form__title').value = '';
    document.querySelector('.form__url').value = '';
}

const addToLocalStorage = (bookmark) => {
    if(localStorage.getItem('bookmarks') == null){
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}
const addSiteToBookmarks = (e) => {
    e.preventDefault();
    const title = document.querySelector('.form__title').value;
    const url = document.querySelector('.form__url').value;
    id++;
    let bookmark = {
        id,
        title,
        url
    }
    addToLocalStorage(bookmark);
    clearFields();
}

const renderBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let list = document.querySelector('.bookmarks__list');
    list.innerHTML = '';
    bookmarks.forEach((item, index) => {
        const url = `https://${item.url}`;
        list.innerHTML += `<li class="bookmarks__item bookmark">
                <div class="bookmark__icon"></div>
                <div class="bookmark__title"><a target="_blank" class="bookmark__link" href="${url}">${item.title}</a><i onclick="deleteBookmark(${item.id})" class="bookmark__delete fa fa-times"></i></div>
            </li>`
    })
}

const deleteBookmark = (id) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let newMarks = bookmarks.filter((item) => {
        return item.id !== id;
    })
    localStorage.setItem('bookmarks', JSON.stringify(newMarks));
    renderBookmarks();
}
let item;
let startX;
let startY;
let isDown = false;

const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    item = e.target.closest('.bookmarks__item');
    startX = parseInt(e.clientX);
    startY = parseInt(e.clientY);
    isDown=true;
}

function moveAt(pageX, pageY, elem) {
    if (!item) return;
    item.style.transform = `translate(${pageX - startX}px, ${pageY - startY}px)`;
}

function handleMouseUp(e){
    e.preventDefault();
    e.stopPropagation();
    isDown=false;
    item = null;
}

function handleMouseMove(e){
    if(!isDown){return;}
    e.preventDefault();
    e.stopPropagation();
    moveAt(e.clientX, e.clientY, item)
}
const bookmarksContainer = document.querySelector('.bookmarks');
bookmarksContainer.addEventListener('mousemove', (e) => {
    handleMouseMove(e);
})

bookmarksContainer.addEventListener('mousedown', (e) => {
    handleMouseDown(e);
})

bookmarksContainer.addEventListener('mouseup', (e) => {
    handleMouseUp(e);
});

form.addEventListener('submit', (e) => {
    addSiteToBookmarks(e);
    renderBookmarks();
});

renderBookmarks();