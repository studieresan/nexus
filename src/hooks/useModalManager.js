import { addToast } from '@/features/Toasts/index.jsx'
import { useEffect, useState } from 'react'

// This hook is reused from a TellusTalk AB React project with permission. // William Bigert 2023-01-31
export function useModalManager () {
  const [modalsToShow, setModalsToShow] = useState([])
  const [toastArray, setToastArray] = useState([])

  /**
     * Upsert a new modal.
     * @param {{ name: string, id: string, [string]: any }}
     */
  function appendToModals ({ name, id, ...modalData }) {
    setModalsToShow((currentArr) => {
      const existsIndex = currentArr.findIndex(modal => id ? modal.id === id : modal.name === name)
      if (existsIndex > -1) currentArr.splice(existsIndex, 1)
      return [...currentArr, { name, id, ...modalData }]
    })
  }

  /**
     * Hide and eventually remove a modal.
     * @param {{ name: string, id: string }}
     */
  function hideModal ({ name, id }) {
    setModalsToShow((currentArr) => {
      const existsIndex = currentArr.findIndex(modal => id ? modal.id === id : modal.name === name)
      if (existsIndex > -1) {
        // We want to delete it later, to make sure fade outs happen, in the useEffect interval.
        currentArr[existsIndex].hideDate = Date.now() + 1000

        return [...currentArr]
      } else return currentArr
    })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setModalsToShow((currentArr) => {
        const tempArr = [...currentArr]
        for (let index = 0; index < tempArr.length; index++) {
          const entry = tempArr[index]
          if (Date.now() > entry.hideDate) {
            tempArr.splice(index, 1)
          }
        }

        if (tempArr.length < currentArr.length) return [...tempArr]
        else return currentArr
      })

      setToastArray((currentArr) => {
        const tempArr = [...currentArr]
        for (let index = 0; index < tempArr.length; index++) {
          const entry = tempArr[index]
          if (Date.now() > entry.hideDate) {
            tempArr.splice(index, 1)
          }
        }

        if (tempArr.length < currentArr.length) return [...tempArr]
        else return currentArr
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [modalsToShow])

  /**
     * Upsert a new toast.
     * @param {{ id: string, [string]: any }}
     */
  function appendToToasts ({ id, ...toastData }) {
    setToastArray((currentArr) => {
      const existsIndex = currentArr.findIndex(toast => toast.id === id)
      if (existsIndex > -1) currentArr.splice(existsIndex, 1)

      return [...currentArr, addToast(id, toastData)]
    })
  }

  /**
     * Hide and eventually remove a toast.
     * @param {{ id: string }}
     */
  function hideToast ({ id }) {
    setToastArray((currentArr) => {
      const existsIndex = currentArr.findIndex(toast => toast.id === id)
      if (existsIndex > -1) {
        // We want to delete it later, to make sure fade outs happen, in the useEffect interval.
        currentArr[existsIndex].hideDate = Date.now() + 1000

        return [...currentArr]
      } else return currentArr
    })
  }

  return {
    data: modalsToShow,
    on: appendToModals,
    off: hideModal,
    toasts: {
      data: toastArray,
      setData: setToastArray,
      on: appendToToasts,
      off: hideToast
    }
  }
}
