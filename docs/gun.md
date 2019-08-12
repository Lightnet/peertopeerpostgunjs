





```javascript



```

```javascript



```


```javascript



```


```javascript
import Gun from 'gun/gun'
import Sea from 'gun/sea'  // eslint-disable-line no-unused-vars
import Axe from 'gun/axe'

export default Gun({
  localStorage: true,
  radisk: true,
  peers: ['http://localhost:8765/gun']
})


```



```javascript

user.auth(user.is.alias, oldpassphrase, (ack) => {//user auth call1
    let status = ack.err || "Saved!";//check if there error else saved message.
    console.log(status);
}, {change: newpassphrase});//set config to change password

```




```javascript
gun.on('auth',ack=>{
    console.log('auth');
    console.log(ack);
    console.log(ack.sea.pub);//public key
    console.log(ack.soul);//user id
});

```


```javascript
;USE(function(module){
        // request / response module, for asking and acking messages.
        USE('./onto'); // depends upon onto!
        module.exports = function ask(cb, as){
            if(!this.on){ return }
            if(!(cb instanceof Function)){
                if(!cb || !as){ return }
                var id = cb['#'] || cb, tmp = (this.tag||empty)[id];
                if(!tmp){ return }
                tmp = this.on(id, as);
                clearTimeout(tmp.err);
                return true;
            }
            var id = (as && as['#']) || Math.random().toString(36).slice(2);
            if(!cb){ return id }
            var to = this.on(id, cb, as);
            to.err = to.err || setTimeout(function(){
                to.next({err: "Error: No ACK received yet.", lack: true});
                to.off();
            }, (this.opt||{}).lack || 9000);
            return id;
        }
    })(USE, './ask');
```

pub = ~uiaBAzqXPAY27e-X0fDG0Ygq472pw3Yz2w_gPXMm2Eo.FnYs25HZ_jQ-2F_Fnmh7thqACIqZEfjU4FBIvQssgcM
jz0fe1cvclXNPxUOhVL3~uiaBAzqXPAY27e-X0fDG0Ygq472pw3Yz2w_gPXMm2Eo.FnYs25HZ_jQ-2F_Fnmh7thqACIqZEfjU4FBIvQssgcM.
jz0fe1cw01aGA6Er90sLVxE~uiaBAzqXPAY27e-X0fDG0Ygq472pw3Yz2w_gPXMm2Eo.FnYs25HZ_jQ-2F_Fnmh7thqACIqZEfjU4FBIvQssgcM.

```
gun.user().back('opt').uuid()
```

```
what exactly No ack, lack error indicating for?
it means the storage engine did not ACK that data was saved within the 9 second default timeout.
```
