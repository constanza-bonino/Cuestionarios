import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function PreguntaPage() {

    const params = useParams();
    const [planteo, setPlanteo] = useState({});
    const [seleccion, setSeleccion] = useState("");

    // Se debe definir el endpoint que trae el planteo
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3001/${params.idCuestionario}/`);
    //             const data = await response.json();
    //             setPlanteo(data);
    //         } catch (error) {
    //             console.error("Error al obtener datos:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Datos de prueba
    useEffect(() => {
        // Datos de prueba, se asigna solo una vez
        setPlanteo({
            tipo: "MO",
            descripcion: "Este es el planteo",
            opciones: {
                opcion1: "Opcion 1",
                opcion2: "Opcion 2",
                opcion3: "Opcion 3"
            }
        });
    }, []);

    return (
        <div>
            <h2>{planteo.descripcion}</h2>

            {planteo.tipo === "MO" ? (
                Object.entries(planteo.opciones || {}).map(([clave, valor]) => (
                    <label key={clave}>
                        <input
                            type="radio"
                            name="opcion"
                            value={clave}
                            checked={seleccion === clave}
                            onChange={(e) => setSeleccion(e.target.value)}
                        />
                        {clave}: {valor}
                    </label>
                ))
            ) : (
                <textarea name="respuesta" id="respuesta"></textarea>
            )}
            <button>Enter</button>
        </div>
    )
}