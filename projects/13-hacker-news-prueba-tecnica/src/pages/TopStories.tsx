import useSWR from 'swr'
import { getTopStories } from '../services/hacker-news'
import { Story } from '../components/Story'
export default function TopStoriesPage() {
    const { data, isLoading } = useSWR('stories', ()=>getTopStories(1,3))
    return(
        <>
            <ul>
                {isLoading && <li>Loading...</li>}
                {data?.map((id: number, index: number) =>(
                    <li key={id}>
                        <Story id={id} index={index} />
                    </li>
                ))}
            </ul>
        </>
    )
}