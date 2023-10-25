import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { fetchOpeningById } from "../helpers/fetchOpenings"
import { useParams } from "react-router-dom"

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

    return (
        <section className="grid grid-cols-1">
            <div className="relative">
                <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                    <div className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none">
                        <iframe
                            src={selectedServer || (selectedOpening?.video[0]?.url || "")}
                            className="block w-full"
                            height={300}
                            allowFullScreen={true}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-2 place-items-center">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Selecciona un servidor
                        </Button>
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
        </section>

    )
}