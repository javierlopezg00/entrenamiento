import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./GetUserInfo.scss";

export default function GetUserInfo() {
  // Estado de la informacion del usuario
  const [userAge, setUserAge] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userGymAccess, setUserGymAccess] = useState("");
  const [userExperienceStrength, setUserExperienceStrength] = useState("");
  const [userExperienceCardio, setUserExperienceCardio] = useState("");
  const [userTimeAvailability, setUserTimeAvailability] = useState("");
  const [userTrainingGoal, setUserTrainingGoal] = useState("");
  const [userTrainingPreference, setUserTrainingPreference] = useState("");
  const [userTrainingIntensity, setUserTrainingIntensity] = useState("");
  const [excercisePrediction, setExcercisePrediction] = useState("");

  // Funciones
  /**
   * Dar formato a los valores numéricos enternos.
   *
   * @param e Evento de entrada de datos.
   * @param allowDecimal Booleano que indica si se permite el ingreso de decimales.
   * @param setFunction Función para actualizar el estado.
   * @returns Número con formato.
   */
  const formatNumber = (e, allowDecimal, setFunction) => {
    let number = e.target.value;
    number = allowDecimal ? number : number.replace(/\D/g, "");
    e.target.value = number;
    setFunction(number);
    console.log(number);

    return number;
  };

  /**
   * Validar que los datos del usuario estén completos.
   *
   * @returns Booleano que indica si los datos están completos.
   */
  const validateUserInformation = () =>
    userAge !== "" &&
    userHeight !== "" &&
    userWeight !== "" &&
    userGender !== "" &&
    userGymAccess !== "" &&
    userExperienceStrength !== "" &&
    userExperienceCardio !== "" &&
    userTimeAvailability !== "" &&
    userTrainingGoal !== "" &&
    userTrainingPreference !== "" &&
    userTrainingIntensity !== "";

  /**
   * Obtener la recomendación del ejercicio.
   */
  const getExcerciseRecommendation = async () => {
    setExcercisePrediction("Cargando...")
    
    if (validateUserInformation()) {
      const response = await invoke("get_excercise_recommendation", {
        age: Number(userAge),
        height: Number(userHeight),
        weight: Number(userWeight),
        gender: userGender,
        gymAccess: Boolean(userGymAccess),
        strengthExp: Boolean(userExperienceStrength),
        cardioExp: Boolean(userExperienceCardio),
        timeAvailable: userTimeAvailability,
        trainingGoal: userTrainingGoal,
        trainingPreference: userTrainingPreference,
        trainingIntensity: userTrainingIntensity,
      });
      setExcercisePrediction(response);
    } else {
      setExcercisePrediction("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="mainInfoContainer">
      <div className="getInfoContainer">
        <h1>Personal information</h1>
        <input
          type="number"
          className="inputStyle"
          placeholder="Age"
          id="inputGetUser"
          autoComplete="off"
          min="0"
          step="1"
          onChange={(e) => formatNumber(e, false, setUserAge)}
        ></input>
        <input
          type="number"
          className="inputStyle"
          placeholder="Height (mts)"
          id="inputGetUser"
          autoComplete="off"
          min="0"
          step="1"
          onChange={(e) => formatNumber(e, true, setUserHeight)}
        ></input>
        <input
          type="number"
          className="inputStyle"
          placeholder="Weight (lbs)"
          id="inputGetUser"
          autoComplete="off"
          min="0"
          step="1"
          onChange={(e) => formatNumber(e, true, setUserWeight)}
        ></input>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserGender(e.target.value)}
        >
          <option value="" disabled selected>
            Genero
          </option>
          <option value="0">Masculino</option>
          <option value="1">Femenino</option>
          <option value="2">Prefiero no decirlo</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserGymAccess(e.target.value)}
        >
          <option value="" disabled selected>
            Acceso al gimnasio
          </option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserExperienceStrength(e.target.value)}
        >
          <option value="" disabled selected>
            Experiencia en ejercicios de fuerza
          </option>
          <option value="0">No</option>
          <option value="1">Si</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserExperienceCardio(e.target.value)}
        >
          <option value="" disabled selected>
            Experiencia en ejercicios cariovasculares
          </option>
          <option value="0">No</option>
          <option value="1">Si</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTimeAvailability(e.target.value)}
        >
          <option value="" disabled selected>
            Disponibilidad de tiempo
          </option>
          <option value="0">30 min</option>
          <option value="1">45 min</option>
          <option value="2">1 hora</option>
          <option value="3">1.5 horas</option>
          <option value="4">2 horas</option>
          <option value="5">2.5 horas</option>
          <option value="6">3 horas</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingGoal(e.target.value)}
        >
          <option className="option" value="" disabled selected>
            Motivo de entrenamieto
          </option>
          <option value="0">Pérdida de Peso</option>
          <option value="1">Aumento de masa muscular</option>
          <option value="2">Definicion muscular</option>
          <option value="3">Salud en general</option>
        </select>

        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingPreference(e.target.value)}
        >
          <option value="" disabled selected>
            Preferencia de entrenamiento{" "}
          </option>
          <option value="0">Brazos</option>
          <option value="1">Abdomen</option>
          <option value="2">Piernas</option>
          <option value="3">Pecho</option>
          <option value="4">Espalda</option>
          <option value="5">Cuerpo en general</option>
        </select>

        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingIntensity(e.target.value)}
        >
          <option value="" disabled selected>
            Intensidad de entrenamiento
          </option>
          <option value="0">Leve</option>
          <option value="1">Intermedio</option>
          <option value="2">Intenso</option>
        </select>

        <button className="buttonStyle" onClick={getExcerciseRecommendation}>
          Guardar informacion
        </button>
      </div>

      <div className="getInfoContainer">
        <p className="textStyle">
          Recomendación de Ejercicio: {excercisePrediction}
        </p>
      </div>
      <div className="medium-sep" />
    </div>
  );
}
