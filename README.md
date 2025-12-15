![GitHub all releases](https://img.shields.io/github/downloads/tasuren/twier/total)

# Twier

This is a native X client that hides the timeline.
The mechanism is simple: the menu on the X website is simply erased.

You can download this software from [Releases](https://github.com/tasuren/twier/releases).

<img
  width="600"
  alt="Screenshot of this application during creating a post"
  src="https://github.com/user-attachments/assets/dec32fa0-5aab-4e81-8ec1-acda6d6d571b">

## Installation notices on macOS

### Broken warning

<img
  width="300"
  alt="Popup says that Twier is broken"
  src="https://github.com/user-attachments/assets/820369bf-904e-433a-8f4f-18358366fc0c">

On macOS, if you can't open the app like this, you can pass this by `xattr -cr "<Twier app path here>"`.

### WebCrypto Master Key popup

<img
  width="500"
  alt="WebCrypto Master Key popup"
  src="https://github.com/user-attachments/assets/debc2696-ec6c-4806-a65d-82e95f6fbb73">

On macOS, you will get this popup and you can ignore it by pressing "Deny" button.
But if you press "Deny" button, it will always be shown.
You can put password and press "Always Allow" button to prevent this popup from always shown.

Unfortunately, I don't know how to disable this alert...

## License

This project is licensed under the [GPL 3.0 or later License](LICENSE).
