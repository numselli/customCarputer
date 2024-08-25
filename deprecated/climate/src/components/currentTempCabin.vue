<script>
export default {
  data() {
    return {
      temp: 0
    }
  },
  methods: {
    updateTemp(){
        this.temp=Math.floor(Math.random() * 35);
    }
  },
  mounted(){
    setInterval(this.updateTemp, 30*1000)
  }
}
</script>
<template>
    <div>
        <div>
            <span class="material-symbols-outlined align-middle">directions_car</span>
            <!-- <span>cabin temp:</span> -->
            <span class="align-middle">{{ temp }}</span>
        </div>
    </div>
</template>