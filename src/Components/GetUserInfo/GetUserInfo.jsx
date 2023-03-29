import './GetUserInfo.scss'

export default function GetUserInfo(){
    return(
        <div className='mainInfoContainer'>
            <div className="getInfoContainer">
                <h1>Personal information</h1>
                <input type="text" className='inputStyle' placeholder='Age' id='inputGetUser'></input>
                <input type="text" className='inputStyle' placeholder='Height' id='inputGetUser'></input>
                <input type="text" className='inputStyle' placeholder='Weight' id='inputGetUser'></input>
                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Genero</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </select>
                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Acceso al gimnasio</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Experiencia en ejercicios de fuerza</option>
                        <option value="0">No</option>
                        <option value="1">Si</option>
                    </select>
                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Experiencia en ejercicios cariovasculares</option>
                        <option value="0">No</option>
                        <option value="1">Si</option>
                    </select>
                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Disponibilidad de tiempo</option>
                        <option value="0">30 min</option>
                        <option value="1">45 min</option>
                        <option value="2">1 hora</option>
                        <option value="3">1.5 horas</option>
                        <option value="4">2 horas</option>
                        <option value="5">2.5 horas</option>
                        <option value="6">3 horas</option>
                    </select>
                    <select className='inputStyle' id="selectGetUser">
                        <option className='option' value="" disabled selected>Motivo de entrenamieto</option>
                        <option value="0">Perdida de Peso</option>
                        <option value="1">Aumento de masa muscular</option>
                        <option value="2">Definicion muscular</option>
                        <option value="3">Salud en general</option>
                    </select>

                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Preferencia de entrenamiento </option>
                        <option value="0">Brazos</option>
                        <option value="1">Abdomen</option>
                        <option value="2">Piernas</option>
                        <option value="3">Pecho</option>
                        <option value="4">Espalda</option>
                        <option value="5">Cuerpo en general</option>
                    </select>

                    <select className='inputStyle' id="selectGetUser">
                        <option value="" disabled selected>Intensidad de entrenamiento</option>
                        <option value="0">Leve</option>
                        <option value="1">Intermedio</option>
                        <option value="2">Intenso</option>
                    </select>


                    <button className='buttonStyle'>Guardar informacion</button>
            
            </div>
            
        </div>
        
    );
}