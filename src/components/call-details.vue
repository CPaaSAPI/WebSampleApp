<template>
  <div class="backdrop">
    <div class="card">
      <div class="card-body text-center">
        <div v-if="mode === MODE.OUTGOING">
          <h5 class="card-title">{{ isAnswered ? "On call with" : "Ringing..." }}</h5>
          <div v-show="!isAnswered">
            <pulse-loader :loading="true" color="#f2f2f2"></pulse-loader>
            <p class="card-text text-center">
              <strong>Please wait for the remote peer to answer</strong>
            </p>
          </div>
        </div>

        <div v-if="mode === MODE.INCOMING || mode == MODE.ANSWER">
          <h5 class="card-title mb-3" :class="{ 'text-center': isAnswered }">
            {{
              isAnswered || mode == MODE.ANSWER
                ? "On Call with"
                : "Incoming call"
            }}
          </h5>
          <p class="card-text" v-show="!isAnswered && mode === MODE.INCOMING">
            <strong>Answer incoming call?</strong>
          </p>
        </div>

        <div v-show="isAnswered || mode === MODE.ANSWER">
          <h5 class="card-title">{{ destinationId }}</h5>
          <span>{{ formattedTime }}</span>
        </div>
        <div class="d-flex flex-row justify-content-around">
          <div v-if="mode === MODE.INCOMING && !isAnswered">
            <img v-on:click="answer" src="/public/answer.svg" class="img-button-answer" />
          </div>
          <div v-show="isAnswered || mode === MODE.ANSWER">
            <img v-show="!isMuted" v-on:click="toggleMute" src="/public/voice.svg" class="img-button" />
            <img v-show="isMuted" v-on:click="toggleMute" src="/public/mute.png" class="img-button" />
          </div>
          <div>
            <img v-on:click="cancel" src="/public/hung-up.svg" class="img-button" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStopwatch } from "vue-timer-hook";
import { MODE } from "../common/enums";

export default defineComponent({
  props: ["answered", "destination", "mode"],
  setup(props, { emit }) {
    const autoStart = true;
    const stopwatch = useStopwatch(0, autoStart);
    const isAnswered = computed(() => props.answered);
    const destinationId = computed(() => props.destination);
    const isMuted = ref(false);
    const muteButtonText = computed(() => (isMuted.value ? "Muted" : "Mute"));
    
    const formattedTime = computed(() => {
      let time;
      if (stopwatch.minutes.value < 10) {
        time = `0${stopwatch.minutes.value}`;
      } else {
        time = `${stopwatch.minutes.value}`;
      }
      if (stopwatch.seconds.value < 10) {
        time = `${time}:0${stopwatch.seconds.value}`;
      } else {
        time = `${time}:${stopwatch.seconds.value}`;
      }
      return time;
    });

    const cancel = () => {
      try {
        emit("end");
      } catch (error) {
        console.log(error);
      }
    };

    const toggleMute = () => {
      isMuted.value = !isMuted.value;
      emit("mute", isMuted.value);
    };

    const answer = () => {
      emit("answer");
    };

    return {
      destinationId,
      stopwatch,
      cancel,
      isAnswered,
      toggleMute,
      muteButtonText,
      isMuted,
      MODE,
      answer,
      formattedTime
    };
  },
});
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
  background: white;
  border-radius: 15px;

  color: #242121;
  z-index: 1000;
  box-shadow: 0 3px 0 rgba(27, 31, 36, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  animation-duration: 120ms;
  filter: opacity(99%);
  width: 300px;
  height: 280px;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ce;
}
.card-img-top {
  height: 200px;
  width: 200px;
}
.img-button {
  width: 60px;
  height: 60px;
}
.img-button-answer {
  width: 80px;
  height: 80px;
}
</style>