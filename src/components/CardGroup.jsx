import { useState } from 'react'
import { Collapse, Spinner } from 'react-bootstrap'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import BlogCard from './DynamicCard.jsx'

export default function GroupOfCards ({ appData, showTools, idx, groupTitle, elements, handleClickCard, handleClickEdit, handleClickDelete }) {
  const [showGroup, setShowGroup] = useState(true)

  return (
    <div
      key={idx}
    >
      <div className='d-flex' onClick={() => setShowGroup(!showGroup)} style={{ cursor: 'pointer' }}>
        <h2 className='fw-light d-flex'>({elements.length})&nbsp;{groupTitle}</h2>
      &nbsp;
        <div className='d-flex align-items-center'>
          {showGroup ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
        </div>
      </div>
      <Collapse in={showGroup}>
        <div className='row row-cols-1 row-cols-xxl-2 align-items-stretch g-4 py-3'>
          {elements && elements.map((element, elemIdx) => (
            <BlogCard
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
            />
          ))}
        </div>
      </Collapse>
    </div>
  )
}
