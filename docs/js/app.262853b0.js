(function(e){function t(t){for(var r,o,s=t[0],c=t[1],l=t[2],d=0,m=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(m.length)m.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/image-diff/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},1:function(e,t){},1452:function(e,t,n){"use strict";var r=n("dd6a"),a=n.n(r);a.a},"1d0c":function(e,t,n){"use strict";var r=n("55eb"),a=n.n(r);a.a},2:function(e,t){},"27ab":function(e,t,n){"use strict";var r=n("7543"),a=n.n(r);a.a},"338e":function(e,t,n){},"39f1":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQAAAADIDABVAAAAAnRSTlMAAHaTzTgAAAAZSURBVHgBY8AKDiMw++EHYIwGEOIItdgAABf6CzsSOY3AAAAAAElFTkSuQmCC"},"55eb":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],o={name:"app",mounted:function(){}},s=o,c=(n("034f"),n("2877")),l=Object(c["a"])(s,a,i,!1,null,null,null),u=l.exports,d=n("8c4f"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"body"},[n("title-bar",{attrs:{setting:e.setting,"frame-pan-coord":e.framePanCoord,"frame-zoom":e.frameZoom},on:{"vue-move-home":e.listen__x__tohome,"vue-pan-x":e.listen__title__panx,"vue-pan-y":e.listen__title__pany,"vue-zoom":e.listen__title__zoom,"vue-setting-onchanged":e.listen__title_setting__onchanged}}),"wait-input"==e.setting.phase?n("drop-view",{on:{"vue-input-files":e.listen__drop_view__oninput}}):e._e(),"opened"==e.setting.phase?n("div",{ref:"div_opened",staticClass:"opened",on:{touchstart:function(t){return e.listen__div_opened__on_x_down(t,"touch")},mousedown:function(t){return e.listen__div_opened__on_x_down(t,"mouse")},wheel:e.listen__div_opened__onwheel}},e._l(e.frames,function(t,r){return n("div",{key:"row-"+r,staticClass:"row-frame"},e._l(t,function(t,a){return n("div",{key:"col-"+a,staticClass:"col-frame"},[n("frame-image-diff",{class:"frame-"+r+"-"+a,style:{borderTop:e.getFrameBorder(r,a,!0),borderLeft:e.getFrameBorder(r,a,!1)},attrs:{"frame-data":t,"frame-pan-coord":e.framePanCoord,"frame-zoom":e.frameZoom,"frame-mouse-on":e.frameMouseOn,setting:e.setting},on:{"vue-mounted":function(t){e.frameZoom=t.scale,e.framePanCoord={x:t.x,y:t.y}},"vue-mouseenter":function(t){e.frameMouseOn=!0},"vue-mouseleave":function(t){e.frameMouseOn=!1}}})],1)}),0)}),0):e._e(),"opening"==e.setting.phase?n("div",{staticClass:"opening"},[n("div",[n("div",{staticClass:"w-spinner"},[n("div",{directives:[{name:"show",rawName:"v-show",value:""==e.progressErrorText,expression:"progressErrorText == ''"}],staticClass:"spinner"})]),n("span",[e._v(e._s(e.progressText))])]),n("span",{staticStyle:{color:"rgb(255, 0, 0)"}},[e._v(e._s(e.progressErrorText))])]):e._e()],1)},f=[],h=(n("28a5"),n("20d6"),n("ac4d"),n("8a81"),n("ac6a"),n("7f7f"),n("55dd"),n("96cf"),n("3b8d")),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"body"},[r("input",{ref:"input-file",staticClass:"input-file",attrs:{type:"file",multiple:"",accept:".jpg,.png"},on:{change:e.listen__x__onchange}}),r("div",{ref:"drop",staticClass:"drop",on:{click:e.listen__x__onclick,dragenter:e.listen__x__ondragenter,dragleave:e.listen__x__ondragleave,dragover:e.listen__x__ondragover,drop:e.listen__x__ondrop}},[r("img",{staticClass:"icon",attrs:{src:n("fbe9")}}),e._m(0),r("span",{staticClass:"caution"},[e._v("It only works using the client browser. No data is sent or stored anywhere.")])])])},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[e._v("Drop images"),n("i",[e._v("(*.jpg, *.png)")]),e._v(" or Click to open dialog")])}],v={methods:{listen__x__onclick:function(){this.$refs["input-file"].click()},listen__x__onchange:function(e){this.$emit("vue-input-files",e.target.files)},listen__x__ondragenter:function(e){e.preventDefault(),this.$refs.drop.classList.add("mouse-in")},listen__x__ondragleave:function(e){e.preventDefault(),this.$refs.drop.classList.remove("mouse-in")},listen__x__ondragover:function(e){e.preventDefault()},listen__x__ondrop:function(e){e.preventDefault(),this.$emit("vue-input-files",e.dataTransfer.files)}},mounted:function(){}},A=v,_=(n("1452"),Object(c["a"])(A,p,g,!1,null,"ee9f283a",null)),w=_.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"body",on:{mouseenter:function(){void 0!=e.frameData&&e.$emit("vue-mouseenter",{})},mouseleave:function(){void 0!=e.frameData&&e.$emit("vue-mouseleave",{})}}},[void 0==e.frameData||1!=e.setting.alwaysShowOverlayText&&1!=e.frameMouseOn?e._e():n("div",{staticClass:"overlay"},[n("span",{staticClass:"name"},[e._v(e._s(e.frameData.name))]),e._l(e.frameData.params,function(t,r,a){return n("div",{key:"params-"+a,staticClass:"params",style:{"margin-top":"0px",padding:"0px"}},[n("span",{staticClass:"name"},[e._v(e._s(r)+":")]),n("span",{staticClass:"value"},[e._v(" "+e._s(t))])])})],2),n("transition",{attrs:{name:"fade"}},[void 0!=e.frameData&&1==e.setting.diff?n("div",{staticClass:"overlay-bottom"},[n("span",{directives:[{name:"show",rawName:"v-show",value:1==e.frameData.resized,expression:"frameData.resized == true"}],staticClass:"tag-resized"},[e._v("resized")]),n("span",{directives:[{name:"show",rawName:"v-show",value:0==e.frameData.resized,expression:"frameData.resized == false"}],staticClass:"size"},[e._v(e._s(e.frameData.cornerstonImage.width+"x"+e.frameData.cornerstonImage.height))])]):e._e()])],1)},b=[],y=(n("34ef"),n("6c7b"),n("89e8")),C=n.n(y),I={props:["frame-data","pan-x","frame-pan-coord","frame-zoom","frame-mouse-on","setting"],methods:{listen__x__onresize:function(){var e=this;if(e.$cornerstone.resize(e.$el,!1),void 0!=e.frameData){var t=e.$cornerstone.getViewport(e.$el);void 0!=t&&(t.scale=e.frameZoom,t.translation.x=e.framePanCoord.x,t.translation.y=e.framePanCoord.y,e.$cornerstone.setViewport(e.$el,t),e.$cornerstone.updateImage(e.$el))}}},mounted:function(){var e=Object(h["a"])(regeneratorRuntime.mark(function e(){var t,n,r,a,i,o,s,c,l,u,d;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(void 0===this.frameData){e.next=15;break}return C()(this.$el,this._.debounce(this.listen__x__onresize,10)),this.$cornerstone.enable(this.$el),t=this.frameData.cornerstonImage,n=this.$cornerstone.getDefaultViewport(this.$el,t),void 0==this.framePanCoord?(r=getComputedStyle(this.$el),a=parseInt(r.height,10),i=parseInt(r.width,10),o=a/t.height,s=i/t.width,c=o<s?o:s,n.scale=c,n.translation.y=0,n.translation.x=0,this.$emit("vue-mounted",{scale:c,x:n.translation.x,y:n.translation.y})):(n.scale=this.frameZoom,n.translation.y=this.framePanCoord.y,n.translation.x=this.framePanCoord.x),e.next=8,this.$cornerstone.createCornerstoneImageRgba(void 0,new Uint8Array(this.frameData.cornerstonImage.width*this.frameData.cornerstonImage.height*4).fill(255),this.frameData.cornerstonImage.width,this.frameData.cornerstonImage.height);case 8:l=e.sent,this.$cornerstone.addLayer(this.$el,this.frameData.cornerstonImage,{viewport:n}),u=this.$cornerstone.addLayer(this.$el,l,{viewport:n,opacity:.9}),d=this.$cornerstone.getLayer(this.$el,u),console.log(d),console.log(this.$cornerstone.getLayers(this.$el)),console.log(this.$cornerstone);case 15:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),watch:{framePanCoord:function(e){if(void 0!=this.frameData&&void 0!=e){var t=this.$cornerstone.getViewport(this.$el);t.translation.x=e.x,t.translation.y=e.y,this.$cornerstone.setViewport(this.$el,t)}},frameZoom:function(e){if(void 0!=this.frameData&&void 0!=e){var t=this.$cornerstone.getViewport(this.$el);t.scale=e,this.$cornerstone.setViewport(this.$el,t)}}},beforeDestroy:function(){C.a.unbind(this.$el),this.$cornerstone.disable(this.$el)}},T=I,E=(n("d679"),Object(c["a"])(T,x,b,!1,null,"40f7f7e0",null)),R=E.exports,S=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"body"},[r("div",{staticClass:"lamp"},[r("div",[r("span",[e._v("x:")]),r("input",{attrs:{type:"number",disabled:"opened"!=e.setting.phase},domProps:{value:e.x},on:{change:e.listen__x__onchange}})]),r("div",[r("span",[e._v("y:")]),r("input",{attrs:{type:"number",disabled:"opened"!=e.setting.phase},domProps:{value:e.y},on:{change:e.listen__y__onchange}})]),r("div",[r("span",[e._v("scale:")]),r("input",{attrs:{type:"number",min:"0.01",disabled:"opened"!=e.setting.phase},domProps:{value:e.scale},on:{change:e.listen__scale__onchange}})]),r("div",[r("span",[e._v("diff:")]),r("input",{attrs:{type:"checkbox",disabled:"opened"!=e.setting.phase},domProps:{checked:1==e.setting.diff},on:{change:function(t){return e.listen__setting__onchange({diff:t.target.checked})}}})]),r("div",[r("span",[e._v("tolerance:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.tolerance,expression:"tolerance"}],ref:"input-tolerance",attrs:{type:"range",min:"1",max:"441.67",disabled:"opened"!=e.setting.phase||0==e.setting.diff},domProps:{value:e.tolerance},on:{__r:function(t){e.tolerance=t.target.value}}}),r("span",[e._v(e._s(e.tolerance))])])]),e._m(0),r("img",{staticClass:"btn",attrs:{src:n("6314"),title:"home"},on:{click:e.listen__home__onclick}}),r("img",{staticClass:"btn",attrs:{src:n("f78c"),title:"statistics / not yet supported"}}),r("img",{directives:[{name:"show",rawName:"v-show",value:0==e.setting.fullscreen,expression:"setting.fullscreen == false"}],staticClass:"btn",attrs:{src:n("ebbb"),title:"maxmize"},on:{click:e.listen__fullscreen__onclick}}),r("img",{directives:[{name:"show",rawName:"v-show",value:1==e.setting.fullscreen,expression:"setting.fullscreen == true"}],staticClass:"btn",attrs:{src:n("39f1"),title:"minimize"},on:{click:e.listen__fullscreen__onclick}}),r("img",{staticClass:"btn",attrs:{src:n("b0dce"),title:"setting"},on:{click:e.listen__setting__onclick}})])},k=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a",{staticStyle:{"line-height":"0"},attrs:{href:"https://github.com/whwnsdlr1/image-diff"}},[r("img",{staticClass:"btn github",attrs:{src:n("e42c"),title:"github"}})])}],D=(n("8e6e"),n("456d"),n("bd86"));n("a481"),n("6aa2"),n("6b54");function N(){var e=new Date,t=e.getDate(),n=e.getMonth()+1,r=e.getFullYear();return t<10&&(t="0"+t),n<10&&(n="0"+n),r+"."+n+"."+t}function P(){var e,t="";for(e=0;e<32;e+=1)switch(e){case 8:case 20:t+="-",t+=(16*Math.random()|0).toString(16);break;case 12:t+="-",t+="4";break;case 16:t+="-",t+=(4*Math.random()|8).toString(16);break;default:t+=(16*Math.random()|0).toString(16)}return t}function O(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n["parent"],a=n["id"],i=n["class"],o=n["text"],s=n["innerHTML"],c=n["attrs"],l=document.createElement(e);for(var u in t)l.style[u]=t[u];if(void 0!==r&&r.appendChild(l),void 0!==a&&(l.id=a),void 0!==i&&(l.className=i),void 0!==o&&(l.textContent=o),void 0!==s&&(l.innerHTML=s),void 0!==c)for(var d in c)l.setAttribute(d,c[d]);return l}function B(e){if(e.length>0){for(var t=0,n=e[0],r=1;r<e.length;r++){var a=e[r];a>n&&(n=a,t=r)}return t}return-1}function M(e,t,n,r,a){var i=document.createElement("canvas"),o=i.getContext("2d"),s=document.createElement("canvas"),c=s.getContext("2d");return i.width=t,i.height=n,o.putImageData(new ImageData(new Uint8ClampedArray(e),t,n),0,0),s.width=r,s.height=a,c.drawImage(i,0,0,i.width,i.height,0,0,s.width,s.height),c.getImageData(0,0,r,a).data}function z(e){for(var t,n,r,a,i,o="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=new Uint8Array(e.buffer),l=c.byteLength,u=l%3,d=l-u,m=0;m<d;m+=3)i=c[m]<<16|c[m+1]<<8|c[m+2],t=(16515072&i)>>18,n=(258048&i)>>12,r=(4032&i)>>6,a=63&i,o+=s[t]+s[n]+s[r]+s[a];return 1===u?(i=c[d],t=(252&i)>>2,n=(3&i)<<4,o+=s[t]+s[n]+"=="):2===u&&(i=c[d]<<8|c[d+1],t=(64512&i)>>10,n=(1008&i)>>4,r=(15&i)<<2,o+=s[t]+s[n]+s[r]+"="),o}function F(e){for(var t=atob(e),n=t.length,r=new Uint8Array(n),a=0;a<n;a++)r[a]=t.charCodeAt(a);return r.buffer}function $(e){for(var t=new Uint8Array(4*e.length),n=0;n<e.length;n++){var r=4*n,a=e[n];t[r]=a,t[r+1]=a,t[r+2]=a,t[r+3]=255}return t}function U(e){for(var t=new Uint8Array(e.length/3*4),n=0;n<e.length;n+=3){var r=n/3*4;t[r]=e[n],t[r+1]=e[n+1],t[r+2]=e[n+2],t[r+3]=255}return t}function V(e){for(var t=e.length/3,n=new Uint8Array(4*t),r=0;r<t;r++){var a=4*r;n[a]=e[r],n[a+1]=e[r+t],n[a+2]=e[r+t+t],n[a+3]=255}return n}function W(e){for(var t=new Uint8Array(e.length/4*3),n=0;n<e.length;n+=4){var r=n/4*3;t[r]=e[n],t[r+1]=e[n+1],t[r+2]=e[n+2]}return t}function Z(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,n,r){return t+t+n+n+r+r});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null}var j={getDateString:N,getUuid4:P,createElement:O,argMax:B,resizeImg:M,convertBufferToBase64:z,convertBase64ToBuffer:F,convertGRAY2RGBA:$,convertRGB2RGBA:U,convertRGB2RGBA1:V,convertRGBA2RGB:W,convertHexToRgb:Z};function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(n,!0).forEach(function(t){Object(D["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var H={props:["setting","frame-zoom","frame-pan-coord"],data:function(){return{x:void 0,y:void 0,scale:void 0,tolerance:void 0}},methods:{listen__home__onclick:function(){this.setting.phase="wait-input",this.$emit("vue-move-home",{})},listen__fullscreen__onclick:function(){1==this.setting.fullscreen?(document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen(),this.setting.fullscreen=!1):(document.body.mozRequestFullScreen?document.body.mozRequestFullScreen():document.body.webkitRequestFullscreen&&document.body.webkitRequestFullScreen(),this.setting.fullscreen=!0)},listen__setting__onclick:function(){var e=this,t={display:"flex",flexDirection:"row",marginBottom:"15px",alignItems:"center",justifyContent:"space-between"},n={borderRadius:"5px",padding:"0px 0px 0px 3px"},r=j.createElement("DIV",{width:"300px"},{}),a=j.createElement("DIV",t,{parent:r});j.createElement("SPAN",{fontSize:"12px"},{parent:a,text:"define image size"});var i=j.createElement("DIV",{},{parent:a}),o=j.createElement("INPUT",G({width:"40px"},n),{parent:i,attrs:{type:"number",min:1,value:e.setting.predefinedImageWidth}});"wait-input"!=e.setting.phase&&(o.disabled=!0),j.createElement("SPAN",{fontSize:"12px",padding:"0px 5px"},{parent:i,text:"x"});var s=j.createElement("INPUT",G({width:"40px"},n),{parent:i,attrs:{type:"number",min:1,value:e.setting.predefinedImageHeight}});"wait-input"!=e.setting.phase&&(s.disabled=!0);var c=j.createElement("DIV",t,{parent:r});j.createElement("SPAN",{fontSize:"12px"},{parent:c,text:"always show overlay text"});var l=j.createElement("INPUT",{},{parent:c,attrs:{type:"checkbox"}});1==e.setting.alwaysShowOverlayText&&(l.checked=!0);var u=j.createElement("DIV",t,{parent:r});j.createElement("SPAN",{fontSize:"12px"},{parent:u,text:"frame row count"});var d=j.createElement("INPUT",G({width:"40px"},n),{parent:u,attrs:{type:"number",min:1,value:e.setting.frameRowCount}}),m=j.createElement("DIV",t,{parent:r});j.createElement("SPAN",{fontSize:"12px"},{parent:m,text:"border width"});var f=j.createElement("INPUT",G({width:"40px"},n),{parent:m,attrs:{type:"number",min:0,max:10,value:e.setting.borderWidth}}),h=j.createElement("DIV",t,{parent:r});j.createElement("SPAN",{fontSize:"12px"},{parent:h,text:"border color"});var p=j.createElement("DIV",{},{parent:h});j.createElement("SPAN",{fontSize:"12px",marginRight:"3px"},{parent:p,text:"R:"});var g=j.createElement("INPUT",G({width:"40px",marginRight:"10px"},n),{parent:p,attrs:{type:"number",min:0,max:255,value:e.setting.borderColor[0]}});j.createElement("SPAN",{fontSize:"12px",marginRight:"3px"},{parent:p,text:"G:"});var v=j.createElement("INPUT",G({width:"40px",marginRight:"10px"},n),{parent:p,attrs:{type:"number",min:0,max:255,value:e.setting.borderColor[1]}});j.createElement("SPAN",{fontSize:"12px",marginRight:"3px"},{parent:p,text:"B:"});var A=j.createElement("INPUT",G({width:"40px"},n),{parent:p,attrs:{type:"number",min:0,max:255,value:e.setting.borderColor[2]}});e.$mModal.show("dialog",{dom:r,buttons:[{title:"cancel",onclick:function(){}},{title:"confirm",class:["green"],onclick:function(){var t={},n=o.value,r=s.value;0==isNaN(parseInt(n))&&n!=e.setting.predefinedImageWidth&&0==isNaN(parseInt(r))&&r!=e.setting.predefinedImageHeight&&n>0&&r>0&&(t.predefinedImageWidth=parseInt(n),t.predefinedImageHeight=parseInt(r));var a=l.checked;a!=e.setting.alwaysShowOverlayText&&(t.alwaysShowOverlayText=a);var i=d.value;0==isNaN(parseInt(i))&&i!=e.setting.frameRowCount&&i>0&&(t.frameRowCount=parseInt(i));var c=f.value;0==isNaN(parseInt(c))&&c!=e.setting.borderWidth&&c>=0&&c<40&&(t.borderWidth=parseInt(c));var u=[g.value,v.value,A.value];0==u.map(function(t,n){return t==e.setting.borderWidth[n]}).reduce(function(e,t){return e&&t},!0)&&u.map(function(e){return 0==isNaN(parseInt(e))&&e>=0&&e<=255}).reduce(function(e,t){return e&&t},!0)&&(t.borderColor=u),e.$emit("vue-setting-onchanged",t)}}]})},listen__setting__onchange:function(e){var t=this;t.$emit("vue-setting-onchanged",e)},listen__x__onchange:function(e){var t=parseFloat(e.currentTarget.value);0==isNaN(t)&&t!=this.x&&(this.x=t,this.$emit("vue-pan-x",t))},listen__y__onchange:function(e){var t=parseFloat(e.currentTarget.value);0==isNaN(t)&&t!=this.y&&(this.y=t,this.$emit("vue-pan-y",t))},listen__scale__onchange:function(e){var t=parseFloat(e.currentTarget.value);0==isNaN(t)&&t!=this.scale&&(this.scale=t,this.$emit("vue-zoom",t))}},watch:{framePanCoord:function(e){void 0!=e?(this.x=parseFloat(e.x.toFixed(2)),this.y=parseFloat(e.y.toFixed(2))):this.x=this.y=void 0},frameZoom:function(e){this.scale=void 0!=e?parseFloat(e.toFixed(2)):void 0},"setting.tolerance":function(e){this.tolerance=e}},mounted:function(){var e=this;e.tolerance=e.setting.tolerance,e.$refs["input-tolerance"].onchange=e._.debounce(function(){e.$emit("vue-setting-onchanged",{tolerance:this.tolerance})},100)}},J=H,L=(n("27ab"),Object(c["a"])(J,S,k,!1,null,"49232672",null)),Q=L.exports,X=n("eed2"),K=n.n(X),q=n("fcd8"),ee=n.n(q),te=n("df7c"),ne=n.n(te);function re(e){return new Promise(function(t){var n=new FileReader;n.onload=function(){var e=Object(h["a"])(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t(n.target.result);case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.readAsArrayBuffer(e)})}function ae(e){return new Promise(function(t,n){try{var r=new Uint8Array(e),a=K.a.decode(r,!0);t({pixelData:a.data,width:a.width,height:a.height})}catch(i){n(i)}})}function ie(e){return new Promise(function(t,n){var r=new Uint8Array(e);new ee.a.PNG({filterType:4}).parse(r,function(){var e=Object(h["a"])(regeneratorRuntime.mark(function e(r,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:try{null!=r&&n(r),t({pixelData:a.data,width:a.width,height:a.height})}catch(i){n(i)}case 1:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}())})}function oe(e){return se.apply(this,arguments)}function se(){return se=Object(h["a"])(regeneratorRuntime.mark(function e(t){var n,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,".jpg"!=ne.a.extname(t.name)){e.next=10;break}return e.next=4,re(t);case 4:return r=e.sent,e.next=7,ae(r);case 7:n=e.sent,e.next=20;break;case 10:if(".png"!=ne.a.extname(t.name)){e.next=19;break}return e.next=13,re(t);case 13:return a=e.sent,e.next=16,ie(a);case 16:n=e.sent,e.next=20;break;case 19:throw new Error("unsupported extension");case 20:return e.abrupt("return",n);case 23:throw e.prev=23,e.t0=e["catch"](0),e.t0;case 26:case"end":return e.stop()}},e,null,[[0,23]])})),se.apply(this,arguments)}var ce={parseImage:oe,parsePng:ie,parseJpg:ae};function le(e){return new Promise(function(t){setTimeout(function(){return t()},e)})}var ue={components:{"drop-view":w,"frame-image-diff":R,"title-bar":Q},data:function(){return{frames:[[]],framePanCoord:void 0,frameZoom:void 0,frameMouseOn:void 0,moveTouch:void 0,zoomTouch:void 0,progressText:"",progressErrorText:"",setting:{phase:"wait-input",fullscreen:!1,diff:!0,alwaysShowOverlayText:!0,frameRowCount:void 0,borderWidth:1,borderColor:[255,0,0],predefinedImageWidth:void 0,predefinedImageHeight:void 0,tolerance:1}}},methods:{listen__drop_view__oninput:function(){var e=Object(h["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=this,1==n.setting.fullscreen&&(document.body.mozRequestFullScreen?document.body.mozRequestFullScreen():document.body.webkitRequestFullscreen&&document.body.webkitRequestFullScreen()),e.next=4,le(200);case 4:n.$nextTick(Object(h["a"])(regeneratorRuntime.mark(function e(){var r,a,i,o,s,c,l,u,d,m,f,h,p,g,v,A,_,w,x,b,y;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n.setting.phase="opening",e.prev=1,r=[],a=!0,i=!1,o=void 0,e.prev=6,s=t[Symbol.iterator]();case 8:if(a=(c=s.next()).done){e.next=19;break}return l=c.value,n.progressText="parse ".concat(l.name),e.next=13,ce.parseImage(l);case 13:u=e.sent,d=n.parseName(l.name),m=d.name,f=d.params,h=d.index,r.push({image:u,name:m,params:f,index:h});case 16:a=!0,e.next=8;break;case 19:e.next=25;break;case 21:e.prev=21,e.t0=e["catch"](6),i=!0,o=e.t0;case 25:e.prev=25,e.prev=26,a||null==s.return||s.return();case 28:if(e.prev=28,!i){e.next=31;break}throw o;case 31:return e.finish(28);case 32:return e.finish(25);case 33:r.sort(function(e,t){return e.index-t.index}),p=void 0!=n.setting.predefinedImageWidth?n.setting.predefinedImageWidth:r[0].image.width,g=void 0!=n.setting.predefinedImageHeight?n.setting.predefinedImageHeight:r[0].image.height,v=[],e.t1=regeneratorRuntime.keys(r);case 38:if((e.t2=e.t1()).done){e.next=60;break}if(A=e.t2.value,_=r[A],w=_.image,x=void 0,b=void 0,p==w.width&&g==w.height){e.next=53;break}return y=j.resizeImg(w.pixelData,w.width,w.height,p,g),e.next=48,n.$cornerstone.createCornerstoneImageRgba(void 0,y,p,g);case 48:x=e.sent,n.$toasted.show("".concat(_.name," was resized to ").concat(p,"x").concat(g),{type:"error",duration:2500,position:"bottom-center"}),b=!0,e.next=57;break;case 53:return e.next=55,n.$cornerstone.createCornerstoneImageRgba(void 0,w.pixelData,p,g);case 55:x=e.sent,b=!1;case 57:v.push({cornerstonImage:x,name:_.name,params:_.params,resized:b}),e.next=38;break;case 60:n.setting.phase="opened",n.frames=n.arrangeFrames(v),e.next=68;break;case 64:e.prev=64,e.t3=e["catch"](1),console.log(e.t3),n.progressErrorText=e.t3;case 68:case"end":return e.stop()}},e,null,[[1,64],[6,21,25,33],[26,,28,32]])})));case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),listen__frame__onmousemove:function(e){this.framePanCoord=e},listen__div_opened__on_x_down:function(e,t){var n,r,a,i=this;function o(){i.$el.removeEventListener("mousemove",l),i.$el.removeEventListener("mouseup",o)}function s(e){-1!=Array.prototype.findIndex.call(e.changedTouches,function(e){return e.identifier==i.moveTouch.identifier})&&(i.moveTouch=void 0,i.$el.removeEventListener("touchmove",u),i.$el.removeEventListener("touchend",s))}function c(e){-1!=Array.prototype.findIndex.call(e.changedTouches,function(e){return e.identifier==i.zoomTouch.identifier})&&(i.zoomTouch=void 0,i.$el.removeEventListener("touchmove",d),i.$el.removeEventListener("touchend",c))}function l(e){var t=e.pageX-n,a=e.pageY-r;n=e.pageX,r=e.pageY;var o=i.framePanCoord.x+t/i.frameZoom,s=i.framePanCoord.y+a/i.frameZoom;i.framePanCoord={x:o,y:s}}function u(e){var t=Array.prototype.findIndex.call(e.changedTouches,function(e){return e.identifier==i.moveTouch.identifier});if(-1!=t){var a=e.changedTouches[t],o=a.pageX-n,s=a.pageY-r;if(n=a.pageX,r=a.pageY,void 0==i.zoomTouch){var c=i.framePanCoord.x+o/i.frameZoom,l=i.framePanCoord.y+s/i.frameZoom;i.framePanCoord={x:c,y:l}}}}function d(e){var t=Array.prototype.findIndex.call(e.changedTouches,function(e){return e.identifier==i.zoomTouch.identifier});if(void 0!=i.moveTouch&&-1!=t){var n=e.changedTouches[t],r=2.5*(Math.abs(n.pageX-i.moveTouch.pageX)+Math.abs(n.pageY-i.moveTouch.pageY))/(window.innerHeight+window.innerWidth);if(void 0!=a){var o=r-a;a=r;var s=i.frameZoom+o;s>0&&(i.frameZoom=s)}else a=r}}function m(){i.$el.addEventListener("mousemove",l),i.$el.addEventListener("mouseup",o)}function f(){i.$el.addEventListener("touchmove",u),i.$el.addEventListener("touchend",s)}function h(){i.$el.addEventListener("touchmove",d),i.$el.addEventListener("touchend",c)}void 0!=i.framePanCoord&&("touch"==t&&0==e.which?(e.preventDefault(),void 0!=i.moveTouch?(i.zoomTouch=i.copyTouch(e.changedTouches[0]),h()):(i.moveTouch=i.copyTouch(e.changedTouches[0]),n=e.changedTouches[0].pageX,r=e.changedTouches[0].pageY,f())):"mouse"==t&&1==e.which&&(n=e.pageX,r=e.pageY,m()))},listen__div_opened__onwheel:function(e){var t=this;if(void 0!=t.frameZoom){var n=e.wheelDelta<0||e.detail>0?-.1:.1,r=t.frameZoom+n;return r>0&&(t.frameZoom=r),!1}},listen__x__tohome:function(){this.framePanCoord=void 0,this.frameZoom=void 0,this.frames=[[]],this.moveTouch=void 0,this.zoomTouch=void 0,void 0!=this.setting.frameRowCount&&(this.$toasted.show("setting - 'frameRowCount' cleared",{type:"error",duration:2e3,position:"bottom-center"}),this.setting.frameRowCount=void 0),void 0!=this.setting.predefinedImageWidth&&void 0!=this.setting.predefinedImageHeight&&(this.$toasted.show("setting - 'define image size' cleared",{type:"error",duration:2e3,position:"bottom-center"}),this.setting.predefinedImageWidth=void 0,this.setting.predefinedImageHeight=void 0)},listen__title__panx:function(e){this.framePanCoord={x:e,y:this.framePanCoord.y}},listen__title__pany:function(e){this.framePanCoord={x:this.framePanCoord.x,y:e}},listen__title__zoom:function(e){this.frameZoom=e},listen__title_setting__onchanged:function(e){if(void 0!=e.diff&&e.diff!=this.setting.diff&&(this.setting.diff=e.diff),void 0!=e.tolerance&&e.tolerance!=this.setting.tolerance&&(this.setting.tolerance=e.tolerance),void 0!=e.predefinedImageWidth&&void 0!=e.predefinedImageHeight&&(this.setting.predefinedImageWidth=e.predefinedImageWidth,this.setting.predefinedImageHeight=e.predefinedImageHeight),void 0!=e.alwaysShowOverlayText&&(this.setting.alwaysShowOverlayText=e.alwaysShowOverlayText),void 0!=e.borderWidth&&(this.setting.borderWidth=e.borderWidth,"opened"==this.setting.phase))for(var t=0;t<frames.length;t++)for(var n=0;n<frames[t].length;n++)document.querySelector(".frame-".concat(t,"-").concat(n)).style.borderBottom=this.getFrameBorder(t,n);if(void 0!=e.borderColor&&(this.setting.borderColor=e.borderColor,"opened"==this.setting.phase))for(var r=0;r<frames.length;r++)for(var a=0;a<frames[r].length;a++)document.querySelector(".frame-".concat(r,"-").concat(a)).style.borderBottom=this.getFrameBorder(r,a);if(void 0!=e.frameRowCount){this.setting.frameRowCount=e.frameRowCount;var i=this.frames.reduce(function(e,t){return e.concat(t)},[]);i=i.filter(function(e){return void 0!=e}),this.frames=this.arrangeFrames(i,this.setting.frameRowCount)}},parseName:function(e){var t=ne.a.extname(e);e=e.substr(0,e.length-t.length);var n=e.split("__"),r=n[0];n=n.slice(1),n=n.slice(0,2*Math.floor(n.length/2));for(var a={},i=9999,o=0;o<n.length;o+=2){var s=n[o],c=n[o+1];if("index"==s){var l=parseInt(c);0==isNaN(l)&&(i=c)}else a[s]=c}return{name:r,params:a,index:i}},copyTouch:function(e){return{identifier:e.identifier,pageX:e.pageX,pageY:e.pageY}},arrangeFrames:function(e){function t(e,t){var n=[],r=0,a=Math.ceil(e.length/t),i=!0,o=!1,s=void 0;try{for(var c,l=e[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var u=c.value;r%a==0&&n.push([]);var d=n[n.length-1];d.push(u),r++}}catch(h){o=!0,s=h}finally{try{i||null==l.return||l.return()}finally{if(o)throw s}}for(;r<a*t;r++){var m=e[r];r%a==0&&n.push([]);var f=n[n.length-1];f.push(m)}return n}var n=this;return void 0==n.setting.frameRowCount&&(e.length<3?n.setting.frameRowCount=1:e.length<9?n.setting.frameRowCount=2:n.setting.frameRowCount=3),t(e,n.setting.frameRowCount)},getFrameBorder:function(e,t,n){var r=this;return n?e>0?"".concat(r.setting.borderWidth,"px solid rgb(").concat(r.setting.borderColor.join(","),")"):"":t>0?"".concat(r.setting.borderWidth,"px solid rgb(").concat(r.setting.borderColor.join(","),")"):""}},created:function(){},mounted:function(){console.log(this)}},de=ue,me=(n("1d0c"),Object(c["a"])(de,m,f,!1,null,"6c69e562",null)),fe=me.exports;r["a"].use(d["a"]);var he=new d["a"]({routes:[{path:"*",component:fe}],mode:"history"}),pe=n("415c"),ge=n.n(pe),ve=n("a65d"),Ae=n.n(ve),_e=n("81d9"),we=n.n(_e);function xe(){var e,t="";for(e=0;e<32;e+=1)switch(e){case 8:case 20:t+="-",t+=(16*Math.random()|0).toString(16);break;case 12:t+="-",t+="4";break;case 16:t+="-",t+=(4*Math.random()|8).toString(16);break;default:t+=(16*Math.random()|0).toString(16)}return t}function be(e,t){var n=t.width,r=t.height,a=t.pixelData,i=255,o=n*r*4,s=we.a.renderColorImage,c={imageId:e,minPixelValue:0,maxPixelValue:i,slope:1,intercept:0,windowCenter:127,windowWidth:256,render:s,getPixelData:function(){return a},rows:r,columns:n,height:r,width:n,color:!0,columnPixelSpacing:1,rowPixelSpacing:1,invert:!1,sizeInBytes:o};return{promise:new Promise(function(e){e(c)}),cancelFn:void 0}}var ye={install:function(e){function t(e,t,n,r){return new Promise(function(a){e=void 0==e?xe():e,we.a.loadImage("rgbaLoader:".concat(e),{pixelData:t,width:n,height:r}).then(function(e){a(e)})})}we.a.registerImageLoader("rgbaLoader",be),e.prototype.$cornerstone=we.a,e.prototype.$cornerstone.createCornerstoneImageRgba=t}},Ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-modal"},[n("div",{staticClass:"content"},[n("div",{staticClass:"row0"}),n("div",{staticClass:"row1"}),n("div",{staticClass:"row2"},e._l(e.dButtons,function(t,r){return n("button",{key:"btn-"+r,class:t.class,on:{click:function(n){return e.listen__x__onclick(t.onclick)}}},[e._v(e._s(t.title))])}),0)])])},Ie=[],Te={methods:{listen__x__onclick:function(e){e(),this.$destroy()},set:function(e){this.$el.querySelector(".row1").appendChild(e)}},mounted:function(){this.$el.querySelector(".row1").appendChild(this.dDom)},destroyed:function(){document.body.removeChild(this.$el)}},Ee=Te,Re=(n("7027"),Object(c["a"])(Ee,Ce,Ie,!1,null,"12d9b947",null)),Se=Re.exports,ke={install:function(e){var t=e.extend(Se);e.prototype.$mModal={show:function(e,n){if("dialog"===e){var r=new t({el:document.createElement("DIV"),data:function(){return{dDom:n.dom,dButtons:n.buttons}}});document.body.appendChild(r.$el)}}}}};r["a"].config.productionTip=!1,r["a"].use(ge.a),r["a"].use(ye),r["a"].use(ke),r["a"].use(Ae.a),new r["a"]({render:function(e){return e(u)},router:he,components:{App:u}}).$mount("#app")},6314:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAm0lEQVR4AdTKoQ5FAACF4VsURdJsoqpKXtFzeAtFVUXNJikmfne74W4MVKedf9/nNVOpnuNADWrBEx5qsFrRCO94rMOsUJjRia94asAo+73MiEF6xnMTesm/JHpM8iNeWtCKNjXSYlHu+Xeh/3+BQ4YTwyAOkDBQNhRZMPM/FGB1KgxkYpFAVoDMR6iiXAOCHpoaEACZT56GYQUAtMQU+S6/fEEAAAAASUVORK5CYII="},"64a9":function(e,t,n){},7027:function(e,t,n){"use strict";var r=n("cf5b"),a=n.n(r);a.a},7543:function(e,t,n){},b0dce:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAA/klEQVR4AYzSgYYCYRSG4SmYiQW0qEIXVBfRBqh7HNC2ewEJZIdBwQZaAM9GB78azXwAzss57/my5igUWffIlUp51/GBEpQG3ca3qFTYvkCkqc3M1JI0Acl4douZUwsQB28cwdHmfvgLwNhBmoNxI6AAPZ84WRgaWjhhpweKR+9UPnAxyiLGfrFSoZQn3sPMF5ZZEkt8h7HSILwLM/4wSQETXMPY/S/eEuCKaQqYEkAdQLLStMtK6dE/T0ePXLCK8fxZa98OZ3PvhubO2OmDvPlxE3tp9m4S2qqxFtWwjmp0Ll/dqa1hrK3e/4MCWLzch4U7hVmU8kIAES+4lAMAFLHcoWF4uAAAAAAASUVORK5CYII="},cf5b:function(e,t,n){},d679:function(e,t,n){"use strict";var r=n("338e"),a=n.n(r);a.a},dd6a:function(e,t,n){},e42c:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RERCMUIwOUY4NkNFMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RERCMUIwOUU4NkNFMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJBOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJCOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jUqS1wAAApVJREFUeNq0l89rE1EQx3e3gVJoSPzZeNEWPKgHoa0HBak0iHiy/4C3WvDmoZ56qJ7txVsPQu8qlqqHIhRKJZceesmhioQEfxTEtsoSpdJg1u/ABJ7Pmc1m8zLwgWTmzcw3L+/te+tHUeQltONgCkyCi2AEDHLsJ6iBMlgHL8FeoqokoA2j4CloRMmtwTmj7erHBXPgCWhG6a3JNXKdCiDl1cidVbXZkJoXQRi5t5BrxwoY71FzU8S4JuAIqFkJ2+BFSlEh525b/hr3+k/AklDkNsf6wTT4yv46KIMNpsy+iMdMc47HNWxbsgVcUn7FmLAzzoFAWDsBx+wVP6bUpp5ewI+DOeUx0Wd9D8F70BTGNjkWtqnhmT1JQAHcUgZd8Lo3rQb1LAT8eJVUfgGvHQigGp+V2Z0iAUUl8QH47kAA1XioxIo+bRN8OG8F/oBjwv+Z1nJgX5jpdzQDw0LCjsPmrcW7I/iHScCAEDj03FtD8A0EyuChHgg4KTlJQF3wZ7WELppnBX+dBFSVpJsOBWi1qiRgSwnOgoyD5hmuJdkWCVhTgnTvW3AgYIFrSbZGh0UW/Io5Vp+DQoK7o80pztWMemZbgxeNwCNwDbw1fIfgGZjhU6xPaJgBV8BdsMw5cbZoHsenwYFxkZzl83xTSKTiviCAfCsJLysH3POfC8m8NegyGAGfLP/VmGmfSChgXroR0RSWjEFv2J/nG84cuKFMf4sTCZqXuJd4KaXFVjEG3+tw4eXbNK/YC9oXXs3O8NY8y99L4BXY5cvLY/Bb2VZ58EOJVcB18DHJq9lRsKr8inyKGVjlmh29mtHs3AHfuhCwy1vXT/Nu2GKQt+UHsGdctyX6eQyNvc+5sfX9Dl7Pe2J/BRgAl2CpwmrsHR0AAAAASUVORK5CYII="},ebbb:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQAAAADIDABVAAAAAnRSTlMAAHaTzTgAAAAbSURBVHgBY8AG2A8/AGM2hgQ4RgPIcnD1WAAArS8JDWjIOJkAAAAASUVORK5CYII="},f78c:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAATklEQVR4Ae3VtQHAMAwFUW2o7e06sMcFqzDjf63hOslWEcCBwHYB8KlAzn7ZVOAQzw1YS4Hexc0BBay1OqDAt2dRyn7p3MKJbBcBtzWkACRdYAK61wtcAAAAAElFTkSuQmCC"},fbe9:function(e,t,n){e.exports=n.p+"img/baseline_insert_drive_file_black_24dp.5c03877d.svg"}});
//# sourceMappingURL=app.262853b0.js.map