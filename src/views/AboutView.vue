<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import AboutContent from '../components/AboutContent.vue'
const counter = useCounterStore()
const value = ref('')
const data = reactive({
   name: '小祝子',
   age: 18, 
   telPhone: '123333',
   company:"广州xxx有限公司"
}) // 同名传参设置
</script>
<template>
  <div class="about">
    <h1>This is an about page({{ value }})</h1>
    <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    <div>
      <span>计数:</span>
      <span>{{ counter.count }}</span>
      <a-button type="primary" @click="counter.increment">增加计算DDD</a-button>
      <a-button type="primary" @click="counter.decrement">减少计算DDDD</a-button>
    </div>
    <AboutContent  />

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    margin: auto;
  }
}
</style>
