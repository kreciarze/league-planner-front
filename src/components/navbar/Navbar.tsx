import {useEffect, useRef, useState} from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import {useRouter} from "next/router";
import Breadcrumbs from "@/components/breadcrumbs";
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function Navbar(
    props: {
        getCurrentPage?: string;
        token: string | null;
        navigation: (
            {name: string; href: string; onClick?: undefined; }
            |
            {name: string; href: string; onClick: (token: string) => void; })[]
    }
) {
    //TODO: fix current page problem
    const { getCurrentPage, navigation} = props;
    const [currentPage, setCurrentPage] = useState(getCurrentPage || 'Strona główna');
    const router = useRouter();
    let path = useRef<string>();

    useEffect(() => {
        console.log("useeffect")
        if(router.isReady){
            path.current = router.asPath;
        } else {
            path.current = "";
        }
    }, [router.isReady, router.asPath])

    return (
        <Disclosure as="nav" className="bg-gray-800 flex items-center justify-evenly">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex pt-2 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex justify-center items-center space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                key={item.name}
                                                className={classNames(
                                                    item.name === getCurrentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.name === getCurrentPage ? 'page' : undefined}
                                                onClick={() => {
                                                    setCurrentPage(item.name);
                                                    router.push(item.href.includes('[id]') ? item.href.replace('[id]', router.query.id as string) : item.href);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Breadcrumbs path={path.current} />
                    </div>
                        {/* Mobile menu, show/hide based on menu state. */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    className={classNames(
                                        item.name === getCurrentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.name === getCurrentPage ? 'page' : undefined}
                                    onClick={() =>
                                        router.push(item.href.includes('[id]') ? item.href.replace('[id]', router.query.id as string) : item.href)
                                    }
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}


