<template>
    <div class="backdrop">
        <div class="card">
            <div class="card-body text-center">
                <h5 class="card-title">{{ isAnswered ? 'Call in progress' : 'Dialing...' }}</h5>
                <div v-show="!isAnswered">
                    <pulse-loader :loading="true" color="#f2f2f2"></pulse-loader>
                    <p class="card-text text-center">
                        <strong>Please wait for the remote peer to answer</strong>
                    </p>
                </div>
                <div class="d-flex flex-row justify-content-center">
                    <button
                        @click="cancel"
                        type="button"
                        class="btn btn-mav--color-2 btn-mav--height-normal"
                    >
                        <i class="fa-solid fa-phone-slash"></i>
                        {{ isAnswered ? 'End' : 'Cancel' }}
                    </button>
                    <button
                        @click="toggleMute"
                        v-show="isAnswered"
                        type="button"
                        class="btn btn-mav--color-2 btn-mav--height-normal ms-2"
                    >
                        <i v-if="isMuted" class="fa-solid fa-microphone-slash"></i>
                        <i v-else class="fa-solid fa-microphone"></i>
                        {{ muteButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    props: ["answered"],
    setup(props, { emit }) {
        const isAnswered = computed(() => props.answered)
        const isMuted = ref(false)
        const muteButtonText = computed(() => isMuted.value ? "Muted" : "Mute")
        const cancel = () => {
            try {
                emit('end')
            }
            catch (error) {
                console.log(error)
            }
        }

        const toggleMute = () => {
            isMuted.value = !isMuted.value
            emit('mute', isMuted.value)
        }

        return { cancel, isAnswered, toggleMute, muteButtonText, isMuted }
    }
})
</script>

<style scoped lang="scss">
.backdrop {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 10000;
    left: 0;
    top: 0;
    backdrop-filter: blur(2px);
    animation-duration: 550ms;
}
.card {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(69, 69, 69);
    color: #f2f2f2;
    z-index: 1000;
    box-shadow: 0 3px 0 rgba(27, 31, 36, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.03);
    animation-duration: 120ms;
    filter: opacity(99%);
    width: 400px;
    height: 200px;
}
.card-body {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    align-items: ce;
}
.card-img-top {
    height: 200px;
    width: 200px;
}
</style>