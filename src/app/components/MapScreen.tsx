import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, Users, Heart, MapPin, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// All trips data
const ALL_TRIPS = [
  { id: 1, title: "Alpine Ridge Hike", location: "Interlaken, CH", date: "Apr 12", participants: "5/12", tags: ["Hiking", "Nature"], lat: 46.6863, lng: 7.8632, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { id: 2, title: "Zermatt Mountain View", location: "Zermatt, CH", date: "Apr 15", participants: "3/8", tags: ["Hiking", "Nature"], lat: 46.0207, lng: 7.7491, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80" },
  { id: 3, title: "Lake Geneva Cruise", location: "Geneva, CH", date: "Apr 18", participants: "8/15", tags: ["Culture", "Beach"], lat: 46.2044, lng: 6.1432, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { id: 4, title: "Lucerne Old Town Walk", location: "Lucerne, CH", date: "Apr 20", participants: "4/10", tags: ["Culture", "City"], lat: 47.0502, lng: 8.3093, image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80" },
  { id: 5, title: "Swiss Alps Trekking", location: "Grindelwald, CH", date: "Apr 22", participants: "6/12", tags: ["Hiking", "Nature"], lat: 46.6243, lng: 8.0414, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
  { id: 6, title: "Basel Art Museum Tour", location: "Basel, CH", date: "Apr 25", participants: "3/8", tags: ["Culture", "City"], lat: 47.5596, lng: 7.5886, image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80" },
  { id: 7, title: "Lausanne Vineyard Hike", location: "Lausanne, CH", date: "Apr 28", participants: "5/10", tags: ["Hiking", "Food"], lat: 46.5197, lng: 6.6323, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80" },
  { id: 8, title: "Zurich Lake Kayaking", location: "Zurich, CH", date: "May 1", participants: "2/6", tags: ["Adventure", "Nature"], lat: 47.3769, lng: 8.5417, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80" },
  { id: 9, title: "Montreux Jazz Festival", location: "Montreux, CH", date: "May 5", participants: "8/12", tags: ["Culture", "City"], lat: 46.4312, lng: 6.9107, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" },
  { id: 10, title: "Jungfraujoch Expedition", location: "Jungfraujoch, CH", date: "May 8", participants: "4/8", tags: ["Adventure", "Nature"], lat: 46.5475, lng: 7.9851, image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80" },
  { id: 11, title: "Engelberg Ski Weekend", location: "Engelberg, CH", date: "May 12", participants: "6/10", tags: ["Adventure", "Nature"], lat: 46.8199, lng: 8.4086, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80" },
  { id: 12, title: "Bern City Walking Tour", location: "Bern, CH", date: "May 15", participants: "7/15", tags: ["Culture", "City"], lat: 46.9480, lng: 7.4474, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" },
  { id: 13, title: "Lauterbrunnen Valley", location: "Lauterbrunnen, CH", date: "May 18", participants: "3/8", tags: ["Hiking", "Nature"], lat: 46.5958, lng: 7.9081, image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80" },
  { id: 14, title: "Davos Mountain Bike", location: "Davos, CH", date: "May 22", participants: "4/6", tags: ["Adventure", "Nature"], lat: 46.7808, lng: 9.6796, image: "https://images.unsplash.com/photo-1544191696-102f9e136c9e?w=800&q=80" },
  { id: 15, title: "St. Moritz Luxury Stay", location: "St. Moritz, CH", date: "May 25", participants: "2/4", tags: ["Culture", "Nature"], lat: 46.4908, lng: 9.8355, image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800&q=80" },
];

// Saved/Favorite trip IDs
const SAVED_TRIP_IDS = [2, 5, 8, 12, 15];

// Custom marker icon
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 36px; 
    height: 36px; 
    background: #FF6B35; 
    border-radius: 50%; 
    border: 3px solid white; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex; 
    align-items: center; 
    justify-content: center;
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

export function MapScreen() {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter trips
  let filteredTrips = ALL_TRIPS;
  
  // Filter by saved status
  if (showSavedOnly) {
    filteredTrips = filteredTrips.filter(trip => SAVED_TRIP_IDS.includes(trip.id));
  }
  
  // Filter by tags
  if (selectedTags.length > 0) {
    filteredTrips = filteredTrips.filter(trip => 
      trip.tags.some(tag => selectedTags.includes(tag))
    );
  }

  if (showMap) {
    return (
      <div className="h-screen bg-background relative overflow-hidden">
        {/* Simple Map View */}
        <div className="absolute inset-0 z-0">
          <MapContainer
            center={[46.8, 8.2]}
            zoom={8}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredTrips.map((trip) => (
              <Marker
                key={trip.id}
                position={[trip.lat, trip.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => navigate(`/trip/${trip.id}`),
                }}
              >
                <Popup>
                  <div className="text-sm font-medium">{trip.title}</div>
                  <div className="text-xs text-gray-600">{trip.location}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => setShowMap(false)}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-black/[0.06]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2>Discover</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-colors ${
              showSavedOnly 
                ? "bg-primary text-white border-transparent" 
                : "bg-white border-black/[0.06]"
            }`}
          >
            <Heart className={`w-5 h-5 ${showSavedOnly ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => setShowMap(true)}
            className="w-10 h-10 rounded-full bg-white border border-black/[0.06] flex items-center justify-center shadow-sm"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-3">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        
        {showFilter && (
          <div className="bg-white rounded-2xl p-4 border border-black/[0.06] space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Activity Type</p>
              <div className="flex flex-wrap gap-2">
                {["Hiking", "Beach", "Culture", "Camping", "City", "Adventure", "Food"].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                      selectedTags.includes(t)
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Price Range</p>
              <div className="flex gap-2">
                <input className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm border border-black/[0.06]" placeholder="Min €" />
                <input className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm border border-black/[0.06]" placeholder="Max €" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Date</p>
              <input className="w-full bg-muted rounded-xl px-3 py-2 text-sm border border-black/[0.06]" placeholder="Select date range" />
            </div>

            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])}
                className="text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Trip List */}
      <div className="px-4 space-y-3">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
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
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{trip.title}</p>
                    <p className="text-xs text-muted-foreground">{trip.location}</p>
                  </div>
                  {SAVED_TRIP_IDS.includes(trip.id) && (
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                  )}
                </div>
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
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No trips found</p>
            <button 
              onClick={() => {setShowSavedOnly(false); setSelectedTags([]);}}
              className="text-xs text-primary mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
