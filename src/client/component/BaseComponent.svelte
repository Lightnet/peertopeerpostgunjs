<script>
    //https://svelte.dev/examples#modal
	import { onMount, onDestroy } from 'svelte'
    import { generateId } from '../helper/generateid.js';

    export let idcomponent = generateId(20);
    let elementcontent;

    onMount(() => {
        //console.log("mount");
        elementcontent = document.getElementById(idcomponent);
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });

</script>

<style>
    .autoresizediv{
        height:100%;
        width:100%;
    }
    div{
        color: azure;
    }
</style>
<div id="{idcomponent}" class="autoresizediv">
    <slot></slot>
</div>