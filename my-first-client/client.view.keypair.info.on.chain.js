const {
  Keypair,
  Connection,
  TransactionInstruction,
  Transaction,
  SystemProgram,
} = require('@solana/web3.js');

const wallet = Keypair.fromSecretKey(
  new Uint8Array([
    139, 92, 115, 77, 215, 145, 197, 65, 89, 39, 118, 140, 252, 151, 13, 143,
    59, 242, 131, 15, 197, 217, 141, 226, 14, 82, 133, 121, 90, 72, 189, 71,
    33, 36, 12, 18, 191, 132, 216, 76, 21, 25, 98, 4, 97, 187, 48, 186, 193,
    142, 63, 243, 4, 235, 151, 241, 147, 71, 127, 48, 25, 154, 135, 78
  ])
);

const old_program = Keypair.fromSecretKey(
  new Uint8Array([
    230, 111, 242, 15, 110, 235, 117, 204, 62, 28, 118, 0, 180, 192,
    77, 22, 231, 37, 170, 196, 79, 83, 65, 219, 42, 55, 113, 145, 2,
    115, 45, 166, 173, 197, 126, 1, 81, 186, 83, 108, 151, 134, 60,
    221, 146, 99, 203, 66, 208, 74, 230, 48, 86, 185, 166, 216, 100,
    232, 166, 144, 127, 247, 50, 77
  ])
);

const new_program = Keypair.fromSecretKey(
  new Uint8Array([
    243, 90, 106, 23, 88, 97, 222, 180, 46, 146, 227, 45, 65, 222, 34,
    249, 31, 204, 168, 116, 79, 56, 172, 168, 83, 251, 76, 165, 65,
    249, 103, 163, 161, 207, 165, 83, 31, 149, 177, 215, 40, 81, 119,
    182, 211, 163, 75, 117, 16, 145, 144, 143, 49, 206, 203, 97, 171,
    244, 77, 198, 111, 51, 147, 143
  ])
);

if (process.argv.length < 4) {
  console.log('\n\nNEED TWO KEYPAIR JSON ARRAY STRINGS.');
  console.log('1ST KEYPAIR PAYS FOR TRANSACTION.');
  console.log('2ND KEYPAIR IS TO BE VIEWED ON-CHAIN.\n\n');
  return;
}

let payerKeypairString = process.argv[2];
let payerKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(payerKeypairString)));
let payerPublicKey = payerKeypair.publicKey;
console.log(payerPublicKey.toString());

let acctKeypairString = process.argv[3];
let acctKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(acctKeypairString)));
let acctPublicKey = acctKeypair.publicKey;
console.log(acctPublicKey.toString());


(async () => {
  console.log('Establishing Connection...');
  let rpcUrl = 'http://localhost:8899';
  let connection = new Connection(rpcUrl, 'confirmed');

  console.log('Get Version...');
  const version = await connection.getVersion()
  console.log('Version: ', version);


  let instruction = new TransactionInstruction({
    programId: new_program.publicKey,
    keys: [{ pubkey: acctKeypair.publicKey }],
    data: []
  })
  let transaction = new Transaction(instruction);
  transaction.add(instruction);
  await connection.sendTransaction(transaction, [payerKeypair]);


  console.log('Done.');

})()





