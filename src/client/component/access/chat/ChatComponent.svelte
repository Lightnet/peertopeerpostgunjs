<script>
    //https://gun.eco/docs/RAD#lex
    /*
        * Note that date stamp has to be fixed filter to query time.
        '2019/06/20:10:10:10.30' <- correct format
        '2019/6/20:10:10:10.30'  <- incorrect format `2019/6` will error that need to match reg.
    */
    import { onMount, onDestroy } from 'svelte';
    import ModalComponent from "../../base/ModalComponent.svelte";
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

        //user.get('chatroom').get(acceschatkey).put(enc);
        user = gun.user();
        pair = user._.sea;
        let sec = await user.get('chatroom').get(acceschatkey).then();
        console.log(sec);
        sec = await SEA.decrypt(sec, pair);
        console.log(sec);
        sharekey = sec;

        console.log(sharekey);

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

        resizediv();
		window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
        window.removeEventListener('resize', resizediv);
        gunchat.off();//turn off
    });

    function updatescrollmessages(){
        if(elchatmessages !=null){
            return;
        }
        elchatmessages.scrollTop = elchatmessages.scrollHeight;
    }

    async function handle_messages(data,key){
        //console.log(data);
        //console.log(key);
        if(data !=null){
            let enc = window.atob(data);
            enc = JSON.parse(enc);
            console.log(enc);

            enc = await SEA.decrypt(enc, sharekey);
            if(enc !=null){
                messages.push(enc)
                messages = messages;
                updatescrollmessages();
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
            console.log(current);
            let enc = await SEA.encrypt(chatmessage, sharekey);
            enc = JSON.stringify(enc);
            enc = window.btoa(enc);
            console.log(enc)
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
    <!--<button on:click={btnQueryGun}>Query Gun</button>-->
</div>
