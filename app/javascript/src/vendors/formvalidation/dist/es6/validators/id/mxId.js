import A from "../../utils/isValidDate";export default function O(O){const t=O.toUpperCase();if(!/^[A-Z]{4}\d{6}[A-Z]{6}[0-9A-Z]\d$/.test(t)){return{meta:{},valid:false}}const C=["BACA","BAKA","BUEI","BUEY","CACA","CACO","CAGA","CAGO","CAKA","CAKO","COGE","COGI","COJA","COJE","COJI","COJO","COLA","CULO","FALO","FETO","GETA","GUEI","GUEY","JETA","JOTO","KACA","KACO","KAGA","KAGO","KAKA","KAKO","KOGE","KOGI","KOJA","KOJE","KOJI","KOJO","KOLA","KULO","LILO","LOCA","LOCO","LOKA","LOKO","MAME","MAMO","MEAR","MEAS","MEON","MIAR","MION","MOCO","MOKO","MULA","MULO","NACA","NACO","PEDA","PEDO","PENE","PIPI","PITO","POPO","PUTA","PUTO","QULO","RATA","ROBA","ROBE","ROBO","RUIN","SENO","TETA","VACA","VAGA","VAGO","VAKA","VUEI","VUEY","WUEI","WUEY"];const e=t.substr(0,4);if(C.indexOf(e)>=0){return{meta:{},valid:false}}let s=parseInt(t.substr(4,2),10);const r=parseInt(t.substr(6,2),10);const a=parseInt(t.substr(6,2),10);if(/^[0-9]$/.test(t.charAt(16))){s+=1900}else{s+=2e3}if(!A(s,r,a)){return{meta:{},valid:false}}const E=t.charAt(10);if(E!=="H"&&E!=="M"){return{meta:{},valid:false}}const n=t.substr(11,2);const K=["AS","BC","BS","CC","CH","CL","CM","CS","DF","DG","GR","GT","HG","JC","MC","MN","MS","NE","NL","NT","OC","PL","QR","QT","SL","SP","SR","TC","TL","TS","VZ","YN","ZS"];if(K.indexOf(n)===-1){return{meta:{},valid:false}}const i="0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ";let L=0;const l=t.length;for(let A=0; A<l-1; A++){L+=(18-A)*i.indexOf(t.charAt(A))}L=(10-L%10)%10;return{meta:{},valid:`${L}`===t.charAt(l-1)}}