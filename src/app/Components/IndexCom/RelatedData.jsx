import Image from 'next/image';
import Link from 'next/link';
import Loader from '../Shared/Loader';

const RelatedData = ({ related }) => {
  if (!related) {
    return <div className='text-center'>
      <Loader/>
    </div>; // Or any fallback content
  }

  return (
    <div className='mt-5 mb-5'>
      <div className='px-1 py-3'>
        <h1 className='text-2xl font-bold'>এ বিভাগের সর্বোচ্চ পঠিত</h1>
      </div>
      <div>
        <div>
          <div className='grid overflow-x-hidden gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8'>
            {related.map(post => {
              const imageUrl = `https://admin.desh365.top/public/storage/post-image/${post.image}`;

              return (
                <div key={post?.id} className='overflow-auto h-300px'>
                  <Link href={`/post/${post?.id}`} key={post?.id}>
                    <div className='flex gap-2 flex-col my-3'>
                      <div className='object-cover rounded-md'>
                        <Image
                          src={`https://admin.desh365.top/public/storage/post-image/${post.image}`}
                          alt={post?.title || 'Default Alt Text'}
                          className='transition duration-300 ease-in-out hover:scale-90 '
                          objectFit='cover'
                          width={300}
                          height={200}
                          priority={true}
                        />
                      </div>
                     
                      <h2 className='text-[16px] font-semibold hover:underline justify-center items-center'>
                        {post.title}
                      </h2>
                    </div>
                  </Link>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        <div className='bg-white py-1'></div>
      </div>
    </div>
  );
};

export default RelatedData;
