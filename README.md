## UnderscoreTheSequel

Combines frequently used underscore.js functions to create useful utilities for validation of js objects and variables.

##### Validating nested object variables.  

```javascript  
 /* given */
let obj = {
   aaa: {
     bbb: {
       ccc: "abc"
     }
   }
 };
```  

```javascript
 _II.hasKey(obj, 'aaa.bbb.ccc');
 => true
 
 _II.hasKey(obj, 'aaa.xxx.ccc');
 => false
 
 _II.hasKeys(obj, ['aaa', 'aaa.bbb', 'aaa.bbb.ccc']);
 => true
```  

##### Getting nested object variables (without errors)  

```javascript
 /* given */
 var user = {
   id: 1,
   info: {
     list: ["one", "two", "three"],
     contact: {
       email: "person@legit.com"
     }
   }
 };
 ```
 
 ```javascript
 _II.getArray(user, 'info.list');
 => ["one", "two", "three"]
 
 /* wrong path */
 _II.getArray(user, 'info.otherInfo.something.lists');
 => []
 
 /* valid path, wrong type */
 _II.getString(user, 'info.list');
 => ""
 
 /* using a fallback value */
 _II.getStringOrElse({}, 'info.contact.email', 'bad.email@forjerks.com');
 => "bad.email@forjerks.com"
 ```  
 
##### Getting nested object variables (_with_ errors)  
 
 ```javascript
 _II.strict.getArray(user, 'info.otherInfo.something.lists');
 => Uncaught Error: (_II ERROR) Failed get on Object {id:_, info..} for keystring(info.otherInfo.something.lists) Found(info)(…)
 ```
