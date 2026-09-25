import { useRef, useState } from "react";
import { ImagePlus, Link2, Trash2, Upload } from "lucide-react";
import { api, getToken } from "@/utils/api";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/20";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  /** Max width uploads are resized to (keeps localStorage small). */
  maxWidth?: number;
  /** Preview aspect ratio classes, e.g. "aspect-video" or "h-24 w-24". */
  previewClass?: string;
}

function fileToResizedDataUrl(file: File, maxWidth: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= maxWidth) {
          resolve(String(reader.result));
          return;
        }
        const scale = maxWidth / img.width;
        const canvas = document.createElement("canvas");
        canvas.width = maxWidth;
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("Could not read image"));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  error,
  label = "Image",
  maxWidth = 1200,
  previewClass = "h-32 w-full",
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [urlMode, setUrlMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState("");

  /** Upload to the API (Cloudinary) when authed — returns null on failure. */
  const uploadToApi = async (file: File): Promise<string | null> => {
    if (!getToken()) return null;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await api<{ url: string }>("/upload", { method: "POST", formData });
      return res.url;
    } catch {
      return null;
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file");
      return;
    }
    setBusy(true);
    setUploadError("");
    try {
      // Prefer Cloudinary via the API; fall back to an inline data URL offline.
      const url = await uploadToApi(file);
      onChange(url ?? (await fileToResizedDataUrl(file, maxWidth)));
      setUrlMode(false);
    } catch {
      setUploadError("Could not load that image");
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const hasImage = Boolean(value);

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white/80">{label}</label>

      {hasImage ? (
        <div className="group relative overflow-hidden rounded-xl border border-white/10">
          <img src={value} alt="Preview" className={`${previewClass} object-cover`} />
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <Upload className="h-3.5 w-3.5" /> Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500/80 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : urlMode ? (
        <div className="space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/…"
            className={inputClass}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setUrlMode(false)}
            className="text-xs font-semibold text-white/50 hover:text-white"
          >
            ← Back to upload
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={busy}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-8 text-white/50 transition-colors hover:border-[#d4a017]/40 hover:bg-[#d4a017]/5 hover:text-[#d4a017] disabled:opacity-50"
          >
            <ImagePlus className="h-7 w-7" />
            <span className="text-sm font-semibold">
              {busy ? "Processing…" : "Click to upload an image"}
            </span>
            <span className="text-[11px] text-white/30">PNG, JPG, WebP, SVG — resized automatically</span>
          </button>
          <button
            type="button"
            onClick={() => setUrlMode(true)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-[#d4a017]"
          >
            <Link2 className="h-3 w-3" /> Or paste an image URL
          </button>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {(error || uploadError) && (
        <p className="mt-1.5 text-xs text-red-400">{error || uploadError}</p>
      )}
    </div>
  );
};

export default ImageUploadField;
