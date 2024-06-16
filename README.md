![GitHub all releases](https://img.shields.io/github/downloads/tasuren/twier/total)
# Twier
This is a native X client that hides the timeline.
The mechanism is simple: the menu on the X website is simply erased.

<img
  width="712"
  alt="Screenshot of this application, screen shot of creating a post"
  src="https://github.com/tasuren/twier/assets/45121209/24a499c4-e51f-4d90-aaf2-51f19570002b">

## Installation Notices
### Can't open
<img
  width="372"
  alt="Popup that Twier is broken"
  src="https://github.com/tasuren/twier/assets/45121209/48ea69a7-2788-4404-922b-7e0a6baa0cec">

On macOS, if you can't open the app like this, you can pass this by `xattr -cr "<Twier app path here>"`.

### WebCrypto Master Key
<img
  width="546"
  alt="WebCrypto Master Key Popup"
  src="https://github.com/tasuren/twier/assets/45121209/be0866a0-c235-42e3-ab4d-e1b07b4c3f1e">

On macOS, you will get this popup and you can ignore it by pressing "Deny" button. But if you press "Deny" button, it will always be shown. You can put password and press "Always Allow" button to prevent this popup from always shown.  
Unfortunately, I don't know how to disable this alert...

## Acknowledgment
- [tauri](https://tauri.app)
- [JavaScript libraries in use](https://github.com/tasuren/twier/tree/main/licenses/js.json)
- [Rust libraries in use](https://github.com/tasuren/twier/tree/main/licenses/rust.csv)
- The icon from [いらすとや](https://www.irasutoya.com)
