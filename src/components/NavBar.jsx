import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { NavLink } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"

export const NavBar = () => {
    const { user } = useAuth()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout() // Llama a la función login para verificar las credenciales
    }
    // {userCommon ? <NavBar /> : <></>}
    return (
        <Navbar isBordered>
            <NavbarBrand>
                <NavLink to='/'>
                    <p className="font-bold text-inherit">OPENINGS CLOUD</p>
                </NavLink>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">

                </NavbarItem>
                <NavbarItem>
                    {!user ?
                        <NavLink to='/login'>
                            <span className="text-blue-600">Login</span>
                        </NavLink>
                        :
                        <NavLink to='/'>
                            <span className="text-blue-600">Logout</span>
                        </NavLink>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
