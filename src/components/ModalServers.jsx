import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";

export const ModalServers = ({ selectedOpening }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleCloseModal = () => {
        setSelectedOpening(null);
        onClose();
    }

    return (
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
    )
}
