import { CheerioAPI, load } from 'cheerio';
import { readFileSync, readdirSync, writeFileSync } from 'fs';

const main = async () => {
  const svgFiles: string[] = readdirSync('./svg');
  console.log(svgFiles.length);
  for (const svgFile of svgFiles) {
    const fileName: string = svgFile.replace('.svg', '');
    const svgContent: string = readFileSync(`./svg/${fileName}.svg`, 'utf-8');
    const $: CheerioAPI = load(svgContent);
    const svgNode = $('svg');
    const svgPaths: any[] = [];
    $('svg')
      .find('path')
      .map((_index, element) => {
        const d: string = element.attribs.d;
        const id: string = element.attribs.id;
        const title: string = element.attribs.title;
        svgPaths.push({ d, id, title });
      });
    const data = {
      viewBox: svgNode.attr('viewBox'),
      width: svgNode.attr('width'),
      height: svgNode.attr('height'),
      paths: svgPaths,
    };
    writeFileSync(`./json/${fileName}.json`, JSON.stringify(data, null, 2));
  }
};

main().catch(console.error);
