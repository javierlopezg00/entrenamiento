// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use pyo3::{Python, types::PyModule};

#[tauri::command]
fn get_excercise_recommendation(
    age: i16,
    height: f32,
    weight: f32,
    gender: String,
    gym_access: bool,
    strength_exp: bool,
    cardio_exp: bool,
    time_available: String,
    training_goal: String,
    training_preference: String,
    training_intensity: String,
) -> String {
    pyo3::prepare_freethreaded_python();

    let py_file = include_str!("./model/training.py");

    Python::with_gil(|py| {
        let py_module = PyModule::from_code(py, py_file, "training.py", "training").unwrap();
        let py_func = py_module.getattr("get_excercise_recommendation").unwrap();
        let py_result = py_func
            .call1((
                age,
                height,
                weight,
                gender,
                gym_access,
                strength_exp,
                cardio_exp,
                time_available,
                training_goal,
                training_preference,
                training_intensity,
            ))
            .unwrap();
        let result: String = py_result.extract().unwrap();

        result
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_excercise_recommendation])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
