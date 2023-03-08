 
 
export async function getRandomImg(threeFirstsWord){
    
   const res = await fetch(`https://cataas.com/cat/says/${threeFirstsWord}?size=50&color=red&json=true`)
    const response = await res.json()
    const { url } = response
    return url
}
 