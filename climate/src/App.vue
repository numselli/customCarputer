<script setup lang="ts">
import fanspeed from './components/fanSpeed.vue'
import setpoint from './components/setPoint.vue'
import currentTempCabin from './components/currentTempCabin.vue'
import currentTempOutside from './components/currentTempOutside.vue'
import ventSelector from './components/ventSelector.vue'
import airSource from './components/airSource.vue'
import toggles from './components/toggles.vue'
</script>

<template>
  <div class='bg-violet-950 h-dvh text-white'>
    <div class="p-3 flex justify-between">
      <div class="rounded-full outline-indigo-500 outline px-2.5 py-2.5 max-w-fit">
        <button class="material-symbols-outlined align-middle">power_settings_new</button>
      </div>

      <currentTempOutside/>

      <currentTempCabin/>

      <div class="rounded-full outline-indigo-500 outline px-2.5 py-2.5 max-w-fit">
        <button class="material-symbols-outlined align-middle">settings</button>
      </div>
    </div>

    <div class="p-3">
      <ventSelector/>
    </div>

    <div class="p-3">
      <fanspeed/>
    </div>

    <div>
      <airSource/>
    </div>

    <div>
      <toggles/>
    </div>
    
    <div class="p-3 flex justify-center">
      <setpoint/>
    </div>
  </div>
</template>
