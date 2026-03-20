import { useSelector } from 'react-redux';

export const SectionHeader = ({ title, description, Icon, children }) => {
  const { colors } = useSelector((state) => state.theme);

  return (
    <>
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 p-5"
        style={{ background: colors.card }}
      >
        <div>
          <h1
            className="text-4xl font-bold mb-2 flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.accentHover}20 100%)`,
              }}
            >
              {Icon && <Icon size={28} style={{ color: colors.accent }} />}
            </div>
            {title}
          </h1>
        </div>

        {/* Right side */}
        <section>{children}</section>
      </div>
    </>
  );
};