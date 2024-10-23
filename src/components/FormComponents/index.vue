<script setup lang="ts">
import { inject, reactive } from "vue";
import { getResourcesData,getTemplateData } from "../../api/resources";
console.log(inject("request"), "request---66666-this666");
// 表单的数据
const formData = reactive({
  template_branch_id: "",
});
let templateList:Array<any> = [],aosResourcesData:any = {}
const getData  = async() =>{
  templateList = await getTemplateData();
  aosResourcesData = await getResourcesData();
}
getData()
</script>
<template>
  <h1>自定义组件</h1>
    <div>
      <span>选择模板</span>
      <Select v-model="formData.template_branch_id" style="width: 200px">
        <Option
          v-for="item in templateList"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
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
