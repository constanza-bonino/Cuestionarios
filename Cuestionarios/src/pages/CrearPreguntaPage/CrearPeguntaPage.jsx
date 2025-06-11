import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function CrearPreguntaPage() {

    const params = useParams();

    const [nombre, setNombre] = useState("");
    const [type, setType] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [completo, setCompleto] = useState(false);

    const handleChange = (event) => {
        setNombre(event.target.value);
    }

    const handleMOSelector = (event) => {
        setType("MO")
    };

    const handleTextSelector = (event) => {
        setType("text")
    };

    const handleInputChange = (event) => {
        let index = parseInt(event.target.id);
        let value = event.target.value;
        if (value.trim !== "") {
            let array = opciones;
            array[index] = value;
            setOpciones(array);
        }

        let flag = true;

        opciones.map((opcion) => {
            flag = flag && (opcion.trim() !== "")
        })

        setCompleto(flag);

    };

    const isButtonDisabled = (type !== "MO" || completo) && (nombre.trim() !== "");


    const cargarJson = async () => {
        if (type === "MO") {
            try {
                const res = await fetch("http://localhost:3000/preguntas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_cuestionario: params.idCuestionario,
                        opciones: [
                            opciones[0],
                            opciones[1],
                            opciones[2]
                        ],
                        nombre: nombre
                    })
                });
                if (!res.ok) throw new Error("Error al agregar post");
                const responseData = await res.json();
                return responseData;
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const res = await fetch("http://localhost:3000/preguntas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_cuestionario: params.idCuestionario,
                        nombre: nombre
                    })
                });
                if (!res.ok) throw new Error("Error al agregar post");
                const responseData = await res.json();
                return responseData;
            } catch (err) {
                console.error(err);
            }
        }

    };

    // We want to render the product details 👇
    return (
        <div className="pregunta">
            <h2>Crea tu pregunta:</h2>
            <input
                type="text"
                placeholder="Ingrese el nombre de la pregunta"
                onChange={handleChange}
            />
            <p>Seleccione el tipo de pregunta:</p>
            <label
                key="MO"
            >
                <input
                    type="radio"
                    name="choice"
                    value="MO"
                    onChange={handleMOSelector}
                />
                <span>MO</span>
            </label>
            <label
                key="texto"
            >
                <input
                    type="radio"
                    name="choice"
                    value="texto"
                    onChange={handleTextSelector}
                />
                <span>Texto</span>
            </label>
            {type === "MO" && (
                <>
                    <label for="op1">Opción uno:</label>
                    <input type="text" id="0" onChange={handleInputChange}></input>
                    <label for="op2">Opción dos:</label>
                    <input type="text" id="1" name="fname" onChange={handleInputChange}></input>
                    <label for="op3">Opción tres:</label>
                    <input type="text" id="2" onChange={handleInputChange}></input>
                </>
            )};
            <button onClick={cargarJson} disabled={isButtonDisabled}>Guardar pregunta</button>
        </div>
    );
}

export default CrearPreguntaPage;