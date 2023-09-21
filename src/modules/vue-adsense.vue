<template lang="pug">
ins.adsbygoogle(
  :data-ad-client="adClient"
  :data-ad-slot="adSlot"
  :data-ad-format="adFormat"
  :style="adStyle")
v-btn(@click="height()") 調整
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      required: true
    },
    adSlot: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      required: false,
      default: 'auto'
    },
    adStyle: {
      type: String,
      required: false,
      default: 'display: block'
    }
  },
  mounted() {
    1 + 1
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    let wrap = document.getElementsByClassName('v-application__wrap')[0]
    let cssText = wrap.style.cssText
    wrap.style.cssText = cssText + 'min-height: 100vh!important'
  },
  methods: {
    height() {
      let wrap = document.getElementsByClassName('v-application__wrap')[0]
      let cssText = wrap.style.cssText
      wrap.style.cssText = cssText + 'min-height: 100vh!important'
    }
  }
}
</script>
