const API_URL = "/books";

const bookList = document.getElementById("bookList");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const addBtn = document.getElementById("addBtn");

// Load Books
async function loadBooks() {
    const response = await fetch(API_URL);
    const books = await response.json();

    bookList.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>

            <div class="actions">
                <button class="edit-btn" onclick="editBook(${book.id}, '${book.title}', '${book.author}')">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteBook(${book.id})">
                    Delete
                </button>
            </div>
        `;

        bookList.appendChild(card);
    });
}

// Add Book
addBtn.addEventListener("click", async () => {

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {
        alert("Please enter both title and author.");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author })
    });

    titleInput.value = "";
    authorInput.value = "";

    loadBooks();
});

// Delete Book
async function deleteBook(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}

// Edit Book
async function editBook(id, currentTitle, currentAuthor) {

    const title = prompt("Enter new title:", currentTitle);

    if (title === null) return;

    const author = prompt("Enter new author:", currentAuthor);

    if (author === null) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author
        })
    });

    loadBooks();
}

// Initial Load
loadBooks();