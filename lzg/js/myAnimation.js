/**
 * Created by Administrator on 2016/10/20.
 */
/**
 * 动画函数 改变任意对象 任意数量数值属性的属性值
 * @param obj 元素对象
 * @param json 改为传json值
 * @param fn回调函数 做次级动画
 */
function myAnimate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //假设所有动画都跑完了
        var flag = true;
        for(var k in json){
            //数值特例 透明和层级
            if(k ==="opacity"){
                //目标值
                var target = json[k]*100;
                //当前值
                var leader = getStyle(obj,k)*100;
                //改变值
                var step = (target - leader) / 10;
                //粒子化
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;
            }else if (k ==="zIndex"){
                obj.style[k]=json[k];//速度对层级改变而言没有意义
            }else{

            }
            //获取目标位置
            //target = 0;
            var target = json[k];
            //当前数值>取任意数值属性的当前值(值粒子化)
            //var leader = test.offsetLeft;
            var leader = parseInt(getStyle(obj,k))||0;
            //增加的数值
            var step = (target-leader)/10;
            //补救px的问题
            if(step>0){
                step = Math.ceil(step);//0.5向上取整1
            }else{
                step = Math.floor(step);//0.5向下取整-1
            }
            //*控制台检测
            //console.log(("target:" + target + "--leader:" + leader + "--step:" + step));
            //增加后数值
            leader = leader+step;//4.5
            //修改属性
            obj.style[k] = leader + "px";//加px后变为5px,因为遵循四舍五入
            console.log("goo");
            //清除定时器
            if(leader!=target){
                flag = false;//告诉假设是错误的
            }
        }
        //如果假设成立
        if(flag){
            clearInterval( obj.timer);//结束标志
            //如果回调不为空
            if (fn){
                fn();//执行函数
            }
        }
    },5);
}
//匀速动画 json{"attr":target}
/**
 * 匀速动画
 * @param obj 有px的对象
 * @param attr 对象的属性
 * @param target 目标值
 * @param time 周期
 */
function animate(obj,attr,target,time) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = parseInt(getStyle(obj,attr));
        console.log(leader);
        if(target>leader){
            var step = 1;
        }else{
            var step = -1;
        }
        leader = leader + step;
        //console.log(("target:" + target + "--leader:" + leader + "--step:" + step));
        obj.style[attr] = leader + "px";
        if (target===leader){
            clearInterval(obj.timer);
            //console.log("timer");
        }
    }, time);
}
/**
 * 数值快缓速动画
 * @param obj 有px的对象
 * @param attr 对象的属性
 * @param target 目标值
 * @param time 周期
 */
function animateQuic(obj,attr,target,time) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = parseInt(getStyle(obj,attr));
        console.log(leader);
        //增加的数值
        var step = (target-leader)/10;
        //补救px的问题
        if(step>0){
            step = Math.ceil(step);//0.5向上取整1
        }else{
            step = Math.floor(step);//0.5向下取整-1
        }
        leader = leader + step;
        console.log(("target:" + target + "--leader:" + leader + "--step:" + step));
        obj.style[attr] = leader + "px";
        if (target===leader){
            clearInterval(obj.timer);
            console.log("timer has been cleared!");
        }
    }, time);
}
/**
 * 获取任意对象的任意属性
 * @param obj 目标元素
 * @param attr 目标属性
 */
function getStyle(obj,attr){
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];//"."不能被解析，所以用关联数组
    }
}