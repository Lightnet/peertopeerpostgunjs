<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName } from '../../../mjs.js';
    import { gun,timestamp } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import ForumContentComponent from "./ForumContentComponent.svelte";
    
    let idcomponent = generateId(20);
    let elcontent;

    let forumid = "";
    let selectforumid = "";
    let forumlist = [];
    let showforum = false;

    onMount(() => {
        elcontent = document.getElementById(idcomponent);
        updateForumList();
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

    async function btnCreateForum(e){
        let user = gun.user();
        let pair = user._.sea;
        let genforumid = Gun.text.random();
        let sec = SEA.random(16).toString();
        let enc = await SEA.encrypt(sec, pair);
        //console.log(genforumid);

        user.get('forum').get(genforumid).get('pri').put(enc);
        user.get('forum').get(genforumid).get('own').put(pair.pub);

        let dh = await SEA.secret(pair.epub, pair);
        enc = await SEA.encrypt(sec, dh);
        user.get('forum').get(genforumid).get('member').get(pair.pub).put(enc);


        gun.get('forum').get(genforumid).get('own').put(pair.pub);
        gun.get('forum').get(genforumid).get('member').get(pair.pub).put(enc);
        gun.get('forum').get(genforumid).get('info').put({
            name:genforumid,
            own:pair.pub,
            description:"",
            date:timestamp()
        });


        updateForumList();
    }

    function updateForumList(){
        forumlist=[];
        let user = gun.user();
        user.get('forum').once().map().once(function(data,key){
            //console.log("data",data);
            //console.log("key",key);
            if(data !=null){
                forumlist.push(key);
                forumlist = forumlist;
            }
        });
    }

    function btnJoinForum(e){
        if(forumid.length == 0){
            return;
        }
        showforum=true;
    }

    function handle_forumSelectID(){
        forumid = selectforumid;
    }

    function btnAddForum(){

    }

    function btnRemoveForum(){

    }

</script>
<div id="{idcomponent}">

    {#if showforum == false}
        <button on:click={btnCreateForum}> Create Forum </button>
        Access Key: <input bind:value={forumid} /> 
        <button on:click={btnJoinForum}> Join </button>
        <select bind:value={selectforumid} on:change={handle_forumSelectID} >
            <option disabled selected value> -- select an option -- </option>
            {#each forumlist as room}
                <option value={room} >{room}</option>
            {/each}
        </select>
        <button on:click={btnAddForum}> Add </button>
        <button on:click={btnRemoveForum}> Remove </button>
    {:else}
        <ForumContentComponent forumid={forumid}></ForumContentComponent>
    {/if}
</div>