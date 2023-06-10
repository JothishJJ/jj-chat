import Link from "next/link"

type Props = {
    children: any,
    href: string | undefined,
    ariaLabel: string | undefined,
    type: "primary" | "outlined",
}

function Button({children, href, ariaLabel, type}: Props) {
    const primaryClasses = 
    `bg-rose-600 dark:bg-rose-500 p-2 rounded-lg border-2
     border-rose-900 text-white focus:bg-rose-700
     focus:dark:bg-rose-700`;
    const secondaryClasses = "";
    let classes = "";
    
    if(type === "primary") {
      classes = primaryClasses;
    } else if (type === "outlined") {
      classes = secondaryClasses;
    }
      
    return (
       <>
         {href === undefined ? (
             <button
               className={classes}
               aria-label={ariaLabel}
             >
                 {children}
             </button>
         ) : (
             <Link
               href={href}
               aria-label={ariaLabel}
               className={classes}
             >
                 {children}
             </Link>
         )}
       </>
    );
}

export default Button;