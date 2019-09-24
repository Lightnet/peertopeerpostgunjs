<script>
    import { onMount, onDestroy } from 'svelte';
    import { generateId } from '../../helper/generateid.js';
    import { onPub } from '../../../mjs.js';

    let publickey = generateId(20);
    let idpublickey = generateId(20);
    let pub = "";
    let inputwidthsize = 104;
    let inputwidth = 104;
    let binputwidth = true;

    const onPubUnsubscribe = onPub.subscribe(value => {
		  //console.log(value);
		  pub = value;
	  });

    onDestroy(()=>{
        onPubUnsubscribe();
        pub=null;
        publickey=null;
    });

    function copykey(){
      let CodeToCopy = document.getElementById(publickey);
      CodeToCopy.select();
      document.execCommand('copy');
      console.log(publickey);
      navigator.clipboard.writeText(pub);
    }

  function btntogglepublickey(){
    if(binputwidth){
      binputwidth = false;
      inputwidthsize = 1;
    }else{
      binputwidth = true;
      inputwidthsize = inputwidth;
    }
  }

</script>
<style>
  label{
    height:22px;
  }
</style>
<label><button id="{idpublickey}" on:click={btntogglepublickey}>Public Key: </button> 
<input 
id="{publickey}" 
bind:value={pub}
size="{inputwidthsize}"
readonly>
</label>
<button on:click={copykey}>Copy</button>