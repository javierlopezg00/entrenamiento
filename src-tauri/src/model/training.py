# Obtención de los argumentos del CLI
from argparse import ArgumentParser

# Análisis y procesamiento de datos
import pandas as pd

# Preprocesamiento de datos
from sklearn.decomposition import PCA

# Modelos de aprendizaje
from sklearn.model_selection import train_test_split
from sklearn.cluster import KMeans
from sklearn.tree import DecisionTreeClassifier

# Carga de datos
df = pd.read_csv(
    "https://raw.githubusercontent.com/javierlopezg00/entrenamiento/main/src-tauri/src/model/dataLimpia.csv")

# Extracción y reducción de los atributos empleando PCA
pca = PCA(n_components=3)
pca.fit(df)
df_pca = pca.transform(df)
df_pca = pd.DataFrame(df_pca, columns=['PC1', 'PC2', 'PC3'])

# Definición de los datos de entrada
input_features = ['Edad', 'Altura', 'Peso', 'acceso',
                  'experiencia_cardio', 'experiencia_fuerza']
X = df[input_features]

# Separación de los datos de entrenamiento y prueba
X_train, X_test = train_test_split(X, test_size=0.2, random_state=42)

# Creación y entrenamiento del modelo
kmeans = KMeans(n_clusters=5, n_init=10, random_state=0).fit(  # type: ignore
    X_train)

# Uso del modelo de K-Means para asignar los clusters a los sets de datos de entrenamiento y prueba
train_clusters = kmeans.predict(X_train)
test_clusters = kmeans.predict(X_test)

# Uso de PCA para reducir la dimensionalidad de los datos en 3 dimensiones
pca = PCA(n_components=3, random_state=42)
train_pca = pca.fit_transform(X_train)
test_pca = pca.transform(X_test)

# Conversión de train_pca de valores continuos a valores discretos
new_train_pca = pd.DataFrame(train_pca, columns=['PC1', 'PC2', 'PC3'])
new_train_pca['cluster'] = train_clusters
new_train_pca['cluster'] = new_train_pca['cluster'].astype('category')
new_train_pca.head()

# Creación y entrenamiento del modelo de árbol de decisión con los clusters
# obtenidos por el modelo de K-Means
tree = DecisionTreeClassifier(random_state=42)
tree.fit(train_clusters.reshape(-1, 1),  # type: ignore
         new_train_pca['cluster'])


def get_excercise_recommendation(age, height, weight, gender, gym_access, strength_exp, cardio_exp, time_available, training_goal, training_preference, training_intensity):
    """
    Obtener la recomendación de ejercicio para el usuario con base en sus datos, al proveerlos al modelo de IA.
    """

    # Definición de los atributos de entrada
    input_features = ['Edad', 'Altura', 'Peso', 'acceso',
                      'experiencia_cardio', 'experiencia_fuerza']

    # Creación y entrenamiento del modelo de K-Means
    kmeans = KMeans(n_clusters=5, n_init=10, random_state=42)  # type: ignore
    kmeans.fit(df[input_features])

    # Uso del modelo de K-Means para asignar los clusters a los datos de entrada
    input_data = pd.DataFrame({
        'Edad': [age],
        'Altura': [height],
        'Peso': [weight],
        'acceso': [gym_access],
        'experiencia_cardio': [cardio_exp],
        'experiencia_fuerza': [strength_exp]
    })
    input_cluster = kmeans.predict(input_data)

    # Creación y entrenamiento del modelo de árbol de decisión con los clusters
    tree = DecisionTreeClassifier(random_state=42)
    tree.fit(train_clusters.reshape(-1, 1),  # type: ignore
             new_train_pca['cluster'])

    # Predicción de la recomendación
    recommendation = tree.predict(
        input_cluster.reshape(-1, 1))[0]  # type: ignore

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

    return cluster_map[recommendation]


def main():
    """
    Obtener los argumentos de la línea de comandos y ejecutar la función get_excercise_recommendation.
    """

    parser = ArgumentParser()
    parser.add_argument('-a', '--age', type=int, required=True, help='Edad')
    parser.add_argument('-ht', '--height', type=int,
                        required=True, help='Altura')
    parser.add_argument('-w', '--weight', type=int, required=True, help='Peso')
    parser.add_argument('-g', '--gender', type=str,
                        required=True, help='Género')
    parser.add_argument('-ga', '--gymAccess', type=bool,
                        required=True, help='Si cuenta con acceso a un gimnasio')
    parser.add_argument('-se', '--strengthExp', type=bool, required=True,
                        help='Si cuenta con experiencia en ejercicios de fuerza')
    parser.add_argument('-ce', '--cardioExp', type=bool, required=True,
                        help='Si cuenta con experiencia en ejercicios cardiovasculares')
    parser.add_argument('-ta', '--timeAvailable', type=str,
                        required=True, help='Tiempo disponible para ejercitarse')
    parser.add_argument('-tg', '--trainingGoal', type=str,
                        required=True, help='Meta del entrenamiento')
    parser.add_argument('-tp', '--trainingPreference', type=str,
                        required=True, help='Preferencia de entrenamiento')
    parser.add_argument('-ti', '--trainingIntensity', type=str,
                        required=True, help='Intensidad del entrenamiento')
    args = parser.parse_args()

    recommendation = get_excercise_recommendation(
        args.age,
        args.height,
        args.weight,
        args.gender,
        args.gymAccess,
        args.strengthExp,
        args.cardioExp,
        args.timeAvailable,
        args.trainingGoal,
        args.trainingPreference,
        args.trainingIntensity
    )

    print(recommendation)
    return recommendation


if __name__ == '__main__':
    main()
