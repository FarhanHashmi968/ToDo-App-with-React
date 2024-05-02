import React from 'react'

const List = (props) => {
  const { items, removeItem, editItem } = props

  return (
    <>
      {items.map((item) => {
        const { id, title, status } = item
        return (
          <article className='todo-item'>
            <p key={id}>{title}</p>

            <div className='btn-container'>
              <button className='edit-btn' onClick={() => editItem(id)}>
                Edit
              </button>
              <button
                className='delete-btn'
                onClick={() => {
                  removeItem(id)
                }}
              >
                Delete
              </button>
            </div>
          </article>
        )
      })}
    </>
  )
}

export default List
