function Footer() {

  return (
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <nav>
            <header className="footer-title">League Planner</header>
            <a className="link link-hover">Home Page</a>
            <a className="link link-hover">All Leagues</a>
            <a className="link link-hover">Your Leagues</a>
            <a className="link link-hover">Create League</a>
        </nav>
        <nav>
            <header className="footer-title">About</header>
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Join Community</a>
        </nav>
        <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of Use</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Cookie Policy</a>
        </nav>
      </footer>
  );
}

export default Footer;