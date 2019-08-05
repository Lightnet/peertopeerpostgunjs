<script>
    //https://gun.eco/docs/RAD#lex
    /*
        * Note that date stamp has to be fixed filter to query time.
        '2019/06/20:10:10:10.30' <- correct format
        '2019/6/20:10:10:10.30'  <- incorrect format `2019/6` will error that need to match reg.
    */
    import { onMount, onDestroy } from 'svelte';
    //import ModalComponent from "../../base/ModalComponent.svelte";
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';

    
    let idcomponent = generateId(20);
    let elcontent;
    //let idchatmessages = generateId(20);
    //let elchatmessages;
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
        //elchatmessages.style.height = parent.clientHeight - 44 - 22 - 22 + 'px';
        elcontent.style.height = parent.clientHeight - 44 + 'px';
        elcontent.style.width = parent.clientWidth + 'px';
    }
    onMount(() => {
        elcontent = document.getElementById(idcomponent);
        //elchatmessages = document.getElementById(idchatmessages);

        resizediv();
		window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
        window.removeEventListener('resize', resizediv);
    });

</script>

<style>

</style>

<div id="{idcomponent}">

    <button> Public </button>
    <button> Private </button>


</div>
