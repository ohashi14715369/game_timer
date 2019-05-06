(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(e,t,n){e.exports=n(276)},131:function(e,t,n){},136:function(e,t,n){},276:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"createTimerOpen",function(){return j}),n.d(r,"createTimerClose",function(){return T}),n.d(r,"createTimerChange",function(){return y}),n.d(r,"createTimerRegister",function(){return C}),n.d(r,"loadGameTimer",function(){return k});var a=n(1),i=n.n(a),o=n(16),c=n.n(o),u=(n(131),n(35)),s=n(36),l=n(39),m=n(37),d=n(38),h=n(53),f=n(22),v=n(23),g=n.n(v),p=(n(136),"CREATE_TIMER.OPEN"),b="CREATE_TIMER.CHANGE",E="CREATE_TIMER.CLOSE",w="CREATE_TIMER.REGISTER",O=new(n(113).a)("TIMER"),j=function(){return{type:p}},T=function(){return{type:E}},y=function(e,t){return{type:b,key:e,value:t}},C=function(){return function(e,t){var n=t().createtimer,r=n.hour,a=n.minute,i=n.second;O.put({_id:new Date,hour:r,minute:a,second:i}).then(function(t){e({type:w,hour:r,minute:a,second:i}),e(T())})}},k=function(){return function(e){O.allDocs({include_docs:!0}).then(function(t){console.log(t),g.a.forEach(t.rows,function(t){e({type:w,hour:t.doc.hour,minute:t.doc.minute,second:t.doc.second})})})}},R=n(70),x=n(117),I=n.n(x),A=n(118),M=n.n(A),S=n(71),_=n.n(S),N=n(119),W=n.n(N),B=n(120),G=n.n(B),L=n(122),P=n.n(L),U=n(121),D=n.n(U),J=n(124),F=n.n(J),H=n(123),$=n.n(H),q=n(41),z=n.n(q),K=n(114),Q=n(115),V=n.n(Q),X=n(116),Y=n.n(X),Z=function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.min,n=e.max,r=e.step,a=Object(K.a)(e,["min","max","step"]);return i.a.createElement(V.a,Object.assign({select:!0,value:this.props.value},a),g.a.map(g.a.range(t,n,r),function(e){return i.a.createElement(Y.a,{key:e,value:e},("00"+e).slice(-2))}))}}]),t}(a.Component);Z.defaultProps={step:1};var ee=Z,te=n(17),ne=n(27),re=n.n(ne),ae=function(e){function t(e){var n;Object(u.a)(this,t),n=Object(l.a)(this,Object(m.a)(t).call(this));var r=re()(),a=re()(r).add(e.timer.hour,"hours").add(e.timer.minute,"minutes").add(e.timer.second,"seconds");return n.state={start:null,end:null,text:n.getText(r,a),timer:null,millis:1e3*a.diff(r,"seconds")},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"start",value:function(){var e=this,t=this.state.millis,n=re()(),r=re()().add(t,"milliseconds");this.setState(function(t){return Object(te.a)({},t,{start:n,end:r,timer:setInterval(function(){return e.update()},16)})})}},{key:"stop",value:function(){var e=this;clearInterval(this.state.timer),this.setState(function(t){return Object(te.a)({},t,{start:null,end:null,timer:null,millis:e.state.end.diff(re()(),"milliseconds")})})}},{key:"update",value:function(){var e=this;this.setState(function(t){return Object(te.a)({},t,{text:e.getText(re()(),t.end)})})}},{key:"getText",value:function(e,t){var n=t.diff(e,"milliseconds"),r=n%1e3,a=(n=Math.floor(n/1e3))%60,i=(n=Math.floor(n/60))%60;return("00"+(n=Math.floor(n/60))).slice(-2)+":"+("00"+i).slice(-2)+":"+("00"+a).slice(-2)+"."+("000"+r).slice(-3)}},{key:"render",value:function(){var e=this,t=this.state.text;return i.a.createElement("div",null,t,i.a.createElement(z.a,{onClick:function(){return e.start()}},"start"),i.a.createElement(z.a,{onClick:function(){return e.stop()}},"end"))}}]),t}(a.Component),ie=function(e){function t(e){var n;return Object(u.a)(this,t),n=Object(l.a)(this,Object(m.a)(t).call(this,e)),e.actions.loadGameTimer(),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.gametimer,n=e.createtimer,r=e.actions,a=e.classes;return i.a.createElement("div",{className:a.root},i.a.createElement(I.a,{position:"static"},i.a.createElement(M.a,{variant:"dense"},i.a.createElement(W.a,{className:a.menuButton,color:"inherit","aria-label":"Menu"},i.a.createElement(G.a,null)),i.a.createElement(_.a,{variant:"h6",color:"inherit"},"Game Timer"))),g.a.map(t.timers,function(e){return i.a.createElement(ae,{key:e.timerId,timer:e})}),i.a.createElement(D.a,{color:"secondary","aria-label":"Add",className:a.addButton,onClick:function(){return r.createTimerOpen()}},i.a.createElement(P.a,null)),i.a.createElement($.a,{onClose:function(){return r.createTimerClose()},"aria-labelledby":"simple-dialog-title",open:n.show},i.a.createElement(F.a,{id:"simple-dialog-title"},"Create Timer"),i.a.createElement("div",null,i.a.createElement(ee,{min:"0",max:"99",label:"hour",value:n.hour,onChange:function(e){return r.createTimerChange("hour",e.target.value)}}),i.a.createElement(ee,{min:"0",max:"59",label:"minute",value:n.minute,onChange:function(e){return r.createTimerChange("minute",e.target.value)}}),i.a.createElement(ee,{min:"0",max:"59",label:"second",value:n.second,onChange:function(e){return r.createTimerChange("second",e.target.value)}}),i.a.createElement(z.a,{onClick:function(){return r.createTimerRegister()}},"Register"))))}}]),t}(a.Component);var oe=Object(R.withStyles)(function(e){return{root:{flexGrow:1},menuButton:{marginLeft:-18,marginRight:10},addButton:{position:"absolute",bottom:2*e.spacing.unit,right:2*e.spacing.unit},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200},menu:{width:200}}},{withTheme:!0})(Object(h.b)(function(e,t){return{gametimer:e.gametimer,createtimer:e.createtimer}},function(e){return{actions:Object(f.b)(r,e)}})(ie)),ce=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ue(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var se=n(125),le=n(52),me={show:!1,hour:0,minute:0,second:0},de=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return Object(te.a)({},e,{show:!0,hour:0,minute:0,second:0});case E:return Object(te.a)({},e,{show:!1});case b:return Object(te.a)({},e,Object(le.a)({},t.key,t.value));case w:return Object(te.a)({},e,{show:!1});default:return Object(te.a)({},e)}},he={timers:[],currentTimerId:0},fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:return Object(te.a)({},e,{currentTimerId:e.currentTimerId+1,timers:g.a.concat(e.timers,{timerId:e.currentTimerId,hour:t.hour,minute:t.minute,second:t.second})});default:return Object(te.a)({},e)}},ve=Object(f.c)({createtimer:de,gametimer:fe}),ge=Object(f.d)(ve,Object(f.a)(se.a));c.a.render(i.a.createElement(h.a,{store:ge},i.a.createElement(oe,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/game_timer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/game_timer","/service-worker.js");ce?(function(e,t){fetch(e).then(function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ue(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):ue(t,e)})}}()}},[[126,1,2]]]);
//# sourceMappingURL=main.155720d4.chunk.js.map