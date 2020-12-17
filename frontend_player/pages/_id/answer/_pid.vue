<template>
  <div class="answer">
    <Header />
    <div class="wrapper">
      <div class="questionarea-wrapper">
        <a :href="backLink" style="margin: 16px 0 16px 0">← 問題一覧に戻る</a>
        <h2>{{ question.title }}</h2>
        <b-badge variant="info">{{ question.level[0] }}</b-badge>
        <div v-html="question.body" style="margin: 16px 0 16px 0"></div>
      </div>
      <div class="editorarea-wrapper">
        <monaco-editor
          class="editorarea"
          v-model="code"
          :language="language"
          ref="editor"
          :theme="theme"
        ></monaco-editor>
        <div class="controller">
          <b-form inline style="margin-top: 16px; margin-bottom: 16px">
            <label for="select-language" style="margin-right: 16px"
              >言語を選択:
            </label>
            <b-form-select
              id="select-language"
              v-model="language"
              :options="language_list"
            ></b-form-select>
          </b-form>
          <b-button block variant="primary" @click="submit()">提出</b-button>
        </div>
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
      language: 'c',
      language_list: [
        { value: 'c', text: 'C' },
        { value: 'cpp', text: 'C++' },
        { value: 'javascript', text: 'JavaScript(Node.js)' },
        { value: 'python', text: 'Python3' },
        { value: 'php', text: 'PHP' },
        { value: 'ruby', text: 'Ruby' },
      ],
    }
  },
  computed: {
    backLink() {
      return `/${this.$route.params.id}/questions/`
    },
  },
  async asyncData({ app, params }) {
    const question = await app.$axios.$get(
      `https://ishc2020.microcms.io/api/v1/questions/${params.pid}`,
      {
        headers: {
          'X-API-KEY': 'd4810716-5137-44cc-83a4-44f1bc6da121',
        },
      }
    )
    return { question }
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
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
}
.editorarea {
  flex: 6;
  width: 100%;
}

.controller {
  flex: 1;
}

div > pre {
  background-color: #f9f9f9;
  padding: 16px;
}
</style>