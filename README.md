🕵️‍♀️ Encrypted Truth: Interactive Event Countdown Timer

Encrypted Truth is a high-impact, single-page React application designed to serve as the atmospheric countdown centerpiece for a murder mystery event. It combines a sophisticated, dark aesthetic with robust, event-ready functionality, including timed dramatic warnings and full control lockdown capability.

✨ Final Aesthetic and Design

The application is optimized for full-screen event projection, offering a dark, cinematic visual experience:

Thematic Background: Uses a custom-designed, atmospheric image that frames the center display with detailed, high-contrast elements (e.g., mysterious documents, antique furniture) at the top and bottom.

Branding: Features seamlessly integrated logo branding in the top-left and top-right corners, each protected by a small Glassmorphism-styled square frame for enhanced visibility.

Glassmorphism UI: All control panels and buttons utilize a strong Glassmorphism effect (heavy backdrop-blur and translucent backgrounds) to make the UI elements appear to float over the complex background.

Neon Glow: The title, timer display, and all major warnings are rendered with a pronounced, pulsating red/crimson neon glow, ensuring the time is the dominant visual focus.

Permanent Title: The application title, "ENCRYPTED TRUTH," is fully displayed and glowing from the start, setting the event's theme immediately.

🛠️ Advanced Functionality

⏱️ Control and Timing

Advanced Time Setting: The dedicated "Set Time" feature now accepts input in precise Hours, Minutes, and and Seconds (HH:MM:SS).

Control Lockdown (Toggle Controls): A critical security feature allowing the user to hide and unhide all primary manipulation buttons (Start, Reset, Pause/Resume, and Set Time). When hidden, only the utility buttons (Mute, Fullscreen, Toggle) remain, preventing accidental interaction during critical event moments.

Robust Reset: The Reset function reliably clears the current state and returns the timer to the last set starting duration (initialTime).

🚨 Dramatic Warning System

The app features escalating, full-screen glassmorphed warning pop-ups to build event suspense:

Time Remaining

Message Text

Visual Effect

Every 30 Minutes

"🚨 HALF HOUR REMAINING: TIME IS RUNNING OUT! 🚨"

Large, centered Glassmorphism modal.

5 Minutes Left

"⏳ FIVE MINUTES LEFT TO SOLVE THE TRUTH! ⏳"

Large, centered Glassmorphism modal.

1 Minute Left

"‼️ ONE MINUTE LEFT! THE TRUTH IS NEAR! ‼️"

Large, centered Glassmorphism modal.

Final Countdown (10s)

Numbers 10 down to 1

Takes over the entire center of the screen in a colossal font size, with a one-second display per number before "TIME'S UP!".

🔊 Audio Immersion

Ambient Audio: The basic ticking sound is replaced with a continuous, looping ambient audio track (loaded from a local asset) that provides low, atmospheric background soundscapes appropriate for a murder mystery, starting and stopping with the timer.

Alarm: A distinct alarm sound plays when the timer reaches zero.

Controls: The ambient audio and alarm are managed by the Mute/Unmute utility button.

💻 Tech Stack

Frontend: React (Functional Components, Hooks)

Styling: Tailwind CSS

Animation: Framer Motion

Audio: Web Audio API (for alarm) and HTML5 Audio (for ambient track)

🚀 Getting Started

(This section is a placeholder for standard setup instructions)

Clone the repository.

Install dependencies (npm install).

Ensure the necessary local audio file (ambient_mystery.mp3 or similar) is placed in your public assets folder.

Run the application (npm start).

View on a large screen for the optimal experience.
