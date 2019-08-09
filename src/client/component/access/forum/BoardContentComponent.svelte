<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';
    import ForumBoardListComponent from "./ForumBoardListComponent.svelte";
    import ForumCreateBoardComponent from "./ForumCreateBoardComponent.svelte";

    let idcomponent = generateId(20);
    let elcontent;

    export let id;
    export let pub;
    export let title="None";
    export let content="None";
    export let date="None";
    export let tag="";


    onMount(() => {
        //elcontent = document.getElementById(idcomponent);
        //if(forumid == null){
            //return;
        //}
        //console.log("Forum!");
        //resizediv();
        //window.addEventListener('resize', resizediv);
        console.log(id);
        console.log(pub);
        console.log(title);
    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
    });

    function resizediv(){
		//console.log("resize");
		if(elcontent == null){
            return;
        }
        //console.log("resize");
        let parent = elcontent.parentNode;
        //console.log(parent.clientHeight);
        //elchatmessages.style.height = parent.clientHeight - 44 - 22 - 22 + 'px';
        elcontent.style.height = parent.clientHeight - 44 + 'px';
        elcontent.style.width = parent.clientWidth + 'px';
    }

</script>
<style>
    .cardboard{
        border: 1px solid #aaa;
        width:100%;
        height:64px;
        border-radius: 2px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        padding: 1em;
		margin: 0 0 1em 0;
    }

</style>
<div id="{idcomponent}" class="cardboard">
    <label>{title}</label>
    <label>{content}</label>
</div>