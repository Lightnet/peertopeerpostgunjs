<script>
    import { onMount, onDestroy } from 'svelte';
    import AutoSizeDivComponent from "../base/AutoSizeDivComponent.svelte";
    import LoginComponent from "./account/LoginComponent.svelte";
    import ForgotComponent from "./account/ForgotComponent.svelte";

    import AccountComponent from "./account/AccountComponent.svelte";
    import LogoutComponent from "./account/LogoutComponent.svelte";
    import AdminComponent from "./admin/AdminComponent.svelte";
    import MessagesComponent from "./messages/MessagesComponent.svelte";

    import ForumComponent from "./forum/ForumMainComponent.svelte";
    import ChatMainComponent from "./chat/ChatMainComponent.svelte";

    import DatabaseComponent from "./database/DatabaseComponent.svelte";
    import TestAreaComponent from "./gun/TestAreaComponent.svelte";

    import AccessNavigationComponent from "./AccessNavigationComponent.svelte";

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
    let navmenus = [];
    let accessview = AccountComponent;
    //accessview = MessagesComponent;
    //accessview = DatabaseComponent;
    //accessview = ChatMainComponent;
    accessview = ForumComponent;

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
        let parent = elcomponent.parentNode;
        console.log(elcomponent);
        console.dir(elcomponent);
        let h = parent.clientHeight;
        //let navh = elnav.clientHeight;
        console.log(h)
        console.log(elcontext);
        elcontext.style.height= (h - 44) + 'px';
    }

    onMount(() => {
        //console.log("mount")
        elcomponent = document.getElementById(idcomponent);
        elnav = document.getElementById(idnav);
        elcontext = document.getElementById(idcontext);


        navmenus.push({name:"Test Area",context:"testarea",comp:TestAreaComponent});
        navmenus.push({name:"Account",context:"account",comp:AccountComponent});
        navmenus.push({name:"Messages",context:"messages",comp:MessagesComponent});
        navmenus.push({name:"Chat",context:"chat",comp:ChatMainComponent});
        navmenus.push({name:"Forum",context:"forum",comp:ForumComponent});
        navmenus.push({name:"Database",context:"database",comp:DatabaseComponent});
        navmenus.push({name:"Admin",context:"admin",comp:AdminComponent});
        navmenus.push({name:"Logout",context:"logout",comp:LogoutComponent});

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
    .access_navmenu{
        height:22px;
        width:100%;
    }
</style>

<div id={idcomponent}>
    {#if blogin}
        <AccessNavigationComponent></AccessNavigationComponent>
        <div id="{idnav}" class="access_navmenu">
            {#each navmenus as menu}    
                <button class="{menu.comp == accessview ? 'active' : ''}"  on:click="{()=>h_context(menu.comp)}">{menu.name} </button>
            {/each}
        </div>
        <div id="{idcontext}">
            {#if accessview !=null}
                <svelte:component this={accessview} on:hevent={hevent}/>
            {/if}
        </div>
    {:else}
        {#if bforgot}
            <ForgotComponent on:hevent={h_event}></ForgotComponent>
        {:else}
            <LoginComponent on:hevent={h_event}></LoginComponent>
        {/if}
    {/if}
</div>