import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL, updateMetadata } from 'firebase/storage'
import { Firebase } from "stores/root-store"

export const saveArtistLogo = async (artistId: string, blob) => {

    try {

        await Firebase.getFirestore()
        const storage = getStorage()

        const logoRef = ref(storage, `images/artists/${artistId}/logo.jpg`)
        const result = await uploadBytes(logoRef, blob)

        const metadata = {
            cacheControl: 'public,max-age=30000',
            contentType: 'image/jpeg'
          }

        await updateMetadata(logoRef, metadata)

        return await getDownloadURL(logoRef)

    } catch (error) {
        console.error(`Ошибка при сохранении изображения. ${error}`)
        return null
    }
}