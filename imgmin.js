// imgmin — image minification script
//
// example usage: node imgmin.js dim=2000 in="/path/to/folder/INPUT" out="/path/to/folder/OUTPUT"
// warning: folders must exist
//
// arguments list:
// dim: Number — max width or height of image. Default: 2000
// in:  String — path to input  folder. Default: "./input"
// out: String — path to output folder. Defalut: "./output"
// destructive: Boolean — if set to true removes input files after compression

import dirTree from "directory-tree";
import rimraf from "rimraf";
import sharp from "sharp";

const args = {};

process.argv.forEach((el) => {
  let arg = el.split("=");
  if (arg[1] !== undefined) {
    args[arg[0]] = arg[1];
  }
});

const debug = args.debug === "true" ? true : false
const dim = parseInt(args.dim) || 2000;
const folderInput = args.in || "input";
const folderOutput = args.out || "output";
const destructive = args.destructive === "true" ? true : false;

const tree = dirTree(folderInput);
const outt = dirTree(folderOutput);

const names1 = new Set(tree.children.map(img => img.name))
const names2 = new Set(outt.children.map(img => img.name))

const diff = new Set([...names1].filter(x => !names2.has(x)));

tree.children
  .filter((img) => (diff.has(img.name)))
  .map((img) => {
    sharp(img.path)
      .resize(dim, dim, { fit: "outside", withoutEnlargement: true })
      .toFile(`${folderOutput}\\${img.name}`, (err, info) => {
        if (err) console.log(err);

        if (debug) {
          const percent = ((info.size / img.size) * 100).toFixed(2);
          console.log(`${img.name}\t${img.size} -> ${info.size}\t ${percent}%`);
        }

        if (destructive) {
          rimraf(img.path, (err) => (err ? console.log(err) : null));
        }
      });
  });
