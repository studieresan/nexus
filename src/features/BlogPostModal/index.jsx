import { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import EditPost from './components/EditPost.jsx'
import ViewPost from './components/ViewPost.jsx'
export default function BlogPost ({ modal, data, appData }) {
  const { t, i18n } = useTranslation()
  console.log('data: ', data)
  return data.mode === 'view'
    ? (
      <ViewPost modal={modal} post={data.post} />
      )
    : (
      <EditPost modal={modal} post={data.post} appData={appData} />
      )
}
