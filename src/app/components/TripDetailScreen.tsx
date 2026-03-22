import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Share2, Flag, Users, Heart, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const TRIP_DATA: Record<string, any> = {
  "1": {
    title: "Alpine Ridge Hike", location: "Interlaken, CH", date: "Apr 12, 2026",
    participants: 5, max: 12, organizer: "Marco B.", tags: ["Hiking", "Nature"],
    description: "A ridge hike through the Swiss Alps with panoramic views. Moderate difficulty.",
    itinerary: ["07:00 — Meet at station", "07:30 — Shuttle", "08:00 — Begin hike", "12:00 — Lunch", "15:00 — Descend"],
    meetingPoint: "Interlaken Ost Station", budget: "€25-40", transport: "Train + Shuttle",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  "2": {
    title: "Zermatt Mountain View", location: "Zermatt, CH", date: "Apr 15, 2026",
    participants: 3, max: 8, organizer: "Anna S.", tags: ["Hiking", "Nature"],
    description: "Breathtaking views of the Matterhorn and surrounding peaks. Perfect for photography enthusiasts.",
    itinerary: ["08:00 — Meet at Zermatt station", "08:30 — Cable car to viewpoint", "09:00 — Photo walk", "13:00 — Mountain lunch"],
    meetingPoint: "Zermatt Station", budget: "€40-60", transport: "Cable Car",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
  },
  "3": {
    title: "Lake Geneva Cruise", location: "Geneva, CH", date: "Apr 18, 2026",
    participants: 8, max: 15, organizer: "Pierre L.", tags: ["Culture", "Beach"],
    description: "Relaxing boat tour on Lake Geneva with stunning views of the Alps and lakeside towns.",
    itinerary: ["10:00 — Meet at dock", "10:30 — Board cruise ship", "11:00 — Cruise begins", "14:00 — Lakeside lunch stop"],
    meetingPoint: "Geneva Port", budget: "€35-50", transport: "Boat",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  "4": {
    title: "Lucerne Old Town Walk", location: "Lucerne, CH", date: "Apr 20, 2026",
    participants: 4, max: 10, organizer: "Sophie M.", tags: ["Culture", "City"],
    description: "Walk through charming medieval streets, visit Chapel Bridge and explore hidden gems of Lucerne.",
    itinerary: ["09:00 — Meet at Chapel Bridge", "09:30 — Old town walking tour", "12:00 — Swiss chocolate tasting", "14:00 — Free exploration"],
    meetingPoint: "Chapel Bridge, Lucerne", budget: "€15-25", transport: "Walking",
    image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80",
  },
  "5": {
    title: "Swiss Alps Trekking", location: "Grindelwald, CH", date: "Apr 22, 2026",
    participants: 6, max: 12, organizer: "Thomas W.", tags: ["Hiking", "Nature"],
    description: "Multi-day trekking adventure through the stunning Swiss Alps with overnight mountain hut stay.",
    itinerary: ["Day 1: Grindelwald to First", "Day 2: Bachalpsee hike", "Day 3: Return via cable car"],
    meetingPoint: "Grindelwald Station", budget: "€80-120", transport: "Train + Cable Car",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  "6": {
    title: "Basel Art Museum Tour", location: "Basel, CH", date: "Apr 25, 2026",
    participants: 3, max: 8, organizer: "Clara R.", tags: ["Culture", "City"],
    description: "Explore world-renowned art museums in Basel including the Fondation Beyeler and Kunstmuseum.",
    itinerary: ["10:00 — Meet at Kunstmuseum", "10:30 — Museum tour", "13:00 — Lunch at art cafe", "15:00 — Fondation Beyeler visit"],
    meetingPoint: "Kunstmuseum Basel", budget: "€25-40", transport: "Walking + Tram",
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80",
  },
  "7": {
    title: "Lausanne Vineyard Hike", location: "Lausanne, CH", date: "Apr 28, 2026",
    participants: 5, max: 10, organizer: "Jean P.", tags: ["Hiking", "Food"],
    description: "Scenic hike through UNESCO-listed Lavaux vineyards with wine tasting at local wineries.",
    itinerary: ["09:00 — Meet at Lausanne station", "09:30 — Train to vineyard region", "10:00 — Hike through terraces", "13:00 — Wine tasting lunch"],
    meetingPoint: "Lausanne Station", budget: "€45-65", transport: "Train",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
  },
  "8": {
    title: "Zurich Lake Kayaking", location: "Zurich, CH", date: "May 1, 2026",
    participants: 2, max: 6, organizer: "Lisa K.", tags: ["Adventure", "Nature"],
    description: "Kayaking adventure on Lake Zurich with views of the Alps and city skyline.",
    itinerary: ["09:00 — Meet at kayak rental", "09:30 — Safety briefing", "10:00 — Kayaking begins", "12:30 — Lakeside picnic"],
    meetingPoint: "Lake Zurich Promenade", budget: "€30-45", transport: "Kayak",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  },
  "9": {
    title: "Montreux Jazz Festival", location: "Montreux, CH", date: "May 5, 2026",
    participants: 8, max: 12, organizer: "David H.", tags: ["Culture", "City"],
    description: "Experience the world-famous Montreux Jazz Festival with live performances and lakeside atmosphere.",
    itinerary: ["18:00 — Meet at festival entrance", "19:00 — Opening act", "21:00 — Main performance", "23:00 — After-party"],
    meetingPoint: "Montreux Music & Convention Centre", budget: "€60-100", transport: "Walking",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  },
  "10": {
    title: "Jungfraujoch Expedition", location: "Jungfraujoch, CH", date: "May 8, 2026",
    participants: 4, max: 8, organizer: "Michael B.", tags: ["Adventure", "Nature"],
    description: "Journey to the Top of Europe at Jungfraujoch with glacier walks and ice palace exploration.",
    itinerary: ["07:00 — Meet at Interlaken", "08:00 — Train to Jungfraujoch", "10:00 — Arrive at summit", "11:00 — Glacier walk", "14:00 — Ice palace tour"],
    meetingPoint: "Interlaken Ost", budget: "€150-200", transport: "Mountain Railway",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
  },
  "11": {
    title: "Engelberg Ski Weekend", location: "Engelberg, CH", date: "May 12, 2026",
    participants: 6, max: 10, organizer: "Sarah K.", tags: ["Adventure", "Nature"],
    description: "Spring skiing in Engelberg with guaranteed snow and stunning mountain scenery.",
    itinerary: ["Day 1: Arrival and afternoon skiing", "Day 2: Full day on slopes", "Day 3: Final runs and departure"],
    meetingPoint: "Engelberg Station", budget: "€120-180", transport: "Train + Cable Car",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
  },
  "12": {
    title: "Bern City Walking Tour", location: "Bern, CH", date: "May 15, 2026",
    participants: 7, max: 15, organizer: "Markus T.", tags: ["Culture", "City"],
    description: "Discover Switzerland's capital with its medieval old town, Zytglogge clock tower, and Bear Park.",
    itinerary: ["10:00 — Meet at Bundeshaus", "10:30 — Old town walking tour", "12:30 — Swiss lunch", "14:00 — Bear Park visit"],
    meetingPoint: "Bundeshaus, Bern", budget: "€20-35", transport: "Walking",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
  },
  "13": {
    title: "Lauterbrunnen Valley", location: "Lauterbrunnen, CH", date: "May 18, 2026",
    participants: 3, max: 8, organizer: "Emma W.", tags: ["Hiking", "Nature"],
    description: "Explore the valley of 72 waterfalls with hikes to Staubbach Falls and Trümmelbach Falls.",
    itinerary: ["09:00 — Meet at Lauterbrunnen station", "09:30 — Valley hike begins", "11:00 — Staubbach Falls", "13:00 — Trümmelbach Falls tour"],
    meetingPoint: "Lauterbrunnen Station", budget: "€25-40", transport: "Train + Walking",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
  },
  "14": {
    title: "Davos Mountain Bike", location: "Davos, CH", date: "May 22, 2026",
    participants: 4, max: 6, organizer: "Andreas M.", tags: ["Adventure", "Nature"],
    description: "Mountain biking through Davos trails with varying difficulty levels for all skill levels.",
    itinerary: ["09:00 — Bike rental and briefing", "10:00 — Trail ride begins", "13:00 — Mountain hut lunch", "15:00 — Continue downhill"],
    meetingPoint: "Davos Bike Rental", budget: "€50-70", transport: "Mountain Bike",
    image: "https://images.unsplash.com/photo-1544191696-102f9e136c9e?w=800&q=80",
  },
  "15": {
    title: "St. Moritz Luxury Stay", location: "St. Moritz, CH", date: "May 25, 2026",
    participants: 2, max: 4, organizer: "Victoria S.", tags: ["Culture", "Nature"],
    description: "Luxury weekend in St. Moritz with spa treatments, fine dining, and scenic lake walks.",
    itinerary: ["Day 1: Arrival and spa", "Day 2: Lake walk and gourmet lunch", "Day 3: Sunrise photography and departure"],
    meetingPoint: "St. Moritz Station", budget: "€300-500", transport: "Train",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800&q=80",
  },
  "16": {
    title: "Chamonix Alpine Climb", location: "Chamonix, FR", date: "May 28, 2026",
    participants: 3, max: 6, organizer: "Lucas B.", tags: ["Adventure", "Hiking"],
    description: "Guided alpine climbing experience near Mont Blanc with professional instructors.",
    itinerary: ["07:00 — Meet at Chamonix guide office", "08:00 — Equipment check", "09:00 — Begin ascent", "16:00 — Return to base"],
    meetingPoint: "Chamonix Guide Office", budget: "€100-150", transport: "Walking + Cable Car",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  "17": {
    title: "Lake Como Boat Tour", location: "Como, IT", date: "Jun 1, 2026",
    participants: 6, max: 10, organizer: "Giulia R.", tags: ["Culture", "Beach"],
    description: "Scenic boat tour of Lake Como visiting Bellagio, Varenna, and beautiful lakeside villas.",
    itinerary: ["10:00 — Meet at Como dock", "10:30 — Boat departure", "12:00 — Bellagio stop", "15:00 — Varenna visit"],
    meetingPoint: "Como Ferry Terminal", budget: "€40-60", transport: "Boat",
    image: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=800&q=80",
  },
  "18": {
    title: "Innsbruck Castle Visit", location: "Innsbruck, AT", date: "Jun 5, 2026",
    participants: 5, max: 12, organizer: "Hans G.", tags: ["Culture", "City"],
    description: "Visit historic castles around Innsbruck including Ambras Castle and Bergisel Ski Jump.",
    itinerary: ["09:00 — Meet at Innsbruck station", "09:30 — Ambras Castle tour", "12:00 — City center lunch", "14:00 — Bergisel tower visit"],
    meetingPoint: "Innsbruck Hauptbahnhof", budget: "€30-50", transport: "Bus",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
  },
  "19": {
    title: "Zurich Zoo Family Day", location: "Zurich, CH", date: "Jun 8, 2026",
    participants: 4, max: 20, organizer: "Maria S.", tags: ["Family", "Culture"],
    description: "A perfect family day at Zurich Zoo! See exotic animals, enjoy interactive exhibits, and have a picnic lunch. Great for kids of all ages.",
    itinerary: ["09:00 — Meet at zoo entrance", "09:30 — Elephant house tour", "11:00 — Penguin feeding show", "12:30 — Picnic lunch", "14:00 — Aquarium visit", "16:00 — Playground time"],
    meetingPoint: "Zurich Zoo Main Entrance", budget: "€30-45", transport: "Train",
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=800&q=80",
  },
};

// Current user (in a real app, this would come from auth context)
const CURRENT_USER = "Alex Johnson";

export function TripDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const trip = TRIP_DATA[id || "1"] || TRIP_DATA["1"];
  const [joined, setJoined] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check if current user is the organizer
  const isOrganizer = trip.organizer === CURRENT_USER;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/trip/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Cover Image */}
      <div className="h-44 relative overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <button onClick={() => navigate(-1)} className="absolute top-10 left-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm">
          <ArrowLeft className="w-4 h-4 text-black" />
        </button>
        <div className="absolute top-10 right-3 flex gap-1.5">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs transition-colors ${
              isFavorite ? "text-red-500" : "text-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <button 
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs"
          >
            <Share2 className="w-4 h-4 text-black" />
          </button>
          <button 
            onClick={() => navigate(`/trip/${id}/report`)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs"
          >
            <Flag className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div>
          <div className="flex gap-1 mb-1">
            {trip.tags.map((t: string) => (
              <span key={t} className="px-1.5 py-0.5 bg-secondary rounded-lg text-[10px] text-muted-foreground">{t}</span>
            ))}
          </div>
          <h2>{trip.title}</h2>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl p-3 bg-white border border-black/[0.06]">
            <p className="text-[10px] text-muted-foreground">Location</p>
            <p className="text-sm">{trip.location}</p>
          </div>
          <div className="rounded-2xl p-3 bg-white border border-black/[0.06]">
            <p className="text-[10px] text-muted-foreground">Date</p>
            <p className="text-sm">{trip.date}</p>
          </div>
          <div className="rounded-2xl p-3 bg-white border border-black/[0.06]">
            <p className="text-[10px] text-muted-foreground">Organized by</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-medium">{trip.organizer.charAt(0)}</div>
              <p className="text-sm">{trip.organizer}</p>
            </div>
          </div>
          <div className="rounded-2xl p-3 bg-white border border-black/[0.06]">
            <p className="text-[10px] text-muted-foreground">Transport</p>
            <p className="text-sm">{trip.transport}</p>
          </div>
        </div>

        {/* View Participants Button */}
        <button
          onClick={() => navigate(`/trip/${id}/participants`)}
          className="w-full flex items-center justify-between rounded-2xl p-3 bg-white border border-black/[0.06]"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center text-[10px]">MB</div>
              <div className="w-8 h-8 rounded-full bg-accent text-white border-2 border-white flex items-center justify-center text-[10px]">LK</div>
              <div className="w-8 h-8 rounded-full bg-muted-foreground text-white border-2 border-white flex items-center justify-center text-[10px]">+3</div>
            </div>
            <span className="text-sm">{trip.participants}/{trip.max} participants</span>
          </div>
          <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
        </button>

        {/* Description */}
        <div>
          <h4 className="mb-1">About</h4>
          <p className="text-sm text-muted-foreground">{trip.description}</p>
        </div>

        {/* Itinerary */}
        <div>
          <h4 className="mb-1">Itinerary</h4>
          <div className="space-y-1">
            {trip.itinerary.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting point */}
        <div className="rounded-2xl p-3 bg-white border border-black/[0.06]">
          <p className="text-xs text-muted-foreground">Meeting Point</p>
          <p className="text-sm">{trip.meetingPoint}</p>
          <button className="text-xs text-primary underline mt-1 flex items-center gap-1">
            Open in Maps
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Budget */}
        <div className="rounded-2xl p-3 bg-white border border-black/[0.06]">
          <p className="text-xs text-muted-foreground">Budget</p>
          <p className="text-sm">{trip.budget}</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-background">
        <div className="max-w-md mx-auto">
          {isOrganizer ? (
            <button
              onClick={() => navigate(`/trip/${id}/edit`)}
              className="w-full py-3 rounded-md text-sm bg-primary text-white"
            >
              Edit Trip
            </button>
          ) : (
            <button
              onClick={() => setJoined(!joined)}
              className={`w-full py-3 rounded-md text-sm ${
                joined ? "bg-white text-foreground" : "bg-primary text-white"
              }`}
            >
              {joined ? "Leave Trip" : "Join Trip"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
