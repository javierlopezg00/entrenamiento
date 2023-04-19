// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::process::{Command, CommandEvent};

#[tauri::command]
async fn determine_user_experience(
    prediction: String,
    age: f32,
    height: f32,
    weight: f32,
    fitness: i32,
    health: i32,
    eating_habits: i32,
    fruit_consumption: i32,
    veggies_consumption: i32,
    gender: String,
    training_days: String,
    training_hours: String,
    constant_training: String,
    focus: String,
    efficacy: String,
    sleep_hours: String,
    energy_src1: String,
    energy_src2: String,
    water_consumption: String,
    training_objective: String,
    time_available: String,
    strength_exp: String,
    cardio_exp: String,
    gym_access: String,
    preferred_area: String,
    intensity: String,
    physical_activities: String,
    training_areas: String,
    product_consumption: String,
) -> Result<String, String> {
    // Prediction
    let exp_prediction;

    if fitness == -1 {
        exp_prediction = "Principiante".to_string();
    } else if constant_training == "3-4 años"
        || constant_training == "5-6 años"
        || constant_training == "más de 7 años"
    {
        exp_prediction = "Avanzado".to_string();
    } else {
        exp_prediction = "Intermedio".to_string()
    }

    println!("Prediction: {}", exp_prediction);

    // Create the command
    let sidecar = Command::new_sidecar("training").expect("Failed to spawn sidecar");
    let mut cmd_args_str = String::new();

    // List-type parameters
    let training_objective_list = training_objective.split(',').collect::<Vec<&str>>();
    let training_areas_list = training_areas.split(',').collect::<Vec<&str>>();
    let product_consumption_list = product_consumption.split(',').collect::<Vec<&str>>();

    // Append all the arguments to the command string
    cmd_args_str.push_str(format!("--prediction \"{}\" ", prediction).as_str());
    cmd_args_str.push_str(format!("--age {} ", age).as_str());
    cmd_args_str.push_str(format!("--height {} ", height).as_str());
    cmd_args_str.push_str(format!("--weight {} ", weight).as_str());
    cmd_args_str.push_str(format!("--fitness {} ", fitness).as_str());
    cmd_args_str.push_str(format!("--health {} ", health).as_str());
    cmd_args_str.push_str(format!("--eating_habits {} ", eating_habits).as_str());
    cmd_args_str.push_str(format!("--fruit_consumption {} ", fruit_consumption).as_str());
    cmd_args_str.push_str(format!("--veggies_consumption {} ", veggies_consumption).as_str());
    cmd_args_str.push_str(format!("--gender \"{}\" ", gender).as_str());
    cmd_args_str.push_str(format!("--training_days \"{}\" ", training_days).as_str());
    cmd_args_str.push_str(format!("--training_hours \"{}\" ", training_hours).as_str());
    cmd_args_str.push_str(format!("--constant_training \"{}\" ", constant_training).as_str());
    cmd_args_str.push_str(format!("--focus \"{}\" ", focus).as_str());
    cmd_args_str.push_str(format!("--efficacy \"{}\" ", efficacy).as_str());
    cmd_args_str.push_str(format!("--sleep_hours \"{}\" ", sleep_hours).as_str());
    cmd_args_str.push_str(format!("--energy_src1 \"{}\" ", energy_src1).as_str());
    cmd_args_str.push_str(format!("--energy_src2 \"{}\" ", energy_src2).as_str());
    cmd_args_str.push_str(format!("--water_consumption \"{}\" ", water_consumption).as_str());

    cmd_args_str.push_str("--training_objective ");
    for i in 0..training_objective_list.len() {
        cmd_args_str.push_str(format!("\"{}\" ", training_objective_list[i]).as_str());
    }

    cmd_args_str.push_str(format!("--time_available \"{}\" ", time_available).as_str());
    cmd_args_str.push_str(format!("--strength_exp \"{}\" ", strength_exp).as_str());
    cmd_args_str.push_str(format!("--cardio_exp \"{}\" ", cardio_exp).as_str());
    cmd_args_str.push_str(format!("--gym_access \"{}\" ", gym_access).as_str());
    cmd_args_str.push_str(format!("--preferred_area \"{}\" ", preferred_area).as_str());
    cmd_args_str.push_str(format!("--intensity \"{}\" ", intensity).as_str());
    cmd_args_str.push_str(format!("--physical_activities \"{}\" ", physical_activities).as_str());

    cmd_args_str.push_str("--training_areas ");
    for i in 0..training_areas_list.len() {
        cmd_args_str.push_str(format!("\"{}\" ", training_areas_list[i]).as_str());
    }

    cmd_args_str.push_str("--product_consumption ");
    for i in 0..product_consumption_list.len() {
        cmd_args_str.push_str(format!("\"{}\" ", product_consumption_list[i]).as_str());
    }

    // Trim the string to remove the trailing space
    cmd_args_str = cmd_args_str.trim().to_string();

    // Add the arguments to the command and spawn it
    let sidecar = sidecar.args(cmd_args_str.split_whitespace());
    let (mut rx, child) = sidecar.spawn().expect("Failed to spawn sidecar");
    drop(child);

    // Read the output from the child process
    let mut output = String::new();
    while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
            output.push_str(&line);
        } else if let CommandEvent::Stderr(line) = event {
            output.push_str(format!("Error: {}", line).as_str());
        }
    }

    println!("{}", output);
    Ok(exp_prediction)
}

#[tauri::command]
async fn get_calories(
    age: f32,
    height: f32,
    weight: f32,
    days: i32,
    hours: i32,
    gender: i32,
) -> Result<String, String> {
    // Activity factor
    let mut factor = 1.2;
    if days == 1 {
        factor = 1.375;
    } else if days == 2 {
        factor = 1.55;
    } else if days == 3 {
        factor = 1.725;
    } else if days == 4 {
        factor = 1.9;
    }

    // Calories
    let consumption;
    if gender == 0 {
        consumption = (655.0 + (9.6 * weight / 2.2)) + (1.8 * height * 2.54) - (4.7 * age) * factor;
    } else {
        consumption = (66.0 + (13.7 * weight / 2.2)) + (5.0 * height * 2.54) - (6.8 * age) * factor;
    }

    // Create the command
    let sidecar = Command::new_sidecar("calories").expect("Failed to spawn sidecar");
    let mut cmd_args_str = String::new();

    // Append all the arguments to the command string
    cmd_args_str.push_str(format!("--age {} ", age).as_str());
    cmd_args_str.push_str(format!("--height {} ", height).as_str());
    cmd_args_str.push_str(format!("--weight {} ", weight).as_str());
    cmd_args_str.push_str(format!("--days {} ", days).as_str());
    cmd_args_str.push_str(format!("--hours {} ", hours).as_str());
    cmd_args_str.push_str(format!("--gender {} ", gender).as_str());

    // Trim the string to remove the trailing space
    cmd_args_str = cmd_args_str.trim().to_string();

    // Add the arguments to the command and spawn it
    let sidecar = sidecar.args(cmd_args_str.split_whitespace());
    let (mut rx, child) = sidecar.spawn().expect("Failed to spawn sidecar");
    drop(child);

    // Read the output from the child process
    let mut output = String::new();
    while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
            output.push_str(&line);
        } else if let CommandEvent::Stderr(line) = event {
            output.push_str(format!("Error: {}", line).as_str());
        }
    }

    println!("Calorías: {}", output);

    Ok(consumption.to_string())
}

fn main() {
    std::env::set_var("RUST_BACKTRACE", "full"); // Enable backtraces for debugging

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            determine_user_experience,
            get_calories
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
