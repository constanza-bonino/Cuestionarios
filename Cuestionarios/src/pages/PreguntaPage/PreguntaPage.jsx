import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PreguntaPage.css"

function PreguntaPage() {

    const params = useParams();

    const [pregunta, setPregunta] = useState(null);

    useEffect(() => {
        // Fetch the product details using async/await
        const fetchQs = async () => {
            try {
                const url = `http://localhost:3000/detallesPreguntas/${params.idCuestionario}/${params.idPregunta}`;
                const res = await fetch(url);
                const data = await res.json();
                setPregunta(data);
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        };

        fetchQs();
    }, [params.idCuestionario, params.idPregunta]);

    // We want to render some loading state if the product is not yet loaded 👇
    if (!pregunta) return <p>Cargando pregunta...</p>;

    // We want to render the product details 👇
    return (<div className="pregunta">
        <h2>{pregunta.nombre}</h2>
        <h1></h1>
        {

            pregunta.map((pregunta) => (
                <Link to={"cuestionarios/" + params.idCuestionario + "/" + pregunta.id}> {pregunta.titulo} </Link>
            ))
        }
    </div>
    );
}

export default PreguntaPage