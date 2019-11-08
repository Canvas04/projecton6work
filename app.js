console.log('worked');

const posts = [];
let nextId = 1;
const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.className = 'form-inline';

formEl.innerHTML = `
<input type="text" class="form mb-2 mr-sm-2" data-id="url">
<input type="text" class="form mb-2 mr-sm-2" data-id="text">
<button class="btn btn-light mb-2" data-action="add">Ок</button>
`;
const urlEl = formEl.querySelector('[data-id=url]');
const textEl = formEl.querySelector('[data-id=text]')
formEl.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const url = urlEl.value;
    const text = textEl.value;
    const post = {
        id: nextId++,
        url,
        text,
        likes: 0,
    };
    posts.push(post);
    rebuildList(postsEl, posts)
    urlEl.value = '';
    textEl.value = '';
    urlEl.focus();
});

rootEl.appendChild(formEl);

const postsEl = document.createElement('ul');
postsEl.className = 'list-group';

rootEl.appendChild(postsEl);

function rebuildList(containerEl, items) {
    for (const child of Array.from(containerEl.children)) {
        containerEl.removeChild(child);
    }
    for (const item of items) {
        const el = document.createElement('li');
        el.className = 'list-group-item';
        el.dataset.id = 'post-${item.id}';//каким образом мы обращаемся к id
        el.innerHTML = `
        <img src="${item.url}" class="rounded" width="100"  height="100">
        ${item.text}
        <span class="badge badge-secondary">${item.likes}</span>
        <button type="button" class="btn btn-primary btn-sm" data-action="like">like</button>
        <button type="button" class="btn btn-primary btn-sm" data-action="dislike">dislike</button>
        `;

        el.querySelector('[data-action=like]').addEventListener('click', function (event) {
            item.likes++;
            item.sort(function (a, b) {
                return a.likes - b.likes;
            });
            rebuildList(containerEl, items)
        });
        el.querySelector('[data-action=dislike]').addEventListener('click', function (event) {
            item.likes--;
            item.sort(function (a, b) {
                return a.likes - b.likes;
            });
            rebuildList(containerEl, items)
        });
        containerEl.insertBefore(el , containerEl.firstElementChild);
    };


};