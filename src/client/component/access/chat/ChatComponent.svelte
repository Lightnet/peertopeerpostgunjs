<script>
    //https://gun.eco/docs/RAD#lex
    /*
        * Note that date stamp has to be fixed filter to query time.
        '2019/06/20:10:10:10.30' <- correct format
        '2019/6/20:10:10:10.30'  <- incorrect format `2019/6` will error that need to match reg.
    */
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import ModalComponent from "../../base/ModalComponent.svelte";
    import ChatAccessComponent from "./ChatAccessComponent.svelte";
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';

    let idcomponent = generateId(20);
    let elcontent;
    let idchatmessages = generateId(20);
    let elchatmessages;
    let chatmessage = "test";
    let gunchat;
    let messages = [];
    let user;
    let pair;

    export let acceschatkey = "";
    let sharekey = "";
    
    function resizediv(){
		//console.log("resize");
		if(elcontent == null){
            elcontent = document.getElementById(idcomponent);
            return;
        }
        //console.log("resize");
        let parent = elcontent.parentNode;
        //console.log(parent.clientHeight);
        elchatmessages.style.height = parent.clientHeight - 44 - 22 - 22 + 'px';
        elcontent.style.height = parent.clientHeight - 44 + 'px';
        elcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(async () => {
        elcontent = document.getElementById(idcomponent);
        elchatmessages = document.getElementById(idchatmessages);

        if(acceschatkey.length == 0){
            console.log("EMPTY KEY");
        }

        setupChat();

        resizediv();
		window.addEventListener('resize', resizediv);
    });

    afterUpdate(()=>{
        updatescrollmessages();
    });

    async function setupChat(){
        //user.get('chatroom').get(acceschatkey).put(enc);
        let user = gun.user();
        let pair = user._.sea;
        let p = await gun.get(acceschatkey).get('own').then();
        //console.log(p);
        let to = gun.user(p);
        console.log(to)
        let key = await to.get('chatroom').get(acceschatkey).get('member').get(pair.pub).then();
        if((key == "null")||key == null){
            console.log("REJECT!");
            return;
        }
        //console.log("key:",key);
        let epub = await to.get('epub');
        let mix = await SEA.secret(epub, pair);
        key = await SEA.decrypt(key, mix);
        console.log("key:",key);


        /* self not other key
        let user = gun.user();
        let pair = user._.sea;
        let enc = await user.get('chatroom').get(acceschatkey).get('member').get(pair.pub).then();
        console.log(enc);
        let own = await user.get('chatroom').get(acceschatkey).get('own').then();
        console.log(own);
        let to = gun.user(own);
        let epub = await to.get('epub');
        console.log("epub",epub);
        let mix = await SEA.secret(epub, pair);
        console.log("mix",mix);
        let key = await SEA.decrypt(enc, mix);
        console.log("key:",key);
        */
        sharekey = key;
        //console.log(sharekey);
        //get current date chat
        let currentDate = new Date();
        //console.log(currentDate);
        let year = currentDate.getFullYear();
        let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2);
        let timestring = year + "/" + month + "/";
        
        //gunchat = gun.get(acceschatkey).get('message').get({'.': {'*': '2019/08/'}}).map();
        gunchat = gun.get(acceschatkey).get('message').get({'.': {'*': timestring}}).map();
        gunchat.on(handle_messages);

        gun.get(acceschatkey).get('message').get({'.': {'*': timestring}}).once().map().once();
        
        setTimeout(function(){
            elchatmessages.scrollTop = elchatmessages.scrollHeight;
        }, 600);
        
    }

    onDestroy(()=>{
        //onUserNameUnsubscribe();
        window.removeEventListener('resize', resizediv);
        gunchat.off();//turn off
    });

    function updatescrollmessages(){
        //console.log("check update???");
        if(elchatmessages ==null){
            elchatmessages = document.getElementById(idchatmessages);
        }
        //console.log(" update...");
        elchatmessages.scrollTop = elchatmessages.scrollHeight;
    }

    async function handle_messages(data,key){
        //console.log(data);
        //console.log(key);
        if(data !=null){
            let enc = window.atob(data);
            //console.log(enc);
            if(enc == 'undefined'){
                return;
            }
            //console.log(typeof enc);
            //var res = enc.charAt(0);
            //if(res == '"'){
                //console.log("FOUND!")
            //}
            //if((typeof enc == 'string')||(res == '"')){
            if((typeof enc == 'string')){
                enc = JSON.parse(enc);
            }
            //console.log(enc);
            enc = await SEA.decrypt(enc, sharekey);
            if(enc !=null){
                messages.push(enc)
                messages = messages;
                //setTimeout(function(){
                    //updatescrollmessages();
                //}, 100);
                
            }
        }
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

    async function handle_chatmessage(e){
        //console.log(e);
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            //let date = new Date("Wed, 27 July 2016 13:30:00");
            //console.dir(timestamp());
            if(acceschatkey.length == 0){
                console.log("EMPTY KEY");
                return;
            }
            let current = timestamp();
            //console.log(current);
            let enc = await SEA.encrypt(chatmessage, sharekey);
            enc = JSON.stringify(enc);
            enc = window.btoa(enc);
            //console.log(enc)
            gun.get(acceschatkey).get('message').get(current).put(enc);
            //gun.get('chattest').get('2019/06/20:10:10:10.30').put(chatmessage);
            //console.log('You pressed enter! - keypress');
        }
    }
    
    function btnQueryChat(e){
        //console.log('QUERY');
        function qcallback(data,key){
            console.log(data,key)
        }
        if(acceschatkey.length == 0){
            console.log("EMPTY KEY");
            return;
        }
        gun.get(acceschatkey).get('message').get({'.': {'*': '2019/08/'}}).once().map().once(qcallback)
        function qcallback2(data,key){
            console.log(data,key)
        }
        //gun.get('chattest').map().once(qcallback2);
        //gun.get('chattest').get({'.': {'*': '2019/06/'}}).map().once(qcallback2)
    }

    function btnQueryGun(e){
        function qcallback(data,key){
            console.log(data,key)
        }
        //gun.get({'.': {'*': '~@'}}).once(qcallback)
    }

</script>

<style>
    .chatarea{
        height:100%;
        width:100%;
    }
    .chatmessage{
        height:80%;
        width:100%;
        /*background-color: black;*/
        /*overflow: scroll;*/
        overflow-y: scroll;
    }
</style>

<div id="{idcomponent}" class="chatarea">
    <div id="{idchatmessages}" class="chatmessage">
        {#each messages as message}
            <div>{message}</div>
        {/each}
    </div>
    <label>Chat</label> <input bind:value="{chatmessage}" on:keypress={handle_chatmessage} />
    <button on:click={btnQueryChat}>Query Chat</button>
    <ChatAccessComponent accesskey={acceschatkey}></ChatAccessComponent>
    <!--<button on:click={btnQueryGun}>Query Gun</button>-->
</div>
