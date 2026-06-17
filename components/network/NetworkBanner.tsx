import Image from 'next/image';

/** "RAIN CLOUD UKRAINA — <title>" banner (Figma). Dark wordmark on a light
 * glass card with the global-connections globe bleeding off the right edge.
 * Reused across directory pages (Network, Companies, …). */
export function NetworkBanner({ title = 'Network' }: { title?: string }) {
  return (
    <section className="net-banner">
      <Image
        className="net-banner__globe"
        src="/brand/network-globe.png"
        alt=""
        width={442}
        height={176}
        priority
      />
      <div className="net-banner__inner">
        <span className="net-banner__tagline">
          Powering global business to build the new Ukraine
        </span>
        {/* Plain <img>: fixed height + width:auto keeps the wordmark's true
            aspect ratio (next/image in a flex column stretched it full-width).
            eslint-disable-next-line @next/next/no-img-element */}
        <img className="net-banner__logo" src="/brand/logo-raincloud-dark.png" alt="RainCloud Ukraina" />
        <h1 className="net-banner__title">{title}</h1>
      </div>
    </section>
  );
}
