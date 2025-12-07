const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  active: boolean;
}) => (
  <a href={href}>
    <div
      className={`
        flex items-center gap-4 px-4 py-2 rounded-sm cursor-pointer
        ease-in-out duration-300
        hover:bg-gray-300 dark:hover:bg-gray-700
        ${active ? "bg-gray-200 dark:bg-gray-900 shadow-md" : "bg-transparent"}
      `}
    >
      <Icon className="size-6" />
      <span className="text-lg font-semibold whitespace-nowrap">{label}</span>
    </div>
  </a>
);

export default SidebarItem;
