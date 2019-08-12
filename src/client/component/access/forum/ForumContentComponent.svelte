<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';
    import ForumBoardListComponent from "./ForumBoardListComponent.svelte";
    import ForumCreateBoardComponent from "./ForumCreateBoardComponent.svelte";
    import ForumCreateTopicComponent from "./ForumCreateTopicComponent.svelte";

    import BoardContentComponent from "./BoardContentComponent.svelte";
    import TopicContentComponent from "./TopicContentComponent.svelte";
    import PostContentComponent from "./TopicContentComponent.svelte";

    //const dispatch = createEventDispatcher();

    let idcomponent = generateId(20);
    let elcontent;

    let bcreatedborad = false;
    let bcreatedtopic = false;

    export let forumid;
    let showforum = false;

    let boardlist=[];
    let topiclist=[];
    let postlist=[];
    let gunboard;
    let selectboardid="";
    let selecttopicid="";

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
        console.log(selectboardid)
        if(selectboardid.length == 0){
            console.log("board id not found!");
            return;
        }
        console.log("btnCreateTopic");
        bcreatedtopic= !bcreatedtopic;
        if(bcreatedborad){
            bcreatedborad=false;
        }
    }

    function Handle_SelectBoard(e){
        console.log("selected:",e.detail);
        selectboardid=e.detail
        boardlist=[];
        boardlist=boardlist;

        gun.get(selectboardid).get('topic').once().map().once(function(data,key){
            console.log(data,key)
            topiclist.push({id:key,data});
            topiclist=topiclist;
        });
    }

    function Handle_SelectTopic(e){
        console.log("selected:",e.detail);
        selecttopicid=e.detail;
        
        gun.get(selecttopicid).get('post').once().map().once(function(data,key){
            console.log(data,key);
            //postlist.push({id:key,data});
            //postlist=postlist;
        });
        
    }

    function Handle_SelectPost(e){
        //???
    }

    function btnCheck(){
        console.log("selectboardid",selectboardid);
        console.log("selecttopicid",selecttopicid);
    }

    /*


    */

</script>
<div id="{idcomponent}">
    <button on:click={btnCreateBoard}>Create Board</button>
    <button on:click={btnCreateTopic}>Create Topic</button>
    <button on:click={btnCheck}>Check</button>
    <label>Board ID:{selectboardid}</label>
    <label>Topic ID:{selecttopicid}</label>
    {#if bcreatedborad == true}
        <ForumCreateBoardComponent forumid={forumid}></ForumCreateBoardComponent>
    {/if}
    {#if bcreatedtopic == true}
        <ForumCreateTopicComponent forumid={forumid} boardid={selectboardid}></ForumCreateTopicComponent>
    {/if}

    {#each boardlist as board}
        <BoardContentComponent
            id={board.id}
            pub={board.data.pub}
            title={board.data.title}
            content={board.data.content}
            on:selectboard={Handle_SelectBoard}
        />
    {/each}

    {#each topiclist as topic}
        <TopicContentComponent
            id={topic.id}
            pub={topic.data.pub}
            title={topic.data.title}
            content={topic.data.content}
            on:selecttopic={Handle_SelectTopic}
        />
    {/each}

    {#each postlist as post}
        <PostContentComponent
            id={post.id}
            pub={post.data.pub}
            title={post.data.title}
            content={post.data.content}
        />
    {/each}
</div>