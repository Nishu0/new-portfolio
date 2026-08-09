import { profile } from "@/lib/data";

export function StatusBar() {
  return (
    <div className="statusBar">
      <span className="statusDot" />
      <span className="statusText">{profile.status}</span>
    </div>
  );
}
