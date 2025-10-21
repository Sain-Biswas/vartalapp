import { createFileRoute } from "@tanstack/react-router";

function IndexPage() {
  return (
    <main>
      <div className="font-bold text-lg">Learn React</div>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: IndexPage
});
