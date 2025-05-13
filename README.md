#Esprit_school_of_engineering

💬 Intelligent Messaging Module – Frontend (Angular)
This is the Angular-based frontend for the messaging system in our Intelligent Internship Platform. It provides a sleek, responsive, and real-time user experience for sending and managing messages, handling file attachments, and viewing analytics.

🎯 Core Features
📨 Real-Time Chat Interface
- Send and receive messages instantly using WebSocket (STOMP over SockJS)
- Live updates for message status: read/unread indicators per message
- Real-time typing indicators and automatic scroll-to-latest behavior

📎 Attachments & Voice Messages
- Support for sending/receiving images, PDFs, and audio files
- In-browser recording of voice messages, playable directly in chat
- Drag-and-drop file upload and preview before sending
- Input validation for file size and supported formats

📌 Conversation Management
- Start new conversations by entering the recipient’s email
- Delete conversations instantly with live UI update
- Mark conversations as favorites—visually highlighted and always prioritized in the list
- Conversations sorted by favorite status and last activity date

🔍 Smart Search & Filtering
- Search messages dynamically by keyword or date range
- Pinned messages always displayed at the top of the conversation
- Unread message counters per conversation with auto-decrement on read

🔔 Notifications & Controls
- Real-time notification toasts for incoming messages
- Enable/disable notifications per conversation
- Live alert indicator when messages arrive while the app is open

📊 Statistics & Insights
- View total messages sent/received per user
- Display of average number of messages per conversation
- Calculation of average time delay between exchanged messages
- Real-time classification of messages by type: text, image, audio, PDF

🧠 Smart Profile Suggestions
- While not handled entirely by the frontend, the messaging module integrates with a recommendation system that suggests relevant user profiles based on:
  - Number of mutual friends
  - Recent activity level in messaging
- The frontend displays these suggestions.

💡 UX Enhancements
- Responsive UI
- Message grouping by sender for clean visual hierarchy
- Message status icons (sent, delivered, seen)
- Input tooltips and error states for invalid actions

🛠️ Tech Stack
- Framework: Angular
- State Management: RxJS, Angular Services
- Real-Time Messaging: STOMP over WebSocket (SockJS)
- Styling: Angular Material / Bootstrap
- Audio Recording: HTML5 MediaRecorder API
- Notifications: Angular Toasts
