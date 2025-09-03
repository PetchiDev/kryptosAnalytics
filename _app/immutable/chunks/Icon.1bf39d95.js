import{s as q,o as K,l as k,K as A,C as b,L as B,b as E,f as g,M as v,i as W,h as L,u as M,p as O,q as P,J as F,D as S,m as z}from"./scheduler.cc8a3ead.js";import{S as G,i as H,t as Q,b as R}from"./index.a1a387c6.js";import{e as C}from"./each.e59479a4.js";function w(o,e){const i={},n={},l={$$scope:1};let r=o.length;for(;r--;){const c=o[r],a=e[r];if(a){for(const f in c)f in a||(n[f]=1);for(const f in a)l[f]||(i[f]=a[f],l[f]=1);o[r]=a}else for(const f in c)l[f]=1}for(const c in n)c in i||(i[c]=void 0);return i}function x(o){return typeof o=="object"&&o!==null?o:{}}/**
 * @license lucide-svelte v0.542.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2023 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const T={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},j=T;function y(o,e,i){const n=o.slice();return n[11]=e[i][0],n[12]=e[i][1],n}function N(o){let e,i=[o[12]],n={};for(let l=0;l<i.length;l+=1)n=k(n,i[l]);return{c(){e=A(o[11]),this.h()},l(l){e=B(l,o[11],{}),E(e).forEach(g),this.h()},h(){v(e,n)},m(l,r){W(l,e,r)},p(l,r){v(e,n=w(i,[r&32&&l[12]]))},d(l){l&&g(e)}}}function I(o){let e=o[11],i,n=o[11]&&N(o);return{c(){n&&n.c(),i=b()},l(l){n&&n.l(l),i=b()},m(l,r){n&&n.m(l,r),W(l,i,r)},p(l,r){l[11]?e?q(e,l[11])?(n.d(1),n=N(l),e=l[11],n.c(),n.m(i.parentNode,i)):n.p(l,r):(n=N(l),e=l[11],n.c(),n.m(i.parentNode,i)):e&&(n.d(1),n=null,e=l[11])},d(l){l&&g(i),n&&n.d(l)}}}function U(o){let e,i,n,l,r,c=C(o[5]),a=[];for(let t=0;t<c.length;t+=1)a[t]=I(y(o,c,t));const f=o[10].default,h=K(f,o,o[9],null);let d=[j,o[7],{width:o[2]},{height:o[2]},{stroke:o[1]},{"stroke-width":n=o[4]?Number(o[3])*24/Number(o[2]):o[3]},{class:l=o[6]("lucide-icon","lucide",o[0]?`lucide-${o[0]}`:"",o[8].class)}],_={};for(let t=0;t<d.length;t+=1)_=k(_,d[t]);return{c(){e=A("svg");for(let t=0;t<a.length;t+=1)a[t].c();i=b(),h&&h.c(),this.h()},l(t){e=B(t,"svg",{width:!0,height:!0,stroke:!0,"stroke-width":!0,class:!0});var u=E(e);for(let s=0;s<a.length;s+=1)a[s].l(u);i=b(),h&&h.l(u),u.forEach(g),this.h()},h(){v(e,_)},m(t,u){W(t,e,u);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(e,null);L(e,i),h&&h.m(e,null),r=!0},p(t,[u]){if(u&32){c=C(t[5]);let s;for(s=0;s<c.length;s+=1){const m=y(t,c,s);a[s]?a[s].p(m,u):(a[s]=I(m),a[s].c(),a[s].m(e,i))}for(;s<a.length;s+=1)a[s].d(1);a.length=c.length}h&&h.p&&(!r||u&512)&&M(h,f,t,t[9],r?P(f,t[9],u,null):O(t[9]),null),v(e,_=w(d,[j,u&128&&t[7],(!r||u&4)&&{width:t[2]},(!r||u&4)&&{height:t[2]},(!r||u&2)&&{stroke:t[1]},(!r||u&28&&n!==(n=t[4]?Number(t[3])*24/Number(t[2]):t[3]))&&{"stroke-width":n},(!r||u&257&&l!==(l=t[6]("lucide-icon","lucide",t[0]?`lucide-${t[0]}`:"",t[8].class)))&&{class:l}]))},i(t){r||(Q(h,t),r=!0)},o(t){R(h,t),r=!1},d(t){t&&g(e),F(a,t),h&&h.d(t)}}}function V(o,e,i){const n=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];let l=S(e,n),{$$slots:r={},$$scope:c}=e,{name:a=void 0}=e,{color:f="currentColor"}=e,{size:h=24}=e,{strokeWidth:d=2}=e,{absoluteStrokeWidth:_=!1}=e,{iconNode:t=[]}=e;const u=(...s)=>s.filter((m,D,J)=>!!m&&J.indexOf(m)===D).join(" ");return o.$$set=s=>{i(8,e=k(k({},e),z(s))),i(7,l=S(e,n)),"name"in s&&i(0,a=s.name),"color"in s&&i(1,f=s.color),"size"in s&&i(2,h=s.size),"strokeWidth"in s&&i(3,d=s.strokeWidth),"absoluteStrokeWidth"in s&&i(4,_=s.absoluteStrokeWidth),"iconNode"in s&&i(5,t=s.iconNode),"$$scope"in s&&i(9,c=s.$$scope)},e=z(e),[a,f,h,d,_,t,u,l,e,c,r]}class X extends G{constructor(e){super(),H(this,e,V,U,q,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5})}}const $=X;export{$ as I,x as a,w as g};
