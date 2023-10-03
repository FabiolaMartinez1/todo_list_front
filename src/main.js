import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'

import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
// import { Panel } from 'primevue/panel';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App)
app.use(router);
app.mount('#app');

app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('DataTable', DataTable);
app.component('TColumn', Column);
app.component('TPanel', Panel);
// app.component('TPanel', Panel);
