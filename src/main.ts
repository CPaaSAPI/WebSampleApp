import { createApp } from 'vue'
import App from './app.vue'
import router from './router'

//bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/custom.scss"

//v-select
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

//animate.css
import 'animate.css';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

//project plugins
import cpaasApiPlugin from './plugins/cpaasPlugin'

const app = createApp(App)
app.use(router)
app.use(cpaasApiPlugin)
app.component('v-select', vSelect)
app.component('pulse-loader', PulseLoader)
app.mount('#app')