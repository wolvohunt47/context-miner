import { Link } from "@tanstack/react-router";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="bg-night text-night-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-night-muted">Discover, Learn, Build and Earn with AI. Find the right AI for what you want to accomplish.</p>
        </div>
        <div>
          <h4 className="font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-night-muted">
            <li><Link to="/finder">AI Finder</Link></li>
            <li><Link to="/compare">Compare Models</Link></li>
            <li><Link to="/news">AI News</Link></li>
            <li><Link to="/tools">Tools</Link></li><li><Link to="/categories">Categories</Link></li><li><Link to="/learn">Learn</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Trust</h4>
          <ul className="mt-3 space-y-2 text-sm text-night-muted">
            <li><Link to="/methodology">Methodology</Link></li><li><Link to="/editorial-policy">Editorial Policy</Link></li><li><Link to="/affiliate-disclosure">Affiliate Disclosure</Link></li><li><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></li><li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">AI Bazaar Brief</h4>
          <p className="mt-3 text-sm text-night-muted">A short weekly digest: 3 developments, 2 tools, 1 rising project, 1 workflow.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="Enter your email" className="min-w-0 flex-1 rounded-lg border border-night-border bg-night-2 px-3 py-2 text-sm placeholder:text-night-muted" />
            <button className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-night-border py-5 text-center text-xs text-night-muted">© 2026 BazaarAI.si · Listings shown are demo data</div>
    </footer>
  );
}
