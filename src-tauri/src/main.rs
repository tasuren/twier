#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{ Builder, generate_context, generate_handler, command };


/// Just printing to debug.
#[command]
fn print(text: String) { println!("{}", text); }


fn main() {
    Builder::default()
        .invoke_handler(generate_handler![print])
        .on_page_load(|window, _| {
            #[cfg(debug_assertions)]
            window.eval(&std::fs::read_to_string
                ("../dist/main.js").unwrap()).unwrap();
            #[cfg(not(debug_assertions))]
            window.eval(include_str!
                ("../../dist/main.js")).unwrap();
        })
        .run(generate_context!())
        .expect("error while running tauri application");
}