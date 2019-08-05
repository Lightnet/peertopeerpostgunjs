<script>
    import { onMount, onDestroy } from 'svelte';
    import { gun } from '../../../mjs.js';

    export let publickey ="";
    export let accesskey;
    
    onMount(()=>{
        //onUserNameUnsubscribe();
    });

    onDestroy(()=>{

    });

    async function btnGrantKey(e){
        console.log("btnGrantKey");

        if(publickey.length == 0){
            console.log('EMPTY!');
        }

        let user = gun.user();
        let pair = user._.sea;
        //let genchatkey = Gun.text.random();
        //user.get('chatroom').get(genchatkey).get('pri').put(enc);
        console.log(publickey);
        let to = gun.user(publickey);

        let who = await to.get('alias');
        console.log("who:",who)

        if(who !=null){
            let sec = await user.get('chatroom').get(accesskey).get('pri').then();
            sec = await SEA.decrypt(sec, pair);
            //console.log(sec);
            let pub = await to.get('pub').then();
            let epub = await to.get('epub').then();
            //console.log("pub:",pub);
            //console.log("epub:",epub);
            let dh = await SEA.secret(epub, pair);
            let enc = await SEA.encrypt(sec, dh);
            to.get('chatroom').get(accesskey).get(pub).put('grant');
            user.get('chatroom').get(accesskey).get('member').get(pub).put(enc);
        }else{
            console.log("No Alias!");
        }
    }

    function btnRevokeKey(e){
        console.log("btnRevokeKey");
    }

</script>
<input bind:value={publickey}/>
<button on:click={btnGrantKey}>Grant</button>
<button on:click={btnGrantKey}>Revoke</button>