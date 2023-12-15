import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "~/libs/cn.lib";

type HeadingRef = HTMLHeadingElement;
type HeadingProps = ComponentPropsWithoutRef<'h1'> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    asChild?: boolean;
}

const headingVariants = cva(
    'text-stone-900',
    {
        variants: {
            level: {
                1: 'text-4xl font-bold',
                2: 'text-3xl font-semibold',
                3: 'text-2xl font-semibold',
                4: 'text-xl font-medium',
                5: 'text-lg font-medium',
                6: 'text-base font-medium',
            }
        }
    }
)

export const Heading = forwardRef<HeadingRef, HeadingProps>(({
    className, asChild, children, as = 'h2', level = 2, ...props
}, ref) => {
    const Component = asChild ? Slot : as;

    return (
        <Component
            ref={ref}
            className={cn(headingVariants({ level }), className)}
            {...props}
        >
            {children}
        </Component>
    );
});

Heading.displayName = "Heading";