'use client';

import { deleteCookie } from 'cookies-next';
import { toast } from '../ui/sweet-alert';
import { useRouter } from 'next/navigation';

type Props = {
    response: {
        code: number;
        message: string;
        status?: string;
        data?: any;
    };
};

const SectionError = ({ response }: Props) => {
    const router = useRouter();

    if (response.code === 401) {
        toast.fire({
            icon: 'error',
            title: `${response?.status}\n${response?.message}`,
            padding: '10px 20px',
        });
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        router.push('/sign-in');
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto max-w-screen-sm space-y-4 text-center">
                    <div>
                        <h1 className="text-7xl font-extrabold tracking-tight text-danger lg:text-9xl">
                            {response.code}
                        </h1>
                        {response.status && (
                            <p className="text-3xl font-extrabold tracking-tight text-danger lg:text-4xl">
                                {response.status}
                            </p>
                        )}
                        <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {response.message}
                        </p>
                    </div>
                    <p className="text-lg font-light text-gray-500 dark:text-gray-400">
                        We are trying to fix this issue. Please try again later.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionError;
