import { Collapse, Spinner } from 'react-bootstrap'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import BlogCard from './BlogCard.jsx'

export default function BlogGroup ({ appData, showGroup, group, groupIndex, handleClickGroup, handleClickCard, handleClickEdit, handleClickDelete }) {
  return (
    <div
      key={groupIndex}
    >
      <div className='d-flex' onClick={() => handleClickGroup(groupIndex)} style={{ cursor: 'pointer' }}>
        <h2 className='fw-light d-flex'>({appData.blogPosts.filter((e) => parseInt(e.date.slice(0, 4)) === group.year).length})&nbsp;{group.title}</h2>
      &nbsp;
        <div className='d-flex align-items-center'>
          {showGroup[groupIndex] ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
        </div>
      </div>
      <Collapse in={showGroup[groupIndex]}>
        <div className='row row-cols-1 row-cols-xxl-2 align-items-stretch g-4 py-3'>
          {appData.blogPosts && appData.blogPosts.filter((e) => parseInt(e.date.slice(0, 4)) === group.year).map((post, index) => (
            <BlogCard
              key={`group-${groupIndex}-card-${index}`}
              id={post.id}
              cardTitle={post.title}
              cornerImg={post.author.info.picture}
              cornerText={`${post.author.firstName} ${post.author.lastName}`}
              cardDate={post.date.slice(0, 10)}
              bgImg={post.frontPicture}
              handleClickCard={handleClickCard}
              handleClickEdit={handleClickEdit}
              handleClickDelete={handleClickDelete}
            />
          ))}
        </div>
      </Collapse>
    </div>
  )
}
