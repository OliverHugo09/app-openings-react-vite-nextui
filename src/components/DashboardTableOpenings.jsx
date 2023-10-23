import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react"
import { EditIcon } from "../icons/EditIcon"
import { DeleteIcon } from "../icons/DeleteIcon"
import { EyeFilledIcon } from "../icons/EyeFilledIcon"
import { useCallback } from "react"
import { useOpenings } from "../context/OpeningsProvider"

const statusColorMap = {
    active: "success",
    paused: "danger",
    fix: "warning",
}

const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "ESTADO", uid: "status" },
    { name: "CREADO EL", uid: "timestap" },
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
        return statusMap[status] || "Estatus no disponible";
    }
    return opening[columnKey] || "Valor no disponible"
}

export const DashboardTableOpenings = () => {

    const { openings } = useOpenings()

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
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeFilledIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Editar opening">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Borrar opening">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                )
            default:
                return cellValue
        }
    }, [])


    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={openings} emptyContent={"No existe contenido para mostrar"}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
