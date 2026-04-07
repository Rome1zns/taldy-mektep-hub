import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="text-center font-mono">
        <h1 className="mb-4 text-6xl font-bold text-primary text-glow-strong">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          &gt; signal_lost: route <span className="text-primary">{location.pathname}</span> not found
        </p>
        <a href="/" className="terminal-btn">
          ↩ return_home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
