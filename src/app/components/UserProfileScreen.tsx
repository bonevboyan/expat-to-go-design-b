import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Flag, Instagram, Twitter, Globe } from "lucide-react";

const USERS_DATA: Record<number, typeof USER_DATA> = {
  1: {
    id: 1,
    name: "Marco B.",
    initials: "MB",
    location: "Milan, Italy",
    occupation: "Photographer",
    ageRange: "25-34",
    bio: "Passionate photographer and travel enthusiast. Love exploring new places and meeting new people!",
    hobbies: ["Photography", "Hiking", "Travel", "Food"],
    trips: 15,
    organized: 8,
    countries: 12,
    socials: {
      instagram: "@marco_travels",
      twitter: "@marcob_photo",
      website: "marcophoto.com",
    },
    pastTrips: [
      { id: 1, title: "Dolomites Trek", date: "Mar 2025", location: "Italy" },
      { id: 2, title: "Swiss Alps Hike", date: "Feb 2025", location: "Switzerland" },
      { id: 3, title: "Portugal Coast", date: "Jan 2025", location: "Portugal" },
    ],
  },
  2: {
    id: 2,
    name: "Lena K.",
    initials: "LK",
    location: "Berlin, Germany",
    occupation: "UX Designer",
    ageRange: "25-34",
    bio: "Creative designer who loves discovering hidden gems and meeting locals when traveling. Always up for an adventure!",
    hobbies: ["Design", "Street Art", "Coffee", "Yoga"],
    trips: 23,
    organized: 5,
    countries: 18,
    socials: {
      instagram: "@lena_designs",
      twitter: "@lenak_ux",
      website: "lenak-design.com",
    },
    pastTrips: [
      { id: 1, title: "Barcelona Street Art", date: "Feb 2025", location: "Spain" },
      { id: 2, title: "Copenhagen Design Tour", date: "Dec 2024", location: "Denmark" },
      { id: 3, title: "Amsterdam Weekend", date: "Nov 2024", location: "Netherlands" },
    ],
  },
  3: {
    id: 3,
    name: "Alex Johnson",
    initials: "AJ",
    location: "London, UK",
    occupation: "Software Engineer",
    ageRange: "25-34",
    bio: "Tech enthusiast and outdoor lover. Combining my love for coding with weekend hiking trips across Europe.",
    hobbies: ["Coding", "Climbing", "Cycling", "Board Games"],
    trips: 12,
    organized: 3,
    countries: 9,
    socials: {
      instagram: "@alex_codes",
      twitter: "@alexjohnson",
      website: "alexjohnson.dev",
    },
    pastTrips: [
      { id: 1, title: "Lake District Hike", date: "Mar 2025", location: "UK" },
      { id: 2, title: "Scottish Highlands", date: "Jan 2025", location: "Scotland" },
      { id: 3, title: "Peak District Climb", date: "Oct 2024", location: "UK" },
    ],
  },
  4: {
    id: 4,
    name: "Sarah M.",
    initials: "SM",
    location: "Paris, France",
    occupation: "Chef",
    ageRange: "35-44",
    bio: "Professional chef exploring the world's cuisines one trip at a time. Always searching for the best local food experiences!",
    hobbies: ["Cooking", "Wine Tasting", "Markets", "Photography"],
    trips: 31,
    organized: 12,
    countries: 22,
    socials: {
      instagram: "@sarah_cuisine",
      twitter: "@sarahmchef",
      website: "sarahmcuisine.fr",
    },
    pastTrips: [
      { id: 1, title: "Tuscany Food Tour", date: "Feb 2025", location: "Italy" },
      { id: 2, title: "Lyon Gastronomy", date: "Dec 2024", location: "France" },
      { id: 3, title: "Tokyo Food Streets", date: "Oct 2024", location: "Japan" },
    ],
  },
  5: {
    id: 5,
    name: "John D.",
    initials: "JD",
    location: "Amsterdam, Netherlands",
    occupation: "Architect",
    ageRange: "35-44",
    bio: "Architecture nerd who travels to see beautiful buildings and structures. Also love kayaking and urban exploration.",
    hobbies: ["Architecture", "Kayaking", "History", "Photography"],
    trips: 19,
    organized: 7,
    countries: 14,
    socials: {
      instagram: "@john_architecture",
      twitter: "@johnd_arch",
      website: "johndesign.nl",
    },
    pastTrips: [
      { id: 1, title: "Bilbao Guggenheim", date: "Jan 2025", location: "Spain" },
      { id: 2, title: "Barcelona Modernism", date: "Nov 2024", location: "Spain" },
      { id: 3, title: "Copenhagen Architecture", date: "Sep 2024", location: "Denmark" },
    ],
  },
};

const USER_DATA = {
  id: 1,
  name: "Marco B.",
  initials: "MB",
  location: "Milan, Italy",
  occupation: "Photographer",
  ageRange: "25-34",
  bio: "Passionate photographer and travel enthusiast. Love exploring new places and meeting new people!",
  hobbies: ["Photography", "Hiking", "Travel", "Food"],
  trips: 15,
  organized: 8,
  countries: 12,
  socials: {
    instagram: "@marco_travels",
    twitter: "@marcob_photo",
    website: "marcophoto.com",
  },
  pastTrips: [
    { id: 1, title: "Dolomites Trek", date: "Mar 2025", location: "Italy" },
    { id: 2, title: "Swiss Alps Hike", date: "Feb 2025", location: "Switzerland" },
    { id: 3, title: "Portugal Coast", date: "Jan 2025", location: "Portugal" },
  ],
};

export function UserProfileScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = parseInt(id || "1", 10);
  const userData = USERS_DATA[userId] || USERS_DATA[1];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)} 
            className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2>Profile</h2>
        </div>
        <button 
          onClick={() => navigate(`/user/${id}/report`)}
          className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center"
        >
          <Flag className="w-4 h-4" />
        </button>
      </div>

      {/* Avatar & Info */}
      <div className="flex flex-col items-center px-4 mb-4">
        <div className="w-20 h-20 rounded-full bg-[#DDDDDD] border border-border flex items-center justify-center text-muted-foreground text-lg font-medium mb-2">
          {userData.initials}
        </div>
        <h3>{userData.name}</h3>
        <p className="text-sm text-muted-foreground">{userData.location}</p>
        <p className="text-xs text-muted-foreground">{userData.occupation} · {userData.ageRange}</p>
      </div>

      {/* Bio */}
      <div className="mx-4 border border-border rounded-md bg-white p-3 mb-3">
        <p className="text-sm text-muted-foreground">{userData.bio}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {userData.hobbies.map((hobby) => (
            <span key={hobby} className="px-1.5 py-0.5 border border-border rounded text-[10px] text-muted-foreground">
              {hobby}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 grid grid-cols-3 gap-2 mb-3">
        {[
          { label: "Trips", value: userData.trips },
          { label: "Organized", value: userData.organized },
          { label: "Countries", value: userData.countries },
        ].map((stat) => (
          <div key={stat.label} className="border border-border rounded-md bg-white p-2 text-center">
            <p className="text-lg font-medium">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mx-4 mb-3">
        <h4 className="mb-2">Social</h4>
        <div className="border border-border rounded-md bg-white divide-y divide-border">
          {userData.socials.instagram && (
            <div className="px-3 py-2 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{userData.socials.instagram}</span>
            </div>
          )}
          {userData.socials.twitter && (
            <div className="px-3 py-2 flex items-center gap-2">
              <Twitter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{userData.socials.twitter}</span>
            </div>
          )}
          {userData.socials.website && (
            <div className="px-3 py-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{userData.socials.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Past Trips */}
      <div className="mx-4 mb-6">
        <h4 className="mb-2">Past Trips</h4>
        <div className="space-y-2">
          {userData.pastTrips.map((trip) => (
            <div key={trip.id} className="border border-border rounded-md bg-white p-3">
              <p className="text-sm font-medium">{trip.title}</p>
              <p className="text-xs text-muted-foreground">{trip.location} · {trip.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
