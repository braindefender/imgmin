import dirTree from 'directory-tree'

const args = {};

process.argv.forEach((el) => {
  let arg = el.split("=");
  if (arg[1] !== undefined) {
    args[arg[0]] = arg[1];
  }
});

const folderInput = args.in || "input";
const folderOutput = args.out || "output";

const tree1 = dirTree(folderInput);
const tree2 = dirTree(folderOutput);

const names1 = new Set(tree1.children.map(img => img.name))
const names2 = new Set(tree2.children.map(img => img.name))

const diff = new Set([...names1].filter(x => !names2.has(x)));

console.log(diff)
