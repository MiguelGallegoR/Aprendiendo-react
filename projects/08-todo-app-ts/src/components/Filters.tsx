
import { type TODO_FILTERS, FILTERS_BUTTONS } from "../consts"

import { type FilterValue } from "../consts"


interface Props {
    onFilterChange: ( filter: FilterValue ) => void
    filterSelected: FilterValue
}
export const Filters: React.FC<Props> = (
    {filterSelected, onFilterChange}
) => {
    return (
        <ul className="filters">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, { href, literal}]) => {
                    const isSelected = key === filterSelected
                    const className = isSelected ? 'selected' : ''
                    
                    return(
                        <li key={key}>
                            <a
                            href={href}
                            onClick={handleClick}
                            >
                                {literal}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )

}