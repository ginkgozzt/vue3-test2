<script setup lang="ts">
import * as monaco from "monaco-editor";
import { reactive, ref, onMounted } from "vue";

let editor: any = null;

let editorContainer: any = ref(null);

const initData = () => {
  console.log(
    editorContainer,
    editorContainer.value,
    "editorContainer===",
    editorContainer._value
  );
  if (!editor) {
    editor = monaco.editor.createDiffEditor(editorContainer.value, {
      folding: true,
      readOnly: true,
      wordWrap: "on",
      diffWordWrap: "on",
      automaticLayout: true,
      enableSplitViewResizing: true,
      lineNumbersMinChars: 2,
      scrollBeyondLastLine: false,
      renderSideBySide: true,
      maxFileSize: 1024, // 默认50MB
      onlyShowAccessibleDiffViewer: false, // 只显示差异的文本
      foldingStrategy: "indentation", // 控制折叠的策略
      showFoldingControls: "always", // 控制折叠控件何时可见
      renderOverviewRuler: false,
      maxComputationTime: 10240,
      scrollbar: {
        vertical: "auto",
        verticalScrollbarSize: 10,
        verticalSliderSize: 10,
      },
      hideUnchangedRegions: {
        enabled: true,
        contextLineCount: 2,
        // minimumLineCount: 2
      },
    });
  }
  console.log(editor, "editor");

  // editor.updateOptions({ renderSideBySide: true });
  let { original, modified } = config;
  original = original || "";
  modified = modified || "";
  editor.setModel({
    original: monaco.editor.createModel(original, "json"),
    modified: monaco.editor.createModel(modified, "json"),
  });
};
onMounted(() => {
  setTimeout(() => {
    initData();
  }, 500);
});
</script>
<template>
  <div class="editor">
    <div ref="editorContainer" class="editorContainer"></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    margin: auto;
  }
}
.editorContainer {
  height: 300px;
  border: 1px solid #ccc;
}
</style>
