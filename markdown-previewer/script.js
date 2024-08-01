const defaultMarkdown = `
# Heading 1
## Heading 2
[FreeCodeCamp](https://www.freecodecamp.org)
\`Inline code\`
\`\`\`
Code block
\`\`\`
- List item 1
- List item 2
> Blockquote
![Image](https://via.placeholder.com/150)
**Bold text**
`;

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

editor.value = defaultMarkdown;
preview.innerHTML = marked.parse(defaultMarkdown);

editor.addEventListener('input', () => {
    preview.innerHTML = marked.parse(editor.value);
});
