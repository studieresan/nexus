import { addToast } from '@/features/Toasts/index.jsx';
import { useEffect, useState } from 'react';
import { ModalData, ModalManager } from '../models/Modal';
import { ToastData } from '@/models/Toast';

export function useModalManager(): ModalManager {
  const [modalsToShow, setModalsToShow] = useState<ModalData[]>([]);
  const [modalsToClose, setModalsToClose] = useState<ModalData[]>([]);
  const [toastArray, setToastArray] = useState<ToastData[]>([]);

  function appendToModals({ name, id, ...modalData }: ModalData): void {
    // Check if a modal with the same name and ID is currently closing
    const isClosing = modalsToClose.some(modal => modal.name === name && modal.id === id);
    if (!isClosing) {
      setModalsToShow((currentArr) => {
        const existsIndex = currentArr.findIndex(modal => id ? modal.id === id : modal.name === name);
        if (existsIndex > -1) currentArr.splice(existsIndex, 1);
        return [...currentArr, { name, id, ...modalData }];
      });
    }
  }

  function hideModal(name: string, id: string): void {
    setModalsToShow((currentArr) => {
      const existsIndex = currentArr.findIndex(modal => id ? modal.id === id : modal.name === name);
      if (existsIndex > -1) {
        currentArr[existsIndex].hideDate = Date.now() + 500;
        setModalsToClose((prev) => [...prev, currentArr[existsIndex]]);
        setTimeout(() => {
          setModalsToClose((prev) => prev.filter((modal) => modal.id !== currentArr[existsIndex].id));
        }, 1000);
        return [...currentArr];
      } else return currentArr;
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setModalsToShow((currentArr) => {
        const tempArr = [...currentArr];
        for (let index = 0; index < tempArr.length; index++) {
          const entry = tempArr[index];
          if (Date.now() > entry.hideDate) {
            tempArr.splice(index, 1);
            setModalsToClose((prev) => prev.filter((modal) => modal.id !== entry.id));
          }
        }

        if (tempArr.length < currentArr.length) return [...tempArr];
        else return currentArr;
      });

      // The rest of the code remains unchanged...
    }, 500);

    return () => clearInterval(intervalId);
  }, [modalsToShow]);

  /**
     * Upsert a new toast.
     * @param {{ id: string, [string]: any }}
     */
  function appendToToasts({ id, ...toastData }: ToastData): void {
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
  function hideToast(id: string): void {
    setToastArray((currentArr) => {
      const existsIndex = currentArr.findIndex(toast => toast.id === id)
      if (existsIndex > -1) {
        // We want to delete it later, to make sure fade outs happen, in the useEffect interval.
        currentArr[existsIndex].hideDate = Date.now() + 1000

        return [...currentArr]
      } else return currentArr
    })
  }

  function hideAllModals(): void {
    setModalsToShow((currentArr) => {
      currentArr.forEach(modal => {
        modal.hideDate = Date.now() + 500;
        setModalsToClose((prev) => [...prev, modal]);
      });

      setTimeout(() => {
        setModalsToClose([]);
      }, 1000);

      return [];
    });
  }

  useEffect(() => {
    const handlePopState = () => {
      hideAllModals();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    data: modalsToShow,
    on: appendToModals,
    off: hideModal,
    isModalVisible: (name: string, id: string) => {
      return modalsToShow.some((modal) => modal.name === name && modal.id === id) &&
             !modalsToClose.some((modal) => modal.name === name && modal.id === id);
    },
    toasts: {
      data: toastArray,
      setData: setToastArray,
      on: appendToToasts,
      off: hideToast,
    },
  };
}
