"use client"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
}

const Button = ({ children, onClick, variant, size }: ButtonProps) => {

    const variantMap = new Map<string, string>();
    variantMap.set("primary", "bg-green-500 text-gray-900 hover:bg-green-400");
    variantMap.set("secondary", "bg-gray-900 text-green-400 border border-green-500 hover:bg-green-500 hover:text-gray-900");


    const sizeMap = new Map<string, string>();
    sizeMap.set("sm", "px-4 py-2 text-sm");
    sizeMap.set("md", "px-6 py-3 text-lg");
    sizeMap.set("lg", "px-8 py-4 text-xl");

    return (
      <button
        onClick={onClick}
        className={`rounded-full font-medium transition-colors cursor-pointer ${variantMap.get(variant)} ${size ? sizeMap.get(size) : sizeMap.get("md")}`}
      >
      {children}
    </button>
  );
};

export default Button;

