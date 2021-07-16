import React, { Component } from 'react';

class Shelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                {this.props.Books.length > 0 ? (
                    <ol className="books-grid">
                        {this.props.Books}
                    </ol>
                ) : (
                    <span>No book in {this.props.title}</span>
                )}
                    
                </div>
            </div>
        );
    }
}

export default Shelf;
