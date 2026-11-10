import { useEffect, useState } from "react";

// Replaces Dust's useFile: loads a file from the public/ folder.
export function useFile(path: string): Blob | null {
  const [blob, setBlob] = useState<Blob | null>(null);
  useEffect(() => {
    let alive = true;
    const url = `${import.meta.env.BASE_URL}${path.replace(/^\.\//, "")}`;
    fetch(url)
      .then((r) => (r.ok ? r.blob() : null))
      .then((b) => {
        if (alive) setBlob(b);
      })
      .catch(() => {
        if (alive) setBlob(null);
      });
    return () => {
      alive = false;
    };
  }, [path]);
  return blob;
}

// Replaces Dust's triggerUserFileDownload: standard browser download.
export function triggerUserFileDownload({ content, filename }: { content: Blob | string; filename: string }) {
  const blob = typeof content === "string" ? new Blob([content], { type: "text/plain" }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
