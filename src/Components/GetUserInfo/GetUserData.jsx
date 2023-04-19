import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./GetUserInfo.scss";

export default function GetUserData() {
  // Estado de la informacion del usuario

  //Formulario 1
  const [userAge, setUserAge] = useState("");
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userGender, setUserGender] = useState("");
  const [doesExcercise, setDoesExcercise] = useState("2");


  //Formulario 2
  const [userTrainingDays, setUserTrainingDays] = useState("-1");
  const [userTrainingHours, setUserTrainingHours] = useState("-1");
  const [userTrainingYears, setUserTrainingYears] = useState("-1");
  const [userFocus, setUserFocus] = useState("-1");
  const [userAreaCardio, setUserAreaCardio] = useState("0");
  const [userAreaChest, setUserAreaChest] = useState("0");
  const [userAreaBack, setUserAreaBack] = useState("0");
  const [userAreaArm, setUserAreaArm] = useState("0");
  const [userAreaLegs, setUserAreaLegs] = useState("0");
  const [userAreaAbs, setUserAreaAbs] = useState("0");
  const [userEffective, setUserEffective] = useState("-1");
  const [userPhysicalState, setUserPhysicalState] = useState("-1");
  const [userHealth, setUSerHealth] = useState("-1");
  const [userConsumeProtein, setUserConsumeProtein] = useState("0");
  const [userConsumeCreatine, setUserConsumeCreatine] = useState("0");
  const [userConsumePretrain, setUserConsumePretrein] = useState("0");
  const [userConsumeNothing, setUserConsumeNothing] = useState("0");
  const [userConsumeOther, setUserConsumeOther] = useState("0");
  


  //Formulario 3
  const [sleepingHours, setSleepingHours] = useState("-1");
  const [eatingHabits, setEatingHabits] = useState("-1");
  const [primarySource, setPrimarySource] = useState("-1");
  const [secondarySource, setSecondarySource] = useState("-1");
  const [water, setWater] = useState("-1");
  const [fruit, setFruit] = useState("-1");
  const [vegetables, setVegetables] = useState("-1");


  //Formulario 4
  const [userTrainingGoalWeight, setUserTrainingGoalWight] = useState("0");
  const [userTrainingGoalMuscle, setUserTrainingGoalMuscle] = useState("0");
  const [userTrainingGoalDef, setUserTrainingGoalDef] = useState("0");
  const [userTrainingGoalHealth, setUserTrainingGoalHealth] = useState("0");
  const [userTimeAvailability, setUserTimeAvailability] = useState("");
  const [userExperienceStrength, setUserExperienceStrength] = useState("");
  const [userExperienceCardio, setUserExperienceCardio] = useState("");
  const [userGymAccess, setUserGymAccess] = useState("");
  const [userTrainingPreference, setUserTrainingPreference] = useState("");
  const [userTrainingIntensity, setUserTrainingIntensity] = useState("");

  //Prediction
  const [predictedDifficulty, setPredictedDifficulty] = useState("");
  const [calories, setCalories] = useState("");

  //Nuevos Parámetros
  const [open, setOpen] = useState(2); //Mostrar o No nuevas Opciones

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
  
  const noExcercise=(e)=>{
    if(e.target.value == "2"){
      setOpen(2);
    }else{
      setOpen(1);
    }
    setDoesExcercise(e.target.value);
  }
  
  const guardarData=()=>{
    const url = 'http://localhost:3000/api/v1/userInfo/createUserInfo';

    let formData = new FormData();
    formData.append('idUser', JSON.parse(localStorage.getItem("username")));
    formData.append('age', userAge);
    formData.append('height', userWeight);
    formData.append('gender', userGender);
    formData.append('physicalState', userPhysicalState);
    formData.append('health', userHealth);
    formData.append('feedingHabits', eatingHabits);
    formData.append('fruits', fruit);
    formData.append('vegetables', vegetables);
    formData.append('water', water);
    formData.append('physicalActivity', doesExcercise);
    formData.append('trainingReason', 1);
    formData.append('levelPreferred', userTrainingIntensity);
    formData.append('areaPreferred', userTrainingPreference);
    formData.append('timeAvailability', userTimeAvailability);
    formData.append('gymAccess', userGymAccess);
    formData.append('expStrenght', userExperienceStrength);
    formData.append('expCardiovascular', userExperienceCardio);
    formData.append('areaAbdominals', userAreaAbs);
    formData.append('areaArms', userAreaArm);
    formData.append('areaCardio', userAreaCardio);
    formData.append('areaBack', userAreaBack);
    formData.append('areaChest', userAreaChest);
    formData.append('trainingDays', userTrainingDays);
    formData.append('trainingHours', userTrainingHours);
    formData.append('constantTraining', userTrainingYears);
    formData.append('sleepingHours', sleepingHours);
    formData.append('productNothing', userConsumeNothing);
    formData.append('productCreatina', userConsumeCreatine);
    formData.append('productPreTraining', userConsumePretrain);
    formData.append('productProtein', userConsumeProtein);
    formData.append('productOthers', userConsumeNothing);
    formData.append('energy1', primarySource);
    formData.append('energy2', secondarySource);



    axios.post(url, formData,  {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }})
    .then((response)=>{
        console.log(response);

    })
    .catch((response)=>{
        console.log(response);
      });
  }

  const getCalories = async () => {
    setCalories("Loading...");

    const response = await invoke("get_calories", {
      age: Number(userAge),
      height: Number(userHeight),
      weight: Number(userWeight),
      days: Number(userTrainingDays),
      hours: Number(userTrainingHours),
      gender: Number(userGender),
    });
    
    setCalories(response);
    localStorage.setItem("calories", response);
  }

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
    userTrainingGoalWeight !== "" &&
    userTrainingGoalHealth !== "" &&
    userTrainingGoalMuscle !== "" &&
    userTrainingGoalDef !== "" &&
    userTrainingPreference !== "" &&
    userTrainingIntensity !== "" &&
    doesExcercise !== "";

  /**
   * Obtener la recomendación del ejercicio.
   */
  const getExcerciseRecommendation = async () => {
    setPredictedDifficulty("Loading...");

    if (validateUserInformation()) {
      const response = await invoke("determine_user_experience", {
        prediction: "exp",
        age: Number(userAge),
        height: Number(userHeight),
        weight: Number(userWeight),
        fitness: Number(userPhysicalState),
        health: Number(userHealth),
        eatingHabits: Number(eatingHabits),
        fruitConsumption: Number(fruit),
        veggiesConsumption: Number(vegetables),
        gender: userGender,
        trainingDays: userTrainingDays,
        trainingHours: userTrainingHours,
        constantTraining: userTrainingYears,
        focus: userTrainingGoalWeight,
        efficacy: userTrainingGoalHealth,
        sleepHours: sleepingHours,
        energySrc1: primarySource,
        energySrc2: secondarySource,
        waterConsumption: water,
        trainingObjective: userTrainingGoalMuscle,
        timeAvailable: userTimeAvailability,
        strengthExp: userExperienceStrength,
        cardioExp: userExperienceCardio,
        gymAccess: userGymAccess,
        preferredArea: userTrainingPreference,
        intensity: userTrainingIntensity,
        physicalActivities: doesExcercise,
        trainingAreas: userAreaAbs,
        productConsumption: userConsumeNothing,
      });
      setPredictedDifficulty(response);
      localStorage.setItem("predictedDifficulty", response);
    } else {
      setPredictedDifficulty("Por favor, complete todos los campos.");
    }
  };

  useEffect(() => {
    setOpen(() => doesExcercise);

    if (localStorage.getItem("predictedDifficulty")) {
      setPredictedDifficulty(localStorage.getItem("predictedDifficulty"));
    }
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
          onChange={(e) => noExcercise(e)}
        >
          <option value="2" disabled selected>
            Do you do any of these activities?
          </option>
          <option value="1">I go to the Gym</option>
          <option value="0">I train at home</option>
          <option value="2">I don't excercise, but would love to</option>
        </select>
      </div>

    {open!=2?
      <div className="getInfoContainer">
        <h1>Training information</h1>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingDays(e.target.value)}
        >
          <option value="-1" disabled selected>
            How many days a week do you train?
          </option>
          <option value="1">1-2</option>
          <option value="0">3-4</option>
          <option value="3">5-6</option>
          <option value="2">7</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingHours(e.target.value)}
        >
          <option value="-1" disabled selected>
            How many hours a day do you train?
          </option>
          <option value="0">30 mins or less</option>
          <option value="2">1 hour or less</option>
          <option value="1">1-2 hours</option>
          <option value="4">2-3 hours</option>
          <option value="3">More than 3 hours</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingYears(e.target.value)}
        >
          <option value="-1" disabled selected>
            How many years have you been training?
          </option>
          <option value="0">Less than 1 year</option>
          <option value="2">1-2</option>
          <option value="1">3-4</option>
          <option value="3">5-6</option>
          <option value="4">7 or more</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserFocus(e.target.value)}
        >
          <option value="-1" disabled selected>
            What is the current focus of your routine?
          </option>
          <option value="0">Stammina</option>
          <option value="1">Strength</option>
          <option value="2">Flexibility</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserEffective(e.target.value)}
        >
          <option value="-1" disabled selected>
            Do you think your routine is effective?
          </option>
          <option value="1">Yes</option>
          <option value="2">No</option>
          <option value="0">Maybe</option>
        </select>
        <div className="checks">
          What kind of excercises do you do?
          <input
          className="checkbox"
          type="checkbox"
          id="cardio"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserAreaCardio("1"):setUserAreaCardio("0")}
        ></input>
        <label for="cardio">Cardio</label>
        <input
          className="checkbox"
          type="checkbox"
          id="chest"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserAreaChest("1"):setUserAreaChest("0")}
        ></input>
        <label for="chest">Chest</label>
        <input
          className="checkbox"
          type="checkbox"
          id="back"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1? setUserAreaBack("1"):setUserAreaBack("0")}
        ></input>
        <label for="back">Back</label>
        <input
          className="checkbox"
          type="checkbox"
          id="arms"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserAreaArm("1"):setUserAreaArm("0")}
        ></input>
        <label for="arms">Arms</label>
        <input
          className="checkbox"
          type="checkbox"
          id="legs"
          autoComplete="off"
          onChange={(e) => e.target.value  == 1? setUserAreaLegs("1"):setUserAreaLegs("0")}
        ></input>
        <label for="legs">Legs</label>
        <input
          className="checkbox"
          type="checkbox"
          id="abs"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1? setUserAreaAbs("1"):setUserAreaAbs("0")}
        ></input>
        <label for="abs">Abs</label>
        </div>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserPhysicalState(e.target.value)}
        >
          <option value="-1" disabled selected>
          How good is your current physical state?
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUSerHealth(e.target.value)}
        >
          <option value="-1" disabled selected>
          How good is your health?
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div className="checks">
          Do you consume any of these products?
          <input
          className="checkbox"
          type="checkbox"
          id="creatine"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserConsumeCreatine("1"):setUserConsumeCreatine("0")}
        ></input>
        <label for="creatine">Creatine</label>
        <input
          className="checkbox"
          type="checkbox"
          id="protein"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserConsumeProtein("1"):setUserConsumeProtein("0")}
        ></input>
        <label for="protein">Protein</label>
        <input
          className="checkbox"
          type="checkbox"
          id="prework"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1? setUserConsumePretrein("1"):setUserConsumePretrein("0")}
        ></input>
        <label for="prework">Pre-workout</label>
        <input
          className="checkbox"
          type="checkbox"
          id="nothing"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserConsumeNothing("1"):setUserConsumeNothing("0")}
        ></input>
        <label for="nothing">Nothing</label>
        <input
          className="checkbox"
          type="checkbox"
          id="other"
          autoComplete="off"
          onChange={(e) => e.target.value  == 1? setUserConsumeOther("1"):setUserConsumeOther("0")}
        ></input>
        <label for="other">Other</label>
        </div>
      </div>:
      null
    }

{open!=2?
      <div className="getInfoContainer">
        <h1>Habits</h1>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setSleepingHours(e.target.value)}
        >
          <option value="-1" disabled selected>
          How many hours do you sleep at night?
          </option>
          <option value="4">Less than 3</option>
          <option value="2">3-4</option>
          <option value="0">5-6</option>
          <option value="1">7-8</option>
          <option value="3">9-10</option>
          <option value="5">More than 10</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setEatingHabits(e.target.value)}
        >
          <option value="-1" disabled selected>
          How would you rate your eating habits?
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setPrimarySource(e.target.value)}
        >
          <option value="-1" disabled selected>
          What is your primary source of food?
          </option>
          <option value="0">Carbs</option>
          <option value="1">Protein</option>
          <option value="2">Fats</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setSecondarySource(e.target.value)}
        >
          <option value="-1" disabled selected>
          What is your secondary source of food?
          </option>
          <option value="1">Carbs</option>
          <option value="0">Protein</option>
          <option value="2">Fats</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setWater(e.target.value)}
        >
          <option value="-1" disabled selected>
          Glasses of water per day
          </option>
          <option value="0">1-3</option>
          <option value="2">4-7</option>
          <option value="3">8-10</option>
          <option value="1">11-14</option>
          <option value="4">15 or more</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setFruit(e.target.value)}
        >
          <option value="-1" disabled selected>
          How often do you eat fruit?
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setVegetables(e.target.value)}
        >
          <option value="-1" disabled selected>
          How often do you eat vegetables?
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>:
      null
    }

      <div className="getInfoContainer">
        <h1>Goals</h1>
      <div className="checks">
          What are your goals?
          <input
          className="checkbox"
          type="checkbox"
          id="weight"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserTrainingGoalWight("1"):setUserTrainingGoalWight("0")}
        ></input>
        <label for="weight">Loosing weight</label>
        <input
          className="checkbox"
          type="checkbox"
          id="mass"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserTrainingGoalMuscle("1"):setUserTrainingGoalMuscle("0")}
        ></input>
        <label for="mass">Increasing muscle mass</label>
        <input
          className="checkbox"
          type="checkbox"
          id="def"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1? setUserTrainingGoalDef("1"):setUserTrainingGoalDef("0")}
        ></input>
        <label for="def">Muscle definition</label>
        <input
          className="checkbox"
          type="checkbox"
          id="healthgoal"
          autoComplete="off"
          onChange={(e) =>  e.target.value  == 1?setUserTrainingGoalHealth("1"):setUserTrainingGoalHealth("0")}
        ></input>
        <label for="healthgoal">Overall Health</label>
        </div>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTimeAvailability(e.target.value)}
        >
          <option value="" disabled selected>
            Time Available
          </option>
          <option value="0">Less than 1 hour</option>
          <option value="1">1-2 hours</option>
          <option value="3">3-4 hours</option>
          <option value="4">More than 4 hours</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserExperienceStrength(e.target.value)}
        >
          <option value="" disabled selected>
            Experience in Strength Excercises
          </option>
          <option value="1">No</option>
          <option value="0">Yes</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserExperienceCardio(e.target.value)}
        >
          <option value="" disabled selected>
          Experience in Cardiovascular Excercises
          </option>
          <option value="1">No</option>
          <option value="0">Yes</option>
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
          onChange={(e) => setUserTrainingIntensity(e.target.value)}
        >
          <option value="" disabled selected>
            Preferred Excercise Intensity
          </option>
          <option value="1">Low</option>
          <option value="0">Medium</option>
          <option value="2">High</option>
        </select>
        <select
          className="inputStyle"
          id="selectGetUser"
          onChange={(e) => setUserTrainingPreference(e.target.value)}
        >
          <option value="" disabled selected>
            Preferred Area of Training
          </option>
          <option value="1">Body In general</option>
          <option value="2">Chest</option>
          <option value="3">Abs</option>
          <option value="4">Legs</option>
          <option value="5">Back</option>
          <option value="6">Arms</option>
        </select>
        <button className="buttonStyle" onClick={getExcerciseRecommendation}>
          Save Data
        </button>
      </div>

      <div className="getInfoContainer">
        <p className="textStyle">
          Dificultad recomendada: {predictedDifficulty}
        </p>
      </div>

      <div className="getInfoContainer">
        {calories.length === 0 ? (
          <button className="buttonStyle" onClick={getCalories}>
            Calculate Calories
          </button>
        ) : (
          <p className="textStyle">Calories: {calories}</p>
        )}
      </div>
      <div className="medium-sep" />
    </div>
  );
}
