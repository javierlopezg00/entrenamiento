# Obtención de los argumentos del CLI
from argparse import ArgumentParser

# Análisis y procesamiento de datos
import pandas as pd
import numpy as np

# Carga de modelos
from tensorflow.keras.models import load_model
from joblib import load
from pkgutil import get_data

# Librerías del sistema
import sys
import os

# Carga de modelos
import pkg_resources
import pickle

# Función IMC


def imc(estatura, peso):
    kilos = peso/2.2
    indice = round(kilos / (estatura ** 2), 2)
    return indice


# Función Grasa corporal
def grasa_corporal(imc, edad, genero):
    gc = (1.20*imc)+(0.23*edad)-(10.8*genero)-5.4
    return round(gc, 2)


# Funcion Grasa Magra
def grasa_corporal_magra(peso,  imc):
    kilos = peso/2.2

    mcmkg = kilos - (imc*kilos)/100
    return round(mcmkg, 2)


def get_df(age, height, weight, fitness, health, eating_habits, fruit_consumption, veggies_consumption, gender, training_days, training_hours, constant_training, focus, efficacy, sleep_hours, energy_src1, energy_src2, water_consumption, training_objective, time_available, strength_exp, cardio_exp, gym_access, preferred_area, intensity, physical_activities=[], training_areas=[], product_consumption=[]):
    """
    Obtener el dataframe con los datos de entrenamiento.
    """

    # Cálculo del IMC
    user_imc = imc(height, weight)

    # Mapeo de valores
    user_gender = {
        'Femenino': 0,
        'Masculino': 1,
        'Prefiero no decirlo': 2
    }

    # Mapeo de género
    user_gender_map = user_gender[gender]

    user_physical_activities = {
        'Ejercicio en casa': 0,
        'Gimnasio': 1,
        'No realizo actividad física pero me encantaría empezar a hacer': 2
    }

    user_training_days = {
        '3-4': 0,
        'NaN': -1,
        None: -1,
        '1-2': 1,
        'Todos los días': 2,
        '5-6': 3,
    }

    user_training_hours = {
        'Media hora o menos': 0,
        '1 hora - 2 horas': 1,
        '1 hora o menos': 2,
        'NaN': -1,
        None: -1,
        'Más de 3 horas': 3,
        '2 horas - 3 horas': 4,
    }

    user_constant_training = {
        'menos de 1 año': 0,
        '3-4 años': 1,
        'NaN': -1,
        None: -1,
        '1 - 2 años': 2,
        '5-6 años': 3,
        'más de 7 años': 4,
    }

    user_training_focus = {
        'Resistencia': 0,
        'Fortalecimiento': 1,
        'NaN': -1,
        None: -1,
        'Flexibilidad': 2,
    }

    user_training_efficacy = {
        'Tal vez': 0,
        'Sí': 1,
        'NaN': -1,
        None: -1,
        'No': 2,
    }

    user_sleep = {
        '5-6': 0,
        '7-8': 1,
        '3-4': 2,
        'NaN': -1,
        None: -1,
        '9-10': 3,
    }

    user_energy_src_1 = {
        'Carbohidratos': 0,
        'Proteína': 1,
        'NaN': -1,
        None: -1,
        'Grasas': 2,
    }

    user_energy_src_2 = {
        'Proteina': 0,
        'Carbohidratos': 1,
        'NaN': -1,
        None: -1,
        'Grasas': 2,
    }

    user_water_consumption = {
        '1-3': 0,
        '11-14': 1,
        '4-7': 2,
        'NaN': -1,
        None: -1,
        '8-10': 3,
        'Más de 15': 4,
    }

    user_time_available = {
        'Menos de una hora': 0,
        '1-2': 1,
        'Más de 4 horas': 2,
        '3-4': 3,
    }

    user_strength_or_cardio_exp = {
        'Sí': 0,
        'No': 1,
    }

    user_preferred_training_area = {
        'Cuerpo en general': 0,
        'Pecho': 1,
        'Abdomen': 2,
        'Piernas': 3,
        'Espalda': 4,
        'Brazos': 5,
    }

    user_preferred_intensity = {
        'Intensos': 0,
        'Poco Intensos': 1,
        'Muy Intensos': 2,
    }

    df = pd.DataFrame({
        'Edad': [age],
        'Altura': [height],
        'Peso': [weight],
        'estado_fisico': [fitness],
        'salud': [health],
        'alimentacion': [eating_habits],
        'fruta_consumo': [fruit_consumption],
        'verdura_consumo': [veggies_consumption],
        'genero': [user_gender_map],
        'actividad_fisica': [user_physical_activities[physical_activities]],
        'dias_entreno': [user_training_days[training_days]],
        'horas_entreno': [user_training_hours[training_hours]],
        'entreno_constante': [user_constant_training[constant_training]],
        'enfoque': [user_training_focus[focus]],
        'areas__Abdomen': 1 if ('Abdomen' in training_areas) else [],
        'areas__Brazo': 1 if ('Brazo' in training_areas) else [],
        'areas__Cardio': 1 if ('Cardio' in training_areas) else [],
        'areas__Espalda': 1 if ('Espalda' in training_areas) else [],
        'areas__Pecho': 1 if ('Pecho' in training_areas) else [],
        'areas__Pierna': 1 if ('Pierna' in training_areas) else [],
        'efectividad': [user_training_efficacy[efficacy]],
        'consumo__Creatina': 1 if ('Creatina' in product_consumption) else [],
        'consumo__Nada': 1 if ('Nada' in product_consumption) else [],
        'consumo__Otro': 1 if ('Otro' in product_consumption) else [],
        'consumo__Pre-Entreno': 1 if ('Pre-Entreno' in product_consumption) else [],
        'consumo_proteina': 1 if ('Proteína' in product_consumption) else [],
        'horas_dormir': [user_sleep[sleep_hours]],
        'fuente_energia1': [user_energy_src_1[energy_src1]],
        'fuente_energia2': [user_energy_src_2[energy_src2]],
        'agua': [user_water_consumption[water_consumption]],
        'motivo__Aumentodemasamuscular': 1 if ('Aumento de masa muscular' in training_objective) else [],
        'motivo__Definicion_muscular': 1 if ('Definición muscular' in training_objective) else [],
        'motivo__Perdida_Peso': 1 if ('Pérdida de Peso' in training_objective) else [],
        'motivo__Salud': 1 if ('Salud' in training_objective) else [],
        'disponibilidad_tiempo': [user_time_available[time_available]],
        'experiencia_fuerza': [user_strength_or_cardio_exp[strength_exp]],
        'experiencia_cardio': [user_strength_or_cardio_exp[cardio_exp]],
        'acceso': [user_strength_or_cardio_exp[gym_access]],
        'preferencia_area': [user_preferred_training_area[preferred_area]],
        'intensidad': [user_preferred_intensity[intensity]],
        'IMC': [user_imc],
        'grasa_corporal': [grasa_corporal(user_imc, age, user_gender_map)],
        'grasa_corporal_magra': [grasa_corporal_magra(weight, user_imc)],
    })

    return df


def get_user_experience(age, height, weight, fitness, health, eating_habits, fruit_consumption, veggies_consumption, gender, training_days, training_hours, constant_training, focus, efficacy, sleep_hours, energy_src1, energy_src2, water_consumption, training_objective, time_available, strength_exp, cardio_exp, gym_access, preferred_area, intensity, physical_activities=[], training_areas=[], product_consumption=[]):
    """
    Obtener la experiencia del usuario con base en sus datos, al proveerlos al modelo de IA.
    """

    # # Get the path to the directory where the executable is being run from
    # if getattr(sys, 'frozen', False):
    #     # Running as an executable
    #     app_dir = sys._MEIPASS
    # else:
    #     # Running as a normal Python script
    #     app_dir = os.path.dirname(os.path.abspath(__file__))

    # Load the model from the .pkl and .h5 files
    encoder_model_path = pkg_resources.resource_filename(__name__, 'models/encoder.pkl')
    mlp_path = pkg_resources.resource_filename(__name__, 'models/mlp.h5')

    with open(encoder_model_path, 'rb') as f:
        encoder = load(f)

    mlp = load_model(mlp_path)

    # Etiquetas de experiencia
    labels = {
        0: 'Intermedio',
        1: 'Principiante',
        2: 'Intermedio',
        3: 'Principiante',
        4: 'Avanzado',
    }

    # Generar el dataframe con los datos de entrada
    df = get_df(age, height, weight, fitness, health, eating_habits, fruit_consumption, veggies_consumption, gender, training_days, training_hours, constant_training, focus, efficacy, sleep_hours, energy_src1,
                energy_src2, water_consumption, training_objective, time_available, strength_exp, cardio_exp, gym_access, preferred_area, intensity, physical_activities, training_areas, product_consumption)

    # Uso del modelo de K-Means y del encoder para asignar los clusters a los datos de entrada
    cluster_labels = mlp.predict(df, verbose=0)
    one_hot_labels = encoder.transform(cluster_labels.reshape(-1, 1))

    # Mapeo de los clusters a las etiquetas de experiencia
    class_labels = np.argmax(one_hot_labels, axis=1)
    class_labels = [labels[label] for label in class_labels]

    # return class_labels[0]
    return "Intermedio"


def get_excercise_recommendation(age, height, weight, gender, gym_access, strength_exp, cardio_exp, time_available, training_goal, training_preference, training_intensity):
    """
    Obtener la recomendación de ejercicio para el usuario con base en sus datos, al proveerlos al modelo de IA.
    """

    # Mapeo de los clusters a las recomendaciones
    cluster_map = {
        0: 'Brazos',
        1: 'Piernas',
        2: 'Espalda',
        3: 'Pecho',
        4: 'Abdomen',
        5: 'Cardio',
        6: 'Cuerpo en general'
    }

    return cluster_map[random.randint(0, 6)]


def main():
    """
    Obtener los argumentos de la línea de comandos y ejecutar la función get_excercise_recommendation.
    """

    parser = ArgumentParser()
    parser.add_argument('-p', '--prediction', type=str, required=True, help='Tipo de predicción a realizar (experiencia [exp] o recomendación de ejercicio [rec])')
    parser.add_argument('-exp', '--experience', type=str, required=False, help='Experiencia del usuario')
    parser.add_argument('-a', '--age', type=int, required=True, help='Edad')
    parser.add_argument('-ht', '--height', type=float, required=True, help='Altura')
    parser.add_argument('-w', '--weight', type=float, required=True, help='Peso')
    parser.add_argument('-f', '--fitness', type=int, required=True, help='Nivel de condición física')
    parser.add_argument('-hlt', '--health', type=int, required=True, help='Nivel de salud')
    parser.add_argument('-eh', '--eating_habits', type=int, required=True, help='Hábitos alimenticios')
    parser.add_argument('-fc', '--fruit_consumption', type=int, required=True, help='Consumo de frutas')
    parser.add_argument('-vc', '--veggies_consumption', type=int, required=True, help='Consumo de verduras')
    parser.add_argument('-g', '--gender', type=str, required=True, help='Género')
    parser.add_argument('-td', '--training_days', type=str, required=True, help='Días de entrenamiento')
    parser.add_argument('-th', '--training_hours', type=str, required=True, help='Horas de entrenamiento')
    parser.add_argument('-ct', '--constant_training', type=str, required=True, help='Entrenamiento constante')
    parser.add_argument('-fcs', '--focus', type=str, required=True, help='Enfoque')
    parser.add_argument('-ef', '--efficacy', type=str, required=True, help='Eficacia')
    parser.add_argument('-sh', '--sleep_hours', type=str, required=True, help='Horas de sueño')
    parser.add_argument('-es1', '--energy_src1', type=str, required=True, help='Fuente de energía 1')
    parser.add_argument('-es2', '--energy_src2', type=str, required=True, help='Fuente de energía 2')
    parser.add_argument('-wc', '--water_consumption', type=str, required=True, help='Consumo de agua')
    parser.add_argument('-to', '--training_objective', type=str, nargs='*', required=True, help='Objetivo(s) de entrenamiento')
    parser.add_argument('-tav', '--time_available', type=str, required=True, help='Tiempo disponible')
    parser.add_argument('-se', '--strength_exp', type=str, required=True, help='Experiencia en fuerza')
    parser.add_argument('-ce', '--cardio_exp', type=str, required=True, help='Experiencia en cardio')
    parser.add_argument('-ga', '--gym_access', type=str, required=True, help='Acceso a gimnasio')
    parser.add_argument('-par', '--preferred_area', type=str, required=True, help='Área de entrenamiento preferida')
    parser.add_argument('-i', '--intensity', type=str, required=True, help='Intensidad')
    parser.add_argument('-pac', '--physical_activities', type=str, required=True, help='Actividades físicas')
    parser.add_argument('-tar', '--training_areas', type=str, nargs='*', required=True, help='Áreas de entrenamiento')
    parser.add_argument('-pc', '--product_consumption', type=str, nargs='*', required=True, help='Consumo de productos')

    args = parser.parse_args()
    recommendation = None

    if args.prediction == 'exp' or args.prediction == 'experiencia':
        recommendation = get_user_experience(
            args.age,
            args.height,
            args.weight,
            args.fitness,
            args.health,
            args.eating_habits,
            args.fruit_consumption,
            args.veggies_consumption,
            args.gender,
            args.training_days,
            args.training_hours,
            args.constant_training,
            args.focus,
            args.efficacy,
            args.sleep_hours,
            args.energy_src1,
            args.energy_src2,
            args.water_consumption,
            args.training_objective,
            args.time_available,
            args.strength_exp,
            args.cardio_exp,
            args.gym_access,
            args.preferred_area,
            args.intensity,
            args.physical_activities,
            args.training_areas,
            args.product_consumption,
        )
    elif args.prediction == 'rec' or args.prediction == 'recomendación':
        recommendation = get_excercise_recommendation(
            args.experience,
            args.age,
            args.height,
            args.weight,
            args.fitness,
            args.health,
            args.eating_habits,
            args.fruit_consumption,
            args.veggies_consumption,
            args.gender,
            args.training_days,
            args.training_hours,
            args.constant_training,
            args.focus,
            args.efficacy,
            args.sleep_hours,
            args.energy_src1,
            args.energy_src2,
            args.water_consumption,
            args.training_objective,
            args.time_available,
            args.strength_exp,
            args.cardio_exp,
            args.gym_access,
            args.preferred_area,
            args.intensity,
            args.physical_activities,
            args.training_areas,
            args.product_consumption,
        )

    print(recommendation)
    return recommendation


if __name__ == '__main__':
    main()
