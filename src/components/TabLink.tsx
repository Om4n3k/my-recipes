"use client";
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
    const activeClass = isActive ? 'bg-amber-600' : '';

    console.log('TabLink', pathname, props.href, isActive);

    // Clone the icon element to add a className, typescript safe
    const iconWithClass = cloneElement(props.icon as ReactElement<any>, {
        className: 'text-xl'
    });

    return (
        <Link className={`flex flex-col justify-center items-center h-full rounded-full px-4 text-white ${activeClass}`} {...props}>
            {iconWithClass}
            <span>{props.label}</span>
        </Link>
    )
}

export default TabLink