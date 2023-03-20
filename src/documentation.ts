import fs from 'fs'
import { has } from 'lodash'
import path from 'path'
import Showdown from 'showdown'

const converter = new Showdown.Converter()
const loadedDocumentations: Record<string, string> = {}

const getAppRootDir = (): string => {
  let currentDir = __dirname
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..')
  }

  return currentDir
}

const getHtmlFromMarkdownFile = (filePath: string): string => {
  try {
    const md = fs.readFileSync(filePath, 'utf-8')
    return converter.makeHtml(md)
  } catch {
    return ''
  }
}

export const getExtensionDocumentation = (extensionKey: string): string => {
  if (has(loadedDocumentations, extensionKey)) {
    return loadedDocumentations[extensionKey]
  }
  const extensionReadme = path.join(
    getAppRootDir(),
    'extensions',
    extensionKey,
    'README.md'
  )
  const documentation = getHtmlFromMarkdownFile(extensionReadme)
  loadedDocumentations[extensionKey] = documentation
  return documentation
}
