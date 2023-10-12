import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { db } from "../helpers/firebase-config"
import { collection, getDocs } from "firebase/firestore"

export const CardOpening = () => {

    const [openings, setOpenings] = useState([]);
    const openingsCollectionRef = collection(db, "openings")

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedOpening, setSelectedOpening] = useState(null);

    const handleOpenModal = (opening) => {
        setSelectedOpening(opening);
        onOpen();
    }

    const handleCloseModal = () => {
        setSelectedOpening(null);
        onClose();
    }

    useEffect(() => {
        const getOpenings = async () => {
            const data = await getDocs(openingsCollectionRef);
            setOpenings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
            <Modal
                size="xs"
                isOpen={isOpen}
                onClose={handleCloseModal}
                placement="center"
            >
                {selectedOpening && (
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">
                            Selecciona un servidor
                        </ModalHeader>
                        <ModalBody>
                            {selectedOpening.video.map((server) => (
                                <Button size="md" key={server.service} as={Link} href={server.url} target="_blank" rel="noopener noreferrer">
                                    {server.service}
                                </Button>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleCloseModal}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                )}
            </Modal>
        </>
    )
}
