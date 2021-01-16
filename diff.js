import dirTree from 'directory-tree'

const tree1 = dirTree('./input/');
const tree2 = dirTree('./output/');

const names1 = new Set(tree1.children.map(img => img.name))
const names2 = new Set(tree2.children.map(img => img.name))

const diff = new Set([...names1].filter(x => !names2.has(x)));

console.log(diff)
