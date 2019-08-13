<script>
    import { onMount, onDestroy } from 'svelte';
    //import { onUserName } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';
    import CreateBoardComponent from "./CreateBoardComponent.svelte";
    import CreateTopicComponent from "./CreateTopicComponent.svelte";
    import CreatePostComponent from "./CreatePostComponent.svelte";

    import BoardContentComponent from "./BoardContentComponent.svelte";
    import TopicContentComponent from "./TopicContentComponent.svelte";
    import PostContentComponent from "./PostContentComponent.svelte";

    import DisplayModeratorsComponent from "./moderator/DisplayModeratorsComponent.svelte";
    import AdminPanelComponent from "./admin/AdminPanelComponent.svelte";
    import DisplayRulesComponent from "./mod/DisplayRulesComponent.svelte";
    import FooterNavComponent from "./mod/FooterNavComponent.svelte";

    //const dispatch = createEventDispatcher();

    let idcomponent = generateId(20);
    let elcontent;

    let idcontainer = generateId(20);
    let elcontainer;

    let idposts = generateId(20);
    let elposts;

    let idpanelright = generateId(20);
    let elpanelright;

    let bcreatedborad = false;
    let bcreatedtopic = false;
    let bcreatedpost = false;

    export let forumid;
    let showforum = false;

    let boardlist=[];
    let topiclist=[];
    let postlist=[];
    let gunboard;
    let selectboardid="";
    let selecttopicid="";
    let viewmode="BOARD";

    onMount(() => {
        elcontent = document.getElementById(idcomponent);

        elposts = document.getElementById(idposts);
        elpanelright = document.getElementById(idpanelright);
        elcontainer = document.getElementById(idcontainer);

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

    function UpdateBoard(){
        boardlist=[];
        gunboard.once().map().once(function(data,key){
            console.log(data, key);
            boardlist.push({id:key,data});
            boardlist=boardlist;
        });
    }

    function UpdateTopic(){
        topiclist=[];
        gun.get(selectboardid).get('topic').once().map().once(function(data,key){
            console.log(data,key)
            topiclist.push({id:key,data});
            topiclist=topiclist;
        });
    }

    function UpdatePost(){
        topiclist=[];
        gun.get(selecttopicid).get('post').once().map().once(function(data,key){
            console.log(data,key)
            topiclist.push({id:key,data});
            topiclist=topiclist;
        });
    }

    function btnUpdateForum(){
        boardlist=[];
        topiclist=[];
        postlist=[];
        UpdateBoard();
        console.log("update btnUpdateForum");
    }

    function btnUpdateBoard(){
        boardlist=[];
        topiclist=[];
        postlist=[];
        UpdateBoard();
        console.log("update btnUpdateBoard");
    }

    function btnUpdateTopic(){
        boardlist=[];
        topiclist=[];
        postlist=[];
        UpdateTopic();
        console.log("update btnUpdateTopic");
    }

    function btnUpdatePost(){
        boardlist=[];
        topiclist=[];
        postlist=[];
        UpdatePost();
        console.log("update post");
    }

    onDestroy(()=>{
        //onUserNameUnsubscribe();
    });

    function resizediv(){
		//console.log("resize");
		if(elcontent == null){
            return;
        }
        let parent = elcontent.parentNode;
        let h = parent.clientHeight;
        elcontent.style.height = h + 'px';
        elcontent.style.width = parent.clientWidth + 'px';

        elposts.style.width = (parent.clientWidth - 200) + 'px';
        elposts.style.height = h - 22 + 'px';
        elpanelright.style.width = (200) + 'px';
        elpanelright.style.height = h - 22 + 'px';
        elcontainer.style.height = h - 22 + 'px';
        elcontainer.style.width = parent.clientWidth + 'px';

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

    function btnCreatePost(e){
        console.log(selectboardid)
        if(selectboardid.length == 0){
            console.log("board id not found!");
            return;
        }
        console.log("btnCreateTopic");
        bcreatedpost= !bcreatedpost;
        if(bcreatedtopic){
            bcreatedtopic=false;
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
        viewmode="BOARD";
    }

    function Handle_SelectTopic(e){
        console.log("selected:",e.detail);
        selecttopicid=e.detail;
        postlist=[];
        gun.get(selecttopicid).get('post').once().map().once(function(data,key){
            console.log(data,key);
            postlist.push({id:key,data});
            postlist=postlist;
        });
        topiclist=[];
        topiclist=topiclist;
        viewmode="TOPIC";
    }

    function Handle_SelectPost(e){
        //???
    }

    function btnCheck(){
        console.log("selectboardid",selectboardid);
        console.log("selecttopicid",selecttopicid);
    }

    function btnPostAuth(e){
        console.log(gun);
        gun.pauth();
    }

</script>
<style>
    .forumcontext{
        width:100%;
        height:100%;
    }
    .forumnav{
        height:22px;
    }

    .boardpost{
        overflow-y: scroll;
    }

    .panelfloat{
        float:left;
    }
    .containcontent{
        width:100%;
        height:100%;
    }
</style>
<div id="{idcomponent}" class="forumcontext">

    <div class="forumnav">
        <button on:click={btnCreateBoard}>Create Board</button>
        <button on:click={btnCreateTopic}>Create Topic</button>
        <button on:click={btnCreatePost}>Create Post</button>
        <button on:click={btnCheck}>Check</button>
        <button on:click={btnUpdateForum}>Forum ID:{forumid}</button>
        <button on:click={btnUpdateBoard}>Board ID:{selectboardid}</button>
        <button on:click={btnUpdateTopic}>Topic ID:{selecttopicid}</button>
        <button on:click={btnUpdatePost}>Post Update</button>
        <button on:click={btnPostAuth}>Post Auth</button>
    </div>

    {#if bcreatedborad == true}
        <CreateBoardComponent forumid={forumid} on:show={()=>{bcreatedborad=false}}/>
    {/if}
    {#if bcreatedtopic == true}
        <CreateTopicComponent forumid={forumid} boardid={selectboardid} on:show={()=>{bcreatedtopic=false}} />
    {/if}
    {#if bcreatedpost == true}
        <CreatePostComponent forumid={forumid} boardid={selectboardid} topicid={selecttopicid}  on:show={()=>{bcreatedpost=false}}/>
    {/if}

    <div id="{idcontainer}" class="containcontent">
        <div id="{idposts}" class="panelfloat boardpost">
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

        <div id="{idpanelright}"  class="panelfloat">
            <AdminPanelComponent />
            <DisplayRulesComponent />
            <DisplayModeratorsComponent />
            <FooterNavComponent />
        </div>
    </div>
</div>