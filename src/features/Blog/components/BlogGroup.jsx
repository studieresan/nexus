import { Collapse, Spinner } from 'react-bootstrap'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import BlogCard from './BlogCard.jsx'

export default function BlogGroup ({ appData, showGroup, group, groupIndex, handleClick, handleModals }) {
  return (
    <div
      key={groupIndex}
    >
      <div className='d-flex' onClick={() => handleClick(groupIndex)} style={{ cursor: 'pointer' }}>
        <h2 className='fw-light d-flex'>({appData.blogPosts.filter((e) => parseInt(e.date.slice(0, 4)) === group.year).length})&nbsp;{group.title}</h2>
      &nbsp;
        <div className='d-flex align-items-center'>
          {showGroup[groupIndex] ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
        </div>
      </div>
      <Collapse in={showGroup[groupIndex]}>
        <div className='row row-cols-1 row-cols-xxl-2 align-items-stretch g-4 py-3'>
          {appData.blogPosts && appData.blogPosts.filter((e) => parseInt(e.date.slice(0, 4)) === group.year).map((post, index) => (
            <BlogCard key={`group-${groupIndex}-card-${index}`} post={post} handleModals={handleModals} />
          ))}
        </div>
      </Collapse>
    </div>
  )
}
