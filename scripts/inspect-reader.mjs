import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config.js';

const reader = createReader(process.cwd(), keystaticConfig);
const projects = await reader.collections.projects.all();

for (const item of projects) {
  console.log('outer keys:', Object.keys(item));
  console.log('entry keys:', Object.keys(item.entry));
  console.log('slug:', item.slug);
  console.log('content type:', typeof item.entry.content);

  if (typeof item.entry.content === 'function') {
    const content = await item.entry.content();
    console.log('content result type:', typeof content);
    console.log(
      'content result:',
      typeof content === 'string' ? content.slice(0, 200) : content,
    );
  }
  break;
}
