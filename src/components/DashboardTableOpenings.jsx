import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Dropdown,
    DropdownTrigger, DropdownMenu, DropdownItem, Button
} from "@nextui-org/react"
import { EditIcon } from "../icons/EditIcon"
import { DeleteIcon } from "../icons/DeleteIcon"
import { EyeFilledIcon } from "../icons/EyeFilledIcon"
import { useCallback, useState } from "react"
import { deleteElementInOpening } from "../helpers/crudOpenings"
import { FormUpdateOpening } from "../components/FormUpdateOpening"
import Swal from 'sweetalert2'
import '@sweetalert2/theme-dark/dark.css'
import "../styles/video-container.css"

const statusColorMap = {
    active: "success",
    paused: "danger",
    fix: "warning",
}

const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "ESTADO", uid: "status" },
    { name: "CREADO EL", uid: "date" },
    { name: "A LAS", uid: "time" },
    { name: "ACCIONES", uid: "actions" },

]

const getCellValue = (opening, columnKey) => {
    if (columnKey === "name") {
        const img = opening.img || "https://placehold.co/60x60"
        const title = opening.title || "Titulo no disponible"
        const anime = opening.anime || "Nombre del anime no disponible"
        return `${img}, ${title}, ${anime}`
    } else if (columnKey === "status") {
        const status = opening.status
        // Mapea los valores de status a las palabras deseadas
        const statusMap = {
            active: "Activo",
            paused: "En pausa",
            fix: "Mantenimiento",
        }
        return statusMap[status] || "Estatus no disponible"
    } else if (columnKey === "date") {
        if (opening.time) {
            // Calcula la fecha
            const time = opening.time
            const fireBaseTime = new Date(
                time.seconds * 1000 + time.nanoseconds / 1000000,
            )
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            const date = fireBaseTime.toLocaleDateString('es-MX', options)
            return date
        }
    } else if (columnKey === "time") {
        if (opening.time) {
            // Calcula la hora
            const time = opening.time
            const fireBaseTime = new Date(
                time.seconds * 1000 + time.nanoseconds / 1000000,
            )
            const atTime = fireBaseTime.toLocaleTimeString('en-US')
            return atTime
        }
    }
    return opening[columnKey] || "Valor no disponible"
}

export const DashboardTableOpenings = ({ filteredOpenings }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedOpening, setSelectedOpening] = useState(null)
    const [updateOpening, setUpdateOpening] = useState(null)
    const [selectedServer, setSelectedServer] = useState(null)

    const handleOpening = (opening) => {
        setSelectedOpening(opening)
        setUpdateOpening(null)
        onOpen()
    }

    const handleUpdateOpening = (opening) => {
        setUpdateOpening(opening)
        setSelectedOpening(null)
        onOpen()
    }

    const handleSelectServer = (server) => {
        setSelectedServer(server.url)
    }

    const handleRenderFirstVideo = (opening) => {
        if (opening.video && opening.video.length > 0) {
            setSelectedServer(opening.video[0].url);
        }
    }

    const handleDeleteOpening = (openingId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteElementInOpening(openingId)
                Swal.fire({
                    title: "!Borrado!",
                    text: "Tu opening ha sido borrado.",
                    icon: "success"
                });
            }
        });
    }

    const renderCell = useCallback((opening, columnKey) => {
        const cellValue = getCellValue(opening, columnKey)

        switch (columnKey) {
            case "name":
                if (cellValue) {
                    const [img, title, anime] = cellValue.split(', ')
                    return (
                        <User
                            avatarProps={{ radius: "lg", src: img }}
                            description={anime}
                            name={title}
                        >
                            {title}
                        </User>
                    )
                }
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[opening.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Detalles">
                            <Button
                                size="sm"
                                variant="bordered"
                                className="text-lg text-default-400 bg-transparent"
                                isIconOnly
                                onPress={() => {
                                    handleOpening(opening), handleRenderFirstVideo(opening) // Cambiar 'item' a 'opening'

                                }}>
                                <EyeFilledIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip color="warning" content="Editar opening">
                            <Button size="sm" color="warning" variant="bordered" className="text-lg text-warning bg-transparent" isIconOnly onPress={() => { handleUpdateOpening(opening) }}>
                                <EditIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip color="danger" content="Borrar opening">
                            <Button size="sm" color="danger" variant="bordered" className="text-lg text-danger bg-transparent" isIconOnly onClick={() => handleDeleteOpening(opening.id)}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </div>
                )
            default:
                return cellValue
        }
    }, [])

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={filteredOpenings()} emptyContent={"No existe contenido para mostrar"}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" onClose={() => setSelectedServer(null)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {selectedOpening ? selectedOpening.title : "Detalles del Opening"}
                            </ModalHeader>
                            <ModalBody>
                                {selectedOpening ? (
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
                                    updateOpening ? (
                                        <FormUpdateOpening openingId={updateOpening.id} onClose={onClose} />
                                    ) : (
                                        <p>Selecciona una apertura para ver los detalles o muestra el formulario de edición.</p>
                                    )
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {/* Puedes agregar más acciones si es necesario */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}