<template>
    <p>reverseCam</p>
    <RouterLink to="/">Go to Home</RouterLink>
    <video v-if="!imageData?.image" ref="video" />

</template>

<script>
export default {
    async data() {
        return {
            mediaStream: null,
            imageData: {
                image: '',
                image_orientation: 0,
            },
        }
    },
    async mounted() {
        const videoDevice = await navigator.mediaDevices.getUserMedia({video: true})
        
        this.$refs.video.srcObject = videoDevice;
        this.$refs.video.play()
        this.mediaStream = videoDevice
    },
    beforeUnmount(){
        const tracks = this.$refs.video.srcObject.getTracks();
        tracks.forEach(track => {
            track.stop();
            this.$refs.video.srcObject = null;
        }) 
    }
}
</script>