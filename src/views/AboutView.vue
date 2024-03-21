<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import AboutContent from '../components/AboutContent.vue'
const counter = useCounterStore()
const value = ref('')
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    <div>
      <span>计数:</span>
      <span>{{ counter.count }}</span>
      <a-button type="primary" @click="counter.increment">增加计算DDD</a-button>
      <a-button type="primary" @click="counter.decrement">减少计算DDDD</a-button>
    </div>
    <AboutContent />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    margin: auto;
    padding-top: 100px;
  }
}
</style>
