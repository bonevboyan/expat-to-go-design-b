import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Trip {
  id: number;
  title: string;
  location: string;
  date: string;
  endDate?: string;
  participants: string;
  tags: string[];
  description?: string;
  itinerary?: string;
  meetingPoint?: string;
  minParticipants?: number;
  maxParticipants?: number;
  budget?: string;
  transport?: string;
  visibility: "public" | "private";
  createdBy: "me" | "other";
  isFavorite?: boolean;
}

export interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Chat {
  id: number;
  tripId: number;
  tripName: string;
  participants: string[];
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  occupation: string;
  ageRange: string;
  bio: string;
  hobbies: string;
  instagram?: string;
  twitter?: string;
  avatar?: string;
}

// Initial data
const initialTrips: Trip[] = [
  { id: 5, title: "Mountain Trek", location: "Swiss Alps", date: "Jun 10", participants: "4/10", tags: ["Hiking"], createdBy: "me", visibility: "public" },
  { id: 6, title: "City Food Tour", location: "Barcelona, ES", date: "Jun 22", participants: "6/8", tags: ["Food", "City"], createdBy: "me", visibility: "public" },
  { id: 1, title: "Alpine Ridge Hike", location: "Interlaken, CH", date: "Apr 12", participants: "5/12", tags: ["Hiking", "Nature"], createdBy: "other", isFavorite: true },
  { id: 3, title: "Old Town Discovery", location: "Prague, CZ", date: "May 1", participants: "8/15", tags: ["Culture", "City"], createdBy: "other" },
];

const initialChats: Chat[] = [
  {
    id: 1,
    tripId: 1,
    tripName: "Alpine Ridge Hike",
    participants: ["Marco B.", "Lena K.", "You"],
    lastMessage: "See you at the station!",
    time: "2h",
    unread: 1,
    messages: [
      { id: 1, sender: "Marco B.", text: "Hey everyone! Excited for the hike", time: "10:30", isMe: false },
      { id: 2, sender: "You", text: "Can't wait! What should I bring?", time: "10:32", isMe: true },
      { id: 3, sender: "Lena K.", text: "Good boots, water, light jacket.", time: "10:35", isMe: false },
      { id: 4, sender: "You", text: "Got it, thanks!", time: "10:38", isMe: true },
      { id: 5, sender: "Marco B.", text: "See you at the station!", time: "11:00", isMe: false },
    ],
  },
  {
    id: 2,
    tripId: 3,
    tripName: "Old Town Discovery",
    participants: ["Sarah M.", "You"],
    lastMessage: "Should we bring snacks?",
    time: "5h",
    unread: 0,
    messages: [
      { id: 1, sender: "Sarah M.", text: "Hi! Looking forward to exploring Prague together!", time: "14:20", isMe: false },
      { id: 2, sender: "You", text: "Me too! I've never been there.", time: "14:25", isMe: true },
      { id: 3, sender: "Sarah M.", text: "Should we bring snacks?", time: "15:00", isMe: false },
    ],
  },
];

const initialProfile: UserProfile = {
  id: "1",
  username: "alexjohnson",
  email: "alex@email.com",
  country: "Switzerland",
  city: "Zurich",
  occupation: "Software Engineer",
  ageRange: "25-34",
  bio: "Passionate hiker and travel enthusiast. Always looking for new adventures!",
  hobbies: "Hiking, Photography, Camping",
  instagram: "instagram.com/alexj_travels",
  twitter: "twitter.com/alexjohnson",
  avatar: "AJ",
};

// Context type
interface AppContextType {
  // Trips
  trips: Trip[];
  createdTrips: Trip[];
  joinedTrips: Trip[];
  favoriteTrips: Trip[];
  addTrip: (trip: Omit<Trip, "id" | "createdBy">) => void;
  updateTrip: (id: number, updates: Partial<Trip>) => void;
  deleteTrip: (id: number) => void;
  toggleFavorite: (id: number) => void;
  getTripById: (id: number) => Trip | undefined;

  // Chats
  chats: Chat[];
  getChatById: (id: number) => Chat | undefined;
  sendMessage: (chatId: number, text: string) => void;
  markChatAsRead: (chatId: number) => void;

  // Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  // Computed trip lists
  const createdTrips = trips.filter((t) => t.createdBy === "me");
  const joinedTrips = trips.filter((t) => t.createdBy === "other");
  const favoriteTrips = trips.filter((t) => t.isFavorite);

  // Trip actions
  const addTrip = (tripData: Omit<Trip, "id" | "createdBy">) => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now(),
      createdBy: "me",
    };
    setTrips((prev) => [...prev, newTrip]);
  };

  const updateTrip = (id: number, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((trip) => (trip.id === id ? { ...trip, ...updates } : trip))
    );
  };

  const deleteTrip = (id: number) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === id ? { ...trip, isFavorite: !trip.isFavorite } : trip
      )
    );
  };

  const getTripById = (id: number) => {
    return trips.find((trip) => trip.id === id);
  };

  // Chat actions
  const getChatById = (id: number) => {
    return chats.find((chat) => chat.id === id);
  };

  const sendMessage = (chatId: number, text: string) => {
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newMessage: Message = {
      id: Date.now(),
      sender: "You",
      text,
      time: timeString,
      isMe: true,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: text,
              time: "Just now",
            }
          : chat
      )
    );
  };

  const markChatAsRead = (chatId: number) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    );
  };

  // Profile actions
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const value: AppContextType = {
    trips,
    createdTrips,
    joinedTrips,
    favoriteTrips,
    addTrip,
    updateTrip,
    deleteTrip,
    toggleFavorite,
    getTripById,
    chats,
    getChatById,
    sendMessage,
    markChatAsRead,
    profile,
    updateProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
