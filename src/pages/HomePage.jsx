import { CardOpening } from "../components/CardOpening"
import { Button, Input } from "@nextui-org/react";
import { useOpenings } from "../context/OpeningsProvider";
import { useState } from "react";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { SearchIcon } from "../icons/SearchIcon";

export const HomePage = () => {

    const { openings } = useOpenings()

    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')

    const filteredOpenings = () => {
        if (search.length === 0)
            return openings.slice(currentPage, currentPage + 12)

        // Normalizar la búsqueda y los títulos de openings a minúsculas
        const normalizedSearch = search.toLowerCase()
        const filtered = openings.filter(opening =>
            opening.anime.toLowerCase().includes(normalizedSearch)
        )

        return filtered.slice(currentPage, currentPage + 12)
    }

    const nextPage = () => {
        const nextElements = openings.slice(currentPage + 12, currentPage + 24);
        if (nextElements.length > 0) {
            setCurrentPage(currentPage + 12);
        }
    }

    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 12)
    }

    const onSearchChange = (e) => {
        setCurrentPage(0);
        setSearch(e.target.value)
    }

    return (
        <>
            <Input
                className="mb-2"
                type="search"
                placeholder="Type to search..."
                labelPlacement="outside"
                value={search}
                onChange={onSearchChange}
                startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />
            <div className="gap-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <CardOpening filteredOpenings={filteredOpenings} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <Button color="primary" variant="bordered" onClick={prevPage} startContent={<ArrowLeftIcon />}>
                    Anterior
                </Button>
                <Button color="primary" variant="bordered" onClick={nextPage} endContent={<ArrowRightIcon />}>
                    Siguiente
                </Button>
            </div>



        </>
    )
}
