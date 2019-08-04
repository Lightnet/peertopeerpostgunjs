
# links: 
 * https://gun.eco/docs/RAD#lex

```html
	<script src="https://cdn.jsdelivr.net/npm/gun/lib/radix.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/lib/radisk.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/lib/store.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/lib/rindexed.js"></script>
```

```javascript
	function timestamp(){
        let currentDate = new Date();
        //console.log(currentDate);
        let year = currentDate.getFullYear();
        
        let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2); 
        let date = ("0" +currentDate.getDate()).slice(-2); 
        
        let hour = ("0" +currentDate.getHours()).slice(-2);
        let minute = ("0" +currentDate.getMinutes()).slice(-2);
        let second = ("0" +currentDate.getSeconds()).slice(-2);
        let millisecond = currentDate.getMilliseconds();
        return year + "/" + (month) + "/" + date + ":" + hour+ ":" + minute+ ":" + second+ ":" + millisecond;        
    }
	
	function handle_chatmessage(e){
        //console.log(e);
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            let current = timestamp();
            console.log(current);
            gun.get('chattest').get(current).put(chatmessage);
            //gun.get('chattest').get('2019/06/20:10:10:10.30').put(chatmessage);
        }
    }
	
	function btnQueryChat(e){
        //console.log('QUERY');
        function qcallback(data,key){
            console.log(data,key)
        }
        gun.get('chattest').get({'.': {'*': '2019/08/'}}).once().map().once(qcallback)
        function qcallback2(data,key){
            console.log(data,key)
        }
        //gun.get('chattest').map().once(qcallback2);
        //gun.get('chattest').get({'.': {'*': '2019/06/'}}).map().once(qcallback2)
    }
```