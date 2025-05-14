
import './App.css'

function App() {

  const [usuario, setUsuario] = useState(null);


  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginPage nuevoUsuario={setUsuario} />} />
      {usuario !== null && (
        < >
          <Route path="/cuestionarios" element={<CuestionariosPage />} />
          <Route path="/cuestionarios/id.cuestionario" element={<ListaPreguntasPage />} />
          <Route path="/cuestionarios/:idCuestionario/:idPregunta" element={<PreguntaPage />} />
        </>
      )}
    </Routes>
  );
}

export default App
