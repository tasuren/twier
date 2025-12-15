#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env, process::Command};

use tauri::{command, generate_context, generate_handler, Builder};

mod injector;

/// The user agent to behave normal browser.
#[cfg(target_os = "macos")]
const USER_AGENT: &str = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

/// To open directory. The reason this necessary is this: https://github.com/tauri-apps/tauri/issues/5893
#[command]
async fn open_directory(path: String) {
    #[cfg(target_os = "windows")]
    let command_name = "explorer";
    #[cfg(target_os = "macos")]
    let command_name = "open";
    #[cfg(target_os = "linux")]
    let command_name = "xdg-open";

    _ = tauri::async_runtime::spawn_blocking(move || {
        _ = Command::new(command_name)
            .arg(path)
            .spawn()
            .expect("Failed to open folder")
            .wait();
    })
    .await;
}

/// Just printing to debug.
#[command]
fn print(text: String) {
    println!("{}", text);
}

fn main() {
    Builder::default()
        .invoke_handler(generate_handler![print, open_directory])
        .on_page_load(|webview, _| {
            injector::inject(webview);

            if env::var("DEVTOOLS")
                .ok()
                .map(|v| !v.is_empty())
                .unwrap_or(false)
            {
                webview.open_devtools();
            }
        })
        .run({
            #[cfg(target_os = "macos")]
            {
                let mut ctx = generate_context!();
                for window in ctx.config_mut().app.windows.iter_mut() {
                    window.user_agent = Some(USER_AGENT.to_string());
                }
                ctx
            }
            #[cfg(not(target_os = "macos"))]
            generate_context!()
        })
        .expect("error while running tauri application");
}
