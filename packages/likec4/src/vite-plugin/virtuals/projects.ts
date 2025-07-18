import type { NonEmptyArray } from '@likec4/core'
import JSON5 from 'json5'
import { map, prop } from 'remeda'
import { type VirtualModule, k } from './_shared'

type Project = {
  id: string
  title: string
}
const code = (projects: NonEmptyArray<Project>) => `
export const isSingleProject = ${projects.length === 1};
export const projects = ${JSON5.stringify(projects, null, 2)};
`

export const projectsModule = {
  id: 'likec4:projects',
  virtualId: 'likec4:plugin/projects.js',
  async load({ likec4, logger, projects, assetsDir }) {
    logger.info(k.dim('generating likec4:projects'))
    return code(map(projects, p => ({ id: p.id, title: p.title })))
  },
} satisfies VirtualModule
