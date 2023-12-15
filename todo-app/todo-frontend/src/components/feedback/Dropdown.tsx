import * as DMPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import type { ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '~/libs/cn.lib';

const Dropdown = DMPrimitive.Root;

const DropdownTrigger = DMPrimitive.Trigger;

const DropdownGroup = DMPrimitive.Group;

const DropdownPortal = DMPrimitive.Portal;

const DropdownSub = DMPrimitive.Sub;

const DropdownRadioGroup = DMPrimitive.RadioGroup;

const DropdownSubTrigger = forwardRef<
    ElementRef<typeof DMPrimitive.SubTrigger>,
    ComponentPropsWithoutRef<typeof DMPrimitive.SubTrigger> & {
        inset?: boolean;
    }
>(({ className, inset, children, ...props }, ref) => (
    <DMPrimitive.SubTrigger
        ref={ref}
        className={cn(
            'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-200 data-[state=open]:bg-gray-200',
            inset && 'pl-8',
            className
        )}
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
    </DMPrimitive.SubTrigger>
));
DropdownSubTrigger.displayName =
    DMPrimitive.SubTrigger.displayName;

const DropdownSubContent = forwardRef<
    ElementRef<typeof DMPrimitive.SubContent>,
    ComponentPropsWithoutRef<typeof DMPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <DMPrimitive.SubContent
        ref={ref}
        className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-gray-200 p-1 text-stone-900 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
        )}
        {...props}
    />
));
DropdownSubContent.displayName =
    DMPrimitive.SubContent.displayName;

const DropdownContent = forwardRef<
    ElementRef<typeof DMPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DMPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DMPrimitive.Portal>
        <DMPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                'z-50 min-w-[var(--radix-popper-anchor-width)] overflow-hidden rounded-md border bg-white p-1 text-stone-900 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className
            )}
            {...props}
        />
    </DMPrimitive.Portal>
));
DropdownContent.displayName = DMPrimitive.Content.displayName;


type DropdownItemRef = ElementRef<typeof DMPrimitive.Item>;
type DropdownItemProps = ComponentPropsWithoutRef<typeof DMPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'warning' | 'danger';
};
const DropdownItem = forwardRef<DropdownItemRef, DropdownItemProps>(({ className, inset, variant = 'default', ...props }, ref) => (
    <DMPrimitive.Item
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-75  focus:bg-gray-200 focus:text-stone-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            {
                'pl-8': inset,
                'text-yellow-500 hover:!text-yellow-600': variant === 'warning',
                'text-red-500 hover:!text-red-600': variant === 'danger',
            },
            className
        )}
        {...props}
    />
));
DropdownItem.displayName = DMPrimitive.Item.displayName;

const DropdownCheckboxItem = forwardRef<
    ElementRef<typeof DMPrimitive.CheckboxItem>,
    ComponentPropsWithoutRef<typeof DMPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
    <DMPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-200 focus:text-stone-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DMPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </DMPrimitive.ItemIndicator>
        </span>
        {children}
    </DMPrimitive.CheckboxItem>
));
DropdownCheckboxItem.displayName =
    DMPrimitive.CheckboxItem.displayName;

const DropdownRadioItem = forwardRef<
    ElementRef<typeof DMPrimitive.RadioItem>,
    ComponentPropsWithoutRef<typeof DMPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
    <DMPrimitive.RadioItem
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-200 focus:text-stone-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DMPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </DMPrimitive.ItemIndicator>
        </span>
        {children}
    </DMPrimitive.RadioItem>
));
DropdownRadioItem.displayName = DMPrimitive.RadioItem.displayName;

const DropdownLabel = forwardRef<
    ElementRef<typeof DMPrimitive.Label>,
    ComponentPropsWithoutRef<typeof DMPrimitive.Label> & {
        inset?: boolean;
    }
>(({ className, inset, ...props }, ref) => (
    <DMPrimitive.Label
        ref={ref}
        className={cn(
            'px-2 py-1.5 text-sm font-semibold',
            inset && 'pl-8',
            className
        )}
        {...props}
    />
));
DropdownLabel.displayName = DMPrimitive.Label.displayName;

const DropdownSeparator = forwardRef<
    ElementRef<typeof DMPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof DMPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DMPrimitive.Separator
        ref={ref}
        className={cn('-mx-1 my-1 h-px bg-gray-100', className)}
        {...props}
    />
));
DropdownSeparator.displayName = DMPrimitive.Separator.displayName;

const DropdownShortcut = ({
    className,
    ...props
}: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
            {...props}
        />
    );
};
DropdownShortcut.displayName = 'DropdownShortcut';

export {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownCheckboxItem,
    DropdownRadioItem,
    DropdownLabel,
    DropdownSeparator,
    DropdownShortcut,
    DropdownGroup,
    DropdownPortal,
    DropdownSub,
    DropdownSubContent,
    DropdownSubTrigger,
    DropdownRadioGroup,
};