import { type User } from "../types.d"
interface Props{
    deleteUser: (email: string) => void 
    showColors: boolean
    users: User[]
}
export function UsersList ({ deleteUser, showColors ,users }:Props) {

    const handleClickDelete = (email: string) => {
        deleteUser(email);
    };
    return(
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={showColors ? 'table--showColors' : ''}>
                {
                    users.map((user, index) => {
                        
                        return(
                            <tr key={user.email}>
                                <td>
                                    <img src={user.picture.thumbnail} alt="" />
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={()=>{handleClickDelete(user.email)}}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}