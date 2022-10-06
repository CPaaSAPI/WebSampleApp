<template>
    <div class="card">
        <div class="card-body">
            <h5
                class="card-title mb-3"
                :class="{ 'text-center': isAnswered }"
            >{{ isAnswered ? 'Call in progress' : 'Incoming call' }}</h5>
            <p class="card-text" v-show="!isAnswered">
                <strong>Answer incoming call?</strong>
            </p>
            <div class="d-flex flex-row justify-content-center">
                <button
                    v-show="!isAnswered"
                    type="button"
                    @click="answer"
                    class="btn btn-mav--color-1 btn-mav--height-normal me-3"
                >
                    <i class="fa-solid fa-phone"></i>
                    Answer
                </button>
                <button
                    @click="reject"
                    type="button"
                    class="btn btn-mav--color-2 btn-mav--height-normal"
                >
                    <i class="fa-solid fa-phone-slash"></i>
                    {{ rejectButtonText }}
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
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    props: [],
    setup(props, { emit }) {
        const isAnswered = ref(false)
        const rejectButtonText = computed(() => isAnswered.value ? "End" : "Reject")
        const isMuted = ref(false)
        const muteButtonText = computed(() => isMuted.value ? "Muted" : "Mute")

        const answer = () => {
            isAnswered.value = true
            emit('answer')
        }

        const toggleMute = () => {
            isMuted.value = !isMuted.value
            emit('mute', isMuted.value)
        }

        const reject = () => {
            emit(isAnswered.value ? 'end' : 'reject')
        }
        return { toggleMute, muteButtonText, reject, answer, isAnswered, rejectButtonText, isMuted }
    }
})
</script>

<style scoped lang="scss">
.card {
    top: 0;
    position: absolute;
    background-color: rgb(69, 69, 69);
    color: #f2f2f2;
    z-index: 1000;
    box-shadow: 0 3px 0 rgba(27, 31, 36, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.03);
    // animation-iteration-count: infinite;
    animation-duration: 500ms;
    filter: opacity(99%);
}
.card-img-top {
    height: 200px;
    // width: 200px;
}
</style>