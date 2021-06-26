(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[11],{102:function(e,n,t){"use strict";var c=t(4),a=t(7),s=t(0),r=t.n(s),o=t(1),i=t.n(o),l=t(6),d=t.n(l),b=t(3),u={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:b.o,responsiveTag:b.o,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},j=function(e){var n=e.className,t=e.cssModule,s=e.size,o=e.bordered,i=e.borderless,l=e.striped,u=e.dark,j=e.hover,m=e.responsive,h=e.tag,O=e.responsiveTag,x=e.innerRef,p=Object(a.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),f=Object(b.k)(d()(n,"table",!!s&&"table-"+s,!!o&&"table-bordered",!!i&&"table-borderless",!!l&&"table-striped",!!u&&"table-dark",!!j&&"table-hover"),t),N=r.a.createElement(h,Object(c.a)({},p,{ref:x,className:f}));if(m){var v=Object(b.k)(!0===m?"table-responsive":"table-responsive-"+m,t);return r.a.createElement(O,{className:v},N)}return N};j.propTypes=u,j.defaultProps={tag:"table",responsiveTag:"div"},n.a=j},112:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return be}));var c=t(15),a=t.n(c),s=t(18),r=t(22),o=t(9),i=t(2),l=t(0),d=t.n(l),b=t(47),u=t(82),j=t(20),m=t(5),h=t(13),O=t(8),x=t(23),p=function(e){var n=e.phone,t=Object(l.useState)(0),c=Object(o.a)(t,2),a=c[0],s=c[1];return Object(l.useEffect)((function(){s(0)}),[n]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("a",{style:{textDecoration:"underline"},href:"tel:".concat(n),onClick:function(){return s(a+1)},children:n}),Array(a).fill(null).map((function(e){return Object(i.jsx)("span",{className:"d-block text-success",children:"\xa1Tocado!"})}))]})},f=t(17),N=t(84);function v(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: space-between;\n  font-weight: 500;\n  color: ",";\n\n  span {\n    font-weight: 800;\n  }\n"]);return v=function(){return e},e}function g(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: space-between;\n  padding-top: 0.5em;\n"]);return g=function(){return e},e}function k(){var e=Object(m.a)([""]);return k=function(){return e},e}var E=function(e){var n=e.phoneId,t=e.initialNoCallOnWeekends,c=e.initiallyOpen,s=e.onNoCall,d=Object(l.useState)(c),b=Object(o.a)(d,2),u=b[0],m=b[1],O=Object(l.useState)(t),x=Object(o.a)(O,2),p=x[0],v=x[1],g=Object(j.k)().AlertManager,k=Object(h.c)(),E=function(){var e=Object(r.a)(a.a.mark((function e(t,c){var s,r,i,l,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(){},r=c,"callOnWeekends"===t&&(s=function(){return v(p)},v(c),r=!c),e.prev=3,e.next=6,k().put("phones/".concat(n,"/options"),Object(f.a)({},t,r));case 6:if(i=e.sent,l=Object(o.a)(i,1),!(d=l[0])){e.next=11;break}throw d;case 11:g.show("phone-option-update-success"),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),s(),g.hideAll(),g.show("phone-option-update-failed");case 19:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(n,t){return e.apply(this,arguments)}}();return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(j.a,{name:"phone-option-update-success",position:"top",variant:"success",children:"Opci\xf3n de tel\xe9fono actualizada con \xe9xito."}),Object(i.jsx)(j.a,{name:"phone-option-update-failed",position:"bottom",variant:"failure",children:"No se pudo actualizar opci\xf3n de tel\xe9fono."}),Object(i.jsxs)(y,{children:[Object(i.jsxs)(C,{onClick:function(){return m(!u)},children:["Opciones de tel\xe9fono",Object(i.jsx)("span",{children:u?"-":"+"})]}),Object(i.jsxs)(N.a,{isOpen:u,children:[Object(i.jsxs)(w,{children:[Object(i.jsx)("span",{children:"No llamar los fin de semana:"}),Object(i.jsx)(j.h,{id:"no-weekends",checked:p,onChange:function(e){return E("callOnWeekends",e)}})]}),s&&Object(i.jsxs)(w,{children:[Object(i.jsx)("span",{children:"No visitar:"}),Object(i.jsx)(j.h,{id:"no-call",checked:!1,onChange:s})]})]})]})]})},y=O.c.div(k()),w=O.c.div(g()),C=O.c.div(v(),(function(e){var n=e.theme;return n.text.colors[n.darkMode?"lightgreen":"green"]})),S=t(11),A=t(87),T=t(4),R=t(7),M=t(27),D=t(1),I=t.n(D),P=t(6),W=t.n(P),L=t(3),_=t(29);function G(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);n&&(c=c.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,c)}return t}function H(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?G(Object(t),!0).forEach((function(n){Object(M.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):G(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var U={children:I.a.node,className:I.a.string,closeClassName:I.a.string,closeAriaLabel:I.a.string,cssModule:I.a.object,color:I.a.string,fade:I.a.bool,isOpen:I.a.bool,toggle:I.a.func,tag:L.o,transition:I.a.shape(_.a.propTypes),innerRef:I.a.oneOfType([I.a.object,I.a.string,I.a.func])},q={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:H(H({},_.a.defaultProps),{},{unmountOnExit:!0})};function F(e){var n=e.className,t=e.closeClassName,c=e.closeAriaLabel,a=e.cssModule,s=e.tag,r=e.color,o=e.isOpen,i=e.toggle,l=e.children,b=e.transition,u=e.fade,j=e.innerRef,m=Object(R.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),h=Object(L.k)(W()(n,"alert","alert-"+r,{"alert-dismissible":i}),a),O=Object(L.k)(W()("close",t),a),x=H(H(H({},_.a.defaultProps),b),{},{baseClass:u?b.baseClass:"",timeout:u?b.timeout:0});return d.a.createElement(_.a,Object(T.a)({},m,x,{tag:s,className:h,in:o,role:"alert",innerRef:j}),i?d.a.createElement("button",{type:"button",className:O,"aria-label":c,onClick:i},d.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,l)}F.propTypes=U,F.defaultProps=q;var z=F,Q=t(98);function X(){var e=Object(m.a)(["\n  margin-bottom: 0;\n  border: none;\n  color: ",";\n  text-decoration: underline;\n  background: none;\n  margin: auto;\n"]);return X=function(){return e},e}function B(){var e=Object(m.a)(["\n  border-top: 1px solid\n    ",";\n  border-bottom: 1px solid\n    ",";\n  padding: 10px 0;\n  margin-top: 2em;\n  display: flex;\n\n  > div {\n    width: 100%;\n  }\n"]);return B=function(){return e},e}function J(){var e=Object(m.a)(["\n  width: 100%;\n  border-top: none;\n  border-right: none;\n  border-left: none;\n  border-image: initial;\n  border-bottom: 2px solid ",";\n  outline: none;\n  transition: border-bottom-color 0.25s;\n  margin-bottom: 0.5em;\n  border-radius: 5px;\n  padding: 0 10px;\n\n  :focus {\n    border-bottom-color: ",";\n  }\n"]);return J=function(){return e},e}var V=function(e){var n,t,c=e.phone,a=e.comments,s=e.handleComments,r=e.openHelpSection,o=e.handlePhoneFeedback,l=e.selfAssigned,d=e.isFromAnotherTerritory,b=Object(h.b)(),m=b.advancedModeEnabled,O=b.configurations,f=b.currentTerritory,N=O.hiddenButtons,v=f.campaignMode,g=function(e){return!N.split(",").includes(e.toString())},k=Object(j.l)(),y=k.isModalOpen,w=k.data,C=k.askEditConfirmation,T=k.toggleModal,R=k.reset,M=function(e){return function(){m?C(e):o(e)}},D=M(x.b.ANSWERED),I=M(x.b.UNANSWERED),P=M(x.b.NON_EXISTENT),W=M(x.b.NO_CALL),L=M(x.b.ANSWERING_MACHINE),_=M(x.b.POSTPONE),G=M(x.b.IGNORE),H=Object(i.jsx)("div",{className:"table-responsive d-none d-sm-block",children:Object(i.jsxs)("table",{className:"table table-bordered",children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Tel\xe9fono"}),Object(i.jsx)("th",{children:"Otros datos"}),c.comments?Object(i.jsx)("th",{children:"Comentarios"}):null,Object(i.jsx)("th",{children:"\xdaltima fecha que atendi\xf3"}),Object(i.jsx)("th",{children:"\xdaltima fecha que se lo llam\xf3"})]})}),Object(i.jsx)("tbody",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:Object(i.jsx)(p,{phone:c.phone})}),Object(i.jsx)("td",{children:c.info}),c.comments?Object(i.jsx)("td",{children:c.comments}):null,Object(i.jsx)("td",{children:null!==(n=c.answeredOn)&&void 0!==n?n:"Nunca"}),Object(i.jsx)("td",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(i.jsxs)(i.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]})})]})}),U=Object(i.jsxs)("div",{className:"d-block d-sm-none text-center",children:[Object(i.jsx)("span",{style:{fontWeight:500},children:"Tel\xe9fono:"}),Object(i.jsx)("div",{children:Object(i.jsx)(p,{phone:c.phone})}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{style:{fontWeight:500},children:"Otros datos:"}),Object(i.jsx)("div",{children:c.info}),Object(i.jsx)("br",{}),c.comments&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("span",{style:{fontWeight:500},children:"Comentarios:"}),Object(i.jsx)("div",{children:c.comments}),Object(i.jsx)("br",{})]}),Object(i.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que atendi\xf3:"}),Object(i.jsx)("div",{children:null!==(t=c.answeredOn)&&void 0!==t?t:"Nunca"}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{style:{fontWeight:500},children:"\xdaltima fecha que se lo llam\xf3:"}),Object(i.jsx)("div",{children:c.unansweredDate?c.unansweredDate:c.fulfilledOn?Object(i.jsxs)(i.Fragment,{children:["jue, 25 jun 2020"===c.fulfilledOn&&"Antes del ",c.fulfilledOn]}):"Nunca"})]}),q=Object(i.jsx)(Y,{children:Object(i.jsx)(Z,{onClick:r,children:"\xbfQu\xe9 hace cada bot\xf3n?"})}),F=Object(i.jsx)("div",{className:"row my-4",children:Object(i.jsxs)("div",{className:"col-12",children:[Object(i.jsx)("span",{className:"text-secondary d-inline-block mb-2",children:"Comentarios (opcional):"}),Object(i.jsx)(K,{placeholder:"Su comentario ac\xe1...",type:"text",value:a,onChange:function(e){return s(e.target.value)}}),c.commentedOn&&Object(i.jsxs)("span",{className:"input-helper text-secondary",children:["Comentado el:"," ",Object(i.jsx)("span",{className:"text-success",children:c.commentedOn})]}),c.answeringMachineDate&&Object(i.jsxs)("span",{className:"d-block input-helper text-secondary",children:["\xdaltimo mensaje en el contestador:"," ",Object(i.jsx)("span",{className:"text-success",children:c.answeringMachineDate})]}),!c.commentedOn&&!c.answeringMachineDate&&Object(i.jsx)("span",{className:"input-helper text-secondary",children:"Ej.: lugar de trabajo, no habla espa\xf1ol, etc."})]})}),X=v?Object(i.jsx)("div",{className:"my-4",children:Object(i.jsx)(A.a,{color:"success",block:!0,onClick:function(){return o(x.a.RUSHED)},children:"Siguiente"})}):m?Object(i.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[g(x.b.ANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-success btn-lg w-100 mx-auto mx-md-0 d-block",onClick:D,children:"Atendi\xf3"})}),g(x.b.UNANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-danger btn-lg w-100 mx-auto mx-md-0 d-block",onClick:I,children:"No en casa"})}),g(x.b.ANSWERING_MACHINE)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-primary btn-lg w-100 mx-auto mx-md-0 d-block",onClick:L,children:"Contestador"})}),g(x.b.POSTPONE)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-info btn-lg w-100 mx-auto mx-md-0 d-block",onClick:_,children:"Aplazar"})}),g(x.b.IGNORE)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-secondary btn-lg w-100 mx-auto mx-md-0 d-block",onClick:G,children:"Ignorar"})}),g(x.b.NO_CALL)&&Object(i.jsx)("div",{className:"col-6 mb-2 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-warning btn-lg w-100 mx-auto mx-md-0 d-block",onClick:W,children:"No visitar"})}),g(x.b.NON_EXISTENT)&&Object(i.jsx)("div",{className:"col-6 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-dark btn-lg w-100 mx-auto mx-md-0 d-block",onClick:P,children:"No existe"})})]}):Object(i.jsxs)("div",{className:"my-4 row d-flex justify-content-center",children:[g(x.b.ANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-success btn-lg mx-auto mx-md-0 d-block w-100",onClick:D,children:"Atendi\xf3"})}),g(x.b.UNANSWERED)&&Object(i.jsx)("div",{className:"col-6 mb-3 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-danger btn-lg mx-auto mx-md-0 d-block w-100",onClick:I,children:"No en casa"})}),g(x.b.NO_CALL)&&Object(i.jsx)("div",{className:"col-6 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-warning btn-lg mx-auto mx-md-0 d-block w-100",onClick:W,children:"No visitar"})}),g(x.b.NON_EXISTENT)&&Object(i.jsx)("div",{className:"col-6 col-md-auto",children:Object(i.jsx)("button",{className:"btn btn-dark btn-lg mx-auto mx-md-0 d-block w-100",onClick:P,children:"No existe"})})]});return Object(i.jsxs)(u.a,{className:"py-4",children:[l&&Object(i.jsx)(z,{color:"warning",children:"Usando n\xfamero autoasignado"}),d&&Object(i.jsx)(z,{color:"danger",children:"\xa1El n\xfamero es de otro territorio!"}),H,U,F,!!m&&Object(i.jsx)(Y,{children:Object(i.jsx)(E,{phoneId:c.id,initialNoCallOnWeekends:c.noWeekends,initiallyOpen:!1,onNoCall:!!v&&W})}),!!v&&Object(i.jsx)(Q.a,{fluid:!0,className:"my-2",children:Object(i.jsxs)(u.a,{children:[Object(i.jsx)("h6",{children:"\xa1Estamos en campa\xf1a!"}),Object(i.jsx)("small",{children:'Durante la campa\xf1a, solo habr\xe1 un bot\xf3n de "siguiente".'})]})}),X,m&&!v&&q,null!==w&&Object(i.jsx)(j.c,{isOpen:y,toggleModal:T,onConfirm:function(){null!==w&&(o(w),R())},title:"\xbfSeguro?",buttonColor:S.c[w],confirmationLabel:S.d[w]})]})},K=O.c.input(J(),(function(e){return e.theme.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.black})),Y=O.c.div(B(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary}),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:n.text.colors.secondary})),Z=O.c.button(X(),(function(e){var n=e.theme;return n.darkMode?n.text.colors.white:"#555"}));function $(){var e=Object(m.a)(["\n  width: 100%;\n"]);return $=function(){return e},e}function ee(){var e=Object(m.a)(["\n  display: flex;\n  padding: 20px 0;\n  min-height: calc(100vh - ","px);\n  justify-content: space-evenly;\n  flex-direction: column;\n"]);return ee=function(){return e},e}var ne=function(e){var n=e.close,t=Object(h.b)(),c=t.advancedModeEnabled,a=t.configurations,s=function(e){return!a.hiddenButtons.split(",").includes(e.toString())};return Object(i.jsxs)(te,{children:[s(x.b.ANSWERED)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de ",Object(i.jsx)("span",{className:"text-success",children:"atendi\xf3"}),"?"]}),Object(i.jsx)("p",{children:"Manda el n\xfamero al final de la cola y registra la fecha en que se atendi\xf3."})]}),s(x.b.UNANSWERED)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-danger",children:"no en casa"}),"?"]}),Object(i.jsxs)("p",{children:["Guarda el n\xfamero para llamarlo de vuelta ma\xf1ana, hasta un m\xe1ximo de"," ",a.unansweredMaxAttemps," intentos. Luego, si no atendi\xf3, se lo manda al final de la cola."]})]}),c&&Object(i.jsxs)(i.Fragment,{children:[s(x.b.ANSWERING_MACHINE)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-primary",children:"contestador"}),"?"]}),Object(i.jsxs)("p",{children:["Registra la \xfaltima vez que se le dej\xf3 un mensaje en el contestador al amo de casa.\xa0",a.answeringMachineMaxAttemps>1&&Object(i.jsxs)("span",{children:["Adem\xe1s, congela el n\xfamero durante"," ",a.answeringMachinePostponedDays," d\xedas para darle un m\xe1ximo de"," ",a.answeringMachineMaxAttemps,' oportunidades. Estas oportunidades se computan junto a las que ya se le dio con el bot\xf3n "no en casa" si ha sido el caso.']})]})]}),s(x.b.POSTPONE)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de ",Object(i.jsx)("span",{className:"text-info",children:"aplazar"}),"?"]}),Object(i.jsxs)("p",{children:["Congela el n\xfamero para que se lo llame dentro de"," ",a.postponedButtonDays," ",a.postponedButtonDays>1?"d\xedas":"d\xeda","."]})]}),s(x.b.IGNORE)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-secondary",children:"ignorar"}),"?"]}),Object(i.jsx)("p",{children:"Manda el n\xfamero directamente al final de la cola."})]})]}),s(x.b.NO_CALL)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-warning",children:"no visitar"}),"?"]}),Object(i.jsx)("p",{children:"Quita el n\xfamero de la cola. No se lo borra pero tampoco se lo volver\xe1 a llamar."})]}),s(x.b.NON_EXISTENT)&&Object(i.jsxs)("div",{className:"text-center",children:[Object(i.jsxs)("h6",{children:["\xbfQu\xe9 hace el bot\xf3n de"," ",Object(i.jsx)("span",{className:"text-secondary",children:"no existe"}),"?"]}),Object(i.jsxs)("p",{children:["Suspende el n\xfamero durante ",a.nonExistentPostponedDays," ","d\xedas. Luego vuelve a la cola porque existe la posibilidad de que se haya reactivado."]})]}),Object(i.jsx)("p",{className:"text-center",children:"Nota: en ning\xfan caso se borran los n\xfameros. Si correspondiera (por ej. por estar fuera del territorio), por favor, comunicarse con el siervo de territorios."}),Object(i.jsx)(ce,{className:"btn btn-secondary",onClick:n,children:"Volver"})]})},te=O.c.div(ee(),(function(e){return e.theme.navbarHeight})),ce=O.c.button($()),ae=t(102),se=t(52);function re(){var e=Object(m.a)(["\n  position: absolute;\n  left: 0px;\n  background: rgb(34, 34, 34);\n  width: 100%;\n  border: 1px solid rgb(102, 102, 102);\n  padding: "," 10px;\n  display: flex;\n  justify-content: space-evenly;\n  flex-wrap: wrap;\n  transition: padding 0.3s, height 0.3s;\n  z-index: 1;\n"]);return re=function(){return e},e}var oe=function(e){var n,t,c=e.currentPhoneId,a=e.onEditRequest,s=e.PhoneStorage,r=Object(l.useState)(null),d=Object(o.a)(r,2),b=d[0],u=d[1],m=Object(j.l)(),O=m.isModalOpen,p=m.data,f=m.askEditConfirmation,N=m.toggleModal,v=m.reset,g=Object(h.b)(),k=g.configurations.hiddenButtons,E=g.currentTerritory.campaignMode,y=function(e){return!k.split(",").includes(e.toString())&&!(E&&[x.b.UNANSWERED,x.b.ANSWERED,x.b.NON_EXISTENT,x.b.NO_CALL,x.b.ANSWERING_MACHINE,x.b.IGNORE].includes(e))&&!(!E&&[x.a.RUSHED].includes(e))},w=null!==(n=null===p||void 0===p?void 0:p.feedbackToConfirm)&&void 0!==n?n:null,C=null!==(t=null===p||void 0===p?void 0:p.storagePhoneToConfirm)&&void 0!==t?t:null,T=function(e,n){return f({storagePhoneToConfirm:n,feedbackToConfirm:e})},R=s.getAll().reverse().map((function(e,n){if(e.id===c)return null;var t=Object(se.a)(e.savedOn),a=null!==e.status?S.c[e.status]:"",s=t||null!==e.status?null!==e.status?S.d[e.status]:"Sin respuesta":"Asignado a otro publicador",r=n===b;return Object(i.jsxs)("tr",{style:{position:"relative"},children:[Object(i.jsx)("td",{children:e.phone}),Object(i.jsx)("td",{children:Object(i.jsx)("span",{className:"text-".concat(a),children:s})}),Object(i.jsxs)("td",{children:[t&&Object(i.jsx)(A.a,{color:"secondary",onClick:function(){return function(e){return u(b!==e?e:null)}(n)},children:"Editar"}),Object(i.jsxs)(ie,{isOpen:r,children:[e.status!==x.a.RUSHED&&y(x.a.RUSHED)&&Object(i.jsx)("button",{className:"btn btn-success btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.a.RUSHED,e)},children:"Completado"}),e.status!==x.b.ANSWERED&&y(x.b.ANSWERED)&&Object(i.jsx)("button",{className:"btn btn-success btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.ANSWERED,e)},children:"Atendi\xf3"}),e.status!==x.b.UNANSWERED&&y(x.b.UNANSWERED)&&Object(i.jsx)("button",{className:"btn btn-danger btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.UNANSWERED,e)},children:"No en casa"}),e.status!==x.b.ANSWERING_MACHINE&&y(x.b.ANSWERING_MACHINE)&&Object(i.jsx)("button",{className:"btn btn-primary btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.ANSWERING_MACHINE,e)},children:"Contestador"}),e.status!==x.b.POSTPONE&&y(x.b.POSTPONE)&&Object(i.jsx)("button",{className:"btn btn-info btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.POSTPONE,e)},children:"Aplazar"}),e.status!==x.b.IGNORE&&y(x.b.IGNORE)&&Object(i.jsx)("button",{className:"btn btn-secondary btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.IGNORE,e)},children:"Ignorar"}),e.status!==x.b.NO_CALL&&y(x.b.NO_CALL)&&Object(i.jsx)("button",{className:"btn btn-warning btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.NO_CALL,e)},children:"No visitar"}),e.status!==x.b.NON_EXISTENT&&y(x.b.NON_EXISTENT)&&Object(i.jsx)("button",{className:"btn btn-dark btn-sm d-inline-block mr-1 mb-2",onClick:function(){return T(x.b.NON_EXISTENT,e)},children:"No existe"})]})]})]},e.id)}));return R.filter((function(e){return!!e})).length>0?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h6",{className:"container mb-3",children:"N\xfameros anteriores en este dispositivo:"}),Object(i.jsxs)(ae.a,{responsive:!0,className:"text-center",children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Tel\xe9fono"}),Object(i.jsx)("th",{children:"Estado"}),Object(i.jsx)("th",{children:"Acciones"})]})}),Object(i.jsx)("tbody",{children:R})]}),null!==w&&Object(i.jsx)(j.c,{isOpen:O,toggleModal:N,onConfirm:function(){C&&"number"===typeof w&&(a(C,w),u(null),v())},title:"\xbfSeguro?",buttonColor:S.c[w],confirmationLabel:S.d[w]})]}):null},ie=Object(O.c)(N.a)(re(),(function(e){return e.isOpen?"20px":"0"})),le=t(10),de=t(26),be=function(){var e=Object(l.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],d=Object(l.useState)(!0),m=Object(o.a)(d,2),O=m[0],x=m[1],p=Object(l.useState)(!1),f=Object(o.a)(p,2),N=f[0],v=f[1],g=Object(l.useState)(""),k=Object(o.a)(g,2),E=k[0],y=k[1],w=Object(h.d)(),C=Object(h.b)(),S=C.CONG_INITIALS,A=C.advancedModeEnabled,T=C.currentTerritory,R=Object(j.k)().AlertManager,M=Object(h.c)(),D=new URLSearchParams(window.location.search).get("id"),I=Object(l.useCallback)(Object(r.a)(a.a.mark((function e(){var n,t,r,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,x(!0),v(!1),e.next=5,M().get(D?{path:"next",params:{id:D}}:"next");case 5:if(n=e.sent,t=Object(o.a)(n,2),r=t[0],i=t[1],!r){e.next=11;break}throw r;case 11:c(i.phone),y(i.phone.comments),R.show("new-phone-received",{timeout:2e3}),w.add({id:i.phone.id,status:null,phone:i.phone.phone,savedOn:Date.now(),restore:Object(s.a)(Object(s.a)({},i.original),{},{lastStatus:null})}),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(0),console.log({e:e.t0}),v(!0);case 21:return e.prev=21,x(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[0,17,21,24]])}))),[R,w,M,D]);Object(l.useEffect)((function(){T.active&&I()}),[I,T]);var P=function(){var e=Object(r.a)(a.a.mark((function e(n){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,x(!0),e.next=6,M().put("update_phone",{id:t.id,answered:n,comments:E});case 6:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=11;break}throw r;case 11:I(),w.update(t.id,n),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(2),R.hideAll(),R.show("feedback-failed"),x(!1);case 20:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(n){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(a.a.mark((function e(n,t){var c,s,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M().put("update_phone",{id:n.id,answered:t,restore:n.restore});case 3:if(c=e.sent,s=Object(o.a)(c,1),!(r=s[0])){e.next=8;break}throw r;case 8:w.update(n.id,t),R.show("edit-success"),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),R.hideAll(),R.show("feedback-failed");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),L=Object(de.e)(P,5e3),_=Object(de.e)(W,5e3),G=Object(le.g)(),H=function(){return G.push("/".concat(T.name,"/telefonica/help"))},U=function(){return G.goBack()},q=function(e){return y(e)};if(N)return Object(i.jsx)(j.d,{message:"No hay m\xe1s n\xfameros disponibles por el d\xeda de hoy"});if(!T.active)return Object(i.jsx)(j.d,{message:"Este territorio est\xe1 desactivado."});if(O||!t)return Object(i.jsx)(j.g,{fulfill:!0,container:!0});return Object(i.jsx)(u.a,{children:Object(i.jsxs)(le.d,{children:[Object(i.jsx)(le.b,{path:"/:territory/telefonica",exact:!0,render:function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(b.a,{children:Object(i.jsxs)("title",{children:[S," Telef\xf3nica"]})}),Object(i.jsx)(j.a,{name:"new-phone-received",position:"top",variant:"success",children:Object(i.jsx)("div",{className:"text-center",children:"\u2728 \xa1Nuevo n\xfamero recibido! \u2728\ud83c\udf89"})}),Object(i.jsx)(j.a,{name:"feedback-failed",position:"top",variant:"failure",children:Object(i.jsx)("div",{className:"text-center",children:"No se pudo enviar su feedback \ud83d\ude22"})}),Object(i.jsx)(j.a,{name:"edit-success",position:"bottom",variant:"success",children:Object(i.jsx)("div",{className:"text-center",children:"N\xfamero actualizado."})}),Object(i.jsx)(V,{phone:t,comments:E,handleComments:q,openHelpSection:H,handlePhoneFeedback:L,selfAssigned:!!D,isFromAnotherTerritory:t.territoryId!==T.id}),A&&Object(i.jsx)(oe,{PhoneStorage:w,currentPhoneId:t.id,onEditRequest:_})]})}}),Object(i.jsx)(le.b,{path:"/:territory/telefonica/help",exact:!0,component:function(){return Object(i.jsx)(ne,{close:U})}})]})})}},98:function(e,n,t){"use strict";var c=t(4),a=t(7),s=t(0),r=t.n(s),o=t(1),i=t.n(o),l=t(6),d=t.n(l),b=t(3),u={tag:b.o,fluid:i.a.bool,className:i.a.string,cssModule:i.a.object},j=function(e){var n=e.className,t=e.cssModule,s=e.tag,o=e.fluid,i=Object(a.a)(e,["className","cssModule","tag","fluid"]),l=Object(b.k)(d()(n,"jumbotron",!!o&&"jumbotron-fluid"),t);return r.a.createElement(s,Object(c.a)({},i,{className:l}))};j.propTypes=u,j.defaultProps={tag:"div"},n.a=j}}]);
//# sourceMappingURL=11.253d4501.chunk.js.map