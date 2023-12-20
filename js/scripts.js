/*
Descrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.

Non è necessario creare date casuali
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)

Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": "https://unsplash.it/300/300?image=21"
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//creo un array per salvare gli ID dei post ai quali hai messo like
const likedPosts = [];

//creo una costante e la collego all'html
const feedContainer = document.getElementById('feed-container');

//per ogni oggetto dell'array
posts.forEach(post => {
    
  //creo un elemento e le do una classe
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  //stampo nell'html
  postElement.innerHTML = `
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                <img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">                    
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${post.author.name}</div>
                <div class="post-meta__time">${post.created}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${post.content}</div>
    <div class="post__image">
        <img src="${post.media}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid="${post.id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
            </div>
        </div> 
    </div>            
  `;

  //appendo il post al contenitore del feed
  feedContainer.appendChild(postElement);

  //creo una costante e la unisco al bottone nell'html
  const likeButton = postElement.querySelector('.js-like-button');

  //aggiungo un gestore di eventi al pulsante like
  likeButton.addEventListener('click', () => handleLikeButtonClick(post.id));
});

//creo una funzione per gestire il like e il suo counter
function handleLikeButtonClick(postId) {

    //creo una costante e la unisco al counter dei like
    const likeCounter = document.getElementById(`like-counter-${postId}`);

    //creo una costante e la unisco al bottone dei like
    const likeButton = document.querySelector(`[data-postid="${postId}"]`);

    //per evitare al like di riportare la pagina in alto
    event.preventDefault();

    //se c'è il like lo tolgo
    if (likedPosts.includes(postId)) {
        unlikePost(postId, likeButton, likeCounter)
    
    //se non c'è lo metto
    } else {
        likePost(postId, likeButton, likeCounter)

    }

}

//funzione per gestire il like
function likePost(postId, likeButton, likeCounter) {

    //aggiungo l'ID del post all'array likedPosts
    likedPosts.push(postId);

    //aggiungo la classe al pulsante like
    likeButton.classList.add('like-button--liked');

    //aumento il numero dei like
    likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
}

//funzione per togliere il like se c'è già
function unlikePost(postId, likeButton, likeCounter) {

    //trovo l'indice dell'elemento con postId nell'array likedPosts
    const indexToRemove = likedPosts.indexOf(postId);

    //se l'elemento è presente, lo rimuovo dall'array
    if (indexToRemove !== -1) {
        likedPosts.splice(indexToRemove, 1);
    }

    //rimuovo la classe dal pulsante like
    likeButton.classList.remove('like-button--liked');

    //rimuovo il numero aumentato del like
    likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
}