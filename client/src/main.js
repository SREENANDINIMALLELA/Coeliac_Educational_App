
import L  from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Vue from 'vue'
import App from './App.vue'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false
export const eventBus = new Vue();
new Vue({
  render: h => h(App),
}).$mount('#app')
