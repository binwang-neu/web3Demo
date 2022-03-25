<template>
  <div id="app">
    <!-- header container -->
    <header-com></header-com>
    <!-- graph container -->
    <editor-com></editor-com>
  </div>
</template>

<script>
import EditorCom from "./components/EditorCom";
import HeaderCom from "./common/HeaderCom";
export default {
  name: "App",
  components: {
    EditorCom,
    HeaderCom,
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  border: 0;
  padding: 0;
}
p {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.icon {
  width: 1.15em;
  height: 1.15em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
span {
  font-family: "Times New Roman", Georgia, Serif;
}
</style>
