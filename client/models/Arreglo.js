export default class Arreglo {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    getTitle(){
        return this.title;
    }

    setTitle(newTitle){
        this.title = newTitle;
    }

    getAuthor(){
        return this.author;
    }

    setAuthor(newAuthor){
        this.author = newAuthor;
    }

    getIsbn(){
        return this.isbn;
    }

    setIsbn(newIsbn){
        this.isbn = newIsbn;
    }
}
