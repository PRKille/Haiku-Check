export class Haiku {
  constructor() {
    this.poem = "";
    this.lines = [];
    this.vowels = [];
    this.lineOne = [];
    this.lineTwo = [];
    this.lineThree = [];
    this.syllables = [];
    this.haiku = false;
  }

  addPoem(poem) {
    this.poem = poem;
  }

  lineCount() {
    this.lines = this.poem.split("\n");
    if (this.lines.length != 3) {
      return false;
    }
  }

  wordSplit() {
    const [firstLine, secondLine, thirdLine] = this.lines;
    this.lineOne = firstLine.split(" ");
    this.lineTwo = secondLine.split(" ");
    this.lineThree = thirdLine.split(" ");
  }

  vowelCount() {
    for (let i=0; i < 3; i++) {
      let charsInLine = this.lines[i].split("");
      let alphVowels = ["a", "i", "e", "o", "u", "y"];
      let that = this;
      charsInLine.forEach(function(char) {
        if (alphVowels.includes(char)) {
          that.vowels.push(char);
        }
      });
      this.syllables.push(this.vowels.length);
      this.vowels.splice(0);
    }
  }

  silentVowelRemover() {
    let that = this;
    this.lineOne.forEach(function(word, i) {
      if (word != "the" && word != "she" && word.length != 2 && word.charAt(word.length-1) === "e") {
        that.lineOne[i] = word.slice(0, word.length-1);
      }
      if (word.charAt(0) === "y") {
        that.lineOne[i] = word.slice(1);
      }
    });
    this.lineTwo.forEach(function(word, i) {
      if (word != "the" && word != "she" && word.length != 2 && word.charAt(word.length-1) === "e") {
        that.lineTwo[i] = word.slice(0, word.length-1);        
      }
      if (word.charAt(0) === "y") {
        that.lineTwo[i] = word.slice(1);
      }
    });
    this.lineThree.forEach(function(word, i) {
      if (word != "the" && word != "she" && word.length != 2 && word.charAt(word.length-1) === "e") {
        that.lineThree[i] = word.slice(0, word.length-1);
      }
      if (word.charAt(0) === "y") {
        that.lineThree[i] = word.slice(1);
      }
    });
    this.lines[0] = this.lineOne.join(" ");
    this.lines[1] = this.lineTwo.join(" ");
    this.lines[2] = this.lineThree.join(" ");
  }

  doubleVowelRemover() {
    let regVowels = ["a", "i", "e", "o", "u"];
    let charsInPoem = this.poem.split("");
    for (let i=0; i<charsInPoem.length; i++) {
      if (regVowels.includes(charsInPoem[i]) && charsInPoem[i+1] === charsInPoem[i]) {
        charsInPoem.splice(i+1, 1, "x");
      }
      if (regVowels.includes(charsInPoem[i]) && charsInPoem[i+1] === "y") {
        charsInPoem.splice(i+1, 1, "x");
      }
      if (charsInPoem[i+1] === "o" && (charsInPoem[i] === "e" || charsInPoem[i] === "i")) {
        charsInPoem.splice(i+1, 0, "x");
      }
      if (charsInPoem[i] === "a" && (charsInPoem[i+1] === "i" || charsInPoem[i+1] === "u")) {
        charsInPoem.splice(i+1, 1, "x");
      }
      if (charsInPoem[i] === "e" && (charsInPoem[i+1] === "a" || charsInPoem[i+1] === "i")) {
        charsInPoem.splice(i+1, 1, "x");
      }
      if (charsInPoem[i+1] === "e" && (charsInPoem[i] === "i" || charsInPoem[i] === "u")) {
        charsInPoem.splice(i+1, 1, "x");
      }
      if (charsInPoem[i] === "o" && (charsInPoem[i+1] === "e" || charsInPoem[i+1] === "i" || charsInPoem[i+1] === "u")) {
        charsInPoem.splice(i+1, 1, "x");
      }
      this.poem = charsInPoem.join("");
    }
  }

  wordReplacer() {
    const onesToReplace = [/ueue/g];
    for (var i=0; i<onesToReplace.length; i++) {
      this.poem = this.poem.replace(onesToReplace[i], "xox");
    }
    const twosToReplace = [/creat/g, /poem/g, /hiat/g, /viol/g, /poeia/g, /trophe/g];
    for (i=0; i<twosToReplace.length; i++) {
      this.poem = this.poem.replace(twosToReplace[i], "xoxox");
    }
    const fourToReplace = [/cooperat/g, /hyperbole/g]
    for (i=0; i<fourToReplace.length; i++) {
      this.poem = this.poem.replace(fourToReplace[i], "xoxoxoxox");
    }
  }

  checkHaiku() {
    if (this.syllables[0] === 5 && this.syllables[1] === 7 && this.syllables[2] === 5) {
      this.haiku = true;
    }
  }
}