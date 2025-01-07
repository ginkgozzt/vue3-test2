<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { onMounted, type PropType  } from 'vue'
import type { User } from '@/types/about';
const model = defineModel()
const counter = useCounterStore()
// 运行时的声明：
// const props = defineProps({
//   data: {
//     type: Object as PropType<User>,
//     default(){
//       return {
//         name: 'zzt',
//         age:500
//       }
//     }
//   }
// })
const props = defineProps<{data:User}>()
// 需要用解构的方式来解决默认赋值的问题
onMounted(()=>{
  console.log(this,'this-----');
  console.log(props.data.name,'==props===');
  
  
})
const emit = defineEmits(['change'])

const test = ()=>{
  emit('change')
}



</script>
<template>
  <div class="about-content">
    <h1>This is an 关于 内容</h1>
    <div> 里面的的值{{ model }}</div>
    <Input v-model="model" placeholder="Enter something..." style="width: 300px" />
    <div>
      <div @click="test">点击测试</div>
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
