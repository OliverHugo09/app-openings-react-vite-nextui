import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { updateOpening, fetchOpeningById } from "../helpers/crudOpenings"; // Añade la función de actualización y la función de búsqueda por ID

export const FormUpdateOpening = ({ openingId }) => {
    const [displayImageInput, setDisplayImageInput] = useState(true);
    const [formData, setFormData] = useState({
        img: "https://placehold.co/300x170",
        anime: "",
        title: "",
        video: [
            { service: "", url: "" },
        ],
        status: "active",
        reported: 0
    });

    useEffect(() => {
        // Carga los datos del opening existente usando el ID proporcionado
        const loadOpeningData = async () => {
            const openingData = await fetchOpeningById(openingId);

            if (openingData) {
                setFormData(openingData);
            }
        };

        loadOpeningData();
    }, [openingId]);

    const handleChangeInputImage = () => {
        setDisplayImageInput(!displayImageInput);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedVideo = [...formData.video];
        updatedVideo[index][name] = value;

        setFormData((prevData) => ({
            ...prevData,
            video: updatedVideo
        }));
    }

    const addVideoField = () => {
        setFormData((prevData) => ({
            ...prevData,
            video: [...prevData.video, { service: "", url: "" }]
        }));
    }

    const removeVideoField = (index) => {
        const updatedVideo = [...formData.video];
        updatedVideo.splice(index, 1);

        setFormData((prevData) => ({
            ...prevData,
            video: updatedVideo
        }));
    }

    const capitalizeText = (text) => {
        return text.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realiza la actualización del opening utilizando la función de actualización
        const success = await updateOpening(openingId, formData);

        if (success) {
            console.log("Se actualizó con éxito");
        } else {
            console.log("Error al actualizar");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-0 mt-0 pt-0">
                    <h2 className="text-base font-semibold leading-7">Datos del Opening</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Puedes agregar la URL de la miniatura o subir la imagen si no tienes una URL.
                        <br />⚠ No es necesario agregar una miniatura si no cuentas con una ⚠
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="title" className="block text-sm font-medium leading-6">Titulo del Opening</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    maxLength={60}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="anime" className="block text-sm font-medium leading-6">Nombre del Anime</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="anime"
                                    id="anime"
                                    autoComplete="anime"
                                    value={formData.anime}
                                    maxLength={60}
                                    onChange={(e) => setFormData({ ...formData, anime: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {displayImageInput ? (
                            <div className="sm:col-span-3">
                                <label htmlFor="img" className="w-full block text-sm font-medium leading-12">URL de la minuatura</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="img"
                                        id="img"
                                        autoComplete="img"
                                        maxLength={60}
                                        value={formData.img}
                                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                        className="block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="sm:col-span-3">
                                <label htmlFor="img" className="w-full block text-sm font-medium leading-12">Subir Imagen</label>
                                <div className="mt-2">
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span className="">Sube una imagen</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1 text-white">o arrastra y suelta</p>
                                            </div>
                                            <p className="text-xs text-white">
                                                PNG, JPG, GIF hasta 10 MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="sm:col-span-3">
                            <div className="mt-6">
                                <Button color="primary" variant="ghost" value={displayImageInput} onClick={handleChangeInputImage}>
                                    Subir URL o subir archivo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-0 mt-0 pt-0">
                    <h2 className="text-base font-semibold leading-7">Servidores multimedia</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">Agrega los servidores que quieras, entre más servidores existan más posibilidades de que el contenido siga disponible</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {formData.video.map((videoField, index) => (
                            <div key={index}>
                                <div className="sm:col-span-3 sm:col-start-1">
                                    <label htmlFor="service" className="block text-sm font-medium leading-6">Nombre del servidor multimedia</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="service"
                                            id="service"
                                            autoComplete="service"
                                            value={videoField.service}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3 mb-2">
                                    <label htmlFor="service" className="block text-sm font-medium leading-6">URL</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="url"
                                            id="url"
                                            autoComplete="url"
                                            value={videoField.url}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={() => removeVideoField(index)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Eliminar</button>
                            </div>
                        ))}
                        <button type="button" onClick={addVideoField} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Agregar Video</button>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6">Cancel</button>
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
        </form>
    )
}