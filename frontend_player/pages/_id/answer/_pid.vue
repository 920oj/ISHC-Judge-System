<template>
  <div class="answer">
    <Header />
    <div class="wrapper">
      <div class="questionarea-wrapper">
        <a href="">← 問題一覧に戻る</a>
        <h2>問題</h2>
        <code>hogehoge</code>
        <pre>alert("hoge")</pre>
      </div>
      <div class="editorarea-wrapper">
        <monaco-editor
          class="editorarea"
          v-model="code"
          language="javascript"
          ref="editor"
          :theme="theme"
        ></monaco-editor>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import MonacoEditor from 'vue-monaco'
export default {
  components: {
    Header,
    MonacoEditor,
  },
  data() {
    return {
      code: 'aaaaaaaaaaaaaaaaaaaaa',
      theme: 'vs-dark',
    }
  },
}
</script>

<style>
.wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.questionarea-wrapper {
  flex: 1;
  padding: 16px;
}

.editorarea-wrapper {
  flex: 1;
  width: 100%;
  height: 80vh;
}
.editorarea {
  width: 100%;
  height: 100%;
}
</style>