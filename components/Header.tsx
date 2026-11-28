export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3.25v4.5m-2.25-2.25h4.5M5 10.25h14v10.5H5zM8 20.75v-5h8v5M3.5 10.25 12 7l8.5 3.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <div>
            <p className="brand-name">Sacrament Meeting Planner</p>
            <p className="brand-ward">Meru Ward</p>
          </div>
        </div>
        <p className="header-tagline">Browse and print meeting programs</p>
      </div>
    </header>
  );
}
