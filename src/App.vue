<template>
  <comp-header></comp-header>
  <div class="content">
    <router-view></router-view>
  </div>
  <comp-footer></comp-footer>
</template>

<script>
  import Header from './components/header-footer/header.vue';
  import Footer from './components/header-footer/footer.vue';

  export default{
    components:{
      'comp-header':Header,
      'comp-footer':Footer,
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  html{
    font-size: 9px;
  }

  button:hover{
    cursor: pointer;
  }
  
  .container{
      height: 100%;
      width: 85%;
      margin: 0 auto;
  }

  .content{
    min-height: calc(100vh - 189px);
    height: fit-content;
    width: 100%;
  }
</style>