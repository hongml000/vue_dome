
function retParent(elem, n) {
    //返回e的第n个组先元素
    while (n && elem){
        elem = elem.parentElement();
        n --;
    }
    return elem;
}

//求元素的子节点中的元素节点
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for (var i = 0; i < len; i ++){
        if (child[i].nodeType == 1){
            arr.push(child[i]);
        }
    }
    return arr;
}



function retSiblings(elem, n) {
    /*返回elem的第n个兄弟元素，n>0,向后找，n<0，向前找，n=0，返回元素本身
    *
    **/
    while (n){
        if (n > 0){
            elem = elem.nextElementSibling;
            // console.log(elem);
            n -- ;
        }
    else if (n < 0){
        while (n){
            elem = elem.previousElementSibling;
            n ++;
        }
    }
    }
    return elem;

}

Element.prototype.insertAfter = function(newelem,elem){
    var nextelem = elem.nextElementSibling;
    if(nextelem==null){
        this.appendChild(newelem);
    }else {
        this.insertBefore(newelem,nextelem);
    }
}

//将某标签内的子元素反序
Element.prototype.revElem = function () {
    elemList = this.getElementsByTagName('*');
    len = elemList.length;
    console.log(len);
    for(var i=len-1;i>=0;i--){
        console.log(elemList[i]);
        this.appendChild(elemList[i]);
    }
}

date = new Date();  //"Wed Mar 20 2019 21:04:32 GMT+0800 (中国标准时间)". date生成的是此时时间，静止的，后续不会改变
// 获取日期

function getNowTime() {
    date = new Date();
    console.log(date.getFullYear() + "-"  + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

// timer = setInterval(function () {
//     i = 0;
//     console.log(i++);
//     if (new Date().getMinutes() == 53){
//     clearInterval(timer);
// }
// },1000);


// 返回滚动条的偏移量（x,y）
function getScrollOffset() {
    if (window.pageXOffset){
        return {        //注意，这里的对象的大括号必须写在return后面，不然系统会自己增加reutrn;
            x : window.pageXOffset,
            y : window.pageYOffset,
        }
    }else {
        return{
            x : window.body.scrollLeft + document.documentElement.scrollLeft,
            y : window.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}

// 返回当前窗口大小
function getViewportOffset() {
    if (window.innerWidth){
        return {
            width : window.innerWidth,
            height: window.innerHeight,
        }
    }else {
        if(document.compatMode=="CSS1compat"){
            return {
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight,
            }
        }else{
            return{
                width : document.body.clientWidth,
                height : document.body.clientHeigth,
            }
        }

    }
}


// 获取CSS样式，兼容所有浏览器
function getStyle(elem, prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
    
}

// 增加事件绑定
function addEvent(elem, eventType, handle){
    if(elem.addEventListener){
        elem.addEventListener(eventType,handle,false);
    }else if(elem.attachEvent){
        elem.attachEvent('on' + eventType, function (){
            handle.call(elem);
        });
    }else{
        elem['on'+type] = handle;
    }
}

//解除事件绑定
function removeEvent(elem,eventType,handle){
    if(elem.addEventListener){
        elem.removeEventListener(eventType,handle,false);
    }else if(elem.attachEvent){
        elem.detachEvent('on',eventType,handle);
    }else{
        elem['on'+eventType] = null;
    }
}


// 取消冒泡事件
function cancelBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelEvent = true;
    }
}

// 取消默认事件的方法
function cancelDefaultEvent(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

// 实现拖拽方块的方法   !!!!!不行，后面再完善
function trag(elem){
    var divX,divY;
   addEvent(elem,'mousedown',function(e){
        evnet = e || window.event;
        target = event.target || event.srcElement;
        var divX = event.clientX - parseInt(getStyle(elem,'left'));
        var divY = event.clientY - parseInt(getStyle(elem,'top'));
        console.log(divX,divY);
        addEvent(document,'mousemove',mouseMove);
        addEvent(document,'mouseup',mouseUp);
        cancelBubble(event);
        cancelDefaultEvent(event);
    });
    function mouseMove(e){
        var event = e || window.event;
        // var target = event.target || event.srcElement;
        elem.style.left = event.clientX - divX + 'px';
        elem.style.top = event.clientY - divY + 'px';
    }
    function mouseUp(e){
        var event = e || window.event;
        removeEvent(document,'mousemove',mouseMove);
        removeEvent(document,'mouseup',mouseUp);
    }
}


//实现按需异步加载js文件 
function loadScript(url, callback){
    /* 
    实现按需异步加载js文件 
    url: js文件路径
    callback: js文件中要执行的方法
    */
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = url;    //写到这，异步下载，如果只写到这，永远不会执行

    if(script.readyState){
        // IE用的方法 script.readyState，会根据script加载的进度更改值，
        // 加载的时候script.readyState = "loading"
        // 加载完后，script.readyState = "complete"或"loaded"
        script.onreadystatechange = function(){
            if(script.readyState == "loaded" || script.readyState == "complete"){
                test();
            }
        }
    }else{
        //解决方法,当script下载完后，才执行这个方法
        //onload的兼容性很好：chrome,safari,firefox,opera，但IE中script没有onload属性
        script.onload = function(){
            callback();
        }
    }
    document.head.appendChild(script);  //当将这个标签加入DOM上时，才会执行
   
}
