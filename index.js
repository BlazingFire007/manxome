import Manxome from './src/manxome.js';
const manxome = new Manxome();

function factorial(n) {
  if (n < 2) return n;
  return n * factorial(n - 1);
}

async function getMyIp() {
  let result = await fetch('https://api.ipify.org?format=json');
  console.log(await result.json());
}

manxome.addCommand({
  name: 'hello',
  shortDesc: 'print world to console',
  longDesc: 'print world to console\nex: "hello"\noutput: "world"',
  callback: () => console.log('world')
});

manxome.addCommand({
  name: 'factorial',
  shortDesc: 'get the factorial of a number',
  longDesc: 'example "factorial 10"\noutput: "3628800"',
  callback: (args) => console.log(factorial(parseInt(args[0])))
});

manxome.addCommand({
  name: 'ip',
  shortDesc: 'get my ip',
  longDesc: 'get my ip',
  sync: false,
  callback: async (args) => await getMyIp()
});

manxome.show();
