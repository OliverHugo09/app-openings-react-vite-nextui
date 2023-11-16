import React from 'react'

export const RenderSelectedOpening = ({ selectedServer, selectedOpening }) => {

    const handleSelectServer = (server) => {
        setSelectedServer(server.url)
    }

    return (
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
    )
}
