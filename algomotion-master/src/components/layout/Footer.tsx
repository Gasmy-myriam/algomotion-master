export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AlgoMotion. All rights reserved.</p>
        <p className="text-sm">Designed to make algorithms understandable.</p>
      </div>
    </footer>
  );
}
