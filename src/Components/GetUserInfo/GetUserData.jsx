import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./GetUserInfo.scss";

export default function GetUserData() {
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

  //Nuevos Parámetros
  const [doesExcercise, setDoesExcercise] = useState("");
  const [open, setOpen] = useState(0); //Mostrar o No nuevas Opciones

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
    userTrainingIntensity !== "" &&
    doesExcercise !== "";

  /**
   * Obtener la recomendación del ejercicio.
   */
  const getExcerciseRecommendation = async () => {
    setExcercisePrediction("Cargando...");

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

  useEffect(() => {
    setOpen(() => doesExcercise);
  }, [doesExcercise]);


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
            Gender
          </option>
          <option value="1">Male</option>
          <option value="0">Female</option>
          <option value="2">I rather not say</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserGymAccess(e.target.value)}
        >
          <option value="" disabled selected>
            Do you have access to a Gym?
          </option>
          <option value="1">No</option>
          <option value="0">Yes</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserExperienceStrength(e.target.value)}
        >
          <option value="" disabled selected>
            Experience in Strength Excercises
          </option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserExperienceCardio(e.target.value)}
        >
          <option value="" disabled selected>
          Experience in Cardiovascular Excercises
          </option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTimeAvailability(e.target.value)}
        >
          <option value="" disabled selected>
            Time Available
          </option>
          <option value="0">30 min</option>
          <option value="1">45 min</option>
          <option value="2">1 hour</option>
          <option value="3">1.5 hours</option>
          <option value="4">2 hours</option>
          <option value="5">2.5 hours</option>
          <option value="6">3 hours</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingGoal(e.target.value)}
        >
          <option className="option" value="" disabled selected>
            Reason for Training
          </option>
          <option value="0">Loosing weight</option>
          <option value="1">Increase muscle mass</option>
          <option value="2">Muscle definition</option>
          <option value="3">Overall health</option>
        </select>

        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setOpen(e.target.value)}
        >
          <option value="" disabled selected>
            Do you Excercise?
          </option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingIntensity(e.target.value)}
        >
          <option value="" disabled selected>
            Preferred Excercise Intensity
          </option>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>

        {open==1?
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingPreference(e.target.value)}
        >
          <option value="" disabled selected>
            Training Preferences{" "}
          </option>
          <option value="0">Arms</option>
          <option value="1">Abs</option>
          <option value="2">Legs</option>
          <option value="3">Chest</option>
          <option value="4">Back</option>
          <option value="5">Overall body</option>
        </select>
        :null}
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
