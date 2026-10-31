import Link from "next/link";
import { ButtonLink, PhoneIcon, Section } from "@/components/ui";
import { business } from "@/lib/business";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-[620px] py-9 text-center">
        <p className="text-xs font-semibold tracking-[0.08em] text-primary">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          We could not find that page
        </h1>
        <p className="mt-4 text-base text-muted">
          The link may be out of date. Whatever you were after, the quickest
          route is still the phone — somebody answers {business.hours}.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={business.phoneHref} size="lg">
            <PhoneIcon />
            {business.phone}
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="outline">
            Back to the homepage
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted">
          Or browse{" "}
          <Link
            href="/services"
            className="font-semibold text-primary underline transition-colors duration-150 ease-standard hover:text-primary"
          >
            all our services
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
