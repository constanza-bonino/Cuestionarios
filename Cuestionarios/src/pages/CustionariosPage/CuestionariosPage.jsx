import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CuestionariosPage.css";

function CuestionariosPage() {

    const [cuestionarios, setCuestionarios] = useState(null);

    useEffect(() => {
        // Fetch the product details using async/await
        const fetchQs = async () => {
            try {
                const url = `http://localhost:3000/cuestionarios`;
                const res = await fetch(url);
                const data = await res.json();
                setCuestionarios(data);
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        };

        fetchQs();
    }, []);

    // We want to render some loading state if the product is not yet loaded 👇
    if (!cuestionarios) return <p>Cargando productos...</p>;
    console.log(cuestionarios);

    // We want to render the product details 👇
    return (<div className="cuestionarios">
        <h1>Cuestionarios</h1>
        {
            cuestionarios.map((cuestionario) => (
                <Link key={"cuestionario" + cuestionario.id} to={`/cuestionarios/${cuestionario.id}`}> <span className="titulo">{cuestionario.nombre}</span>: {cuestionario.descripcion}</Link>
            ))
        }
    </div>
    );
}

export default CuestionariosPage;