<template>
  <div class="container">
    
    <transition enter-active-class="animate__animated animate__bounceInLeft"
      leave-active-class="animate__animated animate__bounceOutRight">
      <call-details :answered="outgoingCallAnswered" :destination-id="destinationId" :mode="callMode"
        v-if="callMode === MODE.OUTGOING" @end="end" @mute="mute" />
    </transition>

    <div class="row justify-content-center">
      <h5 class="my-0 inner inner--border-radius-bottom-0 col-xl-5 col-sm-12">CPaaS Sample App</h5>
    </div>

    <div class="row justify-content-center">
      <div class="inner inner--border-radius-top-0 col-xl-5 col-sm-12">
        <button @click="onRegisterClick" type="button" class="btn btn-mav--color-1 btn-mav--height-normal"
          :disabled="disabledButtons.register_disabled">
          <i v-if="!disabledButtons.register_disabled" class="fa-solid fa-plug" />
          <i v-else class="fa-solid fa-plug-circle-check" />
          Register
        </button>

        <button @click="onCallClick" type="button" class="btn btn-mav--color-2 btn-mav--height-normal mx-3"
          :disabled="callButtonDisabled">
          <i class="fa-solid fa-phone" />
          Call
        </button>

        <div class="mt-2">Status: {{ registrationStatus }}</div>

        <transition enter-active-class="animate__animated animate__bounceInUp"
          leave-active-class="animate__animated animate__bounceOutDown">
          <call-details v-if="callMode === MODE.INCOMING || callMode === MODE.ANSWER" :answered="outgoingCallAnswered"
            :destination-id="sourceId" :mode="callMode" @answer="answer" @reject="reject" @end="end" @mute="mute" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { cpaas, CPaaSEvents, Nullable, voice } from "@cpaassdk/cpaas-sdk"
import { MODE } from "../common/enums";

import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  App
} from "vue";

export default defineComponent({
  setup() {
    const app = getCurrentInstance()!!;
    const appConfig = app.appContext.config!!;
    const cpaasApi = appConfig.globalProperties.$cpaas;
    const cpaasClientId = ref(null);
    const cpaasEvents = ref<CPaaSEvents | null>(null);
    const destinationId = ref<string | null>(null);
    const registrationStatus = ref("Unregistered");
    const clientIdEnabled = ref(true);
    const outgoingCallAnswered = ref(false);
    const sourceId = ref<String | null>(null);
    const disabledButtons = reactive({ register_disabled: false });
    const currentCall = ref<Nullable<cpaas.data.CPaasCall>>()

    const callButtonDisabled = computed(
      () => {
        return callMode.value != MODE.IDLE
      }
    );

    const isOnCall = computed(() => {
      return callMode.value !== MODE.IDLE;
    });

    const callMode = ref<MODE>(MODE.IDLE);

    onMounted(async () => {
      const { clientId } = cpaasApi;
      cpaasClientId.value = clientId;
    });

    const onRegisterClick = async () => {
      cpaasEvents.value = await cpaasApi.useApi(cpaasClientId.value);

      cpaasEvents.value?.addListener("incomingCall", async (callId: string) => {
        await onIncomingCall(callId);
      })


      registrationStatus.value = "Registered, ready to accept calls";
      disabledButtons.register_disabled = true;
      clientIdEnabled.value = false;
    };

    const onIncomingCall = async (callId: string) => {
      currentCall.value = voice.getExistingCall(callId)
      let source = currentCall.value?.destinationId?.toString()!;
      sourceId.value = source.substring(0, source.indexOf("@"));
      currentCall.value?.onCallEnd.addEventListener(() => {
        callMode.value = MODE.IDLE;
      });
      callMode.value = MODE.INCOMING;
    };

    const onCallClick = async () => {
      const destId: string = <string>destinationId.value;
      callMode.value = MODE.OUTGOING;
      outgoingCallAnswered.value = false;
      const outgoingCallId = await voice.create()


      currentCall.value = await voice.connect(outgoingCallId, {
        audio: true
      })

      currentCall.value.onCallEnd.addEventListener(() => {
        callMode.value = MODE.IDLE;
      });

      currentCall.value.onConnected.addEventListener(() => {
        outgoingCallAnswered.value = true;
      });
    };

    const reject = () => {
      voice.reject(currentCall.value?.callId!)
      callMode.value = MODE.IDLE;
    };

    const answer = async () => {
      if (callMode.value === MODE.INCOMING) {
        callMode.value = MODE.ANSWER;
        console.log(`call is answered${callMode.value}`);
        await voice.connect(currentCall.value?.callId!, {
          audio: true
        })
      }
    };

    const end = () => {
      currentCall.value?.end()
      callMode.value = MODE.IDLE;
    };

    const mute = async (isMute: boolean) => {
      if (isMute) {
        await currentCall.value?.mute();
      } else {
        await currentCall.value?.unmute();
      }
    };

    const contactChanged = (value: string) => {
      destinationId.value = value;
    };

    return {
      cpaasClientId,
      registrationStatus,
      disabledButtons,
      onRegisterClick,
      contactChanged,
      onCallClick,
      clientIdEnabled,
      destinationId,
      callButtonDisabled,
      isOnCall,
      callMode,
      MODE,
      end,
      reject,
      answer,
      outgoingCallAnswered,
      mute,
      sourceId,
    };
  },
});
</script>

<style lang="scss">
.container {
  position: relative;
}

.inner {
  position: relative;

  background: #fcfbfb;
  padding: 20px;
  border-radius: 15px;

  &--border-radius-top-0 {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }

  &--border-radius-bottom-0 {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>