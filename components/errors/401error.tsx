import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UnauthorizedError = ({ message }: { message?: string }) => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="text-center font-semibold before:container before:absolute before:left-1/2 before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10">
                <div className="relative">
                    <Image
                        src="/assets/images/error/401-light.svg"
                        alt="401"
                        className="light-img mx-auto -mt-10 w-screen object-cover md:-mt-14 md:max-w-xl"
                        width={1000}
                        height={1000}
                    />
                    <p className="text-base dark:text-white">
                        {message ?? 'You are not authorized to access this page, please contact the administrator!'}
                    </p>
                    <Link href="/" className="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedError;
