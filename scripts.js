// Simulación de datos de artículos
let articles = [
    { title: "Artículo 1", content: "Contenido del artículo 1", category: "Ciencia", tags: ["Investigación", "Avances"], comments: [], rating: 0, ratingCount: 0 },
    { title: "Artículo 2", content: "Contenido del artículo 2", category: "Tecnología", tags: ["Innovación", "Software"], comments: [], rating: 0, ratingCount: 0 },
    { title: "Artículo 3", content: "Contenido del artículo 3", category: "Historia", tags: ["Cultura", "Educación"], comments: [], rating: 0, ratingCount: 0 },
];

// Función para cargar artículos
function loadArticles() {
    const articlesContainer = document.getElementById('articlesContainer');
    articlesContainer.innerHTML = '';
    articles.forEach((article, index) => {
        const averageRating = (article.ratingCount > 0) ? (article.rating / article.ratingCount).toFixed(1) : 0;
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>
            <div class="category">Categoría: ${article.category}</div>
            <div class="tags">Etiquetas: ${article.tags.join(', ')}</div>
            <div class="rating">
                Calificación: ${averageRating} / 5
                <span onclick="rateArticle(${index}, 1)">&#9733;</span>
                <span onclick="rateArticle(${index}, 2)">&#9733;</span>
                <span onclick="rateArticle(${index}, 3)">&#9733;</span>
                <span onclick="rateArticle(${index}, 4)">&#9733;</span>
                <span onclick="rateArticle(${index}, 5)">&#9733;</span>
            </div>
            <div class="comments">
                <h3>Comentarios</h3>
                <div id="comments-${index}">
                    ${article.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
                </div>
                <form class="comment-form" onsubmit="addComment(event, ${index})">
                    <input type="text" placeholder="Tu nombre" required>
                    <textarea rows="2" placeholder="Tu comentario" required></textarea>
                    <button type="submit">Agregar Comentario</button>
                </form>
            </div>`;
        articlesContainer.appendChild(articleElement);
    });
}

// Función de búsqueda de artículos
function searchArticles(query) {
    const articlesContainer = document.getElementById('articlesContainer');
    articlesContainer.innerHTML = '';
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
    );
    filteredArticles.forEach((article, index) => {
        const averageRating = (article.ratingCount > 0) ? (article.rating / article.ratingCount).toFixed(1) : 0;
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>
            <div class="category">Categoría: ${article.category}</div>
            <div class="tags">Etiquetas: ${article.tags.join(', ')}</div>
            <div class="rating">
                Calificación: ${averageRating} / 5
                <span onclick="rateArticle(${index}, 1)">&#9733;</span>
                <span onclick="rateArticle(${index}, 2)">&#9733;</span>
                <span onclick="rateArticle(${index}, 3)">&#9733;</span>
                <span onclick="rateArticle(${index}, 4)">&#9733;</span>
                <span onclick="rateArticle(${index}, 5)">&#9733;</span>
            </div>
            <div class="comments">
                <h3>Comentarios</h3>
                <div id="comments-${index}">
                    ${article.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
                </div>
                <form class="comment-form" onsubmit="addComment(event, ${index})">
                    <input type="text" placeholder="Tu nombre" required>
                    <textarea rows="2" placeholder="Tu comentario" required></textarea>
                    <button type="submit">Agregar Comentario</button>
                </form>
            </div>`;
        articlesContainer.appendChild(articleElement);
    });
}

// Función para agregar un nuevo artículo
function addNewArticle(event) {
    event.preventDefault();
    const newTitle = document.getElementById('newTitle').value;
    const newContent = document.getElementById('newContent').value;
    const newCategory = document.getElementById('newCategory').value;
    const newTags = document.getElementById('newTags').value.split(',').map(tag => tag.trim());
    articles.push({ title: newTitle, content: newContent, category: newCategory, tags: newTags, comments: [], rating: 0, ratingCount: 0 });
    loadArticles();
    document.getElementById('newArticleForm').reset();
}

// Función para agregar un comentario
function addComment(event, articleIndex) {
    event.preventDefault();
    const commentForm = event.target;
    const name = commentForm.querySelector('input').value;
    const commentText = commentForm.querySelector('textarea').value;
    const comment = `${name}: ${commentText}`;
    articles[articleIndex].comments.push(comment);
    loadArticles();
}

// Función para calificar un artículo
function rateArticle(articleIndex, rating) {
    articles[articleIndex].rating += rating;
    articles[articleIndex].ratingCount += 1;
    loadArticles();
}

// Event listener para el formulario de nuevo artículo
document.getElementById('newArticleForm').addEventListener('submit', addNewArticle);

// Event listener para el campo de búsqueda
document.getElementById('searchInput').addEventListener('input', (event) => {
    searchArticles(event.target.value);
});

// Cargar artículos al inicio
loadArticles();

