import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type FC, type ReactNode } from 'react';
import { cn } from '~/libs/cn.lib';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

interface SheetProps {
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}
const Sheet: FC<SheetProps> = ({
    children, onClose, onOpen, ...props
}) => {
    function onOpenChange(open: boolean) {
        if (open) {
            onOpen?.();
        } else {
            onClose?.();
        }
    }

    return (
        <Root
            onOpenChange={onOpenChange}
            {...props}
        >
            {children}
        </Root>
    );
};
Sheet.displayName = 'Sheet';


type SheetTriggerRef = ElementRef<typeof Trigger>;
type SheetTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;
const SheetTrigger = forwardRef<SheetTriggerRef, SheetTriggerProps>(({
    className, ...props
}, ref) => {
    return (
        <Trigger
            className={cn(className)}
            ref={ref}
            {...props}
        />
    );
});
SheetTrigger.displayName = Trigger.displayName;


const SheetClose = Close;
SheetClose.displayName = 'SheetClose';


type SheetPortalProps = ComponentPropsWithoutRef<typeof Portal>;
const SheetPortal: FC<SheetPortalProps> = ({ ...props
}) => (
    <Portal {...props} />
);
SheetPortal.displayName = 'SheetPortal';


type SheetOverlayRef = ElementRef<typeof Overlay>;
type SheetOverlayProps = ComponentPropsWithoutRef<typeof Overlay>;

const SheetOverlay = forwardRef<SheetOverlayRef, SheetOverlayProps>(({
    className, ...props
}, ref) => {
    return (
        <Overlay
            className={cn(
                'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                className
            )}
            {...props}
            ref={ref}
        />
    );
});
SheetOverlay.displayName = 'SheetOverlay';

const sheetVariants = cva(
    'fixed z-50 gap-4 overflow-y-auto bg-white p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
    {
        variants: {
            side: {
                top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
                bottom:
                    'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                left: 'inset-y-0 left-0 h-full w-1/2 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
                right:
                    'inset-y-0 right-0 h-full w-1/2  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    }
);

type SheetContentRef = ElementRef<typeof Content>;
type SheetContentProps = Omit<ComponentPropsWithoutRef<typeof Content>, 'onInteractOutside' | 'onOpenAutoFocus' | 'onEscapeKeyDown'> & {
    side?: 'top' | 'bottom' | 'left' | 'right';
    focusLock?: boolean;
    closeOnEscape?: boolean;
    closeOnOutside?: boolean;
    portalProps?: ComponentPropsWithoutRef<typeof Portal>;
    overlayProps?: ComponentPropsWithoutRef<typeof Overlay>;
    hasCloseButton?: boolean;
    onClose?: () => void;
};
type PointerDownOutsideEvent = CustomEvent<{
    originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
    originalEvent: FocusEvent;
}>;
const SheetContent = forwardRef<SheetContentRef, SheetContentProps>(({
    side = 'right', className, children,
    focusLock = false, closeOnEscape = true,
    closeOnOutside = true, onClose,
    hasCloseButton = true,
    portalProps, overlayProps,
    ...props
}, ref) => {
    function onOpenAutoFocus(e: Event) {
        if (focusLock === false) {
            e.preventDefault();
        }
    }

    function onEscapeKeyDown(e: KeyboardEvent) {
        if (closeOnEscape === false) {
            e.preventDefault();
        }
    }

    function onInteractOutside(e: PointerDownOutsideEvent | FocusOutsideEvent) {
        if (closeOnOutside === false) {
            e.preventDefault();
        }
    }

    return (
        <SheetPortal {...portalProps}>
            <SheetOverlay {...overlayProps} />
            <Content
                className={cn(
                    sheetVariants({ side }),
                    className
                )}
                onOpenAutoFocus={onOpenAutoFocus}
                onEscapeKeyDown={onEscapeKeyDown}
                onInteractOutside={onInteractOutside}
                {...props}
                ref={ref}
            >
                {children}
                {
                    hasCloseButton
                        ?
                        <Close onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-stone-900">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Close>
                        : null
                }
            </Content>
        </SheetPortal>
    );
});
SheetContent.displayName = 'SheetContent';

type SheetHeaderRef = ElementRef<'header'>;
type SheetHeaderProps = ComponentPropsWithoutRef<'header'>;
const SheetHeader = forwardRef<SheetHeaderRef, SheetHeaderProps>(({
    className, ...props
}, ref) => {
    return (
        <header
            className={cn(
                'mb-3 px-6 text-center',
                className
            )}
            {...props}
            ref={ref}
        />
    );
});
SheetHeader.displayName = 'SheetHeader';


type SheetTitleRef = ElementRef<typeof Heading>;
type SheetTitleProps = ComponentPropsWithoutRef<typeof Heading>;
const SheetTitle = forwardRef<SheetTitleRef, SheetTitleProps>(({
    className, ...props
}, ref) => {
    return (
        <Title asChild={true}>
            <Heading
                level={4}
                as='h3'
                className={cn(
                    'text-2xl font-semibold',
                    className
                )}
                {...props}
                ref={ref}
            />
        </Title>
    );
});
SheetTitle.displayName = 'SheetTitle';


type SheetBodyRef = ElementRef<'div'>;
type SheetBodyProps = ComponentPropsWithoutRef<'div'>;
export const SheetBody = forwardRef<SheetBodyRef, SheetBodyProps>(({
    className, ...props
}, ref) => {
    return (
        <div
            role='main'
            className={cn(
                'flex flex-col',
                className
            )}
            {...props}
            ref={ref}
        />
    );
});
SheetBody.displayName = 'SheetBody';

type SheetFooterRef = ElementRef<'footer'>;
type SheetFooterProps = ComponentPropsWithoutRef<'footer'>;
const SheetFooter = forwardRef<SheetFooterRef, SheetFooterProps>(({
    className, ...props
}, ref) => {
    return (
        <footer
            className={cn(
                'mt-5',
                className
            )}
            {...props}
            ref={ref}
        />
    );
});
SheetFooter.displayName = 'SheetFooter';


type SheetDescriptionRef = ElementRef<typeof Text>;
type SheetDescriptionProps = ComponentPropsWithoutRef<typeof Text>;
const SheetDescription = forwardRef<SheetDescriptionRef, SheetDescriptionProps>(({
    className, ...props
}, ref) => {
    return (
        <Description asChild={true}>
            <Text
                variant='muted'
                className={cn(
                    'text-[15px] text-gray-500',
                    className
                )}
                {...props}
                ref={ref}
            />
        </Description>
    );
});
SheetDescription.displayName = 'SheetDescription';

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};