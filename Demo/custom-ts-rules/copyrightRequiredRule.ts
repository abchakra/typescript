import * as fs from "fs";
import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "File should contains header: ";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NoFileWithoutCopyrightHeader(sourceFile, this.getOptions())
    );
  }
}

class NoFileWithoutCopyrightHeader extends Lint.RuleWalker {
  public visitSourceFile(sourceFile: ts.SourceFile) {
    if (sourceFile && sourceFile.fileName && sourceFile.getFullText()) {
      let copyrightHeaderTemplate = fs
        .readFileSync("./custom-ts-rules/copyrightHeader.txt")
        .toString();

      // Create the copyright header based on the file name
      copyrightHeaderTemplate = copyrightHeaderTemplate.replace(
        "{fileName}",
        sourceFile.fileName.substring(sourceFile.fileName.lastIndexOf("/") + 1)
      );

      // Check if file is starting with it - if so, no need to continue
      if (sourceFile.getFullText().startsWith(copyrightHeaderTemplate)) {
        return super.visitSourceFile(sourceFile);
      }

      // Create a fixer for this failure
      const fix = new Lint.Replacement(0, 0, copyrightHeaderTemplate + "\n\n");

      this.addFailure(
        this.createFailure(
          0,
          1,
          Rule.FAILURE_STRING + "\n" + copyrightHeaderTemplate,
          fix
        )
      );

      return super.visitSourceFile(sourceFile);
    }

    super.visitSourceFile(sourceFile);
  }
}
