interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-semibold tracking-tight">{title}</div>
      <div className="text-md text-muted-foreground">{subtitle}</div>
    </div>
  );
};

export default Heading;
