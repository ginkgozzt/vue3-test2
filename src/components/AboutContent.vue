<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>
<template>
  <div class="about-content">
    <h1>This is an 关于 内容</h1>
    <div>
      <a-statistic title="Active Users" :value="counter.doubleCount"  />
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about-content {
    padding-top: 50px;
  }
}
</style>
