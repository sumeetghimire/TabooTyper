class TabooTyper {
    constructor(options) {
      this.selector = options.selector || "input, textarea"; // Default selector for all inputs and textareas
      this.bannedWords = options.bannedWords || {};
      this.masked = options.masked || false;
      this.init();
    }
  
    init() {
      // Allow user to pass any valid CSS selector (including IDs, classes, or element types)
      const elements = document.querySelectorAll(this.selector);
      elements.forEach((el) => {
        el.addEventListener("input", (e) => this.replaceWords(e.target));
      });
    }
  
    replaceWords(input) {
      let text = input.value;
      for (let word in this.bannedWords) {
        let regex = new RegExp(`\\b${word}\\b`, "gi");
  
        if (this.masked) {
          text = text.replace(regex, "*".repeat(word.length)); // Mask words
        } else {
          text = text.replace(regex, this.bannedWords[word]); // Replace words
        }
      }
      input.value = text;
    }
  }
  
  // Export for Node.js or Browser
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = TabooTyper;
  } else {
    window.TabooTyper = TabooTyper;
  }