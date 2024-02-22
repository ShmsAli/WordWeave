import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { databases, bucket } from "../lib/appwrite";
import { Query, ID } from "appwrite";
import appConfig from "../config/app";

export const PostContext = createContext();

function PostProvider({ children }) {

  const [posts, setPosts] = useState([]);
  const [links, setLinks] = useState([]);
  const [profilePicUrl, setProfilePicUrl] = useState('');

  function createSlug(str) {
    return str
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
      .trim() // Trim leading/trailing spaces
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple consecutive hyphens with a single hyphen
  }

  async function add({ title, category, body, image_id, creator }) {
    const response = await databases.createDocument(
      appConfig.appwriteDatabaseId,
      appConfig.appwritePostCollectionId,
      ID.unique(),
      {
        title,
        slug: createSlug(title),
        category,
        body,
        image_id,
        creator
      }
    );
    init();
    return response; //Return newly created Post

  }

  async function update(id, { title, category, body, image_id = null }) {
    const postData = image_id ? { title, slug: createSlug(title), category, body, image_id } : { title, slug: createSlug(title), category, body };
    const response = await databases.updateDocument(
      appConfig.appwriteDatabaseId,
      appConfig.appwritePostCollectionId,
      id,
      postData
    );
    await init();
    return response;
  }

  async function remove(id) {
    await databases.deleteDocument(appConfig.appwriteDatabaseId, appConfig.appwritePostCollectionId, id);
    setPosts((posts) => posts.filter((course) => course.$id !== id));
    await init();
  }

  async function getPost(slug, userId = '', edit = false) {
    const response = await databases.listDocuments(
      appConfig.appwriteDatabaseId,
      appConfig.appwritePostCollectionId,
      [
        Query.equal('slug', [slug])
      ]
    );

    // if post is not found
    if (response.total === 0)
      throw new Error('Not found');

    // if the purpose is to edit the post
    if (edit) {
      if (response.documents[0].creator === userId)
        return response;
      else
        throw new Error('Not found');
    }

    // if the purpose is to view the post
    if (response.documents[0].approved)
      return response;
    else if (response.documents[0].creator === userId)
      return response;
  }

  async function uploadFile(file) {
    return await bucket.createFile(
      appConfig.appwriteBucketId,
      ID.unique(),
      file
    )
  }

  function getFilePreview(fileId) {
    return bucket.getFilePreview(
      appConfig.appwriteBucketId,
      fileId
    )
  }

  async function removeFile(fileId) {
    return await bucket.deleteFile(
      appConfig.appwriteBucketId,
      fileId
    )
  }

  async function getCurrentUserAllPosts(id, limit = 10, skip = 0, search = '') {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("creator", [id]),
      Query.limit(limit),
      Query.offset(skip)
    ];

    // Add search query if search parameter is provided
    if (search !== null && search.trim()) {
      queries.push(Query.search("title", search));
    }

    const response = await databases.listDocuments(
      appConfig.appwriteDatabaseId,
      appConfig.appwritePostCollectionId,
      queries
    );

    return (response);
  }

  async function init() {
    const response = await databases.listDocuments(
      appConfig.appwriteDatabaseId,
      appConfig.appwritePostCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(10),
        Query.equal("approved", [true]),
      ]
    );
    setPosts(response.documents);
  }


  async function socialLinks() {
    const response = await databases.listDocuments(
      appConfig.appwriteDatabaseId,
      appConfig.appwriteSocialLinksCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.equal("status", [true]),
      ]
    );
    setLinks(response.documents);
  }

  async function getProfilePic() {
    try {
      const response = await bucket.listFiles(
        appConfig.appwriteProfileBucketId
      );
      const { bucketId, $id } = response.files[0];

      const file = await bucket.getFilePreview(
        bucketId,
        $id
      );

      setProfilePicUrl(file);

    } catch (error) {
      throw new Error('Profile Image not Found');
    }
  }

  useEffect(() => {
    init();
    socialLinks();
    getProfilePic();
  }, []);

  return (
    <PostContext.Provider
      value={{
        links,
        profilePicUrl,
        current: posts,
        getCurrentUserAllPosts,
        add,
        remove,
        getPost,
        update,
        uploadFile,
        getFilePreview,
        removeFile,
      }}>
      {children}
    </PostContext.Provider>
  )
}

PostProvider.propTypes = {
  children: PropTypes.node
}

export default PostProvider
