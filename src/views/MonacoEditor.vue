<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, onMounted } from "vue";
let editor: any = null;
let config: any = {
  original: `{
    test:77,
    name:'sss',
    w:'sss',
    erwer:'avdfvfd',
    asdf: {
      as: 'sasdvfda',
      asvf: "davfdbfgb",
      asdddf: "asfdabgfnhgnhgnjhmjm"
    },
    dddd:'fgdgnhgnhg',
    dsbg:'dnghnhgnththy',
    test22:'-------dddddddddddddddd---------',
    sbgfhghyq:'ghhnfhmgg',
    sdavfd555q:'gnhgnhgnhmjh',
    53trhtq:'dfnhnhg',
    sdg5t33q:'fbgfbgfn',
    abc4:'333999999',
    sbgfhghy:'ghhnfhmgg',
    sdavfd555:'gnhgnhgnhmjh',
    53trht:'dfnhnhg',
    sdg5t33:'fbgfbgfn',
    abc:'333',
    ss:'4356566576u476i78vcxcv vb bvs就不可能减肥减m',
    hh:'dbavjdfbjkdnfbkjfgb你重新记不记得吧和手机壳发的v开电风扇不回复dbsh查看看安康vnbv客服大家女的吧减肥充满女MC女下次开心女乘客就你就不能就发个红包给发',
    aad:'dfsbbfgngdhnhdgnjhm',
    sffbdsbg:'sgfbgfgfb',
    66888: 9000,
    ss666: 555
  }`,
  modified: `{
    name:'sss',
    w:'sss',
    erwer:'avdfvfd',
    asdf: {
      as: 'sasdvfda',
      asvf: "davfdbfgb",
      asdddf: "asfdabgfnhgnhgnjhmjm"
    },
    dddd:'fgdgnhgnhg',
    dsbg:'dnghnhgnththy',
    sbgfhghyq:'ghhnfhmgg',
    sdavfd555q:'gnhgnhgnhmjh',
    53trhtq:'dfnhnhg',
    sdg5t33q:'fbgfbgfn',
    abc4:'333999999',
    sbgfhghy:'ghhnfhmgg',
    sdavfd555:'gnhgnhgnhmjh',
    53trht:'dfnhnhg',
    sdg5t33:'fbgfbgfn',
    abc:'333',
    sbgfhghy:'ghhnfhmgg',
    sdavfd555:'gnhgnhgnhmjh',
    53trht:'dfnhnhg',
    sdg5t33:'fbgfbgfn',
    abc:'33388888888888888sladvkfdvkjdfanvj dn jkfn jkfgn lgjk ngfk nkgh lnghkl nkjhgn jkhfn jhnj nh',
    ss:'4356566576u476i78vcxcv vb bvs就不可能减肥减m',
    age:12,
    ss666: 555
  }`,
};
console.log(monaco, "monaco");
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
