import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  return (
    <div>
      <h1 className="text-white">Hello world!</h1>
    </div>
  );
}
