import {
  BrushCleaning,
  ChevronRight,
  Info,
  User,
} from "lucide-react";

type HomeMenuButtonProps = {
  icon: "cleaning" | "staff" | "information";
  title: string;
  subtitle: string;
  onClick?: () => void;
};

function HomeMenuButton({
  icon,
  title,
  subtitle,
  onClick,
}: HomeMenuButtonProps) {
  function renderIcon() {
    switch (icon) {
      case "cleaning":
        return <BrushCleaning size={26} />;

      case "staff":
        return <User size={26} />;

      case "information":
        return <Info size={26} />;
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-start
        rounded-2xl
        bg-green-600
        px-5
        py-4
        text-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-green-700
        hover:shadow-lg
      "
    >
      <div className="mt-1 flex w-10 justify-center">
        {renderIcon()}
      </div>

      <div className="ml-3 flex-1 text-left">

        <div className="text-lg font-semibold">
          {title}
        </div>

        <div
          className="
            mt-1
            max-h-0
            overflow-hidden
            text-sm
            leading-5
            text-green-100
            opacity-0
            transition-all
            duration-300
            group-hover:mt-2
            group-hover:max-h-16
            group-hover:opacity-100
          "
        >
          {subtitle}
        </div>

      </div>

      <div className="mt-1">
        <ChevronRight
          size={22}
          className="
            opacity-70
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </button>
  );
}

export default HomeMenuButton;