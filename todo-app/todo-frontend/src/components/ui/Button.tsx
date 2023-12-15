import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import { ComponentPropsWithoutRef, isValidElement, cloneElement, ReactNode, forwardRef, Fragment } from 'react';
import { cn } from '~/libs/cn.lib';

type ButtonRef = HTMLButtonElement;
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
    variant?: 'contained' | 'outlined' | 'text' | 'link' | 'icon';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
    color?: 'primary' | 'success' | 'warning' | 'danger';
    loading?: boolean;
    loadingText?: ReactNode;
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
}

const buttonVariants = cva(
    'flex w-fit items-center justify-center rounded-md border border-transparent transition-colors duration-200 focus:outline-none',
    {
        variants: {
            size: {
                'xs': 'px-2.5 py-1.5 text-xs',
                'sm': 'px-3 py-2 text-sm leading-4',
                'md': 'px-4 py-2 text-sm',
                'lg': 'px-4 py-2 text-base',
                'xl': 'px-6 py-3 text-base',
                'icon': 'p-2',
            },
            variant: {
                contained: '',
                outlined: 'border border-gray-200 bg-white text-stone-900 hover:bg-gray-50 active:bg-gray-100',
                text: 'bg-transparent text-stone-900 hover:bg-gray-50 active:bg-gray-100',
                link: 'bg-transparent text-gray-500 underline underline-offset-4 py-0 px-0 hover:text-gray-600',
                icon: 'rounded-full',
            },
            color: {
                primary: '',
                success: '',
                warning: '',
                danger: '',
            }
        },
        compoundVariants: [
            {
                variant: 'contained',
                color: 'primary',
                className: 'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-900'
            },
            {
                variant: 'contained',
                color: 'success',
                className: 'bg-green-600 text-white hover:bg-green-500 active:bg-green-600'
            },
            {
                variant: 'contained',
                color: 'warning',
                className: 'bg-yellow-600 text-white hover:bg-yellow-500 active:bg-yellow-600'
            },
            {
                variant: 'contained',
                color: 'danger',
                className: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-600'
            }
        ]
    }
)

export const Button = forwardRef<ButtonRef, ButtonProps>(({
    children, asChild, disabled, className, type = 'button', color = 'primary', variant = 'contained', size = 'md', loading = false, loadingText, startIcon: StartIcon, endIcon: EndIcon, ...props
}, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            disabled={disabled || loading}
            type={type}
            className={cn(buttonVariants({ variant, color, size, }),
                'disabled:pointer-events-none disabled:opacity-50',
                {
                    'pointer-events-none opacity-75': loading === true,
                },
                className
            )}
            {...props}
            ref={ref}
        >
            {
                asChild === true
                    ?
                    isValidElement(children)
                        ?
                        cloneElement(children, undefined,
                            <Fragment>
                                {
                                    loading === true
                                        ?
                                        <Fragment>
                                            <LoadingIcon className="mr-2 h-5 w-5 animate-spin" />
                                            {loadingText || children}
                                        </Fragment>
                                        :
                                        <Fragment>
                                            {StartIcon ? <StartIcon className="mr-2 h-5 w-5" /> : null}
                                            {children}
                                            {EndIcon ? <EndIcon className="ml-2 h-5 w-5" /> : null}
                                        </Fragment>
                                }
                            </Fragment>
                        )
                        : null
                    :
                    <Fragment>
                        {
                            loading === true
                                ?
                                <Fragment>
                                    <LoadingIcon className="mr-2 h-5 w-5 animate-spin" />
                                    {loadingText || children}
                                </Fragment>
                                :
                                <Fragment>
                                    {StartIcon ? <StartIcon className="mr-2 h-5 w-5" /> : null}
                                    {children}
                                    {EndIcon ? <EndIcon className="ml-2 h-5 w-5" /> : null}
                                </Fragment>
                        }
                    </Fragment>
            }
        </Component>
    )
});

const LoadingIcon = ({ className, ...props }: ComponentPropsWithoutRef<'svg'>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(className)}
        {...props}
    >
        <line x1="12" x2="12" y1="2" y2="6"></line>
        <line x1="12" x2="12" y1="18" y2="22"></line>
        <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line>
        <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line>
        <line x1="2" x2="6" y1="12" y2="12"></line>
        <line x1="18" x2="22" y1="12" y2="12"></line>
        <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line>
        <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line>
    </svg>
);