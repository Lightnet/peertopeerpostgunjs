//console.log("test");

localStorage.clear();

//import '@babel/polyfill';
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'pgjs'
	}
});

export default app;