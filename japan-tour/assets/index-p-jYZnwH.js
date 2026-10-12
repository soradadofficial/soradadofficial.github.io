(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fh="169",sr={ROTATE:0,DOLLY:1,PAN:2},Qs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Am=0,pu=1,Cm=2,ad=1,ld=2,di=3,Gi=0,nn=1,xe=2,xi=0,rr=1,Bi=2,mu=3,_u=4,Rm=5,ls=100,Pm=101,Dm=102,Lm=103,Im=104,Um=200,Nm=201,Om=202,Fm=203,Ql=204,tc=205,Bm=206,zm=207,km=208,Hm=209,Vm=210,Gm=211,Wm=212,Xm=213,Ym=214,ec=0,nc=1,ic=2,fr=3,sc=4,rc=5,oc=6,ac=7,cd=0,qm=1,jm=2,zi=0,hd=1,ud=2,fd=3,dh=4,Km=5,dd=6,pd=7,md=300,dr=301,pr=302,lc=303,cc=304,Ha=306,_a=1e3,hs=1001,hc=1002,un=1003,$m=1004,Eo=1005,Yn=1006,rl=1007,us=1008,Mi=1009,_d=1010,gd=1011,so=1012,ph=1013,ys=1014,Qn=1015,yi=1016,mh=1017,_h=1018,mr=1020,vd=35902,xd=1021,yd=1022,jn=1023,Md=1024,Sd=1025,or=1026,_r=1027,gh=1028,vh=1029,wd=1030,xh=1031,yh=1033,oa=33776,aa=33777,la=33778,ca=33779,uc=35840,fc=35841,dc=35842,pc=35843,mc=36196,_c=37492,gc=37496,vc=37808,xc=37809,yc=37810,Mc=37811,Sc=37812,wc=37813,Ec=37814,bc=37815,Tc=37816,Ac=37817,Cc=37818,Rc=37819,Pc=37820,Dc=37821,ha=36492,Lc=36494,Ic=36495,Ed=36283,Uc=36284,Nc=36285,Oc=36286,Zm=3200,Jm=3201,bd=0,Qm=1,Ui="",Qe="srgb",qi="srgb-linear",Mh="display-p3",Va="display-p3-linear",ga="linear",pe="srgb",va="rec709",xa="p3",Ps=7680,gu=519,t0=512,e0=513,n0=514,Td=515,i0=516,s0=517,r0=518,o0=519,Fc=35044,vu="300 es",vi=2e3,ya=2001;class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xu=1234567;const $r=Math.PI/180,ro=180/Math.PI;function ei(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[s&255]+$e[s>>8&255]+$e[s>>16&255]+$e[s>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function Oe(s,t,e){return Math.max(t,Math.min(e,s))}function Sh(s,t){return(s%t+t)%t}function a0(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function l0(s,t,e){return s!==t?(e-s)/(t-s):0}function Zr(s,t,e){return(1-e)*s+e*t}function c0(s,t,e,n){return Zr(s,t,1-Math.exp(-e*n))}function h0(s,t=1){return t-Math.abs(Sh(s,t*2)-t)}function u0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function f0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function d0(s,t){return s+Math.floor(Math.random()*(t-s+1))}function p0(s,t){return s+Math.random()*(t-s)}function m0(s){return s*(.5-Math.random())}function _0(s){s!==void 0&&(xu=s);let t=xu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function g0(s){return s*$r}function v0(s){return s*ro}function x0(s){return(s&s-1)===0&&s!==0}function y0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function M0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function S0(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),m=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*f,a*c);break;case"YZY":s.set(l*f,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*f,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*d,a*c);break;case"YXY":s.set(l*d,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function qn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function le(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Bc={DEG2RAD:$r,RAD2DEG:ro,generateUUID:ei,clamp:Oe,euclideanModulo:Sh,mapLinear:a0,inverseLerp:l0,lerp:Zr,damp:c0,pingpong:h0,smoothstep:u0,smootherstep:f0,randInt:d0,randFloat:p0,randFloatSpread:m0,seededRandom:_0,degToRad:g0,radToDeg:v0,isPowerOfTwo:x0,ceilPowerOfTwo:y0,floorPowerOfTwo:M0,setQuaternionFromProperEuler:S0,normalize:le,denormalize:qn};class J{constructor(t=0,e=0){J.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,n,i,r,o,a,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],g=i[0],p=i[3],_=i[6],x=i[1],v=i[4],y=i[7],T=i[2],w=i[5],E=i[8];return r[0]=o*g+a*x+l*T,r[3]=o*p+a*v+l*w,r[6]=o*_+a*y+l*E,r[1]=c*g+h*x+u*T,r[4]=c*p+h*v+u*w,r[7]=c*_+h*y+u*E,r[2]=f*g+d*x+m*T,r[5]=f*p+d*v+m*w,r[8]=f*_+d*y+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,m=e*u+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return t[0]=u*g,t[1]=(i*c-h*n)*g,t[2]=(a*n-i*o)*g,t[3]=f*g,t[4]=(h*e-i*l)*g,t[5]=(i*r-a*e)*g,t[6]=d*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ol.makeScale(t,e)),this}rotate(t){return this.premultiply(ol.makeRotation(-t)),this}translate(t,e){return this.premultiply(ol.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ol=new Kt;function Ad(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ma(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function w0(){const s=Ma("canvas");return s.style.display="block",s}const yu={};function ua(s){s in yu||(yu[s]=!0,console.warn(s))}function E0(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function b0(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function T0(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Mu=new Kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Su=new Kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Pr={[qi]:{transfer:ga,primaries:va,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s,fromReference:s=>s},[Qe]:{transfer:pe,primaries:va,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Va]:{transfer:ga,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.applyMatrix3(Su),fromReference:s=>s.applyMatrix3(Mu)},[Mh]:{transfer:pe,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.convertSRGBToLinear().applyMatrix3(Su),fromReference:s=>s.applyMatrix3(Mu).convertLinearToSRGB()}},A0=new Set([qi,Va]),ie={enabled:!0,_workingColorSpace:qi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!A0.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Pr[t].toReference,i=Pr[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Pr[s].primaries},getTransfer:function(s){return s===Ui?ga:Pr[s].transfer},getLuminanceCoefficients:function(s,t=this._workingColorSpace){return s.fromArray(Pr[t].luminanceCoefficients)}};function ar(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function al(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ds;class C0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ds===void 0&&(Ds=Ma("canvas")),Ds.width=t.width,Ds.height=t.height;const n=Ds.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ds}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ma("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ar(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ar(e[n]/255)*255):e[n]=ar(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let R0=0;class Cd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=ei(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ll(i[o].image)):r.push(ll(i[o]))}else r=ll(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function ll(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?C0.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let P0=0;class sn extends Es{constructor(t=sn.DEFAULT_IMAGE,e=sn.DEFAULT_MAPPING,n=hs,i=hs,r=Yn,o=us,a=jn,l=Mi,c=sn.DEFAULT_ANISOTROPY,h=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=ei(),this.name="",this.source=new Cd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==md)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _a:t.x=t.x-Math.floor(t.x);break;case hs:t.x=t.x<0?0:1;break;case hc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _a:t.y=t.y-Math.floor(t.y);break;case hs:t.y=t.y<0?0:1;break;case hc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=md;sn.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,i=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],g=l[2],p=l[6],_=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(m+p)<.1&&Math.abs(c+d+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,y=(d+1)/2,T=(_+1)/2,w=(h+f)/4,E=(u+g)/4,C=(m+p)/4;return v>y&&v>T?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=w/n,r=E/n):y>T?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=w/i,r=C/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=E/r,i=C/r),this.set(n,i,r,e),this}let x=Math.sqrt((p-m)*(p-m)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-m)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((c+d+_-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class D0 extends Es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new sn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Cd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends D0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Rd extends sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class L0 extends sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ii{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=r[o+0],d=r[o+1],m=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=g;return}if(u!==g||l!==f||c!==d||h!==m){let p=1-a;const _=l*f+c*d+h*m+u*g,x=_>=0?1:-1,v=1-_*_;if(v>Number.EPSILON){const T=Math.sqrt(v),w=Math.atan2(T,_*x);p=Math.sin(p*w)/T,a=Math.sin(a*w)/T}const y=a*x;if(l=l*p+f*y,c=c*p+d*y,h=h*p+m*y,u=u*p+g*y,p===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*d-c*f,t[e+1]=l*m+h*f+c*u-a*d,t[e+2]=c*m+h*d+a*f-l*u,t[e+3]=h*m-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),f=l(n/2),d=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Oe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return cl.copy(this).projectOnVector(t),this.sub(cl)}reflect(t){return this.sub(cl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cl=new P,wu=new ii;class bs{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Gn):Gn.fromBufferAttribute(r,o),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),bo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bo.copy(n.boundingBox)),bo.applyMatrix4(t.matrixWorld),this.union(bo)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Dr),To.subVectors(this.max,Dr),Ls.subVectors(t.a,Dr),Is.subVectors(t.b,Dr),Us.subVectors(t.c,Dr),Ai.subVectors(Is,Ls),Ci.subVectors(Us,Is),Ji.subVectors(Ls,Us);let e=[0,-Ai.z,Ai.y,0,-Ci.z,Ci.y,0,-Ji.z,Ji.y,Ai.z,0,-Ai.x,Ci.z,0,-Ci.x,Ji.z,0,-Ji.x,-Ai.y,Ai.x,0,-Ci.y,Ci.x,0,-Ji.y,Ji.x,0];return!hl(e,Ls,Is,Us,To)||(e=[1,0,0,0,1,0,0,0,1],!hl(e,Ls,Is,Us,To))?!1:(Ao.crossVectors(Ai,Ci),e=[Ao.x,Ao.y,Ao.z],hl(e,Ls,Is,Us,To))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ai=[new P,new P,new P,new P,new P,new P,new P,new P],Gn=new P,bo=new bs,Ls=new P,Is=new P,Us=new P,Ai=new P,Ci=new P,Ji=new P,Dr=new P,To=new P,Ao=new P,Qi=new P;function hl(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Qi.fromArray(s,r);const a=i.x*Math.abs(Qi.x)+i.y*Math.abs(Qi.y)+i.z*Math.abs(Qi.z),l=t.dot(Qi),c=e.dot(Qi),h=n.dot(Qi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const I0=new bs,Lr=new P,ul=new P;class Ts{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):I0.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Lr.subVectors(t,this.center);const e=Lr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ul.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Lr.copy(t.center).add(ul)),this.expandByPoint(Lr.copy(t.center).sub(ul))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new P,fl=new P,Co=new P,Ri=new P,dl=new P,Ro=new P,pl=new P;class xo{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){fl.copy(t).add(e).multiplyScalar(.5),Co.copy(e).sub(t).normalize(),Ri.copy(this.origin).sub(fl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Co),a=Ri.dot(this.direction),l=-Ri.dot(Co),c=Ri.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*l-a,f=o*a-l,m=r*h,u>=0)if(f>=-m)if(f<=m){const g=1/h;u*=g,f*=g,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(fl).addScaledVector(Co,f),d}intersectSphere(t,e){li.subVectors(t.center,this.origin);const n=li.dot(this.direction),i=li.dot(li)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,n,i,r){dl.subVectors(e,t),Ro.subVectors(n,t),pl.crossVectors(dl,Ro);let o=this.direction.dot(pl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ri.subVectors(this.origin,t);const l=a*this.direction.dot(Ro.crossVectors(Ri,Ro));if(l<0)return null;const c=a*this.direction.dot(dl.cross(Ri));if(c<0||l+c>o)return null;const h=-a*Ri.dot(pl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(t,e,n,i,r,o,a,l,c,h,u,f,d,m,g,p){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,f,d,m,g,p)}set(t,e,n,i,r,o,a,l,c,h,u,f,d,m,g,p){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=r,_[5]=o,_[9]=a,_[13]=l,_[2]=c,_[6]=h,_[10]=u,_[14]=f,_[3]=d,_[7]=m,_[11]=g,_[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ns.setFromMatrixColumn(t,0).length(),r=1/Ns.setFromMatrixColumn(t,1).length(),o=1/Ns.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+m*c,e[5]=f-g*c,e[9]=-a*l,e[2]=g-f*c,e[6]=m+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,m=c*h,g=c*u;e[0]=f+g*a,e[4]=m*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=g+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,m=c*h,g=c*u;e[0]=f-g*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=g-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=m*c-d,e[8]=f*c+g,e[1]=l*u,e[5]=g*c+f,e[9]=d*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=g-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+m,e[10]=f-g*u}else if(t.order==="XZY"){const f=o*l,d=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+g,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=g*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(U0,t,N0)}lookAt(t,e,n){const i=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Pi.crossVectors(n,wn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Pi.crossVectors(n,wn)),Pi.normalize(),Po.crossVectors(wn,Pi),i[0]=Pi.x,i[4]=Po.x,i[8]=wn.x,i[1]=Pi.y,i[5]=Po.y,i[9]=wn.y,i[2]=Pi.z,i[6]=Po.z,i[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],g=n[6],p=n[10],_=n[14],x=n[3],v=n[7],y=n[11],T=n[15],w=i[0],E=i[4],C=i[8],L=i[12],M=i[1],S=i[5],N=i[9],O=i[13],k=i[2],G=i[6],B=i[10],j=i[14],I=i[3],W=i[7],Z=i[11],st=i[15];return r[0]=o*w+a*M+l*k+c*I,r[4]=o*E+a*S+l*G+c*W,r[8]=o*C+a*N+l*B+c*Z,r[12]=o*L+a*O+l*j+c*st,r[1]=h*w+u*M+f*k+d*I,r[5]=h*E+u*S+f*G+d*W,r[9]=h*C+u*N+f*B+d*Z,r[13]=h*L+u*O+f*j+d*st,r[2]=m*w+g*M+p*k+_*I,r[6]=m*E+g*S+p*G+_*W,r[10]=m*C+g*N+p*B+_*Z,r[14]=m*L+g*O+p*j+_*st,r[3]=x*w+v*M+y*k+T*I,r[7]=x*E+v*S+y*G+T*W,r[11]=x*C+v*N+y*B+T*Z,r[15]=x*L+v*O+y*j+T*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],g=t[7],p=t[11],_=t[15];return m*(+r*l*u-i*c*u-r*a*f+n*c*f+i*a*d-n*l*d)+g*(+e*l*d-e*c*f+r*o*f-i*o*d+i*c*h-r*l*h)+p*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+_*(-i*a*h-e*l*u+e*a*f+i*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],g=t[13],p=t[14],_=t[15],x=u*p*c-g*f*c+g*l*d-a*p*d-u*l*_+a*f*_,v=m*f*c-h*p*c-m*l*d+o*p*d+h*l*_-o*f*_,y=h*g*c-m*u*c+m*a*d-o*g*d-h*a*_+o*u*_,T=m*u*l-h*g*l-m*a*f+o*g*f+h*a*p-o*u*p,w=e*x+n*v+i*y+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/w;return t[0]=x*E,t[1]=(g*f*r-u*p*r-g*i*d+n*p*d+u*i*_-n*f*_)*E,t[2]=(a*p*r-g*l*r+g*i*c-n*p*c-a*i*_+n*l*_)*E,t[3]=(u*l*r-a*f*r-u*i*c+n*f*c+a*i*d-n*l*d)*E,t[4]=v*E,t[5]=(h*p*r-m*f*r+m*i*d-e*p*d-h*i*_+e*f*_)*E,t[6]=(m*l*r-o*p*r-m*i*c+e*p*c+o*i*_-e*l*_)*E,t[7]=(o*f*r-h*l*r+h*i*c-e*f*c-o*i*d+e*l*d)*E,t[8]=y*E,t[9]=(m*u*r-h*g*r-m*n*d+e*g*d+h*n*_-e*u*_)*E,t[10]=(o*g*r-m*a*r+m*n*c-e*g*c-o*n*_+e*a*_)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*d-e*a*d)*E,t[12]=T*E,t[13]=(h*g*i-m*u*i+m*n*f-e*g*f-h*n*p+e*u*p)*E,t[14]=(m*a*i-o*g*i-m*n*l+e*g*l+o*n*p-e*a*p)*E,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*f+e*a*f)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,m=r*u,g=o*h,p=o*u,_=a*u,x=l*c,v=l*h,y=l*u,T=n.x,w=n.y,E=n.z;return i[0]=(1-(g+_))*T,i[1]=(d+y)*T,i[2]=(m-v)*T,i[3]=0,i[4]=(d-y)*w,i[5]=(1-(f+_))*w,i[6]=(p+x)*w,i[7]=0,i[8]=(m+v)*E,i[9]=(p-x)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ns.set(i[0],i[1],i[2]).length();const o=Ns.set(i[4],i[5],i[6]).length(),a=Ns.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Wn.copy(this);const c=1/r,h=1/o,u=1/a;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=u,Wn.elements[9]*=u,Wn.elements[10]*=u,e.setFromRotationMatrix(Wn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=vi){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,m;if(a===vi)d=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===ya)d=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=vi){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-r),f=(e+t)*c,d=(n+i)*h;let m,g;if(a===vi)m=(o+r)*u,g=-2*u;else if(a===ya)m=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ns=new P,Wn=new Zt,U0=new P(0,0,0),N0=new P(1,1,1),Pi=new P,Po=new P,wn=new P,Eu=new Zt,bu=new ii;class xn{constructor(t=0,e=0,n=0,i=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Oe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Eu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Eu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bu.setFromEuler(this),this.setFromQuaternion(bu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class wh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let O0=0;const Tu=new P,Os=new ii,ci=new Zt,Do=new P,Ir=new P,F0=new P,B0=new ii,Au=new P(1,0,0),Cu=new P(0,1,0),Ru=new P(0,0,1),Pu={type:"added"},z0={type:"removed"},Fs={type:"childadded",child:null},ml={type:"childremoved",child:null};class be extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new P,e=new xn,n=new ii,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Kt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.multiply(Os),this}rotateOnWorldAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.premultiply(Os),this}rotateX(t){return this.rotateOnAxis(Au,t)}rotateY(t){return this.rotateOnAxis(Cu,t)}rotateZ(t){return this.rotateOnAxis(Ru,t)}translateOnAxis(t,e){return Tu.copy(t).applyQuaternion(this.quaternion),this.position.add(Tu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Au,t)}translateY(t){return this.translateOnAxis(Cu,t)}translateZ(t){return this.translateOnAxis(Ru,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Do.copy(t):Do.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Ir,Do,this.up):ci.lookAt(Do,Ir,this.up),this.quaternion.setFromRotationMatrix(ci),i&&(ci.extractRotation(i.matrixWorld),Os.setFromRotationMatrix(ci),this.quaternion.premultiply(Os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Pu),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(z0),ml.child=t,this.dispatchEvent(ml),ml.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Pu),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,t,F0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,B0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}be.DEFAULT_UP=new P(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xn=new P,hi=new P,_l=new P,ui=new P,Bs=new P,zs=new P,Du=new P,gl=new P,vl=new P,xl=new P,yl=new he,Ml=new he,Sl=new he;class On{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Xn.subVectors(t,e),i.cross(Xn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Xn.subVectors(i,e),hi.subVectors(n,e),_l.subVectors(t,e);const o=Xn.dot(Xn),a=Xn.dot(hi),l=Xn.dot(_l),c=hi.dot(hi),h=hi.dot(_l),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,m=(o*h-a*l)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(o,ui.y),l.addScaledVector(a,ui.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return yl.setScalar(0),Ml.setScalar(0),Sl.setScalar(0),yl.fromBufferAttribute(t,e),Ml.fromBufferAttribute(t,n),Sl.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(yl,r.x),o.addScaledVector(Ml,r.y),o.addScaledVector(Sl,r.z),o}static isFrontFacing(t,e,n,i){return Xn.subVectors(n,e),hi.subVectors(t,e),Xn.cross(hi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Xn.cross(hi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return On.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return On.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return On.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return On.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return On.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Bs.subVectors(i,n),zs.subVectors(r,n),gl.subVectors(t,n);const l=Bs.dot(gl),c=zs.dot(gl);if(l<=0&&c<=0)return e.copy(n);vl.subVectors(t,i);const h=Bs.dot(vl),u=zs.dot(vl);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Bs,o);xl.subVectors(t,r);const d=Bs.dot(xl),m=zs.dot(xl);if(m>=0&&d<=m)return e.copy(r);const g=d*c-l*m;if(g<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(zs,a);const p=h*m-d*u;if(p<=0&&u-h>=0&&d-m>=0)return Du.subVectors(r,i),a=(u-h)/(u-h+(d-m)),e.copy(i).addScaledVector(Du,a);const _=1/(p+g+f);return o=g*_,a=f*_,e.copy(n).addScaledVector(Bs,o).addScaledVector(zs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Lo={h:0,s:0,l:0};function wl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ie.workingColorSpace){if(t=Sh(t,1),e=Oe(e,0,1),n=Oe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=wl(o,r,t+1/3),this.g=wl(o,r,t),this.b=wl(o,r,t-1/3)}return ie.toWorkingColorSpace(this,i),this}setStyle(t,e=Qe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const n=Pd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}copyLinearToSRGB(t){return this.r=al(t.r),this.g=al(t.g),this.b=al(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return ie.fromWorkingColorSpace(Ze.copy(this),t),Math.round(Oe(Ze.r*255,0,255))*65536+Math.round(Oe(Ze.g*255,0,255))*256+Math.round(Oe(Ze.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(Ze.copy(this),e);const n=Ze.r,i=Ze.g,r=Ze.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=Qe){ie.fromWorkingColorSpace(Ze.copy(this),t);const e=Ze.r,n=Ze.g,i=Ze.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Di),this.setHSL(Di.h+t,Di.s+e,Di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Di),t.getHSL(Lo);const n=Zr(Di.h,Lo.h,e),i=Zr(Di.s,Lo.s,e),r=Zr(Di.l,Lo.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ze=new Dt;Dt.NAMES=Pd;let k0=0;class ji extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=rr,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ql,this.blendDst=tc,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ps,this.stencilZFail=Ps,this.stencilZPass=Ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(n.blending=this.blending),this.side!==Gi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ql&&(n.blendSrc=this.blendSrc),this.blendDst!==tc&&(n.blendDst=this.blendDst),this.blendEquation!==ls&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==fr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _e extends ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=cd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ie=new P,Io=new J;class Ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fc,this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Io.fromBufferAttribute(this,e),Io.applyMatrix3(t),this.setXY(e,Io.x,Io.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fc&&(t.usage=this.usage),t}}class Dd extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ld extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class qt extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let H0=0;const In=new Zt,El=new be,ks=new P,En=new bs,Ur=new bs,Ve=new P;class ue extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ad(t)?Ld:Dd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return El.lookAt(t),El.updateMatrix(),this.applyMatrix4(El.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ks).negate(),this.translate(ks.x,ks.y,ks.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];En.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(En.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ur.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(En.min,Ur.min),En.expandByPoint(Ve),Ve.addVectors(En.max,Ur.max),En.expandByPoint(Ve)):(En.expandByPoint(Ur.min),En.expandByPoint(Ur.max))}En.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ve.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ve));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ve.fromBufferAttribute(a,c),l&&(ks.fromBufferAttribute(t,c),Ve.add(ks)),i=Math.max(i,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new P,l[C]=new P;const c=new P,h=new P,u=new P,f=new J,d=new J,m=new J,g=new P,p=new P;function _(C,L,M){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,C),d.fromBufferAttribute(r,L),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),d.sub(f),m.sub(f);const S=1/(d.x*m.y-m.x*d.y);isFinite(S)&&(g.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(S),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(S),a[C].add(g),a[L].add(g),a[M].add(g),l[C].add(p),l[L].add(p),l[M].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,L=x.length;C<L;++C){const M=x[C],S=M.start,N=M.count;for(let O=S,k=S+N;O<k;O+=3)_(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const v=new P,y=new P,T=new P,w=new P;function E(C){T.fromBufferAttribute(i,C),w.copy(T);const L=a[C];v.copy(L),v.sub(T.multiplyScalar(T.dot(L))).normalize(),y.crossVectors(w,L);const S=y.dot(l[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,S)}for(let C=0,L=x.length;C<L;++C){const M=x[C],S=M.start,N=M.count;for(let O=S,k=S+N;O<k;O+=3)E(t.getX(O+0)),E(t.getX(O+1)),E(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),g=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,m=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?d=l[g]*a.data.stride+a.offset:d=l[g]*h;for(let _=0;_<h;_++)f[m++]=c[d++]}return new Ke(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ue,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lu=new Zt,ts=new xo,Uo=new Ts,Iu=new P,No=new P,Oo=new P,Fo=new P,bl=new P,Bo=new P,Uu=new P,zo=new P;class it extends be{constructor(t=new ue,e=new _e){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Bo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(bl.fromBufferAttribute(u,t),o?Bo.addScaledVector(bl,h):Bo.addScaledVector(bl.sub(e),h))}e.add(Bo)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(Uo.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Uo,Iu)===null||ts.origin.distanceToSquared(Iu)>(t.far-t.near)**2))&&(Lu.copy(r).invert(),ts.copy(t.ray).applyMatrix4(Lu),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,g=f.length;m<g;m++){const p=f[m],_=o[p.materialIndex],x=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let y=x,T=v;y<T;y+=3){const w=a.getX(y),E=a.getX(y+1),C=a.getX(y+2);i=ko(this,_,t,n,c,h,u,w,E,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let p=m,_=g;p<_;p+=3){const x=a.getX(p),v=a.getX(p+1),y=a.getX(p+2);i=ko(this,o,t,n,c,h,u,x,v,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,g=f.length;m<g;m++){const p=f[m],_=o[p.materialIndex],x=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let y=x,T=v;y<T;y+=3){const w=y,E=y+1,C=y+2;i=ko(this,_,t,n,c,h,u,w,E,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let p=m,_=g;p<_;p+=3){const x=p,v=p+1,y=p+2;i=ko(this,o,t,n,c,h,u,x,v,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function V0(s,t,e,n,i,r,o,a){let l;if(t.side===nn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Gi,a),l===null)return null;zo.copy(a),zo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(zo);return c<e.near||c>e.far?null:{distance:c,point:zo.clone(),object:s}}function ko(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,No),s.getVertexPosition(l,Oo),s.getVertexPosition(c,Fo);const h=V0(s,t,e,n,No,Oo,Fo,Uu);if(h){const u=new P;On.getBarycoord(Uu,No,Oo,Fo,u),i&&(h.uv=On.getInterpolatedAttribute(i,a,l,c,u,new J)),r&&(h.uv1=On.getInterpolatedAttribute(r,a,l,c,u,new J)),o&&(h.normal=On.getInterpolatedAttribute(o,a,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};On.getNormal(No,Oo,Fo,f.normal),h.face=f,h.barycoord=u}return h}class Xe extends ue{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function m(g,p,_,x,v,y,T,w,E,C,L){const M=y/E,S=T/C,N=y/2,O=T/2,k=w/2,G=E+1,B=C+1;let j=0,I=0;const W=new P;for(let Z=0;Z<B;Z++){const st=Z*S-O;for(let St=0;St<G;St++){const Lt=St*M-N;W[g]=Lt*x,W[p]=st*v,W[_]=k,c.push(W.x,W.y,W.z),W[g]=0,W[p]=0,W[_]=w>0?1:-1,h.push(W.x,W.y,W.z),u.push(St/E),u.push(1-Z/C),j+=1}}for(let Z=0;Z<C;Z++)for(let st=0;st<E;st++){const St=f+st+G*Z,Lt=f+st+G*(Z+1),Y=f+(st+1)+G*(Z+1),ot=f+(st+1)+G*Z;l.push(St,Lt,ot),l.push(Lt,Y,ot),I+=6}a.addGroup(d,I,L),d+=I,f+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gr(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ln(s){const t={};for(let e=0;e<s.length;e++){const n=gr(s[e]);for(const i in n)t[i]=n[i]}return t}function G0(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Id(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const oo={clone:gr,merge:ln};var W0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,X0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ze extends ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=W0,this.fragmentShader=X0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gr(t.uniforms),this.uniformsGroups=G0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ud extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=vi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Li=new P,Nu=new J,Ou=new J;class An extends Ud{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ro*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ro*2*Math.atan(Math.tan($r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Li.x,Li.y).multiplyScalar(-t/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Li.x,Li.y).multiplyScalar(-t/Li.z)}getViewSize(t,e){return this.getViewBounds(t,Nu,Ou),e.subVectors(Ou,Nu)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan($r*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Hs=-90,Vs=1;class Y0 extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new An(Hs,Vs,t,e);i.layers=this.layers,this.add(i);const r=new An(Hs,Vs,t,e);r.layers=this.layers,this.add(r);const o=new An(Hs,Vs,t,e);o.layers=this.layers,this.add(o);const a=new An(Hs,Vs,t,e);a.layers=this.layers,this.add(a);const l=new An(Hs,Vs,t,e);l.layers=this.layers,this.add(l);const c=new An(Hs,Vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===vi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ya)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Nd extends sn{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:dr,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class q0 extends Kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Nd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Yn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Xe(5,5,5),r=new ze({name:"CubemapFromEquirect",uniforms:gr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:xi});r.uniforms.tEquirect.value=e;const o=new it(i,r),a=e.minFilter;return e.minFilter===us&&(e.minFilter=Yn),new Y0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Tl=new P,j0=new P,K0=new Kt;class Ii{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Tl.subVectors(n,e).cross(j0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Tl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||K0.getNormalMatrix(t),i=this.coplanarPoint(Tl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const es=new Ts,Ho=new P;class Eh{constructor(t=new Ii,e=new Ii,n=new Ii,i=new Ii,r=new Ii,o=new Ii){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vi){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],m=i[9],g=i[10],p=i[11],_=i[12],x=i[13],v=i[14],y=i[15];if(n[0].setComponents(l-r,f-c,p-d,y-_).normalize(),n[1].setComponents(l+r,f+c,p+d,y+_).normalize(),n[2].setComponents(l+o,f+h,p+m,y+x).normalize(),n[3].setComponents(l-o,f-h,p-m,y-x).normalize(),n[4].setComponents(l-a,f-u,p-g,y-v).normalize(),e===vi)n[5].setComponents(l+a,f+u,p+g,y+v).normalize();else if(e===ya)n[5].setComponents(a,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){return es.center.set(0,0,0),es.radius=.7071067811865476,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ho.x=i.normal.x>0?t.max.x:t.min.x,Ho.y=i.normal.y>0?t.max.y:t.min.y,Ho.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ho)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Od(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function $0(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],g=u[d];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++f,u[f]=g)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const g=u[d];s.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Fe extends ue{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,d=[],m=[],g=[],p=[];for(let _=0;_<h;_++){const x=_*f-o;for(let v=0;v<c;v++){const y=v*u-r;m.push(y,-x,0),g.push(0,0,1),p.push(v/a),p.push(1-_/l)}}for(let _=0;_<l;_++)for(let x=0;x<a;x++){const v=x+c*_,y=x+c*(_+1),T=x+1+c*(_+1),w=x+1+c*_;d.push(v,y,w),d.push(y,T,w)}this.setIndex(d),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(g,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.width,t.height,t.widthSegments,t.heightSegments)}}var Z0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,J0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Q0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,t_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,e_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,n_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,i_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,s_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,r_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,o_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,a_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,l_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,c_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,h_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,u_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,f_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,d_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,p_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,m_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,__=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,g_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,v_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,x_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,y_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,M_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,S_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,w_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,E_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,T_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,A_="gl_FragColor = linearToOutputTexel( gl_FragColor );",C_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,R_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,P_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,D_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,L_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,I_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,U_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,F_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,B_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,z_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,H_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,V_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,G_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,W_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,X_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Y_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,j_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,K_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Z_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,J_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Q_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ng=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ig=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,og=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ag=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ug=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Eg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ag=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ug=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ng=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Og=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ev=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,iv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ov=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,av=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_v=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Mv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ev=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Av=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Cv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:Z0,alphahash_pars_fragment:J0,alphamap_fragment:Q0,alphamap_pars_fragment:t_,alphatest_fragment:e_,alphatest_pars_fragment:n_,aomap_fragment:i_,aomap_pars_fragment:s_,batching_pars_vertex:r_,batching_vertex:o_,begin_vertex:a_,beginnormal_vertex:l_,bsdfs:c_,iridescence_fragment:h_,bumpmap_pars_fragment:u_,clipping_planes_fragment:f_,clipping_planes_pars_fragment:d_,clipping_planes_pars_vertex:p_,clipping_planes_vertex:m_,color_fragment:__,color_pars_fragment:g_,color_pars_vertex:v_,color_vertex:x_,common:y_,cube_uv_reflection_fragment:M_,defaultnormal_vertex:S_,displacementmap_pars_vertex:w_,displacementmap_vertex:E_,emissivemap_fragment:b_,emissivemap_pars_fragment:T_,colorspace_fragment:A_,colorspace_pars_fragment:C_,envmap_fragment:R_,envmap_common_pars_fragment:P_,envmap_pars_fragment:D_,envmap_pars_vertex:L_,envmap_physical_pars_fragment:G_,envmap_vertex:I_,fog_vertex:U_,fog_pars_vertex:N_,fog_fragment:O_,fog_pars_fragment:F_,gradientmap_pars_fragment:B_,lightmap_pars_fragment:z_,lights_lambert_fragment:k_,lights_lambert_pars_fragment:H_,lights_pars_begin:V_,lights_toon_fragment:W_,lights_toon_pars_fragment:X_,lights_phong_fragment:Y_,lights_phong_pars_fragment:q_,lights_physical_fragment:j_,lights_physical_pars_fragment:K_,lights_fragment_begin:$_,lights_fragment_maps:Z_,lights_fragment_end:J_,logdepthbuf_fragment:Q_,logdepthbuf_pars_fragment:tg,logdepthbuf_pars_vertex:eg,logdepthbuf_vertex:ng,map_fragment:ig,map_pars_fragment:sg,map_particle_fragment:rg,map_particle_pars_fragment:og,metalnessmap_fragment:ag,metalnessmap_pars_fragment:lg,morphinstance_vertex:cg,morphcolor_vertex:hg,morphnormal_vertex:ug,morphtarget_pars_vertex:fg,morphtarget_vertex:dg,normal_fragment_begin:pg,normal_fragment_maps:mg,normal_pars_fragment:_g,normal_pars_vertex:gg,normal_vertex:vg,normalmap_pars_fragment:xg,clearcoat_normal_fragment_begin:yg,clearcoat_normal_fragment_maps:Mg,clearcoat_pars_fragment:Sg,iridescence_pars_fragment:wg,opaque_fragment:Eg,packing:bg,premultiplied_alpha_fragment:Tg,project_vertex:Ag,dithering_fragment:Cg,dithering_pars_fragment:Rg,roughnessmap_fragment:Pg,roughnessmap_pars_fragment:Dg,shadowmap_pars_fragment:Lg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Ug,shadowmask_pars_fragment:Ng,skinbase_vertex:Og,skinning_pars_vertex:Fg,skinning_vertex:Bg,skinnormal_vertex:zg,specularmap_fragment:kg,specularmap_pars_fragment:Hg,tonemapping_fragment:Vg,tonemapping_pars_fragment:Gg,transmission_fragment:Wg,transmission_pars_fragment:Xg,uv_pars_fragment:Yg,uv_pars_vertex:qg,uv_vertex:jg,worldpos_vertex:Kg,background_vert:$g,background_frag:Zg,backgroundCube_vert:Jg,backgroundCube_frag:Qg,cube_vert:tv,cube_frag:ev,depth_vert:nv,depth_frag:iv,distanceRGBA_vert:sv,distanceRGBA_frag:rv,equirect_vert:ov,equirect_frag:av,linedashed_vert:lv,linedashed_frag:cv,meshbasic_vert:hv,meshbasic_frag:uv,meshlambert_vert:fv,meshlambert_frag:dv,meshmatcap_vert:pv,meshmatcap_frag:mv,meshnormal_vert:_v,meshnormal_frag:gv,meshphong_vert:vv,meshphong_frag:xv,meshphysical_vert:yv,meshphysical_frag:Mv,meshtoon_vert:Sv,meshtoon_frag:wv,points_vert:Ev,points_frag:bv,shadow_vert:Tv,shadow_frag:Av,sprite_vert:Cv,sprite_frag:Rv},Mt={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Zn={basic:{uniforms:ln([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:ln([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:ln([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:ln([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:ln([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:ln([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:ln([Mt.points,Mt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:ln([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:ln([Mt.common,Mt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:ln([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:ln([Mt.sprite,Mt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:ln([Mt.common,Mt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:ln([Mt.lights,Mt.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};Zn.physical={uniforms:ln([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const Vo={r:0,b:0,g:0},ns=new xn,Pv=new Zt;function Dv(s,t,e,n,i,r,o){const a=new Dt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function m(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function g(x){let v=!1;const y=m(x);y===null?_(a,l):y&&y.isColor&&(_(y,1),v=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(x,v){const y=m(v);y&&(y.isCubeTexture||y.mapping===Ha)?(h===void 0&&(h=new it(new Xe(1,1,1),new ze({name:"BackgroundCubeMaterial",uniforms:gr(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ns.copy(v.backgroundRotation),ns.x*=-1,ns.y*=-1,ns.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Pv.makeRotationFromEuler(ns)),h.material.toneMapped=ie.getTransfer(y.colorSpace)!==pe,(u!==y||f!==y.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,d=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new it(new Fe(2,2),new ze({name:"BackgroundMaterial",uniforms:gr(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ie.getTransfer(y.colorSpace)!==pe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,d=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function _(x,v){x.getRGB(Vo,Id(s)),n.buffers.color.setClear(Vo.r,Vo.g,Vo.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,_(a,l)},render:g,addToRenderList:p}}function Lv(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(M,S,N,O,k){let G=!1;const B=u(O,N,S);r!==B&&(r=B,c(r.object)),G=d(M,O,N,k),G&&m(M,O,N,k),k!==null&&t.update(k,s.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,y(M,S,N,O),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,S,N){const O=N.wireframe===!0;let k=n[M.id];k===void 0&&(k={},n[M.id]=k);let G=k[S.id];G===void 0&&(G={},k[S.id]=G);let B=G[O];return B===void 0&&(B=f(l()),G[O]=B),B}function f(M){const S=[],N=[],O=[];for(let k=0;k<e;k++)S[k]=0,N[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:N,attributeDivisors:O,object:M,attributes:{},index:null}}function d(M,S,N,O){const k=r.attributes,G=S.attributes;let B=0;const j=N.getAttributes();for(const I in j)if(j[I].location>=0){const Z=k[I];let st=G[I];if(st===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(st=M.instanceColor)),Z===void 0||Z.attribute!==st||st&&Z.data!==st.data)return!0;B++}return r.attributesNum!==B||r.index!==O}function m(M,S,N,O){const k={},G=S.attributes;let B=0;const j=N.getAttributes();for(const I in j)if(j[I].location>=0){let Z=G[I];Z===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor));const st={};st.attribute=Z,Z&&Z.data&&(st.data=Z.data),k[I]=st,B++}r.attributes=k,r.attributesNum=B,r.index=O}function g(){const M=r.newAttributes;for(let S=0,N=M.length;S<N;S++)M[S]=0}function p(M){_(M,0)}function _(M,S){const N=r.newAttributes,O=r.enabledAttributes,k=r.attributeDivisors;N[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),k[M]!==S&&(s.vertexAttribDivisor(M,S),k[M]=S)}function x(){const M=r.newAttributes,S=r.enabledAttributes;for(let N=0,O=S.length;N<O;N++)S[N]!==M[N]&&(s.disableVertexAttribArray(N),S[N]=0)}function v(M,S,N,O,k,G,B){B===!0?s.vertexAttribIPointer(M,S,N,k,G):s.vertexAttribPointer(M,S,N,O,k,G)}function y(M,S,N,O){g();const k=O.attributes,G=N.getAttributes(),B=S.defaultAttributeValues;for(const j in G){const I=G[j];if(I.location>=0){let W=k[j];if(W===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(W=M.instanceColor)),W!==void 0){const Z=W.normalized,st=W.itemSize,St=t.get(W);if(St===void 0)continue;const Lt=St.buffer,Y=St.type,ot=St.bytesPerElement,gt=Y===s.INT||Y===s.UNSIGNED_INT||W.gpuType===ph;if(W.isInterleavedBufferAttribute){const lt=W.data,bt=lt.stride,wt=W.offset;if(lt.isInstancedInterleavedBuffer){for(let Vt=0;Vt<I.locationSize;Vt++)_(I.location+Vt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Vt=0;Vt<I.locationSize;Vt++)p(I.location+Vt);s.bindBuffer(s.ARRAY_BUFFER,Lt);for(let Vt=0;Vt<I.locationSize;Vt++)v(I.location+Vt,st/I.locationSize,Y,Z,bt*ot,(wt+st/I.locationSize*Vt)*ot,gt)}else{if(W.isInstancedBufferAttribute){for(let lt=0;lt<I.locationSize;lt++)_(I.location+lt,W.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let lt=0;lt<I.locationSize;lt++)p(I.location+lt);s.bindBuffer(s.ARRAY_BUFFER,Lt);for(let lt=0;lt<I.locationSize;lt++)v(I.location+lt,st/I.locationSize,Y,Z,st*ot,st/I.locationSize*lt*ot,gt)}}else if(B!==void 0){const Z=B[j];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(I.location,Z);break;case 3:s.vertexAttrib3fv(I.location,Z);break;case 4:s.vertexAttrib4fv(I.location,Z);break;default:s.vertexAttrib1fv(I.location,Z)}}}}x()}function T(){C();for(const M in n){const S=n[M];for(const N in S){const O=S[N];for(const k in O)h(O[k].object),delete O[k];delete S[N]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const S=n[M.id];for(const N in S){const O=S[N];for(const k in O)h(O[k].object),delete O[k];delete S[N]}delete n[M.id]}function E(M){for(const S in n){const N=n[S];if(N[M.id]===void 0)continue;const O=N[M.id];for(const k in O)h(O[k].object),delete O[k];delete N[M.id]}}function C(){L(),o=!0,r!==i&&(r=i,c(r.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:p,disableUnusedAttributes:x}}function Iv(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)o(c[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];for(let g=0;g<f.length;g++)e.update(m,n,f[g])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Uv(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==jn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const C=E===yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Mi&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Qn&&!C)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const E=t.get("EXT_clip_control");E.clipControlEXT(E.LOWER_LEFT_EXT,E.ZERO_TO_ONE_EXT)}const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:p,maxAttributes:_,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:T,maxSamples:w}}function Nv(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new Ii,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,_=s.get(u);if(!i||m===null||m.length===0||r&&!p)r?h(null):c();else{const x=r?0:n,v=x*4;let y=_.clippingState||null;l.value=y,y=h(m,f,v,d);for(let T=0;T!==v;++T)y[T]=e[T];_.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,m!==!0||p===null){const _=d+g*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<_)&&(p=new Float32Array(_));for(let v=0,y=d;v!==g;++v,y+=4)o.copy(u[v]).applyMatrix4(x,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function Ov(s){let t=new WeakMap;function e(o,a){return a===lc?o.mapping=dr:a===cc&&(o.mapping=pr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===lc||a===cc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new q0(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class bh extends Ud{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const tr=4,Fu=[.125,.215,.35,.446,.526,.582],cs=20,Al=new bh,Bu=new Dt;let Cl=null,Rl=0,Pl=0,Dl=!1;const os=(1+Math.sqrt(5))/2,Gs=1/os,zu=[new P(-os,Gs,0),new P(os,Gs,0),new P(-Gs,0,os),new P(Gs,0,os),new P(0,os,-Gs),new P(0,os,Gs),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class zc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Cl=this._renderer.getRenderTarget(),Rl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),Dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Cl,Rl,Pl),this._renderer.xr.enabled=Dl,t.scissorTest=!1,Go(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===dr||t.mapping===pr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Cl=this._renderer.getRenderTarget(),Rl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),Dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:yi,format:jn,colorSpace:qi,depthBuffer:!1},i=ku(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ku(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fv(r)),this._blurMaterial=Bv(r,t,e)}return i}_compileMaterial(t){const e=new it(this._lodPlanes[0],t);this._renderer.compile(e,Al)}_sceneToCubeUV(t,e,n,i){const a=new An(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Bu),h.toneMapping=zi,h.autoClear=!1;const d=new _e({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),m=new it(new Xe,d);let g=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,g=!0):(d.color.copy(Bu),g=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(a.up.set(0,l[_],0),a.lookAt(c[_],0,0)):x===1?(a.up.set(0,0,l[_]),a.lookAt(0,c[_],0)):(a.up.set(0,l[_],0),a.lookAt(0,0,c[_]));const v=this._cubeSize;Go(i,x*v,_>2?v:0,v,v),h.setRenderTarget(i),g&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===dr||t.mapping===pr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hu());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new it(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Go(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Al)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zu[(i-r-1)%zu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new it(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*cs-1),g=r/m,p=isFinite(r)?1+Math.floor(h*g):cs;p>cs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${cs}`);const _=[];let x=0;for(let E=0;E<cs;++E){const C=E/g,L=Math.exp(-C*C/2);_.push(L),E===0?x+=L:E<p&&(x+=2*L)}for(let E=0;E<_.length;E++)_[E]=_[E]/x;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=_,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=m,f.mipInt.value=v-n;const y=this._sizeLods[i],T=3*y*(i>v-tr?i-v+tr:0),w=4*(this._cubeSize-y);Go(e,T,w,3*y,2*y),l.setRenderTarget(e),l.render(u,Al)}}function Fv(s){const t=[],e=[],n=[];let i=s;const r=s-tr+1+Fu.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-tr?l=Fu[o-s+tr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,g=3,p=2,_=1,x=new Float32Array(g*m*d),v=new Float32Array(p*m*d),y=new Float32Array(_*m*d);for(let w=0;w<d;w++){const E=w%3*2/3-1,C=w>2?0:-1,L=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];x.set(L,g*m*w),v.set(f,p*m*w);const M=[w,w,w,w,w,w];y.set(M,_*m*w)}const T=new ue;T.setAttribute("position",new Ke(x,g)),T.setAttribute("uv",new Ke(v,p)),T.setAttribute("faceIndex",new Ke(y,_)),t.push(T),i>tr&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ku(s,t,e){const n=new Kn(s,t,e);return n.texture.mapping=Ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Go(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Bv(s,t,e){const n=new Float32Array(cs),i=new P(0,1,0);return new ze({name:"SphericalGaussianBlur",defines:{n:cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Hu(){return new ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Vu(){return new ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Th(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Th(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zv(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===lc||l===cc,h=l===dr||l===pr;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new zc(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new zc(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function kv(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ua("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Hv(s,t,e,n){const i={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);for(const m in f.morphAttributes){const g=f.morphAttributes[m];for(let p=0,_=g.length;p<_;p++)t.remove(g[p])}f.removeEventListener("dispose",o),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const m in f)t.update(f[m],s.ARRAY_BUFFER);const d=u.morphAttributes;for(const m in d){const g=d[m];for(let p=0,_=g.length;p<_;p++)t.update(g[p],s.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,m=u.attributes.position;let g=0;if(d!==null){const x=d.array;g=d.version;for(let v=0,y=x.length;v<y;v+=3){const T=x[v+0],w=x[v+1],E=x[v+2];f.push(T,w,w,E,E,T)}}else if(m!==void 0){const x=m.array;g=m.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const T=v+0,w=v+1,E=v+2;f.push(T,w,w,E,E,T)}}else return;const p=new(Ad(f)?Ld:Dd)(f,1);p.version=g;const _=r.get(u);_&&t.remove(_),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Vv(s,t,e){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*o),e.update(d,n,1)}function c(f,d,m){m!==0&&(s.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let p=0;for(let _=0;_<m;_++)p+=d[_];e.update(p,n,1)}function u(f,d,m,g){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f.length;_++)c(f[_]/o,d[_],g[_]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,g,0,m);let _=0;for(let x=0;x<m;x++)_+=d[x];for(let x=0;x<g.length;x++)e.update(_,n,g[x])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Gv(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Wv(s,t,e){const n=new WeakMap,i=new he;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;m===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let T=a.attributes.position.count*y,w=1;T>t.maxTextureSize&&(w=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const E=new Float32Array(T*w*4*u),C=new Rd(E,T,w,u);C.type=Qn,C.needsUpdate=!0;const L=y*4;for(let S=0;S<u;S++){const N=_[S],O=x[S],k=v[S],G=T*w*4*S;for(let B=0;B<N.count;B++){const j=B*L;m===!0&&(i.fromBufferAttribute(N,B),E[G+j+0]=i.x,E[G+j+1]=i.y,E[G+j+2]=i.z,E[G+j+3]=0),g===!0&&(i.fromBufferAttribute(O,B),E[G+j+4]=i.x,E[G+j+5]=i.y,E[G+j+6]=i.z,E[G+j+7]=0),p===!0&&(i.fromBufferAttribute(k,B),E[G+j+8]=i.x,E[G+j+9]=i.y,E[G+j+10]=i.z,E[G+j+11]=k.itemSize===4?i.w:1)}}f={count:u,texture:C,size:new J(T,w)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Xv(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Fd extends sn{constructor(t,e,n,i,r,o,a,l,c,h=or){if(h!==or&&h!==_r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===or&&(n=ys),n===void 0&&h===_r&&(n=mr),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:un,this.minFilter=l!==void 0?l:un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Bd=new sn,Gu=new Fd(1,1),zd=new Rd,kd=new L0,Hd=new Nd,Wu=[],Xu=[],Yu=new Float32Array(16),qu=new Float32Array(9),ju=new Float32Array(4);function Ar(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Wu[i];if(r===void 0&&(r=new Float32Array(i),Wu[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function ke(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function He(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ga(s,t){let e=Xu[t];e===void 0&&(e=new Int32Array(t),Xu[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Yv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function qv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;s.uniform2fv(this.addr,t),He(e,t)}}function jv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;s.uniform3fv(this.addr,t),He(e,t)}}function Kv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;s.uniform4fv(this.addr,t),He(e,t)}}function $v(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ke(e,n))return;ju.set(n),s.uniformMatrix2fv(this.addr,!1,ju),He(e,n)}}function Zv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ke(e,n))return;qu.set(n),s.uniformMatrix3fv(this.addr,!1,qu),He(e,n)}}function Jv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ke(e,n))return;Yu.set(n),s.uniformMatrix4fv(this.addr,!1,Yu),He(e,n)}}function Qv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function tx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;s.uniform2iv(this.addr,t),He(e,t)}}function ex(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;s.uniform3iv(this.addr,t),He(e,t)}}function nx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;s.uniform4iv(this.addr,t),He(e,t)}}function ix(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function sx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;s.uniform2uiv(this.addr,t),He(e,t)}}function rx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;s.uniform3uiv(this.addr,t),He(e,t)}}function ox(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;s.uniform4uiv(this.addr,t),He(e,t)}}function ax(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Gu.compareFunction=Td,r=Gu):r=Bd,e.setTexture2D(t||r,i)}function lx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||kd,i)}function cx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Hd,i)}function hx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||zd,i)}function ux(s){switch(s){case 5126:return Yv;case 35664:return qv;case 35665:return jv;case 35666:return Kv;case 35674:return $v;case 35675:return Zv;case 35676:return Jv;case 5124:case 35670:return Qv;case 35667:case 35671:return tx;case 35668:case 35672:return ex;case 35669:case 35673:return nx;case 5125:return ix;case 36294:return sx;case 36295:return rx;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return lx;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return hx}}function fx(s,t){s.uniform1fv(this.addr,t)}function dx(s,t){const e=Ar(t,this.size,2);s.uniform2fv(this.addr,e)}function px(s,t){const e=Ar(t,this.size,3);s.uniform3fv(this.addr,e)}function mx(s,t){const e=Ar(t,this.size,4);s.uniform4fv(this.addr,e)}function _x(s,t){const e=Ar(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function gx(s,t){const e=Ar(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function vx(s,t){const e=Ar(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function xx(s,t){s.uniform1iv(this.addr,t)}function yx(s,t){s.uniform2iv(this.addr,t)}function Mx(s,t){s.uniform3iv(this.addr,t)}function Sx(s,t){s.uniform4iv(this.addr,t)}function wx(s,t){s.uniform1uiv(this.addr,t)}function Ex(s,t){s.uniform2uiv(this.addr,t)}function bx(s,t){s.uniform3uiv(this.addr,t)}function Tx(s,t){s.uniform4uiv(this.addr,t)}function Ax(s,t,e){const n=this.cache,i=t.length,r=Ga(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Bd,r[o])}function Cx(s,t,e){const n=this.cache,i=t.length,r=Ga(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||kd,r[o])}function Rx(s,t,e){const n=this.cache,i=t.length,r=Ga(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Hd,r[o])}function Px(s,t,e){const n=this.cache,i=t.length,r=Ga(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||zd,r[o])}function Dx(s){switch(s){case 5126:return fx;case 35664:return dx;case 35665:return px;case 35666:return mx;case 35674:return _x;case 35675:return gx;case 35676:return vx;case 5124:case 35670:return xx;case 35667:case 35671:return yx;case 35668:case 35672:return Mx;case 35669:case 35673:return Sx;case 5125:return wx;case 36294:return Ex;case 36295:return bx;case 36296:return Tx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ax;case 35679:case 36299:case 36307:return Cx;case 35680:case 36300:case 36308:case 36293:return Rx;case 36289:case 36303:case 36311:case 36292:return Px}}class Lx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ux(e.type)}}class Ix{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Dx(e.type)}}class Ux{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Ll=/(\w+)(\])?(\[|\.)?/g;function Ku(s,t){s.seq.push(t),s.map[t.id]=t}function Nx(s,t,e){const n=s.name,i=n.length;for(Ll.lastIndex=0;;){const r=Ll.exec(n),o=Ll.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Ku(e,c===void 0?new Lx(a,s,t):new Ix(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Ux(a),Ku(e,u)),e=u}}}class fa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Nx(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function $u(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Ox=37297;let Fx=0;function Bx(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function zx(s){const t=ie.getPrimaries(ie.workingColorSpace),e=ie.getPrimaries(s);let n;switch(t===e?n="":t===xa&&e===va?n="LinearDisplayP3ToLinearSRGB":t===va&&e===xa&&(n="LinearSRGBToLinearDisplayP3"),s){case qi:case Va:return[n,"LinearTransferOETF"];case Qe:case Mh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Zu(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Bx(s.getShaderSource(t),o)}else return i}function kx(s,t){const e=zx(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Hx(s,t){let e;switch(t){case hd:e="Linear";break;case ud:e="Reinhard";break;case fd:e="Cineon";break;case dh:e="ACESFilmic";break;case dd:e="AgX";break;case pd:e="Neutral";break;case Km:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Wo=new P;function Vx(){ie.getLuminanceCoefficients(Wo);const s=Wo.x.toFixed(4),t=Wo.y.toFixed(4),e=Wo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yr).join(`
`)}function Wx(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Xx(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Yr(s){return s!==""}function Ju(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qu(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(s){return s.replace(Yx,jx)}const qx=new Map;function jx(s,t){let e=jt[t];if(e===void 0){const n=qx.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return kc(e)}const Kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tf(s){return s.replace(Kx,$x)}function $x(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function ef(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Zx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ad?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ld?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===di&&(t="SHADOWMAP_TYPE_VSM"),t}function Jx(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case dr:case pr:t="ENVMAP_TYPE_CUBE";break;case Ha:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qx(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case pr:t="ENVMAP_MODE_REFRACTION";break}return t}function ty(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case cd:t="ENVMAP_BLENDING_MULTIPLY";break;case qm:t="ENVMAP_BLENDING_MIX";break;case jm:t="ENVMAP_BLENDING_ADD";break}return t}function ey(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function ny(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Zx(e),c=Jx(e),h=Qx(e),u=ty(e),f=ey(e),d=Gx(e),m=Wx(r),g=i.createProgram();let p,_,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Yr).join(`
`),p.length>0&&(p+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Yr).join(`
`),_.length>0&&(_+=`
`)):(p=[ef(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yr).join(`
`),_=[ef(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zi?"#define TONE_MAPPING":"",e.toneMapping!==zi?jt.tonemapping_pars_fragment:"",e.toneMapping!==zi?Hx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,kx("linearToOutputTexel",e.outputColorSpace),Vx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yr).join(`
`)),o=kc(o),o=Ju(o,e),o=Qu(o,e),a=kc(a),a=Ju(a,e),a=Qu(a,e),o=tf(o),a=tf(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["#define varying in",e.glslVersion===vu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const v=x+p+o,y=x+_+a,T=$u(i,i.VERTEX_SHADER,v),w=$u(i,i.FRAGMENT_SHADER,y);i.attachShader(g,T),i.attachShader(g,w),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(S){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(g).trim(),O=i.getShaderInfoLog(T).trim(),k=i.getShaderInfoLog(w).trim();let G=!0,B=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,T,w);else{const j=Zu(i,T,"vertex"),I=Zu(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+N+`
`+j+`
`+I)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||k==="")&&(B=!1);B&&(S.diagnostics={runnable:G,programLog:N,vertexShader:{log:O,prefix:p},fragmentShader:{log:k,prefix:_}})}i.deleteShader(T),i.deleteShader(w),C=new fa(i,g),L=Xx(i,g)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let L;this.getAttributes=function(){return L===void 0&&E(this),L};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,Ox)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Fx++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=w,this}let iy=0;class sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ry(t),e.set(t,n)),n}}class ry{constructor(t){this.id=iy++,this.code=t,this.usedTimes=0}}function oy(s,t,e,n,i,r,o){const a=new wh,l=new sy,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.reverseDepthBuffer,d=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M){return c.add(M),M===0?"uv":`uv${M}`}function _(M,S,N,O,k){const G=O.fog,B=k.geometry,j=M.isMeshStandardMaterial?O.environment:null,I=(M.isMeshStandardMaterial?e:t).get(M.envMap||j),W=I&&I.mapping===Ha?I.image.height:null,Z=g[M.type];M.precision!==null&&(m=i.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const st=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,St=st!==void 0?st.length:0;let Lt=0;B.morphAttributes.position!==void 0&&(Lt=1),B.morphAttributes.normal!==void 0&&(Lt=2),B.morphAttributes.color!==void 0&&(Lt=3);let Y,ot,gt,lt;if(Z){const dn=Zn[Z];Y=dn.vertexShader,ot=dn.fragmentShader}else Y=M.vertexShader,ot=M.fragmentShader,l.update(M),gt=l.getVertexShaderID(M),lt=l.getFragmentShaderID(M);const bt=s.getRenderTarget(),wt=k.isInstancedMesh===!0,Vt=k.isBatchedMesh===!0,Wt=!!M.map,et=!!M.matcap,D=!!I,_t=!!M.aoMap,pt=!!M.lightMap,ht=!!M.bumpMap,vt=!!M.normalMap,Ft=!!M.displacementMap,Tt=!!M.emissiveMap,R=!!M.metalnessMap,b=!!M.roughnessMap,V=M.anisotropy>0,tt=M.clearcoat>0,rt=M.dispersion>0,Q=M.iridescence>0,It=M.sheen>0,xt=M.transmission>0,K=V&&!!M.anisotropyMap,ct=tt&&!!M.clearcoatMap,H=tt&&!!M.clearcoatNormalMap,nt=tt&&!!M.clearcoatRoughnessMap,mt=Q&&!!M.iridescenceMap,Et=Q&&!!M.iridescenceThicknessMap,ut=It&&!!M.sheenColorMap,Xt=It&&!!M.sheenRoughnessMap,yt=!!M.specularMap,$t=!!M.specularColorMap,U=!!M.specularIntensityMap,ft=xt&&!!M.transmissionMap,$=xt&&!!M.thicknessMap,at=!!M.gradientMap,At=!!M.alphaMap,Pt=M.alphaTest>0,Qt=!!M.alphaHash,Le=!!M.extensions;let fn=zi;M.toneMapped&&(bt===null||bt.isXRRenderTarget===!0)&&(fn=s.toneMapping);const ne={shaderID:Z,shaderType:M.type,shaderName:M.name,vertexShader:Y,fragmentShader:ot,defines:M.defines,customVertexShaderID:gt,customFragmentShaderID:lt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:Vt,batchingColor:Vt&&k._colorsTexture!==null,instancing:wt,instancingColor:wt&&k.instanceColor!==null,instancingMorph:wt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:bt===null?s.outputColorSpace:bt.isXRRenderTarget===!0?bt.texture.colorSpace:qi,alphaToCoverage:!!M.alphaToCoverage,map:Wt,matcap:et,envMap:D,envMapMode:D&&I.mapping,envMapCubeUVHeight:W,aoMap:_t,lightMap:pt,bumpMap:ht,normalMap:vt,displacementMap:d&&Ft,emissiveMap:Tt,normalMapObjectSpace:vt&&M.normalMapType===Qm,normalMapTangentSpace:vt&&M.normalMapType===bd,metalnessMap:R,roughnessMap:b,anisotropy:V,anisotropyMap:K,clearcoat:tt,clearcoatMap:ct,clearcoatNormalMap:H,clearcoatRoughnessMap:nt,dispersion:rt,iridescence:Q,iridescenceMap:mt,iridescenceThicknessMap:Et,sheen:It,sheenColorMap:ut,sheenRoughnessMap:Xt,specularMap:yt,specularColorMap:$t,specularIntensityMap:U,transmission:xt,transmissionMap:ft,thicknessMap:$,gradientMap:at,opaque:M.transparent===!1&&M.blending===rr&&M.alphaToCoverage===!1,alphaMap:At,alphaTest:Pt,alphaHash:Qt,combine:M.combine,mapUv:Wt&&p(M.map.channel),aoMapUv:_t&&p(M.aoMap.channel),lightMapUv:pt&&p(M.lightMap.channel),bumpMapUv:ht&&p(M.bumpMap.channel),normalMapUv:vt&&p(M.normalMap.channel),displacementMapUv:Ft&&p(M.displacementMap.channel),emissiveMapUv:Tt&&p(M.emissiveMap.channel),metalnessMapUv:R&&p(M.metalnessMap.channel),roughnessMapUv:b&&p(M.roughnessMap.channel),anisotropyMapUv:K&&p(M.anisotropyMap.channel),clearcoatMapUv:ct&&p(M.clearcoatMap.channel),clearcoatNormalMapUv:H&&p(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&p(M.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&p(M.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&p(M.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&p(M.sheenColorMap.channel),sheenRoughnessMapUv:Xt&&p(M.sheenRoughnessMap.channel),specularMapUv:yt&&p(M.specularMap.channel),specularColorMapUv:$t&&p(M.specularColorMap.channel),specularIntensityMapUv:U&&p(M.specularIntensityMap.channel),transmissionMapUv:ft&&p(M.transmissionMap.channel),thicknessMapUv:$&&p(M.thicknessMap.channel),alphaMapUv:At&&p(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(vt||V),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(Wt||At),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:k.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Lt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&N.length>0,shadowMapType:s.shadowMap.type,toneMapping:fn,decodeVideoTexture:Wt&&M.map.isVideoTexture===!0&&ie.getTransfer(M.map.colorSpace)===pe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===xe,flipSided:M.side===nn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Le&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&M.extensions.multiDraw===!0||Vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function x(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const N in M.defines)S.push(N),S.push(M.defines[N]);return M.isRawShaderMaterial===!1&&(v(S,M),y(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function v(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function y(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.alphaToCoverage&&a.enable(20),M.push(a.mask)}function T(M){const S=g[M.type];let N;if(S){const O=Zn[S];N=oo.clone(O.uniforms)}else N=M.uniforms;return N}function w(M,S){let N;for(let O=0,k=h.length;O<k;O++){const G=h[O];if(G.cacheKey===S){N=G,++N.usedTimes;break}}return N===void 0&&(N=new ny(s,S,M,r),h.push(N)),N}function E(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function L(){l.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:T,acquireProgram:w,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:L}}function ay(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function ly(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function nf(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function sf(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,d,m,g,p){let _=s[t];return _===void 0?(_={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:g,group:p},s[t]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=d,_.groupOrder=m,_.renderOrder=u.renderOrder,_.z=g,_.group=p),t++,_}function a(u,f,d,m,g,p){const _=o(u,f,d,m,g,p);d.transmission>0?n.push(_):d.transparent===!0?i.push(_):e.push(_)}function l(u,f,d,m,g,p){const _=o(u,f,d,m,g,p);d.transmission>0?n.unshift(_):d.transparent===!0?i.unshift(_):e.unshift(_)}function c(u,f){e.length>1&&e.sort(u||ly),n.length>1&&n.sort(f||nf),i.length>1&&i.sort(f||nf)}function h(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function cy(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new sf,s.set(n,[o])):i>=r.length?(o=new sf,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function hy(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Dt};break;case"SpotLight":e={position:new P,direction:new P,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function uy(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let fy=0;function dy(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function py(s){const t=new hy,e=uy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const i=new P,r=new Zt,o=new Zt;function a(c){let h=0,u=0,f=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let d=0,m=0,g=0,p=0,_=0,x=0,v=0,y=0,T=0,w=0,E=0;c.sort(dy);for(let L=0,M=c.length;L<M;L++){const S=c[L],N=S.color,O=S.intensity,k=S.distance,G=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=N.r*O,u+=N.g*O,f+=N.b*O;else if(S.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(S.sh.coefficients[B],O);E++}else if(S.isDirectionalLight){const B=t.get(S);if(B.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const j=S.shadow,I=e.get(S);I.shadowIntensity=j.intensity,I.shadowBias=j.bias,I.shadowNormalBias=j.normalBias,I.shadowRadius=j.radius,I.shadowMapSize=j.mapSize,n.directionalShadow[d]=I,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=S.shadow.matrix,x++}n.directional[d]=B,d++}else if(S.isSpotLight){const B=t.get(S);B.position.setFromMatrixPosition(S.matrixWorld),B.color.copy(N).multiplyScalar(O),B.distance=k,B.coneCos=Math.cos(S.angle),B.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),B.decay=S.decay,n.spot[g]=B;const j=S.shadow;if(S.map&&(n.spotLightMap[T]=S.map,T++,j.updateMatrices(S),S.castShadow&&w++),n.spotLightMatrix[g]=j.matrix,S.castShadow){const I=e.get(S);I.shadowIntensity=j.intensity,I.shadowBias=j.bias,I.shadowNormalBias=j.normalBias,I.shadowRadius=j.radius,I.shadowMapSize=j.mapSize,n.spotShadow[g]=I,n.spotShadowMap[g]=G,y++}g++}else if(S.isRectAreaLight){const B=t.get(S);B.color.copy(N).multiplyScalar(O),B.halfWidth.set(S.width*.5,0,0),B.halfHeight.set(0,S.height*.5,0),n.rectArea[p]=B,p++}else if(S.isPointLight){const B=t.get(S);if(B.color.copy(S.color).multiplyScalar(S.intensity),B.distance=S.distance,B.decay=S.decay,S.castShadow){const j=S.shadow,I=e.get(S);I.shadowIntensity=j.intensity,I.shadowBias=j.bias,I.shadowNormalBias=j.normalBias,I.shadowRadius=j.radius,I.shadowMapSize=j.mapSize,I.shadowCameraNear=j.camera.near,I.shadowCameraFar=j.camera.far,n.pointShadow[m]=I,n.pointShadowMap[m]=G,n.pointShadowMatrix[m]=S.shadow.matrix,v++}n.point[m]=B,m++}else if(S.isHemisphereLight){const B=t.get(S);B.skyColor.copy(S.color).multiplyScalar(O),B.groundColor.copy(S.groundColor).multiplyScalar(O),n.hemi[_]=B,_++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Mt.LTC_FLOAT_1,n.rectAreaLTC2=Mt.LTC_FLOAT_2):(n.rectAreaLTC1=Mt.LTC_HALF_1,n.rectAreaLTC2=Mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==m||C.spotLength!==g||C.rectAreaLength!==p||C.hemiLength!==_||C.numDirectionalShadows!==x||C.numPointShadows!==v||C.numSpotShadows!==y||C.numSpotMaps!==T||C.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=p,n.point.length=m,n.hemi.length=_,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=E,C.directionalLength=d,C.pointLength=m,C.spotLength=g,C.rectAreaLength=p,C.hemiLength=_,C.numDirectionalShadows=x,C.numPointShadows=v,C.numSpotShadows=y,C.numSpotMaps=T,C.numLightProbes=E,n.version=fy++)}function l(c,h){let u=0,f=0,d=0,m=0,g=0;const p=h.matrixWorldInverse;for(let _=0,x=c.length;_<x;_++){const v=c[_];if(v.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(v.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function rf(s){const t=new py(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function my(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new rf(s),t.set(i,[a])):r>=o.length?(a=new rf(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class _y extends ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gy extends ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const vy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function yy(s,t,e){let n=new Eh;const i=new J,r=new J,o=new he,a=new _y({depthPacking:Jm}),l=new gy,c={},h=e.maxTextureSize,u={[Gi]:nn,[nn]:Gi,[xe]:xe},f=new ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:vy,fragmentShader:xy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new ue;m.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new it(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ad;let _=this.type;this.render=function(w,E,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const L=s.getRenderTarget(),M=s.getActiveCubeFace(),S=s.getActiveMipmapLevel(),N=s.state;N.setBlending(xi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=_!==di&&this.type===di,k=_===di&&this.type!==di;for(let G=0,B=w.length;G<B;G++){const j=w[G],I=j.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;i.copy(I.mapSize);const W=I.getFrameExtents();if(i.multiply(W),r.copy(I.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/W.x),i.x=r.x*W.x,I.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/W.y),i.y=r.y*W.y,I.mapSize.y=r.y)),I.map===null||O===!0||k===!0){const st=this.type!==di?{minFilter:un,magFilter:un}:{};I.map!==null&&I.map.dispose(),I.map=new Kn(i.x,i.y,st),I.map.texture.name=j.name+".shadowMap",I.camera.updateProjectionMatrix()}s.setRenderTarget(I.map),s.clear();const Z=I.getViewportCount();for(let st=0;st<Z;st++){const St=I.getViewport(st);o.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),N.viewport(o),I.updateMatrices(j,st),n=I.getFrustum(),y(E,C,I.camera,j,this.type)}I.isPointLightShadow!==!0&&this.type===di&&x(I,C),I.needsUpdate=!1}_=this.type,p.needsUpdate=!1,s.setRenderTarget(L,M,S)};function x(w,E){const C=t.update(g);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Kn(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(E,null,C,f,g,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(E,null,C,d,g,null)}function v(w,E,C,L){let M=null;const S=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(S!==void 0)M=S;else if(M=C.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const N=M.uuid,O=E.uuid;let k=c[N];k===void 0&&(k={},c[N]=k);let G=k[O];G===void 0&&(G=M.clone(),k[O]=G,E.addEventListener("dispose",T)),M=G}if(M.visible=E.visible,M.wireframe=E.wireframe,L===di?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:u[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const N=s.properties.get(M);N.light=C}return M}function y(w,E,C,L,M){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===di)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const O=t.update(w),k=w.material;if(Array.isArray(k)){const G=O.groups;for(let B=0,j=G.length;B<j;B++){const I=G[B],W=k[I.materialIndex];if(W&&W.visible){const Z=v(w,W,L,M);w.onBeforeShadow(s,w,E,C,O,Z,I),s.renderBufferDirect(C,null,O,Z,w,I),w.onAfterShadow(s,w,E,C,O,Z,I)}}}else if(k.visible){const G=v(w,k,L,M);w.onBeforeShadow(s,w,E,C,O,G,null),s.renderBufferDirect(C,null,O,G,w,null),w.onAfterShadow(s,w,E,C,O,G,null)}}const N=w.children;for(let O=0,k=N.length;O<k;O++)y(N[O],E,C,L,M)}function T(w){w.target.removeEventListener("dispose",T);for(const C in c){const L=c[C],M=w.target.uuid;M in L&&(L[M].dispose(),delete L[M])}}}const My={[ec]:nc,[ic]:oc,[sc]:ac,[fr]:rc,[nc]:ec,[oc]:ic,[ac]:sc,[rc]:fr};function Sy(s){function t(){let U=!1;const ft=new he;let $=null;const at=new he(0,0,0,0);return{setMask:function(At){$!==At&&!U&&(s.colorMask(At,At,At,At),$=At)},setLocked:function(At){U=At},setClear:function(At,Pt,Qt,Le,fn){fn===!0&&(At*=Le,Pt*=Le,Qt*=Le),ft.set(At,Pt,Qt,Le),at.equals(ft)===!1&&(s.clearColor(At,Pt,Qt,Le),at.copy(ft))},reset:function(){U=!1,$=null,at.set(-1,0,0,0)}}}function e(){let U=!1,ft=!1,$=null,at=null,At=null;return{setReversed:function(Pt){ft=Pt},setTest:function(Pt){Pt?gt(s.DEPTH_TEST):lt(s.DEPTH_TEST)},setMask:function(Pt){$!==Pt&&!U&&(s.depthMask(Pt),$=Pt)},setFunc:function(Pt){if(ft&&(Pt=My[Pt]),at!==Pt){switch(Pt){case ec:s.depthFunc(s.NEVER);break;case nc:s.depthFunc(s.ALWAYS);break;case ic:s.depthFunc(s.LESS);break;case fr:s.depthFunc(s.LEQUAL);break;case sc:s.depthFunc(s.EQUAL);break;case rc:s.depthFunc(s.GEQUAL);break;case oc:s.depthFunc(s.GREATER);break;case ac:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}at=Pt}},setLocked:function(Pt){U=Pt},setClear:function(Pt){At!==Pt&&(s.clearDepth(Pt),At=Pt)},reset:function(){U=!1,$=null,at=null,At=null}}}function n(){let U=!1,ft=null,$=null,at=null,At=null,Pt=null,Qt=null,Le=null,fn=null;return{setTest:function(ne){U||(ne?gt(s.STENCIL_TEST):lt(s.STENCIL_TEST))},setMask:function(ne){ft!==ne&&!U&&(s.stencilMask(ne),ft=ne)},setFunc:function(ne,dn,oi){($!==ne||at!==dn||At!==oi)&&(s.stencilFunc(ne,dn,oi),$=ne,at=dn,At=oi)},setOp:function(ne,dn,oi){(Pt!==ne||Qt!==dn||Le!==oi)&&(s.stencilOp(ne,dn,oi),Pt=ne,Qt=dn,Le=oi)},setLocked:function(ne){U=ne},setClear:function(ne){fn!==ne&&(s.clearStencil(ne),fn=ne)},reset:function(){U=!1,ft=null,$=null,at=null,At=null,Pt=null,Qt=null,Le=null,fn=null}}}const i=new t,r=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],d=null,m=!1,g=null,p=null,_=null,x=null,v=null,y=null,T=null,w=new Dt(0,0,0),E=0,C=!1,L=null,M=null,S=null,N=null,O=null;const k=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,B=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(j)[1]),G=B>=1):j.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),G=B>=2);let I=null,W={};const Z=s.getParameter(s.SCISSOR_BOX),st=s.getParameter(s.VIEWPORT),St=new he().fromArray(Z),Lt=new he().fromArray(st);function Y(U,ft,$,at){const At=new Uint8Array(4),Pt=s.createTexture();s.bindTexture(U,Pt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Qt=0;Qt<$;Qt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ft,0,s.RGBA,1,1,at,0,s.RGBA,s.UNSIGNED_BYTE,At):s.texImage2D(ft+Qt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,At);return Pt}const ot={};ot[s.TEXTURE_2D]=Y(s.TEXTURE_2D,s.TEXTURE_2D,1),ot[s.TEXTURE_CUBE_MAP]=Y(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[s.TEXTURE_2D_ARRAY]=Y(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ot[s.TEXTURE_3D]=Y(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),gt(s.DEPTH_TEST),r.setFunc(fr),pt(!1),ht(pu),gt(s.CULL_FACE),D(xi);function gt(U){c[U]!==!0&&(s.enable(U),c[U]=!0)}function lt(U){c[U]!==!1&&(s.disable(U),c[U]=!1)}function bt(U,ft){return h[U]!==ft?(s.bindFramebuffer(U,ft),h[U]=ft,U===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ft),U===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ft),!0):!1}function wt(U,ft){let $=f,at=!1;if(U){$=u.get(ft),$===void 0&&($=[],u.set(ft,$));const At=U.textures;if($.length!==At.length||$[0]!==s.COLOR_ATTACHMENT0){for(let Pt=0,Qt=At.length;Pt<Qt;Pt++)$[Pt]=s.COLOR_ATTACHMENT0+Pt;$.length=At.length,at=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,at=!0);at&&s.drawBuffers($)}function Vt(U){return d!==U?(s.useProgram(U),d=U,!0):!1}const Wt={[ls]:s.FUNC_ADD,[Pm]:s.FUNC_SUBTRACT,[Dm]:s.FUNC_REVERSE_SUBTRACT};Wt[Lm]=s.MIN,Wt[Im]=s.MAX;const et={[Um]:s.ZERO,[Nm]:s.ONE,[Om]:s.SRC_COLOR,[Ql]:s.SRC_ALPHA,[Vm]:s.SRC_ALPHA_SATURATE,[km]:s.DST_COLOR,[Bm]:s.DST_ALPHA,[Fm]:s.ONE_MINUS_SRC_COLOR,[tc]:s.ONE_MINUS_SRC_ALPHA,[Hm]:s.ONE_MINUS_DST_COLOR,[zm]:s.ONE_MINUS_DST_ALPHA,[Gm]:s.CONSTANT_COLOR,[Wm]:s.ONE_MINUS_CONSTANT_COLOR,[Xm]:s.CONSTANT_ALPHA,[Ym]:s.ONE_MINUS_CONSTANT_ALPHA};function D(U,ft,$,at,At,Pt,Qt,Le,fn,ne){if(U===xi){m===!0&&(lt(s.BLEND),m=!1);return}if(m===!1&&(gt(s.BLEND),m=!0),U!==Rm){if(U!==g||ne!==C){if((p!==ls||v!==ls)&&(s.blendEquation(s.FUNC_ADD),p=ls,v=ls),ne)switch(U){case rr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bi:s.blendFunc(s.ONE,s.ONE);break;case mu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case _u:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case rr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Bi:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case mu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case _u:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,x=null,y=null,T=null,w.set(0,0,0),E=0,g=U,C=ne}return}At=At||ft,Pt=Pt||$,Qt=Qt||at,(ft!==p||At!==v)&&(s.blendEquationSeparate(Wt[ft],Wt[At]),p=ft,v=At),($!==_||at!==x||Pt!==y||Qt!==T)&&(s.blendFuncSeparate(et[$],et[at],et[Pt],et[Qt]),_=$,x=at,y=Pt,T=Qt),(Le.equals(w)===!1||fn!==E)&&(s.blendColor(Le.r,Le.g,Le.b,fn),w.copy(Le),E=fn),g=U,C=!1}function _t(U,ft){U.side===xe?lt(s.CULL_FACE):gt(s.CULL_FACE);let $=U.side===nn;ft&&($=!$),pt($),U.blending===rr&&U.transparent===!1?D(xi):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),i.setMask(U.colorWrite);const at=U.stencilWrite;o.setTest(at),at&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ft(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?gt(s.SAMPLE_ALPHA_TO_COVERAGE):lt(s.SAMPLE_ALPHA_TO_COVERAGE)}function pt(U){L!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),L=U)}function ht(U){U!==Am?(gt(s.CULL_FACE),U!==M&&(U===pu?s.cullFace(s.BACK):U===Cm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):lt(s.CULL_FACE),M=U}function vt(U){U!==S&&(G&&s.lineWidth(U),S=U)}function Ft(U,ft,$){U?(gt(s.POLYGON_OFFSET_FILL),(N!==ft||O!==$)&&(s.polygonOffset(ft,$),N=ft,O=$)):lt(s.POLYGON_OFFSET_FILL)}function Tt(U){U?gt(s.SCISSOR_TEST):lt(s.SCISSOR_TEST)}function R(U){U===void 0&&(U=s.TEXTURE0+k-1),I!==U&&(s.activeTexture(U),I=U)}function b(U,ft,$){$===void 0&&(I===null?$=s.TEXTURE0+k-1:$=I);let at=W[$];at===void 0&&(at={type:void 0,texture:void 0},W[$]=at),(at.type!==U||at.texture!==ft)&&(I!==$&&(s.activeTexture($),I=$),s.bindTexture(U,ft||ot[U]),at.type=U,at.texture=ft)}function V(){const U=W[I];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function tt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function rt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function H(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(U){St.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),St.copy(U))}function ut(U){Lt.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Lt.copy(U))}function Xt(U,ft){let $=l.get(ft);$===void 0&&($=new WeakMap,l.set(ft,$));let at=$.get(U);at===void 0&&(at=s.getUniformBlockIndex(ft,U.name),$.set(U,at))}function yt(U,ft){const at=l.get(ft).get(U);a.get(ft)!==at&&(s.uniformBlockBinding(ft,at,U.__bindingPointIndex),a.set(ft,at))}function $t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},I=null,W={},h={},u=new WeakMap,f=[],d=null,m=!1,g=null,p=null,_=null,x=null,v=null,y=null,T=null,w=new Dt(0,0,0),E=0,C=!1,L=null,M=null,S=null,N=null,O=null,St.set(0,0,s.canvas.width,s.canvas.height),Lt.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:gt,disable:lt,bindFramebuffer:bt,drawBuffers:wt,useProgram:Vt,setBlending:D,setMaterial:_t,setFlipSided:pt,setCullFace:ht,setLineWidth:vt,setPolygonOffset:Ft,setScissorTest:Tt,activeTexture:R,bindTexture:b,unbindTexture:V,compressedTexImage2D:tt,compressedTexImage3D:rt,texImage2D:nt,texImage3D:mt,updateUBOMapping:Xt,uniformBlockBinding:yt,texStorage2D:ct,texStorage3D:H,texSubImage2D:Q,texSubImage3D:It,compressedTexSubImage2D:xt,compressedTexSubImage3D:K,scissor:Et,viewport:ut,reset:$t}}function of(s,t,e,n){const i=wy(n);switch(e){case xd:return s*t;case Md:return s*t;case Sd:return s*t*2;case gh:return s*t/i.components*i.byteLength;case vh:return s*t/i.components*i.byteLength;case wd:return s*t*2/i.components*i.byteLength;case xh:return s*t*2/i.components*i.byteLength;case yd:return s*t*3/i.components*i.byteLength;case jn:return s*t*4/i.components*i.byteLength;case yh:return s*t*4/i.components*i.byteLength;case oa:case aa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case la:case ca:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fc:case pc:return Math.max(s,16)*Math.max(t,8)/4;case uc:case dc:return Math.max(s,8)*Math.max(t,8)/2;case mc:case _c:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case gc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case yc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Sc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case wc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case bc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Tc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ac:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Cc:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Rc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Pc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Dc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ha:case Lc:case Ic:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Ed:case Uc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Nc:case Oc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wy(s){switch(s){case Mi:case _d:return{byteLength:1,components:1};case so:case gd:case yi:return{byteLength:2,components:1};case mh:case _h:return{byteLength:2,components:4};case ys:case ph:case Qn:return{byteLength:4,components:1};case vd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Ey(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new J,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,b){return d?new OffscreenCanvas(R,b):Ma("canvas")}function g(R,b,V){let tt=1;const rt=Tt(R);if((rt.width>V||rt.height>V)&&(tt=V/Math.max(rt.width,rt.height)),tt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Q=Math.floor(tt*rt.width),It=Math.floor(tt*rt.height);u===void 0&&(u=m(Q,It));const xt=b?m(Q,It):u;return xt.width=Q,xt.height=It,xt.getContext("2d").drawImage(R,0,0,Q,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+Q+"x"+It+")."),xt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==un&&R.minFilter!==Yn}function _(R){s.generateMipmap(R)}function x(R,b,V,tt,rt=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Q=b;if(b===s.RED&&(V===s.FLOAT&&(Q=s.R32F),V===s.HALF_FLOAT&&(Q=s.R16F),V===s.UNSIGNED_BYTE&&(Q=s.R8)),b===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.R8UI),V===s.UNSIGNED_SHORT&&(Q=s.R16UI),V===s.UNSIGNED_INT&&(Q=s.R32UI),V===s.BYTE&&(Q=s.R8I),V===s.SHORT&&(Q=s.R16I),V===s.INT&&(Q=s.R32I)),b===s.RG&&(V===s.FLOAT&&(Q=s.RG32F),V===s.HALF_FLOAT&&(Q=s.RG16F),V===s.UNSIGNED_BYTE&&(Q=s.RG8)),b===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RG8UI),V===s.UNSIGNED_SHORT&&(Q=s.RG16UI),V===s.UNSIGNED_INT&&(Q=s.RG32UI),V===s.BYTE&&(Q=s.RG8I),V===s.SHORT&&(Q=s.RG16I),V===s.INT&&(Q=s.RG32I)),b===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),V===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),V===s.UNSIGNED_INT&&(Q=s.RGB32UI),V===s.BYTE&&(Q=s.RGB8I),V===s.SHORT&&(Q=s.RGB16I),V===s.INT&&(Q=s.RGB32I)),b===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),V===s.UNSIGNED_INT&&(Q=s.RGBA32UI),V===s.BYTE&&(Q=s.RGBA8I),V===s.SHORT&&(Q=s.RGBA16I),V===s.INT&&(Q=s.RGBA32I)),b===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),b===s.RGBA){const It=rt?ga:ie.getTransfer(tt);V===s.FLOAT&&(Q=s.RGBA32F),V===s.HALF_FLOAT&&(Q=s.RGBA16F),V===s.UNSIGNED_BYTE&&(Q=It===pe?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function v(R,b){let V;return R?b===null||b===ys||b===mr?V=s.DEPTH24_STENCIL8:b===Qn?V=s.DEPTH32F_STENCIL8:b===so&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ys||b===mr?V=s.DEPTH_COMPONENT24:b===Qn?V=s.DEPTH_COMPONENT32F:b===so&&(V=s.DEPTH_COMPONENT16),V}function y(R,b){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==un&&R.minFilter!==Yn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function T(R){const b=R.target;b.removeEventListener("dispose",T),E(b),b.isVideoTexture&&h.delete(b)}function w(R){const b=R.target;b.removeEventListener("dispose",w),L(b)}function E(R){const b=n.get(R);if(b.__webglInit===void 0)return;const V=R.source,tt=f.get(V);if(tt){const rt=tt[b.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&C(R),Object.keys(tt).length===0&&f.delete(V)}n.remove(R)}function C(R){const b=n.get(R);s.deleteTexture(b.__webglTexture);const V=R.source,tt=f.get(V);delete tt[b.__cacheKey],o.memory.textures--}function L(R){const b=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(b.__webglFramebuffer[tt]))for(let rt=0;rt<b.__webglFramebuffer[tt].length;rt++)s.deleteFramebuffer(b.__webglFramebuffer[tt][rt]);else s.deleteFramebuffer(b.__webglFramebuffer[tt]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[tt])}else{if(Array.isArray(b.__webglFramebuffer))for(let tt=0;tt<b.__webglFramebuffer.length;tt++)s.deleteFramebuffer(b.__webglFramebuffer[tt]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let tt=0;tt<b.__webglColorRenderbuffer.length;tt++)b.__webglColorRenderbuffer[tt]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[tt]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=R.textures;for(let tt=0,rt=V.length;tt<rt;tt++){const Q=n.get(V[tt]);Q.__webglTexture&&(s.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(V[tt])}n.remove(R)}let M=0;function S(){M=0}function N(){const R=M;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),M+=1,R}function O(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function k(R,b){const V=n.get(R);if(R.isVideoTexture&&vt(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const tt=R.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Lt(V,R,b);return}}e.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+b)}function G(R,b){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Lt(V,R,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+b)}function B(R,b){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Lt(V,R,b);return}e.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+b)}function j(R,b){const V=n.get(R);if(R.version>0&&V.__version!==R.version){Y(V,R,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+b)}const I={[_a]:s.REPEAT,[hs]:s.CLAMP_TO_EDGE,[hc]:s.MIRRORED_REPEAT},W={[un]:s.NEAREST,[$m]:s.NEAREST_MIPMAP_NEAREST,[Eo]:s.NEAREST_MIPMAP_LINEAR,[Yn]:s.LINEAR,[rl]:s.LINEAR_MIPMAP_NEAREST,[us]:s.LINEAR_MIPMAP_LINEAR},Z={[t0]:s.NEVER,[o0]:s.ALWAYS,[e0]:s.LESS,[Td]:s.LEQUAL,[n0]:s.EQUAL,[r0]:s.GEQUAL,[i0]:s.GREATER,[s0]:s.NOTEQUAL};function st(R,b){if(b.type===Qn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Yn||b.magFilter===rl||b.magFilter===Eo||b.magFilter===us||b.minFilter===Yn||b.minFilter===rl||b.minFilter===Eo||b.minFilter===us)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,I[b.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,I[b.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,I[b.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,W[b.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,W[b.minFilter]),b.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Z[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===un||b.minFilter!==Eo&&b.minFilter!==us||b.type===Qn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function St(R,b){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",T));const tt=b.source;let rt=f.get(tt);rt===void 0&&(rt={},f.set(tt,rt));const Q=O(b);if(Q!==R.__cacheKey){rt[Q]===void 0&&(rt[Q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,V=!0),rt[Q].usedTimes++;const It=rt[R.__cacheKey];It!==void 0&&(rt[R.__cacheKey].usedTimes--,It.usedTimes===0&&C(b)),R.__cacheKey=Q,R.__webglTexture=rt[Q].texture}return V}function Lt(R,b,V){let tt=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(tt=s.TEXTURE_3D);const rt=St(R,b),Q=b.source;e.bindTexture(tt,R.__webglTexture,s.TEXTURE0+V);const It=n.get(Q);if(Q.version!==It.__version||rt===!0){e.activeTexture(s.TEXTURE0+V);const xt=ie.getPrimaries(ie.workingColorSpace),K=b.colorSpace===Ui?null:ie.getPrimaries(b.colorSpace),ct=b.colorSpace===Ui||xt===K?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let H=g(b.image,!1,i.maxTextureSize);H=Ft(b,H);const nt=r.convert(b.format,b.colorSpace),mt=r.convert(b.type);let Et=x(b.internalFormat,nt,mt,b.colorSpace,b.isVideoTexture);st(tt,b);let ut;const Xt=b.mipmaps,yt=b.isVideoTexture!==!0,$t=It.__version===void 0||rt===!0,U=Q.dataReady,ft=y(b,H);if(b.isDepthTexture)Et=v(b.format===_r,b.type),$t&&(yt?e.texStorage2D(s.TEXTURE_2D,1,Et,H.width,H.height):e.texImage2D(s.TEXTURE_2D,0,Et,H.width,H.height,0,nt,mt,null));else if(b.isDataTexture)if(Xt.length>0){yt&&$t&&e.texStorage2D(s.TEXTURE_2D,ft,Et,Xt[0].width,Xt[0].height);for(let $=0,at=Xt.length;$<at;$++)ut=Xt[$],yt?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,ut.width,ut.height,nt,mt,ut.data):e.texImage2D(s.TEXTURE_2D,$,Et,ut.width,ut.height,0,nt,mt,ut.data);b.generateMipmaps=!1}else yt?($t&&e.texStorage2D(s.TEXTURE_2D,ft,Et,H.width,H.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,H.width,H.height,nt,mt,H.data)):e.texImage2D(s.TEXTURE_2D,0,Et,H.width,H.height,0,nt,mt,H.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){yt&&$t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,Et,Xt[0].width,Xt[0].height,H.depth);for(let $=0,at=Xt.length;$<at;$++)if(ut=Xt[$],b.format!==jn)if(nt!==null)if(yt){if(U)if(b.layerUpdates.size>0){const At=of(ut.width,ut.height,b.format,b.type);for(const Pt of b.layerUpdates){const Qt=ut.data.subarray(Pt*At/ut.data.BYTES_PER_ELEMENT,(Pt+1)*At/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,Pt,ut.width,ut.height,1,nt,Qt,0,0)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,ut.width,ut.height,H.depth,nt,ut.data,0,0)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,Et,ut.width,ut.height,H.depth,0,ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else yt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,ut.width,ut.height,H.depth,nt,mt,ut.data):e.texImage3D(s.TEXTURE_2D_ARRAY,$,Et,ut.width,ut.height,H.depth,0,nt,mt,ut.data)}else{yt&&$t&&e.texStorage2D(s.TEXTURE_2D,ft,Et,Xt[0].width,Xt[0].height);for(let $=0,at=Xt.length;$<at;$++)ut=Xt[$],b.format!==jn?nt!==null?yt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,ut.width,ut.height,nt,ut.data):e.compressedTexImage2D(s.TEXTURE_2D,$,Et,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):yt?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,ut.width,ut.height,nt,mt,ut.data):e.texImage2D(s.TEXTURE_2D,$,Et,ut.width,ut.height,0,nt,mt,ut.data)}else if(b.isDataArrayTexture)if(yt){if($t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,Et,H.width,H.height,H.depth),U)if(b.layerUpdates.size>0){const $=of(H.width,H.height,b.format,b.type);for(const at of b.layerUpdates){const At=H.data.subarray(at*$/H.data.BYTES_PER_ELEMENT,(at+1)*$/H.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,at,H.width,H.height,1,nt,mt,At)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,nt,mt,H.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,H.width,H.height,H.depth,0,nt,mt,H.data);else if(b.isData3DTexture)yt?($t&&e.texStorage3D(s.TEXTURE_3D,ft,Et,H.width,H.height,H.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,nt,mt,H.data)):e.texImage3D(s.TEXTURE_3D,0,Et,H.width,H.height,H.depth,0,nt,mt,H.data);else if(b.isFramebufferTexture){if($t)if(yt)e.texStorage2D(s.TEXTURE_2D,ft,Et,H.width,H.height);else{let $=H.width,at=H.height;for(let At=0;At<ft;At++)e.texImage2D(s.TEXTURE_2D,At,Et,$,at,0,nt,mt,null),$>>=1,at>>=1}}else if(Xt.length>0){if(yt&&$t){const $=Tt(Xt[0]);e.texStorage2D(s.TEXTURE_2D,ft,Et,$.width,$.height)}for(let $=0,at=Xt.length;$<at;$++)ut=Xt[$],yt?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,nt,mt,ut):e.texImage2D(s.TEXTURE_2D,$,Et,nt,mt,ut);b.generateMipmaps=!1}else if(yt){if($t){const $=Tt(H);e.texStorage2D(s.TEXTURE_2D,ft,Et,$.width,$.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt,mt,H)}else e.texImage2D(s.TEXTURE_2D,0,Et,nt,mt,H);p(b)&&_(tt),It.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Y(R,b,V){if(b.image.length!==6)return;const tt=St(R,b),rt=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+V);const Q=n.get(rt);if(rt.version!==Q.__version||tt===!0){e.activeTexture(s.TEXTURE0+V);const It=ie.getPrimaries(ie.workingColorSpace),xt=b.colorSpace===Ui?null:ie.getPrimaries(b.colorSpace),K=b.colorSpace===Ui||It===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const ct=b.isCompressedTexture||b.image[0].isCompressedTexture,H=b.image[0]&&b.image[0].isDataTexture,nt=[];for(let at=0;at<6;at++)!ct&&!H?nt[at]=g(b.image[at],!0,i.maxCubemapSize):nt[at]=H?b.image[at].image:b.image[at],nt[at]=Ft(b,nt[at]);const mt=nt[0],Et=r.convert(b.format,b.colorSpace),ut=r.convert(b.type),Xt=x(b.internalFormat,Et,ut,b.colorSpace),yt=b.isVideoTexture!==!0,$t=Q.__version===void 0||tt===!0,U=rt.dataReady;let ft=y(b,mt);st(s.TEXTURE_CUBE_MAP,b);let $;if(ct){yt&&$t&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Xt,mt.width,mt.height);for(let at=0;at<6;at++){$=nt[at].mipmaps;for(let At=0;At<$.length;At++){const Pt=$[At];b.format!==jn?Et!==null?yt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,0,0,Pt.width,Pt.height,Et,Pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,Xt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,0,0,Pt.width,Pt.height,Et,ut,Pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,Xt,Pt.width,Pt.height,0,Et,ut,Pt.data)}}}else{if($=b.mipmaps,yt&&$t){$.length>0&&ft++;const at=Tt(nt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Xt,at.width,at.height)}for(let at=0;at<6;at++)if(H){yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,nt[at].width,nt[at].height,Et,ut,nt[at].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Xt,nt[at].width,nt[at].height,0,Et,ut,nt[at].data);for(let At=0;At<$.length;At++){const Qt=$[At].image[at].image;yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,0,0,Qt.width,Qt.height,Et,ut,Qt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,Xt,Qt.width,Qt.height,0,Et,ut,Qt.data)}}else{yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Et,ut,nt[at]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Xt,Et,ut,nt[at]);for(let At=0;At<$.length;At++){const Pt=$[At];yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,0,0,Et,ut,Pt.image[at]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,Xt,Et,ut,Pt.image[at])}}}p(b)&&_(s.TEXTURE_CUBE_MAP),Q.__version=rt.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ot(R,b,V,tt,rt,Q){const It=r.convert(V.format,V.colorSpace),xt=r.convert(V.type),K=x(V.internalFormat,It,xt,V.colorSpace);if(!n.get(b).__hasExternalTextures){const H=Math.max(1,b.width>>Q),nt=Math.max(1,b.height>>Q);rt===s.TEXTURE_3D||rt===s.TEXTURE_2D_ARRAY?e.texImage3D(rt,Q,K,H,nt,b.depth,0,It,xt,null):e.texImage2D(rt,Q,K,H,nt,0,It,xt,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),ht(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,rt,n.get(V).__webglTexture,0,pt(b)):(rt===s.TEXTURE_2D||rt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,rt,n.get(V).__webglTexture,Q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function gt(R,b,V){if(s.bindRenderbuffer(s.RENDERBUFFER,R),b.depthBuffer){const tt=b.depthTexture,rt=tt&&tt.isDepthTexture?tt.type:null,Q=v(b.stencilBuffer,rt),It=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=pt(b);ht(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xt,Q,b.width,b.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,xt,Q,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Q,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,It,s.RENDERBUFFER,R)}else{const tt=b.textures;for(let rt=0;rt<tt.length;rt++){const Q=tt[rt],It=r.convert(Q.format,Q.colorSpace),xt=r.convert(Q.type),K=x(Q.internalFormat,It,xt,Q.colorSpace),ct=pt(b);V&&ht(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ct,K,b.width,b.height):ht(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ct,K,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,K,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function lt(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),k(b.depthTexture,0);const tt=n.get(b.depthTexture).__webglTexture,rt=pt(b);if(b.depthTexture.format===or)ht(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(b.depthTexture.format===_r)ht(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function bt(R){const b=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const tt=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),tt){const rt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,tt.removeEventListener("dispose",rt)};tt.addEventListener("dispose",rt),b.__depthDisposeCallback=rt}b.__boundDepthTexture=tt}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");lt(b.__webglFramebuffer,R)}else if(V){b.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[tt]),b.__webglDepthbuffer[tt]===void 0)b.__webglDepthbuffer[tt]=s.createRenderbuffer(),gt(b.__webglDepthbuffer[tt],R,!1);else{const rt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,rt,s.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),gt(b.__webglDepthbuffer,R,!1);else{const tt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,rt),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,rt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function wt(R,b,V){const tt=n.get(R);b!==void 0&&ot(tt.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&bt(R)}function Vt(R){const b=R.texture,V=n.get(R),tt=n.get(b);R.addEventListener("dispose",w);const rt=R.textures,Q=R.isWebGLCubeRenderTarget===!0,It=rt.length>1;if(It||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=b.version,o.memory.textures++),Q){V.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[xt]=[];for(let K=0;K<b.mipmaps.length;K++)V.__webglFramebuffer[xt][K]=s.createFramebuffer()}else V.__webglFramebuffer[xt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let xt=0;xt<b.mipmaps.length;xt++)V.__webglFramebuffer[xt]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(It)for(let xt=0,K=rt.length;xt<K;xt++){const ct=n.get(rt[xt]);ct.__webglTexture===void 0&&(ct.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&ht(R)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let xt=0;xt<rt.length;xt++){const K=rt[xt];V.__webglColorRenderbuffer[xt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[xt]);const ct=r.convert(K.format,K.colorSpace),H=r.convert(K.type),nt=x(K.internalFormat,ct,H,K.colorSpace,R.isXRRenderTarget===!0),mt=pt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,mt,nt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,V.__webglColorRenderbuffer[xt])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),gt(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Q){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),st(s.TEXTURE_CUBE_MAP,b);for(let xt=0;xt<6;xt++)if(b.mipmaps&&b.mipmaps.length>0)for(let K=0;K<b.mipmaps.length;K++)ot(V.__webglFramebuffer[xt][K],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,K);else ot(V.__webglFramebuffer[xt],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);p(b)&&_(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let xt=0,K=rt.length;xt<K;xt++){const ct=rt[xt],H=n.get(ct);e.bindTexture(s.TEXTURE_2D,H.__webglTexture),st(s.TEXTURE_2D,ct),ot(V.__webglFramebuffer,R,ct,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,0),p(ct)&&_(s.TEXTURE_2D)}e.unbindTexture()}else{let xt=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(xt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(xt,tt.__webglTexture),st(xt,b),b.mipmaps&&b.mipmaps.length>0)for(let K=0;K<b.mipmaps.length;K++)ot(V.__webglFramebuffer[K],R,b,s.COLOR_ATTACHMENT0,xt,K);else ot(V.__webglFramebuffer,R,b,s.COLOR_ATTACHMENT0,xt,0);p(b)&&_(xt),e.unbindTexture()}R.depthBuffer&&bt(R)}function Wt(R){const b=R.textures;for(let V=0,tt=b.length;V<tt;V++){const rt=b[V];if(p(rt)){const Q=R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,It=n.get(rt).__webglTexture;e.bindTexture(Q,It),_(Q),e.unbindTexture()}}}const et=[],D=[];function _t(R){if(R.samples>0){if(ht(R)===!1){const b=R.textures,V=R.width,tt=R.height;let rt=s.COLOR_BUFFER_BIT;const Q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,It=n.get(R),xt=b.length>1;if(xt)for(let K=0;K<b.length;K++)e.bindFramebuffer(s.FRAMEBUFFER,It.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,It.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let K=0;K<b.length;K++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(rt|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(rt|=s.STENCIL_BUFFER_BIT)),xt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,It.__webglColorRenderbuffer[K]);const ct=n.get(b[K]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ct,0)}s.blitFramebuffer(0,0,V,tt,0,0,V,tt,rt,s.NEAREST),l===!0&&(et.length=0,D.length=0,et.push(s.COLOR_ATTACHMENT0+K),R.depthBuffer&&R.resolveDepthBuffer===!1&&(et.push(Q),D.push(Q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),xt)for(let K=0;K<b.length;K++){e.bindFramebuffer(s.FRAMEBUFFER,It.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.RENDERBUFFER,It.__webglColorRenderbuffer[K]);const ct=n.get(b[K]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,It.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+K,s.TEXTURE_2D,ct,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function pt(R){return Math.min(i.maxSamples,R.samples)}function ht(R){const b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function vt(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function Ft(R,b){const V=R.colorSpace,tt=R.format,rt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==qi&&V!==Ui&&(ie.getTransfer(V)===pe?(tt!==jn||rt!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function Tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=S,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=B,this.setTextureCube=j,this.rebindTextures=wt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=bt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=ht}function by(s,t){function e(n,i=Ui){let r;const o=ie.getTransfer(i);if(n===Mi)return s.UNSIGNED_BYTE;if(n===mh)return s.UNSIGNED_SHORT_4_4_4_4;if(n===_h)return s.UNSIGNED_SHORT_5_5_5_1;if(n===vd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===_d)return s.BYTE;if(n===gd)return s.SHORT;if(n===so)return s.UNSIGNED_SHORT;if(n===ph)return s.INT;if(n===ys)return s.UNSIGNED_INT;if(n===Qn)return s.FLOAT;if(n===yi)return s.HALF_FLOAT;if(n===xd)return s.ALPHA;if(n===yd)return s.RGB;if(n===jn)return s.RGBA;if(n===Md)return s.LUMINANCE;if(n===Sd)return s.LUMINANCE_ALPHA;if(n===or)return s.DEPTH_COMPONENT;if(n===_r)return s.DEPTH_STENCIL;if(n===gh)return s.RED;if(n===vh)return s.RED_INTEGER;if(n===wd)return s.RG;if(n===xh)return s.RG_INTEGER;if(n===yh)return s.RGBA_INTEGER;if(n===oa||n===aa||n===la||n===ca)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===oa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===oa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uc||n===fc||n===dc||n===pc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===uc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mc||n===_c||n===gc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===mc||n===_c)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===gc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vc||n===xc||n===yc||n===Mc||n===Sc||n===wc||n===Ec||n===bc||n===Tc||n===Ac||n===Cc||n===Rc||n===Pc||n===Dc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Mc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ec)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Tc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ac)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Dc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ha||n===Lc||n===Ic)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ha)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ed||n===Uc||n===Nc||n===Oc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ha)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Ty extends An{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ee extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ay={type:"move"};class Il{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,n),_=this._getHandJoint(c,g);p!==null&&(_.matrix.fromArray(p.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=p.radius),_.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ay)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ee;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Cy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ry=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Py{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new sn,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ze({vertexShader:Cy,fragmentShader:Ry,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new it(new Fe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dy extends Es{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null;const g=new Py,p=e.getContextAttributes();let _=null,x=null;const v=[],y=[],T=new J;let w=null;const E=new An;E.layers.enable(1),E.viewport=new he;const C=new An;C.layers.enable(2),C.viewport=new he;const L=[E,C],M=new Ty;M.layers.enable(1),M.layers.enable(2);let S=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ot=v[Y];return ot===void 0&&(ot=new Il,v[Y]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Y){let ot=v[Y];return ot===void 0&&(ot=new Il,v[Y]=ot),ot.getGripSpace()},this.getHand=function(Y){let ot=v[Y];return ot===void 0&&(ot=new Il,v[Y]=ot),ot.getHandSpace()};function O(Y){const ot=y.indexOf(Y.inputSource);if(ot===-1)return;const gt=v[ot];gt!==void 0&&(gt.update(Y.inputSource,Y.frame,c||o),gt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",G);for(let Y=0;Y<v.length;Y++){const ot=y[Y];ot!==null&&(y[Y]=null,v[Y].disconnect(ot))}S=null,N=null,g.reset(),t.setRenderTarget(_),d=null,f=null,u=null,i=null,x=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(_=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",k),i.addEventListener("inputsourceschange",G),p.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(T),i.renderState.layers===void 0){const ot={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Kn(d.framebufferWidth,d.framebufferHeight,{format:jn,type:Mi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let ot=null,gt=null,lt=null;p.depth&&(lt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=p.stencil?_r:or,gt=p.stencil?mr:ys);const bt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(bt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Kn(f.textureWidth,f.textureHeight,{format:jn,type:Mi,depthTexture:new Fd(f.textureWidth,f.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Lt.setContext(i),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(Y){for(let ot=0;ot<Y.removed.length;ot++){const gt=Y.removed[ot],lt=y.indexOf(gt);lt>=0&&(y[lt]=null,v[lt].disconnect(gt))}for(let ot=0;ot<Y.added.length;ot++){const gt=Y.added[ot];let lt=y.indexOf(gt);if(lt===-1){for(let wt=0;wt<v.length;wt++)if(wt>=y.length){y.push(gt),lt=wt;break}else if(y[wt]===null){y[wt]=gt,lt=wt;break}if(lt===-1)break}const bt=v[lt];bt&&bt.connect(gt)}}const B=new P,j=new P;function I(Y,ot,gt){B.setFromMatrixPosition(ot.matrixWorld),j.setFromMatrixPosition(gt.matrixWorld);const lt=B.distanceTo(j),bt=ot.projectionMatrix.elements,wt=gt.projectionMatrix.elements,Vt=bt[14]/(bt[10]-1),Wt=bt[14]/(bt[10]+1),et=(bt[9]+1)/bt[5],D=(bt[9]-1)/bt[5],_t=(bt[8]-1)/bt[0],pt=(wt[8]+1)/wt[0],ht=Vt*_t,vt=Vt*pt,Ft=lt/(-_t+pt),Tt=Ft*-_t;if(ot.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Tt),Y.translateZ(Ft),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),bt[10]===-1)Y.projectionMatrix.copy(ot.projectionMatrix),Y.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const R=Vt+Ft,b=Wt+Ft,V=ht-Tt,tt=vt+(lt-Tt),rt=et*Wt/b*R,Q=D*Wt/b*R;Y.projectionMatrix.makePerspective(V,tt,rt,Q,R,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function W(Y,ot){ot===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ot.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let ot=Y.near,gt=Y.far;g.texture!==null&&(g.depthNear>0&&(ot=g.depthNear),g.depthFar>0&&(gt=g.depthFar)),M.near=C.near=E.near=ot,M.far=C.far=E.far=gt,(S!==M.near||N!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),S=M.near,N=M.far);const lt=Y.parent,bt=M.cameras;W(M,lt);for(let wt=0;wt<bt.length;wt++)W(bt[wt],lt);bt.length===2?I(M,E,C):M.projectionMatrix.copy(E.projectionMatrix),Z(Y,M,lt)};function Z(Y,ot,gt){gt===null?Y.matrix.copy(ot.matrixWorld):(Y.matrix.copy(gt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ot.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ot.projectionMatrix),Y.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ro*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let st=null;function St(Y,ot){if(h=ot.getViewerPose(c||o),m=ot,h!==null){const gt=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let lt=!1;gt.length!==M.cameras.length&&(M.cameras.length=0,lt=!0);for(let wt=0;wt<gt.length;wt++){const Vt=gt[wt];let Wt=null;if(d!==null)Wt=d.getViewport(Vt);else{const D=u.getViewSubImage(f,Vt);Wt=D.viewport,wt===0&&(t.setRenderTargetTextures(x,D.colorTexture,f.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(x))}let et=L[wt];et===void 0&&(et=new An,et.layers.enable(wt),et.viewport=new he,L[wt]=et),et.matrix.fromArray(Vt.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(Vt.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),wt===0&&(M.matrix.copy(et.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),lt===!0&&M.cameras.push(et)}const bt=i.enabledFeatures;if(bt&&bt.includes("depth-sensing")){const wt=u.getDepthInformation(gt[0]);wt&&wt.isValid&&wt.texture&&g.init(t,wt,i.renderState)}}for(let gt=0;gt<v.length;gt++){const lt=y[gt],bt=v[gt];lt!==null&&bt!==void 0&&bt.update(lt,ot,c||o)}st&&st(Y,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),m=null}const Lt=new Od;Lt.setAnimationLoop(St),this.setAnimationLoop=function(Y){st=Y},this.dispose=function(){}}}const is=new xn,Ly=new Zt;function Iy(s,t){function e(p,_){p.matrixAutoUpdate===!0&&p.updateMatrix(),_.value.copy(p.matrix)}function n(p,_){_.color.getRGB(p.fogColor.value,Id(s)),_.isFog?(p.fogNear.value=_.near,p.fogFar.value=_.far):_.isFogExp2&&(p.fogDensity.value=_.density)}function i(p,_,x,v,y){_.isMeshBasicMaterial||_.isMeshLambertMaterial?r(p,_):_.isMeshToonMaterial?(r(p,_),u(p,_)):_.isMeshPhongMaterial?(r(p,_),h(p,_)):_.isMeshStandardMaterial?(r(p,_),f(p,_),_.isMeshPhysicalMaterial&&d(p,_,y)):_.isMeshMatcapMaterial?(r(p,_),m(p,_)):_.isMeshDepthMaterial?r(p,_):_.isMeshDistanceMaterial?(r(p,_),g(p,_)):_.isMeshNormalMaterial?r(p,_):_.isLineBasicMaterial?(o(p,_),_.isLineDashedMaterial&&a(p,_)):_.isPointsMaterial?l(p,_,x,v):_.isSpriteMaterial?c(p,_):_.isShadowMaterial?(p.color.value.copy(_.color),p.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function r(p,_){p.opacity.value=_.opacity,_.color&&p.diffuse.value.copy(_.color),_.emissive&&p.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(p.map.value=_.map,e(_.map,p.mapTransform)),_.alphaMap&&(p.alphaMap.value=_.alphaMap,e(_.alphaMap,p.alphaMapTransform)),_.bumpMap&&(p.bumpMap.value=_.bumpMap,e(_.bumpMap,p.bumpMapTransform),p.bumpScale.value=_.bumpScale,_.side===nn&&(p.bumpScale.value*=-1)),_.normalMap&&(p.normalMap.value=_.normalMap,e(_.normalMap,p.normalMapTransform),p.normalScale.value.copy(_.normalScale),_.side===nn&&p.normalScale.value.negate()),_.displacementMap&&(p.displacementMap.value=_.displacementMap,e(_.displacementMap,p.displacementMapTransform),p.displacementScale.value=_.displacementScale,p.displacementBias.value=_.displacementBias),_.emissiveMap&&(p.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,p.emissiveMapTransform)),_.specularMap&&(p.specularMap.value=_.specularMap,e(_.specularMap,p.specularMapTransform)),_.alphaTest>0&&(p.alphaTest.value=_.alphaTest);const x=t.get(_),v=x.envMap,y=x.envMapRotation;v&&(p.envMap.value=v,is.copy(y),is.x*=-1,is.y*=-1,is.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),p.envMapRotation.value.setFromMatrix4(Ly.makeRotationFromEuler(is)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=_.reflectivity,p.ior.value=_.ior,p.refractionRatio.value=_.refractionRatio),_.lightMap&&(p.lightMap.value=_.lightMap,p.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,p.lightMapTransform)),_.aoMap&&(p.aoMap.value=_.aoMap,p.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,p.aoMapTransform))}function o(p,_){p.diffuse.value.copy(_.color),p.opacity.value=_.opacity,_.map&&(p.map.value=_.map,e(_.map,p.mapTransform))}function a(p,_){p.dashSize.value=_.dashSize,p.totalSize.value=_.dashSize+_.gapSize,p.scale.value=_.scale}function l(p,_,x,v){p.diffuse.value.copy(_.color),p.opacity.value=_.opacity,p.size.value=_.size*x,p.scale.value=v*.5,_.map&&(p.map.value=_.map,e(_.map,p.uvTransform)),_.alphaMap&&(p.alphaMap.value=_.alphaMap,e(_.alphaMap,p.alphaMapTransform)),_.alphaTest>0&&(p.alphaTest.value=_.alphaTest)}function c(p,_){p.diffuse.value.copy(_.color),p.opacity.value=_.opacity,p.rotation.value=_.rotation,_.map&&(p.map.value=_.map,e(_.map,p.mapTransform)),_.alphaMap&&(p.alphaMap.value=_.alphaMap,e(_.alphaMap,p.alphaMapTransform)),_.alphaTest>0&&(p.alphaTest.value=_.alphaTest)}function h(p,_){p.specular.value.copy(_.specular),p.shininess.value=Math.max(_.shininess,1e-4)}function u(p,_){_.gradientMap&&(p.gradientMap.value=_.gradientMap)}function f(p,_){p.metalness.value=_.metalness,_.metalnessMap&&(p.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,p.metalnessMapTransform)),p.roughness.value=_.roughness,_.roughnessMap&&(p.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,p.roughnessMapTransform)),_.envMap&&(p.envMapIntensity.value=_.envMapIntensity)}function d(p,_,x){p.ior.value=_.ior,_.sheen>0&&(p.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),p.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(p.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,p.sheenColorMapTransform)),_.sheenRoughnessMap&&(p.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,p.sheenRoughnessMapTransform))),_.clearcoat>0&&(p.clearcoat.value=_.clearcoat,p.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(p.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,p.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(p.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===nn&&p.clearcoatNormalScale.value.negate())),_.dispersion>0&&(p.dispersion.value=_.dispersion),_.iridescence>0&&(p.iridescence.value=_.iridescence,p.iridescenceIOR.value=_.iridescenceIOR,p.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(p.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,p.iridescenceMapTransform)),_.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),_.transmission>0&&(p.transmission.value=_.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),_.transmissionMap&&(p.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,p.transmissionMapTransform)),p.thickness.value=_.thickness,_.thicknessMap&&(p.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=_.attenuationDistance,p.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(p.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(p.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=_.specularIntensity,p.specularColor.value.copy(_.specularColor),_.specularColorMap&&(p.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,p.specularColorMapTransform)),_.specularIntensityMap&&(p.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,_){_.matcap&&(p.matcap.value=_.matcap)}function g(p,_){const x=t.get(_).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Uy(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function c(x,v){let y=i[x.id];y===void 0&&(m(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",p));const T=v.program;n.updateUBOMapping(x,T);const w=t.render.frame;r[x.id]!==w&&(f(x),r[x.id]=w)}function h(x){const v=u();x.__bindingPointIndex=v;const y=s.createBuffer(),T=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,T,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,y),y}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=i[x.id],y=x.uniforms,T=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let w=0,E=y.length;w<E;w++){const C=Array.isArray(y[w])?y[w]:[y[w]];for(let L=0,M=C.length;L<M;L++){const S=C[L];if(d(S,w,L,T)===!0){const N=S.__offset,O=Array.isArray(S.value)?S.value:[S.value];let k=0;for(let G=0;G<O.length;G++){const B=O[G],j=g(B);typeof B=="number"||typeof B=="boolean"?(S.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,N+k,S.__data)):B.isMatrix3?(S.__data[0]=B.elements[0],S.__data[1]=B.elements[1],S.__data[2]=B.elements[2],S.__data[3]=0,S.__data[4]=B.elements[3],S.__data[5]=B.elements[4],S.__data[6]=B.elements[5],S.__data[7]=0,S.__data[8]=B.elements[6],S.__data[9]=B.elements[7],S.__data[10]=B.elements[8],S.__data[11]=0):(B.toArray(S.__data,k),k+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,S.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,v,y,T){const w=x.value,E=v+"_"+y;if(T[E]===void 0)return typeof w=="number"||typeof w=="boolean"?T[E]=w:T[E]=w.clone(),!0;{const C=T[E];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return T[E]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function m(x){const v=x.uniforms;let y=0;const T=16;for(let E=0,C=v.length;E<C;E++){const L=Array.isArray(v[E])?v[E]:[v[E]];for(let M=0,S=L.length;M<S;M++){const N=L[M],O=Array.isArray(N.value)?N.value:[N.value];for(let k=0,G=O.length;k<G;k++){const B=O[k],j=g(B),I=y%T,W=I%j.boundary,Z=I+W;y+=W,Z!==0&&T-Z<j.storage&&(y+=T-Z),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=j.storage}}}const w=y%T;return w>0&&(y+=T-w),x.__size=y,x.__cache={},this}function g(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function _(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:l,update:c,dispose:_}}class Ny{constructor(t={}){const{canvas:e=w0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),m=new Int32Array(4);let g=null,p=null;const _=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qe,this.toneMapping=zi,this.toneMappingExposure=1;const v=this;let y=!1,T=0,w=0,E=null,C=-1,L=null;const M=new he,S=new he;let N=null;const O=new Dt(0);let k=0,G=e.width,B=e.height,j=1,I=null,W=null;const Z=new he(0,0,G,B),st=new he(0,0,G,B);let St=!1;const Lt=new Eh;let Y=!1,ot=!1;const gt=new Zt,lt=new Zt,bt=new P,wt=new he,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function et(){return E===null?j:1}let D=n;function _t(A,F){return e.getContext(A,F)}try{const A={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fh}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),D===null){const F="webgl2";if(D=_t(F,A),D===null)throw _t(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let pt,ht,vt,Ft,Tt,R,b,V,tt,rt,Q,It,xt,K,ct,H,nt,mt,Et,ut,Xt,yt,$t,U;function ft(){pt=new kv(D),pt.init(),yt=new by(D,pt),ht=new Uv(D,pt,t,yt),vt=new Sy(D),ht.reverseDepthBuffer&&vt.buffers.depth.setReversed(!0),Ft=new Gv(D),Tt=new ay,R=new Ey(D,pt,vt,Tt,ht,yt,Ft),b=new Ov(v),V=new zv(v),tt=new $0(D),$t=new Lv(D,tt),rt=new Hv(D,tt,Ft,$t),Q=new Xv(D,rt,tt,Ft),Et=new Wv(D,ht,R),H=new Nv(Tt),It=new oy(v,b,V,pt,ht,$t,H),xt=new Iy(v,Tt),K=new cy,ct=new my(pt),mt=new Dv(v,b,V,vt,Q,f,l),nt=new yy(v,Q,ht),U=new Uy(D,Ft,ht,vt),ut=new Iv(D,pt,Ft),Xt=new Vv(D,pt,Ft),Ft.programs=It.programs,v.capabilities=ht,v.extensions=pt,v.properties=Tt,v.renderLists=K,v.shadowMap=nt,v.state=vt,v.info=Ft}ft();const $=new Dy(v,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const A=pt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=pt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(G,B,!1))},this.getSize=function(A){return A.set(G,B)},this.setSize=function(A,F,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=A,B=F,e.width=Math.floor(A*j),e.height=Math.floor(F*j),X===!0&&(e.style.width=A+"px",e.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(G*j,B*j).floor()},this.setDrawingBufferSize=function(A,F,X){G=A,B=F,j=X,e.width=Math.floor(A*X),e.height=Math.floor(F*X),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(M)},this.getViewport=function(A){return A.copy(Z)},this.setViewport=function(A,F,X,q){A.isVector4?Z.set(A.x,A.y,A.z,A.w):Z.set(A,F,X,q),vt.viewport(M.copy(Z).multiplyScalar(j).round())},this.getScissor=function(A){return A.copy(st)},this.setScissor=function(A,F,X,q){A.isVector4?st.set(A.x,A.y,A.z,A.w):st.set(A,F,X,q),vt.scissor(S.copy(st).multiplyScalar(j).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(A){vt.setScissorTest(St=A)},this.setOpaqueSort=function(A){I=A},this.setTransparentSort=function(A){W=A},this.getClearColor=function(A){return A.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor.apply(mt,arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha.apply(mt,arguments)},this.clear=function(A=!0,F=!0,X=!0){let q=0;if(A){let z=!1;if(E!==null){const dt=E.texture.format;z=dt===yh||dt===xh||dt===vh}if(z){const dt=E.texture.type,Ct=dt===Mi||dt===ys||dt===so||dt===mr||dt===mh||dt===_h,Ut=mt.getClearColor(),Ot=mt.getClearAlpha(),Gt=Ut.r,Yt=Ut.g,Bt=Ut.b;Ct?(d[0]=Gt,d[1]=Yt,d[2]=Bt,d[3]=Ot,D.clearBufferuiv(D.COLOR,0,d)):(m[0]=Gt,m[1]=Yt,m[2]=Bt,m[3]=Ot,D.clearBufferiv(D.COLOR,0,m))}else q|=D.COLOR_BUFFER_BIT}F&&(q|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),X&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),K.dispose(),ct.dispose(),Tt.dispose(),b.dispose(),V.dispose(),Q.dispose(),$t.dispose(),U.dispose(),It.dispose(),$.dispose(),$.removeEventListener("sessionstart",ou),$.removeEventListener("sessionend",au),Zi.stop()};function at(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const A=Ft.autoReset,F=nt.enabled,X=nt.autoUpdate,q=nt.needsUpdate,z=nt.type;ft(),Ft.autoReset=A,nt.enabled=F,nt.autoUpdate=X,nt.needsUpdate=q,nt.type=z}function Pt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Qt(A){const F=A.target;F.removeEventListener("dispose",Qt),Le(F)}function Le(A){fn(A),Tt.remove(A)}function fn(A){const F=Tt.get(A).programs;F!==void 0&&(F.forEach(function(X){It.releaseProgram(X)}),A.isShaderMaterial&&It.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,X,q,z,dt){F===null&&(F=Vt);const Ct=z.isMesh&&z.matrixWorld.determinant()<0,Ut=wm(A,F,X,q,z);vt.setMaterial(q,Ct);let Ot=X.index,Gt=1;if(q.wireframe===!0){if(Ot=rt.getWireframeAttribute(X),Ot===void 0)return;Gt=2}const Yt=X.drawRange,Bt=X.attributes.position;let ae=Yt.start*Gt,ge=(Yt.start+Yt.count)*Gt;dt!==null&&(ae=Math.max(ae,dt.start*Gt),ge=Math.min(ge,(dt.start+dt.count)*Gt)),Ot!==null?(ae=Math.max(ae,0),ge=Math.min(ge,Ot.count)):Bt!=null&&(ae=Math.max(ae,0),ge=Math.min(ge,Bt.count));const Te=ge-ae;if(Te<0||Te===1/0)return;$t.setup(z,q,Ut,X,Ot);let Mn,se=ut;if(Ot!==null&&(Mn=tt.get(Ot),se=Xt,se.setIndex(Mn)),z.isMesh)q.wireframe===!0?(vt.setLineWidth(q.wireframeLinewidth*et()),se.setMode(D.LINES)):se.setMode(D.TRIANGLES);else if(z.isLine){let zt=q.linewidth;zt===void 0&&(zt=1),vt.setLineWidth(zt*et()),z.isLineSegments?se.setMode(D.LINES):z.isLineLoop?se.setMode(D.LINE_LOOP):se.setMode(D.LINE_STRIP)}else z.isPoints?se.setMode(D.POINTS):z.isSprite&&se.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)se.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))se.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const zt=z._multiDrawStarts,qe=z._multiDrawCounts,re=z._multiDrawCount,Vn=Ot?tt.get(Ot).bytesPerElement:1,Rs=Tt.get(q).currentProgram.getUniforms();for(let Sn=0;Sn<re;Sn++)Rs.setValue(D,"_gl_DrawID",Sn),se.render(zt[Sn]/Vn,qe[Sn])}else if(z.isInstancedMesh)se.renderInstances(ae,Te,z.count);else if(X.isInstancedBufferGeometry){const zt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,qe=Math.min(X.instanceCount,zt);se.renderInstances(ae,Te,qe)}else se.render(ae,Te)};function ne(A,F,X){A.transparent===!0&&A.side===xe&&A.forceSinglePass===!1?(A.side=nn,A.needsUpdate=!0,wo(A,F,X),A.side=Gi,A.needsUpdate=!0,wo(A,F,X),A.side=xe):wo(A,F,X)}this.compile=function(A,F,X=null){X===null&&(X=A),p=ct.get(X),p.init(F),x.push(p),X.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),A!==X&&A.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const q=new Set;return A.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const dt=z.material;if(dt)if(Array.isArray(dt))for(let Ct=0;Ct<dt.length;Ct++){const Ut=dt[Ct];ne(Ut,X,z),q.add(Ut)}else ne(dt,X,z),q.add(dt)}),x.pop(),p=null,q},this.compileAsync=function(A,F,X=null){const q=this.compile(A,F,X);return new Promise(z=>{function dt(){if(q.forEach(function(Ct){Tt.get(Ct).currentProgram.isReady()&&q.delete(Ct)}),q.size===0){z(A);return}setTimeout(dt,10)}pt.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let dn=null;function oi(A){dn&&dn(A)}function ou(){Zi.stop()}function au(){Zi.start()}const Zi=new Od;Zi.setAnimationLoop(oi),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(A){dn=A,$.setAnimationLoop(A),A===null?Zi.stop():Zi.start()},$.addEventListener("sessionstart",ou),$.addEventListener("sessionend",au),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(F),F=$.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,F,E),p=ct.get(A,x.length),p.init(F),x.push(p),lt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Lt.setFromProjectionMatrix(lt),ot=this.localClippingEnabled,Y=H.init(this.clippingPlanes,ot),g=K.get(A,_.length),g.init(),_.push(g),$.enabled===!0&&$.isPresenting===!0){const dt=v.xr.getDepthSensingMesh();dt!==null&&el(dt,F,-1/0,v.sortObjects)}el(A,F,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(I,W),Wt=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Wt&&mt.addToRenderList(g,A),this.info.render.frame++,Y===!0&&H.beginShadows();const X=p.state.shadowsArray;nt.render(X,A,F),Y===!0&&H.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=g.opaque,z=g.transmissive;if(p.setupLights(),F.isArrayCamera){const dt=F.cameras;if(z.length>0)for(let Ct=0,Ut=dt.length;Ct<Ut;Ct++){const Ot=dt[Ct];cu(q,z,A,Ot)}Wt&&mt.render(A);for(let Ct=0,Ut=dt.length;Ct<Ut;Ct++){const Ot=dt[Ct];lu(g,A,Ot,Ot.viewport)}}else z.length>0&&cu(q,z,A,F),Wt&&mt.render(A),lu(g,A,F);E!==null&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),A.isScene===!0&&A.onAfterRender(v,A,F),$t.resetDefaultState(),C=-1,L=null,x.pop(),x.length>0?(p=x[x.length-1],Y===!0&&H.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function el(A,F,X,q){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Lt.intersectsSprite(A)){q&&wt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(lt);const Ct=Q.update(A),Ut=A.material;Ut.visible&&g.push(A,Ct,Ut,X,wt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Lt.intersectsObject(A))){const Ct=Q.update(A),Ut=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),wt.copy(A.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),wt.copy(Ct.boundingSphere.center)),wt.applyMatrix4(A.matrixWorld).applyMatrix4(lt)),Array.isArray(Ut)){const Ot=Ct.groups;for(let Gt=0,Yt=Ot.length;Gt<Yt;Gt++){const Bt=Ot[Gt],ae=Ut[Bt.materialIndex];ae&&ae.visible&&g.push(A,Ct,ae,X,wt.z,Bt)}}else Ut.visible&&g.push(A,Ct,Ut,X,wt.z,null)}}const dt=A.children;for(let Ct=0,Ut=dt.length;Ct<Ut;Ct++)el(dt[Ct],F,X,q)}function lu(A,F,X,q){const z=A.opaque,dt=A.transmissive,Ct=A.transparent;p.setupLightsView(X),Y===!0&&H.setGlobalState(v.clippingPlanes,X),q&&vt.viewport(M.copy(q)),z.length>0&&So(z,F,X),dt.length>0&&So(dt,F,X),Ct.length>0&&So(Ct,F,X),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function cu(A,F,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Kn(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?yi:Mi,minFilter:us,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));const dt=p.state.transmissionRenderTarget[q.id],Ct=q.viewport||M;dt.setSize(Ct.z,Ct.w);const Ut=v.getRenderTarget();v.setRenderTarget(dt),v.getClearColor(O),k=v.getClearAlpha(),k<1&&v.setClearColor(16777215,.5),v.clear(),Wt&&mt.render(X);const Ot=v.toneMapping;v.toneMapping=zi;const Gt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),Y===!0&&H.setGlobalState(v.clippingPlanes,q),So(A,X,q),R.updateMultisampleRenderTarget(dt),R.updateRenderTargetMipmap(dt),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Bt=0,ae=F.length;Bt<ae;Bt++){const ge=F[Bt],Te=ge.object,Mn=ge.geometry,se=ge.material,zt=ge.group;if(se.side===xe&&Te.layers.test(q.layers)){const qe=se.side;se.side=nn,se.needsUpdate=!0,hu(Te,X,q,Mn,se,zt),se.side=qe,se.needsUpdate=!0,Yt=!0}}Yt===!0&&(R.updateMultisampleRenderTarget(dt),R.updateRenderTargetMipmap(dt))}v.setRenderTarget(Ut),v.setClearColor(O,k),Gt!==void 0&&(q.viewport=Gt),v.toneMapping=Ot}function So(A,F,X){const q=F.isScene===!0?F.overrideMaterial:null;for(let z=0,dt=A.length;z<dt;z++){const Ct=A[z],Ut=Ct.object,Ot=Ct.geometry,Gt=q===null?Ct.material:q,Yt=Ct.group;Ut.layers.test(X.layers)&&hu(Ut,F,X,Ot,Gt,Yt)}}function hu(A,F,X,q,z,dt){A.onBeforeRender(v,F,X,q,z,dt),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),z.onBeforeRender(v,F,X,q,A,dt),z.transparent===!0&&z.side===xe&&z.forceSinglePass===!1?(z.side=nn,z.needsUpdate=!0,v.renderBufferDirect(X,F,q,z,A,dt),z.side=Gi,z.needsUpdate=!0,v.renderBufferDirect(X,F,q,z,A,dt),z.side=xe):v.renderBufferDirect(X,F,q,z,A,dt),A.onAfterRender(v,F,X,q,z,dt)}function wo(A,F,X){F.isScene!==!0&&(F=Vt);const q=Tt.get(A),z=p.state.lights,dt=p.state.shadowsArray,Ct=z.state.version,Ut=It.getParameters(A,z.state,dt,F,X),Ot=It.getProgramCacheKey(Ut);let Gt=q.programs;q.environment=A.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(A.isMeshStandardMaterial?V:b).get(A.envMap||q.environment),q.envMapRotation=q.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Gt===void 0&&(A.addEventListener("dispose",Qt),Gt=new Map,q.programs=Gt);let Yt=Gt.get(Ot);if(Yt!==void 0){if(q.currentProgram===Yt&&q.lightsStateVersion===Ct)return fu(A,Ut),Yt}else Ut.uniforms=It.getUniforms(A),A.onBeforeCompile(Ut,v),Yt=It.acquireProgram(Ut,Ot),Gt.set(Ot,Yt),q.uniforms=Ut.uniforms;const Bt=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Bt.clippingPlanes=H.uniform),fu(A,Ut),q.needsLights=bm(A),q.lightsStateVersion=Ct,q.needsLights&&(Bt.ambientLightColor.value=z.state.ambient,Bt.lightProbe.value=z.state.probe,Bt.directionalLights.value=z.state.directional,Bt.directionalLightShadows.value=z.state.directionalShadow,Bt.spotLights.value=z.state.spot,Bt.spotLightShadows.value=z.state.spotShadow,Bt.rectAreaLights.value=z.state.rectArea,Bt.ltc_1.value=z.state.rectAreaLTC1,Bt.ltc_2.value=z.state.rectAreaLTC2,Bt.pointLights.value=z.state.point,Bt.pointLightShadows.value=z.state.pointShadow,Bt.hemisphereLights.value=z.state.hemi,Bt.directionalShadowMap.value=z.state.directionalShadowMap,Bt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Bt.spotShadowMap.value=z.state.spotShadowMap,Bt.spotLightMatrix.value=z.state.spotLightMatrix,Bt.spotLightMap.value=z.state.spotLightMap,Bt.pointShadowMap.value=z.state.pointShadowMap,Bt.pointShadowMatrix.value=z.state.pointShadowMatrix),q.currentProgram=Yt,q.uniformsList=null,Yt}function uu(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=fa.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function fu(A,F){const X=Tt.get(A);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function wm(A,F,X,q,z){F.isScene!==!0&&(F=Vt),R.resetTextureUnits();const dt=F.fog,Ct=q.isMeshStandardMaterial?F.environment:null,Ut=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:qi,Ot=(q.isMeshStandardMaterial?V:b).get(q.envMap||Ct),Gt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Yt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Bt=!!X.morphAttributes.position,ae=!!X.morphAttributes.normal,ge=!!X.morphAttributes.color;let Te=zi;q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Te=v.toneMapping);const Mn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,se=Mn!==void 0?Mn.length:0,zt=Tt.get(q),qe=p.state.lights;if(Y===!0&&(ot===!0||A!==L)){const Ln=A===L&&q.id===C;H.setState(q,A,Ln)}let re=!1;q.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==qe.state.version||zt.outputColorSpace!==Ut||z.isBatchedMesh&&zt.batching===!1||!z.isBatchedMesh&&zt.batching===!0||z.isBatchedMesh&&zt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&zt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&zt.instancing===!1||!z.isInstancedMesh&&zt.instancing===!0||z.isSkinnedMesh&&zt.skinning===!1||!z.isSkinnedMesh&&zt.skinning===!0||z.isInstancedMesh&&zt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&zt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&zt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&zt.instancingMorph===!1&&z.morphTexture!==null||zt.envMap!==Ot||q.fog===!0&&zt.fog!==dt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==H.numPlanes||zt.numIntersection!==H.numIntersection)||zt.vertexAlphas!==Gt||zt.vertexTangents!==Yt||zt.morphTargets!==Bt||zt.morphNormals!==ae||zt.morphColors!==ge||zt.toneMapping!==Te||zt.morphTargetsCount!==se)&&(re=!0):(re=!0,zt.__version=q.version);let Vn=zt.currentProgram;re===!0&&(Vn=wo(q,F,z));let Rs=!1,Sn=!1,nl=!1;const Re=Vn.getUniforms(),Ti=zt.uniforms;if(vt.useProgram(Vn.program)&&(Rs=!0,Sn=!0,nl=!0),q.id!==C&&(C=q.id,Sn=!0),Rs||L!==A){ht.reverseDepthBuffer?(gt.copy(A.projectionMatrix),b0(gt),T0(gt),Re.setValue(D,"projectionMatrix",gt)):Re.setValue(D,"projectionMatrix",A.projectionMatrix),Re.setValue(D,"viewMatrix",A.matrixWorldInverse);const Ln=Re.map.cameraPosition;Ln!==void 0&&Ln.setValue(D,bt.setFromMatrixPosition(A.matrixWorld)),ht.logarithmicDepthBuffer&&Re.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Re.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),L!==A&&(L=A,Sn=!0,nl=!0)}if(z.isSkinnedMesh){Re.setOptional(D,z,"bindMatrix"),Re.setOptional(D,z,"bindMatrixInverse");const Ln=z.skeleton;Ln&&(Ln.boneTexture===null&&Ln.computeBoneTexture(),Re.setValue(D,"boneTexture",Ln.boneTexture,R))}z.isBatchedMesh&&(Re.setOptional(D,z,"batchingTexture"),Re.setValue(D,"batchingTexture",z._matricesTexture,R),Re.setOptional(D,z,"batchingIdTexture"),Re.setValue(D,"batchingIdTexture",z._indirectTexture,R),Re.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&Re.setValue(D,"batchingColorTexture",z._colorsTexture,R));const il=X.morphAttributes;if((il.position!==void 0||il.normal!==void 0||il.color!==void 0)&&Et.update(z,X,Vn),(Sn||zt.receiveShadow!==z.receiveShadow)&&(zt.receiveShadow=z.receiveShadow,Re.setValue(D,"receiveShadow",z.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Ti.envMap.value=Ot,Ti.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(Ti.envMapIntensity.value=F.environmentIntensity),Sn&&(Re.setValue(D,"toneMappingExposure",v.toneMappingExposure),zt.needsLights&&Em(Ti,nl),dt&&q.fog===!0&&xt.refreshFogUniforms(Ti,dt),xt.refreshMaterialUniforms(Ti,q,j,B,p.state.transmissionRenderTarget[A.id]),fa.upload(D,uu(zt),Ti,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(fa.upload(D,uu(zt),Ti,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Re.setValue(D,"center",z.center),Re.setValue(D,"modelViewMatrix",z.modelViewMatrix),Re.setValue(D,"normalMatrix",z.normalMatrix),Re.setValue(D,"modelMatrix",z.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Ln=q.uniformsGroups;for(let sl=0,Tm=Ln.length;sl<Tm;sl++){const du=Ln[sl];U.update(du,Vn),U.bind(du,Vn)}}return Vn}function Em(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function bm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(A,F,X){Tt.get(A.texture).__webglTexture=F,Tt.get(A.depthTexture).__webglTexture=X;const q=Tt.get(A);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||pt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,F){const X=Tt.get(A);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,X=0){E=A,T=F,w=X;let q=!0,z=null,dt=!1,Ct=!1;if(A){const Ot=Tt.get(A);if(Ot.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(Ot.__webglFramebuffer===void 0)R.setupRenderTarget(A);else if(Ot.__hasExternalTextures)R.rebindTextures(A,Tt.get(A.texture).__webglTexture,Tt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Bt=A.depthTexture;if(Ot.__boundDepthTexture!==Bt){if(Bt!==null&&Tt.has(Bt)&&(A.width!==Bt.image.width||A.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(A)}}const Gt=A.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(Ct=!0);const Yt=Tt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Yt[F])?z=Yt[F][X]:z=Yt[F],dt=!0):A.samples>0&&R.useMultisampledRTT(A)===!1?z=Tt.get(A).__webglMultisampledFramebuffer:Array.isArray(Yt)?z=Yt[X]:z=Yt,M.copy(A.viewport),S.copy(A.scissor),N=A.scissorTest}else M.copy(Z).multiplyScalar(j).floor(),S.copy(st).multiplyScalar(j).floor(),N=St;if(vt.bindFramebuffer(D.FRAMEBUFFER,z)&&q&&vt.drawBuffers(A,z),vt.viewport(M),vt.scissor(S),vt.setScissorTest(N),dt){const Ot=Tt.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ot.__webglTexture,X)}else if(Ct){const Ot=Tt.get(A.texture),Gt=F||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ot.__webglTexture,X||0,Gt)}C=-1},this.readRenderTargetPixels=function(A,F,X,q,z,dt,Ct){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Tt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Ut=Ut[Ct]),Ut){vt.bindFramebuffer(D.FRAMEBUFFER,Ut);try{const Ot=A.texture,Gt=Ot.format,Yt=Ot.type;if(!ht.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-q&&X>=0&&X<=A.height-z&&D.readPixels(F,X,q,z,yt.convert(Gt),yt.convert(Yt),dt)}finally{const Ot=E!==null?Tt.get(E).__webglFramebuffer:null;vt.bindFramebuffer(D.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,F,X,q,z,dt,Ct){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Tt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Ut=Ut[Ct]),Ut){const Ot=A.texture,Gt=Ot.format,Yt=Ot.type;if(!ht.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=A.width-q&&X>=0&&X<=A.height-z){vt.bindFramebuffer(D.FRAMEBUFFER,Ut);const Bt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Bt),D.bufferData(D.PIXEL_PACK_BUFFER,dt.byteLength,D.STREAM_READ),D.readPixels(F,X,q,z,yt.convert(Gt),yt.convert(Yt),0);const ae=E!==null?Tt.get(E).__webglFramebuffer:null;vt.bindFramebuffer(D.FRAMEBUFFER,ae);const ge=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await E0(D,ge,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Bt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,dt),D.deleteBuffer(Bt),D.deleteSync(ge),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,F=null,X=0){A.isTexture!==!0&&(ua("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,A=arguments[1]);const q=Math.pow(2,-X),z=Math.floor(A.image.width*q),dt=Math.floor(A.image.height*q),Ct=F!==null?F.x:0,Ut=F!==null?F.y:0;R.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,Ct,Ut,z,dt),vt.unbindTexture()},this.copyTextureToTexture=function(A,F,X=null,q=null,z=0){A.isTexture!==!0&&(ua("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,A=arguments[1],F=arguments[2],z=arguments[3]||0,X=null);let dt,Ct,Ut,Ot,Gt,Yt;X!==null?(dt=X.max.x-X.min.x,Ct=X.max.y-X.min.y,Ut=X.min.x,Ot=X.min.y):(dt=A.image.width,Ct=A.image.height,Ut=0,Ot=0),q!==null?(Gt=q.x,Yt=q.y):(Gt=0,Yt=0);const Bt=yt.convert(F.format),ae=yt.convert(F.type);R.setTexture2D(F,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const ge=D.getParameter(D.UNPACK_ROW_LENGTH),Te=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Mn=D.getParameter(D.UNPACK_SKIP_PIXELS),se=D.getParameter(D.UNPACK_SKIP_ROWS),zt=D.getParameter(D.UNPACK_SKIP_IMAGES),qe=A.isCompressedTexture?A.mipmaps[z]:A.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,qe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,qe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ut),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ot),A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,z,Gt,Yt,dt,Ct,Bt,ae,qe.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,z,Gt,Yt,qe.width,qe.height,Bt,qe.data):D.texSubImage2D(D.TEXTURE_2D,z,Gt,Yt,dt,Ct,Bt,ae,qe),D.pixelStorei(D.UNPACK_ROW_LENGTH,ge),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Te),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Mn),D.pixelStorei(D.UNPACK_SKIP_ROWS,se),D.pixelStorei(D.UNPACK_SKIP_IMAGES,zt),z===0&&F.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),vt.unbindTexture()},this.copyTextureToTexture3D=function(A,F,X=null,q=null,z=0){A.isTexture!==!0&&(ua("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,A=arguments[2],F=arguments[3],z=arguments[4]||0);let dt,Ct,Ut,Ot,Gt,Yt,Bt,ae,ge;const Te=A.isCompressedTexture?A.mipmaps[z]:A.image;X!==null?(dt=X.max.x-X.min.x,Ct=X.max.y-X.min.y,Ut=X.max.z-X.min.z,Ot=X.min.x,Gt=X.min.y,Yt=X.min.z):(dt=Te.width,Ct=Te.height,Ut=Te.depth,Ot=0,Gt=0,Yt=0),q!==null?(Bt=q.x,ae=q.y,ge=q.z):(Bt=0,ae=0,ge=0);const Mn=yt.convert(F.format),se=yt.convert(F.type);let zt;if(F.isData3DTexture)R.setTexture3D(F,0),zt=D.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)R.setTexture2DArray(F,0),zt=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const qe=D.getParameter(D.UNPACK_ROW_LENGTH),re=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Vn=D.getParameter(D.UNPACK_SKIP_PIXELS),Rs=D.getParameter(D.UNPACK_SKIP_ROWS),Sn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Te.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Te.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ot),D.pixelStorei(D.UNPACK_SKIP_ROWS,Gt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Yt),A.isDataTexture||A.isData3DTexture?D.texSubImage3D(zt,z,Bt,ae,ge,dt,Ct,Ut,Mn,se,Te.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(zt,z,Bt,ae,ge,dt,Ct,Ut,Mn,Te.data):D.texSubImage3D(zt,z,Bt,ae,ge,dt,Ct,Ut,Mn,se,Te),D.pixelStorei(D.UNPACK_ROW_LENGTH,qe),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,re),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Vn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Rs),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Sn),z===0&&F.generateMipmaps&&D.generateMipmap(zt),vt.unbindTexture()},this.initRenderTarget=function(A){Tt.get(A).__webglFramebuffer===void 0&&R.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),vt.unbindTexture()},this.resetState=function(){T=0,w=0,E=null,vt.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Mh?"display-p3":"srgb",e.unpackColorSpace=ie.workingColorSpace===Va?"display-p3":"srgb"}}class Ah{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Dt(t),this.near=e,this.far=n}clone(){return new Ah(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vd extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Oy{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Fc,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const an=new P;class Sa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)an.fromBufferAttribute(this,e),an.applyMatrix4(t),this.setXYZ(e,an.x,an.y,an.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)an.fromBufferAttribute(this,e),an.applyNormalMatrix(t),this.setXYZ(e,an.x,an.y,an.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)an.fromBufferAttribute(this,e),an.transformDirection(t),this.setXYZ(e,an.x,an.y,an.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=qn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Sa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Wa extends ji{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ws;const Nr=new P,Xs=new P,Ys=new P,qs=new J,Or=new J,Gd=new Zt,Xo=new P,Fr=new P,Yo=new P,af=new J,Ul=new J,lf=new J;class Ch extends be{constructor(t=new Wa){if(super(),this.isSprite=!0,this.type="Sprite",Ws===void 0){Ws=new ue;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Oy(e,5);Ws.setIndex([0,1,2,0,2,3]),Ws.setAttribute("position",new Sa(n,3,0,!1)),Ws.setAttribute("uv",new Sa(n,2,3,!1))}this.geometry=Ws,this.material=t,this.center=new J(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xs.setFromMatrixScale(this.matrixWorld),Gd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ys.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xs.multiplyScalar(-Ys.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;qo(Xo.set(-.5,-.5,0),Ys,o,Xs,i,r),qo(Fr.set(.5,-.5,0),Ys,o,Xs,i,r),qo(Yo.set(.5,.5,0),Ys,o,Xs,i,r),af.set(0,0),Ul.set(1,0),lf.set(1,1);let a=t.ray.intersectTriangle(Xo,Fr,Yo,!1,Nr);if(a===null&&(qo(Fr.set(-.5,.5,0),Ys,o,Xs,i,r),Ul.set(0,1),a=t.ray.intersectTriangle(Xo,Yo,Fr,!1,Nr),a===null))return;const l=t.ray.origin.distanceTo(Nr);l<t.near||l>t.far||e.push({distance:l,point:Nr.clone(),uv:On.getInterpolation(Nr,Xo,Fr,Yo,af,Ul,lf,new J),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function qo(s,t,e,n,i,r){qs.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Or.x=r*qs.x-i*qs.y,Or.y=i*qs.x+r*qs.y):Or.copy(qs),s.copy(t),s.x+=Or.x,s.y+=Or.y,s.applyMatrix4(Gd)}class Fy extends sn{constructor(t=null,e=1,n=1,i,r,o,a,l,c=un,h=un,u,f){super(null,o,a,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cf extends Ke{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const js=new Zt,hf=new Zt,jo=[],uf=new bs,By=new Zt,Br=new it,zr=new Ts;class kn extends it{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new cf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,By)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new bs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,js),uf.copy(t.boundingBox).applyMatrix4(js),this.boundingBox.union(uf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ts),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,js),zr.copy(t.boundingSphere).applyMatrix4(js),this.boundingSphere.union(zr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Br.geometry=this.geometry,Br.material=this.material,Br.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),t.ray.intersectsSphere(zr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,js),hf.multiplyMatrices(n,js),Br.matrixWorld=hf,Br.raycast(t,jo);for(let o=0,a=jo.length;o<a;o++){const l=jo[o];l.instanceId=r,l.object=this,e.push(l)}jo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new cf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fy(new Float32Array(i*this.count),i,this.count,gh,Qn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Wd extends ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const wa=new P,Ea=new P,ff=new Zt,kr=new xo,Ko=new Ts,Nl=new P,df=new P;class zy extends be{constructor(t=new ue,e=new Wd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)wa.fromBufferAttribute(e,i-1),Ea.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=wa.distanceTo(Ea);t.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ko.copy(n.boundingSphere),Ko.applyMatrix4(i),Ko.radius+=r,t.ray.intersectsSphere(Ko)===!1)return;ff.copy(i).invert(),kr.copy(t.ray).applyMatrix4(ff);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let g=d,p=m-1;g<p;g+=c){const _=h.getX(g),x=h.getX(g+1),v=$o(this,t,kr,l,_,x);v&&e.push(v)}if(this.isLineLoop){const g=h.getX(m-1),p=h.getX(d),_=$o(this,t,kr,l,g,p);_&&e.push(_)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let g=d,p=m-1;g<p;g+=c){const _=$o(this,t,kr,l,g,g+1);_&&e.push(_)}if(this.isLineLoop){const g=$o(this,t,kr,l,m-1,d);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function $o(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(wa.fromBufferAttribute(o,i),Ea.fromBufferAttribute(o,r),e.distanceSqToSegment(wa,Ea,Nl,df)>n)return;Nl.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Nl);if(!(l<t.near||l>t.far))return{distance:l,point:df.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class ky extends zy{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Hy extends ji{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pf=new Zt,Hc=new xo,Zo=new Ts,Jo=new P;class Vy extends be{constructor(t=new ue,e=new Hy){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zo.copy(n.boundingSphere),Zo.applyMatrix4(i),Zo.radius+=r,t.ray.intersectsSphere(Zo)===!1)return;pf.copy(i).invert(),Hc.copy(t.ray).applyMatrix4(pf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let m=f,g=d;m<g;m++){const p=c.getX(m);Jo.fromBufferAttribute(u,p),mf(Jo,p,l,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,g=d;m<g;m++)Jo.fromBufferAttribute(u,m),mf(Jo,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function mf(s,t,e,n,i,r,o){const a=Hc.distanceSqToPoint(s);if(a<e){const l=new P;Hc.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class As extends sn{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ri{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],f=n[i+1]-h,d=(o-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new J:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],r=[],o=[],a=new P,l=new Zt;for(let d=0;d<=t;d++){const m=d/t;i[d]=this.getTangentAt(m,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Oe(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,m))}o[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Oe(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],d*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Rh extends ri{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new J){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gy extends Rh{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ph(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,i(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Qo=new P,Ol=new Ph,Fl=new Ph,Bl=new Ph;class ao extends ri{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Qo.subVectors(i[0],i[1]).add(i[0]),c=Qo);const u=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Qo.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Qo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);g<1e-4&&(g=1),m<1e-4&&(m=g),p<1e-4&&(p=g),Ol.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,g,p),Fl.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,g,p),Bl.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,g,p)}else this.curveType==="catmullrom"&&(Ol.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Fl.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Bl.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Ol.calc(l),Fl.calc(l),Bl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function _f(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function Wy(s,t){const e=1-s;return e*e*t}function Xy(s,t){return 2*(1-s)*s*t}function Yy(s,t){return s*s*t}function Jr(s,t,e,n){return Wy(s,t)+Xy(s,e)+Yy(s,n)}function qy(s,t){const e=1-s;return e*e*e*t}function jy(s,t){const e=1-s;return 3*e*e*s*t}function Ky(s,t){return 3*(1-s)*s*s*t}function $y(s,t){return s*s*s*t}function Qr(s,t,e,n,i){return qy(s,t)+jy(s,e)+Ky(s,n)+$y(s,i)}class Xd extends ri{constructor(t=new J,e=new J,n=new J,i=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new J){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Qr(t,i.x,r.x,o.x,a.x),Qr(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zy extends ri{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Qr(t,i.x,r.x,o.x,a.x),Qr(t,i.y,r.y,o.y,a.y),Qr(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yd extends ri{constructor(t=new J,e=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new J){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new J){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jy extends ri{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qd extends ri{constructor(t=new J,e=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new J){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Jr(t,i.x,r.x,o.x),Jr(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xa extends ri{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Jr(t,i.x,r.x,o.x),Jr(t,i.y,r.y,o.y),Jr(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jd extends ri{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new J){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(_f(a,l.x,c.x,h.x,u.x),_f(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new J().fromArray(i))}return this}}var ba=Object.freeze({__proto__:null,ArcCurve:Gy,CatmullRomCurve3:ao,CubicBezierCurve:Xd,CubicBezierCurve3:Zy,EllipseCurve:Rh,LineCurve:Yd,LineCurve3:Jy,QuadraticBezierCurve:qd,QuadraticBezierCurve3:Xa,SplineCurve:jd});class Qy extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ba[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ba[i.type]().fromJSON(i))}return this}}class Vc extends Qy{constructor(t){super(),this.type="Path",this.currentPoint=new J,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Yd(this.currentPoint.clone(),new J(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new qd(this.currentPoint.clone(),new J(t,e),new J(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Xd(this.currentPoint.clone(),new J(t,e),new J(n,i),new J(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new jd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){const c=new Rh(t,e,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ya extends ue{constructor(t=[new J(0,-.5),new J(.5,0),new J(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Oe(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new P,f=new J,d=new P,m=new P,g=new P;let p=0,_=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:p=t[x+1].x-t[x].x,_=t[x+1].y-t[x].y,d.x=_*1,d.y=-p,d.z=_*0,g.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(g.x,g.y,g.z);break;default:p=t[x+1].x-t[x].x,_=t[x+1].y-t[x].y,d.x=_*1,d.y=-p,d.z=_*0,m.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),l.push(d.x,d.y,d.z),g.copy(m)}for(let x=0;x<=e;x++){const v=n+x*h*i,y=Math.sin(v),T=Math.cos(v);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*y,u.y=t[w].y,u.z=t[w].x*T,o.push(u.x,u.y,u.z),f.x=x/e,f.y=w/(t.length-1),a.push(f.x,f.y);const E=l[3*w+0]*y,C=l[3*w+1],L=l[3*w+0]*T;c.push(E,C,L)}}for(let x=0;x<e;x++)for(let v=0;v<t.length-1;v++){const y=v+x*t.length,T=y,w=y+t.length,E=y+t.length+1,C=y+1;r.push(T,w,C),r.push(E,C,w)}this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("uv",new qt(a,2)),this.setAttribute("normal",new qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ya(t.points,t.segments,t.phiStart,t.phiLength)}}class qa extends Ya{constructor(t=1,e=1,n=4,i=8){const r=new Vc;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new qa(t.radius,t.length,t.capSegments,t.radialSegments)}}class Wi extends ue{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new P,h=new J;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(a,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class de extends ue{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],d=[];let m=0;const g=[],p=n/2;let _=0;x(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(d,2));function x(){const y=new P,T=new P;let w=0;const E=(e-t)/n;for(let C=0;C<=r;C++){const L=[],M=C/r,S=M*(e-t)+t;for(let N=0;N<=i;N++){const O=N/i,k=O*l+a,G=Math.sin(k),B=Math.cos(k);T.x=S*G,T.y=-M*n+p,T.z=S*B,u.push(T.x,T.y,T.z),y.set(G,E,B).normalize(),f.push(y.x,y.y,y.z),d.push(O,1-M),L.push(m++)}g.push(L)}for(let C=0;C<i;C++)for(let L=0;L<r;L++){const M=g[L][C],S=g[L+1][C],N=g[L+1][C+1],O=g[L][C+1];t>0&&(h.push(M,S,O),w+=3),e>0&&(h.push(S,N,O),w+=3)}c.addGroup(_,w,0),_+=w}function v(y){const T=m,w=new J,E=new P;let C=0;const L=y===!0?t:e,M=y===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,p*M,0),f.push(0,M,0),d.push(.5,.5),m++;const S=m;for(let N=0;N<=i;N++){const k=N/i*l+a,G=Math.cos(k),B=Math.sin(k);E.x=L*B,E.y=p*M,E.z=L*G,u.push(E.x,E.y,E.z),f.push(0,M,0),w.x=G*.5+.5,w.y=B*.5*M+.5,d.push(w.x,w.y),m++}for(let N=0;N<i;N++){const O=T+N,k=S+N;y===!0?h.push(k,k+1,O):h.push(k+1,k,O),C+=3}c.addGroup(_,C,y===!0?1:2),_+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new de(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ki extends de{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ki(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Dh extends ue{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new P,y=new P,T=new P;for(let w=0;w<e.length;w+=3)d(e[w+0],v),d(e[w+1],y),d(e[w+2],T),l(v,y,T,x)}function l(x,v,y,T){const w=T+1,E=[];for(let C=0;C<=w;C++){E[C]=[];const L=x.clone().lerp(y,C/w),M=v.clone().lerp(y,C/w),S=w-C;for(let N=0;N<=S;N++)N===0&&C===w?E[C][N]=L:E[C][N]=L.clone().lerp(M,N/S)}for(let C=0;C<w;C++)for(let L=0;L<2*(w-C)-1;L++){const M=Math.floor(L/2);L%2===0?(f(E[C][M+1]),f(E[C+1][M]),f(E[C][M])):(f(E[C][M+1]),f(E[C+1][M+1]),f(E[C+1][M]))}}function c(x){const v=new P;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(x),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function h(){const x=new P;for(let v=0;v<r.length;v+=3){x.x=r[v+0],x.y=r[v+1],x.z=r[v+2];const y=p(x)/2/Math.PI+.5,T=_(x)/Math.PI+.5;o.push(y,1-T)}m(),u()}function u(){for(let x=0;x<o.length;x+=6){const v=o[x+0],y=o[x+2],T=o[x+4],w=Math.max(v,y,T),E=Math.min(v,y,T);w>.9&&E<.1&&(v<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),T<.2&&(o[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function d(x,v){const y=x*3;v.x=t[y+0],v.y=t[y+1],v.z=t[y+2]}function m(){const x=new P,v=new P,y=new P,T=new P,w=new J,E=new J,C=new J;for(let L=0,M=0;L<r.length;L+=9,M+=6){x.set(r[L+0],r[L+1],r[L+2]),v.set(r[L+3],r[L+4],r[L+5]),y.set(r[L+6],r[L+7],r[L+8]),w.set(o[M+0],o[M+1]),E.set(o[M+2],o[M+3]),C.set(o[M+4],o[M+5]),T.copy(x).add(v).add(y).divideScalar(3);const S=p(T);g(w,M+0,x,S),g(E,M+2,v,S),g(C,M+4,y,S)}}function g(x,v,y,T){T<0&&x.x===1&&(o[v]=x.x-1),y.x===0&&y.z===0&&(o[v]=T/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function _(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dh(t.vertices,t.indices,t.radius,t.details)}}class ps extends Vc{constructor(t){super(t),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Vc().fromJSON(i))}return this}}const tM={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Kd(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,f,d;if(n&&(r=rM(s,t,r,e)),s.length>80*e){a=c=s[0],l=h=s[1];for(let m=e;m<i;m+=e)u=s[m],f=s[m+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return lo(r,o,e,a,l,d,0),o}};function Kd(s,t,e,n,i){let r,o;if(i===_M(s,t,e,n)>0)for(r=t;r<e;r+=n)o=gf(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=gf(r,s[r],s[r+1],o);return o&&ja(o,o.next)&&(ho(o),o=o.next),o}function Ms(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ja(e,e.next)||we(e.prev,e,e.next)===0)){if(ho(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function lo(s,t,e,n,i,r,o){if(!s)return;!o&&r&&hM(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?nM(s,n,i,r):eM(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),ho(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=iM(Ms(s),t,e),lo(s,t,e,n,i,r,2)):o===2&&sM(s,t,e,n,i,r):lo(Ms(s),t,e,n,i,r,1);break}}}function eM(s){const t=s.prev,e=s,n=s.next;if(we(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,f=i>r?i>o?i:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&er(i,a,r,l,o,c,m.x,m.y)&&we(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function nM(s,t,e,n){const i=s.prev,r=s,o=s.next;if(we(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,m=h<u?h<f?h:f:u<f?u:f,g=a>l?a>c?a:c:l>c?l:c,p=h>u?h>f?h:f:u>f?u:f,_=Gc(d,m,t,e,n),x=Gc(g,p,t,e,n);let v=s.prevZ,y=s.nextZ;for(;v&&v.z>=_&&y&&y.z<=x;){if(v.x>=d&&v.x<=g&&v.y>=m&&v.y<=p&&v!==i&&v!==o&&er(a,h,l,u,c,f,v.x,v.y)&&we(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=d&&y.x<=g&&y.y>=m&&y.y<=p&&y!==i&&y!==o&&er(a,h,l,u,c,f,y.x,y.y)&&we(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=_;){if(v.x>=d&&v.x<=g&&v.y>=m&&v.y<=p&&v!==i&&v!==o&&er(a,h,l,u,c,f,v.x,v.y)&&we(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=x;){if(y.x>=d&&y.x<=g&&y.y>=m&&y.y<=p&&y!==i&&y!==o&&er(a,h,l,u,c,f,y.x,y.y)&&we(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function iM(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!ja(i,r)&&$d(i,n,n.next,r)&&co(i,r)&&co(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ho(n),ho(n.next),n=s=r),n=n.next}while(n!==s);return Ms(n)}function sM(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&dM(o,a)){let l=Zd(o,a);o=Ms(o,o.next),l=Ms(l,l.next),lo(o,t,e,n,i,r,0),lo(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function rM(s,t,e,n){const i=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=Kd(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(fM(c));for(i.sort(oM),r=0;r<i.length;r++)e=aM(i[r],e);return e}function oM(s,t){return s.x-t.x}function aM(s,t){const e=lM(s,t);if(!e)return t;const n=Zd(e,s);return Ms(n,n.next),Ms(e,e.next)}function lM(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&er(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),co(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&cM(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function cM(s,t){return we(s.prev,s,t.prev)<0&&we(t.next,s,s.next)<0}function hM(s,t,e,n){let i=s;do i.z===0&&(i.z=Gc(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,uM(i)}function uM(s){let t,e,n,i,r,o,a,l,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function Gc(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function fM(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function er(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function dM(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!pM(s,t)&&(co(s,t)&&co(t,s)&&mM(s,t)&&(we(s.prev,s,t.prev)||we(s,t.prev,t))||ja(s,t)&&we(s.prev,s,s.next)>0&&we(t.prev,t,t.next)>0)}function we(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ja(s,t){return s.x===t.x&&s.y===t.y}function $d(s,t,e,n){const i=ea(we(s,t,e)),r=ea(we(s,t,n)),o=ea(we(e,n,s)),a=ea(we(e,n,t));return!!(i!==r&&o!==a||i===0&&ta(s,e,t)||r===0&&ta(s,n,t)||o===0&&ta(e,s,n)||a===0&&ta(e,t,n))}function ta(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ea(s){return s>0?1:s<0?-1:0}function pM(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&$d(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function co(s,t){return we(s.prev,s,s.next)<0?we(s,t,s.next)>=0&&we(s,s.prev,t)>=0:we(s,t,s.prev)<0||we(s,s.next,t)<0}function mM(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Zd(s,t){const e=new Wc(s.i,s.x,s.y),n=new Wc(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function gf(s,t,e,n){const i=new Wc(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ho(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Wc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function _M(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class ki{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return ki.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];vf(t),xf(n,t);let o=t.length;e.forEach(vf);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,xf(n,e[l]);const a=tM.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function vf(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function xf(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class to extends ue{constructor(t=new ps([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new qt(i,3)),this.setAttribute("uv",new qt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,g=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3;const _=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:gM;let v,y=!1,T,w,E,C;_&&(v=_.getSpacedPoints(h),y=!0,f=!1,T=_.computeFrenetFrames(h,!1),w=new P,E=new P,C=new P),f||(p=0,d=0,m=0,g=0);const L=a.extractPoints(c);let M=L.shape;const S=L.holes;if(!ki.isClockWise(M)){M=M.reverse();for(let et=0,D=S.length;et<D;et++){const _t=S[et];ki.isClockWise(_t)&&(S[et]=_t.reverse())}}const O=ki.triangulateShape(M,S),k=M;for(let et=0,D=S.length;et<D;et++){const _t=S[et];M=M.concat(_t)}function G(et,D,_t){return D||console.error("THREE.ExtrudeGeometry: vec does not exist"),et.clone().addScaledVector(D,_t)}const B=M.length,j=O.length;function I(et,D,_t){let pt,ht,vt;const Ft=et.x-D.x,Tt=et.y-D.y,R=_t.x-et.x,b=_t.y-et.y,V=Ft*Ft+Tt*Tt,tt=Ft*b-Tt*R;if(Math.abs(tt)>Number.EPSILON){const rt=Math.sqrt(V),Q=Math.sqrt(R*R+b*b),It=D.x-Tt/rt,xt=D.y+Ft/rt,K=_t.x-b/Q,ct=_t.y+R/Q,H=((K-It)*b-(ct-xt)*R)/(Ft*b-Tt*R);pt=It+Ft*H-et.x,ht=xt+Tt*H-et.y;const nt=pt*pt+ht*ht;if(nt<=2)return new J(pt,ht);vt=Math.sqrt(nt/2)}else{let rt=!1;Ft>Number.EPSILON?R>Number.EPSILON&&(rt=!0):Ft<-Number.EPSILON?R<-Number.EPSILON&&(rt=!0):Math.sign(Tt)===Math.sign(b)&&(rt=!0),rt?(pt=-Tt,ht=Ft,vt=Math.sqrt(V)):(pt=Ft,ht=Tt,vt=Math.sqrt(V/2))}return new J(pt/vt,ht/vt)}const W=[];for(let et=0,D=k.length,_t=D-1,pt=et+1;et<D;et++,_t++,pt++)_t===D&&(_t=0),pt===D&&(pt=0),W[et]=I(k[et],k[_t],k[pt]);const Z=[];let st,St=W.concat();for(let et=0,D=S.length;et<D;et++){const _t=S[et];st=[];for(let pt=0,ht=_t.length,vt=ht-1,Ft=pt+1;pt<ht;pt++,vt++,Ft++)vt===ht&&(vt=0),Ft===ht&&(Ft=0),st[pt]=I(_t[pt],_t[vt],_t[Ft]);Z.push(st),St=St.concat(st)}for(let et=0;et<p;et++){const D=et/p,_t=d*Math.cos(D*Math.PI/2),pt=m*Math.sin(D*Math.PI/2)+g;for(let ht=0,vt=k.length;ht<vt;ht++){const Ft=G(k[ht],W[ht],pt);lt(Ft.x,Ft.y,-_t)}for(let ht=0,vt=S.length;ht<vt;ht++){const Ft=S[ht];st=Z[ht];for(let Tt=0,R=Ft.length;Tt<R;Tt++){const b=G(Ft[Tt],st[Tt],pt);lt(b.x,b.y,-_t)}}}const Lt=m+g;for(let et=0;et<B;et++){const D=f?G(M[et],St[et],Lt):M[et];y?(E.copy(T.normals[0]).multiplyScalar(D.x),w.copy(T.binormals[0]).multiplyScalar(D.y),C.copy(v[0]).add(E).add(w),lt(C.x,C.y,C.z)):lt(D.x,D.y,0)}for(let et=1;et<=h;et++)for(let D=0;D<B;D++){const _t=f?G(M[D],St[D],Lt):M[D];y?(E.copy(T.normals[et]).multiplyScalar(_t.x),w.copy(T.binormals[et]).multiplyScalar(_t.y),C.copy(v[et]).add(E).add(w),lt(C.x,C.y,C.z)):lt(_t.x,_t.y,u/h*et)}for(let et=p-1;et>=0;et--){const D=et/p,_t=d*Math.cos(D*Math.PI/2),pt=m*Math.sin(D*Math.PI/2)+g;for(let ht=0,vt=k.length;ht<vt;ht++){const Ft=G(k[ht],W[ht],pt);lt(Ft.x,Ft.y,u+_t)}for(let ht=0,vt=S.length;ht<vt;ht++){const Ft=S[ht];st=Z[ht];for(let Tt=0,R=Ft.length;Tt<R;Tt++){const b=G(Ft[Tt],st[Tt],pt);y?lt(b.x,b.y+v[h-1].y,v[h-1].x+_t):lt(b.x,b.y,u+_t)}}}Y(),ot();function Y(){const et=i.length/3;if(f){let D=0,_t=B*D;for(let pt=0;pt<j;pt++){const ht=O[pt];bt(ht[2]+_t,ht[1]+_t,ht[0]+_t)}D=h+p*2,_t=B*D;for(let pt=0;pt<j;pt++){const ht=O[pt];bt(ht[0]+_t,ht[1]+_t,ht[2]+_t)}}else{for(let D=0;D<j;D++){const _t=O[D];bt(_t[2],_t[1],_t[0])}for(let D=0;D<j;D++){const _t=O[D];bt(_t[0]+B*h,_t[1]+B*h,_t[2]+B*h)}}n.addGroup(et,i.length/3-et,0)}function ot(){const et=i.length/3;let D=0;gt(k,D),D+=k.length;for(let _t=0,pt=S.length;_t<pt;_t++){const ht=S[_t];gt(ht,D),D+=ht.length}n.addGroup(et,i.length/3-et,1)}function gt(et,D){let _t=et.length;for(;--_t>=0;){const pt=_t;let ht=_t-1;ht<0&&(ht=et.length-1);for(let vt=0,Ft=h+p*2;vt<Ft;vt++){const Tt=B*vt,R=B*(vt+1),b=D+pt+Tt,V=D+ht+Tt,tt=D+ht+R,rt=D+pt+R;wt(b,V,tt,rt)}}}function lt(et,D,_t){l.push(et),l.push(D),l.push(_t)}function bt(et,D,_t){Vt(et),Vt(D),Vt(_t);const pt=i.length/3,ht=x.generateTopUV(n,i,pt-3,pt-2,pt-1);Wt(ht[0]),Wt(ht[1]),Wt(ht[2])}function wt(et,D,_t,pt){Vt(et),Vt(D),Vt(pt),Vt(D),Vt(_t),Vt(pt);const ht=i.length/3,vt=x.generateSideWallUV(n,i,ht-6,ht-3,ht-2,ht-1);Wt(vt[0]),Wt(vt[1]),Wt(vt[3]),Wt(vt[1]),Wt(vt[2]),Wt(vt[3])}function Vt(et){i.push(l[et*3+0]),i.push(l[et*3+1]),i.push(l[et*3+2])}function Wt(et){r.push(et.x),r.push(et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return vM(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ba[i.type]().fromJSON(i)),new to(n,t.options)}}const gM={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new J(r,o),new J(a,l),new J(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],m=t[i*3+2],g=t[r*3],p=t[r*3+1],_=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new J(o,1-l),new J(c,1-u),new J(f,1-m),new J(g,1-_)]:[new J(a,1-l),new J(h,1-u),new J(d,1-m),new J(p,1-_)]}};function vM(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class vr extends Dh{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vr(t.radius,t.detail)}}class Ta extends ue{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new P,m=new J;for(let g=0;g<=i;g++){for(let p=0;p<=n;p++){const _=r+p/n*o;d.x=u*Math.cos(_),d.y=u*Math.sin(_),l.push(d.x,d.y,d.z),c.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,h.push(m.x,m.y)}u+=f}for(let g=0;g<i;g++){const p=g*(n+1);for(let _=0;_<n;_++){const x=_+p,v=x,y=x+n+1,T=x+n+2,w=x+1;a.push(v,y,w),a.push(y,T,w)}}this.setIndex(a),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ta(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ka extends ue{constructor(t=new ps([new J(0,.5),new J(-.5,-.5),new J(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new qt(i,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(o,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const m=f.holes;ki.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,_=m.length;p<_;p++){const x=m[p];ki.isClockWise(x)===!0&&(m[p]=x.reverse())}const g=ki.triangulateShape(d,m);for(let p=0,_=m.length;p<_;p++){const x=m[p];d=d.concat(x)}for(let p=0,_=d.length;p<_;p++){const x=d[p];i.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let p=0,_=g.length;p<_;p++){const x=g[p],v=x[0]+u,y=x[1]+u,T=x[2]+u;n.push(v,y,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return xM(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const o=e[t.shapes[i]];n.push(o)}return new Ka(n,t.curveSegments)}}function xM(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class en extends ue{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new P,f=new P,d=[],m=[],g=[],p=[];for(let _=0;_<=n;_++){const x=[],v=_/n;let y=0;_===0&&o===0?y=.5/e:_===n&&l===Math.PI&&(y=-.5/e);for(let T=0;T<=e;T++){const w=T/e;u.x=-t*Math.cos(i+w*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(i+w*r)*Math.sin(o+v*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),p.push(w+y,1-v),x.push(c++)}h.push(x)}for(let _=0;_<n;_++)for(let x=0;x<e;x++){const v=h[_][x+1],y=h[_][x],T=h[_+1][x],w=h[_+1][x+1];(_!==0||o>0)&&d.push(v,y,w),(_!==n-1||l<Math.PI)&&d.push(y,T,w)}this.setIndex(d),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(g,3)),this.setAttribute("uv",new qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new en(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class $a extends ue{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new P,u=new P,f=new P;for(let d=0;d<=n;d++)for(let m=0;m<=i;m++){const g=m/i*r,p=d/n*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(g),u.y=(t+e*Math.cos(p))*Math.sin(g),u.z=e*Math.sin(p),a.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=i;m++){const g=(i+1)*d+m-1,p=(i+1)*(d-1)+m-1,_=(i+1)*(d-1)+m,x=(i+1)*d+m;o.push(g,p,x),o.push(p,_,x)}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $a(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Lh extends ue{constructor(t=new Xa(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,l=new P,c=new J;let h=new P;const u=[],f=[],d=[],m=[];g(),this.setIndex(m),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(d,2));function g(){for(let v=0;v<e;v++)p(v);p(r===!1?e:0),x(),_()}function p(v){h=t.getPointAt(v/e,h);const y=o.normals[v],T=o.binormals[v];for(let w=0;w<=i;w++){const E=w/i*Math.PI*2,C=Math.sin(E),L=-Math.cos(E);l.x=L*y.x+C*T.x,l.y=L*y.y+C*T.y,l.z=L*y.z+C*T.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function _(){for(let v=1;v<=e;v++)for(let y=1;y<=i;y++){const T=(i+1)*(v-1)+(y-1),w=(i+1)*v+(y-1),E=(i+1)*v+y,C=(i+1)*(v-1)+y;m.push(T,w,C),m.push(w,E,C)}}function x(){for(let v=0;v<=e;v++)for(let y=0;y<=i;y++)c.x=v/e,c.y=y/i,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Lh(new ba[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class yM extends ze{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ye extends ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bd,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class MM extends ye{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ih extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class SM extends Ih{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const zl=new Zt,yf=new P,Mf=new P;class Jd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eh,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;yf.setFromMatrixPosition(t.matrixWorld),e.position.copy(yf),Mf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Mf),e.updateMatrixWorld(),zl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sf=new Zt,Hr=new P,kl=new P;class wM extends Jd{constructor(){super(new An(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new J(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Hr),kl.copy(n.position),kl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(kl),n.updateMatrixWorld(),i.makeTranslation(-Hr.x,-Hr.y,-Hr.z),Sf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sf)}}class Uh extends Ih{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class EM extends Jd{constructor(){super(new bh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bM extends Ih{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new EM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Qd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=wf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=wf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function wf(){return performance.now()}const Ef=new Zt;class TM{constructor(t,e,n=0,i=1/0){this.ray=new xo(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new wh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ef.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ef),this}intersectObject(t,e=!0,n=[]){return Xc(t,this,n,e),n.sort(bf),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Xc(t[i],this,n,e);return n.sort(bf),n}}function bf(s,t){return s.distance-t.distance}function Xc(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Xc(r[o],t,e,!0)}}class Tf{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class AM extends Es{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fh);function _i(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function tp(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Pn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},xr={duration:.5,overwrite:!1,delay:0},Nh,rn,Me,Fn=1e8,me=1/Fn,Yc=Math.PI*2,CM=Yc/4,RM=0,ep=Math.sqrt,PM=Math.cos,DM=Math.sin,Ye=function(t){return typeof t=="string"},Ce=function(t){return typeof t=="function"},Si=function(t){return typeof t=="number"},Oh=function(t){return typeof t>"u"},si=function(t){return typeof t=="object"},mn=function(t){return t!==!1},Fh=function(){return typeof window<"u"},na=function(t){return Ce(t)||Ye(t)},np=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},on=Array.isArray,qc=/(?:-?\.?\d|\.)+/gi,ip=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,nr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Hl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,sp=/[+-]=-?[.\d]+/,rp=/[^,'"\[\]\s]+/gi,LM=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Se,$n,jc,Bh,Dn={},Aa={},op,ap=function(t){return(Aa=Ss(t,Dn))&&yn},zh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},uo=function(t,e){return!e&&console.warn(t)},lp=function(t,e){return t&&(Dn[t]=e)&&Aa&&(Aa[t]=e)||Dn},fo=function(){return 0},IM={suppressEvents:!0,isStart:!0,kill:!1},da={suppressEvents:!0,kill:!1},UM={suppressEvents:!0},kh={},Hi=[],Kc={},cp,Tn={},Vl={},Af=30,pa=[],Hh="",Vh=function(t){var e=t[0],n,i;if(si(e)||Ce(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=pa.length;i--&&!pa[i].targetTest(e););n=pa[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Ip(t[i],n)))||t.splice(i,1);return t},ms=function(t){return t._gsap||Vh(Bn(t))[0]._gsap},hp=function(t,e,n){return(n=t[e])&&Ce(n)?t[e]():Oh(n)&&t.getAttribute&&t.getAttribute(e)||n},_n=function(t,e){return(t=t.split(",")).forEach(e)||t},De=function(t){return Math.round(t*1e5)/1e5||0},We=function(t){return Math.round(t*1e7)/1e7||0},lr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},NM=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Ca=function(){var t=Hi.length,e=Hi.slice(0),n,i;for(Kc={},Hi.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},up=function(t,e,n,i){Hi.length&&!rn&&Ca(),t.render(e,n,rn&&e<0&&(t._initted||t._startAt)),Hi.length&&!rn&&Ca()},fp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(rp).length<2?e:Ye(t)?t.trim():t},dp=function(t){return t},Hn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},OM=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Ss=function(t,e){for(var n in e)t[n]=e[n];return t},Cf=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=si(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},Ra=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},eo=function(t){var e=t.parent||Se,n=t.keyframes?OM(on(t.keyframes)):Hn;if(mn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},FM=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},pp=function(t,e,n,i,r){var o=t[i],a;if(r)for(a=e[r];o&&o[r]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Za=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,o=e._next;r?r._next=o:t[n]===e&&(t[n]=o),o?o._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},Xi=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},_s=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},BM=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},$c=function(t,e,n,i){return t._startAt&&(rn?t._startAt.revert(da):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},zM=function s(t){return!t||t._ts&&s(t.parent)},Rf=function(t){return t._repeat?yr(t._tTime,t=t.duration()+t._rDelay)*t:0},yr=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},Pa=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Ja=function(t){return t._end=We(t._start+(t._tDur/Math.abs(t._ts||t._rts||me)||0))},Qa=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=We(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ja(t),n._dirty||_s(n,t)),t},mp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Pa(t.rawTime(),e),(!e._dur||yo(0,e.totalDuration(),n)-e._tTime>me)&&e.render(n,!0)),_s(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-me}},Jn=function(t,e,n,i){return e.parent&&Xi(e),e._start=We((Si(n)?n:n||t!==Se?Un(t,n,e):t._time)+e._delay),e._end=We(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),pp(t,e,"_first","_last",t._sort?"_start":0),Zc(e)||(t._recent=e),i||mp(t,e),t._ts<0&&Qa(t,t._tTime),t},_p=function(t,e){return(Dn.ScrollTrigger||zh("scrollTrigger",e))&&Dn.ScrollTrigger.create(e,t)},gp=function(t,e,n,i,r){if(Wh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!rn&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&cp!==Cn.frame)return Hi.push(t),t._lazy=[r,i],1},kM=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Zc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},HM=function(t,e,n,i){var r=t.ratio,o=e<0||!e&&(!t._start&&kM(t)&&!(!t._initted&&Zc(t))||(t._ts<0||t._dp._ts<0)&&!Zc(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=yo(0,t._tDur,e),h=yr(l,a),t._yoyo&&h&1&&(o=1-o),h!==yr(t._tTime,a)&&(r=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==r||rn||i||t._zTime===me||!e&&t._zTime){if(!t._initted&&gp(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?me:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&$c(t,e,n,!0),t._onUpdate&&!n&&Rn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Rn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Xi(t,1),!n&&!rn&&(Rn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},VM=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Mr=function(t,e,n,i){var r=t._repeat,o=We(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=r?r<0?1e10:We(o*(r+1)+t._rDelay*r):o,a>0&&!i&&Qa(t,t._tTime=t._tDur*a),t.parent&&Ja(t),n||_s(t.parent,t),t},Pf=function(t){return t instanceof hn?_s(t):Mr(t,t._dur)},GM={_start:0,endTime:fo,totalDuration:fo},Un=function s(t,e,n){var i=t.labels,r=t._recent||GM,o=t.duration()>=Fn?r.endTime(!1):t._dur,a,l,c;return Ye(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?r:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(on(n)?n[0]:n).totalDuration()),a>1?s(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},no=function(t,e,n){var i=Si(e[1]),r=(i?2:1)+(t<2?0:1),o=e[r],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=mn(l.vars.inherit)&&l.parent;o.immediateRender=mn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[r-1]}return new Ue(e[0],o,e[r+1])},$i=function(t,e){return t||t===0?e(t):e},yo=function(t,e,n){return n<t?t:n>e?e:n},tn=function(t,e){return!Ye(t)||!(e=LM.exec(t))?"":e[1]},WM=function(t,e,n){return $i(n,function(i){return yo(t,e,i)})},Jc=[].slice,vp=function(t,e){return t&&si(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&si(t[0]))&&!t.nodeType&&t!==$n},XM=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return Ye(i)&&!e||vp(i,1)?(r=n).push.apply(r,Bn(i)):n.push(i)})||n},Bn=function(t,e,n){return Me&&!e&&Me.selector?Me.selector(t):Ye(t)&&!n&&(jc||!Sr())?Jc.call((e||Bh).querySelectorAll(t),0):on(t)?XM(t,n):vp(t)?Jc.call(t,0):t?[t]:[]},Qc=function(t){return t=Bn(t)[0]||uo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Bn(e,n.querySelectorAll?n:n===t?uo("Invalid scope")||Bh.createElement("div"):t)}},xp=function(t){return t.sort(function(){return .5-Math.random()})},yp=function(t){if(Ce(t))return t;var e=si(t)?t:{each:t},n=gs(e.ease),i=e.from||0,r=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,u=i;return Ye(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],u=i[1]),function(f,d,m){var g=(m||e).length,p=o[g],_,x,v,y,T,w,E,C,L;if(!p){if(L=e.grid==="auto"?0:(e.grid||[1,Fn])[1],!L){for(E=-Fn;E<(E=m[L++].getBoundingClientRect().left)&&L<g;);L<g&&L--}for(p=o[g]=[],_=l?Math.min(L,g)*h-.5:i%L,x=L===Fn?0:l?g*u/L-.5:i/L|0,E=0,C=Fn,w=0;w<g;w++)v=w%L-_,y=x-(w/L|0),p[w]=T=c?Math.abs(c==="y"?y:v):ep(v*v+y*y),T>E&&(E=T),T<C&&(C=T);i==="random"&&xp(p),p.max=E-C,p.min=C,p.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(L>g?g-1:c?c==="y"?g/L:L:Math.max(L,g/L))||0)*(i==="edges"?-1:1),p.b=g<0?r-g:r,p.u=tn(e.amount||e.each)||0,n=n&&g<0?Pp(n):n}return g=(p[f]-p.min)/p.max||0,We(p.b+(n?n(g):g)*p.v)+p.u}},th=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=We(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Si(n)?0:tn(n))}},Mp=function(t,e){var n=on(t),i,r;return!n&&si(t)&&(i=n=t.radius||Fn,t.values?(t=Bn(t.values),(r=!Si(t[0]))&&(i*=i)):t=th(t.increment)),$i(e,n?Ce(t)?function(o){return r=t(o),Math.abs(r-o)<=i?r:o}:function(o){for(var a=parseFloat(r?o.x:o),l=parseFloat(r?o.y:0),c=Fn,h=0,u=t.length,f,d;u--;)r?(f=t[u].x-a,d=t[u].y-l,f=f*f+d*d):f=Math.abs(t[u]-a),f<c&&(c=f,h=u);return h=!i||c<=i?t[h]:o,r||h===o||Si(o)?h:h+tn(o)}:th(t))},Sp=function(t,e,n,i){return $i(on(t)?!e:n===!0?!!(n=0):!i,function(){return on(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},YM=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,o){return o(r)},i)}},qM=function(t,e){return function(n){return t(parseFloat(n))+(e||tn(n))}},jM=function(t,e,n){return Ep(t,e,0,1,n)},wp=function(t,e,n){return $i(n,function(i){return t[~~e(i)]})},KM=function s(t,e,n){var i=e-t;return on(t)?wp(t,s(0,t.length),e):$i(n,function(r){return(i+(r-t)%i)%i+t})},$M=function s(t,e,n){var i=e-t,r=i*2;return on(t)?wp(t,s(0,t.length-1),e):$i(n,function(o){return o=(r+(o-t)%r)%r||0,t+(o>i?r-o:o)})},po=function(t){for(var e=0,n="",i,r,o,a;~(i=t.indexOf("random(",e));)o=t.indexOf(")",i),a=t.charAt(i+7)==="[",r=t.substr(i+7,o-i-7).match(a?rp:qc),n+=t.substr(e,i-e)+Sp(a?r:+r[0],a?0:+r[1],+r[2]||1e-5),e=o+1;return n+t.substr(e,t.length-e)},Ep=function(t,e,n,i,r){var o=e-t,a=i-n;return $i(r,function(l){return n+((l-t)/o*a||0)})},ZM=function s(t,e,n,i){var r=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!r){var o=Ye(t),a={},l,c,h,u,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(on(t)&&!on(e)){for(h=[],u=t.length,f=u-2,c=1;c<u;c++)h.push(s(t[c-1],t[c]));u--,r=function(m){m*=u;var g=Math.min(f,~~m);return h[g](m-g)},n=e}else i||(t=Ss(on(t)?[]:{},t));if(!h){for(l in e)Gh.call(a,t,l,"get",e[l]);r=function(m){return qh(m,a)||(o?t.p:t)}}}return $i(n,r)},Df=function(t,e,n){var i=t.labels,r=Fn,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&r>(a=Math.abs(a))&&(l=o,r=a);return l},Rn=function(t,e,n){var i=t.vars,r=i[e],o=Me,a=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Hi.length&&Ca(),a&&(Me=a),h=l?r.apply(c,l):r.call(c),Me=o,h},qr=function(t){return Xi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!rn),t.progress()<1&&Rn(t,"onInterrupt"),t},ir,bp=[],Tp=function(t){if(t)if(t=!t.name&&t.default||t,Fh()||t.headless){var e=t.name,n=Ce(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:fo,render:qh,add:Gh,kill:dS,modifier:fS,rawVars:0},o={targetTest:0,get:0,getSetter:Yh,aliases:{},register:0};if(Sr(),t!==i){if(Tn[e])return;Hn(i,Hn(Ra(t,r),o)),Ss(i.prototype,Ss(r,Ra(t,o))),Tn[i.prop=e]=i,t.targetTest&&(pa.push(i),kh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}lp(e,i),t.register&&t.register(yn,i,gn)}else bp.push(t)},fe=255,jr={aqua:[0,fe,fe],lime:[0,fe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,fe],navy:[0,0,128],white:[fe,fe,fe],olive:[128,128,0],yellow:[fe,fe,0],orange:[fe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[fe,0,0],pink:[fe,192,203],cyan:[0,fe,fe],transparent:[fe,fe,fe,0]},Gl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*fe+.5|0},Ap=function(t,e,n){var i=t?Si(t)?[t>>16,t>>8&fe,t&fe]:0:jr.black,r,o,a,l,c,h,u,f,d,m;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),jr[t])i=jr[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+r+r+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&fe,i&fe,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&fe,t&fe]}else if(t.substr(0,3)==="hsl"){if(i=m=t.match(qc),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,r=h*2-o,i.length>3&&(i[3]*=1),i[0]=Gl(l+1/3,r,o),i[1]=Gl(l,r,o),i[2]=Gl(l-1/3,r,o);else if(~t.indexOf("="))return i=t.match(ip),n&&i.length<4&&(i[3]=1),i}else i=t.match(qc)||jr.transparent;i=i.map(Number)}return e&&!m&&(r=i[0]/fe,o=i[1]/fe,a=i[2]/fe,u=Math.max(r,o,a),f=Math.min(r,o,a),h=(u+f)/2,u===f?l=c=0:(d=u-f,c=h>.5?d/(2-u-f):d/(u+f),l=u===r?(o-a)/d+(o<a?6:0):u===o?(a-r)/d+2:(r-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Cp=function(t){var e=[],n=[],i=-1;return t.split(Vi).forEach(function(r){var o=r.match(nr)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Lf=function(t,e,n){var i="",r=(t+i).match(Vi),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!r)return t;if(r=r.map(function(f){return(f=Ap(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=Cp(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Vi,"1").split(nr),u=c.length-1;a<u;a++)i+=c[a]+(~l.indexOf(a)?r.shift()||o+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Vi),u=c.length-1;a<u;a++)i+=c[a]+r[a];return i+c[u]},Vi=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in jr)s+="|"+t+"\\b";return new RegExp(s+")","gi")}(),JM=/hsl[a]?\(/,Rp=function(t){var e=t.join(" "),n;if(Vi.lastIndex=0,Vi.test(e))return n=JM.test(e),t[1]=Lf(t[1],n),t[0]=Lf(t[0],n,Cp(t[1])),!0},mo,Cn=function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,o=r,a=[],l,c,h,u,f,d,m=function g(p){var _=s()-i,x=p===!0,v,y,T,w;if((_>t||_<0)&&(n+=_-e),i+=_,T=i-n,v=T-o,(v>0||x)&&(w=++u.frame,f=T-u.time*1e3,u.time=T=T/1e3,o+=v+(v>=r?4:r-v),y=1),x||(l=c(g)),y)for(d=0;d<a.length;d++)a[d](T,f,w,p)};return u={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){op&&(!jc&&Fh()&&($n=jc=window,Bh=$n.document||{},Dn.gsap=yn,($n.gsapVersions||($n.gsapVersions=[])).push(yn.version),ap(Aa||$n.GreenSockGlobals||!$n.gsap&&$n||{}),bp.forEach(Tp)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(p){return setTimeout(p,o-u.time*1e3+1|0)},mo=1,m(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),mo=0,c=fo},lagSmoothing:function(p,_){t=p||1/0,e=Math.min(_||33,t)},fps:function(p){r=1e3/(p||240),o=u.time*1e3+r},add:function(p,_,x){var v=_?function(y,T,w,E){p(y,T,w,E),u.remove(v)}:p;return u.remove(p),a[x?"unshift":"push"](v),Sr(),v},remove:function(p,_){~(_=a.indexOf(p))&&a.splice(_,1)&&d>=_&&d--},_listeners:a},u}(),Sr=function(){return!mo&&Cn.wake()},Jt={},QM=/^[\d.\-M][\d.\-,\s]/,tS=/["']/g,eS=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,o=n.length,a,l,c;r<o;r++)l=n[r],a=r!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(tS,"").trim():+c,i=l.substr(a+1).trim();return e},nS=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},iS=function(t){var e=(t+"").split("("),n=Jt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[eS(e[1])]:nS(t).split(",").map(fp)):Jt._CE&&QM.test(t)?Jt._CE("",t):n},Pp=function(t){return function(e){return 1-t(1-e)}},Dp=function s(t,e){for(var n=t._first,i;n;)n instanceof hn?s(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?s(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},gs=function(t,e){return t&&(Ce(t)?t:Jt[t]||iS(t))||e},Cs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},o;return _n(t,function(a){Jt[a]=Dn[a]=r,Jt[o=a.toLowerCase()]=n;for(var l in r)Jt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Jt[a+"."+l]=r[l]}),r},Lp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Wl=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),o=r/Yc*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*DM((h-o)*r)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Lp(a);return r=Yc/r,l.config=function(c,h){return s(t,c,h)},l},Xl=function s(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:Lp(n);return i.config=function(r){return s(t,r)},i};_n("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Cs(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Jt.Linear.easeNone=Jt.none=Jt.Linear.easeIn;Cs("Elastic",Wl("in"),Wl("out"),Wl());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(a){return a<e?s*a*a:a<n?s*Math.pow(a-1.5/t,2)+.75:a<i?s*(a-=2.25/t)*a+.9375:s*Math.pow(a-2.625/t,2)+.984375};Cs("Bounce",function(o){return 1-r(1-o)},r)})(7.5625,2.75);Cs("Expo",function(s){return s?Math.pow(2,10*(s-1)):0});Cs("Circ",function(s){return-(ep(1-s*s)-1)});Cs("Sine",function(s){return s===1?1:-PM(s*CM)+1});Cs("Back",Xl("in"),Xl("out"),Xl());Jt.SteppedEase=Jt.steps=Dn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,o=1-me;return function(a){return((i*yo(0,o,a)|0)+r)*n}}};xr.ease=Jt["quad.out"];_n("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Hh+=s+","+s+"Params,"});var Ip=function(t,e){this.id=RM++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:hp,this.set=e?e.getSetter:Yh},_o=function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Mr(this,+e.duration,1,1),this.data=e.data,Me&&(this._ctx=Me,Me.data.push(this)),mo||Cn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Mr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Sr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Qa(this,n),!r._dp||r.parent||mp(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Jn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===me||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),up(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Rf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Rf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?yr(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-me?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Pa(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-me?0:this._rts,this.totalTime(yo(-Math.abs(this._delay),this._tDur,r),i!==!1),Ja(this),BM(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Sr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==me&&(this._tTime-=me)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Jn(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(mn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Pa(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=UM);var i=rn;return rn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),rn=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Pf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Pf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Un(this,n),mn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,mn(i))},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-me:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-me,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-me)},t.eventCallback=function(n,i,r){var o=this.vars;return arguments.length>1?(i?(o[n]=i,r&&(o[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this;return new Promise(function(r){var o=Ce(n)?n:dp,a=function(){var c=i.then;i.then=null,Ce(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),r(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},t.kill=function(){qr(this)},s}();Hn(_o.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-me,_prom:0,_ps:!1,_rts:1});var hn=function(s){tp(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=mn(n.sortChildren),Se&&Jn(n.parent||Se,_i(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&_p(_i(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,o){return no(0,arguments,this),this},e.from=function(i,r,o){return no(1,arguments,this),this},e.fromTo=function(i,r,o,a){return no(2,arguments,this),this},e.set=function(i,r,o){return r.duration=0,r.parent=this,eo(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Ue(i,r,Un(this,o),1),this},e.call=function(i,r,o){return Jn(this,Ue.delayedCall(0,i,r),o)},e.staggerTo=function(i,r,o,a,l,c,h){return o.duration=r,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new Ue(i,o,Un(this,l)),this},e.staggerFrom=function(i,r,o,a,l,c,h){return o.runBackwards=1,eo(o).immediateRender=mn(o.immediateRender),this.staggerTo(i,r,o,a,l,c,h)},e.staggerFromTo=function(i,r,o,a,l,c,h,u){return a.startAt=o,eo(a).immediateRender=mn(a.immediateRender),this.staggerTo(i,r,a,l,c,h,u)},e.render=function(i,r,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:We(i),u=this._zTime<0!=i<0&&(this._initted||!c),f,d,m,g,p,_,x,v,y,T,w,E;if(this!==Se&&h>l&&i>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),f=h,y=this._start,v=this._ts,_=!v,u&&(c||(a=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,o);if(f=We(h%p),h===l?(g=this._repeat,f=c):(g=~~(h/p),g&&g===h/p&&(f=c,g--),f>c&&(f=c)),T=yr(this._tTime,p),!a&&this._tTime&&T!==g&&this._tTime-T*p-this._dur<=0&&(T=g),w&&g&1&&(f=c-f,E=1),g!==T&&!this._lock){var C=w&&T&1,L=C===(w&&g&1);if(g<T&&(C=!C),a=C?0:h%c?c:h,this._lock=1,this.render(a||(E?0:We(g*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&Rn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,L&&(this._lock=2,a=C?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;Dp(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=VM(this,We(a),We(f)),x&&(h-=f-(f=x._start))),this._tTime=h,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!r&&!g&&(Rn(this,"onStart"),this._tTime!==h))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(m=d._next,(d._act||f>=d._start)&&d._ts&&x!==d){if(d.parent!==this)return this.render(i,r,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,r,o),f!==this._time||!this._ts&&!_){x=0,m&&(h+=this._zTime=-me);break}}d=m}else{d=this._last;for(var M=i<0?i:f;d;){if(m=d._prev,(d._act||M<=d._end)&&d._ts&&x!==d){if(d.parent!==this)return this.render(i,r,o);if(d.render(d._ts>0?(M-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(M-d._start)*d._ts,r,o||rn&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!_){x=0,m&&(h+=this._zTime=M?-me:me);break}}d=m}}if(x&&!r&&(this.pause(),x.render(f>=a?0:-me)._zTime=f>=a?1:-1,this._ts))return this._start=y,Ja(this),this.render(i,r,o);this._onUpdate&&!r&&Rn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(y===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Xi(this,1),!r&&!(i<0&&!a)&&(h||a||!l)&&(Rn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var o=this;if(Si(r)||(r=Un(this,r,i)),!(i instanceof _o)){if(on(i))return i.forEach(function(a){return o.add(a,r)}),this;if(Ye(i))return this.addLabel(i,r);if(Ce(i))i=Ue.delayedCall(0,i);else return this}return this!==i?Jn(this,i,r):this},e.getChildren=function(i,r,o,a){i===void 0&&(i=!0),r===void 0&&(r=!0),o===void 0&&(o=!0),a===void 0&&(a=-Fn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ue?r&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,o)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),o=r.length;o--;)if(r[o].vars.id===i)return r[o]},e.remove=function(i){return Ye(i)?this.removeLabel(i):Ce(i)?this.killTweensOf(i):(Za(this,i),i===this._recent&&(this._recent=this._last),_s(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=We(Cn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Un(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,o){var a=Ue.delayedCall(0,r||fo,o);return a.data="isPause",this._hasPause=1,Jn(this,a,Un(this,i))},e.removePause=function(i){var r=this._first;for(i=Un(this,i);r;)r._start===i&&r.data==="isPause"&&Xi(r),r=r._next},e.killTweensOf=function(i,r,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Ni!==a[l]&&a[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var o=[],a=Bn(i),l=this._first,c=Si(r),h;l;)l instanceof Ue?NM(l._targets,a)&&(c?(!Ni||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&o.push(l):(h=l.getTweensOf(a,r)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,r){r=r||{};var o=this,a=Un(o,i),l=r,c=l.startAt,h=l.onStart,u=l.onStartParams,f=l.immediateRender,d,m=Ue.to(o,Hn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||me,onStart:function(){if(o.pause(),!d){var p=r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());m._dur!==p&&Mr(m,p,0,1).render(m._time,!0,!0),d=1}h&&h.apply(m,u||[])}},r));return f?m.render(0):m},e.tweenFromTo=function(i,r,o){return this.tweenTo(r,Hn({startAt:{time:Un(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Df(this,Un(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Df(this,Un(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+me)},e.shiftChildren=function(i,r,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(r)for(c in l)l[c]>=o&&(l[c]+=i);return _s(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,o;r;)o=r._next,this.remove(r),r=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),_s(this)},e.totalDuration=function(i){var r=0,o=this,a=o._last,l=Fn,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Jn(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(r-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=h/o._ts,o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=c;Mr(o,o===Se&&o._time>r?o._time:r,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(Se._ts&&(up(Se,Pa(i,Se)),cp=Cn.frame),Cn.frame>=Af){Af+=Pn.autoSleep||120;var r=Se._first;if((!r||!r._ts)&&Pn.autoSleep&&Cn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Cn.sleep()}}},t}(_o);Hn(hn.prototype,{_lock:0,_hasPause:0,_forcing:0});var sS=function(t,e,n,i,r,o,a){var l=new gn(this._pt,t,e,0,1,zp,null,r),c=0,h=0,u,f,d,m,g,p,_,x;for(l.b=n,l.e=i,n+="",i+="",(_=~i.indexOf("random("))&&(i=po(i)),o&&(x=[n,i],o(x,t,e),n=x[0],i=x[1]),f=n.match(Hl)||[];u=Hl.exec(i);)m=u[0],g=i.substring(c,u.index),d?d=(d+1)%5:g.substr(-5)==="rgba("&&(d=1),m!==f[h++]&&(p=parseFloat(f[h-1])||0,l._pt={_next:l._pt,p:g||h===1?g:",",s:p,c:m.charAt(1)==="="?lr(p,m)-p:parseFloat(m)-p,m:d&&d<4?Math.round:0},c=Hl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(sp.test(i)||_)&&(l.e=0),this._pt=l,l},Gh=function(t,e,n,i,r,o,a,l,c,h){Ce(i)&&(i=i(r||0,t,o));var u=t[e],f=n!=="get"?n:Ce(u)?c?t[e.indexOf("set")||!Ce(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,d=Ce(u)?c?cS:Fp:Xh,m;if(Ye(i)&&(~i.indexOf("random(")&&(i=po(i)),i.charAt(1)==="="&&(m=lr(f,i)+(tn(f)||0),(m||m===0)&&(i=m))),!h||f!==i||eh)return!isNaN(f*i)&&i!==""?(m=new gn(this._pt,t,e,+f||0,i-(f||0),typeof u=="boolean"?uS:Bp,0,d),c&&(m.fp=c),a&&m.modifier(a,this,t),this._pt=m):(!u&&!(e in t)&&zh(e,i),sS.call(this,t,e,f,i,d,l||Pn.stringFilter,c))},rS=function(t,e,n,i,r){if(Ce(t)&&(t=io(t,r,e,n,i)),!si(t)||t.style&&t.nodeType||on(t)||np(t))return Ye(t)?io(t,r,e,n,i):t;var o={},a;for(a in t)o[a]=io(t[a],r,e,n,i);return o},Up=function(t,e,n,i,r,o){var a,l,c,h;if(Tn[t]&&(a=new Tn[t]).init(r,a.rawVars?e[t]:rS(e[t],i,r,o,n),n,i,o)!==!1&&(n._pt=l=new gn(n._pt,r,t,0,1,a.render,a,0,a.priority),n!==ir))for(c=n._ptLookup[n._targets.indexOf(r)],h=a._props.length;h--;)c[a._props[h]]=l;return a},Ni,eh,Wh=function s(t,e,n){var i=t.vars,r=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,f=i.keyframes,d=i.autoRevert,m=t._dur,g=t._startAt,p=t._targets,_=t.parent,x=_&&_.data==="nested"?_.vars.targets:p,v=t._overwrite==="auto"&&!Nh,y=t.timeline,T,w,E,C,L,M,S,N,O,k,G,B,j;if(y&&(!f||!r)&&(r="none"),t._ease=gs(r,xr.ease),t._yEase=u?Pp(gs(u===!0?r:u,xr.ease)):0,u&&t._yoyo&&!t._repeat&&(u=t._yEase,t._yEase=t._ease,t._ease=u),t._from=!y&&!!i.runBackwards,!y||f&&!i.stagger){if(N=p[0]?ms(p[0]).harness:0,B=N&&i[N.prop],T=Ra(i,kh),g&&(g._zTime<0&&g.progress(1),e<0&&h&&a&&!d?g.render(-1,!0):g.revert(h&&m?da:IM),g._lazy=0),o){if(Xi(t._startAt=Ue.set(p,Hn({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!g&&mn(l),startAt:null,delay:0,onUpdate:c&&function(){return Rn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(rn||!a&&!d)&&t._startAt.revert(da),a&&m&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&m&&!g){if(e&&(a=!1),E=Hn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&mn(l),immediateRender:a,stagger:0,parent:_},T),B&&(E[N.prop]=B),Xi(t._startAt=Ue.set(p,E)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(rn?t._startAt.revert(da):t._startAt.render(-1,!0)),t._zTime=e,!a)s(t._startAt,me,me);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&mn(l)||l&&!m,w=0;w<p.length;w++){if(L=p[w],S=L._gsap||Vh(p)[w]._gsap,t._ptLookup[w]=k={},Kc[S.id]&&Hi.length&&Ca(),G=x===p?w:x.indexOf(L),N&&(O=new N).init(L,B||T,t,G,x)!==!1&&(t._pt=C=new gn(t._pt,L,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(I){k[I]=C}),O.priority&&(M=1)),!N||B)for(E in T)Tn[E]&&(O=Up(E,T,t,G,L,x))?O.priority&&(M=1):k[E]=C=Gh.call(t,L,E,"get",T[E],G,x,0,i.stringFilter);t._op&&t._op[w]&&t.kill(L,t._op[w]),v&&t._pt&&(Ni=t,Se.killTweensOf(L,k,t.globalTime(e)),j=!t.parent,Ni=0),t._pt&&l&&(Kc[S.id]=1)}M&&kp(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!j,f&&e<=0&&y.render(Fn,!0,!0)},oS=function(t,e,n,i,r,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,f,d;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(h=f[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return eh=1,t.vars[e]="+=0",Wh(t,a),eh=0,l?uo(e+" not eligible for reset"):1;c.push(h)}for(d=c.length;d--;)u=c[d],h=u._pt||u,h.s=(i||i===0)&&!r?i:h.s+(i||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=De(n)+tn(u.e)),u.b&&(u.b=h.s+tn(u.b))},aS=function(t,e){var n=t[0]?ms(t[0]).harness:0,i=n&&n.aliases,r,o,a,l;if(!i)return e;r=Ss({},e);for(o in i)if(o in r)for(l=i[o].split(","),a=l.length;a--;)r[l[a]]=r[o];return r},lS=function(t,e,n,i){var r=e.ease||i||"power1.inOut",o,a;if(on(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:r})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:r})},io=function(t,e,n,i,r){return Ce(t)?t.call(e,n,i,r):Ye(t)&&~t.indexOf("random(")?po(t):t},Np=Hh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Op={};_n(Np+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Op[s]=1});var Ue=function(s){tp(t,s);function t(n,i,r,o){var a;typeof i=="number"&&(r.duration=i,i=r,r=null),a=s.call(this,o?i:eo(i))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,f=l.stagger,d=l.overwrite,m=l.keyframes,g=l.defaults,p=l.scrollTrigger,_=l.yoyoEase,x=i.parent||Se,v=(on(n)||np(n)?Si(n[0]):"length"in i)?[n]:Bn(n),y,T,w,E,C,L,M,S;if(a._targets=v.length?Vh(v):uo("GSAP target "+n+" not found. https://gsap.com",!Pn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,m||f||na(c)||na(h)){if(i=a.vars,y=a.timeline=new hn({data:"nested",defaults:g||{},targets:x&&x.data==="nested"?x.vars.targets:v}),y.kill(),y.parent=y._dp=_i(a),y._start=0,f||na(c)||na(h)){if(E=v.length,M=f&&yp(f),si(f))for(C in f)~Np.indexOf(C)&&(S||(S={}),S[C]=f[C]);for(T=0;T<E;T++)w=Ra(i,Op),w.stagger=0,_&&(w.yoyoEase=_),S&&Ss(w,S),L=v[T],w.duration=+io(c,_i(a),T,L,v),w.delay=(+io(h,_i(a),T,L,v)||0)-a._delay,!f&&E===1&&w.delay&&(a._delay=h=w.delay,a._start+=h,w.delay=0),y.to(L,w,M?M(T,L,v):0),y._ease=Jt.none;y.duration()?c=h=0:a.timeline=0}else if(m){eo(Hn(y.vars.defaults,{ease:"none"})),y._ease=gs(m.ease||i.ease||"none");var N=0,O,k,G;if(on(m))m.forEach(function(B){return y.to(v,B,">")}),y.duration();else{w={};for(C in m)C==="ease"||C==="easeEach"||lS(C,m[C],w,m.easeEach);for(C in w)for(O=w[C].sort(function(B,j){return B.t-j.t}),N=0,T=0;T<O.length;T++)k=O[T],G={ease:k.e,duration:(k.t-(T?O[T-1].t:0))/100*c},G[C]=k.v,y.to(v,G,N),N+=G.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||a.duration(c=y.duration())}else a.timeline=0;return d===!0&&!Nh&&(Ni=_i(a),Se.killTweensOf(v),Ni=0),Jn(x,_i(a),r),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(u||!c&&!m&&a._start===We(x._time)&&mn(u)&&zM(_i(a))&&x.data!=="nested")&&(a._tTime=-me,a.render(Math.max(0,-h)||0)),p&&_p(_i(a),p),a}var e=t.prototype;return e.render=function(i,r,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-me&&!h?l:i<me?0:i,f,d,m,g,p,_,x,v,y;if(!c)HM(this,i,r,o);else if(u!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h){if(f=u,v=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+i,r,o);if(f=We(u%g),u===l?(m=this._repeat,f=c):(m=~~(u/g),m&&m===We(u/g)&&(f=c,m--),f>c&&(f=c)),_=this._yoyo&&m&1,_&&(y=this._yEase,f=c-f),p=yr(this._tTime,g),f===a&&!o&&this._initted&&m===p)return this._tTime=u,this;m!==p&&(v&&this._yEase&&Dp(v,_),this.vars.repeatRefresh&&!_&&!this._lock&&this._time!==g&&this._initted&&(this._lock=o=1,this.render(We(g*m),!0).invalidate()._lock=0))}if(!this._initted){if(gp(this,h?i:f,o,r,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&m!==p))return this;if(c!==this._dur)return this.render(i,r,o)}if(this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(y||this._ease)(f/c),this._from&&(this.ratio=x=1-x),f&&!a&&!r&&!m&&(Rn(this,"onStart"),this._tTime!==u))return this;for(d=this._pt;d;)d.r(x,d.d),d=d._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),r,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&$c(this,i,r,o),Rn(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!r&&this.parent&&Rn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&$c(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Xi(this,1),!r&&!(h&&!a)&&(u||a||_)&&(Rn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,o,a,l){mo||Cn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Wh(this,c),h=this._ease(c/this._dur),oS(this,i,r,o,a,h,c,l)?this.resetTo(i,r,o,a,1):(Qa(this,0),this.parent||pp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?qr(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Ni&&Ni.vars.overwrite!==!0)._first||qr(this),this.parent&&o!==this.timeline.totalDuration()&&Mr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Bn(i):a,c=this._ptLookup,h=this._pt,u,f,d,m,g,p,_;if((!r||r==="all")&&FM(a,l))return r==="all"&&(this._pt=0),qr(this);for(u=this._op=this._op||[],r!=="all"&&(Ye(r)&&(g={},_n(r,function(x){return g[x]=1}),r=g),r=aS(a,r)),_=a.length;_--;)if(~l.indexOf(a[_])){f=c[_],r==="all"?(u[_]=r,m=f,d={}):(d=u[_]=u[_]||{},m=r);for(g in m)p=f&&f[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&Za(this,p,"_pt"),delete f[g]),d!=="all"&&(d[g]=1)}return this._initted&&!this._pt&&h&&qr(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return no(1,arguments)},t.delayedCall=function(i,r,o,a){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,r,o){return no(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,o){return Se.killTweensOf(i,r,o)},t}(_o);Hn(Ue.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});_n("staggerTo,staggerFrom,staggerFromTo",function(s){Ue[s]=function(){var t=new hn,e=Jc.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Xh=function(t,e,n){return t[e]=n},Fp=function(t,e,n){return t[e](n)},cS=function(t,e,n,i){return t[e](i.fp,n)},hS=function(t,e,n){return t.setAttribute(e,n)},Yh=function(t,e){return Ce(t[e])?Fp:Oh(t[e])&&t.setAttribute?hS:Xh},Bp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},uS=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},zp=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},qh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},fS=function(t,e,n,i){for(var r=this._pt,o;r;)o=r._next,r.p===i&&r.modifier(t,e,n),r=o},dS=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Za(this,e,"_pt"):e.dep||(n=1),e=i;return!n},pS=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},kp=function(t){for(var e=t._pt,n,i,r,o;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=r},gn=function(){function s(e,n,i,r,o,a,l,c,h){this.t=n,this.s=r,this.c=o,this.p=i,this.r=a||Bp,this.d=l||this,this.set=c||Xh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=pS,this.m=n,this.mt=r,this.tween=i},s}();_n(Hh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(s){return kh[s]=1});Dn.TweenMax=Dn.TweenLite=Ue;Dn.TimelineLite=Dn.TimelineMax=hn;Se=new hn({sortChildren:!1,defaults:xr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Pn.stringFilter=Rp;var vs=[],ma={},mS=[],If=0,_S=0,Yl=function(t){return(ma[t]||mS).map(function(e){return e()})},nh=function(){var t=Date.now(),e=[];t-If>2&&(Yl("matchMediaInit"),vs.forEach(function(n){var i=n.queries,r=n.conditions,o,a,l,c;for(a in i)o=$n.matchMedia(i[a]).matches,o&&(l=1),o!==r[a]&&(r[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Yl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),If=t,Yl("matchMedia"))},Hp=function(){function s(e,n){this.selector=n&&Qc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=_S++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Ce(n)&&(r=i,i=n,n=Ce);var o=this,a=function(){var c=Me,h=o.selector,u;return c&&c!==o&&c.data.push(o),r&&(o.selector=Qc(r)),Me=o,u=i.apply(o,arguments),Ce(u)&&o._r.push(u),Me=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===Ce?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Me;Me=null,n(this),Me=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Ue&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?function(){for(var a=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof hn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ue)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=vs.length;o--;)vs[o].id===this.id&&vs.splice(o,1)},t.revert=function(n){this.kill(n||{})},s}(),gS=function(){function s(e){this.contexts=[],this.scope=e,Me&&Me.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){si(n)||(n={matches:n});var o=new Hp(0,r||this.scope),a=o.conditions={},l,c,h;Me&&!o.selector&&(o.selector=Me.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=$n.matchMedia(n[c]),l&&(vs.indexOf(o)<0&&vs.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(nh):l.addEventListener("change",nh)));return h&&i(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s}(),Da={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Tp(i)})},timeline:function(t){return new hn(t)},getTweensOf:function(t,e){return Se.getTweensOf(t,e)},getProperty:function(t,e,n,i){Ye(t)&&(t=Bn(t)[0]);var r=ms(t||{}).get,o=n?dp:fp;return n==="native"&&(n=""),t&&(e?o((Tn[e]&&Tn[e].get||r)(t,e,n,i)):function(a,l,c){return o((Tn[a]&&Tn[a].get||r)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Bn(t),t.length>1){var i=t.map(function(h){return yn.quickSetter(h,e,n)}),r=i.length;return function(h){for(var u=r;u--;)i[u](h)}}t=t[0]||{};var o=Tn[e],a=ms(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;ir._pt=0,u.init(t,n?h+n:h,ir,0,[t]),u.render(1,u),ir._pt&&qh(1,ir)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,r=yn.to(t,Ss((i={},i[e]="+=0.1",i.paused=!0,i),n||{})),o=function(l,c,h){return r.resetTo(e,l,c,h)};return o.tween=r,o},isTweening:function(t){return Se.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=gs(t.ease,xr.ease)),Cf(xr,t||{})},config:function(t){return Cf(Pn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Tn[a]&&!Dn[a]&&uo(e+" effect requires "+a+" plugin.")}),Vl[e]=function(a,l,c){return n(Bn(a),Hn(l||{},r),c)},o&&(hn.prototype[e]=function(a,l,c){return this.add(Vl[e](a,si(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){Jt[t]=gs(e)},parseEase:function(t,e){return arguments.length?gs(t,e):Jt},getById:function(t){return Se.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new hn(t),i,r;for(n.smoothChildTiming=mn(t.smoothChildTiming),Se.remove(n),n._dp=0,n._time=n._tTime=Se._time,i=Se._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Ue&&i.vars.onComplete===i._targets[0]))&&Jn(n,i,i._start-i._delay),i=r;return Jn(Se,n,0),n},context:function(t,e){return t?new Hp(t,e):Me},matchMedia:function(t){return new gS(t)},matchMediaRefresh:function(){return vs.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||nh()},addEventListener:function(t,e){var n=ma[t]||(ma[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=ma[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:KM,wrapYoyo:$M,distribute:yp,random:Sp,snap:Mp,normalize:jM,getUnit:tn,clamp:WM,splitColor:Ap,toArray:Bn,selector:Qc,mapRange:Ep,pipe:YM,unitize:qM,interpolate:ZM,shuffle:xp},install:ap,effects:Vl,ticker:Cn,updateRoot:hn.updateRoot,plugins:Tn,globalTimeline:Se,core:{PropTween:gn,globals:lp,Tween:Ue,Timeline:hn,Animation:_o,getCache:ms,_removeLinkedListItem:Za,reverting:function(){return rn},context:function(t){return t&&Me&&(Me.data.push(t),t._ctx=Me),Me},suppressOverwrites:function(t){return Nh=t}}};_n("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Da[s]=Ue[s]});Cn.add(hn.updateRoot);ir=Da.to({},{duration:0});var vS=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},xS=function(t,e){var n=t._targets,i,r,o;for(i in e)for(r=n.length;r--;)o=t._ptLookup[r][i],o&&(o=o.d)&&(o._pt&&(o=vS(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[r],i))},ql=function(t,e){return{name:t,rawVars:1,init:function(i,r,o){o._onInit=function(a){var l,c;if(Ye(r)&&(l={},_n(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}xS(a,r)}}}},yn=Da.registerPlugin({name:"attr",init:function(t,e,n,i,r){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,r,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)rn?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},ql("roundProps",th),ql("modifiers"),ql("snap",Mp))||Da;Ue.version=hn.version=yn.version="3.12.5";op=1;Fh()&&Sr();Jt.Power0;Jt.Power1;Jt.Power2;Jt.Power3;Jt.Power4;Jt.Linear;Jt.Quad;Jt.Cubic;Jt.Quart;Jt.Quint;Jt.Strong;Jt.Elastic;Jt.Back;Jt.SteppedEase;Jt.Bounce;Jt.Sine;Jt.Expo;Jt.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Uf,Oi,cr,jh,fs,Nf,Kh,yS=function(){return typeof window<"u"},wi={},as=180/Math.PI,hr=Math.PI/180,Ks=Math.atan2,Of=1e8,$h=/([A-Z])/g,MS=/(left|right|width|margin|padding|x)/i,SS=/[\s,\(]\S/,ti={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ih=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},wS=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},ES=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},bS=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Vp=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Gp=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},TS=function(t,e,n){return t.style[e]=n},AS=function(t,e,n){return t.style.setProperty(e,n)},CS=function(t,e,n){return t._gsap[e]=n},RS=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},PS=function(t,e,n,i,r){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(r,o)},DS=function(t,e,n,i,r){var o=t._gsap;o[e]=n,o.renderTransform(r,o)},Ee="transform",vn=Ee+"Origin",LS=function s(t,e){var n=this,i=this.target,r=i.style,o=i._gsap;if(t in wi&&r){if(this.tfm=this.tfm||{},t!=="transform")t=ti[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=gi(i,a)}):this.tfm[t]=o.x?o[t]:gi(i,t),t===vn&&(this.tfm.zOrigin=o.zOrigin);else return ti.transform.split(",").forEach(function(a){return s.call(n,a,e)});if(this.props.indexOf(Ee)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(vn,e,"")),t=Ee}(r||e)&&this.props.push(t,e,r[t])},Wp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},IS=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,o;for(r=0;r<t.length;r+=3)t[r+1]?e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace($h,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Kh(),(!r||!r.isStart)&&!n[Ee]&&(Wp(n),i.zOrigin&&n[vn]&&(n[vn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Xp=function(t,e){var n={target:t,props:[],revert:IS,save:LS};return t._gsap||yn.core.getCache(t),e&&e.split(",").forEach(function(i){return n.save(i)}),n},Yp,sh=function(t,e){var n=Oi.createElementNS?Oi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Oi.createElement(t);return n&&n.style?n:Oi.createElement(t)},ni=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace($h,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,wr(e)||e,1)||""},Ff="O,Moz,ms,Ms,Webkit".split(","),wr=function(t,e,n){var i=e||fs,r=i.style,o=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Ff[o]+t in r););return o<0?null:(o===3?"ms":o>=0?Ff[o]:"")+t},rh=function(){yS()&&window.document&&(Uf=window,Oi=Uf.document,cr=Oi.documentElement,fs=sh("div")||{style:{}},sh("div"),Ee=wr(Ee),vn=Ee+"Origin",fs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Yp=!!wr("perspective"),Kh=yn.core.reverting,jh=1)},jl=function s(t){var e=sh("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,r=this.style.cssText,o;if(cr.appendChild(e),e.appendChild(this),this.style.display="block",t)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=s}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),cr.removeChild(e),this.style.cssText=r,o},Bf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},qp=function(t){var e;try{e=t.getBBox()}catch{e=jl.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===jl||(e=jl.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+Bf(t,["x","cx","x1"])||0,y:+Bf(t,["y","cy","y1"])||0,width:0,height:0}:e},jp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&qp(t))},ws=function(t,e){if(e){var n=t.style,i;e in wi&&e!==vn&&(e=Ee),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace($h,"-$1").toLowerCase())):n.removeAttribute(e)}},Fi=function(t,e,n,i,r,o){var a=new gn(t._pt,e,n,0,1,o?Gp:Vp);return t._pt=a,a.b=i,a.e=r,t._props.push(n),a},zf={deg:1,rad:1,turn:1},US={grid:1,flex:1},Yi=function s(t,e,n,i){var r=parseFloat(n)||0,o=(n+"").trim().substr((r+"").length)||"px",a=fs.style,l=MS.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,f=i==="px",d=i==="%",m,g,p,_;if(i===o||!r||zf[i]||zf[o])return r;if(o!=="px"&&!f&&(r=s(t,e,n,"px")),_=t.getCTM&&jp(t),(d||o==="%")&&(wi[e]||~e.indexOf("adius")))return m=_?t.getBBox()[l?"width":"height"]:t[h],De(d?r/m*u:r/100*m);if(a[l?"width":"height"]=u+(f?o:i),g=~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,_&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===Oi||!g.appendChild)&&(g=Oi.body),p=g._gsap,p&&d&&p.width&&l&&p.time===Cn.time&&!p.uncache)return De(r/p.width*u);if(d&&(e==="height"||e==="width")){var x=t.style[e];t.style[e]=u+i,m=t[h],x?t.style[e]=x:ws(t,e)}else(d||o==="%")&&!US[ni(g,"display")]&&(a.position=ni(t,"position")),g===t&&(a.position="static"),g.appendChild(fs),m=fs[h],g.removeChild(fs),a.position="absolute";return l&&d&&(p=ms(g),p.time=Cn.time,p.width=g[h]),De(f?m*r/u:m&&r?u/m*r:0)},gi=function(t,e,n,i){var r;return jh||rh(),e in ti&&e!=="transform"&&(e=ti[e],~e.indexOf(",")&&(e=e.split(",")[0])),wi[e]&&e!=="transform"?(r=vo(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Ia(ni(t,vn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=La[e]&&La[e](t,e,n)||ni(t,e)||hp(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?Yi(t,e,r,n)+n:r},NS=function(t,e,n,i){if(!n||n==="none"){var r=wr(e,t,1),o=r&&ni(t,r,1);o&&o!==n?(e=r,n=o):e==="borderColor"&&(n=ni(t,"borderTopColor"))}var a=new gn(this._pt,t.style,e,0,1,zp),l=0,c=0,h,u,f,d,m,g,p,_,x,v,y,T;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=t.style[e],t.style[e]=i,i=ni(t,e)||i,g?t.style[e]=g:ws(t,e)),h=[n,i],Rp(h),n=h[0],i=h[1],f=n.match(nr)||[],T=i.match(nr)||[],T.length){for(;u=nr.exec(i);)p=u[0],x=i.substring(l,u.index),m?m=(m+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(m=1),p!==(g=f[c++]||"")&&(d=parseFloat(g)||0,y=g.substr((d+"").length),p.charAt(1)==="="&&(p=lr(d,p)+y),_=parseFloat(p),v=p.substr((_+"").length),l=nr.lastIndex-v.length,v||(v=v||Pn.units[e]||y,l===i.length&&(i+=v,a.e+=v)),y!==v&&(d=Yi(t,e,g,v)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:d,c:_-d,m:m&&m<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?Gp:Vp;return sp.test(i)&&(a.e=0),this._pt=a,a},kf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},OS=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=kf[n]||n,e[1]=kf[i]||i,e.join(" ")},FS=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,o=n._gsap,a,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)a=r[c],wi[a]&&(l=1,a=a==="transformOrigin"?vn:Ee),ws(n,a);l&&(ws(n,Ee),o&&(o.svg&&n.removeAttribute("transform"),vo(n,1),o.uncache=1,Wp(i)))}},La={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var o=t._pt=new gn(t._pt,e,n,0,0,FS);return o.u=i,o.pr=-10,o.tween=r,t._props.push(n),1}}},go=[1,0,0,1,0,0],Kp={},$p=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Hf=function(t){var e=ni(t,Ee);return $p(e)?go:e.substr(7).match(ip).map(De)},Zh=function(t,e){var n=t._gsap||ms(t),i=t.style,r=Hf(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?go:r):(r===go&&!t.offsetParent&&t!==cr&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent)&&(c=1,a=t.nextElementSibling,cr.appendChild(t)),r=Hf(t),l?i.display=l:ws(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):cr.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},oh=function(t,e,n,i,r,o){var a=t._gsap,l=r||Zh(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,f=a.yOffset||0,d=l[0],m=l[1],g=l[2],p=l[3],_=l[4],x=l[5],v=e.split(" "),y=parseFloat(v[0])||0,T=parseFloat(v[1])||0,w,E,C,L;n?l!==go&&(E=d*p-m*g)&&(C=y*(p/E)+T*(-g/E)+(g*x-p*_)/E,L=y*(-m/E)+T*(d/E)-(d*x-m*_)/E,y=C,T=L):(w=qp(t),y=w.x+(~v[0].indexOf("%")?y/100*w.width:y),T=w.y+(~(v[1]||v[0]).indexOf("%")?T/100*w.height:T)),i||i!==!1&&a.smooth?(_=y-c,x=T-h,a.xOffset=u+(_*d+x*g)-_,a.yOffset=f+(_*m+x*p)-x):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=T,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[vn]="0px 0px",o&&(Fi(o,a,"xOrigin",c,y),Fi(o,a,"yOrigin",h,T),Fi(o,a,"xOffset",u,a.xOffset),Fi(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",y+" "+T)},vo=function(t,e){var n=t._gsap||new Ip(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=ni(t,vn)||"0",h,u,f,d,m,g,p,_,x,v,y,T,w,E,C,L,M,S,N,O,k,G,B,j,I,W,Z,st,St,Lt,Y,ot;return h=u=f=g=p=_=x=v=y=0,d=m=1,n.svg=!!(t.getCTM&&jp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ee]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ee]!=="none"?l[Ee]:"")),i.scale=i.rotate=i.translate="none"),E=Zh(t,n.svg),n.svg&&(n.uncache?(I=t.getBBox(),c=n.xOrigin-I.x+"px "+(n.yOrigin-I.y)+"px",j=""):j=!e&&t.getAttribute("data-svg-origin"),oh(t,j||c,!!j||n.originIsAbsolute,n.smooth!==!1,E)),T=n.xOrigin||0,w=n.yOrigin||0,E!==go&&(S=E[0],N=E[1],O=E[2],k=E[3],h=G=E[4],u=B=E[5],E.length===6?(d=Math.sqrt(S*S+N*N),m=Math.sqrt(k*k+O*O),g=S||N?Ks(N,S)*as:0,x=O||k?Ks(O,k)*as+g:0,x&&(m*=Math.abs(Math.cos(x*hr))),n.svg&&(h-=T-(T*S+w*O),u-=w-(T*N+w*k))):(ot=E[6],Lt=E[7],Z=E[8],st=E[9],St=E[10],Y=E[11],h=E[12],u=E[13],f=E[14],C=Ks(ot,St),p=C*as,C&&(L=Math.cos(-C),M=Math.sin(-C),j=G*L+Z*M,I=B*L+st*M,W=ot*L+St*M,Z=G*-M+Z*L,st=B*-M+st*L,St=ot*-M+St*L,Y=Lt*-M+Y*L,G=j,B=I,ot=W),C=Ks(-O,St),_=C*as,C&&(L=Math.cos(-C),M=Math.sin(-C),j=S*L-Z*M,I=N*L-st*M,W=O*L-St*M,Y=k*M+Y*L,S=j,N=I,O=W),C=Ks(N,S),g=C*as,C&&(L=Math.cos(C),M=Math.sin(C),j=S*L+N*M,I=G*L+B*M,N=N*L-S*M,B=B*L-G*M,S=j,G=I),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,_=180-_),d=De(Math.sqrt(S*S+N*N+O*O)),m=De(Math.sqrt(B*B+ot*ot)),C=Ks(G,B),x=Math.abs(C)>2e-4?C*as:0,y=Y?1/(Y<0?-Y:Y):0),n.svg&&(j=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!$p(ni(t,Ee)),j&&t.setAttribute("transform",j))),Math.abs(x)>90&&Math.abs(x)<270&&(r?(d*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(m*=-1,x+=x<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=De(d),n.scaleY=De(m),n.rotation=De(g)+a,n.rotationX=De(p)+a,n.rotationY=De(_)+a,n.skewX=x+a,n.skewY=v+a,n.transformPerspective=y+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[vn]=Ia(c)),n.xOffset=n.yOffset=0,n.force3D=Pn.force3D,n.renderTransform=n.svg?zS:Yp?Zp:BS,n.uncache=0,n},Ia=function(t){return(t=t.split(" "))[0]+" "+t[1]},Kl=function(t,e,n){var i=tn(e);return De(parseFloat(e)+parseFloat(Yi(t,"x",n+"px",i)))+i},BS=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Zp(t,e)},ss="0deg",Vr="0px",rs=") ",Zp=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,f=n.skewX,d=n.skewY,m=n.scaleX,g=n.scaleY,p=n.transformPerspective,_=n.force3D,x=n.target,v=n.zOrigin,y="",T=_==="auto"&&t&&t!==1||_===!0;if(v&&(u!==ss||h!==ss)){var w=parseFloat(h)*hr,E=Math.sin(w),C=Math.cos(w),L;w=parseFloat(u)*hr,L=Math.cos(w),o=Kl(x,o,E*L*-v),a=Kl(x,a,-Math.sin(w)*-v),l=Kl(x,l,C*L*-v+v)}p!==Vr&&(y+="perspective("+p+rs),(i||r)&&(y+="translate("+i+"%, "+r+"%) "),(T||o!==Vr||a!==Vr||l!==Vr)&&(y+=l!==Vr||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+rs),c!==ss&&(y+="rotate("+c+rs),h!==ss&&(y+="rotateY("+h+rs),u!==ss&&(y+="rotateX("+u+rs),(f!==ss||d!==ss)&&(y+="skew("+f+", "+d+rs),(m!==1||g!==1)&&(y+="scale("+m+", "+g+rs),x.style[Ee]=y||"translate(0, 0)"},zS=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,f=n.scaleY,d=n.target,m=n.xOrigin,g=n.yOrigin,p=n.xOffset,_=n.yOffset,x=n.forceCSS,v=parseFloat(o),y=parseFloat(a),T,w,E,C,L;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=hr,c*=hr,T=Math.cos(l)*u,w=Math.sin(l)*u,E=Math.sin(l-c)*-f,C=Math.cos(l-c)*f,c&&(h*=hr,L=Math.tan(c-h),L=Math.sqrt(1+L*L),E*=L,C*=L,h&&(L=Math.tan(h),L=Math.sqrt(1+L*L),T*=L,w*=L)),T=De(T),w=De(w),E=De(E),C=De(C)):(T=u,C=f,w=E=0),(v&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(v=Yi(d,"x",o,"px"),y=Yi(d,"y",a,"px")),(m||g||p||_)&&(v=De(v+m-(m*T+g*E)+p),y=De(y+g-(m*w+g*C)+_)),(i||r)&&(L=d.getBBox(),v=De(v+i/100*L.width),y=De(y+r/100*L.height)),L="matrix("+T+","+w+","+E+","+C+","+v+","+y+")",d.setAttribute("transform",L),x&&(d.style[Ee]=L)},kS=function(t,e,n,i,r){var o=360,a=Ye(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?as:1),c=l-i,h=i+c+"deg",u,f;return a&&(u=r.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*Of)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*Of)%o-~~(c/o)*o)),t._pt=f=new gn(t._pt,e,n,i,c,wS),f.e=h,f.u="deg",t._props.push(n),f},Vf=function(t,e){for(var n in e)t[n]=e[n];return t},HS=function(t,e,n){var i=Vf({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,f,d,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ee]=e,a=vo(n,1),ws(n,Ee),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ee],o[Ee]=e,a=vo(n,1),o[Ee]=c);for(l in wi)c=i[l],h=a[l],c!==h&&r.indexOf(l)<0&&(d=tn(c),m=tn(h),u=d!==m?Yi(n,l,c,m):parseFloat(c),f=parseFloat(h),t._pt=new gn(t._pt,a,l,u,f-u,ih),t._pt.u=m||0,t._props.push(l));Vf(a,i)};_n("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",o=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(a){return t<2?s+a:"border"+a+s});La[t>1?"border"+s:s]=function(a,l,c,h,u){var f,d;if(arguments.length<4)return f=o.map(function(m){return gi(a,m,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(h+"").split(" "),d={},o.forEach(function(m,g){return d[m]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,d,u)}});var Jp={name:"css",register:rh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,f,d,m,g,p,_,x,v,y,T,w,E,C;jh||rh(),this.styles=this.styles||Xp(t),C=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(h=e[g],!(Tn[g]&&Up(g,e,n,i,t,r)))){if(d=typeof h,m=La[g],d==="function"&&(h=h.call(n,i,t,r),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=po(h)),m)m(this,t,g,h,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),h+="",Vi.lastIndex=0,Vi.test(c)||(p=tn(c),_=tn(h)),_?p!==_&&(c=Yi(t,g,c,_)+_):p&&(h+=p),this.add(a,"setProperty",c,h,i,r,0,0,g),o.push(g),C.push(g,0,a[g]);else if(d!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,t,r):l[g],Ye(c)&&~c.indexOf("random(")&&(c=po(c)),tn(c+"")||c==="auto"||(c+=Pn.units[g]||tn(gi(t,g))||""),(c+"").charAt(1)==="="&&(c=gi(t,g))):c=gi(t,g),f=parseFloat(c),x=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),x&&(h=h.substr(2)),u=parseFloat(h),g in ti&&(g==="autoAlpha"&&(f===1&&gi(t,"visibility")==="hidden"&&u&&(f=0),C.push("visibility",0,a.visibility),Fi(this,a,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),g!=="scale"&&g!=="transform"&&(g=ti[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in wi,v){if(this.styles.save(g),y||(T=t._gsap,T.renderTransform&&!e.parseTransform||vo(t,e.parseTransform),w=e.smoothOrigin!==!1&&T.smooth,y=this._pt=new gn(this._pt,a,Ee,0,1,T.renderTransform,T,0,-1),y.dep=1),g==="scale")this._pt=new gn(this._pt,T,"scaleY",T.scaleY,(x?lr(T.scaleY,x+u):u)-T.scaleY||0,ih),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){C.push(vn,0,a[vn]),h=OS(h),T.svg?oh(t,h,0,w,0,this):(_=parseFloat(h.split(" ")[2])||0,_!==T.zOrigin&&Fi(this,T,"zOrigin",T.zOrigin,_),Fi(this,a,g,Ia(c),Ia(h)));continue}else if(g==="svgOrigin"){oh(t,h,1,w,0,this);continue}else if(g in Kp){kS(this,T,g,f,x?lr(f,x+h):h);continue}else if(g==="smoothOrigin"){Fi(this,T,"smooth",T.smooth,h);continue}else if(g==="force3D"){T[g]=h;continue}else if(g==="transform"){HS(this,h,t);continue}}else g in a||(g=wr(g)||g);if(v||(u||u===0)&&(f||f===0)&&!SS.test(h)&&g in a)p=(c+"").substr((f+"").length),u||(u=0),_=tn(h)||(g in Pn.units?Pn.units[g]:p),p!==_&&(f=Yi(t,g,c,_)),this._pt=new gn(this._pt,v?T:a,g,f,(x?lr(f,x+u):u)-f,!v&&(_==="px"||g==="zIndex")&&e.autoRound!==!1?bS:ih),this._pt.u=_||0,p!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=ES);else if(g in a)NS.call(this,t,g,c,x?x+h:h);else if(g in t)this.add(t,g,c||t[g],x?x+h:h,i,r);else if(g!=="parseTransform"){zh(g,h);continue}v||(g in a?C.push(g,0,a[g]):C.push(g,1,c||t[g])),o.push(g)}}E&&kp(this)},render:function(t,e){if(e.tween._time||!Kh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:gi,aliases:ti,getSetter:function(t,e,n){var i=ti[e];return i&&i.indexOf(",")<0&&(e=i),e in wi&&e!==vn&&(t._gsap.x||gi(t,"x"))?n&&Nf===n?e==="scale"?RS:CS:(Nf=n||{})&&(e==="scale"?PS:DS):t.style&&!Oh(t.style[e])?TS:~e.indexOf("-")?AS:Yh(t,e)},core:{_removeProperty:ws,_getMatrix:Zh}};yn.utils.checkPrefix=wr;yn.core.getStyleSaver=Xp;(function(s,t,e,n){var i=_n(s+","+t+","+e,function(r){wi[r]=1});_n(t,function(r){Pn.units[r]="deg",Kp[r]=1}),ti[i[13]]=s+","+t,_n(n,function(r){var o=r.split(":");ti[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");_n("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Pn.units[s]="px"});yn.registerPlugin(Jp);var Jh=yn.registerPlugin(Jp)||yn;Jh.core.Tween;const Qp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Cr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const VS=new bh(-1,1,1,-1,0,1);class GS extends ue{constructor(){super(),this.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qt([0,2,0,0,2,0],2))}}const WS=new GS;class Qh{constructor(t){this._mesh=new it(WS,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,VS)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class tm extends Cr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ze?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=oo.clone(t.uniforms),this.material=new ze({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Qh(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Gf extends Cr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class XS extends Cr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class YS{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new J);this._width=n.width,this._height=n.height,e=new Kn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:yi}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new tm(Qp),this.copyPass.material.blending=xi,this.clock=new Qd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Gf!==void 0&&(o instanceof Gf?n=!0:o instanceof XS&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new J);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class qS extends Cr{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Dt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const jS={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Dt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Er extends Cr{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new J(t.x,t.y):new J(256,256),this.clearColor=new Dt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Kn(r,o,{type:yi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Kn(r,o,{type:yi});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new Kn(r,o,{type:yi});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=jS;this.highPassUniforms=oo.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ze({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new J(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Qp;this.copyUniforms=oo.clone(h.uniforms),this.blendMaterial=new ze({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Bi,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Dt,this.oldClearAlpha=1,this.basic=new _e,this.fsQuad=new Qh(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new J(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Er.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Er.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ze({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new J(.5,.5)},direction:{value:new J(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new ze({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Er.BlurDirectionX=new J(1,0);Er.BlurDirectionY=new J(0,1);const KS={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class $S extends Cr{constructor(){super();const t=KS;this.uniforms=oo.clone(t.uniforms),this.material=new yM({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Qh(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ie.getTransfer(this._outputColorSpace)===pe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===hd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ud?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===fd?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===dd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===pd&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Wf={type:"change"},tu={type:"start"},em={type:"end"},ia=new xo,Xf=new Ii,ZS=Math.cos(70*Bc.DEG2RAD),Be=new P,pn=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$l=1e-6;class JS extends AM{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:sr.ROTATE,MIDDLE:sr.DOLLY,RIGHT:sr.PAN},this.touches={ONE:Qs.ROTATE,TWO:Qs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new ii,this._lastTargetPosition=new P,this._quat=new ii().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Tf,this._sphericalDelta=new Tf,this._scale=1,this._panOffset=new P,this._rotateStart=new J,this._rotateEnd=new J,this._rotateDelta=new J,this._panStart=new J,this._panEnd=new J,this._panDelta=new J,this._dollyStart=new J,this._dollyEnd=new J,this._dollyDelta=new J,this._dollyDirection=new P,this._mouse=new J,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=t1.bind(this),this._onPointerDown=QS.bind(this),this._onPointerUp=e1.bind(this),this._onContextMenu=l1.bind(this),this._onMouseWheel=s1.bind(this),this._onKeyDown=r1.bind(this),this._onTouchStart=o1.bind(this),this._onTouchMove=a1.bind(this),this._onMouseDown=n1.bind(this),this._onMouseMove=i1.bind(this),this._interceptControlDown=c1.bind(this),this._interceptControlUp=h1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wf),this.update(),this.state=ce.NONE}update(t=null){const e=this.object.position;Be.copy(e).sub(this.target),Be.applyQuaternion(this._quat),this._spherical.setFromVector3(Be),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=pn:n>Math.PI&&(n-=pn),i<-Math.PI?i+=pn:i>Math.PI&&(i-=pn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Be.setFromSpherical(this._spherical),Be.applyQuaternion(this._quatInverse),e.copy(this.target).add(Be),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Be.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Be.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ia.origin.copy(this.object.position),ia.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ia.direction))<ZS?this.object.lookAt(this.target):(Xf.setFromNormalAndCoplanarPoint(this.object.up,this.target),ia.intersectPlane(Xf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>$l||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$l||this._lastTargetPosition.distanceToSquared(this.target)>$l?(this.dispatchEvent(Wf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?pn/60*this.autoRotateSpeed*t:pn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Be.setFromMatrixColumn(e,0),Be.multiplyScalar(-t),this._panOffset.add(Be)}_panUp(t,e){this.screenSpacePanning===!0?Be.setFromMatrixColumn(e,1):(Be.setFromMatrixColumn(e,0),Be.crossVectors(this.object.up,Be)),Be.multiplyScalar(t),this._panOffset.add(Be)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Be.copy(i).sub(this.target);let r=Be.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/e.clientHeight),this._rotateUp(pn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-pn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/e.clientHeight),this._rotateUp(pn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new J,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function QS(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function t1(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function e1(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(em),this.state=ce.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function n1(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case sr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ce.DOLLY;break;case sr.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ce.ROTATE}break;case sr.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(tu)}function i1(s){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function s1(s){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(s.preventDefault(),this.dispatchEvent(tu),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(em))}function r1(s){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(s)}function o1(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Qs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ce.TOUCH_ROTATE;break;case Qs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case Qs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ce.TOUCH_DOLLY_PAN;break;case Qs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(tu)}function a1(s){switch(this._trackPointer(s),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ce.NONE}}function l1(s){this.enabled!==!1&&s.preventDefault()}function c1(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function h1(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class u1 extends Vd{constructor(){super();const t=new Xe;t.deleteAttribute("uv");const e=new ye({side:nn}),n=new ye,i=new Uh(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new it(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new it(t,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new it(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new it(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new it(t,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new it(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new it(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const f=new it(t,$s(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const d=new it(t,$s(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const m=new it(t,$s(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);const g=new it(t,$s(43));g.position.set(-.462,8.89,14.52),g.scale.set(4.38,5.441,.088),this.add(g);const p=new it(t,$s(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const _=new it(t,$s(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function $s(s){const t=new _e;return t.color.setScalar(s),t}function f1(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new ue;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<s.length;++f){const d=s[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=s[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Yf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let g=0;g<o[h].length;++g)d.push(o[h][g][f]);const m=Yf(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Yf(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ke(o,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){const g=h.getComponent(f,m);a.setComponent(f+u,m,g)}}else o.set(h.array,l);l+=h.count*e}return i!==void 0&&(a.gpuType=i),a}const Ei=[];function ur(s,t,e,n={}){const i=new ye({color:"#111",emissive:s,emissiveIntensity:t,...n});return Ei.push({mat:i,day:t,night:e}),i}function d1(s){for(const t of Ei)t.mat.emissiveIntensity=t.day+(t.night-t.day)*s}const Nt=(s,t={})=>new ye({color:s,roughness:.75,metalness:.05,...t});function Ht(s,t,e,n,i=0,r=0,o=0){const a=new it(new Xe(s,t,e),n);return a.position.set(i,r,o),a.castShadow=a.receiveShadow=!0,a}function nm(s,t,e,n="#ffd9a0"){const i=document.createElement("canvas");i.width=s*8,i.height=t*12;const r=i.getContext("2d");r.fillStyle="#000",r.fillRect(0,0,i.width,i.height);for(let a=0;a<t;a++)for(let l=0;l<s;l++)Math.random()<e&&(r.fillStyle=Math.random()<.2?"#bfe3ff":n,r.globalAlpha=.5+Math.random()*.5,r.fillRect(l*8+2,a*12+3,4,6));const o=new As(i);return o.colorSpace=Qe,o.magFilter=un,o}function p1(){const s=document.createElement("canvas");s.width=s.height=256;const t=s.getContext("2d");t.fillStyle="#c9c08a",t.fillRect(0,0,256,256);for(let n=0;n<256;n+=3)t.fillStyle=`rgba(90,80,30,${.05+Math.random()*.06})`,t.fillRect(0,n,256,1);t.fillStyle="#3b3a2a",t.fillRect(0,0,256,6),t.fillRect(0,125,256,6),t.fillRect(0,250,256,6),t.fillRect(0,0,6,256),t.fillRect(125,0,6,128),t.fillRect(250,0,6,256),t.fillRect(64,128,6,128),t.fillRect(190,128,6,128);const e=new As(s);return e.colorSpace=Qe,e}function m1(){const s=document.createElement("canvas");s.width=128,s.height=256;const t=s.getContext("2d");t.fillStyle="#fff3dc",t.fillRect(0,0,128,256),t.fillStyle="#5a3a22";for(let n=0;n<=128;n+=32)t.fillRect(Math.min(n,124),0,4,256);for(let n=0;n<=256;n+=42)t.fillRect(0,Math.min(n,252),128,4);const e=new As(s);return e.colorSpace=Qe,e}function Ua(s,{w:t=512,h:e=128,font:n="700 64px sans-serif",color:i="#fff",bg:r=null}={}){const o=document.createElement("canvas");o.width=t,o.height=e;const a=o.getContext("2d");r&&(a.fillStyle=r,a.fillRect(0,0,t,e)),a.font=n,a.fillStyle=i,a.textAlign="center",a.textBaseline="middle",a.fillText(s,t/2,e/2);const l=new As(o);return l.colorSpace=Qe,l}function im(){const s=new ee,t=Nt("#f4f6fa",{roughness:.35,metalness:.2}),e=Nt("#5b2d8e",{roughness:.4}),n=Nt("#d8b25a",{roughness:.35,metalness:.6}),i=Nt("#1d2433",{roughness:.3}),r=new it(new de(1.5,1.5,20,24,1,!1),t);r.rotation.z=Math.PI/2,s.add(r);const o=new it(new en(1.5,24,16,0,Math.PI*2,0,Math.PI/2),t);o.scale.set(1,2,1),o.rotation.z=-Math.PI/2,o.position.x=10,s.add(o);const a=new it(new de(1.5,.35,7,24),t);a.rotation.z=Math.PI/2,a.position.set(-13.5,.5,0),s.add(a);const l=new it(new Xe(1.4,.45,2.2),i);l.position.set(11.2,.75,0),s.add(l);for(const T of[-1,1]){const w=Ht(17,.28,.05,i,.5,.55,T*1.49);s.add(w);const E=Ht(26,.35,.05,e,-1.5,-.25,T*1.47);s.add(E);const C=Ht(26,.12,.05,n,-1.5,-.6,T*1.46);s.add(C)}const c=new ps;c.moveTo(0,0),c.lineTo(-5,13),c.lineTo(-7.2,13),c.lineTo(-6,0),c.closePath();const h=new to(c,{depth:.35,bevelEnabled:!1});for(const T of[-1,1]){const w=new it(h,t);w.rotation.x=T*Math.PI/2,w.position.set(2.5,-.6+(T>0?.35:0),0),w.scale.y=1,w.rotation.y=0,w.rotation.z=0,T<0?(w.rotation.x=Math.PI/2,w.position.y=-.6):(w.rotation.x=-Math.PI/2,w.position.y=-.25),w.rotateY(T*.06),s.add(w);const E=new it(new de(.75,.65,3.2,20),Nt("#dfe3ea",{metalness:.5,roughness:.3}));E.rotation.z=Math.PI/2,E.position.set(1,-1.5,T*5.2),s.add(E);const C=new it(new Wi(.62,20),i);C.rotation.y=Math.PI/2,C.position.set(2.62,-1.5,T*5.2),s.add(C);const L=new it(new en(.22,8,8),new _e({color:T>0?"#3dff7a":"#ff3048"}));L.position.set(-4.6,-.4,T*13.1),L.userData.blink=!0,s.add(L)}const u=new ps;u.moveTo(0,0),u.lineTo(-4.5,5.6),u.lineTo(-6.2,5.6),u.lineTo(-5.2,0),u.closePath();const f=new it(new to(u,{depth:.3,bevelEnabled:!1}),e);f.position.set(-11.5,1,-.15),s.add(f);const d=new it(new Wi(.9,24),n);d.position.set(-15.3,4.2,.17),s.add(d);const m=d.clone();m.position.z=-.17,m.rotation.y=Math.PI,s.add(m);const g=new ps;g.moveTo(0,0),g.lineTo(-2.5,4.6),g.lineTo(-3.8,4.6),g.lineTo(-3.6,0),g.closePath();const p=new to(g,{depth:.2,bevelEnabled:!1});for(const T of[-1,1]){const w=new it(p,t);w.rotation.x=T>0?-Math.PI/2:Math.PI/2,w.position.set(-13,.6,0),s.add(w)}const _=new it(new en(.2,8,8),new _e({color:"#ff4040"}));_.position.set(0,1.6,0),_.userData.blink=!0,s.add(_);const x=new it(new en(.25,8,8),new _e({color:"#fff7d6"}));x.position.set(11.8,-.9,0),s.add(x);const v=new ee,y=Nt("#1a1a1a");for(const[T,w]of[[8,0],[.5,1.8],[.5,-1.8]]){const E=Ht(.2,1.4,.2,Nt("#9aa3b0"),T,-2,w),C=new it(new de(.42,.42,.35,14),y);C.rotation.x=Math.PI/2,C.position.set(T,-2.6,w),v.add(E,C)}return s.add(v),s.userData.gear=v,s.traverse(T=>{T.isMesh&&(T.castShadow=!0)}),s}function qf(s,t){const e=new ee,n=Nt("#2d3138",{roughness:.95}),i=new it(new Fe(s,t),n);i.rotation.x=-Math.PI/2,i.position.y=.05,i.receiveShadow=!0,e.add(i);const r=new _e({color:"#e8e8e8"});for(let u=-s/2+10;u<s/2-10;u+=12){const f=new it(new Fe(6,.5),r);f.rotation.x=-Math.PI/2,f.position.set(u,.07,0),e.add(f)}const o=Math.floor(s/8),a=new en(.22,6,6),l=new _e({color:"#ffe7a8"}),c=new kn(a,l,o*2),h=new Zt;for(let u=0;u<o;u++){const f=-s/2+u*8+4;h.makeTranslation(f,.25,t/2+.6),c.setMatrixAt(u*2,h),h.makeTranslation(f,.25,-t/2-.6),c.setMatrixAt(u*2+1,h)}return e.add(c),e.userData.lights=l,e}function jf({thai:s=!1,label:t="BKK",towerX:e=60}={}){const n=new ee,i=new ye({color:"#7fa7c9",roughness:.1,metalness:.6,emissive:"#ffcf88",emissiveIntensity:.05});Ei.push({mat:i,day:.05,night:.9});const r=Nt("#e9edf2",{roughness:.4,metalness:.3});n.add(Ht(90,9,24,i,0,4.5,0));const o=new de(30,30,96,48,1,!0,-.55,1.1),a=new it(o,Nt(s?"#d9c08a":"#f0f2f5",{side:xe,metalness:.4,roughness:.35}));a.rotation.z=Math.PI/2,a.rotation.y=0,a.position.set(0,-16.5,0),a.scale.set(1,1,.5),n.add(a);for(let d=-42;d<=42;d+=12)n.add(Ht(.6,9,.6,r,d,4.5,12.3));for(const d of[-25,0,25])n.add(Ht(2.4,2.6,14,r,d,4,19));const l=new it(new Fe(22,4),new _e({map:Ua(t,{font:"700 70px sans-serif",color:"#ffffff",bg:s?"#4c2a7a":"#a8233a"}),toneMapped:!1}));if(l.position.set(0,11.5,12.4),n.add(l),s)for(const d of[-40,40]){const m=new it(new Ki(1.4,14,4),Nt("#d9b25b",{metalness:.7,roughness:.3}));m.position.set(d,16,0),n.add(m)}const c=new ee;c.add(Ht(3.5,30,3.5,r,0,15,0));const h=new it(new de(5,3.5,4,12),i);h.position.y=32,c.add(h);const u=new it(new de(5.6,5.6,.8,12),r);u.position.y=34.4,c.add(u);const f=new it(new en(.5,8,8),new _e({color:"#ff3a3a"}));return f.position.y=36,f.userData.blink=!0,c.add(f),c.position.set(e,0,-6),n.add(c),n.traverse(d=>{d.isMesh&&(d.castShadow=!0,d.receiveShadow=!0)}),n}function _1(){const s=new ee,t=Nt("#f6f2ea",{roughness:.4,metalness:.2}),e=Nt("#e6688e",{roughness:.4}),n=new ye({color:"#1b2a3c",roughness:.1,metalness:.7,emissive:"#ffd59a",emissiveIntensity:0});Ei.push({mat:n,day:0,night:.6}),s.add(Ht(2.6,2.8,11,t,0,1.9,0)),s.add(Ht(2.64,.9,11.02,n,0,2.5,0)),s.add(Ht(2.66,.35,11.04,e,0,1.2,0)),s.add(Ht(2.5,1.2,.1,n,0,2.4,-5.52));const i=Nt("#151515");for(const o of[-3.6,3.4])for(const a of[-1.25,1.25]){const l=new it(new de(.55,.55,.4,16),i);l.rotation.z=Math.PI/2,l.position.set(a,.55,o),s.add(l)}const r=new _e({color:"#fff6d8"});for(const o of[-.9,.9]){const a=new it(new en(.16,8,8),r);a.position.set(o,1,-5.55),s.add(a)}return s.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),s}function sm(s="#2b3a67",t="#f1c9a5"){const e=new ee,n=new it(new qa(.32,.9,4,10),Nt(s));n.position.y=.95,e.add(n);const i=new it(new en(.24,14,12),Nt(t));return i.position.y=1.85,e.add(i),e.traverse(r=>{r.isMesh&&(r.castShadow=!0)}),e}function g1(){const s=sm("#e6688e"),t=new it(new de(.34,.34,.1,16),Nt("#fafafa"));t.position.y=2.06,s.add(t);const e=new it(new de(.03,.03,2.4,6),Nt("#c0c0c0",{metalness:.8}));e.position.set(.45,2.1,0),s.add(e);const n=new Fe(.9,.6,10,1),i=new it(n,new ye({color:"#ffffff",side:xe,emissive:"#e6688e",emissiveIntensity:.3}));i.position.set(.92,3,0),s.add(i);const r=new it(new Wi(.16,20),new _e({color:"#d2283c",side:xe}));r.position.set(.92,3,.01),s.add(r);const o=n.attributes.position.array.slice();return s.userData.update=a=>{const l=n.attributes.position;for(let c=0;c<l.count;c++){const h=o[c*3];l.setZ(c,Math.sin(a*5+h*5)*.08*(h+.45))}l.needsUpdate=!0,s.rotation.y=Math.sin(a*.8)*.15},s}function Kf(s=1,t="#d8382c"){const e=new ee,n=Nt(t,{roughness:.55}),i=Nt("#1b1b1f");for(const o of[-1,1]){const a=new it(new de(.28,.32,6,12),n);a.position.set(o*2.4,3,0),e.add(a),e.add(Ht(.8,.5,.8,i,o*2.4,.25,0))}e.add(Ht(6.2,.4,.45,n,0,4.9,0));const r=Ht(7.6,.45,.65,i,0,5.75,0);return e.add(r),e.add(Ht(7,.35,.55,n,0,5.4,0)),e.add(Ht(.35,.9,.3,n,0,5,0)),e.scale.setScalar(s),e.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),e}function v1(){const s=new ee,t=Nt("#c9372c",{roughness:.6}),e=Nt("#2c2f38",{roughness:.5,metalness:.2}),n=Nt("#f1e6d2");let i=0;s.add(Ht(9,1.2,9,Nt("#8d8579"),0,.6,0)),i=1.2;for(let o=0;o<5;o++){const a=6-o*.7,l=3-o*.15;s.add(Ht(a,l,a,n,0,i+l/2,0));for(const h of[-1,1])for(const u of[-1,1]){const f=new it(new de(.15,.15,l,8),t);f.position.set(h*(a/2-.1),i+l/2,u*(a/2-.1)),s.add(f)}i+=l;const c=new it(new Ki(a*.95+2.2,1.6,4,1,!0),e);c.rotation.y=Math.PI/4,c.position.y=i+.45,c.material.side=xe,s.add(c),i+=.7}const r=new it(new de(.08,.2,6,8),Nt("#c9a64a",{metalness:.8,roughness:.3}));r.position.y=i+3,s.add(r);for(let o=0;o<7;o++){const a=new it(new $a(.4,.06,6,16),Nt("#c9a64a",{metalness:.8}));a.rotation.x=Math.PI/2,a.position.y=i+1+o*.55,s.add(a)}return s.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),s}function x1(s=240,t=270){const e=[];for(let u=0;u<=40;u++){const f=u/40,d=s*Math.pow(1-f,1.6)*(1-.06*Math.sin(f*9))+(f>.97?0:6);e.push(new J(Math.max(d,.01),f*t))}e.push(new J(.01,t-4));const n=new Ya(e,96),i=n.attributes.position,r=new Float32Array(i.count*3),o=new Dt("#3f5a73"),a=new Dt("#5d6f8f"),l=new Dt("#f5f8ff"),c=new Dt;for(let u=0;u<i.count;u++){const f=i.getX(u),d=i.getY(u),m=i.getZ(u),g=Math.atan2(m,f),p=Math.sin(g*23)*.5+Math.sin(g*51)*.3,_=t*(.66+p*.04),x=Math.hypot(f,m),v=1+p*.02*(d/t);i.setX(u,f*v),i.setZ(u,m*v),d>_?c.copy(l):d>_-14?c.copy(a).lerp(l,(d-(_-14))/14*(.5+p*.5)):c.copy(o).lerp(a,d/_),x<1&&c.copy(l),r.set([c.r,c.g,c.b],u*3)}n.setAttribute("color",new Ke(r,3)),n.computeVertexNormals();const h=new it(n,new ye({vertexColors:!0,roughness:.9,flatShading:!1}));return h.receiveShadow=!0,h}function y1(s){const t=new ee,e=new de(.25,.45,4,7);e.translate(0,2,0);const n=new kn(e,Nt("#4a3328"),s.length),i=new vr(1.6,1),r=new ye({color:"#ffb6cb",roughness:.8,emissive:"#ff8fb0",emissiveIntensity:.08,flatShading:!0});Ei.push({mat:r,day:.08,night:.22});const o=new kn(i,r,s.length*5),a=new Zt,l=new ii,c=new P,h=new P,u=new Dt;return s.forEach((f,d)=>{const m=.8+Math.random()*.6;l.setFromEuler(new xn(0,Math.random()*6,0)),a.compose(h.set(f.x,f.y,f.z),l,c.setScalar(m)),n.setMatrixAt(d,a);for(let g=0;g<5;g++){const p=g/5*Math.PI*2+Math.random(),_=g===0?0:1.4*m;h.set(f.x+Math.cos(p)*_,f.y+(4.2+Math.random()*1.4)*m,f.z+Math.sin(p)*_),l.setFromEuler(new xn(Math.random(),Math.random(),Math.random())),a.compose(h,l,c.setScalar(m*(.9+Math.random()*.5))),o.setMatrixAt(d*5+g,a),o.setColorAt(d*5+g,u.set(["#ffc3d4","#ffadc6","#ffd6e2","#f9a1bd"][Math.floor(Math.random()*4)]))}}),n.castShadow=o.castShadow=!0,t.add(n,o),t}function M1(s){const t=new ee,e=f1([new Xe(.6,.3,.6).translate(0,.15,0),new de(.15,.15,1.2,6).translate(0,.9,0),new Ki(.6,.45,4).rotateY(Math.PI/4).translate(0,2.15,0)]),n=new kn(e,Nt("#8f8a80"),s.length),i=ur("#ffb45c",.1,3.2),r=new kn(new Xe(.45,.45,.45),i,s.length),o=new Zt;return s.forEach((a,l)=>{o.makeTranslation(a.x,a.y,a.z),n.setMatrixAt(l,o),o.makeTranslation(a.x,a.y+1.72,a.z),r.setMatrixAt(l,o)}),t.add(n,r),t}function S1(){const s=new ee,t=Nt("#e2462e",{roughness:.5}),e=Nt("#f2f2f2",{roughness:.5}),n=12;for(let a=0;a<n;a++){const l=a/n,c=(a+1)/n,h=9*Math.pow(1-l,1.8)+.6,u=9*Math.pow(1-c,1.8)+.6,f=90/n,d=new it(new de(u,h,f,4,1,!0),a%2?e:t);d.material=d.material.clone(),d.material.wireframe=!0,d.rotation.y=Math.PI/4,d.position.y=a*f+f/2,s.add(d)}s.add(Ht(9,3,9,t,0,30,0)),s.add(Ht(5,2.5,5,e,0,56,0));const i=new it(new de(.15,.4,22,6),t);i.position.y=101,s.add(i);const r=ur("#ffa040",.2,2.5),o=new it(new de(.5,9.4,90,4,8,!0),r);return o.material.wireframe=!0,o.rotation.y=Math.PI/4,o.position.y=45,o.scale.setScalar(1.002),s.add(o),s}function w1(s,t=70,e=[120,200],n=[]){const i=new ee,r=new Xe(1,1,1).translate(0,.5,0),o=nm(16,40,.55);o.wrapS=o.wrapT=_a;const a=new ye({color:"#4c5670",roughness:.6,metalness:.3,emissive:"#ffffff",emissiveMap:o,emissiveIntensity:.05});Ei.push({mat:a,day:.05,night:1.4});const l=new kn(r,a,t),c=new Zt,h=new ii,u=new P,f=new P;let d=0,m=0;for(;d<t&&m++<2e3;){const g=s.x+(Math.random()-.5)*e[0],p=s.z+(Math.random()-.5)*e[1];if(n.some(x=>Math.hypot(x.x-g,x.z-p)<x.r))continue;const _=8+Math.pow(Math.random(),2)*45;c.compose(f.set(g,0,p),h,u.set(6+Math.random()*8,_,6+Math.random()*8)),l.setMatrixAt(d++,c)}return l.count=d,l.castShadow=l.receiveShadow=!0,i.add(l),i}const pi={y:70,w:26,d:22,h:8};function E1(){const s=new ee,t=pi.y,e=nm(12,36,.6),n=new ye({color:"#d9dde4",roughness:.35,metalness:.4,emissive:"#ffffff",emissiveMap:e,emissiveIntensity:.05,map:null});Ei.push({mat:n,day:.05,night:1.6});const i=Ht(pi.w+4,t,pi.d+2,n,0,t/2,0);s.add(i);const r=Nt("#c9a64a",{metalness:.8,roughness:.3});s.add(Ht(pi.w+5,.6,pi.d+3,r,0,t,0)),s.add(Ht(44,8,34,Nt("#eceae4"),0,4,2)),s.add(Ht(14,.5,6,r,0,6.5,-19));const o=new it(new Fe(26,4.4),new _e({map:Ua("SAKURA GRAND",{font:"600 62px serif",color:"#ffe3ec"}),transparent:!0,toneMapped:!1}));o.position.set(0,t-6,-12.05),o.rotation.y=Math.PI,s.add(o);const a=new ee;a.position.y=t+.3;const l=pi.w,c=pi.d,h=pi.h,u=Nt("#8a5a3c",{roughness:.6}),f=new it(new Fe(l,c),Nt("#b98a63",{roughness:.5}));f.rotation.x=-Math.PI/2,f.receiveShadow=!0,a.add(f);const d=new it(new Fe(10,7),Nt("#e8dccb",{roughness:1}));d.rotation.x=-Math.PI/2,d.position.set(-4,.02,-3),a.add(d);const m=new it(new Fe(l,c),Nt("#f1ece4"));m.rotation.x=Math.PI/2,m.position.y=h,a.add(m);const g=Nt("#efe7dc",{side:xe});a.add(Ht(l,h,.3,g,0,h/2,c/2)),a.add(Ht(.3,h,c,g,-l/2,h/2,0)),a.add(Ht(.3,h,c,g,l/2,h/2,0));for(let S=0;S<20;S++)a.add(Ht(.25,h-.4,.2,u,2+S*.5,h/2,c/2-.25));const p=new it(new Fe(l,h),new MM({color:"#cfe6ff",transmission:0,transparent:!0,opacity:.08,roughness:.05,metalness:.1,side:xe,depthWrite:!1}));p.position.set(0,h/2,-c/2),a.add(p);for(let S=-l/2;S<=l/2;S+=6.5)a.add(Ht(.15,h,.15,r,S,h/2,-c/2));const _=new ee;_.add(Ht(7,.9,8,u,0,.45,0)),_.add(Ht(6.8,.6,7.6,Nt("#fbfaf6"),0,1.15,-.1)),_.add(Ht(6.9,.25,3.2,Nt("#c76b88"),0,1.5,-2.2));for(const S of[-1.8,1.8])_.add(Ht(2.6,.5,1.2,Nt("#ffffff"),S,1.65,3));_.add(Ht(7.6,3.4,.4,Nt("#5b3a2a"),0,1.7,3.9)),_.position.set(6,0,5.5),a.add(_);for(const S of[1.4,10.6]){a.add(Ht(1.6,1.2,1.6,u,S,.6,9));const N=new it(new de(.45,.6,1,16),ur("#ffd9a0",1.2,2.4));N.position.set(S,1.8,9),a.add(N)}const x=new ee;x.add(Ht(7,.9,2.6,Nt("#3f4f6b"),0,.45,0)),x.add(Ht(7,1.6,.6,Nt("#3f4f6b"),0,1.1,1.1));for(const S of[-3.3,3.3])x.add(Ht(.5,1.3,2.6,Nt("#3f4f6b"),S,.85,0));x.position.set(-6,0,.5),x.rotation.y=Math.PI,x.rotation.y=0,a.add(x),a.add(Ht(3.6,.5,2,Nt("#2a2a2e",{metalness:.4,roughness:.3}),-6,.55,-3.2));const v=new it(new de(.3,.2,.7,12),Nt("#e6e0d6"));v.position.set(-6,1.15,-3.2),a.add(v);const y=new it(new vr(.55,0),Nt("#ffb6cb",{flatShading:!0}));y.position.set(-6,1.8,-3.2),a.add(y);const T=new it(new de(.7,.55,1.2,14),Nt("#2f2f33"));T.position.set(-11.5,.6,-8.5),a.add(T);const w=new it(new vr(1.4,1),Nt("#4f7a4a",{flatShading:!0}));w.position.set(-11.5,2.6,-8.5),a.add(w);const E=new it(new Fe(4.5,3),new _e({map:Ua("富士",{w:256,h:170,font:"700 110px serif",color:"#2a2a2a",bg:"#f2ead8"})}));E.position.set(-l/2+.2,4.4,2),E.rotation.y=Math.PI/2,a.add(E);const C=new it(new Xe(l-1,.1,.3),ur("#ffd2a0",1.5,2.5));C.position.set(0,h-.3,c/2-.5),a.add(C);const L=new Uh("#ffd6a8",30,30,1.6);L.position.set(0,h-1.5,2),a.add(L),a.traverse(S=>{S.isMesh&&(S.receiveShadow=!0)}),s.add(a),s.add(Ht(l+5,.8,c+3,Nt("#2d3038"),0,t+h+.7,0));const M=Ht(l+5.4,.25,c+3.4,ur("#ff9ab8",.3,2.2),0,t+h+1.2,0);return s.add(M),s.traverse(S=>{S.isMesh&&(S.castShadow=!0)}),s}function b1(){const s=new ee,t=Nt("#6b4430",{roughness:.7}),e=Nt("#3a2418",{roughness:.7}),n=18,i=14,r=4.2,o=1.2;s.add(Ht(n+2,o,i+2,Nt("#8a8378"),0,o/2,0));const a=Ht(2.4,.2,i+2,t,n/2+1.2,o+.1,0);s.add(a);const l=p1(),c=new it(new Fe(n,i),new ye({map:l,roughness:.9}));c.rotation.x=-Math.PI/2,c.position.y=o+.02,c.receiveShadow=!0,s.add(c);const h=m1(),u=new ye({map:h,emissive:"#ffcf8a",emissiveMap:h,emissiveIntensity:.1,side:xe});Ei.push({mat:u,day:.1,night:1.1}),s.add(Ht(.2,r,i,u,-n/2,o+r/2,0)),s.add(Ht(n,r,.2,u,0,o+r/2,-i/2)),s.add(Ht(n,r,.2,u,0,o+r/2,i/2));for(const[T,w]of[[-n/2,-i/2],[-n/2,i/2],[n/2,-i/2],[n/2,i/2],[n/2,0],[0,-i/2],[0,i/2]])s.add(Ht(.35,r,.35,e,T,o+r/2,w));const f=new it(new Fe(n,i),Nt("#a07a55"));f.rotation.x=Math.PI/2,f.position.y=o+r,s.add(f),s.add(Ht(.6,.3,5,e,-n/2+.6,o+.15,-3.2));const d=new it(new Fe(1.2,2.6),new _e({map:Ua("一期一会",{w:128,h:300,font:"700 40px serif",color:"#1a1a1a",bg:"#f3ead6"})}));d.position.set(-n/2+.15,o+2.4,-3.2),d.rotation.y=Math.PI/2,s.add(d),s.add(Ht(3.6,.15,2.2,e,1,o+.75,0));for(const[T,w]of[[1,1.4],[1,-1.4],[-1.4,0],[3.4,0]])s.add(Ht(.2,.6,.2,e,1+(T-1)*0,o+.35,0)),s.add(Ht(1.2,.18,1.2,Nt("#7d2f3c"),T,o+.1,w));const m=new it(new en(.25,12,10),Nt("#2b3a2a"));m.position.set(1,o+1.05,0),s.add(m),s.add(Ht(2.4,.3,5,Nt("#fbf7ef"),-5,o+.15,3.6)),s.add(Ht(2.4,.15,3.2,Nt("#5c78a8"),-5,o+.38,2.7)),s.add(Ht(1.4,.3,.7,Nt("#ffffff"),-5,o+.4,5.6));const g=new it(new Xe(.7,1.4,.7),ur("#ffcf8a",.6,3));g.position.set(-2.8,o+.7,5.5),s.add(g);const p=new Uh("#ffc68a",18,20,1.6);p.position.set(0,o+3,0),s.add(p);const _=new Ki(Math.hypot(n,i)/2+3,5,4,1,!0);_.rotateY(Math.PI/4);const x=new it(_,Nt("#30333b",{side:xe,roughness:.6}));x.scale.set(n/i,1,1),x.position.y=o+r+2.3,s.add(x);const v=new it(new de(2.4,2.4,.8,24),Nt("#7d776c"));v.position.set(n/2+5,.4,-3),s.add(v);const y=new it(new Wi(2.1,24),new ye({color:"#6fb6c9",roughness:.05,metalness:.3,emissive:"#3a8aa0",emissiveIntensity:.3}));return y.rotation.x=-Math.PI/2,y.position.set(n/2+5,.82,-3),s.add(y),s.userData.onsen=y.position.clone(),s.traverse(T=>{T.isMesh&&(T.castShadow=!0,T.receiveShadow=!0)}),s}const ve=s=>new Dt(s),Je={dawn:{top:ve("#2a3768"),bottom:ve("#f4b08c"),fog:ve("#d9a596"),sun:ve("#ffc89a"),sunI:1.6,hemi:.75,night:.15,cloud:ve("#ffd9c8"),sunDir:new P(1,.18,-.6)},day:{top:ve("#2f6fbf"),bottom:ve("#bfe0f5"),fog:ve("#bcd9ee"),sun:ve("#fff6e8"),sunI:2.4,hemi:1,night:0,cloud:ve("#ffffff"),sunDir:new P(.4,.8,-.4)},sunset:{top:ve("#33296a"),bottom:ve("#ff9663"),fog:ve("#d98b78"),sun:ve("#ffae70"),sunI:1.8,hemi:.7,night:.2,cloud:ve("#ffc2a1"),sunDir:new P(-.5,.14,-1)},dusk:{top:ve("#18204a"),bottom:ve("#b87189"),fog:ve("#5e4a6e"),sun:ve("#ff9b8a"),sunI:.8,hemi:.45,night:.6,cloud:ve("#c08aa0"),sunDir:new P(-.6,.05,-1)},night:{top:ve("#03061a"),bottom:ve("#1c2752"),fog:ve("#141b3a"),sun:ve("#9fb4ff"),sunI:.35,hemi:.28,night:1,cloud:ve("#3a4470"),sunDir:new P(.3,.6,.4)}};function $f(){return{top:new Dt,bottom:new Dt,fog:new Dt,sun:new Dt,sunI:1,hemi:1,night:0,cloud:new Dt,sunDir:new P}}function br(s,t,e,n){return s.top.copy(t.top).lerp(e.top,n),s.bottom.copy(t.bottom).lerp(e.bottom,n),s.fog.copy(t.fog).lerp(e.fog,n),s.sun.copy(t.sun).lerp(e.sun,n),s.cloud.copy(t.cloud).lerp(e.cloud,n),s.sunI=t.sunI+(e.sunI-t.sunI)*n,s.hemi=t.hemi+(e.hemi-t.hemi)*n,s.night=t.night+(e.night-t.night)*n,s.sunDir.copy(t.sunDir).normalize().lerp(e.sunDir.clone().normalize(),n).normalize(),s}function eu(s,t){return br(s,t,t,0)}function T1(){const s=new en(4e3,32,16),t=new ze({side:nn,depthWrite:!1,fog:!1,uniforms:{top:{value:new Dt},bottom:{value:new Dt},sunColor:{value:new Dt},sunDir:{value:new P(0,1,0)},night:{value:0},time:{value:0}},vertexShader:`
      varying vec3 vDir;
      void main(){
        vDir = normalize(position);
        vec4 p = modelViewMatrix * vec4(position,1.0);
        gl_Position = projectionMatrix * p;
        gl_Position.z = gl_Position.w; // keep at far plane
      }`,fragmentShader:`
      uniform vec3 top; uniform vec3 bottom; uniform vec3 sunColor; uniform vec3 sunDir;
      uniform float night; uniform float time;
      varying vec3 vDir;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,45.164)))*43758.5453); }
      void main(){
        float h = clamp(vDir.y*1.25+0.12, 0.0, 1.0);
        vec3 col = mix(bottom, top, pow(h, 0.7));
        float d = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        col += sunColor * (pow(d, 600.0)*3.0 + pow(d, 12.0)*0.35) * (1.0 - night*0.7);
        // stars
        vec3 q = floor(vDir*420.0);
        float s = step(0.9975, hash(q));
        float tw = 0.6 + 0.4*sin(time*2.0 + hash(q+1.0)*40.0);
        col += vec3(s*tw) * night * smoothstep(0.0, 0.25, vDir.y);
        gl_FragColor = vec4(col, 1.0);
      }`}),e=new it(s,t);return e.frustumCulled=!1,e.renderOrder=-10,e}function A1(){const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d");for(let n=0;n<14;n++){const i=40+Math.random()*48,r=50+Math.random()*28,o=14+Math.random()*22,a=t.createRadialGradient(i,r,0,i,r,o);a.addColorStop(0,"rgba(255,255,255,0.55)"),a.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=a,t.beginPath(),t.arc(i,r,o,0,Math.PI*2),t.fill()}const e=new As(s);return e.colorSpace=Qe,e}function C1(s){const t=new ee,e=A1(),n=[];for(const i of s)for(let r=0;r<i.count;r++){const o=new Wa({map:e,transparent:!0,depthWrite:!1,opacity:i.opacity??.9,fog:!0});n.push(o);const a=new Ch(o),l=i.size[0]+Math.random()*(i.size[1]-i.size[0]);a.scale.set(l*1.8,l,1),a.position.set(i.min[0]+Math.random()*(i.max[0]-i.min[0]),i.min[1]+Math.random()*(i.max[1]-i.min[1]),i.min[2]+Math.random()*(i.max[2]-i.min[2])),t.add(a)}return t.userData.setTint=i=>n.forEach(r=>r.color.copy(i)),t}function R1(s=700){const t=new ps;t.moveTo(0,0),t.bezierCurveTo(.08,.05,.1,.16,0,.22),t.bezierCurveTo(-.1,.16,-.08,.05,0,0);const e=new Ka(t,4);e.center();const n=new _e({color:"#ffc4d6",side:xe,transparent:!0,opacity:.95,fog:!1}),i=new kn(e,n,s);i.frustumCulled=!1;const r=[],o=36;for(let u=0;u<s;u++)r.push({p:new P((Math.random()-.5)*o*2,(Math.random()-.5)*o,(Math.random()-.5)*o*2),v:.6+Math.random()*1,r:new xn(Math.random()*6,Math.random()*6,Math.random()*6),w:Math.random()*6,s:.6+Math.random()*1.1});const a=new be,l=new Dt,c=["#ffd1df","#ffb7cc","#ffe6ee","#f7a6c0"];for(let u=0;u<s;u++)i.setColorAt(u,l.set(c[u%c.length]));let h=new P;return i.userData.update=(u,f,d,m)=>{if(i.visible=m>.01,n.opacity=.95*Math.min(1,m),!!i.visible){h.copy(d);for(let g=0;g<s;g++){const p=r[g];p.p.y-=p.v*u*1.4,p.p.x+=Math.sin(f*.7+p.w)*u*1.2+u*.8,p.p.z+=Math.cos(f*.5+p.w)*u*.6;for(const x of["x","z"])p.p[x]>o?p.p[x]-=o*2:p.p[x]<-o&&(p.p[x]+=o*2);p.p.y<-o/2&&(p.p.y+=o),p.r.x+=u*p.v,p.r.y+=u*.7,a.position.set(h.x+p.p.x,h.y+p.p.y,h.z+p.p.z),a.rotation.copy(p.r);const _=p.s*(g/s<m?1:0);a.scale.setScalar(_),a.updateMatrix(),i.setMatrixAt(g,a.matrix)}i.instanceMatrix.needsUpdate=!0}},i}function P1(s=160){const t=new Float32Array(s*3),e=new Float32Array(s),n=new ue;n.setAttribute("position",new Ke(t,3)),n.setAttribute("alpha",new Ke(e,1));const i=new ze({transparent:!0,depthWrite:!1,blending:Bi,uniforms:{color:{value:new Dt("#ffffff")},strength:{value:1}},vertexShader:"attribute float alpha; varying float vA; void main(){ vA = alpha; vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = (6.0 + 10.0*alpha) * (300.0 / -mv.z); }",fragmentShader:"uniform vec3 color; uniform float strength; varying float vA; void main(){ vec2 c = gl_PointCoord-0.5; float d = 1.0 - smoothstep(0.0,0.5,length(c)); gl_FragColor = vec4(color, d*vA*0.55*strength); }"}),r=new Vy(n,i);r.frustumCulled=!1;let o=0;return r.userData.push=a=>{t.copyWithin(3,0,(s-1)*3),t[0]=a.x,t[1]=a.y,t[2]=a.z,o=Math.min(s,o+1);for(let l=0;l<s;l++)e[l]=l<o?1-l/s:0;n.attributes.position.needsUpdate=!0,n.attributes.alpha.needsUpdate=!0},r.userData.setPoints=a=>{for(let l=0;l<s;l++){const c=a[l];c?(t[l*3]=c.x,t[l*3+1]=c.y,t[l*3+2]=c.z,e[l]=1-l/a.length):e[l]=0}n.attributes.position.needsUpdate=!0,n.attributes.alpha.needsUpdate=!0},r.userData.reset=()=>{o=0,e.fill(0),n.attributes.alpha.needsUpdate=!0},r}const D1={uniforms:{tDiffuse:{value:null},time:{value:0},vignette:{value:.9},grain:{value:.04}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float time; uniform float vignette; uniform float grain;
    varying vec2 vUv;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r2 = dot(c,c);
      vec2 off = c * r2 * 0.012;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;
      col *= mix(1.0, smoothstep(0.85, 0.15, r2*1.6), vignette);
      col += (rand(uv*vec2(1000.0) + time) - 0.5) * grain;
      gl_FragColor = vec4(col, 1.0);
    }`},Ge={BKK:{code:"BKK",name:"สุวรรณภูมิ กรุงเทพฯ",lon:100.75,lat:13.69,country:"TH"},DMK:{code:"DMK",name:"ดอนเมือง กรุงเทพฯ",lon:100.6,lat:13.91,country:"TH"},CNX:{code:"CNX",name:"เชียงใหม่",lon:98.97,lat:18.77,country:"TH"},HKT:{code:"HKT",name:"ภูเก็ต",lon:98.3,lat:8.11,country:"TH"},NRT:{code:"NRT",name:"นาริตะ โตเกียว",lon:140.39,lat:35.77,country:"JP"},HND:{code:"HND",name:"ฮาเนดะ โตเกียว",lon:139.78,lat:35.55,country:"JP"},KIX:{code:"KIX",name:"คันไซ โอซาก้า",lon:135.24,lat:34.43,country:"JP"},NGO:{code:"NGO",name:"ชูบุ นาโกย่า",lon:136.8,lat:34.86,country:"JP"},FUK:{code:"FUK",name:"ฟุกุโอกะ",lon:130.45,lat:33.59,country:"JP"},CTS:{code:"CTS",name:"ชิโตเสะ ซัปโปโร",lon:141.69,lat:42.78,country:"JP"}},L1=["BKK","DMK","CNX","HKT"],ah=["NRT","HND","KIX","NGO","FUK","CTS"],Na=[{id:"tokyo",en:"Tokyo",name:"โตเกียว ชิบูย่า & อาซากุสะ",jp:"東京",lon:139.69,lat:35.69,hours:8,price:1200,region:"kanto"},{id:"fuji",en:"Fuji",name:"ภูเขาไฟฟูจิ & คาวากุจิโกะ",jp:"富士山",lon:138.73,lat:35.4,hours:7,price:1800,region:"kanto"},{id:"hakone",en:"Hakone",name:"ฮาโกเน่ ออนเซ็น",jp:"箱根",lon:139.1,lat:35.23,hours:6,price:2200,region:"kanto"},{id:"kyoto",en:"Kyoto",name:"เกียวโต ฟูชิมิอินาริ",jp:"京都",lon:135.77,lat:35.01,hours:8,price:1500,region:"kansai"},{id:"nara",en:"Nara",name:"นารา สวนกวาง",jp:"奈良",lon:135.84,lat:34.68,hours:5,price:900,region:"kansai"},{id:"osaka",en:"Osaka",name:"โอซาก้า ปราสาท & โดทงโบริ",jp:"大阪",lon:135.5,lat:34.69,hours:7,price:1300,region:"kansai"},{id:"kanazawa",en:"Kanazawa",name:"คานาซาว่า & ชิราคาวาโกะ",jp:"白川郷",lon:136.9,lat:36.26,hours:8,price:2100,region:"chubu"},{id:"hiroshima",en:"Hiroshima",name:"ฮิโรชิม่า & มิยาจิม่า",jp:"宮島",lon:132.32,lat:34.3,hours:7,price:1700,region:"chugoku"},{id:"fukuoka",en:"Fukuoka",name:"ฟุกุโอกะ ยาไต",jp:"福岡",lon:130.4,lat:33.59,hours:5,price:900,region:"kyushu"},{id:"sapporo",en:"Sapporo",name:"ซัปโปโร & โอตารุ",jp:"札幌",lon:141.2,lat:43.1,hours:8,price:1600,region:"hokkaido"},{id:"furano",en:"Furano",name:"ฟุราโนะ ทุ่งลาเวนเดอร์",jp:"富良野",lon:142.38,lat:43.34,hours:7,price:1900,region:"hokkaido"}],rm=[{id:"business",name:"City Smart 3★",note:"ใกล้สถานี เดินทางสะดวก",perNight:2200},{id:"grand",name:"Sakura Grand 5★",note:"ห้องสวีทวิวฟูจิ ชั้นบนสุด",perNight:6900},{id:"ryokan",name:"เรียวกัง ฮานามิ 4★",note:"ห้องเสื่อทาทามิ พร้อมออนเซ็นส่วนตัว",perNight:5400}],om=[{id:"standard",name:"Standard Twin",mult:1},{id:"deluxe",name:"Deluxe Fuji View",mult:1.35},{id:"suite",name:"Suite / Washitsu",mult:1.9}],nu=[{id:"none",name:"ไม่ซื้อ",price:0,medical:"-",luggage:"-",delay:"-"},{id:"basic",name:"Basic",price:390,medical:"1 ล้านบาท",luggage:"10,000 บาท",delay:"2,000 บาท"},{id:"plus",name:"Plus",price:690,medical:"3 ล้านบาท",luggage:"30,000 บาท",delay:"5,000 บาท"},{id:"premium",name:"Premium",price:1190,medical:"5 ล้านบาท",luggage:"60,000 บาท",delay:"10,000 บาท"}],am=[{id:"wifi",name:"Pocket WiFi / eSIM",price:120,per:"day"},{id:"jrpass",name:"JR Pass 7 วัน",price:11500,per:"trip"},{id:"transfer",name:"รถรับส่งสนามบินส่วนตัว",price:2800,per:"trip"},{id:"kimono",name:"เช่าชุดกิโมโน + ช่างภาพ",price:1900,per:"trip"}];function Zf(s,t){const e=Ge[s],n=Ge[t],i=Math.hypot(e.lon-n.lon,e.lat-n.lat);return Math.round((9e3+i*220)/100)*100}function xs(s,t){const n=Math.PI/180,i=(t.lat-s.lat)*n,r=(t.lon-s.lon)*n,o=Math.sin(i/2)**2+Math.cos(s.lat*n)*Math.cos(t.lat*n)*Math.sin(r/2)**2;return 2*6371*Math.asin(Math.sqrt(o))}const I1={hokkaido:[[141.2,41.8],[140,41.4],[139.9,42.3],[140.5,43.2],[141.4,43.3],[141.7,44.3],[141.9,45.4],[142.9,44.7],[144.3,44.1],[145.3,44.3],[145.8,43.4],[145.2,43],[143.9,42.9],[143.3,42],[142,42.5]],honshu:[[141.4,41.4],[141.5,40.5],[142,39.6],[141.6,38.4],[141,38.2],[141,37],[140.8,36],[140.8,35.7],[140.4,35.2],[139.8,34.9],[139.7,35.3],[139.1,35.1],[138.8,34.6],[138.2,34.6],[137.3,34.6],[136.9,34.3],[136,33.5],[135.4,33.6],[135.1,34.3],[134.2,34.6],[133,34.4],[132.1,33.9],[130.9,34],[131.2,34.5],[132.4,35.4],[133.3,35.6],[134.4,35.6],[135.4,35.6],[136,35.9],[136.7,36.9],[137.3,36.8],[137.4,37.5],[138.5,37.4],[139.4,38.1],[139.9,39],[140,40.2],[140.3,41.2]],shikoku:[[132.5,33.2],[133,32.7],[133.7,33.5],[134.3,33.3],[134.7,33.8],[134.6,34.2],[133.6,34.4],[132.9,34.1],[132,33.9]],kyushu:[[129.8,33.4],[130.4,33.9],[131,33.9],[131.7,33.3],[131.9,32.6],[131.4,31.4],[130.7,31],[130.2,31.3],[130.4,32.1],[130,32.8],[129.6,33]],thailand:[[97.5,18.5],[99,20.4],[100.5,20.3],[101.2,19.5],[102.1,18.2],[103.5,18.3],[104.8,17],[105.6,15.7],[105.2,14.3],[102.5,13.6],[102.4,12.2],[100.9,12.7],[100,13.5],[99.1,10.5],[99.6,9],[100.4,7.4],[101,6.8],[100.2,6.4],[98.5,8],[98.3,9.2],[98.7,10.6],[99.2,12],[98.5,13.2],[98.2,15.1],[97.4,16.8]]},Oa=6;function Zs(s,t,e=0){return new P((s-122)*Oa,e,-(t-28)*Oa)}const lm="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",U1=`
  uniform vec3 color; uniform float time; uniform float speed; uniform float reveal;
  varying vec2 vUv;
  void main(){
    if (vUv.x > reveal) discard;
    float dash = smoothstep(0.35, 0.5, fract(vUv.x*28.0 - time*speed)) * smoothstep(1.0, 0.85, fract(vUv.x*28.0 - time*speed));
    float edge = 1.0 - abs(vUv.y - 0.5)*2.0;
    float a = (0.35 + dash*0.9) * (0.4 + edge*0.6);
    gl_FragColor = vec4(color * (0.55 + dash*0.8), a*0.85);
  }`;function N1(s,t=1){return new ze({transparent:!0,depthWrite:!1,blending:Bi,side:xe,uniforms:{color:{value:new Dt(s)},time:{value:0},speed:{value:t},reveal:{value:0}},vertexShader:lm,fragmentShader:U1,toneMapped:!1})}function O1(s,t,e){const n=document.createElement("canvas");n.width=512,n.height=128;const i=n.getContext("2d");i.font='700 54px "IBM Plex Sans Thai", sans-serif',i.fillStyle=e,i.textAlign="center",i.textBaseline="middle",i.shadowColor=e,i.shadowBlur=16,i.fillText(s,256,64);const r=new As(n);r.colorSpace=Qe;const o=new Ch(new Wa({map:r,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1}));return o.scale.set(84,21,1),o}function F1(){const s=new ee,t=new Dt("#7fe3ff"),e=new ze({transparent:!0,depthWrite:!1,blending:Bi,fog:!1,uniforms:{time:{value:0},color:{value:t},fade:{value:1}},vertexShader:lm,fragmentShader:`
      uniform float time; uniform vec3 color; uniform float fade; varying vec2 vUv;
      void main(){
        vec2 p = (vUv-0.5)*2.0; float r = length(p);
        vec2 gp = abs(fract(vUv*36.0)-0.5);
        float grid = smoothstep(0.47, 0.5, max(gp.x, gp.y));
        float ring = smoothstep(0.012, 0.0, abs(fract(r*4.0 - time*0.15)-0.5)-0.49);
        float sweep = pow(max(0.0, cos(atan(p.y,p.x) - time*0.6)), 40.0);
        float a = (grid*0.10 + ring*0.16 + sweep*0.14 + 0.025) * smoothstep(1.0, 0.6, r);
        gl_FragColor = vec4(color, a*fade);
      }`}),n=new it(new Wi(196,96),new _e({color:"#070c26",fog:!1}));n.rotation.x=-Math.PI/2,n.position.set(20,-.5,-20),n.renderOrder=-2,s.add(n);const i=new it(new Ta(195,197.5,128),new _e({color:"#7fe3ff",transparent:!0,opacity:.6,fog:!1,side:xe}));i.rotation.x=-Math.PI/2,i.position.set(20,-.3,-20),s.add(i);const r=new it(new Fe(380,380),e);r.rotation.x=-Math.PI/2,r.renderOrder=-1,r.position.set(20,0,-20),s.add(r);const o=new _e({color:"#2aa6d6",transparent:!0,opacity:.28,depthWrite:!1,side:xe,blending:Bi,fog:!1}),a=new Wd({color:"#c8f7ff",fog:!1,toneMapped:!1});for(const[v,y]of Object.entries(I1)){const T=new ps(y.map(([N,O])=>new J((N-122)*Oa,(O-28)*Oa))),w=new it(new Ka(T),o.clone());v==="thailand"&&w.material.color.set("#c9a64a"),w.rotation.x=-Math.PI/2,w.position.y=.3,s.add(w);const E=y.map(([N,O])=>Zs(N,O,.6)),C=new ky(new ue().setFromPoints(E),a);s.add(C);const L=new ue,M=[];for(let N=0;N<E.length;N++){const O=E[N],k=E[(N+1)%E.length];M.push(O.x,0,O.z,k.x,0,k.z,k.x,5,k.z,O.x,0,O.z,k.x,5,k.z,O.x,5,O.z)}L.setAttribute("position",new qt(M,3));const S=new it(L,new _e({color:v==="thailand"?"#f2cf74":"#4fd8ff",transparent:!0,opacity:.45,side:xe,depthWrite:!1,blending:Bi,fog:!1}));s.add(S)}const l=new de(.9,.2,4,10).translate(0,2,0),c=new Ta(1.4,2,32).rotateX(-Math.PI/2),h={},u=(v,y,T,w,E,C)=>{const L=new ee;L.position.copy(Zs(y,T,.8));const M=new it(l,new _e({color:w,toneMapped:!1,fog:!1})),S=new it(c,new _e({color:w,transparent:!0,opacity:.8,depthWrite:!1,toneMapped:!1,fog:!1})),N=O1(E,C,w);N.position.y=16,L.add(M,S,N),L.userData={pin:M,ring:S,label:N,color:new Dt(w),active:!1},s.add(L),h[v]=L};for(const v of Object.values(Ge))u(v.code,v.lon,v.lat,v.country==="TH"?"#ffd27a":"#ffffff",v.code);for(const v of Na)u(v.id,v.lon,v.lat,"#ff9ec0",v.en);const f=new ee;s.add(f);const d=[];function m(){f.children.slice().forEach(v=>{var y,T,w;(y=v.geometry)==null||y.dispose(),(w=(T=v.material)==null?void 0:T.dispose)==null||w.call(T),f.remove(v)}),d.length=0}function g(v,y,T,w){const E=N1(y,w),C=new it(new Lh(v,160,T,8,!1),E);C.frustumCulled=!1,f.add(C);const L=new it(new en(T*2,12,12),new _e({color:y,toneMapped:!1,fog:!1}));return L.scale.multiplyScalar(1),f.add(L),d.push({curve:v,comet:L,mat:E,speed:.12*w,offset:Math.random()}),E}let p=0;function _(v,y){m(),p=y;for(const G of Object.values(h))G.userData.active=!1;const T=Ge[v.dep],w=Ge[v.arr],E=Ge[v.ret],C=Zs(T.lon,T.lat,1),L=Zs(w.lon,w.lat,1),M=Zs(E.lon,E.lat,1),S=(G,B,j,I)=>{const W=G.clone().add(B).multiplyScalar(.5);return W.y+=j,W.z+=I,new Xa(G,W,B)},N=C.distanceTo(L),O=M.distanceTo(C);g(S(C,L,N*.16,-8),"#7fe3ff",.55,1.2),g(S(M,C,O*.11,14),"#ffd27a",.45,.9);const k=[L,...v.stops.map(G=>{const B=Na.find(j=>j.id===G);return Zs(B.lon,B.lat,1.6)}),M];if(k.length>=2){const G=[];for(let B=0;B<k.length-1;B++){const j=k[B],I=k[B+1];G.push(j);const W=j.clone().lerp(I,.5);W.x+=(I.z-j.z)*.08,W.z-=(I.x-j.x)*.08,W.y=1.6,G.push(W)}G.push(k[k.length-1]),g(new ao(G,!1,"centripetal"),"#ff8fb8",.45,1.6)}for(const G of[v.dep,v.arr,v.ret,...v.stops])h[G]&&(h[G].userData.active=!0)}function x(v,y){e.uniforms.time.value=v;const T=Math.min(1,(v-p)/1.6);for(const w of d){w.mat.uniforms.time.value=v,w.mat.uniforms.reveal.value=T;const E=T<1?T:(v*w.speed+w.offset)%1;w.comet.position.copy(w.curve.getPoint(E))}for(const w of Object.values(h)){const E=w.userData,C=E.active?1:.35;E.pin.material.opacity=C,E.pin.material.transparent=!0,E.label.material.opacity+=((E.active?1:0)-E.label.material.opacity)*.1;const L=E.active?1+(v*.8+w.position.x*.01)%1*2.2:1;E.ring.scale.setScalar(L),E.ring.material.opacity=E.active?1-(L-1)/2.2:.2}}return s.userData={setRoute:_,update:x,markers:h},s}const bn=(s,t,e)=>new P(s,t,e),fi=(s,t={})=>new ye({color:s,roughness:.5,metalness:.1,...t});function B1(s,{road:t,lake:e,pagoda:n,city:i}){const r=[],o=[],a=new ao([bn(1440,9,420),bn(1440,9,0),bn(1442,9,-520),bn(1484,9,-662),bn(1600,9,-700),bn(2e3,9,-705),bn(2400,9,-705)],!1,"centripetal"),l=a.getLength();{const Z=[],st=[];for(let lt=0;lt<=300;lt++){const bt=lt/300,wt=a.getPointAt(bt),Vt=a.getTangentAt(bt),Wt=bn(-Vt.z,0,Vt.x).normalize();if(Z.push(wt.x+Wt.x*3.2,wt.y-.5,wt.z+Wt.z*3.2,wt.x-Wt.x*3.2,wt.y-.5,wt.z-Wt.z*3.2),lt<300){const et=lt*2;st.push(et,et+1,et+2,et+1,et+3,et+2)}}const St=new ue;St.setAttribute("position",new qt(Z,3)),St.setIndex(st),St.computeVertexNormals();const Lt=new it(St,fi("#c9ccd3",{side:xe,roughness:.8}));Lt.receiveShadow=!0,s.add(Lt);const Y=Math.floor(l/16),ot=new kn(new Xe(1.6,1,1.6).translate(0,.5,0),fi("#b5b8bf"),Y),gt=new Zt;for(let lt=0;lt<Y;lt++){const bt=a.getPointAt(lt/Y);gt.makeScale(1,bt.y-.8+2,1).setPosition(bt.x,-2,bt.z),ot.setMatrixAt(lt,gt)}ot.castShadow=!0,s.add(ot)}const c=new ee,h=[],u=fi("#f6f7f9",{roughness:.3,metalness:.3}),f=fi("#1f4aa8"),d=new ye({color:"#16202e",emissive:"#ffe2b0",emissiveIntensity:.05,roughness:.2});Ei.push({mat:d,day:.05,night:1.4});const m=15,g=8;for(let I=0;I<g;I++){const W=new ee,Z=new it(new Xe(3,3.2,m-.6),u);Z.position.y=2,W.add(Z);const st=new it(new Xe(3.04,.35,m-.6),f);st.position.y=1.2,W.add(st);const St=new it(new Xe(3.06,.6,m-2),d);if(St.position.y=2.6,W.add(St),I===0||I===g-1){const Lt=new it(new en(1.5,16,12),u);Lt.scale.set(1,1.05,3.6),Lt.position.set(0,1.9,(I===0?-1:1)*(m/2+1.6)),W.add(Lt);const Y=new it(new en(.22,8,8),new _e({color:"#fff4d2"}));Y.position.set(0,1.4,(I===0?-1:1)*(m/2+6.6)),W.add(Y)}W.traverse(Lt=>{Lt.isMesh&&(Lt.castShadow=!0)}),c.add(W),h.push(W)}c.userData.info="train",s.add(c),r.push(c);const p=46,_=new P;o.push(I=>{const W=I%p/p;h.forEach((Z,st)=>{const St=Math.max(0,Math.min(1,W-st*m/l)),Lt=a.getPointAt(St),Y=a.getTangentAt(St);Z.position.copy(Lt).setY(Lt.y-.2),Z.lookAt(_.copy(Z.position).sub(Y)),Z.visible=W-st*m/l>0&&W<.995})});const x=14,v=new Xe(1.8,1.3,3.8).translate(0,.9,0),y=new kn(v,fi("#ffffff",{roughness:.35,metalness:.4}),x),T=["#e2522f","#f2f2f2","#2b3a67","#f2c14e","#1d1d22","#7aa6d8","#c0c4cc"],w=new Dt,E=[];for(let I=0;I<x;I++)y.setColorAt(I,w.set(T[I%T.length])),E.push({u:Math.random(),dir:I%2?1:-1,speed:.012+Math.random()*.01});y.castShadow=!0,s.add(y);const C=new be;o.push((I,W)=>{E.forEach((Z,st)=>{Z.u=(Z.u+Z.dir*Z.speed*W+1)%1;const St=t.getPointAt(Z.u),Lt=t.getTangentAt(Z.u),Y=bn(-Lt.z,0,Lt.x).normalize().multiplyScalar(Z.dir>0?1.9:-1.9);C.position.copy(St).add(Y).setY(.15),C.lookAt(_.copy(C.position).addScaledVector(Lt,Z.dir)),C.updateMatrix(),y.setMatrixAt(st,C.matrix)}),y.instanceMatrix.needsUpdate=!0});const L=46,M=new qa(.28,.8,3,8).translate(0,.7,0),S=new kn(M,fi("#ffffff"),L),N=[],O=["#e66a8c","#3d5aa8","#f2b134","#7a4fb5","#3aa17e","#e2522f","#2b2b33","#f4efe6"];for(let I=0;I<L;I++){S.setColorAt(I,w.set(O[I%O.length]));const W=I%3;W===0?N.push({c:n,r:39+Math.random()*5,a:Math.random()*6,s:(Math.random()<.5?-1:1)*(.05+Math.random()*.05),y:0}):W===1?N.push({c:e,r:52+Math.random()*4,a:Math.random()*6,s:(Math.random()<.5?-1:1)*(.03+Math.random()*.03),y:0}):N.push({c:i,r:21+Math.random()*6,a:Math.random()*6,s:(Math.random()<.5?-1:1)*(.02+Math.random()*.02),y:0})}S.castShadow=!0,s.add(S),o.push((I,W)=>{N.forEach((Z,st)=>{Z.a+=Z.s*W,C.position.set(Z.c.x+Math.cos(Z.a)*Z.r,Math.abs(Math.sin(I*6+st))*.12,Z.c.z+Math.sin(Z.a)*Z.r),C.rotation.set(0,-Z.a+(Z.s>0?0:Math.PI),0),C.updateMatrix(),S.setMatrixAt(st,C.matrix)}),S.instanceMatrix.needsUpdate=!0});for(let I=0;I<3;I++){const W=new ee,Z=new it(new en(1.2,12,8,0,Math.PI*2,0,Math.PI/2),fi("#fafafa"));Z.rotation.x=Math.PI,Z.scale.set(1,.6,1.6),Z.position.y=.5,W.add(Z);const st=new it(new $a(.6,.16,6,12,Math.PI),fi("#fafafa"));st.position.set(0,1,-1.2),st.rotation.y=Math.PI/2,W.add(st);const St=new it(new Ki(.12,.4,6),fi("#f29b38"));St.position.set(0,1.55,-1.75),St.rotation.x=-Math.PI/2,W.add(St),W.userData.info="boat",s.add(W),r.push(W);const Lt=14+I*9,Y=.12-I*.025,ot=I*2.1;o.push(gt=>{const lt=gt*Y+ot;W.position.set(e.x+Math.cos(lt)*Lt,.1+Math.sin(gt*2+I)*.06,e.z+Math.sin(lt)*Lt),W.rotation.y=-lt+Math.PI})}const k=new ue;k.setAttribute("position",new qt([0,0,-.3,-1,0,.2,0,0,.3,0,0,-.3,0,0,.3,1,0,.2],3)),k.computeVertexNormals();const G=new _e({color:"#222533",side:xe}),B=[];for(let I=0;I<4;I++){const W=new ee,Z=[];for(let st=0;st<7;st++){const St=new it(k.clone(),G),Lt=Math.ceil(st/2),Y=st%2?1:-1;St.position.set(Y*Lt*1.6,0,Lt*1.8),St.scale.setScalar(.9),W.add(St),Z.push(St)}s.add(W),B.push({g:W,birds:Z,c:bn(1640+I*60,45+I*12,-300-I*150),r:90+I*40,s:.06+I*.015,o:I*1.7})}o.push(I=>{for(const W of B){const Z=I*W.s+W.o;W.g.position.set(W.c.x+Math.cos(Z)*W.r,W.c.y+Math.sin(I*.4+W.o)*4,W.c.z+Math.sin(Z)*W.r),W.g.rotation.y=-Z,W.birds.forEach((st,St)=>{const Lt=Math.sin(I*9+St*.7)*.6,Y=st.geometry.attributes.position;Y.setY(1,Lt),Y.setY(5,Lt),Y.needsUpdate=!0})}});const j=[{c:bn(1650,200,-350),r:700,s:.035,o:0,bank:.28},{c:bn(1650,260,-500),r:900,s:-.025,o:2,bank:-.22},{c:bn(40,160,-60),r:520,s:.04,o:1,bank:.3}];for(const I of j){const W=im();W.userData.gear.visible=!1,W.scale.setScalar(.9),W.userData.info="plane",s.add(W),r.push(W),o.push(Z=>{const st=Z*I.s+I.o;W.position.set(I.c.x+Math.cos(st)*I.r,I.c.y,I.c.z+Math.sin(st)*I.r);const St=-Math.sin(st)*Math.sign(I.s),Lt=Math.cos(st)*Math.sign(I.s);W.rotation.set(I.bank,Math.atan2(-Lt,St),0,"YZX")})}return{pickables:r,trainNext:I=>p-I%p,update(I,W){for(const Z of o)Z(I,W)}}}const kt=(s,t,e)=>new P(s,t,e),lh=s=>Math.min(1,Math.max(0,s)),Jf=(s,t,e)=>lh((s-t)/(e-t)),Qf=s=>s*s*s*(s*(s*6-15)+10),oe={hotel:kt(1782,0,-520),ryokan:kt(1640,0,-770),pagoda:kt(1610,0,-560),fuji:kt(1630,0,-1150),tower:kt(1840,0,-230),lake:kt(1655,.15,-860),map:kt(1700,430,-460),guide:kt(1678,0,-44)};function z1(){const s=new Vd;s.fog=new Ah("#bcd9ee",480,3200);const t=T1();s.add(t);const e=new SM("#dfefff","#4a5a3a",1);s.add(e);const n=new bM("#ffffff",2);n.castShadow=!0,n.shadow.mapSize.set(2048,2048);const i=n.shadow.camera;i.left=i.bottom=-140,i.right=i.top=140,i.near=1,i.far=900,n.shadow.bias=-4e-4,n.shadow.normalBias=.6,s.add(n,n.target);const r=new it(new Fe(9e3,9e3),new ye({color:"#1d4d6f",roughness:.18,metalness:.35}));r.rotation.x=-Math.PI/2,r.position.set(900,-1.5,-400),s.add(r);function o(K,ct,H,nt,mt,Et=.06){const ut=new Fe(K,ct,60,60);ut.rotateX(-Math.PI/2);const Xt=new Dt(mt),yt=new Dt,$t=new Float32Array(ut.attributes.position.count*3);for(let ft=0;ft<ut.attributes.position.count;ft++)yt.copy(Xt).offsetHSL(0,0,(Math.random()-.5)*Et),$t.set([yt.r,yt.g,yt.b],ft*3);ut.setAttribute("color",new Ke($t,3));const U=new it(ut,new ye({vertexColors:!0,roughness:.95}));return U.position.set(H,0,nt),U.receiveShadow=!0,s.add(U),U}o(900,520,120,-40,"#6d8f4c"),o(980,1560,1660,-500,"#6f9256");{const K=new Ki(1,1,7);K.translate(0,.5,0);const ct=new ye({color:"#3f5f45",roughness:1,flatShading:!0}),H=70,nt=new kn(K,ct,H),mt=new Zt,Et=new ii,ut=new P,Xt=new P;for(let yt=0;yt<H;yt++){const U=(yt%2?1:-1)>0?1960+Math.random()*160:1240+Math.random()*140,ft=-100-Math.random()*1100,$=30+Math.random()*50;mt.compose(Xt.set(U,0,ft),Et.setFromEuler(new xn(0,Math.random()*3,0)),ut.set($,30+Math.random()*70,$)),nt.setMatrixAt(yt,mt)}s.add(nt)}const a=qf(260,14);a.position.set(40,0,0),s.add(a);const l=jf({thai:!0,label:"BKK  สุวรรณภูมิ",towerX:60});l.position.set(0,0,-40),s.add(l);{const K=new vr(3,0),ct=new kn(K,new ye({color:"#3f7a3a",flatShading:!0}),90),H=new Zt;for(let nt=0;nt<90;nt++){const mt=-250+Math.random()*600,Et=Math.random()<.5?30+Math.random()*150:-90-Math.random()*180;H.makeScale(1+Math.random(),1+Math.random()*1.5,1+Math.random()).setPosition(mt,3,Et),ct.setMatrixAt(nt,H)}ct.castShadow=!0,s.add(ct)}const c=qf(280,14);c.position.set(1590,0,0),s.add(c);const h=jf({label:"NRT  成田",towerX:-60});h.position.set(1600,0,-40),s.add(h);const u=g1();u.position.copy(oe.guide),u.rotation.y=.5,s.add(u);const f=new ee;["#4b6cb7","#f2b134","#7a4fb5","#3aa17e","#d9534f","#2b3a67"].forEach((K,ct)=>{const H=sm(K);H.position.set(oe.guide.x-3-ct%3*1.4,0,oe.guide.z+2+Math.floor(ct/3)*1.4),H.rotation.y=Math.PI/2,f.add(H)}),s.add(f);const d=new ao([kt(1688,.2,-58),kt(1682,.2,-160),kt(1682,.2,-250),kt(1692,.2,-330),kt(1700,.2,-420),kt(1728,.2,-500),kt(1752,.2,-545)],!1,"centripetal");{const H=[],nt=[];for(let ut=0;ut<=200;ut++){const Xt=ut/200,yt=d.getPointAt(Xt),$t=d.getTangentAt(Xt),U=kt(-$t.z,0,$t.x).normalize();if(H.push(yt.x+U.x*4.2,.12,yt.z+U.z*4.2,yt.x-U.x*4.2,.12,yt.z-U.z*4.2),ut<200){const ft=ut*2;nt.push(ft,ft+1,ft+2,ft+1,ft+3,ft+2)}}const mt=new ue;mt.setAttribute("position",new qt(H,3)),mt.setIndex(nt),mt.computeVertexNormals();const Et=new it(mt,new ye({color:"#3a3d44",roughness:.9,side:xe}));Et.receiveShadow=!0,s.add(Et)}const m=K=>{let ct=0,H=1e9;for(let nt=0;nt<=400;nt++){const mt=nt/400,Et=Math.abs(d.getPointAt(mt).z-K);Et<H&&(H=Et,ct=mt)}return ct},g=m(-262),p=m(-330);for(let K=g;K<=p;K+=.0085){const ct=d.getPointAt(K),H=d.getTangentAt(K),nt=Kf(1.25,"#e2522f");nt.position.copy(ct).setY(0),nt.rotation.y=Math.atan2(H.x,H.z),s.add(nt)}const _=Kf(3.2,"#d8382c");_.position.set(oe.lake.x+20,0,oe.lake.z-30),_.rotation.y=.3,s.add(_);const x=[],v=[];for(let K=0;K<=60;K++){const ct=K/60,H=d.getPointAt(ct),nt=d.getTangentAt(ct),mt=kt(-nt.z,0,nt.x).normalize();ct>g-.02&&ct<p+.02||(K%2===0&&(x.push(H.clone().addScaledVector(mt,6).setY(0)),x.push(H.clone().addScaledVector(mt,-6).setY(0))),v.push(H.clone().addScaledVector(mt,10+Math.random()*4).setY(0)),v.push(H.clone().addScaledVector(mt,-10-Math.random()*4).setY(0)))}for(let K=0;K<40;K++){const ct=Math.random()*Math.PI*2,H=30+Math.random()*30;v.push(kt(oe.pagoda.x+Math.cos(ct)*H,0,oe.pagoda.z+Math.sin(ct)*H))}for(let K=0;K<30;K++){const ct=Math.random()*Math.PI*2,H=55+Math.random()*25;v.push(kt(oe.lake.x+Math.cos(ct)*H,0,oe.lake.z+Math.sin(ct)*H))}s.add(M1(x)),s.add(y1(v));const y=new it(new de(24,36,10,32),new ye({color:"#5f8a4f",roughness:1}));y.position.set(oe.pagoda.x,5,oe.pagoda.z),y.receiveShadow=!0,s.add(y);const T=v1();T.position.set(oe.pagoda.x,10,oe.pagoda.z),T.rotation.y=.2,s.add(T);const w=x1();w.position.copy(oe.fuji),s.add(w);const E=new it(new Wi(48,48),new ye({color:"#4d86a8",roughness:.05,metalness:.6}));E.rotation.x=-Math.PI/2,E.position.copy(oe.lake),s.add(E);const C=S1();C.position.copy(oe.tower),s.add(C),s.add(w1(kt(1850,0,-230),80,[170,230],[{x:oe.tower.x,z:oe.tower.z,r:18},{x:1700,z:-230,r:30}]));const L=E1();L.position.copy(oe.hotel),s.add(L);const M=b1();M.position.copy(oe.ryokan),M.rotation.y=Math.PI/2,s.add(M);const S=k1();S.position.copy(M.localToWorld(M.userData.onsen.clone())),s.add(S);const N=im();s.add(N);const O=new ao([kt(-60,3.1,0),kt(40,3.1,0),kt(130,6,0),kt(260,40,2),kt(430,88,-20),kt(720,98,-60),kt(1010,98,-60),kt(1250,70,-24),kt(1420,24,0),kt(1500,3.1,0),kt(1600,3.1,0)],!1,"centripetal"),k=P1(120);s.add(k);const G=_1();s.add(G);const B=C1([{count:120,min:[200,18,-420],max:[1420,52,260],size:[30,60]},{count:16,min:[300,150,-900],max:[1400,220,-500],size:[60,120],opacity:.6},{count:14,min:[-500,150,-700],max:[600,220,-250],size:[50,110],opacity:.5},{count:26,min:[1300,120,-1300],max:[2100,180,100],size:[50,110],opacity:.55}]);s.add(B);const j=R1(650);s.add(j);const I=B1(s,{road:d,lake:oe.lake,pagoda:oe.pagoda,city:oe.tower}),W=(K,ct)=>{K.userData.info=ct,I.pickables.push(K)};W(L,"hotel"),W(M,"ryokan"),W(T,"pagoda"),W(w,"fuji"),W(C,"tokyo"),W(G,"bus"),W(u,"guide"),W(_,"torii"),W(N,"plane");const Z=F1();Z.position.copy(oe.map),s.add(Z);const st=new P;function St(K){return Qf(Jf(K,.055,.56))}function Lt(K,ct){const H=O.getPointAt(K),nt=O.getTangentAt(K),mt=O.getTangentAt(Math.min(1,K+.01)),Et=Math.atan2(-nt.z,nt.x),ut=Math.atan2(-mt.z,mt.x),Xt=Math.asin(Bc.clamp(nt.y,-1,1)),yt=Bc.clamp((ut-Et)*18,-.5,.5);if(N.position.copy(H),N.rotation.set(yt+Math.sin(ct*.9)*.02*(H.y>20?1:0),Et,Xt,"YZX"),N.userData.gear.visible=H.y<22,H.y>30){const $t=[];for(let U=0;U<120;U++){const ft=K-U*.0012;if(ft<0)break;const $=O.getPointAt(ft);if($.y<30)break;$t.push($.add(st.set(0,-.6,0)))}k.userData.setPoints($t.map((U,ft)=>U.clone().add(st.set(-14,0,0).applyEuler(N.rotation))))}else k.userData.setPoints([]);return H}function Y(K){return Qf(Jf(K,.645,.93))}function ot(K){const ct=d.getPointAt(K),H=d.getTangentAt(K);return G.position.copy(ct).setY(0),G.lookAt(st.copy(G.position).sub(H)),{p:G.position.clone(),f:H.clone().setY(0).normalize()}}const gt={P:kt(0,0,0),B:kt(0,0,0),F:kt(0,0,-1)},lt=(K,ct,H)=>()=>{const nt=kt(-gt.F.z,0,gt.F.x);return gt.B.clone().addScaledVector(gt.F,-K).add(kt(0,ct,0)).addScaledVector(nt,H)},bt=(K,ct,H)=>()=>gt.P.clone().add(kt(K,ct,H)),wt=(K,ct,H)=>()=>kt(K,ct,H),Vt=[{t:0,pos:wt(-170,34,120),look:wt(-5,6,-25)},{t:.045,pos:wt(-95,8,34),look:bt(0,0,0)},{t:.1,pos:bt(-28,5,17),look:bt(14,1,0)},{t:.16,pos:bt(-36,5,-22),look:bt(26,2,0)},{t:.23,pos:bt(-48,15,34),look:bt(12,0,0)},{t:.31,pos:bt(-6,14,78),look:bt(22,-3,0)},{t:.39,pos:bt(-72,28,14),look:bt(90,-16,0)},{t:.46,pos:bt(46,6,34),look:bt(0,0,0)},{t:.53,pos:wt(1528,6,42),look:bt(0,1,0)},{t:.585,pos:wt(1704,11,-6),look:wt(1678,2.5,-46)},{t:.625,pos:wt(1688,3.4,-32),look:wt(1677,2.3,-46)},{t:.68,pos:lt(15,6,-8),look:lt(-18,1.5,0)},{t:.74,pos:lt(12,5,5),look:lt(-25,2,0)},{t:.79,pos:lt(-16,3.5,7),look:lt(0,1.8,0)},{t:.85,pos:wt(1628,28,-478),look:wt(1614,42,-650)},{t:.925,pos:wt(1700,50,-640),look:wt(1782,46,-520)},{t:1,pos:wt(1738,36,-612),look:wt(1782,44,-520)}],Wt=(K,ct,H,nt,mt)=>{const Et=mt*mt,ut=Et*mt;return ct.clone().multiplyScalar(2).add(H.clone().sub(K).multiplyScalar(mt)).add(K.clone().multiplyScalar(2).sub(ct.clone().multiplyScalar(5)).add(H.clone().multiplyScalar(4)).sub(nt).multiplyScalar(Et)).add(ct.clone().multiplyScalar(3).sub(K).sub(H.clone().multiplyScalar(3)).add(nt).multiplyScalar(ut)).multiplyScalar(.5)};function et(K,ct){let H=0;for(;H<Vt.length-2&&K>Vt[H+1].t;)H++;const nt=ut=>Vt[Math.max(0,Math.min(Vt.length-1,ut))],mt=lh((K-Vt[H].t)/(Vt[H+1].t-Vt[H].t)),Et=[nt(H-1),nt(H),nt(H+1),nt(H+2)];return ct.pos.copy(Wt(...Et.map(ut=>ut.pos()),mt)),ct.look.copy(Wt(...Et.map(ut=>ut.look()),mt)),ct}const D=[[0,Je.dawn],[.16,Je.day],[.42,Je.day],[.53,Je.sunset],[.75,Je.sunset],[.88,Je.dusk],[1,Je.night]];function _t(K,ct){let H=0;for(;H<D.length-2&&K>D[H+1][0];)H++;const[nt,mt]=D[H],[Et,ut]=D[H+1];return br(ct,mt,ut,lh((K-nt)/(Et-nt)))}const pt=oe.hotel.clone().add(kt(-2.5,pi.y+3.9,9.5)),ht=oe.fuji.clone().add(kt(0,160,0)),vt=M.localToWorld(kt(-7.6,3.1,-1.5)),Ft=kt(oe.ryokan.x-6,4,oe.ryokan.z-120),Tt=(g+p)/2,R=d.getPointAt(g+.004).add(kt(.6,2.4,0)),b=d.getPointAt(Tt+.02).add(kt(0,2.6,0)),V={hotel:{pos:kt(1738,36,-612),look:kt(1782,44,-520),env:Je.night,petals:.5},suite:{pos:pt,look:pt.clone().add(ht.clone().sub(pt).setY(0).normalize().multiplyScalar(30)).add(kt(0,1.5,0)),env:Je.sunset,petals:0},ryokan:{pos:vt,look:Ft,env:Je.dusk,petals:.3},fuji:{pos:kt(1700,46,-800),look:kt(1632,150,-1150),env:Je.day,petals:.8},pagoda:{pos:kt(1632,26,-488),look:kt(1612,40,-640),env:Je.day,petals:1},torii:{pos:R,look:b,env:Je.sunset,petals:.6},tokyo:{pos:kt(1726,64,-70),look:kt(1842,46,-236),env:Je.night,petals:0}},tt={pos:oe.map.clone().add(kt(4,500,210)),look:oe.map.clone().add(kt(4,0,4)),env:Je.night},rt=$f(),Q=[];s.traverse(K=>{K.userData.blink&&Q.push(K)});let It=0;function xt({dt:K,time:ct,storyT:H,camera:nt,envState:mt,petalsTarget:Et}){t.position.copy(nt.position),t.material.uniforms.time.value=ct;const ut=St(H);gt.P.copy(Lt(ut,ct));const Xt=ot(Y(H));gt.B.copy(Xt.p),gt.F.copy(Xt.f),u.userData.update(ct);const yt=mt||rt;t.material.uniforms.top.value.copy(yt.top),t.material.uniforms.bottom.value.copy(yt.bottom),t.material.uniforms.sunColor.value.copy(yt.sun),t.material.uniforms.sunDir.value.copy(yt.sunDir),t.material.uniforms.night.value=yt.night,s.fog.color.copy(yt.fog),e.intensity=yt.hemi,e.color.copy(yt.top).lerp(new Dt("#ffffff"),.6),n.color.copy(yt.sun),n.intensity=yt.sunI,n.target.position.copy(nt.position).add(nt.getWorldDirection(st).multiplyScalar(60)),n.position.copy(n.target.position).addScaledVector(yt.sunDir,400),B.userData.setTint(yt.cloud),k.material.uniforms.strength.value=1-yt.night*.6,d1(yt.night),a.userData.lights.color.setScalar(.5+yt.night*2.2),c.userData.lights.color.setScalar(.5+yt.night*2.2);const $t=Math.sin(ct*6)>.6;for(const U of Q)U.visible=$t;It+=(Et-It)*Math.min(1,K*2),j.userData.update(K,ct,nt.position,It),S.userData.update(ct),I.update(ct,K),Z.userData.update(ct,nt)}return{scene:s,plane:N,life:I,update:xt,storyPose:et,storyEnv:_t,EXPLORE:V,BUILDER:tt,holo:Z,makeEnv:$f,japanZone:K=>K.x>1420&&K.y<160}}function k1(){const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,"rgba(255,255,255,0.5)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new As(s),i=new ee,r=[];for(let o=0;o<14;o++){const a=new Ch(new Wa({map:n,transparent:!0,depthWrite:!1,opacity:.4}));a.userData.o=Math.random(),i.add(a),r.push(a)}return i.userData.update=o=>{for(const a of r){const l=(o*.15+a.userData.o)%1;a.position.set(Math.sin(l*6+a.userData.o*9)*.8,1+l*5,Math.cos(l*5)*.6),a.scale.setScalar(1.5+l*3),a.material.opacity=.35*Math.sin(l*Math.PI)}},i}const Pe=s=>document.querySelector(s),mi=s=>s.toLocaleString("th-TH"),Rt={dep:"BKK",arr:"NRT",ret:"auto",picked:new Set(["tokyo","fuji","hakone","kyoto","osaka"]),nights:6,pax:2,hotel:"grand",room:"deluxe",insurance:"plus",addons:new Set(["wifi"]),date:""};function H1(s,t){const e=t.map(r=>Na.find(o=>o.id===r)),n=[];let i=Ge[s];for(;e.length;)e.sort((r,o)=>xs(i,r)-xs(i,o)),i=e.shift(),n.push(i);return n}function V1(s){return ah.map(t=>Ge[t]).sort((t,e)=>xs(s,t)-xs(s,e))[0].code}function G1(){const s=H1(Rt.arr,[...Rt.picked]),t=s.length?s[s.length-1]:Ge[Rt.arr],e=Rt.ret==="auto"?V1(t):Rt.ret,n=[Ge[Rt.arr],...s,Ge[e]];let i=0;for(let v=0;v<n.length-1;v++)i+=xs(n[v],n[v+1])*1.3;const r=xs(Ge[Rt.dep],Ge[Rt.arr])+xs(Ge[e],Ge[Rt.dep]),o=Math.round((Zf(Rt.dep,Rt.arr)+Zf(Rt.dep,e))/2/100)*100,a=rm.find(v=>v.id===Rt.hotel),l=om.find(v=>v.id===Rt.room),c=nu.find(v=>v.id===Rt.insurance),h=Math.ceil(Rt.pax/2),u=[["ตั๋วเครื่องบินไป-กลับ",o*Rt.pax],[`ที่พัก ${Rt.nights} คืน × ${h} ห้อง`,Math.round(a.perNight*l.mult)*Rt.nights*h],["รถโค้ชและไกด์",Math.round(i*4+1200*(Rt.nights+1))*Rt.pax],["ค่าเข้าชมสถานที่",s.reduce((v,y)=>v+y.price,0)*Rt.pax]];c.price&&u.push([`ประกัน ${c.name}`,c.price*Rt.pax]);for(const v of am)Rt.addons.has(v.id)&&u.push([v.name,v.per==="day"?v.price*(Rt.nights+1)*Math.ceil(Rt.pax/2):v.price*(v.id==="transfer"?1:Rt.pax)]);const f=u.reduce((v,y)=>v+y[1],0),d=[],m=Rt.nights+1;d.push(`บิน ${Rt.dep} → ${Rt.arr} · พบไกด์ เข้าที่พัก`);const g=m-2,p=g>0?Math.max(1,Math.ceil(s.length/g)):s.length;let _=0;for(let v=0;v<g;v++){const y=s.slice(_,_+p);_+=p,d.push(y.length?y.map(T=>T.name).join(" · "):"วันอิสระ ช้อปปิ้งหรือพักผ่อน")}const x=s.slice(_);return d.push(`${x.length?x.map(v=>v.name).join(" · ")+" · ":""}บิน ${e} → ${Rt.dep}`),{dep:Rt.dep,arr:Rt.arr,ret:e,stops:s.map(v=>v.id),stopObjs:s,roadKm:i,flyKm:r,lines:u,total:f,days:d,hotel:a,room:l,ins:c,pax:Rt.pax,nights:Rt.nights}}function Gr(s,t){const e=document.createElement("option");return e.value=s,e.textContent=t,e}function W1({onChange:s}){const t=Pe("#dep"),e=Pe("#arr"),n=Pe("#ret"),i=Pe("#room");L1.forEach(m=>t.append(Gr(m,`${m} · ${Ge[m].name}`))),ah.forEach(m=>e.append(Gr(m,`${m} · ${Ge[m].name}`))),n.append(Gr("auto","อัตโนมัติ (ใกล้จุดสุดท้าย)")),ah.forEach(m=>n.append(Gr(m,`${m} · ${Ge[m].name}`))),om.forEach(m=>i.append(Gr(m.id,m.name)));const r=new Date;r.setDate(r.getDate()+45),Rt.date=r.toISOString().slice(0,10),Pe("#date").value=Rt.date,Pe("#date").min=new Date().toISOString().slice(0,10);const o=Pe("#places");Na.forEach(m=>{const g=document.createElement("button");g.type="button",g.className="chip",g.dataset.id=m.id,g.id=`place-${m.id}`,g.innerHTML=`<span class="ord"></span>${m.name.split(" ")[0]}<span class="jp">${m.jp}</span>`,g.title=m.name,g.addEventListener("click",()=>{Rt.picked.has(m.id)?Rt.picked.delete(m.id):Rt.picked.add(m.id),f()}),o.append(g)});const a=Pe("#hotels");rm.forEach(m=>{const g=document.createElement("button");g.type="button",g.className="opt",g.dataset.id=m.id,g.id=`hotel-${m.id}`,g.innerHTML=`<span>${m.name}<small>${m.note}</small></span><span class="price">฿${mi(m.perNight)}/คืน</span>`,g.addEventListener("click",()=>{Rt.hotel=m.id,f()}),a.append(g)});const l=Pe("#insurance");nu.forEach(m=>{const g=document.createElement("button");g.type="button",g.dataset.id=m.id,g.id=`ins-${m.id}`,g.innerHTML=`${m.name}<small>${m.price?"฿"+mi(m.price):"—"}</small>`,g.addEventListener("click",()=>{Rt.insurance=m.id,f()}),l.append(g)});const c=Pe("#addons");am.forEach(m=>{const g=document.createElement("label");g.innerHTML=`<input type="checkbox" id="addon-${m.id}" ${Rt.addons.has(m.id)?"checked":""}> ${m.name}<span class="price">฿${mi(m.price)}${m.per==="day"?"/วัน":""}</span>`,g.querySelector("input").addEventListener("change",p=>{p.target.checked?Rt.addons.add(m.id):Rt.addons.delete(m.id),f()}),c.append(g)}),t.value=Rt.dep,e.value=Rt.arr,n.value=Rt.ret,i.value=Rt.room,t.addEventListener("change",()=>{Rt.dep=t.value,f()}),e.addEventListener("change",()=>{Rt.arr=e.value,f()}),n.addEventListener("change",()=>{Rt.ret=n.value,f()}),i.addEventListener("change",()=>{Rt.room=i.value,f()}),Pe("#date").addEventListener("change",m=>{Rt.date=m.target.value,f()}),Pe("#nights").addEventListener("input",m=>{Rt.nights=+m.target.value,Pe("#nightsOut").textContent=Rt.nights,f()});const h=Pe("#pax"),u=m=>{Rt.pax=Math.max(1,Math.min(30,m||1)),h.value=Rt.pax,f()};h.addEventListener("change",()=>u(+h.value)),document.querySelectorAll("[data-step]").forEach(m=>m.addEventListener("click",()=>u(Rt.pax+ +m.dataset.step))),Pe("#builderForm").addEventListener("submit",m=>m.preventDefault());function f(){const m=G1();o.querySelectorAll(".chip").forEach(_=>{const x=Rt.picked.has(_.dataset.id);_.setAttribute("aria-pressed",x),_.querySelector(".ord").textContent=x?m.stops.indexOf(_.dataset.id)+1:"",_.querySelector(".ord").hidden=!x}),Pe("#stopCount").textContent=`${Rt.picked.size} แห่ง`,a.querySelectorAll(".opt").forEach(_=>_.setAttribute("aria-pressed",_.dataset.id===Rt.hotel)),l.querySelectorAll("button").forEach(_=>_.setAttribute("aria-pressed",_.dataset.id===Rt.insurance));const g=Rt.date?new Date(Rt.date):new Date,p=_=>{const x=new Date(g);return x.setDate(x.getDate()+_),x.toLocaleDateString("th-TH",{day:"numeric",month:"short"})};Pe("#summary").innerHTML=`
      <p class="eyebrow">เส้นทางของคุณ</p>
      <p class="route-line"><span class="fly">${m.dep} ✈ ${m.arr}</span> → ${m.stopObjs.map(_=>`<b>${_.jp}</b>`).join(" → ")||'<span class="muted">เลือกสถานที่</span>'} → <span class="fly">${m.ret} ✈ ${m.dep}</span></p>
      <div class="legend"><span><i style="background:#7fe3ff"></i>ขาไป</span><span><i style="background:#ff8fb8"></i>รถทัวร์</span><span><i style="background:#ffd27a"></i>ขากลับ</span></div>
      <dl class="stats">
        <div><dt>บินรวม</dt><dd>${mi(Math.round(m.flyKm))} กม.</dd></div>
        <div><dt>นั่งรถรวม</dt><dd>${mi(Math.round(m.roadKm))} กม.</dd></div>
        <div><dt>ระยะเวลา</dt><dd>${m.nights+1} วัน ${m.nights} คืน</dd></div>
      </dl>
      <ol class="days">${m.days.map((_,x)=>`<li><span>${p(x)}</span>${_}</li>`).join("")}</ol>
      <div class="breakdown">${m.lines.map(([_,x])=>`<div><span>${_}</span><span>฿${mi(Math.round(x))}</span></div>`).join("")}</div>
      <div class="total"><span>รวม ${m.pax} ท่าน</span><strong>฿${mi(Math.round(m.total))}</strong></div>
      <button class="btn" type="button" id="bookBtn">ยืนยันการจอง (เดโม)</button>`,Pe("#bookBtn").addEventListener("click",()=>d(m)),s(m)}function d(m){const g="CV-JP-"+String(Math.floor(1e4+Math.random()*89999));Pe("#bookBody").innerHTML=`
      <p>หมายเลขการจอง</p><p class="ref">${g}</p>
      <p>${m.dep} ✈ ${m.arr} · ${m.stopObjs.length} สถานที่ · ${m.hotel.name} · ประกัน ${m.ins.name}</p>
      <p>ยอดรวม <b>฿${mi(Math.round(m.total))}</b> สำหรับ ${m.pax} ท่าน</p>`,Pe("#boRef").textContent=g;const p=Pe("#bookDialog");p.showModal?p.showModal():p.setAttribute("open","")}return f(),{apply(m){if(m.place&&Rt.picked.add(m.place),m.hotel&&(Rt.hotel=m.hotel),m.room&&(Rt.room=m.room,i.value=m.room),m.addon){Rt.addons.add(m.addon);const g=document.getElementById(`addon-${m.addon}`);g&&(g.checked=!0)}f()}}}function X1(){const s=[["ค่ารักษาพยาบาล","medical"],["กระเป๋าสูญหาย","luggage"],["เที่ยวบินล่าช้า","delay"],["เบี้ยต่อท่าน","price"]],t=nu.filter(e=>e.id!=="none");document.querySelector("#insTable tbody").innerHTML=s.map(([e,n])=>`<tr><th scope="row">${e}</th>${t.map(i=>`<td>${n==="price"?"฿"+mi(i.price):i[n]}</td>`).join("")}</tr>`).join("")}const je=s=>document.querySelector(s),cm=s=>Math.min(1,Math.max(0,s)),ch=s=>(s=cm(s),s*s*(3-2*s)),hm=()=>window.innerWidth<900,iu=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Fa=location.search.includes("instant"),Y1=je("#gl"),bi=new Ny({canvas:Y1,antialias:!0,powerPreference:"high-performance"});bi.setPixelRatio(Math.min(window.devicePixelRatio,hm()?1.5:1.75));bi.setSize(window.innerWidth,window.innerHeight);bi.toneMapping=dh;bi.toneMappingExposure=1.05;bi.shadowMap.enabled=!hm();bi.shadowMap.type=ld;const Ba=new Qd,cn=new An(50,window.innerWidth/window.innerHeight,.3,9e3),Ne=z1(),{scene:za}=Ne;{const s=new zc(bi);za.environment=s.fromScene(new u1,.04).texture,za.environmentIntensity=.35}const Rr=new YS(bi);Rr.addPass(new qS(za,cn));const um=new Er(new J(window.innerWidth,window.innerHeight),.55,.65,.82);Rr.addPass(um);Rr.addPass(new $S);const fm=new tm(D1);Rr.addPass(fm);const te={storyTop:0,storyScroll:1,exploreTop:0,builderTop:0,servicesTop:0,vh:1};function dm(){const s=window.scrollY,t=e=>e.getBoundingClientRect().top+s;te.vh=window.innerHeight,te.storyTop=t(je("#story")),te.storyScroll=je("#story").offsetHeight-te.vh,te.exploreTop=t(je("#explore")),te.builderTop=t(je("#builder")),te.servicesTop=t(je("#services"))}const Ae={pos:new P,look:new P,env:Ne.makeEnv(),petals:.5};let ka="hotel";{const s=Ne.EXPLORE.hotel;Ae.pos.copy(s.pos),Ae.look.copy(s.look),eu(Ae.env,s.env),Ae.petals=s.petals}let ds=null;function su(s){const t=Ne.EXPLORE[s];if(!t)return;tl(!1),ka=s;const e=hh||t.env,n=Ae.pos.clone(),i=Ae.look.clone(),r=Ne.makeEnv();eu(r,Ae.env);const o=Ae.petals,a=n.distanceTo(t.pos),l=n.clone().lerp(t.pos,.5);l.y=Math.max(n.y,t.pos.y)+Math.min(120,a*.28+8);const c=new Xa(n,l,t.pos.clone());ds==null||ds.kill();const h={k:0};ds=Jh.to(h,{k:1,duration:iu||Fa?.01:1.6+Math.min(1.6,a/250),ease:"power2.inOut",onUpdate:()=>{Ae.pos.copy(c.getPoint(h.k)),Ae.look.copy(i).lerp(t.look,ch(h.k*1.25)),br(Ae.env,r,e,h.k),Ae.petals=o+(t.petals-o)*h.k}}),document.querySelectorAll("[data-target]").forEach(u=>u.setAttribute("aria-selected",u.dataset.target===s)),ru(s)}const q1={hotel:{jp:"さくらグランド",title:"Sakura Grand Hotel 5★",text:"โรงแรมหรูใกล้สถานี ล็อบบี้ไม้สไตล์ญี่ปุ่นร่วมสมัย ห้องชั้นบนหันหน้าเข้าหาภูเขาไฟฟูจิ",list:["อาหารเช้าบุฟเฟต์ญี่ปุ่นและนานาชาติ","ออนเซ็นและสปาบนดาดฟ้า","เดิน 5 นาทีถึงสถานี"],price:"เริ่ม ฿6,900 / คืน",action:{hotel:"grand"},cta:"เลือกโรงแรมนี้"},suite:{jp:"富士ビュースイート",title:"ห้องสวีทวิวฟูจิ",text:"ตอนนี้คุณอยู่ในห้องนี้ ลองขยับเมาส์เพื่อมองรอบ ๆ ห้องขนาด 82 ตร.ม. กระจกจากพื้นถึงเพดานรับวิวฟูจิตอนพระอาทิตย์ตก",list:["เตียงคิงไซซ์และมุมนั่งเล่น","อ่างแช่ตัวริมหน้าต่าง","ชั้นบนสุด เช็คอินเลานจ์ส่วนตัว"],price:"เริ่ม ฿13,100 / คืน",action:{hotel:"grand",room:"suite"},cta:"เลือกห้องนี้"},ryokan:{jp:"旅館 花見",title:"เรียวกัง ฮานามิ · ห้องทาทามิ",text:"ห้องแบบญี่ปุ่นปูเสื่อทาทามิ นอนฟูก เสิร์ฟอาหารไคเซกิถึงห้อง และมีบ่อออนเซ็นส่วนตัวที่ระเบียง",list:["ชุดยูกาตะสำหรับทุกท่าน","ดินเนอร์ไคเซกิ 9 คอร์ส","ออนเซ็นส่วนตัวมองเห็นทะเลสาบ"],price:"เริ่ม ฿5,400 / คืน",action:{hotel:"ryokan",room:"suite"},cta:"เลือกเรียวกังนี้"},fuji:{jp:"富士山",title:"ภูเขาไฟฟูจิ",text:"สูง 3,776 เมตร ภูเขาที่สูงที่สุดในญี่ปุ่น ชมจากริมทะเลสาบคาวากุจิโกะ หรือขึ้นไปถึงสถานีชั้น 5",list:["ทะเลสาบคาวากุจิโกะ","สถานีชั้น 5 (ตามฤดูกาล)","หมู่บ้านโอชิโนะฮักไก"],price:"ค่าเข้าชม ฿1,800 / ท่าน",action:{place:"fuji"},cta:"เพิ่มเข้าทริป"},pagoda:{jp:"忠霊塔",title:"เจดีย์ชูเรโตะ",text:"เจดีย์ห้าชั้นในสวนอาราคุระยามะ มุมถ่ายรูปฟูจิกับซากุระที่โด่งดังที่สุด เดินขึ้นบันได 398 ขั้น",list:["ซากุระบานปลายมีนาคมถึงเมษายน","ใบไม้แดงช่วงพฤศจิกายน","จุดชมวิวยามเช้าคนน้อย"],price:"รวมในทริปฟูจิ",action:{place:"fuji"},cta:"เพิ่มเข้าทริป"},torii:{jp:"千本鳥居",title:"อุโมงค์โทริอิ",text:"ซุ้มประตูสีชาดนับพันต้นเรียงต่อกันขึ้นเขา ที่ศาลเจ้าฟูชิมิอินาริ เกียวโต",list:["เปิด 24 ชั่วโมง ไม่มีค่าเข้า","แนะนำช่วงเช้าก่อน 8 โมง","เดินเต็มเส้นทางประมาณ 2 ชั่วโมง"],price:"รวมในทริปเกียวโต",action:{place:"kyoto"},cta:"เพิ่มเข้าทริป"},train:{jp:"新幹線",title:"ชินคันเซ็น",text:"รถไฟหัวกระสุนวิ่งบนทางยกระดับผ่านฉากนี้ทุกไม่กี่นาที ความเร็วสูงสุด 320 กม./ชม. โตเกียวถึงเกียวโตใน 2 ชั่วโมง 15 นาที",list:["ใช้ JR Pass ได้บางขบวน","มีที่วางกระเป๋าใหญ่ต้องจองล่วงหน้า","ซื้อเบนโตะสถานีไปกินบนรถ"],price:"JR Pass 7 วัน ฿11,500",action:{addon:"jrpass"},cta:"เพิ่ม JR Pass"},bus:{jp:"観光バス",title:"รถโค้ชนำเที่ยว",text:"รถโค้ช 40 ที่นั่งพาไปทุกจุดในทริป มี WiFi ที่ชาร์จ USB และน้ำดื่มเย็น",list:["คนขับมีใบอนุญาตท่องเที่ยว","จอดพักทุก 2 ชั่วโมง","ที่เก็บกระเป๋าใต้ท้องรถ"],price:"รวมในแพ็กเกจ",action:{addon:"transfer"},cta:"เพิ่มรถรับส่งส่วนตัว"},plane:{jp:"航空機",title:"เที่ยวบิน BKK ↔ ญี่ปุ่น",text:"บินตรงทุกวัน เลือกลงได้ทั้งนาริตะ ฮาเนดะ คันไซ ชูบุ ฟุกุโอกะ และชิโตเสะ",list:["กระเป๋าโหลด 30 กก.","เลือกที่นั่งกลุ่มฟรี","อาหารร้อนบนเครื่อง"],price:"เริ่ม ฿14,900 ไป-กลับ",action:{},cta:"จัดเที่ยวบิน"},boat:{jp:"スワンボート",title:"เรือหงส์ริมทะเลสาบ",text:"ปั่นเรือหงส์ชมภูเขาไฟฟูจิสะท้อนผิวน้ำ ทะเลสาบคาวากุจิโกะ",list:["30 นาที ต่อรอบ","นั่งได้ 2–3 คน","เปิด 9:00–17:00"],price:"฿450 / ลำ",action:{place:"fuji"},cta:"เพิ่มเข้าทริป"},guide:{jp:"ガイド",title:"ไกด์มิกิ",text:"ไกด์คนไทยที่อยู่ญี่ปุ่นมา 8 ปี ถือธงสีชมพูรอรับที่สนามบินและดูแลตลอดทริป",list:["พูดไทย ญี่ปุ่น อังกฤษ","แชตได้ 24 ชั่วโมง","แนะนำร้านอาหารท้องถิ่น"],price:"รวมในแพ็กเกจ",action:{},cta:"จัดทัวร์กับไกด์มิกิ"},tokyo:{jp:"東京",title:"โตเกียวยามค่ำคืน",text:"โตเกียวทาวเวอร์สีส้มกับแสงไฟเมือง ต่อด้วยทางม้าลายชิบูย่าและวัดเซนโซจิในอาซากุสะ",list:["จุดชมวิวชิบูย่าสกาย","ตลาดปลาสึกิจิ","ช้อปปิ้งกินซ่าและฮาราจูกุ"],price:"ค่าเข้าชม ฿1,200 / ท่าน",action:{place:"tokyo"},cta:"เพิ่มเข้าทริป"}};let pm;function ru(s){const t=q1[s],e=je("#infoCard");e.classList.remove("swap"),e.offsetWidth,e.classList.add("swap"),e.innerHTML=`
    <p class="jp">${t.jp}</p>
    <h3>${t.title}</h3>
    <p class="muted">${t.text}</p>
    <ul>${t.list.map(n=>`<li>${n}</li>`).join("")}</ul>
    <div class="row"><span class="price">${t.price}</span><button class="btn btn-small" type="button" id="addTrip">${t.cta}</button></div>`,je("#addTrip").addEventListener("click",()=>{pm.apply(t.action),Mo(te.builderTop+2)})}let td="";pm=W1({onChange:s=>{const t=[s.dep,s.arr,s.ret,...s.stops].join(",");t!==td&&(td=t,Ne.holo.userData.setRoute(s,Ba.elapsedTime))}});X1();let hh=null;function j1(s){hh=s==="auto"?null:Je[s],document.querySelectorAll("[data-time]").forEach(i=>i.setAttribute("aria-pressed",i.dataset.time===s));const t=Ne.makeEnv();eu(t,Ae.env);const e=hh||Ne.EXPLORE[ka].env,n={k:0};Jh.to(n,{k:1,duration:Fa?.01:1.4,ease:"sine.inOut",onUpdate:()=>br(Ae.env,t,e,n.k)})}document.querySelectorAll("[data-time]").forEach(s=>s.addEventListener("click",()=>j1(s.dataset.time)));const mm=je("#orbit"),zn=new JS(cn,mm);zn.enabled=!1;zn.enableDamping=!0;zn.dampingFactor=.08;zn.minDistance=3;zn.maxDistance=420;zn.maxPolarAngle=Math.PI*.49;let Tr=!1;function tl(s){s!==Tr&&(Tr=s,je("#freeBtn").setAttribute("aria-pressed",s),je("#freeBtn").textContent=s?"ออกจากโหมดหมุน":"หมุนดูรอบ ๆ แบบอิสระ",je("#freeHint").textContent=s?"ลากเพื่อหมุน · ลากสองนิ้วหรือคลิกขวาเพื่อเลื่อน · ล้อเมาส์เพื่อซูม · กด Esc เพื่อออก":"คลิกที่โรงแรม รถไฟ รถบัส หรือเครื่องบินในฉาก เพื่อดูข้อมูล",mm.hidden=!s,zn.enabled=s,s?(ds==null||ds.kill(),zn.target.copy(Ae.look),cn.position.copy(Ae.pos),zn.update()):(Ae.pos.copy(cn.position),Ae.look.copy(zn.target)))}je("#freeBtn").addEventListener("click",()=>tl(!Tr));window.addEventListener("keydown",s=>{s.key==="Escape"&&tl(!1)});const ed=new TM,nd=new J;function _m(s,t){nd.set(s/window.innerWidth*2-1,-(t/window.innerHeight)*2+1),ed.setFromCamera(nd,cn);const e=ed.intersectObjects(Ne.life.pickables,!0)[0];if(!e)return null;let n=e.object;for(;n&&!n.userData.info;)n=n.parent;return(n==null?void 0:n.userData.info)||null}const gm=()=>xm>.9&&ym<.1,vm=s=>s.closest&&s.closest(".panel, .nav, button, a, input, select, label, dialog");let Kr=null;window.addEventListener("pointerdown",s=>{Kr=[s.clientX,s.clientY]});window.addEventListener("pointerup",s=>{if(!Kr||!gm()||vm(s.target))return;const t=Math.hypot(s.clientX-Kr[0],s.clientY-Kr[1]);if(Kr=null,t>6)return;const e=_m(s.clientX,s.clientY);e&&(Ne.EXPLORE[e]&&!Tr?su(e):ru(e))});let id=0;window.addEventListener("pointermove",s=>{const t=performance.now();t-id<120||(id=t,document.body.classList.toggle("picking",gm()&&!vm(s.target)&&!!_m(s.clientX,s.clientY)))});setInterval(()=>{const s=new Date(Date.now()+324e5);je("#hudClock").textContent=s.toISOString().slice(11,16);const t=Math.ceil(Ne.life.trainNext(Ba.elapsedTime));je("#hudTrain").textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`},250);function Mo(s){window.scrollTo({top:s,behavior:iu?"auto":"smooth"})}document.querySelectorAll("[data-jump]").forEach(s=>s.addEventListener("click",t=>{t.preventDefault();const e=s.dataset.jump,n=e==="top"?0:e==="story"?te.storyTop+te.storyScroll*.1:e==="explore"?te.exploreTop+2:e==="builder"?te.builderTop+2:te.servicesTop+te.vh*.2;Mo(n)}));document.querySelectorAll("[data-jump-t]").forEach(s=>s.addEventListener("click",t=>{t.preventDefault(),Mo(te.storyTop+te.storyScroll*+s.dataset.jumpT)}));document.querySelectorAll("[data-explore]").forEach(s=>s.addEventListener("click",t=>{t.preventDefault(),Mo(te.exploreTop+2),su(s.dataset.explore)}));document.querySelectorAll("[data-target]").forEach(s=>s.addEventListener("click",()=>su(s.dataset.target)));const uh=[...document.querySelectorAll("#rail li")];uh.forEach(s=>s.addEventListener("click",()=>Mo(te.storyTop+te.storyScroll*+s.dataset.t)));const Nn={x:0,y:0,sx:0,sy:0};window.addEventListener("pointermove",s=>{Nn.x=s.clientX/window.innerWidth*2-1,Nn.y=s.clientY/window.innerHeight*2-1});let Zl=window.scrollY;const Jl={pos:new P,look:new P},sd=Ne.makeEnv(),Js=Ne.makeEnv(),Wr=new P,Xr=new P,sa=new P,ra=new P;let rd=!0,xm=0,ym=0;const K1=[...document.querySelectorAll(".nav-links a")],$1=je(".rail");function Mm(){const s=Math.min(.05,Ba.getDelta()),t=Ba.elapsedTime;Zl+=(window.scrollY-Zl)*(Fa?1:1-Math.exp(-s*(iu?30:5)));const e=Zl,n=cm((e-te.storyTop)/te.storyScroll),i=ch((e-(te.exploreTop-te.vh))/te.vh),r=ch((e-(te.builderTop-te.vh))/te.vh);xm=i,ym=r,Tr&&(i<.9||r>.1)&&tl(!1),Ne.storyPose(n,Jl),Ne.storyEnv(n,sd);const o=Ne.BUILDER,a=cn.aspect<.9,l=a?Ne.holo.position.clone().add(new P(4,640,120)):o.pos,c=a?Ne.holo.position.clone().add(new P(4,0,-70)):o.look,h=new P(Math.sin(t*.12)*8,0,Math.cos(t*.1)*6);Wr.copy(Jl.pos).lerp(Ae.pos,i).lerp(l.clone().add(h),r),Xr.copy(Jl.look).lerp(Ae.look,i).lerp(c,r),br(Js,sd,Ae.env,i),br(Js,Js,o.env,r),Nn.sx+=(Nn.x-Nn.sx)*s*3,Nn.sy+=(Nn.y-Nn.sy)*s*3;const u=Xr.clone().sub(Wr).normalize(),f=u.clone().cross(be.DEFAULT_UP).normalize(),d=f.clone().cross(u).normalize(),m=i>.5&&r<.5&&(ka==="suite"||ka==="ryokan"),g=m?2.2:1.2;Xr.addScaledVector(f,Nn.sx*g*(m?4:2)).addScaledVector(d,-Nn.sy*g*(m?2:1)),Wr.addScaledVector(f,Nn.sx*g*.4).addScaledVector(d,-Nn.sy*g*.25),Tr?(zn.update(),sa.copy(cn.position),ra.copy(zn.target)):((rd||Fa)&&(sa.copy(Wr),ra.copy(Xr),rd=!1),sa.lerp(Wr,1-Math.exp(-s*8)),ra.lerp(Xr,1-Math.exp(-s*8)),cn.position.copy(sa),cn.lookAt(ra)),cn.fov=a?62:50,cn.updateProjectionMatrix();const _=((Ne.japanZone(cn.position)?1:0)*(1-i)+Ae.petals*i)*(1-r);Ne.update({dt:s,time:t,storyT:n,camera:cn,envState:Js,petalsTarget:_}),um.strength=.45+Js.night*.55,za.environmentIntensity=.12+(1-Js.night)*.3,fm.uniforms.time.value=t,Rr.render();let x=-1;uh.forEach((y,T)=>{n>=+y.dataset.t-.02&&(x=T)}),uh.forEach((y,T)=>{y.classList.toggle("on",T===x),y.classList.toggle("passed",T<x)}),$1.classList.toggle("hidden",i>.4||n<.01);const v=e+te.vh*.5<te.exploreTop?"story":e+te.vh*.5<te.builderTop?"explore":e+te.vh*.5<te.servicesTop?"builder":"services";K1.forEach(y=>y.classList.toggle("on",y.dataset.jump===v)),requestAnimationFrame(Mm)}function Sm(){const s=window.innerWidth,t=window.innerHeight;cn.aspect=s/t,cn.updateProjectionMatrix(),bi.setSize(s,t),Rr.setSize(s,t),dm()}window.addEventListener("resize",Sm);ru("hotel");document.querySelector('[data-target="hotel"]').setAttribute("aria-selected","true");Sm();requestAnimationFrame(Mm);const Z1=()=>setTimeout(()=>je("#veil").classList.add("gone"),500);var od;(((od=document.fonts)==null?void 0:od.ready)||Promise.resolve()).then(()=>{dm(),Z1()});
