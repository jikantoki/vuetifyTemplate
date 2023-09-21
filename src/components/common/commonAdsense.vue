<template lang="pug">
.ad(v-html="googleAdsense")
</template>

<script>
export default {
  data() {
    return {
      googleAdsense: ''
    }
  },
  mounted() {
    fetch('/adsense/GoogleAdsense.html').then((res) => {
      res.text().then((html) => {
        this.googleAdsense = html
      })
    })
  }
}
</script>
