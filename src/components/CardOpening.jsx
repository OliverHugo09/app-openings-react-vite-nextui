import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useOpeningsData } from "../hooks/useOpeningsData";
import { ModalServers } from "./ModalServers";

export const CardOpening = () => {

    const { openings, error, fetchopening } = useOpeningsData()
    const [selectedOpening, setSelectedOpening] = useState(null);

    const handleOpenModal = (opening) => {
        setSelectedOpening(opening)
    }

    useEffect(() => {
        const getOpenings = async () => {
            fetchopening()
        }

        getOpenings()
    }, [])

    return (
        <>
            {openings.map((opening) => (
                <Card className="py-4" key={opening.id}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{opening.title}</p>
                        <small className="text-default-500">Duración: {opening.time}</small>
                        <h4 className="font-bold text-large">{opening.anime}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 place-items-center">
                        <Image
                            isZoomed
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={opening.img}
                            width={270}
                            height={150}
                        />
                        <Button className="mt-2" onPress={() => handleOpenModal(opening)}>
                            Lista de servidores
                        </Button>
                    </CardBody>
                </Card>

            ))}

            {/* Modal para mostrar las URLs de los servidores */}
            <ModalServers
                isOpen={selectedOpening !== null}
                opening={selectedOpening}
                onClose={() => setSelectedOpening(null)}
            />
        </>
    )
}
