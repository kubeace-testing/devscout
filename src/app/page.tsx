import TodoApp from "@/components/TodoApp";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-3xl font-bold">Todo App</h1>
      <p className="mt-2 text-sm opacity-70">
        Keep track of what you need to get done.
      </p>
      <TodoApp />
    </main>
  );
}
