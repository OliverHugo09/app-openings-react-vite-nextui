import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";
import { useEffect } from "react";
import { useOpeningsData } from "../hooks/useOpeningsData";

export const CardOpening = () => {

    const { openings, fetchopening } = useOpeningsData()

    useEffect(() => {
        fetchopening()
    }, [])

    return (
        <>
            {openings.map((opening) => (
                <Card className="py-4" key={opening.id} as={Link} href={`/opening/${opening.id}`}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{opening.title}</p>
                        <small className="text-default-500">Duración: {opening.time}</small>
                        <h4 className="font-bold text-large">{opening.anime}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 place-items-center">
                        <Image
                            alt="Card background"
                            className="object-cover"
                            src={opening.img}
                            width={300}
                        />
                    </CardBody>
                </Card>

            ))}
        </>
    )
}
