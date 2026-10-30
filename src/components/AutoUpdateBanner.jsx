import React, { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, X } from 'lucide-react';

export default function AutoUpdateBanner() {
  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [initialVersion, setInitialVersion] = useState(null);

  useEffect(() => {
    // Determine the base path for version.json
    const getVersionUrl = () => {
      const baseUrl = import.meta.env.BASE_URL || './';
      return `${baseUrl.replace(/\/$/, '')}/version.json?_t=${Date.now()}`;
    };

    const checkVersion = async () => {
      try {
        const res = await fetch(getVersionUrl(), { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const remoteVersion = data.version;

        if (!initialVersion) {
          setInitialVersion(remoteVersion);
        } else if (remoteVersion && remoteVersion !== initialVersion) {
          setHasNewVersion(true);
        }
      } catch (e) {
        // Silently fail if offline or initial load
      }
    };

    // Check on mount
    checkVersion();

    // Check periodically every 45 seconds
    const interval = setInterval(checkVersion, 45000);

    // Check whenever user switches back to this tab
    const handleFocus = () => checkVersion();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [initialVersion]);

  const handleUpdate = () => {
    setIsUpdating(true);
    // Hard reload without using cached assets
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  if (!hasNewVersion) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-400 flex items-center gap-3 backdrop-blur-md">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div>
          <div className="text-xs font-bold">New Version Available!</div>
          <div className="text-[11px] text-indigo-100">A new update was just deployed.</div>
        </div>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="ml-2 px-3 py-1.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
          <span>{isUpdating ? 'Updating...' : 'Update Now'}</span>
        </button>
        <button
          onClick={() => setHasNewVersion(false)}
          className="p-1 text-white/60 hover:text-white rounded-lg ml-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
