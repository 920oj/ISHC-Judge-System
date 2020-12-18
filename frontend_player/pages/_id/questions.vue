<template>
  <div class="questions">
    <Header />
    <b-container>
      <b-row v-for="(item, i) in displayQuestions" :key="i">
        <b-col v-for="(elem, j) in item" :key="j">
          <b-card
            :header="elem.level[0]"
            footer="未回答"
            :title="elem.title"
            style="margin: 16px 0 16px 0"
          >
            <b-button href="">解答する</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header,
  },
  computed: {
    displayQuestions() {
      return arrayChunk(this.questions.contents, 2)
    },
  },
  async asyncData({ app, params }) {
    const questions = await app.$axios.$get(
      `https://ishc2020.microcms.io/api/v1/questions`,
      {
        headers: {
          'X-API-KEY': 'd4810716-5137-44cc-83a4-44f1bc6da121',
        },
      }
    )
    console.log(questions)
    return { questions }
  },
}

const arrayChunk = ([...array], size = 1) => {
  return array.reduce(
    (acc, value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  )
}
</script>

<style>
</style>