import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { fetchOpeningById } from "../helpers/crudOpenings"
import { useParams } from "react-router-dom"
import "../styles/test.css"

export const OpeningsPage = () => {
    const [selectedOpening, setSelectedOpening] = useState(null)
    const [selectedServer, setSelectedServer] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { openingId } = useParams()

    useEffect(() => {
        const fetchOpening = async () => {
            try {
                const opening = await fetchOpeningById(openingId);
                if (opening) {
                    setSelectedOpening(opening);
                    if (opening.video.length > 0) {
                        setSelectedServer(opening.video[0].url);
                    }
                } else {
                    setError("Opening not found");
                }
            } catch (error) {
                console.error("Error fetching opening:", error);
                setError("Error fetching opening");
            } finally {
                setLoading(false);
            }
        };

        fetchOpening();
    }, [openingId]);

    const handleSelectServer = async (server) => {
        setLoading(true); // Indicar que se está cambiando el servidor

        try {
            // Puedes realizar alguna lógica adicional si es necesario antes de cambiar el servidor

            // Simular un retraso de 1 segundo antes de cambiar el servidor
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setSelectedServer(server.url);
        } catch (error) {
            console.error("Error changing server:", error);
        } finally {
            setLoading(false); // Indicar que ha terminado el cambio del servidor
        }
    }
    // Fix error screen
    return (
        <section className="w-full flex flex-col container-center">
            {loading ? ( // Mostrar mensaje de carga mientras se obtienen los datos
                <Spinner label="Loading..." color="secondary" labelColor="secondary" />
            ) : selectedServer ? (
                <>
                    <div className="video-container">
                        {/* Aquí se utiliza dangerouslySetInnerHTML para renderizar el fragmento de código HTML */}
                        <div dangerouslySetInnerHTML={{ __html: selectedServer }} />
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