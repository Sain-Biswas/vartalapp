import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "@web/lib/trpc";

function Test() {
  const { data } = useSuspenseQuery(
    trpc.home.greeting.queryOptions({ name: "Sain Biswas" })
  );

  return <div>{data.greeting}</div>;
}

function IndexPage() {
  return (
    <main>
      <div className="font-bold text-lg">Learn React</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: IndexPage
});
