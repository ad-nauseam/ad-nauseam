function dice(stra, strb){
    stra.replace(/\s+/g, "").toLowerCase();
    strb.replace(/\s+/g, "").toLowerCase();
    if (stra === strb) return 1;
    else if (stra.length < 2 || strb.length < 2) return 0;
    
   function bigrams(str){
     let strbi = new Map();
     for(let i = 0; i < str.length - 1; i++){
       let bi = str.substring(i,i+2);
       if (strbi.has(bi)){
         let a = strbi.get(bi);
         strbi.set(bi, a + 1);
       } else {
         strbi.set(bi, 1);
       }
     }
     return strbi;
   }
   
   let abi = bigrams(stra);
   
   function common(abi, strb){
     let count = 0;
     for (let i = 0; i < strb.length - 1; i++ ){
       let bi = strb.substring(i,i+2);
       if ( abi.has(bi) ) count++;
     }
     return count;
   }
   let asize = stra.length - 1;
   let bsize = strb.length - 1;
   return 2 * common(abi, strb) / (asize + bsize);
  }
 
 module.exports.dice = dice