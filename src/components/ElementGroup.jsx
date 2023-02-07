import { useState } from 'react'
import { Collapse, Spinner } from 'react-bootstrap'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import Contact from './Contact.jsx'
import DynamicCard from './DynamicCard.jsx'

export default function ElementGroup ({ appData, showTools, type, expandStart, idx, groupTitle, elements, handleClickCard, handleClickEdit, handleClickDelete }) {
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
          {elements && elements.map((element, elemIdx) => {
            switch (type) {
              case 'cards':
                return (
                  <DynamicCard
                    key={`group-${idx}-card-${elemIdx}`}
                    id={element.id}
                    cardTitle={element.cardTitle}
                    cornerImg={element.cornerImg}
                    cornerText={element.cornerText}
                    dateText={element.dateText}
                    bgImg={element.bgImg}
                    handleClickCard={handleClickCard}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                    showTools={showTools}
                    danger={element.danger}
                  />
                )
              case 'contacts':
                return (
                  <Contact
                    key={`group-${idx}-contact-${elemIdx}`}
                    picture={element.picture}
                    name={element.name}
                    phone={element.phone}
                    email={element.email}
                    role={element.role}
                    vertical={element.vertical}
                    lg={element.lg}
                  />
                )
              default:
                return (
                  <div />
                )
            }
          })}
        </div>
      </Collapse>
    </div>
  )
}
