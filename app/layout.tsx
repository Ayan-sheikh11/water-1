import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { ClientLayout } from "@/components/ClientLayout";
export const metadata = {
  title: "PureFlow Water",
  description: "Premium Karachi water delivery storefront",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ClientLayout>{children}</ClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
