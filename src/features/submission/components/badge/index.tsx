const statusStyles: Record<string, string> = {
  Active: "bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-100",
  Pending:
    "bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100",
  Default: "bg-red-100 dark:bg-red-700 text-red-900 dark:text-red-100",
};

const Badge = ({ status }: { status: string }) => {
  const style = statusStyles[status] ?? statusStyles.Default;

  return (
    <div className={`rounded-xl p-2 font-semibold ${style}`}>{status}</div>
  );
};

export default Badge;