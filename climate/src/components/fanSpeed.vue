<script>
export default {
  data() {
    return {
      speed: 0
    }
  },
  methods: {
    up() {
      this.speed++
      this.sendSpeed()
    },
    down() {
      this.speed--
      this.sendSpeed()
    },
    updateSpeedFromSlider(){
        this.speed = this.$refs.slider.value
        console.log(this.speed)
        this.sendSpeed()
    },
    sendSpeed(){
        console.log(`setting speed to ${this.speed}`)
    }
  }
}
</script>

<template>
  <div class="rounded-full outline-indigo-500 font-medium outline px-5 py-2.5 flex justify-between">
    <button class="material-symbols-outlined align-middle" @click="down">mode_fan</button>
    <input type="range" min="0" max="100" :value="speed" ref="slider" @change="updateSpeedFromSlider" class="w-9/12">
    <button class="material-symbols-outlined align-middle" @click="up">mode_fan</button>
  </div>
</template>