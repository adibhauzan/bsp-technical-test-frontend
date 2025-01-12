export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex-1 h-full p-0 overflow-x-hidden panel">
        {children}
      </div>
    </main>
  );
}
