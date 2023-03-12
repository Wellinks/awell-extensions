import { log } from './actions'
import { type Extension } from '../../lib/types'
import { settings } from './settings'
import { webhooks } from './webhooks'

export const HelloWorld: Extension = {
  key: 'hello-world',
  category: 'demo',
  title: 'Hello World !',
  settings,
  actions: {
    log,
  },
  webhooks,
}
