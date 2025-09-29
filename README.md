# SnapNote - Chrome Extension

![SnapNote Logo](icons/icon128.png)

## Overview
SnapNote is a Chrome extension that allows users to **capture webpages**, **annotate them with sketches**, **add notes**, and **download the final result**. It is designed for productivity, web testing, and content annotation.

---

## Features
- **Capture Webpages:** Take screenshots of any visible tab.
- **Full-Window Editor:** Annotate on a full-size canvas, not limited by popup size.
- **Drawing Tools:** Pen with adjustable color and size.
- **Add Notes:** Add textual notes along with the screenshot.
- **Clear / Undo Drawing:** Clear the annotations while keeping the base screenshot.
- **Download:** Save the annotated screenshot with notes as a PNG file.
- **Lightweight and Fast:** Minimalistic design for quick usage.

---

## Installation
1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the project folder.
5. The SnapNote icon will appear in the Chrome toolbar.

---

## Usage
1. Click the SnapNote icon in Chrome toolbar.
2. Press **Capture Page & Open Editor**.
3. The full-window editor will open with the captured screenshot.
4. Use the **pen tool** to draw on the screenshot.
5. Adjust pen **size and color** from the toolbar.
6. Add notes in the text area at the bottom.
7. Click **Download** to save the annotated screenshot.
8. Click **Clear** to remove drawings without affecting the original screenshot.

---

## File Structure
```
SnapNote/
├── manifest.json        # Chrome extension manifest
├── popup.html           # Popup UI for capturing pages
├── popup.js             # JS for popup actions
├── editor.html          # Full-window annotation editor
├── editor.js            # JS for editor functionalities
├── background.js        # Background script handling capture
└── icons/               # Folder containing icon files
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Permissions
- `activeTab` – To capture the visible tab.
- `tabs` – To open new tabs for the editor.
- `storage` – To temporarily store captured screenshots.
- `scripting` – (Required by Manifest V3 for future enhancements if needed)

---

## Technologies Used
- **HTML5 Canvas** – For annotations.
- **JavaScript** – Logic for capture, drawing, and download.
- **Chrome Extension API** – To interact with browser tabs and storage.
- **Manifest V3** – Chrome Extension manifest version.

---

## Future Improvements
- Undo/Redo for drawings.
- Multiple pen tools (rectangle, arrows, text boxes).
- Cloud sync or sharing annotated screenshots.
- Full-page (scrolling) screenshot support.
- Dark mode editor interface.

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or suggestions, contact **[Your Name / Email]**.