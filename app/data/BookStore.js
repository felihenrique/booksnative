import { AsyncStorage } from "react-native"
import ee from "event-emitter";

class BookStore {
    emitter = ee()

    async init() {
        try {
            var result = await AsyncStorage.getItem('books');
            if(result != undefined) {
                this._books = JSON.parse(result);
            }
            else {
                this._books = [];
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    get books() {
        return this._books;
    }

    async addBook(book) {
        if(this.books.find(b => b.id == book.id)) {
            return;
        }
        this._books.push(book);
        await this.saveBooks();
        this.emitter.emit('books_change');
    }

    async deleteBook(book) {
        this._books = this._books.filter(b => b.id != book.id);
        await this.saveBooks();
        this.emitter.emit('books_change');
    }

    async saveBooks() {
        try {
            await AsyncStorage.setItem('books', JSON.stringify(this._books));
        }
        catch(e) {
            console.log(e);
        }
    }

    async clearBooks() {
        try {
            await AsyncStorage.setItem('books', '');
            this._books = [];
        }
        catch(e) {
            console.log(e);
        }
    }
}

var bookStore = new BookStore();
export default bookStore;