import Link from "next/link"

type Props = {
    children: any,
    href?: string,
    ariaLabel?: string,
    className?: string,
    type: "primary" | "outlined",
}

function Button({children, href, ariaLabel, className, type}: Props) {
    const primaryClasses = 
    `bg-rose-600 dark:bg-rose-500 p-2 rounded-lg border-2
     border-rose-900 text-white focus:bg-rose-700
     focus:dark:bg-rose-700 uppercase font-semibold`;
    const oulinedClasses = 
    `p-2 rounded-lg border-2 border-black dark:border-neutral-50
     text-rose-600 uppercase font-semibold hover:bg-rose-400
     hover:text-white dark:hover:bg-rose-800
     dark:hover:border-rose-800`;
    const defaultClasses = ``;
    let classes = "";
    
    if(type === "primary") {
      classes = `${primaryClasses} ${className ? className : ""}`;
    } else if (type === "outlined") {
      classes = `${oulinedClasses} ${className ? className : ""}`;
    } else {
      classes = defaultClasses;
    }
      
    return (
       <>
         {!href ? (
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