function bigrams(str) {
  let strbi = new Map();
  for (let i = 0; i < str.length - 1; i++) {
    let bi = str.substring(i, i + 2);
    if (strbi.has(bi)) {
      let a = strbi.get(bi);
      strbi.set(bi, a + 1);
    } else {
      strbi.set(bi, 1);
    }
  }
  return strbi;
}

function common(abi, strb) {
  let count = 0;
  for (let i = 0; i < strb.length - 1; i++) {
    let bi = strb.substring(i, i + 2);
    if (abi.has(bi)) count++;
  }
  return count;
}



function dice(stra, strb) {
  stra = stra.replace(/\s+/g, "").toLowerCase();
  strb = strb.replace(/\s+/g, "").toLowerCase();

  if (stra === strb) return 1;
  else if (stra.length < 2 || strb.length < 2) return 0;

  let abi = bigrams(stra);

  let asize = stra.length - 1;
  let bsize = strb.length - 1;

  return 2 * common(abi, strb) / (asize + bsize);
}


function arrayDice(arr, str) {
  newarr = [...arr].map(x => x.replace(/\s+/g, "").toLowerCase());
  str = str.replace(/\s+/g, "").toLowerCase();
  if (str.length < 2) return new Array(arr.length).fill(0);

  let abi = bigrams(str);

  return newarr.map(x => {
    if (str === x) return 1;
    else if (x.length < 2) return 0;
    return 2 * common(abi, x) / (x.length + str.length - 2);
  });
}


function unbanDice(unblist, str){
  if (str.length < 2) return new Array(unblist.length).fill(0);

  let abi = bigrams(str.replace(/\s+/g, "").toLowerCase());

  return unblist.map(x => {
    if (str === x.tag) return [x, 1];
    else if (x.tag.length < 2) return [x, 0];
    return [x, 2 * common(abi, x.tag.replace(/\s+/g, "").toLowerCase()) / (x.tag.length + str.length - 2)];
  });

}

module.exports.dice = dice;
module.exports.arrayDice = arrayDice;
module.exports.unbanDice = unbanDice;