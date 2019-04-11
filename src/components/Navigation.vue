<template>
  <div>
    <nav>
      <router-link v-for="routes in links"
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/'
        },
        {
          id: 1,
          text: 'Player Compare',
          page: '/player-compare'
        }
      ]
    }
  }
}
</script>
<style>
</style>
