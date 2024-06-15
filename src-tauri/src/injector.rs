macro_rules! load_script {
    ($path:literal) => {{
        #[cfg(debug_assertions)]
        let script = std::fs::read_to_string($path).unwrap();
        #[cfg(not(debug_assertions))]
        let script = include_str!(concat!("../", $path));
        script
    }};
}

#[inline]
pub fn inject(window: &tauri::Window) {
    // Inject the script to modify x web page.
    window.eval(&load_script!("../dist/main.js")).unwrap();
}
