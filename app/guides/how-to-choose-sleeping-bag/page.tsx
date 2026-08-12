import { redirect } from "next/navigation";

export default function RedirectPage() {
  redirect("/guides/how-to-choose-a-sleeping-bag");
}

export const metadata = {
  robots: { index: false, follow: true },
};
