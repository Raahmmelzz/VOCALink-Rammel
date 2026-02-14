type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export default function AuthLayout({ left, right }: Props) {
  return (
    <div className="auth-shell">
      <div className="auth-left">{left}</div>
      <div className="auth-right">{right}</div>
    </div>
  );
}