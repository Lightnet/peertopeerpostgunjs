//console.log("test");
//import '@babel/polyfill';
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'MJS'
	}
});

export default app;