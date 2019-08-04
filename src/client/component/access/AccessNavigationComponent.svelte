<script>
    import { onMount, onDestroy } from 'svelte';
    //import AutoSizeDivComponent from "../base/AlignRegionComponent.svelte";
    import DisplayUser from "./account/DisplayUserComponent.svelte";
    import PublicKeyComponent from "./account/PublicKeyComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);

    //onMount(() => {
        //console.log("mount")
    //});

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});
</script>

<style>
    .access_navmenu{
        height:22px;
        width:100%;
    }
</style>
<div id={idcomponent} class="access_navmenu">
    <button>Access</button>
    <DisplayUser/>
    <PublicKeyComponent></PublicKeyComponent>
</div>
