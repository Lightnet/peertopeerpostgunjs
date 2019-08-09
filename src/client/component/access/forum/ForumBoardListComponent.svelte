<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';
    import ForumBoardListComponent from "./ForumBoardListComponent.svelte";
    import ForumCreateBoardComponent from "./ForumCreateBoardComponent.svelte";

    let idcomponent = generateId(20);
    let elcontent;

    onMount(() => {
        //elcontent = document.getElementById(idcomponent);
        //if(forumid == null){
            //return;
        //}
        //console.log("Forum!");
        //resizediv();
		//window.addEventListener('resize', resizediv);
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
<div id="{idcomponent}">

</div>