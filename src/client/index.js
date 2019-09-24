//console.log("test");

localStorage.clear();

//import '@babel/polyfill';
import App from './App.svelte';

const PERMISSIONS = [
	{ name: "clipboard-read" },
    { name: "clipboard-write" }
];

/** Watch for pastes */
navigator.clipboard.addEventListener('clipboardchange', e => {
	navigator.clipboard.getText().then( text => {
		log('Updated clipboard contents: '+text)
	})
});

const app = new App({
	target: document.body,
	props: {
		name: 'pgjs'
	}
});

export default app;