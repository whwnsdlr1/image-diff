<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  /* font-family: 'Roboto'; */
  font-family: 'Manjari', sans-serif;
}
div {
  position: relative;
  box-sizing: border-box;
}
@keyframes spinner {
  to {transform: rotate(360deg);}
}
.spinner {
  position:relative;
  width: 100%;
  height: 100%;
}
.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #999;
  border-top-color: #000;
  animation: spinner .6s linear infinite;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>