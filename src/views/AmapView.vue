<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import type { title } from "process";
let map: any = null;
let AMap: any = null;
let mapData = reactive({} as any)

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "217e633b7a3411e3133c0f3f7d6d9136",
  };
  AMapLoader.load({
    key: "000e3b46d26d682a1e38e9c213f6e3b5", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.Geolocation", "AMap.ToolBar", "AMap.Polyline", "AMap.Pixel", 'AMap.Marker', 'AMap.Bounds'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((val) => {
      AMap = val
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 4, // 初始化地图级别
        // center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
      console.log(map, '---map');
      setTimeout(() => {
        addPlugins()
        console.log(map, '---map---2222');
      }, 500);



    })
    .catch((e) => {
      console.log(e);
    });
});
const getData = async function () {
  const url = 'https://restapi.amap.com/v3/ip?key=66b7839d90ae71a0d4366521a5370f00'
  const res = await fetch(url)
  const data = await res.json()
  console.log(data, 'data---');

}
// 
getData()

function addPlugins() {
  var toolbar = new AMap.ToolBar();
  map.addControl(toolbar);

  console.log(toolbar, 'toolbar000');


  var Geolocation = new AMap.Geolocation();
  map.addControl(Geolocation);

  var Scale = new AMap.Scale();
  map.addControl(Scale);

}
function addPolyline() {
  if (mapData.polyline) {
    mapData.polyline.hide()
    mapData.polyline = null;
    return
  }
  // var path: Array<any> = [new AMap.LngLat(116, 39), new AMap.LngLat(116, 40), new AMap.LngLat(117, 39)] //标准写法
  var path = [[116, 39], [116, 40], [117, 39], [114, 22], [112, 23], [102, 27], [90, 35]]; //简写
  mapData.polyline = new AMap.Polyline({
    path: path,
  })
  map.add(mapData.polyline);

}
function addPixel() {
  if (mapData.marker) {
    mapData.marker.hide()
    mapData.marker = null;
    return
  }
  var offset = new AMap.Pixel(-16, -30);
  mapData.marker = new AMap.Marker({
    offset: offset,
    position: new AMap.LngLat(112, 22.5),
    icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    title: '我是标记点',
    anchor: 'bottom-center',
    label: {
      content: 'i am marker'
    }
  });
  map.add(mapData.marker);


}

function addbound() {
  if (mapData.bounds) {
    // mapData.bounds.hide()
    // mapData.bounds = null;
    // return
  }
  var southWest = new AMap.LngLat(110, 20);
  var northEast = new AMap.LngLat(120, 40);
  var bounds = new AMap.Bounds(southWest, northEast);
  map.setBounds(bounds);
  mapData.bounds = bounds
  console.log(bounds,'bounds--');
  
  

}

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <main>
    <div class="bar-btn">
      <a-button class="btn" type="primary" @click="addPolyline">切换折线</a-button>
      <a-button class="btn" type="primary" @click="addPixel">像素点/Marker</a-button>
      <a-button class="btn" type="primary" @click="addbound">矩形边界</a-button>
    </div>
    <div class="map-container" id="container">高德地图呀</div>
  </main>
</template>

<style lang="less" scoped>
.map-container {
  width: 800px;
  height: 400px;
}

.bar-btn {
  margin-bottom: 8px;

  .btn {
    margin-left: 5px;
  }
}
</style>
