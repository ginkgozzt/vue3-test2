<script setup lang="ts">
import * as monaco from "monaco-editor";
import { reactive, ref, onMounted, watch } from "vue";
let editor: any = null;
let editorContainer: any = ref(null);
const model = defineModel();
let editorValue = ref("");
watch(
  model,
  () => {
    if (editor && editorValue.value !== model.value) {
      editor.setValue(model.value);
    }
  },
  {
    immediate: true,
  }
);

const initData = () => {
  if (!editor) {
    editor = monaco.editor.create(editorContainer.value, {
      language: "javascript",
      folding: true,
      wordWrap: "on",
      automaticLayout: true,
      lineNumbersMinChars: 2,
      scrollBeyondLastLine: false,
      foldingStrategy: "indentation", // 控制折叠的策略
      showFoldingControls: "always", // 控制折叠控件何时可见
      tabSize: 2,
      detectIndentation: false,
      scrollbar: {
        vertical: "auto",
        verticalScrollbarSize: 10,
        verticalSliderSize: 10,
      },
    });
    editor.setValue(model.value);
    const getValue = () => {
      let value = editor.getValue();
      model.value = value;
      editorValue.value = value;
    };
    editor.onDidChangeModelContent(() => {
      getValue();
    });
    editor.onDidBlurEditorText(() => {
      getValue();
    });
    editor.onDidChangeModelDecorations(() => {
      // getHeight();
    });
  }
};
const getHeight = () =>{
  // 获取滚动的高度
  const h = editor.getScrollHeight();
  console.log(h,'h=====');
  // 获取内容高度
  const h1 = editor.getContentHeight();
  console.log(h1,'h1====');
  
}
onMounted(() => {
  initData();
});
</script>
<template>
  <div class="editor">
    <a-space wrap>
      <a-button type="primary" @click="getHeight">获取编辑器的高度</a-button>
    </a-space>
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
  height: 100%;
  min-height: 300px;
  border: 1px solid #ccc;
}
</style>
