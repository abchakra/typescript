// ----------------------------------------------------------
// <copyright file="Hello.ts">
//      Copyright (c) Abhishek Chakraborty. All rights reserved.
// </copyright>
// ----------------------------------------------------------
var Author = /** @class */ (function () {
    function Author(name) {
        this.name = name;
    }
    return Author;
}());
var author = new Author("Dan Brown");
console.log(author.name);
