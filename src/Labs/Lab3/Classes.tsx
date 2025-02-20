import "./Classes.css";

export default function Classes() {
  const color = "blue"; // Dynamically assigned color
  const dangerous = true; // Conditional styling toggle

  return (
    <div id="wd-classes">
      <h2>Classes</h2>

      {/* Static Classes */}
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>
      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>
      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>

      <hr />

      {/* Dynamic Class (Changes based on `color` variable) */}
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic {color.charAt(0).toUpperCase() + color.slice(1)} background
      </div>

      <hr />

      {/* Conditional Class (Red if `dangerous` is true, Green otherwise) */}
      <div className={`${dangerous ? "wd-bg-red" : "wd-bg-green"} wd-fg-black wd-padding-10px`}>
        {dangerous ? "Dangerous" : "Safe"} background
      </div>
    </div>
  );
}
