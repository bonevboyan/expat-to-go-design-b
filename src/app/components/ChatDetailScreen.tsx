import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

const CHATS = [
  { id: 1, tripName: "Alpine Ridge Hike", lastMessage: "See you at the station!", time: "2h", unread: 1 },
  { id: 2, tripName: "Coastal Sunset Walk", lastMessage: "Should we bring snacks?", time: "5h", unread: 0 },
];

const MESSAGES_BY_CHAT: Record<number, Array<{ id: number; sender: string; text: string; time: string; isMe: boolean }>> = {
  1: [
    { id: 1, sender: "Marco B.", text: "Hey everyone! Excited for the hike", time: "10:30", isMe: false },
    { id: 2, sender: "You", text: "Can't wait! What should I bring?", time: "10:32", isMe: true },
    { id: 3, sender: "Lena K.", text: "Good boots, water, light jacket.", time: "10:35", isMe: false },
    { id: 4, sender: "You", text: "Got it, thanks!", time: "10:38", isMe: true },
    { id: 5, sender: "Marco B.", text: "See you at the station!", time: "11:00", isMe: false },
  ],
  2: [
    { id: 1, sender: "Sofia L.", text: "Hi! Looking forward to the sunset walk!", time: "14:00", isMe: false },
    { id: 2, sender: "You", text: "Me too! The weather looks perfect.", time: "14:05", isMe: true },
    { id: 3, sender: "Sofia L.", text: "Should we bring snacks?", time: "15:00", isMe: false },
    { id: 4, sender: "You", text: "Good idea! I'll bring some water and fruits.", time: "15:15", isMe: true },
    { id: 5, sender: "Sofia L.", text: "Perfect! See you at Benagil Beach at 4pm.", time: "15:30", isMe: false },
  ],
};

export function ChatDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  
  const chat = CHATS.find((c) => c.id === Number(id)) || CHATS[0];
  const messages = MESSAGES_BY_CHAT[Number(id)] || MESSAGES_BY_CHAT[1];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-4 pb-2 flex items-center gap-2 border-b border-border">
        <button onClick={() => navigate("/chat")} className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <p className="text-sm">{chat.tripName}</p>
          <p className="text-[10px] text-muted-foreground">2 participants</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] rounded-md px-3 py-2 ${
              msg.isMe ? "bg-primary text-white" : "bg-white border border-border"
            }`}>
              {!msg.isMe && <p className="text-[10px] text-muted-foreground mb-0.5">{msg.sender}</p>}
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[9px] mt-0.5 ${msg.isMe ? "text-white/60" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border flex gap-2 bg-background">
        <input
          className="flex-1 border border-border rounded-md px-3 py-2 bg-white text-sm"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm">Send</button>
      </div>
    </div>
  );
}
