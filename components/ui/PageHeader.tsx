type PageHeaderProps = {
  title:       string;
  description?: string;
  badge?:      React.ReactNode;
  actions?:    React.ReactNode;
  className?:  string;
};

export default function PageHeader({ title, description, badge, actions, className = "" }: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 ${className}`}>
      <div className="space-y-1">
        {badge && <div className="mb-1">{badge}</div>}
        <h1 className="text-lg font-bold text-white/90 leading-tight">{title}</h1>
        {description && (
          <p className="text-xs text-white/35 max-w-xl leading-relaxed">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </div>
  );
}
