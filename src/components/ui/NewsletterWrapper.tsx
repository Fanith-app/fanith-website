"use client";

import NewsletterSubscribe from "@/src/components/NewsletterSubscribe";

export default function NewsletterWrapper() {
  return (
    <NewsletterSubscribe
      onSubmit={(email) => {
        console.log("Subscribed email:", email);
      }}
    />
  );
}