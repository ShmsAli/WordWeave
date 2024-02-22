const appConfig = {
    appName: String(import.meta.env.VITE_APPWRITE_APP_NAME),
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePostCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    appwriteSocialLinksCollectionId: String(import.meta.env.VITE_APPWRITE_SOCIAL_LINKS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProfileBucketId: String(import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID),
}
export default appConfig;