import TimelineCard from "./TimelineCard";
import type { TimelineItem } from "@/data/schedule";

const DayTimeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <div className="max-w-2xl mx-auto">
      {items.map((item, i) => (
        <TimelineCard key={i} item={item} />
      ))}
    </div>
  );
};

export default DayTimeline;
