import path from 'path';
import fs from 'fs-jetpack';
import matter from 'gray-matter';
const jsxM = require('@mapbox/jsxtreme-markdown');

export const stringToHtml = async (content?: string, nlToBr = false) => {
  let bodyHtml = content || '';
  if (content) {
    bodyHtml = jsxM.toJsx(content);
  }

  if (nlToBr) {
    bodyHtml = bodyHtml.replace(/\\n/g, '<br />');
  }
  return bodyHtml;
};

export const getPage = async (id: string) => {
  const pagesDir = path.join(process.cwd(), 'public');
  const fullPath = path.join(pagesDir, `${id}.md`);
  const contentStr = await fs.readAsync(fullPath, 'utf8');
  if (!contentStr) throw new Error('No file data');

  const frontMatter = matter(contentStr);
  return frontMatter;
};
