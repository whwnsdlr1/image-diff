<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
  font-family: 'Roboto';
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
</style>