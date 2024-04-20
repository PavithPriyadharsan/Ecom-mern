import React from 'react'

const ProductDescription = () => {
  return (
    <div className='mt-20'>
        <div className='flex gap-3 mb-4'>
            <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
            <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
            <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>
        </div>
        <div className='flex flex-col pb-16'>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint sequi et ullam voluptatem error iure fuga consequuntur, aut cumque voluptatum rem, odit distinctio. Accusamus suscipit nam ullam laboriosam facere, praesentium fuga culpa esse necessitatibus voluptas aliquid quam, dolorem iste. Tenetur minima, voluptas perferendis recusandae reprehenderit expedita ea totam odio aliquam hic cum minus sequi temporibus.</p>
            <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, nesciunt natus enim cumque consequatur facilis maxime officiis ea quam error provident soluta aliquid temporibus mollitia exercitationem numquam? Inventore, qui facilis.</p>
        </div>
    </div>
  )
}

export default ProductDescription