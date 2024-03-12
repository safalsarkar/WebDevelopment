
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

function fetchNetlifyFunction() {
    fetch("/.netlify/functions/hello")
        .then(response => response.json())
        .then(data => {
            const outputDiv = document.getElementById("hello-output");
            outputDiv.textContent = data.message;
        })
        .catch(error => console.error("Error fetching Netlify Function output:", error));
}

fetchNetlifyFunction();

joke();

displayBooks();