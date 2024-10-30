<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { onMounted, type PropType  } from 'vue'
import type { User } from '@/types/about';
const counter = useCounterStore()
const props = defineProps({
  data: {
    type: Object as PropType<User>,
    default(){
      return {
        name: 'zzt',
        age:500
      }
    }
  }
})
onMounted(()=>{
  console.log(this,'this-----');
  console.log(props.data.name,'==props===');
  
})


</script>
<template>
  <div class="about-content">
    <h1>This is an 关于 内容</h1>
    <div>
      <a-descriptions title="User Info">
        <a-descriptions-item label="UserName">{{data.name}}</a-descriptions-item>
        <a-descriptions-item label="Age">{{data.age}}</a-descriptions-item>
        <a-descriptions-item label="telPhone">{{data.telPhone}}</a-descriptions-item>
        <a-descriptions-item label="Company">{{data.company}}</a-descriptions-item>
      </a-descriptions>
      <a-statistic title="Active Users" :value="counter.doubleCount" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.about-content {
  background-color: #f9dcdc;
  padding: 20px;
  margin-top: 10px;
}
</style>
