<script>
    import { onMount, onDestroy, createEventDispatcher} from 'svelte';
    import AccessMainComponent from "./component/access/AccessMainComponent.svelte";
    import { generateId } from './component/helper/generateid.js';

	import { appconfig } from './mjs.js';
	import mjs from './mjs.js';

    let gun;
    let config;
    let idcomponent = generateId(20);
    let elementcontent;
    
    const unsubscribe = appconfig.subscribe(value => {
		//console.log(value);
		config = value;
    });
    
    function resizediv(){
		//console.log("resize");
		if(elementcontent == null){
            return;
        }
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
	}

    onMount(() => {
		elementcontent = document.getElementById(idcomponent);

        if(config.usegunlocal == true){
			gun = Gun({
				peers:['http://localhost:8080' + '/gun'],
				localStorage: false
			});
			console.log("gun client storage");
		}else{
			if(window.location.hostname == 'localhost'){
				console.log("localhost:3000");
				gun = Gun(['http://localhost:8080' + '/gun']);
			}else{
				console.log("url");
				gun = Gun(window.location.origin + '/gun');
			}
		}
		gun.on('hi', peer => {//peer connect
			//console.log('connect peer to',peer);
			//console.log('peer connect!');
		});

		gun.on('bye', (peer)=>{// peer disconnect
			//console.log('disconnected from', peer);
			//console.log('disconnected from peer!');
		});
		//gun.get('mark').put({
			//name: "Mark",
			//email: "mark@gunDB.io",
		//});
		//gun.get('mark').on(function(data, key){
			//console.log("update:", data);
		//});
        mjs.setGun(gun);
        

        resizediv();
		window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
		window.removeEventListener('resize', resizediv);
    });
    

</script>
<style>
    .autoresizediv{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcomponent}" class="autoresizediv">
    <AccessMainComponent></AccessMainComponent>
</div>