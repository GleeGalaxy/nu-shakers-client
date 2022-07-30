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
  :root{
    --primary-clr: #fff;
    --secondary-clr: #8d191c;
    --tertiary1-clr: #71ce7e;
    --tertiary2-clr: #e98724;
    --accents:#fafafa;

    /* 9 18 27 36 45 54 63 72 */
    --fs-100: 0.5625rem;
    --fs-200: .25rem;
    --fs-300: .5rem;
    --fs-340: .8rem;
    --fs-400: 1rem;
    --fs-420: 1.2rem;
    --fs-450: 1.5rem;
    --fs-500: 2rem;
    --fs-600: 3rem;
    --fs-700: 4rem;
    --fs-800: 5rem;

    
    --mp-100: 0.5625em;
    --mp-200: .25em;
    --mp-300: .5em;
    --mp-325: .625em;
    --mp-400: 1em;
    --mp-500: 2em;
    --mp-600: 3em;
    --mp-700: 3.9375em;
    --mp-800: 4.5em;
}


  .fc-secondary{
    color: var(--secondary-clr);
  }
  .fc-tertiary1{
    color: var(--tertiary1-clr);
  }

  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  button:hover{
    cursor: pointer;
  }

  .background-div{
      position: fixed;
      bottom: -32px;
      right: 0;
      border: 132px solid transparent;
      border-right-color: #e98724;
      z-index: -10;
  }
  
  .container{
      height: 100%;
      width: 90%;
      margin: 0 auto;
  }

  .content{
    height: calc(100vh - 189px);
    overflow: auto;
    width: 100%;
  }

  .wrapper{
    height: 100%;
    width: 100%;
  }
</style>