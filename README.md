# 🎥 SuiMeet

A decentralized, privacy-focused WebRTC video conferencing application built on the Sui blockchain network. SuiMeet leverages peer-to-peer connectivity and Web3 identity verification to deliver a secure, sovereign alternative to traditional video calling platforms.

## ✨ Features (MVP)

- **ZK-Verified Identity**: Authenticate seamlessly using Sui Wallets. No central databases, no emails required to join the network.
- **Peer-to-Peer Video & Audio**: Direct, low-latency WebRTC streams ensuring your media never passes through a centralized server.
- **Dynamic Meeting Scheduling**: Generate secure 8-character meeting IDs and randomized passwords. Configure meeting duration (1 to 10 hours) and invite peers directly via simulated email dispatch.
- **Screen Sharing**: Effortlessly swap your camera feed with your screen to present to peers, natively integrated via WebRTC `RTCRtpSender` track replacement.
- **Live P2P Chat**: Send and receive text messages instantly during your call using decentralized BroadcastChannels.
- **Neobrutalist UI/UX**: A gorgeous, high-contrast, modern interface featuring bold typographies, glassmorphism elements, and smooth framer-motion animations.
- **Smart Notifications**: Built-in alerting system to remind users of upcoming sessions and verification statuses.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Sui Wallet Extension (optional, for identity verification testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sui-meet.git
   cd sui-meet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start exploring the SuiMeet Dashboard.

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: TailwindCSS + Vanilla CSS (Neobrutalism theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Web3 Integration**: `@mysten/sui` (Sui Client & Transactions)
- **Real-time Communication**: WebRTC (`getUserMedia`, `getDisplayMedia`, `RTCPeerConnection`)

## 💡 How It Works

1. **Initialization**: Connect your Sui wallet on the Dashboard to establish your "Sovereign Node" identity.
2. **Creation**: Click "New Meeting" to generate cryptographic credentials. Select a duration and email your peers.
3. **Connection**: Once a peer joins with the matching ID and password, WebRTC orchestrates an ICE candidate exchange via local signaling channels to establish a direct P2P link.
4. **Communication**: Video, audio, and chat data flow directly between participants.

## 🔒 Privacy First
SuiMeet is designed with sovereignty in mind. By relying on WebRTC, media streams are encrypted end-to-end between peers. Centralized servers are completely bypassed for video routing, ensuring maximum privacy.

---
*Built with 💧 for the Sui Ecosystem.*
