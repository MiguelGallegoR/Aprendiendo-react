import { useEffect, useState } from "react"
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'
export function App() {
    const [fact, setFact] = useState('lorem ipsum')
    const [url, setUrl] = useState(null)

    useEffect((() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                setFact(fact)

                const threeFirstsWord = fact.split(' ', 3).join(' ')
                console.log(threeFirstsWord)

                fetch(`https://cataas.com/cat/says/${threeFirstsWord}?size=50&color=red&json=true`)
                    .then(res => res.json())
                    .then(response => {
                        const { url } = response
                        console.log(url)
                        setUrl(url)
                    })


            })
    }), [])

    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {url && <img src={`${CAT_PREFIX_IMAGE_URL}${url}`} alt={`Image extracted using the three first words from ${fact}`}></img>}
        </main>
    )
}