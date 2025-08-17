"use client";
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cloneElement, FC, PropsWithChildren, ReactElement } from 'react'
import { IconType } from 'react-icons';

type Props = LinkProps & {
    label: string;
    icon: ReactElement;
}

const TabLink: FC<Props> = (props) => {
    const pathname = usePathname();
    const isActive = pathname === props.href;
    const activeClass = 'text-amber-400';

    console.log('TabLink', pathname, props.href, isActive);

    // Clone the icon element to add a className, typescript safe
    const iconWithClass = cloneElement(props.icon as ReactElement<any>, {
        className: 'text-xl'
    });

    return (
        <Link className={cn(
            'flex flex-col justify-center items-center px-4 rounded-full h-full text-white',
            {
                [activeClass]: isActive,
            }
        )} {...props}>
            {iconWithClass}
            <span>{props.label}</span>
        </Link>
    )
}

export default TabLink