(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[495],{4722:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register",function(){return t(2767)}])},2880:function(e,s,t){"use strict";t.d(s,{j:function(){return o}});var n=t(5893),a=t(5756),i=t.n(a),r=t(1163),c=t(461);function o(){const e=(0,r.useRouter)(),[,,s]=(0,c.Z)(["access_token"]);return(0,n.jsx)("div",{className:i().all,children:(0,n.jsx)("button",{onClick:function(){s("access_token"),e.push("/")},children:(0,n.jsx)("img",{className:i().logo,src:"icons/houselogo.png"})})})}},987:function(e,s,t){"use strict";t.d(s,{E:function(){return i}});var n=t(1354),a=t(1876).Buffer;class i{static async login(e,s){const t=(0,n.SHA256)(s),i="".concat(e,":").concat(t),r={method:"GET",Authorization:"Basic ".concat(a.from(i).toString("base64"))},c=await fetch("/backend/users/signin",{headers:r}),o=await c.json();return"success"===o.status?o.data:null}static async register(e,s){const t=(0,n.SHA256)(s),i="".concat(e,":").concat(t),r={method:"GET",Authorization:"Basic ".concat(a.from(i).toString("base64"))},c=await fetch("/backend/users/signup",{headers:r}),o=await c.json();return"success"===o.status?o.data:null}static StoreJWT(e){document.cookie="access_token=".concat(e,"; path=/;")}static async verifyAccessToken(e){const s=new Headers;s.append("Authorization","Bearer ".concat(e));const t=await fetch("/backend/verifyJWT",{headers:s});return await t.json()}static parseJwt(){const e=document.cookie;if(null!==e||void 0!==e){const s=e.split(";").find((e=>e.trim().startsWith("access_token="))).split("=")[1].split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(atob(s))}return null}static async checkLoginStatus(e){if(null!==e){const s=await i.verifyAccessToken(e);if(s.res)return s.res}return null}static async getUserNameById(e){if(null!==e||void 0!==e){const s=await fetch("/backend/users/".concat(e),{method:"GET"}),t=await s.json();return"success"===t.status?t.data[0].name:null}return null}}},2767:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return _}});var n=t(5893),a=t(9008),i=t.n(a),r=t(8720),c=t.n(r),o=t(987),l=t(7294),u=t(1163),d=t(2880);function _(){const e=(0,u.useRouter)(),[s,t]=(0,l.useState)(""),[a,r]=(0,l.useState)("");const[_,g]=(0,l.useState)("");const[p,m]=(0,l.useState)("");const h=e=>{var s;"Enter"===e.key&&(null===(s=document.getElementById("RegisterButton"))||void 0===s||s.click())};return(0,n.jsxs)("div",{className:c().all,children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("title",{children:"BATTLESHIP - BootyByters"}),(0,n.jsx)("link",{rel:"icon",href:"/steeringwheel2.ico"})]}),(0,n.jsxs)("main",{className:c().box,children:[(0,n.jsx)(d.j,{}),(0,n.jsxs)("div",{className:c().registerbox,children:[(0,n.jsx)("p",{className:c().p1,children:"BATAILLE \xa0NAVALE"}),(0,n.jsx)("p",{className:c().p2,children:"BY THE"}),(0,n.jsx)("p",{className:c().p3,children:"B O O T Y \xa0\xa0 B Y T E R S"}),(0,n.jsx)("br",{}),(0,n.jsx)("h1",{className:c().titleRegister,children:"S'inscrire"}),(0,n.jsxs)("div",{className:c().formRegister,children:[(0,n.jsxs)("div",{className:c().wrapperbox,children:[(0,n.jsx)("label",{className:c().icon1,children:(0,n.jsx)("i",{className:c().iconUser,children:(0,n.jsx)("img",{className:c().image,src:"icons/user.png"})})}),(0,n.jsx)("input",{className:c().inputT1,type:"username",name:"name",id:"name",placeholder:"Pseudo",required:!0,value:s,onChange:function(e){const s=e.target.value;t(s)},onKeyPress:h}),(0,n.jsx)("br",{}),(0,n.jsx)("label",{className:c().icon2,children:(0,n.jsx)("i",{className:c().iconCadenas,children:(0,n.jsx)("img",{className:c().image,src:"icons/cadenas-verrouille.png"})})}),(0,n.jsx)("input",{className:c().inputT2,type:"password",name:"name",id:"name",placeholder:"Mot de passe",required:!0,value:_,onChange:function(e){const s=e.target.value;g(s)},onKeyPress:h}),(0,n.jsx)("br",{}),(0,n.jsx)("label",{className:c().icon3,children:(0,n.jsx)("i",{className:c().iconCadenas,children:(0,n.jsx)("img",{className:c().image,src:"icons/cadenas-verrouille.png"})})}),(0,n.jsx)("input",{className:c().inputT3,type:"password",name:"name",id:"name",placeholder:"Confirmer mot de passe",required:!0,value:p,onChange:function(e){const s=e.target.value;m(s)},onKeyPress:h})]}),(0,n.jsx)("p",{className:c().pError,children:a}),(0,n.jsx)("button",{id:"RegisterButton",className:c().registerButton,onClick:async function(){try{if(_===p){let t=await o.E.register(s,_);null!==t?(o.E.StoreJWT(t[0].token.access_token),e.push("/findgame"),r("")):r("Mot de passe ou login incorrect")}else r("Mots de passe diff\xe9rents")}catch(t){r(t)}},children:"Je m'inscris"})]})]})]})]})}},5756:function(e){e.exports={all:"MenuButton_all__paLiN",logo:"MenuButton_logo__3q_Xe"}},8720:function(e){e.exports={all:"Register_all__GREGA",box:"Register_box__gK9qa",registerbox:"Register_registerbox__31JDN",p1:"Register_p1__XLjAJ",p2:"Register_p2__HrLdk",p3:"Register_p3__La4eQ",titleRegister:"Register_titleRegister___N7Ox",wrapperbox:"Register_wrapperbox__FzYNv",icon1:"Register_icon1__2Lj3x",icon2:"Register_icon2__9hKYW",icon3:"Register_icon3__Meb4O",inputT1:"Register_inputT1__orbun",inputT2:"Register_inputT2__0gmgK",inputT3:"Register_inputT3__fbwFj",image:"Register_image__qAtqz",registerButton:"Register_registerButton__dFDiK",pError:"Register_pError__um3iE"}},2480:function(){}},function(e){e.O(0,[570,774,888,179],(function(){return s=4722,e(e.s=s);var s}));var s=e.O();_N_E=s}]);