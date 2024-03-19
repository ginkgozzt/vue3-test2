<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <span>计数:</span>
      <span>{{ counter.count }}</span>
      <a-button type="primary" @click="counter.increment">增加计算</a-button>
      <a-button type="primary" @click="counter.decrement">减少计算</a-button>
    </div>
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
