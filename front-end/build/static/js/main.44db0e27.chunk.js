(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[1],{12:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"a",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"d",(function(){return s}));var r,o=e(15),c=e(22),a=window.location.origin+"/",i={TOKEN:"token",IS_ADMIN:"is_admin",TEST_MODE:"test-mode",DARK_MODE:"dark-mode",ADVANCED_MODE:"advanced-mode"},u={0:"danger",1:"success",2:"dark",3:"warning",4:"primary",5:"info",6:"secondary"},s=(r={},Object(o.a)(r,c.b.UNANSWERED,"No en casa"),Object(o.a)(r,c.b.ANSWERED,"Atendi\xf3"),Object(o.a)(r,c.b.NON_EXISTENT,"No existe"),Object(o.a)(r,c.b.NO_CALL,"No visitar"),Object(o.a)(r,c.b.ANSWERING_MACHINE,"Contestador"),Object(o.a)(r,c.b.POSTPONE,"Aplazar"),Object(o.a)(r,c.b.IGNORE,"Ignorar"),r)},19:function(n,t,e){"use strict";e.d(t,"b",(function(){return c})),e.d(t,"a",(function(){return a})),e.d(t,"d",(function(){return v})),e.d(t,"c",(function(){return g}));var r=e(0),o=e(24),c=function(){return Object(r.useContext)(o.b)},a=function(){return Object(r.useContext)(o.a)},i=e(30),u=e(13),s=e.n(u),l=e(20),d=e(17),b=e(36),f=e(37),j=e(12),p=e(40),O=function(){function n(t,e){var r;Object(b.a)(this,n),this.token=void 0,this.useToken=void 0,this.isTest=void 0;var o=null!==(r=localStorage.getItem(j.a.TOKEN))&&void 0!==r?r:"";e&&!o&&console.warn("Warning, trying to use token when there is none in storage."),this.token=o,this.useToken=e,this.isTest=t}return Object(f.a)(n,[{key:"generateFetchParams",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",e=arguments.length>2?arguments[2]:void 0,r="string"===typeof n?n:n.path,o="".concat(this.composeQueryParams(Object(d.a)(Object(d.a)({},"string"!==typeof n?n.params:{}),this.isTest?{test:"1"}:{}))),c="".concat(j.b).concat(r).concat(o),a={method:t,body:e?JSON.stringify(Object(p.decamelizeKeys)(e)):void 0,headers:{Authorization:this.useToken?"Bearer ".concat(this.token):void 0,"content-type":"application/json"}};return[c,a]}},{key:"doRequest",value:function(){var n=Object(l.a)(s.a.mark((function n(t){var e,r,o,c;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t;case 3:if((e=n.sent).ok){n.next=6;break}throw e;case 6:if(!(null===(r=e.headers.get("content-type"))||void 0===r?void 0:r.includes("application/json"))){n.next=13;break}return n.next=10,e.json();case 10:n.t0=n.sent,n.next=16;break;case 13:return n.next=15,e.text();case 15:n.t0=n.sent;case 16:return o=n.t0,c=o&&Object(p.camelizeKeys)(o),n.abrupt("return",[null,c]);case 22:return n.prev=22,n.t1=n.catch(0),console.warn("Fetching error:",n.t1),n.abrupt("return",[n.t1,null]);case 26:case"end":return n.stop()}}),n,null,[[0,22]])})));return function(t){return n.apply(this,arguments)}}()},{key:"composeQueryParams",value:function(n){var t=Object.keys(n).map((function(t){return encodeURIComponent(t)+"="+encodeURIComponent(n[t])})).join("&");return t&&"?"+t}},{key:"get",value:function(){var n=Object(l.a)(s.a.mark((function n(t){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",this.doRequest(fetch.apply(void 0,Object(i.a)(this.generateFetchParams(t)))));case 1:case"end":return n.stop()}}),n,this)})));return function(t){return n.apply(this,arguments)}}()},{key:"post",value:function(){var n=Object(l.a)(s.a.mark((function n(t,e){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",this.doRequest(fetch.apply(void 0,Object(i.a)(this.generateFetchParams(t,"POST",e)))));case 1:case"end":return n.stop()}}),n,this)})));return function(t,e){return n.apply(this,arguments)}}()},{key:"put",value:function(){var n=Object(l.a)(s.a.mark((function n(t,e){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",this.doRequest(fetch.apply(void 0,Object(i.a)(this.generateFetchParams(t,"PUT",e)))));case 1:case"end":return n.stop()}}),n,this)})));return function(t,e){return n.apply(this,arguments)}}()},{key:"delete",value:function(){var n=Object(l.a)(s.a.mark((function n(t){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",this.doRequest(fetch.apply(void 0,Object(i.a)(this.generateFetchParams(t,"DELETE")))));case 1:case"end":return n.stop()}}),n,this)})));return function(t){return n.apply(this,arguments)}}()}]),n}(),h=function(){function n(t){Object(b.a)(this,n),this.phonesStorageKey=void 0,this.phonesStorageKey="phones"+(t?"_test":"")}return Object(f.a)(n,[{key:"getAll",value:function(){var n=localStorage.getItem(this.phonesStorageKey);return n?JSON.parse(n):[]}},{key:"add",value:function(n){var t=this.getAll();if(t.find((function(t){return t.id===n.id})))return null;if(t.length>=6){var e=t.shift();return t.push(n),localStorage.setItem(this.phonesStorageKey,JSON.stringify(t)),null!==e&&void 0!==e?e:null}return t.push(n),localStorage.setItem(this.phonesStorageKey,JSON.stringify(t)),null}},{key:"update",value:function(n,t){var e=this.getAll(),r=e.find((function(t){return t.id===n}));r&&(r.status=t,r.restore.lastStatus=t,localStorage.setItem(this.phonesStorageKey,JSON.stringify(e)))}}]),n}(),m=e(34),v=function(){var n=Object(m.b)().reactive,t=c().testModeEnabled,e=Object(r.useMemo)((function(){return new h(t)}),[t]);return Object(r.useMemo)((function(){return{getAll:e.getAll.bind(e),add:n(e.add.bind(e)),update:n(e.update.bind(e))}}),[e,n])},g=function(){var n=c().testModeEnabled;return Object(r.useCallback)((function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return new O(n,t)}),[n])}},21:function(n,t,e){"use strict";e.d(t,"e",(function(){return _})),e.d(t,"g",(function(){return F})),e.d(t,"d",(function(){return U})),e.d(t,"a",(function(){return G.a})),e.d(t,"i",(function(){return G.c})),e.d(t,"f",(function(){return A})),e.d(t,"b",(function(){return V})),e.d(t,"h",(function(){return Q})),e.d(t,"c",(function(){return on})),e.d(t,"j",(function(){return rn}));var r=e(2),o=e(0),c=e(19),a=e(7),i=e(9),u=e(77),s=e(78),l=e(79),d=e(80),b=e(81),f=e(82),j=e(83),p=e(84),O=e(85),h=e(5),m=e(38),v=e(34);function g(){var n=Object(a.a)(["\n  border-top: 1px solid gray;\n"]);return g=function(){return n},n}function x(){var n=Object(a.a)(["\n  color: ",";\n  display: inline-block;\n  padding: ","rem 0rem;\n"]);return x=function(){return n},n}function k(){var n=Object(a.a)(["\n  border-top: 1px solid gray;\n\n  > a {\n    cursor: pointer;\n    display: inline-block;\n  }\n"]);return k=function(){return n},n}function y(){var n=Object(a.a)(["\n  justify-content: right;\n  text-align: right;\n  padding-top: 1rem;\n"]);return y=function(){return n},n}function E(){var n=Object(a.a)(["\n  color: ",";\n"]);return E=function(){return n},n}var S=function(){var n=Object(o.useState)(!0),t=Object(i.a)(n,2),e=t[0],a=t[1],O=Object(o.useRef)(null),h=Object(o.useState)(!0),m=Object(i.a)(h,2),g=m[0],x=m[1],k=Object(o.useRef)(null);Object(v.a)(O,(function(){return!e&&a(!0)}));var y=function(){return a(!e)},E=Object(G.c)().AlertManager,S=Object(c.b)(),I=S.darkModeEnabled,T=S.advancedModeEnabled,D=S.testModeEnabled,R=S.toggleAdvancedMode,_=S.toggleDarkMode,P=S.toggleTestMode,z=Object(c.a)(),L=z.isAuth,K=z.isAdmin,Y=z.doLogout,F=function(){return y()};Object(o.useEffect)((function(){window.addEventListener("beforeinstallprompt",(function(n){n.preventDefault(),k.current=n}));var n=!0===window.navigator.standalone,t=window.matchMedia("(display-mode: standalone)").matches;(n||t)&&x(!1)}),[]);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(G.a,{name:"test-mode-alert",position:"bottom",children:"En el modo de prueba, todo funciona con un duplicado de la app real."}),Object(r.jsx)("div",{ref:O,children:Object(r.jsx)(u.a,{color:"dark",dark:!0,children:Object(r.jsxs)(s.a,{children:[Object(r.jsxs)(l.a,{className:"mr-auto",children:["OPPCampa\xf1a"," Telef\xf3nica"," ",Object(r.jsxs)(w,{children:["v","4.0.1"]})]}),Object(r.jsx)(d.a,{onClick:y,className:"mr-2"}),Object(r.jsx)(b.a,{isOpen:!e,navbar:!0,children:Object(r.jsxs)(N,{navbar:!0,children:[Object(r.jsx)(f.a,{children:Object(r.jsx)(Q,{label:"Modo oscuro",checked:I,onChange:_})}),L&&Object(r.jsx)(f.a,{children:Object(r.jsx)(Q,{label:"Modo avanzado",checked:T,onChange:R})}),K&&Object(r.jsx)(f.a,{children:Object(r.jsx)(Q,{label:"Modo de prueba",checked:D,onChange:function(n){n?E.show("test-mode-alert"):E.hide("test-mode-alert"),P(n)}})}),K&&Object(r.jsxs)(M,{children:[Object(r.jsx)(f.a,{onClick:F,children:Object(r.jsx)(A,{to:"/admin-panel",background:"dark",children:"Ir al Panel de administraci\xf3n"})}),Object(r.jsx)(f.a,{onClick:F,children:Object(r.jsx)(A,{to:"/telefonica",background:"dark",children:"Ir a Telef\xf3nica"})})]}),L&&Object(r.jsx)(f.a,{children:Object(r.jsx)(C,{children:Object(r.jsx)(j.a,{onClick:function(){Y(),F()},children:"Cerrar sesi\xf3n"})})}),g&&Object(r.jsx)(M,{children:Object(r.jsx)(p.a,{block:!0,className:"my-2",color:"info",onClick:function(){var n,t;null===(n=k.current)||void 0===n||n.prompt(),null===(t=k.current)||void 0===t||t.userChoice.then((function(n){"accepted"===n.outcome&&x(!1)}))},children:"Instalar App"})})]})})]})})})]})},w=h.c.small(E(),(function(n){return n.theme.text.colors.secondary})),N=Object(h.c)(O.a)(y()),C=h.c.div(k()),A=Object(h.c)(m.b)(x(),(function(n){var t=n.theme;return"dark"===n.background||t.darkMode?t.text.colors.lightgreen:t.text.colors.info}),(function(n){return n.noPadding?0:.5})),M=h.c.div(g());function I(){var n=Object(a.a)(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 9999;\n  background: darkred;\n  color: white;\n  padding: 5px 10px;\n  border-top: 2px solid orange;\n  border-bottom: 2px solid orange;\n  width: 400px;\n  text-align: center;\n  transform: rotate(-45deg) translateX(-185px) translateY(73px);\n  transform-origin: left;\n"]);return I=function(){return n},n}var T=function(){return Object(r.jsx)(D,{children:Object(r.jsx)("span",{children:"Modo de Prueba"})})},D=h.c.div(I()),R=e(44),_=function(n){var t=n.children,e=Object(c.b)(),o=e.testModeEnabled,a=e.darkModeEnabled;return Object(r.jsxs)(r.Fragment,{children:[a&&Object(r.jsx)(R.a,{children:P}),o&&Object(r.jsx)(T,{}),Object(r.jsx)(S,{}),t,Object(r.jsx)(G.a,{name:"not-so-fast",position:"bottom",variant:"failure",children:"\xa1No tan r\xe1pido! No es recomendable tocar un bot\xf3n tan seguido."})]})},P=Object(r.jsx)("style",{children:"\n    body {\n      background: #222 !important;\n      color: white !important;\n    }\n\n    table {\n      color: white !important;\n    }\n\n    .table-striped thead tr {\n      background-color: rgba(0,0,0,.95)\n    }\n\n    .table-striped tbody tr:nth-of-type(even) {\n      background-color: rgba(0,0,0,.5)\n    }\n\n    .text-secondary {\n      color: #999 !important;\n    }\n\n    .modal-content {\n      background-color: #222 !important;\n    }\n\n    .close {\n      color: white !important;\n    }\n\n    .jumbotron {\n      background: #454b4f !important;\n    }\n\n    input {\n      border-top-style: hidden;\n      border-right-style: hidden;\n      border-left-style: hidden;\n      border-bottom-style: groove;\n      background-color: white;\n    }\n\n    input::placeholder {\n      color: #777 !important;\n    }\n\n    .breadcrumb {\n      background-color: #333;\n    }\n\n    .breadcrumb-item.active {\n      color: #ddd;\n    }\n"}),z=e(86);function L(){var n=Object(a.a)(["\n      width: 100%;\n      height: ",";\n    "]);return L=function(){return n},n}function K(){var n=Object(a.a)(["\n  ","\n"]);return K=function(){return n},n}var Y=["success","danger","warning","info"],F=function(n){var t=n.fulfill,e=void 0!==t&&t,o=n.container,c=void 0!==o&&o;return Object(r.jsx)(s.a,{className:"h-100",children:Object(r.jsx)(W,{fulfill:e,container:c,className:"d-flex justify-content-center align-items-center",children:Object(r.jsx)(z.a,{color:Y[Math.floor(Math.random()*Y.length)],style:{width:"3rem",height:"3rem"}})})})},W=h.c.div(K(),(function(n){var t=n.fulfill,e=n.container,r=n.theme;return t&&Object(h.b)(L(),e?"calc(100vh - ".concat(r.navbarHeight,"px)"):"100%")}));function X(){var n=Object(a.a)(["\n  color: ",";\n"]);return X=function(){return n},n}var U=function(){return Object(r.jsx)(H,{className:"d-flex justify-content-center align-items-center h-100 text-center",children:Object(r.jsxs)("h4",{children:["Hubo un problema :( ",Object(r.jsx)("br",{})," ",Object(r.jsx)("br",{})," Intent\xe1 recargando la p\xe1gina."]})})},H=Object(h.c)(s.a)(X(),(function(n){return n.theme.text.colors.error})),G=e(28),J=e(87),q=e(88),V=function(n){var t=n.items;return Object(r.jsx)(J.a,{children:t.map((function(n,e){var o=n.title,c=n.linkTo,a=n.onClick;return Object(r.jsx)(q.a,{onClick:a,active:e===t.length-1,children:c?Object(r.jsx)(A,{to:c,noPadding:!0,children:o}):o},o)}))})};function B(){var n=Object(a.a)(["\n  display: inline-block;\n  position: relative;\n  font-size: 16px;\n  line-height: 24px;\n\n  input {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 36px;\n    height: 20px;\n    opacity: 0;\n    z-index: 0;\n\n    :checked + label:before {\n      background-color: rgba(63, 81, 181, 0.5);\n    }\n\n    :checked + label:after {\n      left: 16px;\n      background-color: cornflowerblue;\n      border-color: cornflowerblue;\n    }\n  }\n\n  label {\n    display: block;\n    padding: 0 0 0 44px;\n    cursor: pointer;\n    color: #fff;\n\n    ::before {\n      content: '';\n      position: absolute;\n      top: 5px;\n      left: 0;\n      width: 36px;\n      height: 14px;\n      background-color: #999;\n      border-radius: 14px;\n      z-index: 1;\n      transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    ::after {\n      content: '';\n      position: absolute;\n      top: 2px;\n      left: 0;\n      width: 20px;\n      height: 20px;\n      background-color: #fff;\n      border: 1px solid #ededed;\n      border-radius: 14px;\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n      z-index: 2;\n      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n      transition-property: left, background-color, border-color;\n    }\n  }\n"]);return B=function(){return n},n}var Q=function(n){var t=n.label,e=void 0===t?"":t,o=n.onChange,c=n.checked;return Object(r.jsxs)(Z,{children:[Object(r.jsx)("input",{type:"checkbox",id:"".concat(e.split(" ").join("-"),"-check"),checked:c,onChange:function(n){return o(n.target.checked)}}),Object(r.jsx)("label",{htmlFor:"".concat(e.split(" ").join("-"),"-check"),children:e||Object(r.jsx)("span",{children:"\xa0"})})]})},Z=h.c.div(B()),$=e(92),nn=e(89),tn=e(90),en=e(91),rn=function(){var n=Object(o.useState)(!1),t=Object(i.a)(n,2),e=t[0],r=t[1],c=function(){e?d():r(!e)},a=Object(o.useState)(null),u=Object(i.a)(a,2),s=u[0],l=u[1],d=function(){r(!1),l(null)};return{isModalOpen:e,data:s,askEditConfirmation:function(n){c(),l(n)},toggleModal:c,reset:d}},on=function(n){var t=n.isOpen,e=n.toggleModal,o=n.onConfirm,c=n.buttonColor,a=n.confirmationLabel,i=n.title,u=n.body;return Object(r.jsxs)($.a,{centered:!0,isOpen:t,toggle:e,children:[Object(r.jsx)(nn.a,{toggle:e,children:i}),u&&Object(r.jsx)(tn.a,{children:u}),Object(r.jsx)(en.a,{children:Object(r.jsx)(p.a,{color:c,onClick:o,children:a})})]})}},22:function(n,t,e){"use strict";var r,o;e.d(t,"b",(function(){return r})),e.d(t,"a",(function(){return o})),function(n){n[n.UNANSWERED=0]="UNANSWERED",n[n.ANSWERED=1]="ANSWERED",n[n.NON_EXISTENT=2]="NON_EXISTENT",n[n.NO_CALL=3]="NO_CALL",n[n.ANSWERING_MACHINE=4]="ANSWERING_MACHINE",n[n.POSTPONE=5]="POSTPONE",n[n.IGNORE=6]="IGNORE"}(r||(r={})),function(n){n[n.RUSHED=7]="RUSHED"}(o||(o={}))},24:function(n,t,e){"use strict";e.d(t,"c",(function(){return v})),e.d(t,"b",(function(){return l})),e.d(t,"a",(function(){return p}));var r=e(2),o=e(0),c=e(13),a=e.n(c),i=e(20),u=e(9),s=e(12),l=Object(o.createContext)({}),d=function(n){var t=n.children,e=b();return Object(r.jsx)(l.Provider,{value:e,children:t})},b=function(){var n=Object(o.useState)(!!localStorage.getItem(s.a.DARK_MODE)),t=Object(u.a)(n,2),e=t[0],r=t[1],c=Object(o.useState)(!!localStorage.getItem(s.a.ADVANCED_MODE)),l=Object(u.a)(c,2),d=l[0],b=l[1],f=Object(o.useState)(!!localStorage.getItem(s.a.TEST_MODE)),j=Object(u.a)(f,2),p=j[0],O=j[1],h=Object(o.useState)(),m=Object(u.a)(h,2),v=m[0],g=m[1],x=Object(o.useState)(!1),k=Object(u.a)(x,2),y=k[0],E=k[1],S=Object(o.useState)(!1),w=Object(u.a)(S,2),N=w[0],C=w[1];return{darkModeEnabled:e,advancedModeEnabled:d,testModeEnabled:p,configurations:v,configsLoading:y,configsError:N,toggleDarkMode:function(n){n?localStorage.setItem(s.a.DARK_MODE,"1"):localStorage.removeItem(s.a.DARK_MODE),r(n)},toggleAdvancedMode:function(n){n?localStorage.setItem(s.a.ADVANCED_MODE,"1"):localStorage.removeItem(s.a.ADVANCED_MODE),b(n)},toggleTestMode:function(n){n?localStorage.setItem(s.a.TEST_MODE,"1"):localStorage.removeItem(s.a.TEST_MODE),O(n)},getConfigs:Object(o.useCallback)(function(){var n=Object(i.a)(a.a.mark((function n(t){var e,r,o,c;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,E(!0),n.next=4,t().get("/configurations");case 4:if(e=n.sent,r=Object(u.a)(e,2),o=r[0],c=r[1],!o){n.next=10;break}throw o;case 10:g(c.configs),C(!1),n.next=17;break;case 14:n.prev=14,n.t0=n.catch(0),C(!0);case 17:return n.prev=17,E(!1),n.finish(17);case 20:case"end":return n.stop()}}),n,null,[[0,14,17,20]])})));return function(t){return n.apply(this,arguments)}}(),[]),updateConfigs:function(n){return g(n)}}},f=e(19),j=e(21),p=Object(o.createContext)({}),O=function(n){var t=n.children,e=h();return Object(r.jsx)(p.Provider,{value:e,children:t})},h=function(){var n=Object(o.useState)(!!localStorage.getItem(s.a.TOKEN)),t=Object(u.a)(n,2),e=t[0],r=t[1],c=Object(o.useState)(!!localStorage.getItem(s.a.IS_ADMIN)),l=Object(u.a)(c,2),d=l[0],b=l[1],p=Object(o.useState)(!1),O=Object(u.a)(p,2),h=O[0],m=O[1],v=Object(j.i)().AlertManager,g=Object(f.c)();return{isAuth:e,isLoading:h,isAdmin:e&&d,doLogin:function(){var n=Object(i.a)(a.a.mark((function n(t,e){var o,c,i,l;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,m(!0),n.next=4,g(!1).post("login",{username:t,password:e});case 4:if(o=n.sent,c=Object(u.a)(o,2),i=c[0],l=c[1],!i){n.next=10;break}throw i;case 10:localStorage.setItem(s.a.TOKEN,l.accessToken),l.isAdmin?localStorage.setItem(s.a.IS_ADMIN,"1"):localStorage.removeItem(s.a.IS_ADMIN),b(l.isAdmin),r(!0),n.next=19;break;case 16:n.prev=16,n.t0=n.catch(0),401===n.t0.status&&v.show("wrong-login-credentials");case 19:return n.prev=19,m(!1),n.finish(19);case 22:case"end":return n.stop()}}),n,null,[[0,16,19,22]])})));return function(t,e){return n.apply(this,arguments)}}(),doLogout:function(){localStorage.removeItem(s.a.TOKEN),localStorage.removeItem(s.a.IS_ADMIN),localStorage.removeItem(s.a.TEST_MODE),r(!1),b(!1)}}},m=e(28),v=function(n){var t=n.children;return Object(r.jsx)(m.b,{children:Object(r.jsx)(d,{children:Object(r.jsx)(O,{children:t})})})}},28:function(n,t,e){"use strict";e.d(t,"a",(function(){return J})),e.d(t,"b",(function(){return j})),e.d(t,"c",(function(){return Q}));var r=e(7),o=e(9),c=e(2),a=e(0),i=e(23),u=e.n(i),s=e(5),l=e(15),d=e(17),b={timeout:0,data:null,show:!1,permanent:!1},f=Object(a.createContext)({}),j=function(n){var t=n.children,e=function(){var n=Object(a.useState)({}),t=Object(o.a)(n,2),e=t[0],r=t[1],c=Object(a.useCallback)((function(n,t){var e=t||{},o=e.timeout,c=void 0===o?4e3:o,a=e.data,i=e.permanent,u=void 0!==i&&i;r((function(t){return Object(d.a)(Object(d.a)({},t),{},Object(l.a)({},n,{timeout:c||0,data:a||null,permanent:u}))}))}),[]),i=Object(a.useCallback)((function(n){r((function(t){return Object(d.a)(Object(d.a)({},t),{},Object(l.a)({},n,void 0))}))}),[]),u=Object(a.useCallback)((function(){r({})}),[]),s=Object(a.useCallback)((function(n){return Object(d.a)({show:!0},e[n]||b)}),[e]);return{AlertManager:Object(a.useMemo)((function(){return{show:c,hide:i,hideAll:u}}),[c,i,u]),getByName:s}}();return Object(c.jsx)(f.Provider,{value:e,children:t})};function p(){var n=Object(r.a)(["\n  0% { transform: translateY(calc(-300%)) translateX(-50%); }\n  30% { transform: translateY(calc(-500%)) translateX(-50%); }\n  100% { transform: translateY(calc(-100% + 40px)) translateX(-50%); }\n"]);return p=function(){return n},n}function O(){var n=Object(r.a)(["\n  0% { transform: translateY(calc(-100% + 40px)) translateX(-50%) }\n  70% { transform: translateY(calc(-500%)) translateX(-50%) }\n  100% { transform: translateY(calc(-300%)) translateX(-50%) }\n"]);return O=function(){return n},n}function h(){var n=Object(r.a)(["\n  from { opacity: 1; transform: translate(-50%, calc(",")) }\n  to { opacity: 1; transform: translate(-50%, 0) }\n"]);return h=function(){return n},n}function m(){var n=Object(r.a)(["\n  from { opacity: 1; transform: translate(-50%, 0) }\n  to { opacity: 1; transform: translate(-50%, calc(",")) }\n"]);return m=function(){return n},n}function v(){var n=Object(r.a)(["\n  from { opacity: 1; transform: translateY(calc(",")) }\n  to { opacity: 1; transform: translateY(0) }\n"]);return v=function(){return n},n}function g(){var n=Object(r.a)(["\n  from { opacity: 1; transform: translateY(0) }\n  to { opacity: 1; transform: translateY(calc(",")) }\n"]);return g=function(){return n},n}function x(){var n=Object(r.a)(["\n  from { opacity: 1 }\n  to { opacity: 0 }\n"]);return x=function(){return n},n}function k(){var n=Object(r.a)(["\n  from { opacity: 0 }\n  to { opacity: 1 }\n"]);return k=function(){return n},n}var y=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(s.d)(g(),n?"-100% - 10px":"-100%")},E=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(s.d)(v(),n?"-100% - 10px":"-100%")},S=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(s.d)(m(),n?"-100% - 10px":"-100%")},w=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(s.d)(h(),n?"-100% - 10px":"-100%")};Object(s.d)(O()),Object(s.d)(p());function N(){var n=Object(r.a)(["\n    "," {\n      width: 100vw;\n      border-radius: 0;\n      left: 0;\n      right: 0;\n      ","\n      transform: ",";\n      animation: "," ","s\n        ",";\n    }\n  "]);return N=function(){return n},n}function C(){var n=Object(r.a)(["\n    animation: "," ","s\n      ",";\n  "]);return C=function(){return n},n}function A(){var n=Object(r.a)(["\n        ","\n        ","\n        top: 100vh;\n        right: 10px;\n        transform: translateY(calc(-100% - 10px));\n        ","\n      "]);return A=function(){return n},n}function M(){var n=Object(r.a)(["\n        ","\n        ","\n        top: 100vh;\n        left: 10px;\n        transform: translateY(calc(-100% - 10px));\n        ","\n      "]);return M=function(){return n},n}function I(){var n=Object(r.a)(["\n        ","\n        ","\n        top: 100vh;\n        left: 50%;\n        transform: translate(-50%, calc(-100% - 10px));\n        ","\n      "]);return I=function(){return n},n}function T(){var n=Object(r.a)(["\n        ","\n        ","\n        top: 10px;\n        right: 10px;\n        ","\n      "]);return T=function(){return n},n}function D(){var n=Object(r.a)(["\n        ","\n        ","\n        top: 10px;\n        left: 10px;\n        ","\n      "]);return D=function(){return n},n}function R(){var n=Object(r.a)(["\n        ","\n        ","\n        top: 10px;\n        left: 50%;\n        transform: translateX(-50%);\n        ","\n      "]);return R=function(){return n},n}var _=function(n,t,e){if(!n)return"";switch(n){case"top":return Object(s.b)(R(),P,z("top-centered",t,e),L("top",t,e));case"top-left":return Object(s.b)(D(),P,z("top",t,e),L("top",t,e));case"top-right":return Object(s.b)(T(),P,z("top",t,e),L("top",t,e));case"bottom":return Object(s.b)(I(),P,z("bottom-centered",t,e),L("bottom",t,e));case"bottom-left":return Object(s.b)(M(),P,z("bottom",t,e),L("bottom",t,e));case"bottom-right":return Object(s.b)(A(),P,z("bottom",t,e),L("bottom",t,e));default:return""}},P="\n    position: fixed;\n    z-index: 100000;\n",z=function(n,t,e){var r=n.endsWith("centered")?[w(!0),S(!0)]:[E(!0),y(!0)],c=Object(o.a)(r,2),a=c[0],i=c[1],u=n.startsWith("top")?[a,i]:[i,a],l=Object(o.a)(u,2),d=l[0],b=l[1];return Object(s.b)(C(),t?d:b,e,t?"ease-out":"ease-in")},L=function(n,t,e){var r="top"===n?[E(),y()]:[y(),E()],c=Object(o.a)(r,2),a=c[0],i=c[1];return Object(s.b)(N(),(function(n){return n.theme.breakpoints.down("sm")}),"top"===n?"top: 0;":"","bottom"===n?"translateY(-100%)":"none",t?a:i,e,t?"ease-out":"ease-in")},K=function(){return null},Y=function(n){var t=n.name,e=n.children,r=Object(a.useContext)(f).AlertManager,o=Object(a.useCallback)((function(){return r.hide(t)}),[t,r]);return Object(a.cloneElement)(e,{onClick:o})};function F(){var n=Object(r.a)(["\n  ","\n  border-bottom: "," 5px solid;\n"]);return F=function(){return n},n}function W(){var n=Object(r.a)(["\n  background: #444;\n  border-bottom: #28a745 5px solid;\n  height: 76px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return W=function(){return n},n}function X(){var n=Object(r.a)(["\n          box-sizing: border-box;\n          border-radius: 4px;\n          background-color: #333;\n          color: #eee;\n          padding: 15px 20px;\n          width: fit-content;\n          display: inline-block;\n          cursor: ",";\n          ","\n          ","\n          ","\n          ","\n        "]);return X=function(){return n},n}function U(){var n=Object(r.a)(["\n          ","\n          ","\n          ","\n        "]);return U=function(){return n},n}function H(){var n=Object(r.a)(["\n      animation: "," ","s ",";\n      opacity: ",";\n    "]);return H=function(){return n},n}function G(){var n=Object(r.a)(["\n  ","\n"]);return G=function(){return n},n}var J=function(n){var t=n.name,e=n.onClose,r=n.enterAnimation,i=n.exitAnimation,l=n.animationDuration,d=void 0===l?.3:l,b=n.animationTimingFunction,j=void 0===b?function(){return"linear"}:b,p=n.noStyle,O=void 0!==p&&p,h=n.children,m=n.containerCSS,v=n.position,g=n.id,y=n.onClick,E=n.variant,S=Object(a.useContext)(f),w=S.getByName,N=S.AlertManager,C=w(t),A=C.show,M=C.timeout,I=C.data,T=C.permanent,D=Object(a.useState)(!1),R=Object(o.a)(D,2),_=R[0],P=R[1],z=Object(a.useState)(null),L=Object(o.a)(z,2),F=L[0],W=L[1],X=Object(a.useRef)(void 0),U=function(){var n=function(){clearTimeout(X.current),P(!1),W(null),null===e||void 0===e||e()};"none"!==i?new Promise((function(n){return setTimeout(n,1e3*d)})).then(n):n()};if(Object(a.useLayoutEffect)((function(){A?(P(!0),I&&W(I),T||(X.current=setTimeout((function(){return N.hide(t)}),M))):_&&U()}),[A]),!_)return null;var H="function"===typeof h?h(F):h,G=Object(c.jsx)(q,{id:g||t,noStyle:O,animation:A?r||Object(s.d)(k()):i||Object(s.d)(x()),animationDuration:d,animationTimingFunction:j(A),show:A,containerCSS:m,position:v,onClick:y,role:"alert",variant:E,children:a.Children.map(H,(function(n){return n&&Object(a.isValidElement)(n)&&n.type.name===K.name?Object(c.jsx)(Y,{name:t,children:Object(c.jsx)("span",{children:n.props.children})}):n}))});return v?u.a.createPortal(G,document.querySelector("body")):G},q=s.c.div(G(),(function(n){var t=n.noStyle,e=n.animation,r=n.animationDuration,o=n.show,c=n.containerCSS,a=n.animationTimingFunction,i=n.position,u=n.onClick,l=n.variant,d=Object(s.b)(H(),e,r,a,o?1:0),b=l?"success"===l?V:B:"";return t?Object(s.b)(U(),d,c,_(i,o,r)):Object(s.b)(X(),u?"pointer":"initial",d,b,c,_(i,o,r))})),V=Object(s.b)(W()),B=Object(s.b)(F(),V,(function(n){return n.theme.text.colors.error})),Q=function(){return{AlertManager:Object(a.useContext)(f).AlertManager}}},34:function(n,t,e){"use strict";e.d(t,"a",(function(){return o})),e.d(t,"c",(function(){return a})),e.d(t,"b",(function(){return i})),e.d(t,"d",(function(){return s}));var r=e(0),o=function(n,t){Object(r.useEffect)((function(){var e=function(e){var r=null===n||void 0===n?void 0:n.current;r&&!r.contains((null===e||void 0===e?void 0:e.target)||null)&&t(e)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),function(){document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[n,t])},c=e(9),a=function(){var n=Object(r.useState)(),t=Object(c.a)(n,2)[1];return{forceUpdate:Object(r.useCallback)((function(){t({})}),[])}},i=function(){var n=a().forceUpdate;return{reactive:Object(r.useCallback)((function(t){return function(){var e=t.apply(void 0,arguments);return n(),e}}),[n])}},u=e(21),s=function(n,t){var e=Object(r.useRef)(void 0),o=Object(r.useRef)(!0);Object(r.useEffect)((function(){return function(){return clearTimeout(e.current)}}),[]);var c=Object(u.i)().AlertManager;return Object(r.useCallback)((function(){!1!==o.current?(n.apply(void 0,arguments),o.current=!1,e.current=setTimeout((function(){o.current=!0}),t)):c.show("not-so-fast",{timeout:3e3})}),[n,t])}},75:function(n,t,e){},76:function(n,t,e){"use strict";e.r(t);var r=e(2),o=e(0),c=e(23),a=e.n(c),i=(e(61),e(17)),u=e(55),s=e(10),l=e(38),d=e(5),b=e(24),f={xs:"0px",sm:"600px",md:"960px",lg:"1150px",xl:"1920px"},j=function(n){var t,e=n.children,c=Object(o.useContext)(b.b).darkModeEnabled;return Object(r.jsx)(d.a,{theme:(t=c,{darkMode:t,navbarHeight:56,text:{colors:{secondary:"#999",error:"#ff5e5e",green:"#28a745",blue:"#2000d4",black:"#222",white:"#fff",lightgreen:"lightgreen",info:"#007bff",red:"#dc3545"}},breakpoints:{up:function(n){return"@media (min-width: ".concat(f[n],")")},down:function(n){return"@media (max-width: ".concat(f[n],")")},between:function(n,t){return"@media (min-width: ".concat(f[n],") and (max-width: ").concat(f[t],")")}}}),children:e})},p=e(19),O=e(21),h=(e(75),Object(o.lazy)((function(){return e.e(7).then(e.bind(null,105))}))),m=Object(o.lazy)((function(){return e.e(4).then(e.bind(null,106))})),v=Object(o.lazy)((function(){return e.e(6).then(e.bind(null,102))})),g=Object(o.lazy)((function(){return e.e(10).then(e.bind(null,107))})),x=Object(o.lazy)((function(){return e.e(5).then(e.bind(null,103))})),k=Object(o.lazy)((function(){return Promise.all([e.e(0),e.e(8)]).then(e.bind(null,104))})),y=Object(o.lazy)((function(){return Promise.all([e.e(0),e.e(9)]).then(e.bind(null,108))})),E=function(){return null},S=function(n){var t=n.component,e=n.condition,o=Object(u.a)(n,["component","condition"]);return Object(r.jsx)(s.b,Object(i.a)(Object(i.a)({},o),{},{component:e?t:E}))},w=function(){var n=Object(p.a)(),t=n.isAuth,e=n.isAdmin,c=Object(p.b)(),a=c.configsLoading,i=c.configsError,u=c.getConfigs,l=Object(s.h)(),d=Object(s.g)(),b=Object(p.c)();return Object(o.useLayoutEffect)((function(){t||l.pathname.includes("/login")||d.push("/login"),t&&l.pathname.includes("/login")&&(e?d.push("/admin-panel"):d.push("/telefonica"))}),[t,e,l.pathname,d]),Object(o.useEffect)((function(){t&&u(b)}),[t,b,u]),a?Object(r.jsx)(O.g,{container:!0,fulfill:!0}):i?Object(r.jsx)(O.d,{}):Object(r.jsx)(o.Suspense,{fallback:Object(r.jsx)(O.g,{container:!0,fulfill:!0}),children:Object(r.jsxs)(s.d,{children:[Object(r.jsx)(s.b,{path:"/login",exact:!0,component:m}),Object(r.jsx)(S,{path:"/telefonica",component:v,condition:t}),Object(r.jsx)(S,{path:"/admin-panel",exact:!0,component:h,condition:e}),Object(r.jsx)(S,{path:"/admin-panel/statistics",exact:!0,component:g,condition:e}),Object(r.jsx)(S,{path:"/admin-panel/add-phones",exact:!0,component:x,condition:e}),Object(r.jsx)(S,{path:"/admin-panel/search-and-edit",exact:!0,component:k,condition:e}),Object(r.jsx)(S,{path:"/admin-panel/configurations",exact:!0,component:y,condition:e}),Object(r.jsx)(s.a,{to:"/login"})]})})},N=function(){return Object(r.jsx)(b.c,{children:Object(r.jsx)(j,{children:Object(r.jsx)(l.a,{children:Object(r.jsx)(O.e,{children:Object(r.jsx)(w,{})})})})})};a.a.render(Object(r.jsx)(N,{}),document.getElementById("root"))}},[[76,2,3]]]);
//# sourceMappingURL=main.44db0e27.chunk.js.map