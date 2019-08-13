<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    //import { onUserName } from '../../../mjs.js';
    import { generateId } from '../../helper/generateid.js';
    import { gun, timestamp } from '../../../mjs.js';

    const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);
    let elcontent;

    export let forumid;

    let title = "title" + generateId(20);
    let content = "context" + generateId(20);

    onMount(() => {
        //elcontent = document.getElementById(idcomponent);
        //if(forumid == null){
            //return;
        //}
        //console.log("Forum!");
        //resizediv();
		//window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
        //onUserNameUnsubscribe();
    });

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

    function btnSubmit(e){
        let user = gun.user();
        let pair = user._.sea;
        //gun.get('forum').get(forumid).get('member').get(pair.pub).put(enc);
        console.log(forumid);
        console.log(title, content);
        let genboardid = Gun.text.random();
        gun.get('forum')
            .get(forumid)
            .get('board')
            .get(genboardid)
            .put({
                pub:pair.pub,
                title:title,
                content:content,
                date:timestamp()
            });
    }

    function btnCancel(e){
        dispatch('show',false);
    }

</script>
<div id="{idcomponent}">
    Board
    <table>
        <tbody>
            <tr>
                <td>
                    Title:
                </td>
                <td>
                    <input bind:value={title}>
                </td>
            </tr>
            <tr>
                <td>
                    
                </td>
                <td>
                    <textarea bind:value={content}/>
                </td>
            </tr>
        </tbody>
    </table>

    <button on:click={btnSubmit}>Create</button>
    <button on:click={btnCancel}>Cancel</button>

</div>