import { useEffect, useState } from "react";
import  {getRandomImg} from '../services/photo.js'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function useCatImage({fact}){

    const [imageUrl, setImageUrl] = useState(null)

    //Efecto para cargar la imagen cada  vez que tenemos una cita nueva
    useEffect(()=>{
        if(!fact) return
        const threeFirstsWord = fact.split(' ', 3).join(' ')
        console.log(threeFirstsWord)

       getRandomImg(threeFirstsWord).then(newUrl => setImageUrl(newUrl))
    },[fact])
   
    return { imageUrl:  `${CAT_PREFIX_IMAGE_URL}${imageUrl}`}

}