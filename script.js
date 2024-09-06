let books = []; 
let bookId = 1; 



function registerBook() {
    const category = document.getElementById("category").value;
    const bookname = document.getElementById("bookname").value;
    const bookprice = document.getElementById("bookprice").value;

 
    if (category && bookname && bookprice) {
      
        const isDuplicate = books.some(book => book.category === category && book.name === bookname);

        if (isDuplicate) {
            alert("같은 카테고리 안에 동일한 책이 중복되어 있습니다.");
            return;
        }

        
        const newBook = {
            id: bookId++,
            category,
            name: bookname,
            price: Number(bookprice)
        };

        
        books.push(newBook);

        
        displayBooks(books);

        
        document.querySelector('form').reset();

        alert("도서가 성공적으로 등록되었습니다.");
    } else {
       
        alert("카테고리를 선택해주세요.");
    }
}



function displayBooks(bookList) {
    const tbody = document.getElementById("book-list-tbody");
    tbody.innerHTML = ""; 

    bookList.forEach(book => {
        const tr = document.createElement("tr");

       
        tr.innerHTML = `
            <td>${book.id}</td>
            <td>${book.category}</td>
            <td>${book.name}</td>
            <td>${book.price.toLocaleString()} 원</td>
            <td><button onclick="deleteBook(${book.id})">삭제</button></td>
        `;
        tbody.appendChild(tr);
    });
}


function deleteBook(id) {
    
    books = books.filter(book => book.id !== id);
    
    displayBooks(books);
}

function sortBooks(order) {
    if (order === "ascending") {
        books.sort((a, b) => a.price - b.price);
    } else if (order === "descending") {
        books.sort((a, b) => b.price - a.price);
    }
    displayBooks(books);
}

function searchBooks(keyword) {
    if (keyword.trim() === "") {
        displayBooks(books);
        return;
    }

    const filteredBooks = books.filter(book => book.name.includes(keyword));
    displayBooks(filteredBooks);
}

document.getElementById("search-btn").addEventListener("click", function() {
    const searchKeyword = document.getElementById("search-input").value.trim();
    searchBooks(searchKeyword);
});


document.getElementById("sort-select").addEventListener("change", function() {
    const sortOrder = this.value;
    sortBooks(sortOrder);
});
