import { redirect } from "next/navigation";

export default function RedirectPage() {
  redirect("/reviews/best-hiking-boots");
}

export const metadata = {
  robots: { index: false, follow: true },
};
