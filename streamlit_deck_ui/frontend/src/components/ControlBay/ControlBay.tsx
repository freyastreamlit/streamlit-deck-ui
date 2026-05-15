import "./ControlBay.css";

type ControlBayProps = {
  children: React.ReactNode;
};

export function ControlBay({
  children,
}: ControlBayProps) {
  return (
    <div className="control-bay">
      {children}
    </div>
  );
}

