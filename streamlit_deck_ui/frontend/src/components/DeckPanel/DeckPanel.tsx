import "./DeckPanel.css";

type DeckPanelProps = {
  children: React.ReactNode;
  title?: string;
};

export function DeckPanel({
  children,
  title,
}: DeckPanelProps) {
  return (
    <div className="deck-panel">
      {title && (
        <div className="deck-panel-title">
          {title}
        </div>
      )}

      <div className="deck-panel-content">
        {children}
      </div>
    </div>
  );
}

