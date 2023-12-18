import Link from "next/link";
import classNames from "clsx";
import { cva } from "class-variance-authority";

import If from "./If";
import Spinner from "./spinner";
import { forwardRef } from "react";

type Color =
  | "primary"
  | "secondary"
  | "pink"
  | "transparent"
  | "danger"
  | "custom"
  | "gray";
type Size = "normal" | "small" | "large" | "custom";
type Variant = `normal` | `outline` | `flat`;

type Props = React.ButtonHTMLAttributes<unknown> &
  React.PropsWithChildren<{
    block?: boolean;
    round?: boolean;
    color?: Color;
    size?: Size;
    variant?: Variant;
    loading?: boolean;
    href?: Maybe<string>;
  }>;

const classNameBuilder = getClassNameBuilder();
const defaultColor: Color = `primary`;
const defaultSize: Size = `normal`;
const defaultVariant = `normal`;

const Button: React.FCC<Props> = forwardRef<React.ElementRef<"button">, Props>(
  function ButtonComponent(
    { children, color, size, variant, block, loading, href, round, ...props },
    ref
  ) {
    const className = classNames(
      classNameBuilder({
        variant: variant ?? defaultVariant,
        color: color ?? defaultColor,
      }),
      block ? `w-full` : ``,
      loading ? `opacity-70` : ``,
      round ? "rounded-full" : "rounded-md",
      props.className
    );

    const sizesClassName = getSizesClassName()[size ?? defaultSize];

    return (
      <button
        {...props}
        tabIndex={href ? -1 : 0}
        ref={ref}
        className={className}
        disabled={loading || props.disabled}
      >
        <InnerButtonContainerElement href={href} disabled={props.disabled}>
          <span
            className={classNames(
              `flex w-full flex-1 items-center justify-center`,
              sizesClassName
            )}
          >
            <If condition={loading}>
              <Animation />
            </If>

            {children}
          </span>
        </InnerButtonContainerElement>
      </button>
    );
  }
);

function Animation() {
  return (
    <span className={"mx-2"}>
      <Spinner className={"mx-auto !h-4 !w-4 fill-white dark:fill-white"} />
    </span>
  );
}

function InnerButtonContainerElement({
  children,
  href,
  disabled,
}: React.PropsWithChildren<{
  href: Maybe<string>;
  disabled?: boolean;
}>) {
  const className = `flex w-full items-center transition-transform duration-500 ease-out`;

  if (href && !disabled) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}

function getClassNameBuilder() {
  return cva(
    [
      `inline-flex items-center justify-center font-medium outline-none transition-all focus:ring-2 ring-offset-1 dark:focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 active:[&>*]:translate-y-0.5`,
    ],
    {
      variants: {
        color: {
          primary: `ring-primary-200`,
          gray: `ring-gray-200`,
          pink: `ring-pink-100`,
          secondary: `ring-gray-200`,
          danger: `ring-red-200`,
          transparent: `text-gray-800 focus:ring-2 focus:ring-gray-50 dark:focus:ring-dark-700 ring-primary-50 hover:bg-gray-50 active:bg-gray-100 dark:text-gray-300 dark:ring-dark-800 dark:hover:bg-dark-800 dark:hover:text-white dark:active:bg-dark-700`,
          custom: ``,
        },
        variant: {
          normal: ``,
          outline: ``,
          flat: ``,
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "normal",
          className: `bg-chexy-purple dark:focus:ring-chexy-purple/70 text-primary-contrast hover:bg-chexy-purple-dark active:bg-primary-700 dark:text-primary-contrast`,
        },
        {
          color: "danger",
          variant: "normal",
          className: `bg-red-400 dark:focus:ring-red-500/70 text-white hover:bg-red-500 active:bg-red-600`,
        },
        {
          color: "secondary",
          variant: "normal",
          className: `bg-gray-100 dark:focus:ring-gray-200 hover:bg-gray-200 active:bg-gray-200 dark:bg-dark-800 dark:ring-dark-600 dark:hover:bg-dark-700 dark:active:bg-dark-600`,
        },
        {
          color: "pink",
          variant: "normal",
          className: `bg-pink-100 text-chexy-purple`,
        },
        {
          color: "primary",
          variant: "outline",
          className: `border-2 border-chexy-purple hover:bg-chexy-purple hover:text-white bg-transparent text-chexy-purple`,
        },
        {
          color: "gray",
          variant: "outline",
          className: `border-2 border-gray-200 hover:bg-gray-100 bg-transparent text-gray-500`,
        },
        {
          color: "danger",
          variant: "outline",
          className: `border-2 border-red-400 dark:focus:ring-red-500/70 bg-transparent text-red-400`,
        },
        {
          color: "primary",
          variant: "flat",
          className: `bg-chexy-purple/5 dark:focus:ring-chexy-purple/70 text-chexy-purple hover:bg-chexy-purple/10 
      active:bg-chexy-purple/20 dark:hover:bg-chexy-purple/20 dark:active:bg-chexy-purple/30`,
        },
        {
          color: "danger",
          variant: "flat",
          className: `bg-red-500/5 text-red-500 dark:focus:ring-red-500/70
    active:bg-red-500/20 hover:bg-red-500/10 dark:active:bg-red-500/30`,
        },
      ],
      defaultVariants: {
        color: "primary",
        variant: "normal",
      },
    }
  );
}

function getSizesClassName() {
  return {
    normal: `text-sm py-2 px-4 h-10`,
    small: `py-2 px-3 text-xs`,
    large: `py-2.5 px-6 h-12 text-lg h-12`,
    custom: ``,
  };
}

export default Button;
