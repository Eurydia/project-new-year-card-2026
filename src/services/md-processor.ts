import { FrontmatterSchema } from '@/types/types'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkFrontmatter, ['toml', 'yaml'])
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify)

export const parseMd = (content: string) => {
  const f = new VFile({ value: content })
  matter(f)
  return {
    matter: FrontmatterSchema.parse(f.data.matter),
    content: processor.processSync(content).toString(),
  }
}
