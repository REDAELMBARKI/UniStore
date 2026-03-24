import { useSelector } from 'react-redux';

export function ToastViewport({ toasts, onRemove }) {
  const { colors } = useSelector((state) => state.theme);

  return (
    <>
      <style>{buildCss(colors)}</style>
      <div className="tv-viewport">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
}

function buildCss(c) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    .tv-viewport {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-end;
      pointer-events: none;
      width: 340px;
      max-width: calc(100vw - 32px);
    }

    .tv-toast {
      pointer-events: all;
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 14px 18px 14px;
      border-radius: 12px;
      border: 1px solid ${c.border ?? 'rgba(255,255,255,0.08)'};
      background: ${c.card ?? c.bg ?? '#1e1e2e'};
      box-shadow:
        0 2px 8px rgba(0,0,0,0.25),
        0 8px 24px rgba(0,0,0,0.2);
      overflow: hidden;
      cursor: default;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .tv-toast:hover {
      transform: translateY(-2px);
      box-shadow:
        0 4px 12px rgba(0,0,0,0.3),
        0 12px 32px rgba(0,0,0,0.25);
    }

    /* Left accent bar */
    .tv-toast::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--tv-accent);
      border-radius: 12px 0 0 12px;
    }

    .tv-icon-wrap {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--tv-accent) 15%, transparent);
      border: 1px solid color-mix(in srgb, var(--tv-accent) 25%, transparent);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--tv-accent);
      margin-top: 1px;
    }

    .tv-icon { width: 15px; height: 15px; }

    .tv-content { flex: 1; min-width: 0; }

    .tv-title {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.84rem;
      font-weight: 600;
      color: ${c.text ?? '#f1f5f9'};
      margin: 0 0 3px;
      line-height: 1.3;
    }

    .tv-desc {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.775rem;
      color: ${c.mutedText ?? c.sidebarMutedFg ?? 'rgba(148,163,184,0.8)'};
      margin: 0;
      line-height: 1.5;
    }

    .tv-action { margin-top: 8px; }

    .tv-close {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: transparent;
      border: 1px solid ${c.border ?? 'rgba(255,255,255,0.08)'};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: ${c.mutedText ?? c.sidebarMutedFg ?? 'rgba(148,163,184,0.6)'};
      transition: all 0.15s;
      padding: 0;
      margin-top: 2px;
    }

    .tv-close:hover {
      background: ${c.sidebarHover ?? 'rgba(255,255,255,0.08)'};
      color: ${c.text ?? '#f1f5f9'};
    }

    .tv-close svg { width: 10px; height: 10px; }

    /* Progress bar */
    .tv-bar-track {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: ${c.border ?? 'rgba(255,255,255,0.06)'};
    }

    .tv-bar {
      height: 100%;
      width: 100%;
      background: var(--tv-accent);
      transform-origin: left;
      transform: scaleX(1);
      transition-property: transform;
      transition-timing-function: linear;
    }

    /* Type accent colors */
    .tv-toast[data-type="success"] { --tv-accent: ${c.success ?? '#22c55e'}; }
    .tv-toast[data-type="error"]   { --tv-accent: ${c.error   ?? '#ef4444'}; }
    .tv-toast[data-type="info"]    { --tv-accent: ${c.accent  ?? '#3b82f6'}; }

    /* Enter / leave animations */
    @keyframes tv-in {
      from { opacity: 0; transform: translateX(16px) scale(0.97); }
      to   { opacity: 1; transform: translateX(0)    scale(1);    }
    }

    @keyframes tv-out {
      from { opacity: 1; transform: translateX(0)    scale(1);    max-height: 200px; margin-bottom: 0;   }
      to   { opacity: 0; transform: translateX(16px) scale(0.96); max-height: 0;     margin-bottom: -10px; }
    }

    .tv-enter { animation: tv-in  0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .tv-leave { animation: tv-out 0.32s cubic-bezier(0.4,  0, 1,    1) forwards; }
  `;
}