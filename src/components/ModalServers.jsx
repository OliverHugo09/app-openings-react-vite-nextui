import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link } from "@nextui-org/react";

export const ModalServers = ({ isOpen, opening, onClose }) => {

    return (
        <Modal
            size="xs"
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
        >
            {opening && (
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Selecciona un servidor
                    </ModalHeader>
                    <ModalBody>
                        {opening.video.map((server) => (
                            <Button size="md" key={server.service} as={Link} href={server.url} target="_blank" rel="noopener noreferrer">
                                {server.service}
                            </Button>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            )}
        </Modal>

    )
}
