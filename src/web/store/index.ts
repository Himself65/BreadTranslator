import log from 'electron-log'
import { makeObservable, observable } from 'mobx'
import React from 'react'

import { Display } from '../../../types'

// store for outer use, for example electron
class OuterStore {
  isDarkMode: boolean
  displays: Display[]
  openPath: string
  captureResult: {
    imageURL: string
    text: string
  }

  constructor () {
    this.isDarkMode = false
    this.displays = []
    this.openPath = '/'
    this.captureResult = {
      imageURL: '',
      text: 'No result'
    }

    makeObservable(this, {
      isDarkMode: observable,
      displays: observable,
      openPath: observable,
      captureResult: observable
    })
  }
}

export const outerStore = new OuterStore()

export const globalContext = React.createContext<ReturnType<typeof createStore>>(null)

// store for React use
export const createStore = () => ({
  // nothing for now
})

export function useGlobalStore (): ReturnType<typeof createStore> {
  const store = React.useContext(globalContext)
  if (!store) {
    // todo
    const error = new ReferenceError('globalContext not exist')
    log.error(error)
    throw error
  }
  return store
}
