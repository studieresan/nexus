import { Collapse, Spinner } from 'react-bootstrap'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import BlogCard from './BlogCard.jsx'

export default function BlogGroup ({ appData, showGroup, group, groupIndex, handleClick }) {
  return (
    <div
      key={groupIndex}
    >
      <div className='d-flex' onClick={() => handleClick(groupIndex)} style={{ cursor: 'pointer' }}>
        <h1 className='fw-light d-flex'>{group.title}</h1>
      &nbsp;
        <div className='d-flex align-items-center'>
          {showGroup[groupIndex] ? <BiChevronUp size={50} /> : <BiChevronDown size={50} />}
        </div>
      </div>
      <Collapse in={showGroup[groupIndex]}>
        <div className='row row-cols-1 row-cols-xxl-2 align-items-stretch g-4 py-5'>
          {appData.blogPosts && appData.blogPosts.filter((e) => parseInt(e.date.slice(0, 4)) === group.year).map((post, index) => (
            <BlogCard key={`group-${groupIndex}-card-${index}`} post={post} />
          ))}
        </div>
      </Collapse>
    </div>
  )
}
