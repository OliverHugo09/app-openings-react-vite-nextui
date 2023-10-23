import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"

const navigation = [
    { name: "Dashboard", uid: "dashboard", href: "/admin/dashboard" },
    { name: "Agregar Openings", uid: "add", href: "/admin/add" },
    { name: "Tutorial", uid: "tutorial", href: "/admin/tutorial" }
]

export const NavBar = () => {
    const { user } = useAuth()
    const { logout } = useAuth()
    // const { useLocation} = useLocation()

    const handleLogout = () => {
        logout()
    }

    return (
        <Navbar isBordered>
            <NavbarBrand>
                <NavLink to='/'>
                    <p className="font-bold text-inherit">OPENINGS CLOUD</p>
                </NavLink>
            </NavbarBrand>
            {!!user && user.role.includes("admin") ?
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {navigation.map((item) => (
                        <NavbarItem key={item.name} isActive={location.pathname === item.href} className={location.pathname === item.href ? 'pointer-events-none text-orange-500' : ''}>
                            <NavLink to={item.href}>
                                {item.name}
                            </NavLink>
                        </NavbarItem>
                    ))}
                </NavbarContent> :
                <NavbarContent>

                </NavbarContent>

            }

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">

                </NavbarItem>
                <NavbarItem>
                    {!user ?
                        <NavLink to='/login'>
                            <span className="text-blue-600">Login</span>
                        </NavLink>
                        :
                        <NavLink to='/' onClick={handleLogout}>
                            <span className="text-blue-600">Logout</span>
                        </NavLink>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
