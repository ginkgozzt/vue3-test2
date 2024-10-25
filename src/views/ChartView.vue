
<script setup lang="ts">
import editor from '../components/editor.vue'
import { onMounted, type PropType ,ref ,watch} from 'vue'
import type { User } from '@/types/about';
const jsonStr = ref('')
defineProps({
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
})
watch(jsonStr,(val)=>{
  console.log(val,'val====jsonStr===jsonStr');
  
})

</script>
<template>
  <div class="about-content">
    <h1>This is an 关于 内容</h1>
    <div>
      <editor v-model="jsonStr"></editor>
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
