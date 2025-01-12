export default function ManageDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="panel h-full flex-1 overflow-x-visible p-0">
        {children}
      </div>
    </main>
  );
}
