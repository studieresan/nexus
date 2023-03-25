import { useState } from 'react'
import { Collapse, Spinner } from 'react-bootstrap'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import Contact from './Contact.jsx'
import DynamicCard from './DynamicCard.jsx'
import { AppData } from '@/models/AppData.js'
import { CardElement } from '@/models/DynamicCard.js'
import { ContactElement } from '@/models/Contact.js'


function isCardElement(element: CardElement | ContactElement): element is CardElement {
  return 'cardTitle' in element; // Replace 'cardTitle' with a unique property of CardElement
}
interface ElementGroupProps {
  appData: AppData
  showTools: boolean
  type: string
  expandStart: boolean
  idx: number
  groupTitle: string
  elements: CardElement[] | ContactElement[]
  handleClickCard?: (id: string) => void
  handleClickEdit?: (id: string) => void
  handleClickDelete?: (id: string) => Promise<void> | undefined;
}


export default function ElementGroup ({ appData, showTools, type, expandStart, idx, groupTitle, elements, handleClickCard, handleClickEdit, handleClickDelete }: ElementGroupProps) {
  const [showGroup, setShowGroup] = useState(expandStart || false)
  let styling = ''
  if (type === 'cards') styling += 'row align-items-stretch row-cols-1 row-cols-xxl-2 g-4 py-3'
  if (type === 'contacts') styling += 'row row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 g-4 py-3'
  return (
    <div
      key={idx}
    >
      <div className='d-flex' onClick={() => setShowGroup(!showGroup)} style={{ cursor: 'pointer' }}>
        <h2 className='fw-light d-flex'>{groupTitle}&nbsp;({elements.length})</h2>
      &nbsp;
        <div className='d-flex align-items-center'>
          {showGroup ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
        </div>
      </div>
      <Collapse in={showGroup}>
        <div className={styling}>
        {elements && handleClickCard && handleClickEdit && handleClickDelete &&
          elements.map((element, elemIdx) => {
            if (isCardElement(element) && type === 'cards') {
              return (
                <DynamicCard
                  key={`group-${idx}-card-${elemIdx}`}
                  element={element}
                  handleClickCard={handleClickCard}
                  handleClickEdit={handleClickEdit}
                  handleClickDelete={handleClickDelete}
                  showTools={showTools}
                />
              );
            } else if (!isCardElement(element) && type === 'contacts') {
              return (
                <Contact
                  key={`group-${idx}-contact-${elemIdx}`}
                  element={element}
                />
              );
            } else {
              return <div />;
            }
          })}
        </div>
      </Collapse>
    </div>
  )
}
