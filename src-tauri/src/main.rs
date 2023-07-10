#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{ Builder, generate_handler, generate_context };


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn main() {
    Builder::default()
        .invoke_handler(generate_handler![greet])
        .on_page_load(|window, _| { window.eval(r#"
            //const TWEET_URL = "https://twitter.com/compose/tweet";
            import("http://localhost:1420/src/main.ts");
        "#).unwrap(); })
        .run(generate_context!())
        .expect("error while running tauri application");
}