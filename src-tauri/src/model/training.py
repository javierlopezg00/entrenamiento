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

# Extración y reducción de los atributos empleando PCA
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
