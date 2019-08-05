<script>
    //https://gun.eco/docs/RAD#lex
    /*
        * Note that date stamp has to be fixed filter to query time.
        '2019/06/20:10:10:10.30' <- correct format
        '2019/6/20:10:10:10.30'  <- incorrect format `2019/6` will error that need to match reg.
    */
    import { onMount, onDestroy } from 'svelte';
    import ChatComponent from './ChatComponent.svelte';
    //import ModalComponent from "../../base/ModalComponent.svelte";
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';

    
    let idcomponent = generateId(20);
    let elcontent;
    //let idchatmessages = generateId(20);
    //let elchatmessages;
    let chatmessage = "test";

    let publicKey = "";
    let bchatroom = false;
    let accesskey = "";
    let chatroomlist = [];
    let chatselectid = "";

    accesskey = chatselectid;

    //const onUserNameUnsubscribe = onUserName.subscribe(value => {
		//console.log(value);
		//username = value;
    //});
    
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
    onMount(() => {
        elcontent = document.getElementById(idcomponent);
        //elchatmessages = document.getElementById(idchatmessages);
        ChatList();
        resizediv();
		window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
        window.removeEventListener('resize', resizediv);
    });

    function btnAddKey(e){

    }

    function btnRemoveKey(e){

    }

    function btnJoinRoom(e){
        if(accesskey.length == 0){
            console.log("CHAT EMPTY KEY");
            return;
        }
        bchatroom=true;
    }

    function timestamp(){
        let currentDate = new Date();
        //console.log(currentDate);
        let year = currentDate.getFullYear();
        
        let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2); 
        let date = ("0" +currentDate.getDate()).slice(-2); 
        
        let hour = ("0" +currentDate.getHours()).slice(-2);
        let minute = ("0" +currentDate.getMinutes()).slice(-2);
        let second = ("0" +currentDate.getSeconds()).slice(-2);
        let millisecond = currentDate.getMilliseconds();
        return year + "/" + (month) + "/" + date + ":" + hour+ ":" + minute+ ":" + second+ ":" + millisecond;        
    }

    async function btnCreateRoom(e){
        //bchatroom=true;
        let user = gun.user();
        let pair = user._.sea;
        let genchatkey = Gun.text.random();
        let sec = SEA.random(16).toString();
        let enc = await SEA.encrypt(sec, pair);
        console.log(genchatkey);

        //chat room, chat id key, sec share key
        //user.get('chatroom').get(genchatkey).get('pub').put()
        user.get('chatroom').get(genchatkey).get('pri').put(enc);
        user.get('chatroom').get(genchatkey).get('own').put(pair.pub);
        //console.log(pair);
        let dh = await SEA.secret(pair.epub, pair);
        enc = await SEA.encrypt(sec, dh);
        user.get('chatroom').get(genchatkey).get('pub').put(enc);

        //created messsage chat message default
        let current = timestamp();
        gun.get(genchatkey)
            .get('info')
            .put({
                name:genchatkey,
                description:"",
                icon:"null",
                icontype:"null",
            });
        let msg = await SEA.encrypt("Created!", sec);
        //sea.js key can't be json for gun bug, will return null or return.
        msg = JSON.stringify(msg);
        msg = window.btoa(msg);
        gun.get(genchatkey).get('message').get(current).put(msg);
        //gun.get(genchatkey).get('memeber').get(pair.pub).put(enc);//should not be here?

    }

    function ChatList(){
        chatroomlist=[];
        let user = gun.user();
        user.get('chatroom').once().map().once(function(data,key){
            console.log("data",data);
            console.log("key",key);
            if(data !=null){
                chatroomlist.push(key);
                chatroomlist = chatroomlist;
            }
        });
    }

    function handle_chatIDSelect(e){
        //console.log(e);
        //console.log(chatselectid);
        accesskey = chatselectid;
    }


</script>

<style>

</style>

<div id="{idcomponent}">
    <!--
    <button> Public </button>
    <button> Private </button>
    -->
    {#if bchatroom == false}
        <button on:click={btnCreateRoom}> Create Room </button>
        <!--<button on:click={ChatList} > Chat List </button>-->
        Access Key: <input bind:value={accesskey} /> 
        <button on:click={btnJoinRoom}> Join </button>
        
        <select bind:value={chatselectid} on:change={handle_chatIDSelect} >
            <option disabled selected value> -- select an option -- </option>
            {#each chatroomlist as room}
                <option value={room} >{room}</option>
            {/each}
        </select>
        <button on:click={btnAddKey}> Add </button>
        <button on:click={btnRemoveKey}> Remove </button>
    {:else}
        <ChatComponent acceschatkey={accesskey}></ChatComponent>

    {/if}
</div>
