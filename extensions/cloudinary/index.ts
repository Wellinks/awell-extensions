import { type Extension } from '../../lib/types'
import { AuthorType, Category } from '../../lib/types/marketplace'
import { uploadFiles } from './actions'
import { settings } from './settings'

export const Cloudinary: Extension = {
  key: 'cloudinary',
  title: 'Cloudinary (alpha)',
  icon_url:
    'https://res.cloudinary.com/da7x4rzl4/image/upload/v1681407040/Awell%20Extensions/cloudinary_logo.png',
  description:
    'Cloudinary is a cloud-based image and video management platform for storing, managing, and delivering digital media assets.',
  category: Category.CONTENT_AND_FILES,
  author: {
    authorType: AuthorType.AWELL,
  },
  actions: {
    uploadFiles,
  },
  settings,
}
