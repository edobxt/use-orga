export default function ManageAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040c72] to-[#000] flex pt-20">
      <div className="text-white p-2 max-w-screen-lg mx-auto">
        {children}
      </div>
    </div>
  );
}
