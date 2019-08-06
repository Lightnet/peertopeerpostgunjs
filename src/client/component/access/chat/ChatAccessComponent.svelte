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
            user.get('chatroom').get(accesskey).get('member').get(pub).put(enc);

            //to.get('chatroom').get(accesskey).get('name').put(accesskey);
        }else{
            console.log("No Alias!");
        }
    }

    async function btnRevokeKey(e){
        console.log("btnRevokeKey");
        if(publickey.length == 0){
            console.log('EMPTY!');
        }
        let user = gun.user();
        let pair = user._.sea;
        let to = gun.user(publickey);
        let who = await to.get('alias');
        console.log("REJECT!",who)
        //who="test";
        if(who !=null){
            console.log("checking..");
            let sec = await user.get('chatroom').get(accesskey).get('pri').then();
            sec = await SEA.decrypt(sec, pair);

            //rekey message?
            //gun.get('chatroom').once().map().once(function(data,key){
            //});

            let pub = await to.get('pub').then();
            let epub = await to.get('epub').then();

            sec = SEA.random(16).toString();
            let enc = await SEA.encrypt(sec, pair);
            user.get('chatroom').get(accesskey).get('pri').put(enc);
            //let dh = await SEA.secret(pair.epub, pair);
            //enc = await SEA.encrypt(sec, dh);
            //user.get('chatroom').get(accesskey).get('member').get(pair.pub).put(enc);

            //rekey user?
            user.get('chatroom').get(accesskey).get('member').once().map().once(async function(mdata,mkey){
              console.log("data",mdata);
              console.log("key",mkey);
              if(mdata !="null"){
                  if(pub != mkey){
                      
                      
                    let muser = gun.user(mkey);
                    let mwho = await muser.get('alias').then();
                    console.log("RESHARE",mwho);
                    let mpub = await muser.get('pub').then();
                    let mepub = await muser.get('epub').then();

                    let dh = await SEA.secret(mepub, pair);
                    let menc = await SEA.encrypt(sec, dh);

                    user.get('chatroom').get(accesskey).get('member').get(mpub).put(menc);

                    console.log("mwho",mwho);
                  }else{
                      let muser = gun.user(mkey);
                      let mwho = await muser.get('alias').then();
                      console.log("REJECT!",mwho);
                  }
              }
            });

            console.log("FINISH!");

            //Revoke SHARE KEY
            user.get('chatroom').get(accesskey).get('member').get(pub).put("null");


        }else{
            console.log("No Alias!");
        }


    }

</script>
<input bind:value={publickey}/>
<button on:click={btnGrantKey}>Grant</button>
<button on:click={btnRevokeKey}>Revoke</button>