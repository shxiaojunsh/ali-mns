# ali-mns (ali-mqs)
[![npm version](https://badge.fury.io/js/ali-mns.svg)](http://badge.fury.io/js/ali-mns)


这是从https://github.com/shxiaojunsh/ali-mns演进而来，并且为了能成功在npmjs发布一个没有任何安全漏洞的包因此更改了名字(ali-mns-plus)

注意: 建议安装node16.18.0(https://nodejs.org/download/release/v16.18.0/)以便成功执行npm install

阿里云消息服务(MNS)nodejs软开发包

[AliYun-MNS.en-US.README](http://armclr.azurewebsites.net/Links/AliMNS?lang=en-US)

阿里云消息服务是由阿里云提供的一种消息队列服务中间件.
淘宝网www.taobao.com本身也使用了这种技术.

访问阿里云消息服务的官方网站 [http://www.aliyun.com/product/mns](http://www.aliyun.com/product/mns) 以了解更多有关阿里云消息服务的详情.

2015年6月,阿里云使用了新名称Ali-MSN替代了旧的Ali-MQS.
了解如何从旧的版本升级,请访问 [Migrate](#migrate).

# 快速开始
使用'npm install ali-mns'来进行安装.

```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
    var mq = new AliMNS.MQ("<your-mq-name>", account, "hangzhou");
    // send message
    mq.sendP("Hello ali-mns").then(console.log, console.error);
```
更多示例代码可以参考[GitHub](https://github.com/shxiaojunsh/ali-mns/tree/master/test).

# Promised
ali-mns使用 [promise](https://www.npmjs.org/package/promise) 模式.
所有后缀'P'的方法都会返回一个promise对象.

# Typescript
如果仅仅只是打算使用它,放心忽略本小节内容.

绝大多数源代码都用typescript写成,访问 [http://www.typescriptlang.org/](http://www.typescriptlang.org/) 获取更多typescript的知识.

如果你对源代码感兴趣,访问GitHub [https://github.com/shxiaojunsh/ali-mns](https://github.com/shxiaojunsh/ali-mns)

克隆源代后,使用`gulp`来编译.ts文件.

# API参考
<table>
    <tr>
        <th>类型</th>
        <th>方法</th>
        <th>简述</th>
    </tr>
    <tr>
        <td rowspan="6">[Account](#accountaccountidstring-keyidstring-keysecretstring)</td>
        <td colspan="2">*Account*类用于存储你的阿里云帐号信息.</td>
    </tr>
    <tr>
        <td>[getAccountId](#accountgetaccountid)</td>
        <td>返回阿里云帐号id.</td>
    </tr>
    <tr>
        <td>[getOwnerId](#accountgetownerid)</td>
        <td>和account.getAccountId()功能相同. 为了向下兼容v1.x版本.</td>
    </tr>
    <tr>
        <td>[getKeyId](#accountgetkeyid)</td>
        <td>返回阿里钥id.</td>
    </tr>
    <tr>
        <td>[getGA](#accountgetga--accountsetgabgaboolean)</td>
        <td>获取Google数据收集状态.</td>
    </tr>
    <tr>
        <td>[setGA](#accountgetga--accountsetgabgaboolean)</td>
        <td>设置Google数据收集状态.</td>
    </tr>
    <tr>
        <td>[getHttps](#accountgethttps--accountsethttpsbhttpsboolean)</td>
        <td>获取使用的是http还是https协议.</td>
    </tr>
    <tr>
        <td>[setHttps](#accountgethttps--accountsethttpsbhttpsboolean)</td>
        <td>设置使用http还是https协议.</td>
    </tr>
    <tr>
        <td rowspan="2">[Region](#regioncitystringcity-networkstringnetworktype-zonestringzone)</td>
        <td colspan="2">类*Region*帮助指定数据中心.</td>
    </tr>
    <tr>
        <td>[toString](#regiontostring)</td>
        <td>转换为字符串的形式.</td>
    </tr>
    <tr>
        <td rowspan="4">[MNS](#mnsaccountaccount-regionstringregion)<br/>[MQS](#mqsaccountaccount-regionstringregion)<br/>[MNSTopic](#mnstopicaccountaccount-regionstringregion)</td>
        <td colspan="2">*MNS*类用于操作mns队列. *MQS*和*MNS*相同.为了向下兼容v1.x版本.</td>
    </tr>
    <tr>
        <td>[listP](#mnslistpprefixstring-pagesizenumber-pagemarkerstring)</td>
        <td>列出一个数据中心里的所有队列.</td>
    </tr>
    <tr>
        <td>[createP](#mnscreatepnamestring-optionsany)</td>
        <td>创建一个队列.</td>
    </tr>
    <tr>
        <td>[deleteP](#mnsdeletepnamestring)</td>
        <td>删除一个队列.</td>
    </tr>
    <tr>
        <td rowspan="15">[MQ](#mqnamestring-accountaccount-regionstringregion)<br/>[MQBatch](#mqbatch)</td>
        <td colspan="2">*MQ*操作队列中的消息.</td>
    </tr>
    <tr>
        <td>[getName](#mqgetname)</td>
        <td>获取队列名称.</td>
    </tr>
    <tr>
        <td>[getAccount](#mqgetaccount)</td>
        <td>获取队列帐号.</td>
    </tr>
    <tr>
        <td>[getRegion](#mqgetregion)</td>
        <td>获取队列位置.</td>
    </tr>
    <tr>
        <td>[sendP](#mqsendpmsgstring-prioritynumber-delaysecondsnumber)</td>
        <td>向队列中发送一个消息.</td>
    </tr>
    <tr>
        <td>[getRecvTolerance](#mqgetrecvtolerance--mqsetrecvtolerancevaluenumber)</td>
        <td>获取mq.recvP方法的容忍秒数.</td>
    </tr>
    <tr>
        <td>[setRecvTolerance](#mqgetrecvtolerance--mqsetrecvtolerancevaluenumber)</td>
        <td>设置mq.recvP方法的容忍秒数.</td>
    </tr>
    <tr>
        <td>[recvP](#mqrecvpwaitsecondsnumber)</td>
        <td>从队列中接收消息.</td>
    </tr>
    <tr>
        <td>[peekP](#mqpeekp)</td>
        <td>查探消息.</td>
    </tr>
    <tr>
        <td>[deleteP](#mqdeletepreceipthandlestring)</td>
        <td>删除消息.</td>
    </tr>
    <tr>
        <td>[reserveP](#mqreservepreceipthandlestring-reservesecondsnumber)</td>
        <td>保留一个消息.</td>
    </tr>
    <tr>
        <td>[notifyRecv](#mqnotifyrecvcbexerror-msganyboolean-waitsecondsnumber)</td>
        <td>注册一个回调函数来接收消息.</td>
    </tr>
    <tr>
        <td>[notifyStopP](#mqnotifystopp)</td>
        <td>停止mq.notifyRecv.</td>
    </tr>
    <tr>
        <td>[getAttrsP](#mqgetattrsp)</td>
        <td>获取队列的属性.</td>
    </tr>
    <tr>
        <td>[setAttrsP](#mqsetattrspoptionsany)</td>
        <td>修改队列的属性.</td>
    </tr>
    <tr>
        <td rowspan="6">[MQBatch](#mqbatch)</td>
        <td colspan="2">批量消息队列</td>
    </tr>
    <tr>
        <td>[sendP](#mqbatchsendpmsgstring--array-prioritynumber-delaysecondsnumber)</td>
        <td>发送一条消息或一批消息.</td>
    </tr>
    <tr>
        <td>[recvP](#mqbatchrecvpwaitsecondsnumber-numofmessagesnumber)</td>
        <td>接收一条或者一批消息.</td>
    </tr>
    <tr>
        <td>[peekP](#mqbatchpeekpnumofmessagesnumber)</td>
        <td>查探一条或者一批消息.</td>
    </tr>
    <tr>
        <td>[deleteP](#mqbatchdeletepreceipthandlestring--array)</td>
        <td>删除一条或一批消息.</td>
    </tr>
    <tr>
        <td>[notifyRecv](#mqbatchnotifyrecvcbexerror-msganyboolean-waitsecondsnumber-numofmessagesnumber)</td>
        <td>注册一个回调函数来接收消息,支持批量模式.</td>
    </tr>
    <tr>
        <td rowspan="4">[Msg](#msgmsg-string-prioritynumber-delaysecondsnumber)</td>
        <td colspan="2">简单消息定义,用于MQBatch类.</td>
    </tr>
    <tr>
        <td>[getMsg](#msggetmsg)</td>
        <td>返回消息内容.</td>
    </tr>
    <tr>
        <td>[getPriority](#msggetpriority)</td>
        <td>返回消息优先级.</td>
    </tr>
    <tr>
        <td>[getDelaySeconds](#msggetdelayseconds)</td>
        <td>返回消息延迟可见秒数.</td>
    </tr>
    <tr>
        <td rowspan="4">[MNSTopic](#mnstopicaccountaccount-regionstringregion)</td>
        <td colspan="2">MNSTopic扩展自MNS,它提供了基于主题模型的消息功能.</td>
    </tr>
    <tr>
        <td>[listTopicP](#mnslisttopicpprefixstring-pagesizenumber-pagemarkerstring)</td>
        <td>列出所有的主题.</td>
    </tr>
    <tr>
        <td>[createTopicP](#mnscreatetopicpnamestring-optionsany)</td>
        <td>创建一个主题.</td>
    </tr>
    <tr>
        <td>[deleteTopicP](#mnsdeletetopicpnamestring)</td>
        <td>删除一个主题.</td>
    </tr>
    <tr>
        <td rowspan="10">[Topic](#topicnamestring-accountaccount-regionstringregion)</td>
        <td colspan="2">操控主题</td>
    </tr>
    <tr>
        <td>[getName](#topicgetname)</td>
        <td>获取主题名称.</td>
    </tr>
    <tr>
        <td>[getAccount](#topicgetaccount)</td>
        <td>获取主题帐号.</td>
    </tr>
    <tr>
        <td>[getRegion](#topicgetregion)</td>
        <td>获取主题位置.</td>
    </tr>
    <tr>
        <td>[getAttrsP](#topicgetattrsp--topicsetattrspoptionsany)</td>
        <td>获取主题属性.</td>
    </tr>
    <tr>
        <td>[setAttrsP](#topicgetattrsp--topicsetattrspoptionsany)</td>
        <td>设置主题属性.</td>
    </tr>
    <tr>
        <td>[listP](#topiclistpprefixstring-pagesizenumber-pagemarkerstring)</td>
        <td>列出主题的所有订阅.</td>
    </tr>
    <tr>
        <td>[subscribeP](#topicsubscribepnamestring-endpointstring-notifystrategystring-notifycontentformatstring-filtertagstring)</td>
        <td>订阅一个主题.</td>
    </tr>
    <tr>
        <td>[unsubscribeP](#topicunsubscribepnamestring)</td>
        <td>取消对一个主题的订阅.</td>
    </tr>
    <tr>
        <td>[publishP](#topicpublishpmsgstring-b64boolean-tagstring-attrsany-optionsany)</td>
        <td>向主题中发布一个消息.</td>
    </tr>
    <tr>
        <td rowspan="7">[Subscription](#subscriptionnamestring-topictopic)</td>
        <td colspan="2">操控一个订阅.</td>
    </tr>
    <tr>
        <td>[getName](#subscriptiongetname)</td>
        <td>获取订阅的名称.</td>
    </tr>
    <tr>
        <td>[getTopic](#subscriptiongettopic)</td>
        <td>获取订阅相关的主題.</td>
    </tr>
    <tr>
        <td>[getAttrsP](#subscriptiongetattrsp--subscriptionsetattrspoptionsany)</td>
        <td>获取订阅的属性.</td>
    </tr>
    <tr>
        <td>[setAttrsP](#subscriptiongetattrsp--subscriptionsetattrspoptionsany)</td>
        <td>设置订阅的属性.</td>
    </tr>
    <tr>
        <td>[NotifyStrategy](#subscriptionnotifystrategy)</td>
        <td>通知策略.</td>
    </tr>
    <tr>
        <td>[NotifyContentFormat](#subscriptionnotifycontentformat)</td>
        <td>通知内容格式.</td>
    </tr>
<table>


## Account(accountId:string, keyId:string, keySecret:string)
*Account*类用于存储你的阿里云帐号信息.创建一个帐号对象很简单:

accountId: String, 阿里云帐号id.

keyId: String, 阿里云钥id.

keySecret: String, 阿里云密钥.
```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-owner-id>", "<your-key-id>", "<your-key-secret>");
```
帐号对象通常作为参数被传递给其它类的对象如*MNS*, *MQ*

猛戳[这里](https://ak-console.aliyun.com/#/accesskey)找到你的阿里云帐号.

## account.getAccountId()
返回阿里云帐号id.

## account.getOwnerId()
和account.getAccountId()功能相同. 为了向下兼容v1.x版本.

## account.getKeyId()
返回阿里钥id.

## account.getGA() & account.setGA(bGA:boolean)
获取或设置Google Analytics数据收集状态.
设置`bGA`为`true`允许Google数据收集,设置`false`禁用Google数据收集.
参见[私隐策略](#privacy-policy).

## account.getHttps() & account.setHttps(bHttps:boolean)
获取或设置使用`http`还是`https`协议.
设置`bHttps`为`true`使用`https`协议,设置`false`使用`http`协议.
默认为`false`使用`http`协议.

## Region(city?:string|City, network?:string|NetworkType, zone?:string|Zone)
类*Region*帮助指定数据中心.

city: String | City, optional. 可以是数据中心的名称,如"hangzhou", "beijing" or "west-1", "southeast-2";
或者是预先定义的城市,如`AliMNS.City.Beijing`, `AliMNS.City.Tokyo`, 完整的列表请查看[Region.ts#L169-L188](ts/Region.ts#L169-L188).
缺省为"hangzhou".

network: String | NetworkType, optional.
如果是字符串,应当是""(空字符串)或"-internal"或"-internal-vpc".
如果是[NetworkType](ts/Region.ts#L144-L148)枚举,应当是`AliMNS.NetworkType.Public`或`AliMNS.NetworkType.Internal`或`AliMNS.NetworkType.VPC`.
缺省为""(空字符串),代表`AliMNS.NetworkType.Public`网络.

zone: String | Zone, optional.
如果是字符串,应当是数据中心区域缩写,如"cn", "us", "eu", "me" or "ap".
如果是[Zone](ts/Region.ts#L150-L156)枚举,应当是`AliMNS.Zone.China`, `AliMNS.Zone.AsiaPacific`, `AliMNS.Zone.Europe`, `AliMNS.Zone.UniteState`或`AliMNS.Zone.MiddleEast`.
缺省为"cn",表示`AliMNS.Zone.China`.
如果city参数是一个预先定义的城市枚举,那么这个参数会被忽略掉,因为我们可以从城市推导出数据中心区域.

示例
```javascript
// because hangzhou is the default value.
var regionHangzhou = new AliMNS.Region(); 

// beijing public network in china
var regionBeijing = new AliMNS.Region("beijing");
regionBeijing = new AliMNS.Region(AliMNS.City.Beijing);
regionBeijing = new AliMNS.Region("beijing", "");
regionBeijing = new AliMNS.Region("beijing", AliMNS.NetworkType.Public);
regionBeijing = new AliMNS.Region("beijing", "", "cn");

// east asia in internal network
var regionJapan = new AliMNS.Region(AliMNS.City.Japan, AliMNS.NetworkType.Internal);
regionJapan = new AliMNS.Region("northeast-1", AliMNS.NetworkType.Internal, "ap");
regionJapan = new AliMNS.Region("northeast-1", "-internal", "ap");

// south asia in vpc network
var regionSingapore = new AliMNS.Region(AliMNS.City.Singapore, AliMNS.NetworkType.VPC);
regionSingapore = new AliMNS.Region(AliMNS.City.Singapore, "-internal-vpc");
regionSingapore = new AliMNS.Region("southeast-1", "-internal-vpc", AliMNS.Zone.AsiaPacific);
regionSingapore = new AliMNS.Region("southeast-1", "-internal-vpc", "ap");
```

## region.toString()
转换为字符串的形式.

## MNS(account:Account, region?:string|Region)
*MNS*类用于操作mns队列.

account: 阿里云帐号对象.

region: String|Region, optional. 如果是字符串可能的取值为"hangzhou", "beijing" or "qingdao",或其它位于中国地区的数据中心所在城市名称.
如果是Region类型,允许指定中国以外的数据中心.
缺省为"hangzhou".也可以是带有"-internal"后缀的内网形式,如"hangzhou-internal", "beijing-internal" or "qingdao-internal-vpc".
```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
    var mns = new AliMNS.MNS(account, "hangzhou");
    // or
    var regionJapan = new AliMNS.Region(AliMNS.City.Japan, AliMNS.NetworkType.Public);
    var mnsJapan = new AliMNS.MNS(account, regionJapan);
```

## MQS(account:Account, region?:string|Region)
和MNS相同.为了向下兼容v1.x版本.

## mns.listP(prefix?:string, pageSize?:number, pageMarker?:string)
列出一个数据中心里的所有队列.

prefix: String, optional. 只返回带有此前缀的队列.

pageSize: number, optional. 每页返回多少队列,1~1000,缺省1000.

pageMarker: String, optional. 填入上一次请求中返回的值,来请求下一页.
```javascript
    mns.listP("my", 20).then(function(data){
        console.log(data);
        return mns.listP("my", 20, data.Queues.NextMarker);
    }).then(function(dataP2){
        console.log(dataP2);
    }, console.error);
```

## mns.createP(name:string, <a name="options">options</a>?:any)
创建一个队列.

name: String. 队列名称.

options: optional. 队列属性.

options.DelaySeconds: number. 消息被发送后经过多少秒才可见.0~604800(7天),缺省0.

options.MaximumMessageSize: number. 消息最大可以是多少字节.1024(1k)~65536, 缺省是65536(64k).

options.MessageRetentionPeriod: number. 消息最久可以生存多少秒, 60~129600(15天),缺省是345600(4天).

optiions.VisibilityTimeout: number. 消息被接收后,保持多少秒不可见,1~43200(12小时).

options.PollingWaitSeconds: numer. 当消息队列为空时,接收请求最多等待多少秒,0~30,缺省是0.
```javascript
    mns.createP("myAliMQ", {
        DelaySeconds: 0,
        MaximumMessageSize: 65536,
        MessageRetentionPeriod: 345600,
        VisibilityTimeout: 30,
        PollingWaitSeconds: 0
    }).then(console.log, console.error);
```
如果一个同名队列已经存在,且调用createP方法的所有属性都和现有队列相同,那么调用会返回成功.
任何一个属性不同,会报告"QueueAlreadyExist"(队列已经存在)错误.

## mns.deleteP(name:string)
删除一个队列.

name: String. 队列名称.
```javascript
    mns.deleteP("myAliMQ").then(console.log, console.error);
```

## MQ(name:string, account:Account, region?:string|Region)
*MQ*操作队列中的消息.

name: String. 队列名称.

account: 帐号对象.

region: String|Region, optional. 如果是字符串可能的取值为"hangzhou", "beijing" or "qingdao",或其它位于中国地区的数据中心所在城市名称.
如果是Region类型,允许指定中国以外的数据中心.
缺省为"hangzhou".也可以是带有"-internal"后缀的内网形式,如"hangzhou-internal", "beijing-internal" or "qingdao-internal-vpc".
```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
    var mq = new AliMNS.MQ(account, "hangzhou");
    // or
    var regionJapan = new AliMNS.Region(AliMNS.City.Japan, AliMNS.NetworkType.Public);
    var mqJapan = new AliMNS.MQ(account, regionJapan);
```

## mq.getName()
获取队列名称.

## mq.getAccount()
获取队列帐号.

## mq.getRegion()
获取队列位置.

## mq.sendP(msg:string, priority?:number, delaySeconds?:number)
向队列中发送一个消息.

message: String. 消息内容.

priority: number, optional. 优先级1(最低)~16(最高),缺省是8.

delaySeconds: number, optional. 消息发送多少秒后才可见,0~604800(7天),缺省是0.此参数优先于队列的options.DelaySeconds属性.
```javascript
    mq.sendP("Hello Ali-MNS", 8, 0).then(console.log, console.error);
```

## mq.getRecvTolerance() & mq.setRecvTolerance(value:number)
获取或设置mq.recvP方法的容忍秒数.

value: number. Default is 5, in seconds. 缺省是5秒.多久mq.recvP方法会触发超时.
由于网络延迟,mq.recvP方法返回可能会更晚.

## mq.recvP(waitSeconds?:number)
从队列中接收消息.
它会短暂改变消息的可见性.

waitSeconds: number. optional.
在返回*MessageNotExist*(消息不存在)错误之前,最大的等待秒数.
```javascript
    mq.recvP(5).then(console.log, console.error);
```
如果队列为空,那么此方法一共会等待`waitSeconds + getRecvTolerance()`秒.

## mq.peekP()
查探消息.
它不会改变消息的可见性.
```javascript
    mq.peekP(5).then(console.log, console.error);
```

## mq.deleteP(receiptHandle:string)
删除消息.
消息被接收后,有一个短暂的不可见期.消息在被处理完成后,必须被删除,否则,当不可见期过后,它又能再次被接收.

receiptHandle: String. 由mq.recvP或mq.notifyRecv返回.
```javascript
    mq.recvP(5).then(function(data){
        return mq.deleteP(data.Message.ReceiptHandle);
    }).then(console.log, console.error);
```

## mq.reserveP(receiptHandle:string, reserveSeconds:number)
保留一个消息.

receiptHandle: String. 由mq.recvP或mq.notifyRecv返回.

reserveSeconds: number. 消息保留多少秒,1~43200(12小时).
```javascript
    mq.recvP().then(function(data){
            return mq.reserveP(data.Message.ReceiptHandle, 120);
    }).then(function(dataReserved){
            return mq.deleteP(dataReserved.ChangeVisibility.ReceiptHandle);
    });
```
如果处理消息需要花费更多的时间,可以使用这个方法把消息保留更久一些.
从调用此方法开始,消息将继续保持不可见reserveSeconds秒.
也可以设置一个比它的原本不可见期更短的时间.
如果成功,返回一个新的receiptHandle用来取代旧的那个,后续对mq.deleteP或mq.reserveP的调用必须使用这个新的值.
并且,这个新的receiptHandle将会在reserveSeconds秒后过作废.

## mq.notifyRecv(cb:(ex:Error, msg:any)=>Boolean, waitSeconds?:number)
注册一个回调函数来接收消息.

cb: 每收到一条消息,注册的回调函数就会被调用一次.
如果回调函数返回*true*,收到的消息会被自动删除.
如果你想自己执行删除操作,那么让回调函数返回*false*.

waitSeconds: number, optional. 可能的值为1~30.每次轮循最大等待秒数,缺省是5.
在每次轮循的开始,都会检查mq.notifyStopP是否已被调用,所以更大的数值会导致更慢的mq.notifyStopP
设置为0时,会和设置为缺省值5秒的效果相同.
```javascript
    mq.notifyRecv(function(err, message){
        console.log(message);
        if(err && err.message === "NetworkBroken"){
            // Best to restart the process when this occurs
            throw err;
        }
        return true; // this will cause message to be deleted automatically
    });
```
如果对同一个队列设置2个不同的回调函数,那么2个回调函数都会起作用.
但一个消息的到来,只会触发它们之中的一个.

## mq.notifyStopP()
停止mq.notifyRecv.接收循环实际停止时,返回的promise对象才会被解析.
notifyRecv()的最大等待时长由传递给mq.notifyRecv的waitSeconds参数决定.
```javascript
    mq.notifyStopP().then(console.log, console.error);
```

## mq.getAttrsP()
获取队列的属性.
```javascript
mq.getAttrsP().then(console.log, console.error);
```

## mq.setAttrsP(options:any)
修改队列的属性.

options: 队列属性,查看mns.createP的[options](#options)参数.
```javascript
    mq.setAttrsP({
        DelaySeconds: 0,
        MaximumMessageSize: 65536,
        MessageRetentionPeriod: 345600,
        VisibilityTimeout: 30,
        PollingWaitSeconds: 0
    }).then(console.log, console.error);
```

# Msg(msg: string, priority?:number, delaySeconds?:number)
简单消息定义,用于MQBatch类.

msg: string. 消息内容.

priority: number, optional. 优先级.1(最低)~16(最高).

delaySeconds: number, optional. 消息发送多少秒后才可见,0~604800(7天),缺省是0.此参数优先于队列的options.DelaySeconds属性.
```javascript
var msg = new AliMNS.Msg("Make a test");
```

## msg.getMsg()
返回消息内容.


## msg.getPriority()
返回消息优先级.

## msg.getDelaySeconds()
返回消息延迟可见秒数.

# MQBatch
2015年6月,阿里云引入了新的批量消息队列模式.此类派生自MQ类,因此,所有MQ类的方法对MQBatch都适用.例如,你
可以使用`mqBatch.setRecvTolerance(1.2)`来调节*mqBatch.recvP()*的超时行为.
```javascript
var mqBatch = new AliMNS.MQBatch(aliCfg.mqName, account, aliCfg.region);
```

## mqBatch.sendP(msg:string | Array<Msg>, priority?:number, delaySeconds?:number)
发送一条消息或一批消息.

msg: String 或 an array of Msg. 一批最大可以发送16个消息.

priority: number, optional. 优先级,仅在`msg`参数是字符串时有效,1(最低)~16(最高).缺省是8.

delaySeconds: number, optional. 仅在`msg`参数是字符串时有效,消息发送多少秒后才可见,0~604800(7天),缺省是0.此参数优先于队列的options.DelaySeconds属性.

如果`msg`是`Msg`的数组,使用`Msg`对象的priority和delaySeconds属性,并忽略第2和第3个参数.
```javascript
    var msgs = [];
    for(var i=0;i<5;i++){
        var msg = new AliMNS.Msg("BatchSend" + i, 8, 0);
        msgs.push(msg);
    }

    mqBatch.sendP(msgs);
```

## mqBatch.recvP(waitSeconds?:number, numOfMessages?:number)
接收一条或者一批消息.
它会改变消息的可见性.

waitSeconds: number. optional. 在返回*MessageNotExist*(消息不存在)错误之前,最大的等待秒数.

numOfMessages: number. optional. 最多一批接收的消息数目,1~16,缺省是16.
```javascript
    mqBatch.recvP(5, 16).then(console.log, console.error);
```

## mqBatch.peekP(numOfMessages?:number)
查探一条或者一批消息.
它不会改变消息的可见性.

numOfMessages: number. optional. 最多一批查探的消息数目,1~16,缺省是16.
```javascript
    mqBatch.peekP(5, 16).then(console.log, console.error);
```

## mqBatch.deleteP(receiptHandle:string | Array<string>)
删除一条或一批消息.
消息被接收后,有一个短暂的不可见期.消息在被处理完成后,必须被删除,否则,当不可见期过后,它又能再次被接收.

receiptHandle: String 或 an array of string. 由mq.recvP或mq.notifyRecv返回.

```javascript
    var rhsToDel = [];
    mqBatch.recvP(5, 16).then(function(dataRecv){
        for(var i=0;i<dataRecv.Messages.Message.length;i++){
            rhsToDel.push(dataRecv.Messages.Message[i].ReceiptHandle);
        }
    }).then(function(){
        return mqBatch.deleteP(rhsToDel);
    }).then(console.log, console.error);
```

## mqBatch.notifyRecv(cb:(ex:Error, msg:any)=>Boolean, waitSeconds?:number, numOfMessages?:number)
注册一个回调函数来接收消息,支持批量模式.

numOfMessages: number. optional. 最多一批接收的消息数目,1~16,缺省是16.

所有春它参数都和*mq.notifyRecv*一致.

# MNSTopic(account:Account, region?:string|Region)
`MNSTopic`提供了关于主题模型的功能,它扩展自`MNS`.
所有`MNS`的方法都适用于`MNSTopic`.
```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
    var mns = new AliMNS.MNSTopic(account, "shenzhen");
    // or
    var regionJapan = new AliMNS.Region(AliMNS.City.Japan, AliMNS.NetworkType.Public);
    var mnsJapan = new AliMNS.MNSTopic(account, regionJapan);
```

## mns.listTopicP(prefix?:string, pageSize?:number, pageMarker?:string)
列出所有的主题.

prefix: 可选.只返回特定前缀的主题.

pageSize: 可选.每页包含的主题数目1~1000,缺省为1000.

pageMarker: 可选.填入上一次请求中返回的值,来请求下一页.

## mns.createTopicP(name:string, options?:any)
创建一个主题.

name: 主题名称.

options: 选项.

options.MaximumMessageSize: int. 消息的最大尺寸, 1024(1k)~65536(64k), 缺省为65536.

options.LoggingEnabled: boolean. 是否开启日志记录,缺省是false不开启.

## mns.deleteTopicP(name:string)
删除一个主题

name: 主题名称.

# Topic(name:string, account:Account, region?:string|Region)
操控一个主题。

name: 主题名称.

account: 主题帐号.

region: String|Region, optional. 如果是字符串可能的取值为"hangzhou", "beijing" or "qingdao",或其它位于中国地区的数据中心所在城市名称.
如果是Region类型,允许指定中国以外的数据中心.
缺省为"hangzhou".也可以是带有"-internal"后缀的内网形式,如"hangzhou-internal", "beijing-internal" or "qingdao-internal-vpc".
```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
    var topic = new AliMNS.Topic("t11", account, "hangzhou");
    // or
    var regionJapan = new AliMNS.Region(AliMNS.City.Japan, AliMNS.NetworkType.Public);
    var topicJapan = new AliMNS.Topic("t11", account, regionJapan);
```

## topic.getName()
获取主题名称.

## topic.getAccount()
获取主题帐号.

## topic.getRegion()
获取主题数据中心位置.

## topic.getAttrsP() & topic.setAttrsP(options:any)
获取或设置主题的属性.

options: 主题属性.

options.MaximumMessageSize: int. 消息的最大尺寸, 1024(1k)~65536(64k), 缺省为65536.

options.LoggingEnabled: boolean. 是否开启日志记录,缺省是false不开启.

```javascript
topic.setAttrsP({ MaximumMessageSize: 1024 });
topic.getAttrsP().then((data)=>{ console.info(data); });
```

## topic.listP(prefix?:string, pageSize?:number, pageMarker?:string)
列出所有的订阅.

prefix: 可选.只返回特定前缀的订阅.

pageSize: 可选.每页包含的订阅数目1~1000,缺省为1000.

pageMarker: 可选.填入上一次请求中返回的值,来请求下一页.

## topic.subscribeP(name:string, endPoint:string, notifyStrategy?:string, notifyContentFormat?:string, filterTag?:string)
订阅一个主题.

name: 订阅名称.

endPoint: 通知终端点. 例如: `http://www.yoursite.com/mns-ep`

notifyStrategy: 可选.通知策略BACKOFF_RETRY或EXPONENTIAL_DECAY_RETRY,缺省是BACKOFF_RETRY.

notifyContentFormat: 可选.通知消息格式XML或SIMPLIFIED,缺省是XML.

filterTag: 可选.只有匹配的消息才会被推送到通知终端端点,最长16个字符,缺省是*undefined*,不过滤任何消息.

```javascript
topic.subscribeP("subx", "http://www.yoursite.com/mns-ep",
        AliMNS.Subscription.NotifyStrategy.BACKOFF_RETRY,
        AliMNS.Subscription.NotifyContentFormat.SIMPLIFIED)
    .then(
        (data)=>{ console.info(data);}, 
        (err)=>{ console.error(err); }
    );
```

## topic.unsubscribeP(name:string)
取消订阅.

name: 订阅名称.

## topic.publishP(msg:string, b64:boolean, tag?:string, attrs?:any, options?:any)
向主题中发布一个消息.

msg: 消息内容.

b64: true, 发布消息使用base64编码方式. 
false, 发布消息不使用base64编码方式.

tag: 消息标签(用于消息过滤)

attrs: 消息属性，如果需要推送到邮件终端，则MessageAttributes为必填项

options: 底层[request](https://www.npmjs.com/package/request#requestoptions-callback)的选项.

如果消息中包含中文字符,必须把`b64`设置为`true`.
只有非常简单的消息才可以把`b64`设置为`false`.

把options设置为`{ forever: true }`将使http(s)通道*KeepAive*.

# Subscription(name:string, topic:Topic)
操控一个订阅.
```javascript
var AliMNS = require("ali-mns");
var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
var topic = new AliMNS.Topic("t11", account, "shenzhen");
var subscription = new AliMNS.Subscription("s12", topic);
```

## subscription.getName()
获取订阅名称.

## subscription.getTopic()
获取订阅相关的主题.


## subscription.getAttrsP() & subscription.setAttrsP(options:any)
获取或设置订阅属性.

options: 订阅属性.

options.NotifyStrategy: 订阅策略 BACKOFF_RETRY或EXPONENTIAL_DECAY_RETRY.
```javascript
subscription.setAttrsP({ NotifyStrategy: AliMNS.Subscription.NotifyStrategy.EXPONENTIAL_DECAY_RETRY });
```

## Subscription.NotifyStrategy
订阅策略,包含2个字符串定义.

AliMNS.Subscription.NotifyStrategy.BACKOFF_RETRY : "BACKOFF_RETRY"

AliMNS.Subscription.NotifyStrategy.EXPONENTIAL_DECAY_RETRY : "EXPONENTIAL_DECAY_RETRY"

[关于订阅策略](https://help.aliyun.com/document_detail/mns/api_reference/concepts/NotifyStrategy.html?spm=5176.docmns/api_reference/topic_api_spec/subscription_operation.6.141.tmwb5L)

## Subscription.NotifyContentFormat
通知消息格式,包含2个字符串定义.

AliMNS.Subscription.NotifyContentFormat.XML : "XML"

AliMNS.Subscription.NotifyContentFormat.SIMPLIFIED : "SIMPLIFIED"

[关于通知消息格式](https://help.aliyun.com/document_detail/mns/api_reference/concepts/NotifyContentFormat.html?spm=5176.docmns/api_reference/concepts/NotifyStrategy.6.142.kWiFyy)

# 调式输出
设置环境变量"ali-mns"为**DEBUG**可以开启调试输出.
```SHELL
# linux bash
export DEBUG=ali-mns

# windows
set DEBUG=ali-mns
```

# Migrate
从1.x版本迁移
+ 1.ali-mns完全兼容ali-mqs, 简单替换ali-mqs包成ali-mns.
```javascript
// var AliMQS = require('ali-mqs');
var AliMQS = require('ali-mns');
```

+ 2.可选. 更改**ownerId**为**accountId**
阿里云升级了帐号系统,推荐使用新的account id 取代 owner id.
但旧的owner id目前仍然有效.
```javascript
var AliMQS = require("ali-mns");
// var account = new AliMNS.Account("hl35yqoedp", "<your-key-id>", "<your-key-secret>");
var account = new AliMNS.Account("1786090012649663", "<your-key-id>", "<your-key-secret>");
```
**ownerId** 混合了字母和数字.

**accountId** 16位的数字.
点击[这个链接](https://account.console.aliyun.com/#/secure)找到你的account id.

在GitHub, [分支v1.x](https://github.com/shxiaojunsh/ali-mns/tree/v1.x) 跟踪旧的mqs服务.
使用`npm install ali-mqs' 安装 [ali-mqs](https://www.npmjs.com/package/ali-mqs) 包的v1.x版本.

# Performance - Serial vs. Batch 串行和批量的性能对比
创建20个队列,然后随机的向它们发送共计2000条消息.

串行模式大约比批量模式慢10倍.

**1st - Serial Mode(batch_size=1)**
```
// 20 queues 2000 messages batch_size=1 串行模式
  AliMNS-performance
    concurrent-queues
      √ #BatchSend (3547ms)
      √ #recvP (21605ms)
      √ #stopRecv (6075ms)
```

**2nd - Batch Mode(Batch_size=16)**
```
// 20 queues 2000 messages batch_size=16 批量模式(1批16条消息)
  AliMNS-performance
    concurrent-queues
      √ #BatchSend (3472ms)
      √ #recvP (2125ms)
      √ #stopRecv (6044ms)
```

测试代码位于[$/test/performance.js](https://github.com/shxiaojunsh/ali-mns/blob/master/test/performance.js)
一份测试输出日志示例位于 [$/test/performance.log](https://github.com/shxiaojunsh/ali-mns/blob/master/test/performance.log)

执行`npm run test`运行测试.

设置环境变量 **DEBUG** 为 **ali-mns.test** 开启测试输出(会略微拖慢测试).

# Privacy Policy (totally removed in ali-mns-plus)
注意，在ali-mns-plus中，已经将此移除，不再包含该功能

私隐策略
我们收集你一些如何使用`ali-mns`的数据来提供更好的服务.

默认情况,当你向阿里云消息服务发送一条请求时,一小节跟踪信息被发送到Google的分析服务.
跟踪信息只包含请求的URL.
你的数据,密钥等等都不会被发送.
你的帐号ID在转换为MD5后被发送,因此它不可能被用于反向跟踪回你.
你可以检查这里的[代码](https://github.com/shxiaojunsh/ali-mns/blob/master/ts/GA.ts#L28)来了解数据如何被收集.

你总可以按你自己的愿望完全禁用掉Google分析数据收集功能.
```javascript
    var AliMNS = require("ali-mns");
    var account = new AliMNS.Account("<your-account-id>", "<your-key-id>", "<your-key-secret>");
    
    // 禁用Google分析数据收集
    account.setGA(false);
    
    var mq = new AliMNS.MQ("<your-mq-name>", account, "hangzhou");
    mq.sendP("Hello ali-mns").then(console.log, console.error);
```

# License
MIT
