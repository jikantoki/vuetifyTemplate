<template lang="pug">
.home
  //img(alt="Vue logo" src="@/assets/logo.png")
  HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import mixins from '@/functions/mixins'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mixins: [mixins]
}
</script>
