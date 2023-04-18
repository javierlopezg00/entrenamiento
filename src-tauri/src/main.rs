// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::process::{Command, CommandEvent};

// fn write_arg_to_car(mut child: CommandChild, arg_name: &str, arg: &str) {
//     child
//         .write(format!("--{}={}\n", arg_name, arg).as_bytes())
//         .unwrap();
// }

#[tauri::command]
async fn get_excercise_recommendation(
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
) -> Result<String, String> {
    // Create the command
    let sidecar = Command::new_sidecar("training").expect("Failed to spawn sidecar");
    let mut cmd_args_str = String::new();

    // Append all the arguments to the command string
    cmd_args_str.push_str(format!("--age={} ", age).as_str());
    cmd_args_str.push_str(format!("--height={} ", height).as_str());
    cmd_args_str.push_str(format!("--weight={} ", weight).as_str());
    cmd_args_str.push_str(format!("--gender=\"{}\" ", gender).as_str());
    cmd_args_str.push_str(format!("--gymAccess=\"{}\" ", gym_access).as_str());
    cmd_args_str.push_str(format!("--strengthExp=\"{}\" ", strength_exp).as_str());
    cmd_args_str.push_str(format!("--cardioExp=\"{}\" ", cardio_exp).as_str());
    cmd_args_str.push_str(format!("--timeAvailable=\"{}\" ", time_available).as_str());
    cmd_args_str.push_str(format!("--trainingGoal=\"{}\" ", training_goal).as_str());
    cmd_args_str.push_str(format!("--trainingPreference=\"{}\" ", training_preference).as_str());
    cmd_args_str.push_str(format!("--trainingIntensity=\"{}\"", training_intensity).as_str());

    // Add the arguments to the command and spawn it
    let sidecar = sidecar.args(cmd_args_str.split_whitespace());
    let (mut rx, child) = sidecar.spawn().expect("Failed to spawn sidecar");
    drop(child);

    // Read the output from the child process
    let mut output = String::new();
    while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
            output.push_str(&line);
        }

        // if let CommandEvent::Stderr(line) = event {
        //     output.push_str(&line);
        // }
    }

    Ok(output)
}

fn main() {
    std::env::set_var("RUST_BACKTRACE", "full"); // Enable backtraces for debugging

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_excercise_recommendation])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
