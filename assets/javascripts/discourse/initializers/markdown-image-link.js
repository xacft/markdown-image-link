export default {
  name: "markdown-image-link",

  initialize() {
    const api = window.Discourse.__container__.lookup("service:plugin-api");
    api.modifyClass("component:composer-upload-button", {
      click() {
        const url = prompt("请输入图片链接 URL：");
        if (url) {
          const markdown = `![描述文字](${url})`;
          this.get("composer").get("model").insertText(markdown);
        }
      }
    });
  }
};
