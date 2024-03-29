"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs = require("fs");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoFileWithoutCopyrightHeader(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "File should contains header: ";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoFileWithoutCopyrightHeader = /** @class */ (function (_super) {
    __extends(NoFileWithoutCopyrightHeader, _super);
    function NoFileWithoutCopyrightHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoFileWithoutCopyrightHeader.prototype.visitSourceFile = function (sourceFile) {
        if (sourceFile && sourceFile.fileName && sourceFile.getFullText()) {
            var copyrightHeaderTemplate = fs
                .readFileSync("./custom-ts-rules/copyrightHeader.txt")
                .toString();
            // Create the copyright header based on the file name
            copyrightHeaderTemplate = copyrightHeaderTemplate.replace("{fileName}", sourceFile.fileName.substring(sourceFile.fileName.lastIndexOf("/") + 1));
            // Check if file is starting with it - if so, no need to continue
            if (sourceFile.getFullText().startsWith(copyrightHeaderTemplate)) {
                return _super.prototype.visitSourceFile.call(this, sourceFile);
            }
            // Create a fixer for this failure
            var fix = new Lint.Replacement(0, 0, copyrightHeaderTemplate + "\n\n");
            this.addFailure(this.createFailure(0, 1, Rule.FAILURE_STRING + "\n" + copyrightHeaderTemplate, fix));
            return _super.prototype.visitSourceFile.call(this, sourceFile);
        }
        _super.prototype.visitSourceFile.call(this, sourceFile);
    };
    return NoFileWithoutCopyrightHeader;
}(Lint.RuleWalker));
