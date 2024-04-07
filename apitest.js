
 function joke() {
    fetch('https://n53y4kdb3nbhxuz7uovq5jj7li0uqgsf.lambda-url.us-east-1.on.aws/?api=joke')
        .then(response => response.json())
        .then(data => {
            const joke = document.getElementById('jokedisplay');
            joke.innerHTML = `
            <div class="joke-card">
            <p>${data.joke}</p>
            </div>
`;
        });
}



quoteOftheday();
function quoteOftheday() {
   
    fetch('https://n53y4kdb3nbhxuz7uovq5jj7li0uqgsf.lambda-url.us-east-1.on.aws/?api=qotd')
        .then(response => response.json())
        .then(data => {
            const quoteModal = document.getElementById('quoteModal');
            const modalBody = quoteModal.querySelector('.modal-body');
            modalBody.innerHTML = `
            <p>"${data.quote.body}"</p>
            <p class="text-muted">- ${data.quote.author}</p>`;
           

        });
   
}
document.getElementById('show').addEventListener('click', quoteOftheday);

function displayBooks() {
    fetch('https://n53y4kdb3nbhxuz7uovq5jj7li0uqgsf.lambda-url.us-east-1.on.aws/?api=lotr')
        .then(response => response.json())
        .then(data => {
            const books = data.docs;
            const booksList = document.getElementById('BooksList');
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = book.name;
                booksList.appendChild(li);
            });
        });
}


joke();

displayBooks();


document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
  
    // Event listener for a button click
    document.getElementById('fetchPostsBtn').addEventListener('click', function() {
      fetch('/.netlify/functions/fetchPost')
        .then(response => response.json())
        .then(data => {
          postsContainer.innerHTML = ''; // Clear previous content
  
          data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.body}</p>
              <p>Reactions: ${post.reactions}</p>
              <hr>
            `;
            postsContainer.appendChild(postElement);
          });
        })
        .catch(error => {
          postsContainer.innerHTML = '<p>Error fetching posts</p>';
          console.error('Error fetching posts:', error);
        });
    });
  });
  