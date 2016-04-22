## UnderscoreTheSequel

Combines frequently used underscore.js functions to create useful utilities for validation of js objects and variables.

##### Validating nested object variables.

```javascript
 //given
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
