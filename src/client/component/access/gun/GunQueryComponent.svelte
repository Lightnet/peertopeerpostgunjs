<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName, gun } from '../../../mjs.js';
    //let username = "Guest";

    //const onUserNameUnsubscribe = onUserName.subscribe(value => {
		//console.log(value);
		//username = value;
    //});
    let query = "~@test";
    let result = "test";
    onMount(()=>{

    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
    });

    function BtnQueryOnce(){
      console.log(query);
      gun.get(query).once(function(data, key){//account auth create if exist
        console.log(data,key);
      });
    }

    function BtnQueryMapOnce(){
      console.log(query);
      gun.get(query).map().once(function(data, key){//account auth create if exist
        console.log(data,key);
      });
    }
    //https://gun.eco/docs/RAD#lex
    function BtnRootQueryMap(){
      //console.log(query);
      console.log(gun);
      gun.get({'.':{'*':'~@'}}).map().once((data,key)=>{
        console.log(data,key);
      });

      //gun.get(query).map().once(function(data, key){//account auth create if exist
        //console.log(data,key);
      //});
    }

</script>
<button on:click={BtnQueryOnce}>Query</button>
<button on:click={BtnQueryMapOnce}>Map Query</button> <input bind:value={query}> 
<br><textarea value={result}></textarea>

<br><button on:click={BtnRootQueryMap}>Root Query Map</button>
