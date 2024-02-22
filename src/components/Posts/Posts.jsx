import PostCard from "./PostCard"
import { usePost } from "../../contexts/UsePost"
import appConfig from "../../config/app";

function Posts() {
  const postContext = usePost();
  const posts = postContext.current;
  return (

    <>
      <section className="bg-white dark:bg-dark pt-8">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold">
                Explore, Learn, and Share Your Story
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent Articles
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                Welcome to {appConfig.appName}, where voices converge to inspire, inform, and ignite change. Dive into a diverse array of topics, from personal anecdotes to thought-provoking analyses. Join our community, share your story, and let your voice be heard. Start exploring today at {appConfig.appName}.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 mb-10">
            {posts.map((post) => {
              return <PostCard key={post.$id} post={post} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Posts