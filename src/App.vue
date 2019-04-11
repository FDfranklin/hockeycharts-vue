<template>
  <div id="app">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  }
}
</script>

<style lang="scss">
#app {
  color: #2c3e50;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  max-width: 72rem;
  margin: 0 auto;
  padding-right: .9375rem;
  padding-left: .9375rem;
  text-align: center;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: #fafbfc;
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>
