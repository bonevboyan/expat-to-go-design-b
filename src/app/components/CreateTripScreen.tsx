import { useState } from "react";
import { useNavigate } from "react-router";

const TAGS = ["Hiking", "Beach", "Culture", "Camping", "Nature", "City", "Food", "Adventure"];

export function CreateTripScreen() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-4 pb-2">
        <h2>Create Trip</h2>
      </div>

      <div className="px-4 space-y-3 pb-20">
        {/* Photo placeholder */}
        <div className="w-full h-32 bg-[#FDF8F0] border-2 border-dashed border-[#FF6B35] rounded-xl flex flex-col items-center justify-center text-sm text-[#FF6B35] cursor-pointer hover:bg-[#FFF5E6] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          <span>Add cover photo</span>
        </div>

        <input className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white" placeholder="Trip Name" />
        <input className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white" placeholder="Destination" />

        <div className="grid grid-cols-2 gap-2">
          <input className="border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white text-sm" type="date" />
          <input className="border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white text-sm" type="date" />
        </div>

        <input className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white" placeholder="Meeting Point (Maps link)" />

        <div className="grid grid-cols-2 gap-2">
          <input className="border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white text-sm" placeholder="Min participants" type="number" />
          <input className="border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white text-sm" placeholder="Max participants" type="number" />
        </div>

        <textarea className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white min-h-[80px] resize-none text-sm" placeholder="Description..." />
        <textarea className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white min-h-[60px] resize-none text-sm" placeholder="Itinerary..." />

        {/* Tags */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 rounded-lg text-xs border ${
                  selectedTags.includes(tag) ? "bg-primary text-white border-transparent" : "border-black/[0.06] bg-white"
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
                className={`flex-1 py-2 rounded-xl text-sm border capitalize ${
                  visibility === v ? "bg-primary text-white border-transparent" : "border-black/[0.06] bg-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <input className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white" placeholder="Budget estimate (e.g. €25-40)" />
        <input className="w-full border border-black/[0.06] rounded-xl px-3 py-2.5 bg-white" placeholder="Transport method" />
      </div>

      {/* Bottom action button */}
      <div className="fixed bottom-14 left-0 right-0 px-4 py-3 bg-background border-t border-black/[0.06]">
        <div className="max-w-md mx-auto">
          <button onClick={() => navigate("/")} className="w-full bg-primary text-white py-3 rounded-xl text-sm">
            Create Trip
          </button>
        </div>
      </div>
    </div>
  );
}
