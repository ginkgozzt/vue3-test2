<script setup lang="ts">
import * as echarts from "echarts";
import editor from "../components/editor.vue";
import { onMounted, ref, watch ,nextTick,reactive,computed } from "vue";
let chart = ref(null),
  myChart: any = null,
  split = ref(0.5);

const jsonStr = ref(`
  let obj= {
    name: 'sss',
    age: 18,
    heigth: '180cm',
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
   }
   return {
    ...obj
   }
 `);
const obj = {
  name:'ss',
  age: ref(18),
  count: ref(1)
}
const proxyObj = reactive(obj)
console.log(proxyObj.name,'proxyObj--obj',obj.name);
proxyObj.name = 'abc'
console.log(proxyObj.name,'proxyObj--obj--11',obj.name);
obj.name = 'yyyy'
console.log(proxyObj.name,'proxyObj--obj--22',obj.name);
let name = '33';
({name} = obj)
console.log(name,'dddd');
const computedProperty =computed(()=>{
  return new Date().getTime() + '--computedProperty---' + split.value
})



onMounted(() => {
  init();
});
watch(jsonStr, () => {
  setOption();
});
const setOption = async () => {
  let valueStr = jsonStr.value;
  let data = {},
    code = 1;
  try {
    const Fn = Function(`return async function(){${valueStr}}`);
    data = await Fn()();
    console.log(data, "data");
     } catch (err) {
    console.log(err, "setOption===err");
    code = 0;
  }
  if (myChart && code && data && data instanceof Object) {
    myChart.clear()
    myChart.setOption(data,{notMerge : true});
    await nextTick()
    setTimeout(() => {
      myChart.resize();
    }, 20);
  }
};
const init = () => {
  if (!myChart) {
    myChart = echarts.init(chart.value);
  }
  setOption();
};
const chageSplit = ()=>{
  let {count} = obj
  count.value ++;
 
  myChart.resize();
}
const getTime =()=>{
  console.log(222,'getTime');
  return new Date().getTime() + '---method---'+ split.value
}

</script>
<template>
  <div class="chart-content">
    <h1>This is an chart</h1>
    <span>age: {{ obj.age }}</span>
    <div>computedProperty: {{ computedProperty }}</div>
    <div>getTime: {{ getTime() }}</div>
    <a-card class="card-wrap">
      <Split v-model="split" @on-moving="chageSplit">
        <template #left>
          <editor v-model="jsonStr"></editor>
        </template>
        <template #right>
          <div ref="chart" class="container"></div>
        </template>
      </Split>
    </a-card>
  </div>
  <div>
    more root div
  </div>
</template>

<style lang="less" scoped>
.chart-content {
  background-color: #d8eabe;
  padding: 20px;
  margin-top: 10px;
}
.card-wrap {
  height: 400px;
  /deep/ .ant-card-body {
    height: 100%;
  }
}
.container {
  height: 100%;
  width: 100%;
}
</style>
