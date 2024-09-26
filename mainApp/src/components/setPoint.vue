<script>
export default {
  data() {
    return {
      temp: 0
    }
  },
  methods: {
    up() {
      this.temp++
      this.sendSpeed()
    },
    down() {
      this.temp--
      this.sendSpeed()
    },
    sendTemp(){
        console.log(`setting temp to ${this.temp}`)
    }
  }
}
</script>
<template>
  <div>
    <button class="material-symbols-outlined align-middle" @click="down">remove</button>
    <span class="align-middle font-bold text-2xl">{{ temp }}</span>
    <button class="material-symbols-outlined align-middle" @click="up">add</button>
  </div>
</template>