import PostImage from '../../assets/post_image.png'
import PropTypes from 'prop-types'
import { usePost } from '../../contexts/UsePost'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom';
function PostCard({ post }) {
  const postContext = usePost();

  function extractFirstParagraph(body) {
    //Create a temporary div element to parse the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = body;

    //Find the first paragraph element
    const firstParagraph = tempDiv.querySelector('p');

    //Remove the 'text-align' style property
    if (firstParagraph) {
      firstParagraph.style.textAlign = null;
    }

    //Extract the HTML content of the first paragraph
    return firstParagraph ? firstParagraph.outerHTML : '';
  }

  return (
    <>
      {/* <div className="px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-10 w-full">

          <div className="mb-4 overflow-hidden rounded">
            <img src={post.image_id ? postContext.getFilePreview(post.image_id) : PostImage} alt="article image" className="sm:object-cover w-full sm:h-64" />
          </div>

          <div>

            <span className='text-date mb-2'>
              {post.category} | {post.$updatedAt.split('T')[0]}
            </span>

            <Link to={`/post/${post.slug}`} key={post.$id}>
              <h3 className='font-semibold hover:text-primary'>
                {post.title}
              </h3>
            </Link>

            <div className='text-post line-clamp-1 sm:line-clamp-3 leading-normal'>
              {parse(extractFirstParagraph(post.body))}

            </div>
          </div>

        </div>
      </div> */}

      <div className='flex-wrap md:flex-nowrap flex gap-4 md:gap-20 items-center'>

        {/*Post Content */}
        <div className='w-full md:w-3/4 flex flex-col gap-0 md:gap-1'>
          <Link to={`/post/${post.slug}`} key={post.$id}>
            <h3 className='hover:text-primary font-semibold'>{post.title}</h3>
          </Link>
          <div className='text-date mb-1'>{post.category} | {post.$updatedAt.split('T')[0]}</div>

          <div className='text-post line-clamp-1 sm:line-clamp-3 leading-normal text-justify'>
            {parse(extractFirstParagraph(post.body))}
          </div>
          {/* <div className='text-author'>{post.creator}</div> */}
        </div>

        {/*Post image */}
        <div className="w-full md:w-1/4 object-cover">
          <img className='w-full rounded-lg' src={post.image_id ? postContext.getFilePreview(post.image_id) : PostImage} alt="Post Image" />
        </div>
      </div>
    </>


  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostCard


