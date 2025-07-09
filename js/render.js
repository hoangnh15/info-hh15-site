// Lấy tham số URL: ?post=bai-1.md
const params = new URLSearchParams(window.location.search);
const postName = params.get("post");

if (postName) {
  fetch(`posts/${postName}`)
    .then(res => res.text())
    .then(text => {
      document.getElementById("content").innerHTML = marked.parse(text);
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "Không tìm thấy bài viết.";
    });
} else {
  document.getElementById("content").innerHTML = "Không có bài viết nào được chọn.";
}
