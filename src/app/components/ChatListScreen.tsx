import { useNavigate } from "react-router";

const CHATS = [
  { id: 1, tripName: "Alpine Ridge Hike", lastMessage: "See you at the station!", time: "2h", unread: 1 },
  { id: 2, tripName: "Coastal Sunset Walk", lastMessage: "Perfect! See you at Benagil Beach at 4pm.", time: "5h", unread: 0 },
];

export function ChatListScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-4 pb-2">
        <h2>Messages</h2>
      </div>

      <div className="px-4 space-y-2">
        {CHATS.map((chat) => (
          <button
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="w-full flex items-center gap-3 bg-white border border-border rounded-md p-3 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#DDDDDD] flex items-center justify-center text-sm font-medium">
              {chat.tripName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{chat.tripName}</p>
              <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end justify-start gap-1 h-full">
              <span className="text-[10px] text-muted-foreground">{chat.time}</span>
              {chat.unread > 0 ? (
                <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                  {chat.unread}
                </div>
              ) : (
                <div className="w-5 h-5" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
