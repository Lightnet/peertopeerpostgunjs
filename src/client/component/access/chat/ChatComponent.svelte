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
    import { gun, pair } from '../../../mjs.js';

    let idcomponent = generateId(20);
    let elcontent;
    let idchatmessages = generateId(20);
    let elchatmessages;
    let chatmessage = "test";

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
    onMount(() => {
        elcontent = document.getElementById(idcomponent);
        elchatmessages = document.getElementById(idchatmessages);

        resizediv();
		window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
        window.removeEventListener('resize', resizediv);
    });

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

    function handle_chatmessage(e){
        //console.log(e);
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            //let date = new Date("Wed, 27 July 2016 13:30:00");
            //console.dir(timestamp());
            let current = timestamp();
            console.log(current);
            gun.get('chattest').get(current).put(chatmessage);
            //gun.get('chattest').get('2019/06/20:10:10:10.30').put(chatmessage);
            //console.log('You pressed enter! - keypress');
        }

    }
    function btnQueryChat(e){
        //console.log('QUERY');
        function qcallback(data,key){
            console.log(data,key)
        }
        gun.get('chattest').get({'.': {'*': '2019/08/'}}).once().map().once(qcallback)
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
        gun.get({'.': {'*': '~@'}}).once(qcallback)
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
        background-color: black;
        overflow: scroll;
    }
</style>

<div id="{idcomponent}" class="chatarea">
    <div id="{idchatmessages}" class="chatmessage">
    
    </div>
    <label>Chat</label> <input bind:value="{chatmessage}" on:keypress={handle_chatmessage} />
    <button on:click={btnQueryChat}>Query</button>
    <button on:click={btnQueryGun}>Query Gun</button>
</div>
