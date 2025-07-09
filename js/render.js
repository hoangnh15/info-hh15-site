const params = new URLSearchParams(window.location.search);
const postName = params.get("post");

if (postName) {
  fetch(`posts/${postName}`)
    .then(res => res.text())
    .then(text => {
      const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (match) {
        const yaml = match[1];
        const content = match[2];

        let title = "Bài viết";
        let date = "";

        yaml.split('\n').forEach(line => {
          const [key, ...rest] = line.split(':');
          if (key && rest.length) {
            const value = rest.join(':').trim();
            if (key.trim() === "title") title = value;
            if (key.trim() === "date") date = value;
          }
        });

        document.getElementById("content").innerHTML = `
          <h2>${title}</h2>
          <p><em>${date}</em></p>
          ${marked.parse(content)}
        `;
      } else {
        document.getElementById("content").innerHTML = marked.parse(text);
      }
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "Không tìm thấy bài viết.";
    });
} else {
  document.getElementById("content").innerHTML = "Không có bài viết nào được chọn.";
}
