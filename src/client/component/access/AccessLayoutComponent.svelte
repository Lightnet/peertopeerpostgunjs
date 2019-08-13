<script>
    import { onMount, onDestroy } from 'svelte';
    //import LoginComponent from "./account/LoginComponent.svelte";
    //import ForgotComponent from "./account/ForgotComponent.svelte";

    import AccountComponent from "./account/AccountComponent.svelte";
    import LogoutComponent from "./account/LogoutComponent.svelte";
    //import AdminComponent from "./admin/AdminComponent.svelte";
    //import MessagesComponent from "./messages/MessagesComponent.svelte";

    import ForumComponent from "./forum/ForumMainComponent.svelte";
    //import ChatMainComponent from "./chat/ChatMainComponent.svelte";

    //import DatabaseComponent from "./database/DatabaseComponent.svelte";
    import TestAreaComponent from "./gun/TestAreaComponent.svelte";

    //import AccessNavigationComponent from "./AccessNavigationComponent.svelte";

    import { generateId } from '../helper/generateid.js';
    import { gun, onLogin } from '../../mjs.js';
    import mjs from '../../mjs.js';

    let idcomponent = generateId(20);
    let elcomponent;
    let idnav = generateId(20);
    let elnav;
    let idcontext = generateId(20);
    let elcontext;

    let blogin = false;
    let bforgot = false;
    export let navmenus = [];
    let accessview;
    accessview = AccountComponent;
    //accessview = MessagesComponent;
    //accessview = DatabaseComponent;
    //accessview = ChatMainComponent;
    //accessview = ForumComponent;
    accessview = TestAreaComponent;

    const LoginuUsub = onLogin.subscribe(value => {
        //console.log("login",value);
		blogin = value;
    });
    
    function handle_accessmain_resizediv(){
        //idcomponent
        if(elcomponent ==null){
            elcomponent = document.getElementById(idcomponent);
        }
        if(elnav ==null){
            elnav = document.getElementById(idnav);
        }
        if(elcontext ==null){
            elcontext = document.getElementById(idcontext);
        }
        if(elcontext !=null){
            let parent = elcomponent.parentNode;
            let h = parent.clientHeight;
            //elcontext.style.height= (h - 22) + 'px';
            elcontext.style.height= (h - 22) + 'px';
        }
    }

    onMount(() => {
        //console.log("mount")
        elcomponent = document.getElementById(idcomponent);
        elnav = document.getElementById(idnav);
        elcontext = document.getElementById(idcontext);
        window.addEventListener('resize',handle_accessmain_resizediv);
    });

    onDestroy(() => {
       LoginuUsub();
       window.removeEventListener('resize',handle_accessmain_resizediv);
    });

    function h_event(e){
        //console.log(e);
        if(e.detail != null){
            if(e.detail.action !=null){
                if(e.detail.action == "forgot"){
                    bforgot=true;
                }
                if(e.detail.action == "forgotclose"){
                    bforgot=false;
                }
            }
        }
    };

    function h_context(e){
        //console.log(e);
        accessview=e;
    };

    function hevent(e){
        //console.log(e);
        for(let i=0;i<navmenus.length;i++){
            if(navmenus[i].context == e.detail){
                accessview = navmenus[i].comp;
                break;
            }
        }
    }
</script>

<style>
    .access_submenu{
        height:22px;
        width:100%;
    }
    .accesslayout{
        height:100%;
        width:100%;
    }
    .accesslayoutcontext{
        height:100%;
        width:100%;
    }
</style>

<div id={idcomponent} class="accesslayout">
    <div id="{idnav}" class="access_submenu">
        {#each navmenus as menu}    
            <button class="{menu.comp == accessview ? 'active' : ''}"  on:click="{()=>h_context(menu.comp)}">{menu.name} </button>
        {/each}
    </div>
    <div id="{idcontext}" class="accesslayoutcontext">
        {#if accessview !=null}
            <svelte:component this={accessview} on:hevent={hevent}/>
        {/if}
    </div>
</div>