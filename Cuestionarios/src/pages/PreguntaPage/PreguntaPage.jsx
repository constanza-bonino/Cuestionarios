import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PreguntaPage.css";

function PreguntaPage() {

    

    const params = useParams();

    const [pregunta, setPregunta] = useState(null);
    const [respuesta, setRespuesta] = useState("");

    useEffect(() => {
        // Fetch the product details using async/await
        const fetchQs = async () => {
            try {
                const url = `http://localhost:3000/preguntas/${params.idPregunta}`;
                const res = await fetch(url);
                const data = await res.json();
                console.log("pregunta", data);
                setPregunta(data);
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        };

        async function CargarJson() {
            try {
                const res = await fetch("http://localhost:3000/respuestas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_usuario: "USR-1",
                        id_pregunta: pregunta.id,
                        valor: respuesta.current.value
                    })
                });
                if (!res.ok) throw new Error("Error al agregar post");
                return await res.json();
            } catch (err) {
                console.error(err);
            }
        }

        fetchQs();
    }, [params.idCuestionario, params.idPregunta]);

    // We want to render some loading state if the product is not yet loaded 👇
    if (!pregunta) return <p>Cargando pregunta...</p>;

    // We want to render the product details 👇
    return (
        <div className="pregunta">
            <h2>{pregunta.nombre}</h2>
            {pregunta.opciones ? (
                <form className="space-y-2">
                    {pregunta.opciones.map((opcion, idx) => (
                        <label
                            key={idx}
                            className={`flex items-center space-x-2 p-2 rounded ${isSubmitted
                                    ? option === correctAnswer
                                        ? "bg-green-100"
                                        : selected === option
                                            ? "bg-red-100"
                                            : ""
                                    : ""
                                }`}
                        >
                            <input
                                type="radio"
                                name="choice"
                                value={option}
                                checked={selected === option}
                                onChange={handleChange}
                                disabled={isSubmitted}
                            />
                            <span>{option}</span>
                        </label>))}
                </form>
            ) : (
                <input
                    type="text"
                    placeholder="Ingrese su respuesta"
                    onChange={respuesta}
                />
            )}
            <button onClick={CargarJson}>Guardar respuesta</button>
        </div>
    );
}

export default PreguntaPage;


const [selected, setSelected] = useState("");
const [isSubmitted, setIsSubmitted] = useState(false);

const handleChange = (event) => {
    setSelected(event.target.value);
};

const handleSubmit = () => {
    if (selected) {
        setIsSubmitted(true);
    }
};

return (
    <div className="p-4 max-w-md border rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{question}</h2>
        <form className="space-y-2">
            {options.map((option, idx) => (
                <label
                    key={idx}
                    className={`flex items-center space-x-2 p-2 rounded ${isSubmitted
                            ? option === correctAnswer
                                ? "bg-green-100"
                                : selected === option
                                    ? "bg-red-100"
                                    : ""
                            : ""
                        }`}
                >
                    <input
                        type="radio"
                        name="choice"
                        value={option}
                        checked={selected === option}
                        onChange={handleChange}
                        disabled={isSubmitted}
                    />
                    <span>{option}</span>
                </label>
            ))}
        </form>
        <button
            onClick={handleSubmit}
            disabled={isSubmitted || !selected}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
            Submit
        </button>