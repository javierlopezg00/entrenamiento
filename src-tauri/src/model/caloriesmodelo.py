# Obtención de los argumentos del CLI
from argparse import ArgumentParser

# Análisis y procesamiento de datos
import pandas as pd
import numpy as np

# Modelos de aprendizaje
from sklearn.linear_model import LinearRegression

# Carga del modelo
from pickle import load

#Calcular Factor de Actividad
def factor_actividad(dias, horas):
    #si no entrena
    factor = 1.2
    if(dias == 1):
        #Si entrena 1-2 veces por semana
        factor = 1.375
    elif(dias == 0):
        #Si entrena 3-4 veces por semana
        factor = 1.55
    elif(dias == 3 or (dias == 2 and horas != 3)):
        #Si entrena 5-7 veces por semana
        factor = 1.725
    elif(dias == 3 or (dias == 2 and horas == 3)):
        #Si entrena más de 4 horas al día de 5-7 a veces por semana
        factor = 1.9
    return factor


def get_df(age, height, weight, days, hours, gender):
    return pd.DataFrame({
        'Edad': [age],
        'Altura': [height],
        'Peso': [weight],
        'dias_entreno': [days],
        'horas_entreno': [hours],
        'genero': [gender],
        'factor_actividad': [factor_actividad(days, hours)]
    })

def main():
    """
    Obtener los argumentos de la línea de comandos y ejecutar la función get_excercise_recommendation.
    """

    model_path = pkg_resources.resource_filename(__name__, 'models/linear_reg.pkl')
    modelo = load(open(model_path, 'rb'))

    parser = ArgumentParser()
    parser.add_argument('-a', '--age', type=int, required=True, help='Edad')
    parser.add_argument('-ht', '--height', type=float, required=True, help='Altura')
    parser.add_argument('-w', '--weight', type=float, required=True, help='Peso')
    parser.add_argument('-g', '--gender', type=int, required=True, help='Género')
    parser.add_argument('-td', '--days', type=int, required=True, help='Días Entrenamiento')
    parser.add_argument('-th', '--hours', type=int, required=True, help='Horas Entrenamiento')
    #parser.add_argument('-f', '--factor', type=float, required=True, help='Factor Actividad')
    args = parser.parse_args()

    input_data = pd.DataFrame({
        'Edad': [args.age],
        'Altura': [args.height],
        'Peso': [args.weight],
        'dias_entreno': [args.days],
        'horas_entreno': [args.hours],
        'genero': [args.gender],
        'factor_actividad': [factor_actividad(args.days, args.hours)]
    })

    recommendation = modelo.predict(
        input_data
    )

    print("Calorías recomendadas: ", round(recommendation[0][0],2))
    return round(recommendation[0][0],2)


if __name__ == '__main__':
    main()