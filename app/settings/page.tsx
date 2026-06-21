"use client";

import { useState } from "react";

type Theme = "dark" | "darker" | "light";
type Language = "th" | "en";

interface SettingsState {
  theme: Theme;
  language: Language;
  notifications: {
    email: boolean;
    push: boolean;
    weeklyReport: boolean;
    labReminder: boolean;
  };
  display: {
    compactMode: boolean;
    showXP: boolean;
    showStreak: boolean;
    animationsEnabled: boolean;
  };
}

const defaultSettings: SettingsState = {
  theme: "dark",
  language: "th",
  notifications: { email: true, push: true, weeklyReport: true, labReminder: false },
  display: { compactMode: false, showXP: true, showStreak: true, animationsEnabled: true },
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-sky-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-700/50 bg-gray-800/40 p-6 mb-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700/30 last:border-0">
      <div>
        <p className="text-gray-200 text-sm font-medium">{label}</p>
        {description && <p className="text-gray-500 text-xs mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  function updateNotification(key: keyof SettingsState["notifications"], val: boolean) {
    setSettings((s) => ({ ...s, notifications: { ...s.notifications, [key]: val } }));
  }

  function updateDisplay(key: keyof SettingsState["display"], val: boolean) {
    setSettings((s) => ({ ...s, display: { ...s.display, [key]: val } }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleResetProgress() {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 4000);
      return;
    }
    setResetConfirm(false);
    alert("Progress reset — requires backend integration");
  }

  return (
    <div className="min-h-screen bg-[#050816] text-gray-200 p-6 md:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sky-400">Settings</h1>
        <p className="text-gray-400 mt-1 text-sm">ปรับแต่งประสบการณ์การเรียนรู้ของคุณ</p>
      </div>

      <Section title="Theme" icon="🎨">
        <Row label="Color Theme" description="เลือก theme ที่ใช้แสดงผล">
          <div className="flex gap-2">
            {(["dark", "darker", "light"] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setSettings((s) => ({ ...s, theme: t }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  settings.theme === t
                    ? "border-sky-500 bg-sky-500/20 text-sky-400"
                    : "border-gray-600 text-gray-400 hover:border-gray-500"
                }`}
              >
                {t === "dark" ? "🌙 Dark" : t === "darker" ? "⬛ OLED" : "☀️ Light"}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      <Section title="Language / ภาษา" icon="🌐">
        <Row label="Interface Language" description="ภาษาที่ใช้แสดงใน UI">
          <div className="flex gap-2">
            {(["th", "en"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setSettings((s) => ({ ...s, language: l }))}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  settings.language === l
                    ? "border-sky-500 bg-sky-500/20 text-sky-400"
                    : "border-gray-600 text-gray-400 hover:border-gray-500"
                }`}
              >
                {l === "th" ? "🇹🇭 ไทย" : "🇬🇧 English"}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      <Section title="Notifications" icon="🔔">
        <Row label="Email Notifications" description="รับสรุปความก้าวหน้าทาง email">
          <Toggle checked={settings.notifications.email} onChange={(v) => updateNotification("email", v)} />
        </Row>
        <Row label="Push Notifications" description="แจ้งเตือน lab ใหม่และ quiz">
          <Toggle checked={settings.notifications.push} onChange={(v) => updateNotification("push", v)} />
        </Row>
        <Row label="Weekly Report" description="รายงานสรุปรายสัปดาห์">
          <Toggle checked={settings.notifications.weeklyReport} onChange={(v) => updateNotification("weeklyReport", v)} />
        </Row>
        <Row label="Lab Reminder" description="เตือนให้ทำ lab ที่ยังค้างไว้">
          <Toggle checked={settings.notifications.labReminder} onChange={(v) => updateNotification("labReminder", v)} />
        </Row>
      </Section>

      <Section title="Display" icon="🖥️">
        <Row label="Compact Mode" description="แสดงผลแบบ compact ใช้พื้นที่น้อยลง">
          <Toggle checked={settings.display.compactMode} onChange={(v) => updateDisplay("compactMode", v)} />
        </Row>
        <Row label="Show XP Points" description="แสดงคะแนน XP บน dashboard">
          <Toggle checked={settings.display.showXP} onChange={(v) => updateDisplay("showXP", v)} />
        </Row>
        <Row label="Show Streak" description="แสดง streak การเรียนต่อเนื่อง">
          <Toggle checked={settings.display.showStreak} onChange={(v) => updateDisplay("showStreak", v)} />
        </Row>
        <Row label="Animations" description="เปิด/ปิด animation ใน UI">
          <Toggle checked={settings.display.animationsEnabled} onChange={(v) => updateDisplay("animationsEnabled", v)} />
        </Row>
      </Section>

      <Section title="Danger Zone" icon="⚠️">
        <Row label="Reset Learning Progress" description="ล้าง progress ทั้งหมด — ไม่สามารถกู้คืนได้">
          <button
            onClick={handleResetProgress}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              resetConfirm
                ? "border-red-400 bg-red-500/20 text-red-400 animate-pulse"
                : "border-red-700 text-red-500 hover:border-red-500 hover:bg-red-500/10"
            }`}
          >
            {resetConfirm ? "⚠️ กดอีกครั้งเพื่อยืนยัน" : "Reset Progress"}
          </button>
        </Row>
      </Section>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? "bg-green-500/20 border border-green-500 text-green-400"
              : "bg-sky-500 hover:bg-sky-400 text-white"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
