import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  MailOpen,
  Trash2,
  X,
  Reply,
  Hammer,
  CalendarCheck,
  Mic2,
  Inbox,
  RefreshCw,
} from "lucide-react";
import PillButton from "@/components/PillButton";
import { inquiryLabels, type ContactMessage, type InquiryType } from "@/data/messages";
import { deleteMessage, fetchMessages, markMessageRead, replyToMessage, saveMessages, useMessages } from "@/data/messagesStore";
import { toast } from "sonner";

const inquiryIcons: Record<InquiryType, typeof Hammer> = {
  project: Hammer,
  consultation: CalendarCheck,
  speaking: Mic2,
};

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "project", label: "Projects" },
  { id: "consultation", label: "Consultations" },
  { id: "speaking", label: "Speaking" },
] as const;

type Filter = (typeof filters)[number]["id"];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

export default function AdminMessages() {
  const messages = useMessages();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState<ContactMessage | null>(null);
  
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const unread = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((m) => {
    if (filter === "all") return true;
    if (filter === "unread") return !m.read;
    return m.inquiry === filter;
  });

  const openMessage = (m: ContactMessage) => {
    setOpen(m);
    setReplyText("");
    if (!m.read) void markMessageRead(m.id, true);
  };

  const handleSendReply = async () => {
    if (!open || !replyText.trim()) return;

    setSendingReply(true);
    try {
      const updated = await replyToMessage(open.id, replyText.trim());
      setOpen(updated);
      toast.success("Reply sent successfully!");
      setReplyText("");
    } catch (err) {
      console.error("Reply failed:", err);
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = () => {
    if (!deleting) return;
    void deleteMessage(deleting.id);
    if (open?.id === deleting.id) setOpen(null);
    setDeleting(null);
  };

  const clearAll = () => saveMessages([]);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Messages
          </h1>
          <p className="mt-2 text-white/60">
            {messages.length} message{messages.length === 1 ? "" : "s"}
            {unread > 0 && <> · <span className="text-[#e9c766]">{unread} unread</span></>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              setRefreshing(true);
              await fetchMessages();
              setRefreshing(false);
            }}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.id
                ? "bg-[#d4a017]/15 text-[#e9c766]"
                : "border border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            {f.label}
            {f.id === "unread" && unread > 0 && (
              <span className="ml-2 rounded-full bg-[#d4a017] px-1.5 py-0.5 text-[10px] font-bold text-black">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        <AnimatePresence>
          {filtered.map((m) => {
            const Icon = inquiryIcons[m.inquiry];
            return (
              <motion.button
                key={m.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                onClick={() => openMessage(m)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                  m.read
                    ? "border-white/10 bg-[#141414]"
                    : "border-[#d4a017]/30 bg-[#d4a017]/5"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    m.read ? "bg-white/5 text-white/40" : "bg-[#d4a017]/15 text-[#e9c766]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {!m.read && <span className="h-2 w-2 rounded-full bg-[#d4a017]" />}
                    <h3 className={`font-semibold ${m.read ? "text-white/70" : "text-white"}`}>
                      {m.name}
                    </h3>
                    <span className="rounded-full bg-[#3d5a8c]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8fb4e8]">
                      {inquiryLabels[m.inquiry]}
                    </span>
                    {(m.replies?.length ?? 0) > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#d4a017]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#e9c766]">
                        <Reply className="h-3 w-3" />
                        {m.replies!.length} {m.replies!.length === 1 ? "reply" : "replies"}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-white/50">{m.message}</p>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-xs text-white/40">{formatDate(m.createdAt)}</p>
                  <p className="text-xs text-white/30">{formatTime(m.createdAt)}</p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-[#141414] py-16 text-white/50">
            <Inbox className="h-10 w-10 text-white/20" />
            <p>
              {messages.length === 0
                ? "No messages yet — they'll appear here when someone submits the contact form."
                : "Nothing matches this filter."}
            </p>
          </div>
        )}
      </div>

      {/* Message detail modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141414]"
              role="dialog"
              aria-modal="true"
            >
              {/* Thread header */}
              <div className="border-b border-white/10 p-5 pr-14 sm:p-6 sm:pr-14">
                <button
                  onClick={() => setOpen(null)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-white/60 hover:bg-white/5 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#3d5a8c]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#8fb4e8]">
                  {inquiryLabels[open.inquiry]}
                </span>

                <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {open.name}
                </h2>
                <p className="mt-1 text-sm text-white/50">{open.email}</p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      void markMessageRead(open.id, !open.read);
                      setOpen({ ...open, read: !open.read });
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/60 hover:bg-white/5 hover:text-white"
                  >
                    {open.read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
                    {open.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => setDeleting(open)}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-red-400/80 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Thread — visitor bubbles left, your replies right */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-[#0d0d0f]/50 p-5 sm:p-6">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 p-4">
                    <div className="mb-1.5 text-xs font-semibold text-white/40">
                      {open.name} · {formatDate(open.createdAt)} at {formatTime(open.createdAt)}
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                      {open.message}
                    </p>
                  </div>
                </div>

                {(open.replies ?? []).map((r, i) => (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-[#d4a017]/30 bg-[#d4a017]/15 p-4">
                      <div className="mb-1.5 text-xs font-semibold text-[#e9c766]">
                        You · {formatDate(r.at)} at {formatTime(r.at)}
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/90">
                        {r.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Composer */}
              <div className="border-t border-white/10 p-4 sm:p-5">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${open.name}...`}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#d4a017]/50 focus:bg-[#d4a017]/5"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-white/30">Sent by email to {open.email}</p>
                  <PillButton
                    variant="gold"
                    size="sm"
                    onClick={handleSendReply}
                    loading={sendingReply}
                    disabled={sendingReply || !replyText.trim()}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Reply className="h-3.5 w-3.5" />
                      {sendingReply ? "Sending..." : "Send Reply"}
                    </span>
                  </PillButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleting && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleting(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#141414] p-8 text-center"
              role="dialog"
              aria-modal="true"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-400">
                <Trash2 className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-white">
                Delete message?
              </h2>
              <p className="mt-2 text-sm text-white/60">
                The message from {deleting.name} will be removed permanently.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeleting(null)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
