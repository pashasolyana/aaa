import React from 'react'

const StatIcon = (props: any) => {
  return (
    <svg
      width='14'
      height='12'
      viewBox='0 0 14 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 1C0 0.447715 0.447715 0 1 0H13C13.5523 0 14 0.447715 14 1C14 1.55228 13.5523 2 13 2H1C0.447715 2 0 1.55228 0 1Z'
        fill='#6D6D6D'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 6C0 5.44772 0.447715 5 1 5H13C13.5523 5 14 5.44772 14 6C14 6.55228 13.5523 7 13 7H1C0.447715 7 0 6.55228 0 6Z'
        fill='#6D6D6D'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 11C0 10.4477 0.447715 10 1 10H7C7.55228 10 8 10.4477 8 11C8 11.5523 7.55228 12 7 12H1C0.447715 12 0 11.5523 0 11Z'
        fill='#6D6D6D'
      />
    </svg>
  )
}

export default StatIcon
