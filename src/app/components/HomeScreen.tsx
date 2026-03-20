import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, Users, Heart } from "lucide-react";

const CREATED_TRIPS = [
  { id: 5, title: "Swiss Alps Trekking", location: "Grindelwald, CH", date: "Apr 22", participants: "6/12", tags: ["Hiking", "Nature"], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { id: 8, title: "Zurich Lake Kayaking", location: "Zurich, CH", date: "May 1", participants: "2/6", tags: ["Adventure", "Nature"], image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80" },
  { id: 12, title: "Bern City Walking Tour", location: "Bern, CH", date: "May 15", participants: "7/15", tags: ["Culture", "City"], image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" },
  { id: 15, title: "St. Moritz Luxury Stay", location: "St. Moritz, CH", date: "May 25", participants: "2/4", tags: ["Culture", "Nature"], image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800&q=80" },
];

const JOINED_TRIPS = [
  { id: 1, title: "Alpine Ridge Hike", location: "Interlaken, CH", date: "Apr 12", participants: "5/12", tags: ["Hiking", "Nature"], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { id: 3, title: "Lake Geneva Cruise", location: "Geneva, CH", date: "Apr 18", participants: "8/15", tags: ["Culture", "Beach"], image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { id: 7, title: "Lausanne Vineyard Hike", location: "Lausanne, CH", date: "Apr 28", participants: "5/10", tags: ["Hiking", "Food"], image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80" },
  { id: 10, title: "Jungfraujoch Expedition", location: "Jungfraujoch, CH", date: "May 8", participants: "4/8", tags: ["Adventure", "Nature"], image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80" },
];

const FAVORITE_TRIPS = [
  { id: 5, title: "Swiss Alps Trekking", location: "Grindelwald, CH", date: "Apr 22", participants: "6/12", tags: ["Hiking", "Nature"], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { id: 2, title: "Zermatt Mountain View", location: "Zermatt, CH", date: "Apr 15", participants: "3/8", tags: ["Hiking", "Nature"], image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80" },
  { id: 13, title: "Lauterbrunnen Valley", location: "Lauterbrunnen, CH", date: "May 18", participants: "3/8", tags: ["Hiking", "Nature"], image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80" },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"created" | "joined" | "favorites">("created");

  const displayTrips = tab === "created" ? CREATED_TRIPS : tab === "joined" ? JOINED_TRIPS : FAVORITE_TRIPS;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-4 pb-2">
        <h2>My Trips</h2>
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 mb-3">
        {(["created", "joined", "favorites"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl text-sm border capitalize flex items-center justify-center gap-1 ${
              tab === t ? "bg-primary text-white border-transparent" : "border-black/[0.06] bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Trip cards */}
      <div className="px-4 space-y-3">
        {displayTrips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="w-full bg-white border border-black/[0.06] rounded-2xl overflow-hidden text-left"
          >
            {/* Trip Image */}
            <div className="h-28 overflow-hidden">
              <img 
                src={trip.image} 
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm">{trip.title}</p>
              <p className="text-xs text-muted-foreground">{trip.location}</p>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {trip.date}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {trip.participants}
                </span>
              </div>
              <div className="flex gap-1 mt-2">
                {trip.tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-secondary rounded-lg text-[10px] text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
