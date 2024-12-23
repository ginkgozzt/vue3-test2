<script setup lang="ts">
import { RouterLink, RouterView, } from 'vue-router'
import { ref, onMounted} from "vue";
import HelloWorld from './components/HelloWorld.vue'
const jsStr = ref('const a = 123')
onMounted(()=>{
  // console.log(jsStr,'jsStr---');
  

})

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/custom-component">自定义组件</RouterLink>
        <RouterLink to="/amap-component">高德地图组件</RouterLink>
        <RouterLink to="/monaco-editor">monaco-editor编辑器</RouterLink>
        <RouterLink to="/chart-view">chart-view</RouterLink>
        <RouterLink to="/dashboard">大屏</RouterLink>
        <RouterLink to="/dashboard1">大屏1</RouterLink>
      </nav>
    </div>
  </header>
  <Suspense> 
    <template #default >
      <RouterView />
    </template>
  </Suspense>
  

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--active-color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
