#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

use tauri::{command, generate_context, generate_handler, Builder};

/// The user agent to behave normal browser.
#[cfg(target_os = "macos")]
const USER_AGENT: &str = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

/// Just printing to debug.
#[command]
fn print(text: String) {
    println!("{}", text);
}

fn main() {
    Builder::default()
        .invoke_handler(generate_handler![print])
        .on_page_load(|window, _| {
            // Inject the script to modify x web page.
            #[cfg(debug_assertions)]
            window
                .eval(&std::fs::read_to_string("../dist/main.js").unwrap())
                .unwrap();
            #[cfg(not(debug_assertions))]
            window.eval(include_str!("../../dist/main.js")).unwrap();

            if env::var("DEVTOOLS")
                .ok()
                .map(|v| !v.is_empty())
                .unwrap_or(false)
            {
                window.open_devtools();
            }
        })
        .run({
            #[cfg(target_os = "macos")]
            {
                let mut ctx = generate_context!();
                for window in ctx.config_mut().tauri.windows.iter_mut() {
                    window.user_agent = Some(USER_AGENT.to_string());
                }
                ctx
            }
            #[cfg(not(target_os = "macos"))]
            generate_context!()
        })
        .expect("error while running tauri application");
}
