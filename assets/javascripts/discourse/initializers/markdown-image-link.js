export default {
  name: "markdown-image-link",

  initialize() {
    // 定时尝试替换上传按钮事件，直到找到上传按钮
    const replaceUploadHandler = () => {
      const btn = document.querySelector(".d-editor-toolbar-button[data-action='upload']");
      if (!btn) {
        setTimeout(replaceUploadHandler, 500);
        return;
      }
      // 避免多次绑定
      if (btn._isReplaced) return;
      btn._isReplaced = true;

      btn.removeEventListener("click", btn._originalClick);
      btn._originalClick = btn.onclick;

      btn.onclick = (e) => {
        e.preventDefault();
        const url = prompt("请输入图片链接 URL：");
        if (url) {
          // 尝试获取当前 composer 插入文本
          try {
            const composer = window.require("discourse/models/composer").default.current();
            if (composer) {
              composer.get("model").insertText(`![描述文字](${url})`);
            } else {
              alert("未找到编辑器");
            }
          } catch {
            alert("插入图片失败，请检查控制台");
          }
        }
      };
    };

    replaceUploadHandler();
  }
};
