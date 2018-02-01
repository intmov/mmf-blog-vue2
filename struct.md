## 数据结构
```javascript

// User
var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

// Activity
var ActivitySchema = new Schema({
	name: String,
	create_date: String,
	is_active: Number,
})

// 
```


