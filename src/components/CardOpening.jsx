import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom
import { useOpenings } from "../context/OpeningsProvider";

export const CardOpening = () => {
    const { openings } = useOpenings();

    return (
        <>
            {openings.map((opening) => (
                <Link to={`/opening/${opening.id}`} key={opening.id}>
                    <Card className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{opening.title}</p>
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
                </Link>
            ))}
        </>
    );
};