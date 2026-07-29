const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// In-memory data
let books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear"
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Book REST API is Running...");
});


// =========================
// GET ALL BOOKS
// =========================
app.get("/books", (req, res) => {
    res.status(200).json(books);
});


// =========================
// ADD NEW BOOK
// =========================
app.post("/books", (req, res) => {

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and Author are required."
        });
    }

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully.",
        book: newBook
    });

});


// =========================
// UPDATE BOOK
// =========================
app.put("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const { title, author } = req.body;

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.status(200).json({
        message: "Book updated successfully.",
        book
    });

});


// =========================
// DELETE BOOK
// =========================
app.delete("/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully."
    });

});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
