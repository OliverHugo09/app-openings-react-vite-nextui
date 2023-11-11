import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { fetchOpeningById } from "../helpers/crudOpenings"
import { useParams } from "react-router-dom"
import "../styles/test.css"

export const OpeningsPage = () => {
    const [selectedOpening, setSelectedOpening] = useState(null)
    const [selectedServer, setSelectedServer] = useState(null)
    const { openingId } = useParams()

    useEffect(() => {
        // Utiliza el 'openingId' obtenido de la ruta en lugar de un valor estático
        const fetchOpening = async () => {
            const opening = await fetchOpeningById(openingId)
            setSelectedOpening(opening)
            if (opening && opening.video.length > 0) {
                setSelectedServer(opening.video[0].url)
            }
        }
        fetchOpening()
    }, [openingId])

    const handleSelectServer = (server) => {
        setSelectedServer(server.url)
    }
    // Fix iframe to embed code
    return (
        <section className="w-full flex flex-col">
            {selectedServer ? (
                <>
                    <div className="">
                        <div className="">
                            <div className="max-h-screen ">
                                {/* Aquí se utiliza dangerouslySetInnerHTML para renderizar el fragmento de código HTML */}
                                <div dangerouslySetInnerHTML={{ __html: selectedServer }} />
                            </div>
                        </div>
                    </div>
                    <div className="grid mt-2 place-items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered">Selecciona un servidor</Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Static Actions">
                                {selectedOpening?.video.map((server, index) => (
                                    <DropdownItem key={index} onPress={() => handleSelectServer(server)}>
                                        {server.service}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </>

            ) : (
                <>
                    <h1 className="text-9xl font-extrabold text-white tracking-widest">400</h1>
                    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                        Bad Request
                    </div>
                    <button className="mt-5">
                        <a
                            className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                        >
                            <span
                                className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                            ></span>

                            <span className="relative block px-8 py-3 bg-[#000000] border border-current">
                                <router-link to="/">Go Home</router-link>
                            </span>
                        </a>
                    </button>
                </>

            )}
        </section>
    )
}