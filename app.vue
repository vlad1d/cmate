<template>
  <div>
    <Main @create-shape="newShape" @change-color="changeShapeColor" @delete-shape="removeShape" />
  </div>
</template>

<script>
import Main from './Main.vue';
import './public/jscript/main.js';

export default {
  components: {
    Main
  }
}
</script>

<style>
@import './public/css/app.css';
</style>