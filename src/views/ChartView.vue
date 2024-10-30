<script setup lang="ts">
import * as echarts from "echarts";
import editor from "../components/editor.vue";
import { onMounted, ref, watch ,nextTick } from "vue";
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
  myChart.resize();
}
</script>
<template>
  <div class="chart-content">
    <h1>This is an chart</h1>
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
