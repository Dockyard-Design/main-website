import Image from "next/image";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="nf-page">
      <div className="nf-bg" />
      <div className="nf-left-line" />
      <div className="nf-bottom-line" />

      <section className="nf-shell">
        <div className="nf-copy">
          <Image
            src="/logo.svg"
            alt="Dockyard"
            width={184}
            height={46}
            priority
            className="nf-logo"
          />

          <p className="nf-kicker">
            <Compass className="nf-icon-kicker" />
            Navigation lost
          </p>

          <h1 className="nf-title">This page drifted off course.</h1>

          <p className="nf-description">
            The link may be outdated, moved, or restricted. Head back to the
            portal and continue from a known route.
          </p>

          <div className="nf-actions">
            <Link href="/" className="nf-button">
              <Home className="nf-icon-button" />
              Sail home
            </Link>
          </div>
        </div>

        <div className="nf-card">
          <div className="nf-card-accent" />
          <div className="nf-panel">
            <div className="nf-panel-header">
              <span className="nf-panel-label">Route check</span>
              <span className="nf-status">404</span>
            </div>

            <div className="nf-radar">
              <div className="nf-orbit nf-orbit-lg" />
              <div className="nf-orbit nf-orbit-sm" />
              <div className="nf-ray nf-ray-primary" />
              <div className="nf-ray nf-ray-border" />
              <div className="nf-code">404</div>
            </div>

            <div className="nf-panel-footer">
              <span>Request</span>
              <span>Unmatched</span>
              <span>No index</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
