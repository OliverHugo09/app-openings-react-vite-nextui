import { Input, Button } from "@nextui-org/react"
import { EyeFilledIcon } from "../components/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon"
import { useEffect, useState } from "react"
import { fetchUsersById } from "../helpers/fetchUser"

export const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)

    const { userId } = import.meta.env.VITE_USER_ID
    const [user, setUser] = useState([])

    useEffect(() => {
        // Utiliza el 'openingId' obtenido de la ruta en lugar de un valor estático
        const fetchUser = async () => {
            const user = await fetchUsersById(userId)
            setUser(user)
            console.log(setUser)
        }
        fetchUser()
    }, [userId])


    return (
        <div className="mt-16 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login Dashboard Panel Admin</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <Input type="email" variant="bordered" label="Email" />
                                </div>
                                <div className="relative">
                                    <Input
                                        label="Password"
                                        variant="bordered"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                    />

                                </div>
                                <div className="relative">
                                    <Button color="primary">
                                        Iniciar Sesión
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
