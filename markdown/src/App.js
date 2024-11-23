import { useState } from "react";
import { marked } from "marked";
const App = () => {
  const [text, setText] = useState(`
  # H1
  ## H2
  [title](https://www.example.com)
  \`code\`
  \`\`\`
  {
  "firstName": "John",
    "lastName": "Smith",
    "age": 25
  }
  \`\`\`
  - First item
  - Second item
  - Third item
  > backquote
  ![alt text](image.jpg)
  **bold text**
  `);
  marked.setOptions({
    breaks: true,
  });
  return (
    <div>
      <textarea
        id="editor"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}></textarea>
      <div
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(text),
        }}></div>
    </div>
  );
};

export default App;
