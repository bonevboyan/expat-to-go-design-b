import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

const TAGS = ["Hiking", "Beach", "Culture", "Camping", "Nature", "City", "Food", "Adventure"];

const TRIP_DATA: Record<string, any> = {
  "5": {
    title: "Mountain Trek",
    location: "Swiss Alps",
    date: "2026-06-10",
    endDate: "2026-06-12",
    minParticipants: 4,
    maxParticipants: 10,
    meetingPoint: "Zurich HB Station",
    budget: "€50-80",
    transport: "Train + Cable Car",
    description: "An amazing trek through the Swiss Alps with breathtaking views.",
    itinerary: "Day 1: Meet at Zurich, train to base\nDay 2: Trek to summit\nDay 3: Return",
    tags: ["Hiking", "Nature"],
    visibility: "public",
  },
};

export function EditTripScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const trip = TRIP_DATA[id || "5"] || TRIP_DATA["5"];
  
  const [title, setTitle] = useState(trip.title);
  const [location, setLocation] = useState(trip.location);
  const [date, setDate] = useState(trip.date);
  const [endDate, setEndDate] = useState(trip.endDate);
  const [meetingPoint, setMeetingPoint] = useState(trip.meetingPoint);
  const [minParticipants, setMinParticipants] = useState(trip.minParticipants);
  const [maxParticipants, setMaxParticipants] = useState(trip.maxParticipants);
  const [description, setDescription] = useState(trip.description);
  const [itinerary, setItinerary] = useState(trip.itinerary);
  const [selectedTags, setSelectedTags] = useState<string[]>(trip.tags);
  const [visibility, setVisibility] = useState<"public" | "private">(trip.visibility);
  const [budget, setBudget] = useState(trip.budget);
  const [transport, setTransport] = useState(trip.transport);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const handleSave = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <button 
          onClick={() => navigate(-1)} 
          className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2>Edit Trip</h2>
      </div>

      <div className="px-4 space-y-3 pb-20">
        {/* Photo placeholder */}
        <div className="w-full h-32 bg-[#FDF8F0] border-2 border-dashed border-[#FF6B35] rounded-xl flex flex-col items-center justify-center text-sm text-[#FF6B35] cursor-pointer hover:bg-[#FFF5E6] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          <span>Change cover photo</span>
        </div>

        <input 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white" 
          placeholder="Trip Name" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white" 
          placeholder="Destination" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <input 
            className="border border-border rounded-md px-3 py-2.5 bg-white text-sm" 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input 
            className="border border-border rounded-md px-3 py-2.5 bg-white text-sm" 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <input 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white" 
          placeholder="Meeting Point (Maps link)" 
          value={meetingPoint}
          onChange={(e) => setMeetingPoint(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <input 
            className="border border-border rounded-md px-3 py-2.5 bg-white text-sm" 
            placeholder="Min participants" 
            type="number" 
            value={minParticipants}
            onChange={(e) => setMinParticipants(Number(e.target.value))}
          />
          <input 
            className="border border-border rounded-md px-3 py-2.5 bg-white text-sm" 
            placeholder="Max participants" 
            type="number" 
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
          />
        </div>

        <textarea 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white min-h-[80px] resize-none text-sm" 
          placeholder="Description..." 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white min-h-[60px] resize-none text-sm" 
          placeholder="Itinerary..." 
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
        />

        {/* Tags */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 rounded text-xs border ${
                  selectedTags.includes(tag) ? "bg-primary text-white border-primary" : "border-border bg-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Visibility</p>
          <div className="flex gap-2">
            {(["public", "private"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVisibility(v)}
                className={`flex-1 py-2 rounded-md text-sm border capitalize ${
                  visibility === v ? "bg-primary text-white border-primary" : "border-border bg-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <input 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white" 
          placeholder="Budget estimate (e.g. €25-40)" 
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input 
          className="w-full border border-border rounded-md px-3 py-2.5 bg-white" 
          placeholder="Transport method" 
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />

      </div>

      {/* Bottom action buttons */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-background border-t border-border">
        <div className="max-w-md mx-auto flex gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 border border-border bg-white text-foreground py-3 rounded-md text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 bg-primary text-white py-3 rounded-md text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
