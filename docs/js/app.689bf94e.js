(function(e){function t(t){for(var r,i,s=t[0],c=t[1],u=t[2],l=0,h=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&h.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(h.length)h.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/image-diff/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var f=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},1:function(e,t){},2:function(e,t){},"3b5c":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i={name:"app"},s=i,c=(n("034f"),n("2877")),u=Object(c["a"])(s,a,o,!1,null,null,null),f=u.exports,l=n("8c4f"),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"body"},["wait-input"==e.phase?n("div",{staticClass:"wait-input"},[n("input",{ref:"input-file",attrs:{type:"file",multiple:"",accept:".jpg,.png"},on:{change:e.listen__x__onchange}})]):e._e(),"opened"==e.phase?n("div",{staticClass:"opened"},e._l(e.frames,function(t,r){return n("div",{key:"row-"+r,staticClass:"row-frame"},e._l(t,function(t,r){return n("div",{key:"col-"+r,staticClass:"col-frame"},[n("frame-image-diff",{attrs:{"frame-data":t,"frame-pan-coord":e.framePanCoord,"frame-zoom":e.frameZoom,"frame-mouse-on":e.frameMouseOn},on:{"vue-mousemove":function(t){return e.framePanCoord=t},"vue-mouseenter":function(t){e.frameMouseOn=!0},"vue-mouseleave":function(t){e.frameMouseOn=!1},"vue-wheel":function(t){return e.frameZoom=t.scale}}})],1)}),0)}),0):e._e(),"opening"==e.phase?n("div",{staticClass:"opening"},[n("div",[n("div",{staticClass:"w-spinner"},[n("div",{directives:[{name:"show",rawName:"v-show",value:""==e.progressErrorText,expression:"progressErrorText == ''"}],staticClass:"spinner"})]),n("span",[e._v(e._s(e.progressText))])]),n("span",{staticStyle:{color:"rgb(255, 0, 0)"}},[e._v(e._s(e.progressErrorText))])]):e._e()])},p=[],d=(n("28a5"),n("ac4d"),n("8a81"),n("ac6a"),n("6c7b"),n("75fc")),m=(n("7f7f"),n("55dd"),n("96cf"),n("3b8d")),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"body",on:{mousedown:e.listen__x__onmousedown,mouseenter:function(){void 0!=e.frameData&&e.$emit("vue-mouseenter",{})},mouseleave:function(){void 0!=e.frameData&&e.$emit("vue-mouseleave",{})},wheel:e.listen__x__onwheel}},[void 0!=e.frameData&&1==e.frameMouseOn?n("div",{staticClass:"overlay"},[n("span",{staticClass:"name"},[e._v(e._s(e.frameData.name))]),e._l(e.frameData.params,function(t,r,a){return n("div",{key:"params-"+a,staticClass:"params",style:{"margin-top":"0px",padding:"0px"}},[n("span",[e._v(e._s(r)+": "+e._s(t))])])})],2):e._e()])},g=[],w=n("89e8"),x=n.n(w),b={props:["frame-data","pan-x","frame-pan-coord","frame-zoom","frame-mouse-on"],methods:{listen__x__onresize:function(){this.$cornerstone.resize(this.$el,!1)},listen__x__onmousedown:function(e){if(void 0!=this.frameData){var t,n,r=this;1===e.which&&(t=e.pageX,n=e.pageY,r.$el.addEventListener("mousemove",a),r.$el.addEventListener("mouseup",o))}function a(e){var a=e.pageX-t,o=e.pageY-n;t=e.pageX,n=e.pageY;var i=r.$cornerstone.getViewport(r.$el),s=i.translation.x+a/i.scale,c=i.translation.y+o/i.scale;r.$emit("vue-mousemove",{x:s,y:c})}function o(){r.$el.removeEventListener("mousemove",a),r.$el.removeEventListener("mouseup",o)}},listen__x__onwheel:function(e){if(void 0!=this.frameData){var t=this,n=t.$cornerstone.getViewport(t.$el),r=e.wheelDelta<0||e.detail>0?-.1:.1,a=n.scale+r;return a>0&&t.$emit("vue-wheel",{scale:a}),!1}}},mounted:function(){if(void 0!==this.frameData){x()(this.$el,this._.debounce(this.listen__x__onresize,10)),this.$cornerstone.enable(this.$el);var e=this.frameData.cornerstonImage,t=this.$cornerstone.getDefaultViewport(this.$el,e),n=getComputedStyle(this.$el),r=parseInt(n.height,10),a=parseInt(n.width,10),o=r/e.height,i=a/e.width,s=o<i?o:i;t.scale=s,t.translation.y=0,t.translation.x=0,this.$cornerstone.displayImage(this.$el,this.frameData.cornerstonImage,t)}},watch:{framePanCoord:function(e){if(void 0!=this.frameData&&void 0!=e){var t=this.$cornerstone.getViewport(this.$el);t.translation.x=e.x,t.translation.y=e.y,this.$cornerstone.setViewport(this.$el,t)}},frameZoom:function(e){if(void 0!=this.frameData&&void 0!=e){var t=this.$cornerstone.getViewport(this.$el);t.scale=e,this.$cornerstone.setViewport(this.$el,t)}}},beforeDestroy:function(){x.a.unbind(this.$el),this.$cornerstone.disable(this.$el)}},_=b,y=(n("76f9"),Object(c["a"])(_,v,g,!1,null,"42b4f2e4",null)),$=y.exports,k=(n("34ef"),n("eed2")),C=n.n(k),D=n("fcd8"),I=n.n(D),O=n("df7c"),R=n.n(O);function A(e){return new Promise(function(t,n){var r=new FileReader;r.onload=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(r){var a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:try{a=new Uint8Array(r.target.result),o=C.a.decode(a,!0),t({pixelData:o.data,width:o.width,height:o.height})}catch(i){n(i)}case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),r.readAsArrayBuffer(e)})}function P(e){return new Promise(function(t,n){var r=new FileReader;r.onload=function(e){var r=new Uint8Array(e.target.result);new I.a.PNG({filterType:4}).parse(r,function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(r,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:try{null!=r&&n(r),t({pixelData:a.data,width:a.width,height:a.height})}catch(o){n(o)}case 1:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}())},r.readAsArrayBuffer(e)})}function M(e){return j.apply(this,arguments)}function j(){return j=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,".jpg"!=R.a.extname(t.name)){e.next=7;break}return e.next=4,A(t);case 4:n=e.sent,e.next=14;break;case 7:if(".png"!=R.a.extname(t.name)){e.next=13;break}return e.next=10,P(t);case 10:n=e.sent,e.next=14;break;case 13:throw new Error("unsupported extension");case 14:return e.abrupt("return",n);case 17:throw e.prev=17,e.t0=e["catch"](0),e.t0;case 20:case"end":return e.stop()}},e,null,[[0,17]])})),j.apply(this,arguments)}var E={parseImage:M};n("a481"),n("6aa2"),n("6b54");function S(){var e=new Date,t=e.getDate(),n=e.getMonth()+1,r=e.getFullYear();return t<10&&(t="0"+t),n<10&&(n="0"+n),r+"."+n+"."+t}function T(){var e,t="";for(e=0;e<32;e+=1)switch(e){case 8:case 20:t+="-",t+=(16*Math.random()|0).toString(16);break;case 12:t+="-",t+="4";break;case 16:t+="-",t+=(4*Math.random()|8).toString(16);break;default:t+=(16*Math.random()|0).toString(16)}return t}function B(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n["parent"],a=n["id"],o=n["class"],i=n["text"],s=n["innerHTML"],c=n["attrs"],u=document.createElement(e);for(var f in t)u.style[f]=t[f];if(void 0!==r&&r.appendChild(u),void 0!==a&&(u.id=a),void 0!==o&&(u.className=o),void 0!==i&&(u.textContent=i),void 0!==s&&(u.innerHTML=s),void 0!==c)for(var l in c)u.setAttribute(l,c[l]);return u}function L(e){if(e.length>0){for(var t=0,n=e[0],r=1;r<e.length;r++){var a=e[r];a>n&&(n=a,t=r)}return t}return-1}function U(e,t,n,r,a){var o=document.createElement("canvas"),i=o.getContext("2d"),s=document.createElement("canvas"),c=s.getContext("2d");return o.width=t,o.height=n,i.putImageData(new ImageData(new Uint8ClampedArray(e),t,n),0,0),s.width=r,s.height=a,c.drawImage(o,0,0,o.width,o.height,0,0,s.width,s.height),c.getImageData(0,0,r,a).data}function G(e){for(var t,n,r,a,o,i="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=new Uint8Array(e.buffer),u=c.byteLength,f=u%3,l=u-f,h=0;h<l;h+=3)o=c[h]<<16|c[h+1]<<8|c[h+2],t=(16515072&o)>>18,n=(258048&o)>>12,r=(4032&o)>>6,a=63&o,i+=s[t]+s[n]+s[r]+s[a];return 1===f?(o=c[l],t=(252&o)>>2,n=(3&o)<<4,i+=s[t]+s[n]+"=="):2===f&&(o=c[l]<<8|c[l+1],t=(64512&o)>>10,n=(1008&o)>>4,r=(15&o)<<2,i+=s[t]+s[n]+s[r]+"="),i}function V(e){for(var t=atob(e),n=t.length,r=new Uint8Array(n),a=0;a<n;a++)r[a]=t.charCodeAt(a);return r.buffer}function z(e){for(var t=new Uint8Array(4*e.length),n=0;n<e.length;n++){var r=4*n,a=e[n];t[r]=a,t[r+1]=a,t[r+2]=a,t[r+3]=255}return t}function N(e){for(var t=new Uint8Array(e.length/3*4),n=0;n<e.length;n+=3){var r=n/3*4;t[r]=e[n],t[r+1]=e[n+1],t[r+2]=e[n+2],t[r+3]=255}return t}function Y(e){for(var t=e.length/3,n=new Uint8Array(4*t),r=0;r<t;r++){var a=4*r;n[a]=e[r],n[a+1]=e[r+t],n[a+2]=e[r+t+t],n[a+3]=255}return n}function F(e){for(var t=new Uint8Array(e.length/4*3),n=0;n<e.length;n+=4){var r=n/4*3;t[r]=e[n],t[r+1]=e[n+1],t[r+2]=e[n+2]}return t}function Z(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,n,r){return t+t+n+n+r+r});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null}var H={getDateString:S,getUuid4:T,createElement:B,argMax:L,resizeImg:U,convertBufferToBase64:G,convertBase64ToBuffer:V,convertGRAY2RGBA:z,convertRGB2RGBA:N,convertRGB2RGBA1:Y,convertRGBA2RGB:F,convertHexToRgb:Z},X={components:{"frame-image-diff":$},data:function(){return{phase:"wait-input",frames:[[]],framePanCoord:void 0,frameZoom:void 0,frameMouseOn:void 0,progressText:"",progressErrorText:""}},methods:{listen__x__onchange:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r,a,o,i,s,c,u,f,l,h,p,m,v,g,w,x,b,_,y,$,k,C,D,I,O,R,A,P,M,j,S,T,B,L;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.phase="opening",n=t.target.files,e.prev=2,r=[],a=!0,o=!1,i=void 0,e.prev=7,s=n[Symbol.iterator]();case 9:if(a=(c=s.next()).done){e.next=20;break}return u=c.value,this.progressText="parse ".concat(u.name),e.next=14,E.parseImage(u);case 14:f=e.sent,l=this.parseName(u.name),h=l.name,p=l.params,m=l.index,r.push({image:f,name:h,params:p,index:m});case 17:a=!0,e.next=9;break;case 20:e.next=26;break;case 22:e.prev=22,e.t0=e["catch"](7),o=!0,i=e.t0;case 26:e.prev=26,e.prev=27,a||null==s.return||s.return();case 29:if(e.prev=29,!o){e.next=32;break}throw i;case 32:return e.finish(29);case 33:return e.finish(26);case 34:r.sort(function(e,t){return e.index-t.index}),v=[],e.t1=regeneratorRuntime.keys(r);case 37:if((e.t2=e.t1()).done){e.next=57;break}if(g=e.t2.value,w=r[0].image.width,x=r[0].image.height,b=r[g],_=b.image,y=void 0,w==_.width&&x==_.height){e.next=51;break}return $=H.resizeImg(_.pixelData,_.width,_.height,w,x),e.next=48,this.$cornerstone.createCornerstoneImageRgba(void 0,$,w,x);case 48:y=e.sent,e.next=54;break;case 51:return e.next=53,this.$cornerstone.createCornerstoneImageRgba(void 0,_.pixelData,w,x);case 53:y=e.sent;case 54:v.push({cornerstonImage:y,name:b.name,params:b.params}),e.next=37;break;case 57:if(v.length<3)for(k=[[]],C=0,D=v;C<D.length;C++)I=D[C],k[0].push(I);else if(v.length<9)for(k=[[],[]],O=0,R=0,A=v;R<A.length;R++)P=A[R],k[O<v.length/2?0:1].push(P),O++;else for(k=[[],[],[]],M=0,j=0,S=v;j<S.length;j++)T=S[j],k[M<v.length/3?0:M<2*v.length/3?1:2].push(T),M++;k.length>1&&(B=k[0],L=k[k.length-1],L.push.apply(L,Object(d["a"])(new Array(B.length-L.length).fill(void 0)))),this.phase="opened",this.frames=k,e.next=67;break;case 63:e.prev=63,e.t3=e["catch"](2),console.log(e.t3),this.progressErrorText=e.t3;case 67:case"end":return e.stop()}},e,this,[[2,63],[7,22,26,34],[27,,29,33]])}));function t(t){return e.apply(this,arguments)}return t}(),listen__frame__onmousemove:function(e){this.framePanCoord=e},parseName:function(e){var t=R.a.extname(e);e=e.substr(0,e.length-t.length);var n=e.split("__"),r=n[0];n=n.slice(1),n=n.slice(0,2*Math.floor(n.length/2));for(var a={},o=9999,i=0;i<n.length;i+=2){var s=n[i],c=n[i+1];if("index"==s){var u=parseInt(c);0==isNaN(u)&&(o=c)}else a[s]=c}return{name:r,params:a,index:o}}},created:function(){},mounted:function(){}},J=X,W=(n("f228"),Object(c["a"])(J,h,p,!1,null,"0e050e94",null)),q=W.exports;r["a"].use(l["a"]);var K=new l["a"]({routes:[{path:"*",component:q}],mode:"history"}),Q=n("415c"),ee=n.n(Q),te=n("81d9"),ne=n.n(te);function re(){var e,t="";for(e=0;e<32;e+=1)switch(e){case 8:case 20:t+="-",t+=(16*Math.random()|0).toString(16);break;case 12:t+="-",t+="4";break;case 16:t+="-",t+=(4*Math.random()|8).toString(16);break;default:t+=(16*Math.random()|0).toString(16)}return t}function ae(e,t){var n=t.width,r=t.height,a=t.pixelData,o=255,i=n*r*4,s=ne.a.renderColorImage,c={imageId:e,minPixelValue:0,maxPixelValue:o,slope:1,intercept:0,windowCenter:127,windowWidth:256,render:s,getPixelData:function(){return a},rows:r,columns:n,height:r,width:n,color:!0,columnPixelSpacing:1,rowPixelSpacing:1,invert:!1,sizeInBytes:i};return{promise:new Promise(function(e){e(c)}),cancelFn:void 0}}var oe={install:function(e){function t(e,t,n,r){return new Promise(function(a){e=void 0==e?re():e,ne.a.loadImage("rgbaLoader:".concat(e),{pixelData:t,width:n,height:r}).then(function(e){a(e)})})}ne.a.registerImageLoader("rgbaLoader",ae),e.prototype.$cornerstone=ne.a,e.prototype.$cornerstone.createCornerstoneImageRgba=t}};r["a"].config.productionTip=!1,r["a"].use(ee.a),r["a"].use(oe),new r["a"]({render:function(e){return e(f)},router:K,components:{App:f}}).$mount("#app")},"64a9":function(e,t,n){},"76f9":function(e,t,n){"use strict";var r=n("3b5c"),a=n.n(r);a.a},e838:function(e,t,n){},f228:function(e,t,n){"use strict";var r=n("e838"),a=n.n(r);a.a}});
//# sourceMappingURL=app.689bf94e.js.map