import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './book';
import Search from './search';
import Shelf from './shelf';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';

const Shelves = [
    { title: 'Currently reading', value: 'currentlyReading' },
    { title: 'Want to read', value: 'wantToRead' },
    { title: 'Read', value: 'read' },
];

class BooksApp extends React.Component {
    state = {
        books: [],
        showMessage: false
    };

    getAllBooks() {
        BooksAPI.getAll().then((response) => {
            this.setState({ books: response });
        });
    }
    componentDidMount() {
        this.getAllBooks();
    }
    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.getAllBooks();
            this.showMessage();
            sleep(2500).then(() => {
                // Do something after the sleep!
                this.hideMessage();
            });
        });
    };
    showMessage = () => {
        this.setState({
            showMessage: true
        });
    };
    hideMessage = () => {
        this.setState({
            showMessage: false
        });
    };
    render() {
        if (this.state.showMessage) {
            return (
                <div className="messageBox">
                       Shelves updated successfully.
                </div>
            );
        }
        
        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads APP</h1>
                            </div>
                            <svg
                                viewBox="0 0 200 100"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                height="50px"
                                width="100%"
                            >
                                <polygon
                                    points="0,0 200,0 100,100 0,0"
                                    fill="#757575"
                                />
                            </svg>
                            <div className="list-books-content">
                                <div>
                                    {Shelves.map((f) => {
                                        return (
                                            <Shelf
                                                key={f.title}
                                                title={f.title}
                                                Books={this.state.books.filter((book)=>book.shelf === f.value).map(
                                                    (e) => {
                                                        return (
                                                            <Book
                                                                key={e.title}
                                                                Book={e}
                                                                updateShelf={
                                                                    this
                                                                        .updateShelf
                                                                }
                                                                title={
                                                                    e.title
                                                                }
                                                                image={
                                                                    e
                                                                        .imageLinks
                                                                        .thumbnail
                                                                }
                                                                autor={
                                                                    e.authors
                                                                }
                                                                value={
                                                                    e.shelf
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search" id="button">
                                    Add book
                                </Link>
                            </div>
                        </div>
                    )}
                />
                <Route
                    exact
                    path="/search"
                    render={() => (
                        <Search
                            updateShelf={this.updateShelf}
                            booksFromMainPage={this.state.books}
                        />
                    )}
                />
            </div>
        );
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default BooksApp;
