
import "../views/Compra.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postOrdenes } from "../Redux/ordenesSlice";
import { useSelector} from "react-redux"
import { putUsuario } from "../Redux/usuariosSlice";
import { getUsuario } from "../Redux/usuariosSlice";

const FormularioCompra = () => {
  const dispatch = useDispatch();
  
  // Estado inicial del formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    codigoPostal: "",
    direccion: "",
    piso: "",
    medioPago: "",
    numeroTarjeta: "",
    numeroSeguridad: "",
    fechaVencimiento: "",
    giftCard: "",
  });

  const [compraRealizada, setCompraRealizada] = useState(false);
  const [errorFormulario, setErrorFormulario] = useState(""); // Estado para mensajes de error



  // Actualizar campos del formulario
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  
  // Obtener GiftCard y manejar errores
  const obtenerGift = async () => {
    if (!formulario.giftCard) {
      console.error("El campo Gift Card está vacío");
      return;
    }
    dispatch( getByIdGiftCard(formulario.giftCard))

  };

  const handleChangeGift = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
    obtenerGift();
  };

  // Validar el formulario antes de enviar
  const validarFormulario = () => {
    const camposObligatorios = ["nombre", "apellido", "codigoPostal", "direccion", "medioPago"];
    for (const campo of camposObligatorios) {
      if (!formulario[campo]) {
        return `El campo "${campo}" es obligatorio.`;
      }
    }
    if ((formulario.medioPago === "tarjetaCredito" || formulario.medioPago === "tarjetaDebito") &&
        (!formulario.numeroTarjeta || !formulario.numeroSeguridad || !formulario.fechaVencimiento)) {
      return "Por favor complete todos los datos de la tarjeta.";
    }
    return "";
  };

  //Obtener y editar los datos del usuario
  const emailUsuario = sessionStorage.getItem('mail');
  const {items: items, loading, error, usuario} = useSelector((state)=> state.usuarios)
  console.log(usuario)

  useEffect(() => {
    const codigoGuardado = sessionStorage.getItem('codigo');
    if (codigoGuardado) {
      setFormulario((prevFormulario) => ({
        ...prevFormulario, // Copia el estado anterior
        giftCard: codigoGuardado, // Asigna el valor de giftCard
      }));
    }
  }, []);

  useEffect(()=>{
    dispatch(getUsuario(emailUsuario))
  }, [dispatch])

  const editarUsuario = () => {
    const updatedUser = {
          nombre: usuario.nombre,
          apellido: usuario.apellido, 
          direccion: formulario.direccion, 
          cp: parseInt(formulario.codigoPostal)}
    dispatch(putUsuario({id: usuario.id, updatedUser: updatedUser}));
  }


  // Manejar la acción de realizar compra
  const handleRealizarCompra = () => {
    const error = validarFormulario();
    if (error) {
      setErrorFormulario(error);
      return;
    }
    editarUsuario();
    const ordenData = {
      mail: sessionStorage.getItem("mail"),
      codigo: formulario.giftCard,
    };

    dispatch(postOrdenes(ordenData));
    setCompraRealizada(true);
  };

  const handleRedirigirHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="Compra-seccion-formulario">
      <h1>Formulario de Compra</h1>

      <form>
        <div className="Compra-form-group">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Compra-form-group">
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formulario.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Compra-form-group">
          <input
            type="text"
            name="codigoPostal"
            placeholder="Código Postal"
            value={formulario.codigoPostal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Compra-form-group">
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formulario.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Compra-form-group">
          <input
            type="text"
            name="piso"
            placeholder="Piso/Departamento"
            value={formulario.piso}
            onChange={handleChange}
          />
        </div>
        <div className="Compra-form-group">
          <input
            type="text"
            name="giftCard"
            placeholder="Ingrese el código de la Gift Card"
            value={formulario.giftCard || ""}
            onChange={handleChangeGift}
          />
        </div>
        <div className="Compra-form-group">
          <select
            name="medioPago"
            value={formulario.medioPago}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un medio de pago</option>
            <option value="tarjetaCredito">Tarjeta de Crédito</option>
            <option value="tarjetaDebito">Tarjeta de Débito</option>
            <option value="mercadoPago">Mercado Pago</option>
          </select>
        </div>

        {(formulario.medioPago === "tarjetaCredito" || formulario.medioPago === "tarjetaDebito") && (
          <>
            <div className="Compra-form-group">
              <input
                type="text"
                name="numeroTarjeta"
                placeholder="Número de Tarjeta"
                value={formulario.numeroTarjeta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Compra-form-group">
              <input
                type="text"
                name="numeroSeguridad"
                placeholder="Número de Seguridad"
                value={formulario.numeroSeguridad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Compra-form-group">
              <input
                type="text"
                name="fechaVencimiento"
                placeholder="MM/AA"
                value={formulario.fechaVencimiento}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
      </form>

      {errorFormulario && <p className="error">{errorFormulario}</p>}

      <div className="boton-comprar">
        <button onClick={handleRealizarCompra}>Realizar Compra</button>
      </div>

      {compraRealizada && (
        <div className="popup-compra">
          <div className="Compra-popup-contenido">
            <h2>¡Tu compra fue realizada con éxito!</h2>
            <button onClick={handleRedirigirHome}>Volver a la homepage</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioCompra;
