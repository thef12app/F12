let a = '';
const schemes = [];

const collect = (str) => {
  const u = new URL('http://test.com');
  const protocol = str + ':';

  u.protocol = protocol;
  if (u.hostname) {
    schemes.push(protocol);
  }
};

for (let i = 0; i < 26; i++) {
  a = String.fromCharCode(97 + i);
  collect(a);

  for (let j = 0; j < 26; j++) {
    let b = String.fromCharCode(97 + j);
    collect(a + b);
    for (let k = 0; k < 26; k++) {
      let c = String.fromCharCode(97 + k);
      collect(a + b + c);

      for (let l = 0; l < 26; l++) {
        let d = String.fromCharCode(97 + l);
        collect(a + b + c + d);
        for (let m = 0; m < 26; m++) {
          let e = String.fromCharCode(97 + m);
          collect(a + b + c + d + e);
        }
      }
    }
  }
  console.log(schemes, '<<<');
}
