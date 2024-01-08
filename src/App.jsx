import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import{Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';

function App() {

  const datatareas = [

    {id:1, tarea: "hacer una app", estatus:1},
    {id:2, tarea: "guardar una app",estatus:0},
  ];

  const[data,setData] = useState(datatareas);

  const[modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const[tareaSeleccionada, setTareaSeleccionada] = useState({
    id: '',
    tarea:'',
  });

  const seleccionarTarea=(elemento, caso)=>{
    setTareaSeleccionada(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
      }

  const handleChange=e=>{
    const {name, value}=e.target;
    setTareaSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }


  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(tarea=>{
      if(tarea.id===tareaSeleccionada.id){
        tarea.tarea=tareaSeleccionada.tarea;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(tarea=>tarea.id!==tareaSeleccionada.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setTareaSeleccionada(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=tareaSeleccionada;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }


  return (
    <>
       <div>
       <h2>Lista de Tareas</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Completada</th>
            <th>ID</th>
            <th>Tarea</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.tarea}</td>
      
              <td><button className='btn btn-primary' onClick={()=>seleccionarTarea(elemento,'Editar')}>Editar</button> {"  "}
              <button className="btn btn-danger" onClick={()=>seleccionarTarea(elemento, 'Eliminar')}>Eliminar</button></td>

            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalEditar}>
<ModalHeader>
  <div>
    <h3>Editar Tarea</h3>
  </div>
</ModalHeader>
<ModalBody>
  <div className="form-group">
    <label>ID</label>
    <input
      className="form-control"
      readOnly
      type="text"
      name="id"
      value={tareaSeleccionada && tareaSeleccionada.id}
    />
    <br />

    <label>Tarea</label>
    <input
      className="form-control"
      type="text"
      name="tarea"
      value={tareaSeleccionada && tareaSeleccionada.tarea}
      onChange={handleChange}
    />
    <br />
  </div>
</ModalBody>
<ModalFooter>
  <button className="btn btn-primary" onClick={()=>editar()}>
    Actualizar
  </button>
  <button
    className="btn btn-danger"
    onClick={()=>setModalEditar(false)}
  >
    Cancelar
  </button>
</ModalFooter>
</Modal>
<Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar la tarea {tareaSeleccionada && tareaSeleccionada.tarea}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Tarea</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Tarea</label>
            <input
              className="form-control"
              type="text"
              name="tarea"
              value={tareaSeleccionada ? tareaSeleccionada.tarea: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
       </div>
    </>
  )
}

export default App
