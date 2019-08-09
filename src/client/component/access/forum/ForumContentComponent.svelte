<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';
    import ForumBoardListComponent from "./ForumBoardListComponent.svelte";
    import ForumCreateBoardComponent from "./ForumCreateBoardComponent.svelte";
    import ForumCreateTopicComponent from "./ForumCreateTopicComponent.svelte";

    import BoardContentComponent from "./BoardContentComponent.svelte";

    let idcomponent = generateId(20);
    let elcontent;

    let bcreatedborad = false;
    let bcreatedtopic = false;

    export let forumid;
    let showforum = false;

    let boardlist=[];
    let topiclist=[];
    let gunboard;

    onMount(() => {
        elcontent = document.getElementById(idcomponent);
        if(forumid == null){
            return;
        }

        gunboard = gun.get('forum').get(forumid).get('board');
        gunboard.once().map().once(function(data,key){
            console.log(data, key);
            boardlist.push({id:key,data});
            boardlist=boardlist;
        });

        //console.log("Forum!");
        resizediv();
		window.addEventListener('resize', resizediv);
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

    function btnCreateBoard(e){
        console.log("btnCreateBoard");
        bcreatedborad= !bcreatedborad;
        if(bcreatedtopic){
            bcreatedtopic=false;
        }
    }

    function btnCreateTopic(e){
        console.log("btnCreateTopic");
        bcreatedtopic= !bcreatedtopic;
        if(bcreatedborad){
            bcreatedborad=false;
        }
    }
    /*


    */

</script>
<div id="{idcomponent}">
    <button on:click={btnCreateBoard}>Create Board</button>
    <button on:click={btnCreateTopic}>Create Topic</button>
    {#if bcreatedborad == true}
        <ForumCreateBoardComponent forumid={forumid}></ForumCreateBoardComponent>
    {/if}
    {#if bcreatedtopic == true}
        <ForumCreateTopicComponent forumid={forumid}></ForumCreateTopicComponent>
    {/if}

    {#each boardlist as board}
        {@debug board}
        <BoardContentComponent
            id={board.id}
            pub={board.data.pub}
            title={board.data.title}
            content={board.data.content}
            
        />
    {/each}
</div>