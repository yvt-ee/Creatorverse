

import React from 'react';

export default function Footer() {
    return (
        <div className='footer bg-black text-white w-full px-4 py-4 flex justify-center'>
            <p className='text-sm text-center'>
                Made by{' '}
                <a href='https://github.com/yvt-ee' className='underline'>
                    Yvette Liu
                </a>{' '}
                &#8901; Northeastern University &#8901; Seattle, WA
            </p>
        </div>
    );
}
