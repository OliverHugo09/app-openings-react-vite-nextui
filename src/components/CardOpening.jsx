import { Card, CardHeader, CardBody, Image, Pagination } from "@nextui-org/react"
import { Link } from "react-router-dom"

export const CardOpening = ({ filteredOpenings }) => {

    return (
        <>
            {filteredOpenings().map((opening) => (
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
                                style={{ height: 200 }}
                            />
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </>
    );
};