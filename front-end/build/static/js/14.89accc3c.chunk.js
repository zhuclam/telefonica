(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[14],{114:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return h}));var n=s(15),c=s.n(n),r=s(21),i=s(9),a=s(2),d=s(0),j=s(14),l=s(20),b=[{title:"Panel de Administraci\xf3n",linkTo:"/admin-panel"},{title:"Estad\xedsticas"}],h=function(){var e=Object(d.useState)(null),t=Object(i.a)(e,2),s=t[0],n=t[1],h=Object(d.useState)(!1),o=Object(i.a)(h,2),x=o[0],O=o[1],u=Object(d.useState)(!0),m=Object(i.a)(u,2),f=m[0],N=m[1],p=Object(d.useState)(!1),v=Object(i.a)(p,2),w=v[0],E=v[1],g=Object(j.c)(),k=Object(d.useCallback)(Object(r.a)(c.a.mark((function e(){var t,s,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,N(!0),E(!1),e.next=5,g().get("statistics");case 5:if(t=e.sent,s=Object(i.a)(t,2),r=s[0],a=s[1],!r){e.next=11;break}throw r;case 11:""===a?(O(!0),n(null)):(n(a),O(!1)),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.log({e:e.t0}),E(!0);case 18:return e.prev=18,N(!1),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[0,14,18,21]])}))),[g]);if(Object(d.useEffect)((function(){k()}),[k]),Object(d.useMemo)((function(){null===s||void 0===s||s.perMonthData.months.sort((function(e,t){var s=e.date.split("/"),n=Object(i.a)(s,2),c=n[0],r=n[1],a=t.date.split("/"),d=Object(i.a)(a,2),j=d[0],l=d[1],b=Number(l)-Number(r);return 0!==b?b:Number(j)-Number(c)}))}),[null===s||void 0===s?void 0:s.perMonthData.months]),w)return Object(a.jsx)(l.d,{});if(x)return Object(a.jsx)(l.d,{message:"Sin estad\xedsticas. A\xfan no hay n\xfameros cargados para este territorio."});if(f||!s)return Object(a.jsx)(l.g,{fulfill:!0,container:!0});var D=s.generalData,M=s.perMonthData,y=s.perDayData,A=function(e){return e.toFixed(2)};return Object(a.jsxs)("div",{className:"container pt-3",children:[Object(a.jsx)(l.b,{items:b}),Object(a.jsx)("h4",{className:"mb-4",children:"General"}),Object(a.jsx)("div",{className:"table-responsive",children:Object(a.jsxs)("table",{className:"table table-bordered",children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:"N\xfameros guardados"}),Object(a.jsx)("th",{children:"No visitar"}),Object(a.jsx)("th",{children:"Inexistentes"})]})}),Object(a.jsx)("tbody",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:D.totalNumbers}),Object(a.jsxs)("td",{children:[D.noCall," (",A(100*D.noCall/D.totalNumbers),"%)"]}),Object(a.jsxs)("td",{children:[D.nonExistent," (",A(100*D.nonExistent/D.totalNumbers),"%)"]})]})})]})}),Object(a.jsx)("hr",{}),Object(a.jsx)("h4",{className:"mb-4",children:"Estad\xedsticas por mes"}),Object(a.jsx)("small",{children:"El TA se calcula haciendo: N\xfameros \xfanicos existentes / N\xfameros totales existentes."}),Object(a.jsx)("div",{className:"table-responsive",children:Object(a.jsxs)("table",{className:"table table-bordered",children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:"Mes"}),Object(a.jsx)("th",{children:"Llamadas"}),Object(a.jsx)("th",{children:"N\xfameros \xfanicos"}),Object(a.jsx)("th",{children:"N\xfameros \xfanicos existentes"}),Object(a.jsx)("th",{children:"Atendieron"}),Object(a.jsx)("th",{children:"Territorio abarcado"})]})}),Object(a.jsx)("tbody",{children:M.months.map((function(e,t){return"07/2020"===e.date?Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:e.date}),Object(a.jsx)("td",{children:e.total+2088}),Object(a.jsx)("td",{children:e.different+2088}),Object(a.jsx)("td",{children:e.different+2088-e.inexistent}),Object(a.jsxs)("td",{children:[e.answered," (",A(100*e.answered/(e.different+2088-e.inexistent)),"%)"]}),Object(a.jsxs)("td",{children:[A(100*(e.different+2088-e.inexistent)/M.totalValidNumbers),"%"]})]},t):Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:e.date}),Object(a.jsx)("td",{children:e.total}),Object(a.jsx)("td",{children:e.different}),Object(a.jsx)("td",{children:e.different-e.inexistent}),Object(a.jsxs)("td",{children:[e.answered," (",A(100*e.answered/(e.different-e.inexistent)),"%)"]}),Object(a.jsxs)("td",{children:[A(100*(e.different-e.inexistent)/M.totalValidNumbers),"%"]})]},t)}))})]})}),Object(a.jsx)("hr",{}),Object(a.jsx)("h4",{className:"mb-4",children:"Estad\xedsticas por d\xeda"}),Object(a.jsx)("div",{className:"table-responsive",children:Object(a.jsxs)("table",{className:"table table-bordered",children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:"Fecha"}),Object(a.jsx)("th",{children:"Total de llamadas"}),Object(a.jsx)("th",{children:"N\xfameros \xfanicos"}),Object(a.jsx)("th",{children:"Atendieron"}),Object(a.jsx)("th",{children:"No visitar"}),Object(a.jsx)("th",{children:"N\xfameros inexistentes"}),Object(a.jsx)("th",{children:"Porcentaje de inexistentes"})]})}),Object(a.jsx)("tbody",{children:y.map((function(e,t){var s,n,c;return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:null!==(s=e.date)&&void 0!==s?s:"Nunca llamados"}),Object(a.jsx)("td",{children:e.totalCalls}),Object(a.jsx)("td",{children:e.different}),Object(a.jsx)("td",{children:e.answered}),Object(a.jsx)("td",{children:null!==(n=e.noCall)&&void 0!==n?n:"-"}),Object(a.jsx)("td",{children:null!==(c=e.nonExistent)&&void 0!==c?c:"-"}),Object(a.jsx)("td",{children:e.date?Math.round(100*e.nonExistent/e.different)+"%":"-"})]},t)}))})]})})]})}}}]);
//# sourceMappingURL=14.89accc3c.chunk.js.map