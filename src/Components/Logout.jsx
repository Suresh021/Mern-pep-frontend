import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
export default function Logout() {
    const { user, setUser } = useContext(AppContext)
    const Navigate = useNavigate()
    useEffect(() => {
        setUser({})
        Navigate("/")
    }, {})
    return (
        <div>Logout</div>
    )
}