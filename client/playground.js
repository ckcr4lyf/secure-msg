const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const NodeRSA = require('node-rsa');
const fs = require('fs');

const public_key_buffer = fs.readFileSync('./rsa.public');
const private_key_buffer = fs.readFileSync('./rsa.private');
// console.log(public_key_buffer);
const public_key = new NodeRSA(public_key_buffer);
const private_key = new NodeRSA(private_key_buffer);
// public_key.importKey();
// console.log(public_key);
// console.log(public_key.getMaxMessageSize());

let channel_name = "sam_sepi0l";
let channel_id = crypto.createHash("sha256").update(channel_name).digest('hex');
// console.log(channel_id);

let mobj = {
    "a": "b"
};

var key = CryptoJS.enc.Hex.parse(crypto.randomBytes(16).toString('hex')); //Random key
var iv = CryptoJS.enc.Hex.parse(crypto.randomBytes(16).toString('hex'));
// console.log(key, iv);
let enc = CryptoJS.AES.encrypt(JSON.stringify(mobj), key, {iv: iv}) //crypto.randomBytes(32).toString('hex'));
// console.log(enc.key.toString());
// console.log(enc.ciphertext.toString());

let to_send = {
    channel_id: channel_id,
    ciphertext: enc.ciphertext.toString(),
    iv: enc.iv.toString(),
    key: "XXX"
};

console.log(to_send);

console.log("THE KEY IS", enc.key.toString());
// console.log(Buffer.from("A"));
let enccode = public_key.encrypt(Buffer.from(enc.key.toString(), 'hex'));
console.log("THE ENCRYPTED KEY IS", enccode);
let decode = private_key.decrypt(enccode);
console.log("THE DECRYPTED KEY IS", decode); //.toString('hex')

let deckey = CryptoJS.enc.Hex.parse(decode.toString('hex'))
let decmsg = CryptoJS.AES.decrypt(enc.ciphertext.toString(), deckey, {iv: iv});
console.log(CryptoJS.enc.Utf8.stringify(decmsg.words));
// console.log(enc.key);
// console.log(to_send);
// b1e16b3d098a90bd850e6fa3724b2a43