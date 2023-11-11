import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { fetchOpeningById } from "../helpers/crudOpenings"
import { useParams } from "react-router-dom"

export const OpeningsPage = () => {
    const [selectedOpening, setSelectedOpening] = useState(null)
    const [selectedServer, setSelectedServer] = useState(null)
    const { openingId } = useParams()

    // Función para validar si es una URL
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        const fetchOpening = async () => {
            try {
                const opening = await fetchOpeningById(openingId);
                setSelectedOpening(opening);
                if (opening && opening.video.length > 0) {
                    const firstVideoUrl = opening.video[0].url;
                    if (isValidUrl(firstVideoUrl)) {
                        setSelectedServer(firstVideoUrl);
                    } else {
                        console.error("La URL del video no es válida:", firstVideoUrl);
                        setSelectedServer(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching opening:", error);
                setSelectedOpening(""); // Set to an empty string to trigger the 404 section
            }
        };
        fetchOpening();
    }, [openingId])

    const handleSelectServer = (server) => {
        setSelectedServer(server.url)
    }
    // Fix iframe to embed code
    return (
        <section className="w-full flex flex-col justify-center h-auto">
            {selectedServer && isValidUrl(selectedServer) ? (
                <>
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
                    <div className="grid mt-2 place-items-center">
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
                </>
            ) : (
                <main className="w-full flex flex-col justify-center items-center">
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
                </main>

            )}
        </section>
    )
}