import { FC } from "react";

interface IconInvoiceProps {
  className?: string;
}

const IconInvoice: FC<IconInvoiceProps> = ({ className }) => {
  return (
    <svg
      fill="#000000"
      height="24px"
      width="24px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 490 490"
      className={className}
    >
      <g>
        <path d="M490,30.625V15.313H0v15.313h45.908V336.92H0v15.313h197.041l-54.339,115.965l13.877,6.49l33.577-71.658h109.672l33.577,71.658l13.877-6.49l-54.339-115.965H490V336.92h-45.908V30.625H490z M292.653,387.717h-95.322l16.627-35.485h62.067L292.653,387.717z M428.78,336.92H61.22V30.625h367.56V336.92z" />
        <path d="M240.454,273.262l-31.417-86.118h-95.524l-31.418,86.118H240.454z M124.22,202.457h74.11l20.232,55.493H103.987L124.22,202.457z" />
        <path d="M249.531,273.262H407.89l-31.418-86.118h-95.524L249.531,273.262z M365.765,202.457l20.232,55.493H271.423l20.232-55.493H365.765z" />
        <path d="M292.762,88.316h-95.524l-31.433,86.103h158.374L292.762,88.316z M207.945,103.629h74.11l20.232,55.478h-114.59L207.945,103.629z" />
      </g>
    </svg>
  );
};

export default IconInvoice;
