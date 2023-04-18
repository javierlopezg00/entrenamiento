# Obtención de los argumentos del CLI
from argparse import ArgumentParser

# Análisis y procesamiento de datos
import pandas as pd
import numpy as np

# Visualización de datos
import matplotlib.pyplot as plt
import seaborn as sns

# Modelos de aprendizaje
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
#from sklearn.preprocessing import MinMaxScaler

# Métricas
from sklearn import metrics

df = pd.read_csv(
    "https://raw.githubusercontent.com/javierlopezg00/entrenamiento/main/src-tauri/src/model/dataLimpia.csv")

df = df[["Edad", "Altura", "Peso", "dias_entreno", "horas_entreno", "genero"]]

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

#Añadir columna de factor de actividad
df = df.assign(factor_actividad=df.apply(lambda row: factor_actividad(row['dias_entreno'], row['horas_entreno']), axis=1))


#Calcular calorías diarias recomendadas
def calorias (edad, genero, peso, altura, factor_actividad):
    consumo = 0
    if(genero == 0):
        consumo = (655 + (9.6 * peso/2.2))  +  ((1.8 * altura*100) - (4.7 * edad)) * factor_actividad
    else:
        consumo = (66 + (13.7 * peso/2.2))  +  ((5 * altura*100) - (6.8 * edad)) * factor_actividad
    return round(consumo,2)

#Añadir columna de consumo de calorías 
df = df.assign(calorias_consumo=df.apply(lambda row: calorias(row['Edad'], row['genero'], row['Peso'], row['Altura'], row['factor_actividad']), axis=1))


#Separar test y train
x = df[["Edad", "Altura", "Peso", "dias_entreno", "horas_entreno", "genero", "factor_actividad"]]
y = df[["calorias_consumo"]]

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

modelo = LinearRegression().fit(x_train, y_train)

prediccion_test = modelo.predict(x_test)

def predict_calories(age, height, weight, gender, days, hours):
    input_data = pd.DataFrame({
        'Edad': [age],
        'Altura': [height],
        'Peso': [weight],
        'dias_entreno': [days],
        'horas_entreno': [hours],
        'genero': [gender],
        'factor_actividad': [factor_actividad(days, hours)]
    })

    recommendation = modelo.predict(
        input_data
    )

    return round(recommendation[0][0],2)


def main():
    """
    Obtener los argumentos de la línea de comandos y ejecutar la función get_excercise_recommendation.
    """

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