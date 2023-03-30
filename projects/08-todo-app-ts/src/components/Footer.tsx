export const Footer: React.FC<Props> = ({
    activeCount,
    todos,
    onClearCompleted
}) => {
    return(
        <footer className="footer">
            <span className="todo-count">
                <strong>{todos.length}</strong> tareas pendientes
            </span>
        </footer>

        <Filters 
        filterSelected={}
        onFilterChange={() => {}}
        />
    )
}