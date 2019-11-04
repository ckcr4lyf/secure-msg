const crypto = require('crypto');
const fs = require('fs');
const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);
console.log(key);
const iv = Buffer.alloc(16, 0);

const cipher = crypto.createCipheriv(algorithm, key, iv);

let a = {
    k: 1
};

let gg = cipher.update(Buffer.from(JSON.stringify(a)), 'binary', 'hex');
gg += cipher.final('hex');
// console.log(gg);

// const decipher = crypto.createDecipheriv(algorithm, key, iv);
// let wp = decipher.update(gg, 'hex', 'binary');
// wp += decipher.final('binary');
// console.log(wp);

const public_key_buffer = fs.readFileSync('./rsa.public');
const private_key_buffer = fs.readFileSync('./rsa.private');

// let ct = public_key.encrypt(Buffer.from("A"));
let ct2 = crypto.publicEncrypt(public_key_buffer, key);
let pt2 = crypto.privateDecrypt(private_key_buffer, ct2);
console.log(pt2);



const decipher = crypto.createDecipheriv(algorithm, pt2, iv);
let wp = decipher.update(gg, 'hex', 'binary');
wp += decipher.final('binary');

console.log(wp);